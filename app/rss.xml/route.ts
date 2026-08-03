import { getAllWritings } from "@/lib/content"
import { siteDescription, siteTitle, siteUrl } from "@/utils/constants"

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")

export function GET() {
  const items = getAllWritings()
    .slice(0, 30)
    .map((writing) => {
      const url = writing.kind === "external" ? writing.externalUrl : `${siteUrl}/articles/${writing.slug}`
      return `<item>
        <title>${escapeXml(writing.title)}</title>
        <link>${escapeXml(url ?? siteUrl)}</link>
        <guid isPermaLink="true">${escapeXml(url ?? siteUrl)}</guid>
        <pubDate>${new Date(writing.publishedAt).toUTCString()}</pubDate>
        <description>${escapeXml(writing.summary)}</description>
      </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${escapeXml(siteTitle)}</title>
      <link>${siteUrl}</link>
      <description>${escapeXml(siteDescription)}</description>
      <language>ja</language>
      ${items}
    </channel>
  </rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
