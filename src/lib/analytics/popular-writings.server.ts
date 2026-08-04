import "server-only"

import { createSign } from "node:crypto"

import { unstable_cache } from "next/cache"

import { rankArticleSlugsByViews, type ArticlePageViews } from "./popular-writings"

type Ga4Credentials = {
  propertyId: string
  clientEmail: string
  privateKey: string
}

const GA4_SCOPE = "https://www.googleapis.com/auth/analytics.readonly"
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token"
const CACHE_SECONDS = 60 * 60 * 12

function base64url(value: string | Buffer) {
  return Buffer.from(value).toString("base64url")
}

function readCredentials(): Ga4Credentials | null {
  const propertyId = process.env.GA4_PROPERTY_ID?.trim() ?? ""
  const clientEmail = process.env.GA4_CLIENT_EMAIL?.trim() ?? ""
  const privateKey = (process.env.GA4_PRIVATE_KEY ?? "").replace(/\\n/g, "\n").trim()

  if (!/^\d+$/.test(propertyId)) return null
  if (!/^[^\s@]+@[^\s@]+$/.test(clientEmail)) return null
  if (!privateKey.startsWith("-----BEGIN PRIVATE KEY-----")) return null

  return { propertyId, clientEmail, privateKey }
}

async function createAccessToken(credentials: Ga4Credentials) {
  const issuedAt = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const claim = base64url(
    JSON.stringify({
      iss: credentials.clientEmail,
      scope: GA4_SCOPE,
      aud: TOKEN_ENDPOINT,
      iat: issuedAt,
      exp: issuedAt + 3600,
    }),
  )
  const unsignedToken = `${header}.${claim}`
  const signer = createSign("RSA-SHA256")
  signer.update(unsignedToken)
  signer.end()
  const assertion = `${unsignedToken}.${signer.sign(credentials.privateKey, "base64url")}`

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    signal: AbortSignal.timeout(8_000),
  })

  if (!response.ok) throw new Error(`GA4 OAuth failed with ${response.status}`)
  const body: unknown = await response.json()
  if (!body || typeof body !== "object" || !("access_token" in body) || typeof body.access_token !== "string") {
    throw new Error("GA4 OAuth response did not include an access token")
  }

  return body.access_token
}

async function fetchArticlePageViews(): Promise<ArticlePageViews[]> {
  const credentials = readCredentials()
  if (!credentials) return []

  const accessToken = await createAccessToken(credentials)
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${credentials.propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: "30daysAgo", endDate: "yesterday" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        dimensionFilter: {
          filter: {
            fieldName: "pagePath",
            stringFilter: { matchType: "BEGINS_WITH", value: "/articles/" },
          },
        },
        limit: 250,
      }),
      signal: AbortSignal.timeout(8_000),
    },
  )

  if (!response.ok) throw new Error(`GA4 Data API failed with ${response.status}`)
  const body: unknown = await response.json()
  if (!body || typeof body !== "object" || !("rows" in body) || !Array.isArray(body.rows)) return []

  return body.rows.flatMap((row) => {
    if (!row || typeof row !== "object") return []
    const dimensions = "dimensionValues" in row && Array.isArray(row.dimensionValues) ? row.dimensionValues : []
    const metrics = "metricValues" in row && Array.isArray(row.metricValues) ? row.metricValues : []
    const pagePath = dimensions[0]?.value
    const views = Number(metrics[0]?.value)
    return typeof pagePath === "string" && Number.isFinite(views) ? [{ pagePath, views }] : []
  })
}

const getCachedPageViews = unstable_cache(fetchArticlePageViews, ["ga4-popular-writings-v1"], {
  revalidate: CACHE_SECONDS,
})

export async function getPopularWritingSlugs(fallbackSlugs: string[]) {
  if (!readCredentials()) return { slugs: fallbackSlugs, source: "fallback" as const }

  try {
    const rows = await getCachedPageViews()
    if (rows.length === 0) return { slugs: fallbackSlugs, source: "fallback" as const }
    return { slugs: rankArticleSlugsByViews(rows, fallbackSlugs), source: "ga4" as const }
  } catch (error) {
    console.error("Popular writings fell back to publication order", error instanceof Error ? error.message : error)
    return { slugs: fallbackSlugs, source: "fallback" as const }
  }
}
