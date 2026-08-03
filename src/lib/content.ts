import fs from "node:fs"
import path from "node:path"

import { parse as parseYaml } from "yaml"

export type WritingKind = "local" | "external"

export type Writing = {
  kind: WritingKind
  slug: string
  title: string
  summary: string
  publishedAt: string
  updatedAt?: string
  importedAt?: string
  tags: string[]
  coverImage?: string
  content?: string
  externalUrl?: string
  platform?: string
  relatedSlugs?: string[]
  featured: boolean
  draft: boolean
}

const postsDirectory = path.join(process.cwd(), "posts")
const externalDirectory = path.join(process.cwd(), "content", "external")

const parseFrontmatter = (source: string, filePath: string) => {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source)

  if (!frontmatter) {
    throw new Error(`Frontmatter is missing or malformed: ${filePath}`)
  }

  const parsed: unknown = parseYaml(frontmatter[1])

  if (!parsed || typeof parsed !== "object") {
    throw new Error(`Frontmatter must be a YAML object: ${filePath}`)
  }

  return {
    data: parsed as Record<string, unknown>,
    content: source.slice(frontmatter[0].length).trim(),
  }
}

const requiredString = (data: Record<string, unknown>, key: string, filePath: string) => {
  const value = data[key]

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${key} must be a non-empty string: ${filePath}`)
  }

  return value.trim()
}

const optionalString = (data: Record<string, unknown>, key: string) => {
  const value = data[key]
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined
}

const requiredHttpUrl = (data: Record<string, unknown>, key: string, filePath: string) => {
  const value = requiredString(data, key, filePath)

  try {
    const url = new URL(value)
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Unsupported protocol")
    return url.toString()
  } catch {
    throw new Error(`${key} must be an absolute HTTP(S) URL: ${filePath}`)
  }
}

const stringArray = (data: Record<string, unknown>, key: string, filePath: string) => {
  const value = data[key]

  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    throw new Error(`${key} must be an array of strings: ${filePath}`)
  }

  return value.map((item) => item.trim()).filter(Boolean)
}

const optionalStringArray = (data: Record<string, unknown>, key: string, filePath: string) => {
  const value = data[key]
  if (value === undefined) return undefined
  return stringArray(data, key, filePath)
}

const makeSummary = (content: string) => {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  if (plainText.length <= 132) return plainText
  return `${plainText.slice(0, 131).trimEnd()}…`
}

const getLocalWritings = (): Writing[] => {
  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const filePath = path.join(postsDirectory, entry.name, "index.md")
      const source = fs.readFileSync(filePath, "utf8")
      const { data, content } = parseFrontmatter(source, filePath)
      const coverImage = optionalString(data, "coverImage")

      return {
        kind: "local" as const,
        slug: requiredString(data, "slug", filePath),
        title: requiredString(data, "title", filePath),
        summary: optionalString(data, "summary") ?? makeSummary(content),
        publishedAt: optionalString(data, "publishedAt") ?? entry.name,
        updatedAt: optionalString(data, "updatedAt"),
        tags: stringArray(data, "tags", filePath),
        coverImage: coverImage ? `/images/${coverImage}` : undefined,
        content,
        relatedSlugs: optionalStringArray(data, "relatedSlugs", filePath),
        featured: data.featured === true,
        draft: data.draft === true,
      }
    })
}

const getExternalWritings = (): Writing[] => {
  if (!fs.existsSync(externalDirectory)) return []

  return fs
    .readdirSync(externalDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(externalDirectory, fileName)
      const source = fs.readFileSync(filePath, "utf8")
      const { data } = parseFrontmatter(source, filePath)

      return {
        kind: "external" as const,
        slug: requiredString(data, "slug", filePath),
        title: requiredString(data, "title", filePath),
        summary: requiredString(data, "summary", filePath),
        publishedAt: requiredString(data, "publishedAt", filePath),
        updatedAt: optionalString(data, "updatedAt"),
        importedAt: requiredString(data, "importedAt", filePath),
        tags: stringArray(data, "tags", filePath),
        externalUrl: requiredHttpUrl(data, "externalUrl", filePath),
        platform: requiredString(data, "platform", filePath),
        featured: data.featured === true,
        draft: false,
      }
    })
}

export const getAllWritings = () => {
  const writings = [...getLocalWritings(), ...getExternalWritings()].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  )
  const duplicateSlugs = writings
    .map((writing) => writing.slug)
    .filter((slug, index, slugs) => slugs.indexOf(slug) !== index)

  if (duplicateSlugs.length > 0) {
    throw new Error(`Writing slugs must be unique: ${[...new Set(duplicateSlugs)].join(", ")}`)
  }

  return writings.filter((writing) => !writing.draft)
}

export const getLocalWritingsOnly = () => getAllWritings().filter((writing) => writing.kind === "local")

export const getWritingBySlug = (slug: string) =>
  getLocalWritingsOnly().find((writing) => writing.slug === slug)

export const getRelatedWritings = (current: Writing, limit = 8) => {
  const candidates = getAllWritings().filter((writing) => writing.slug !== current.slug)
  const manualOrder = new Map((current.relatedSlugs ?? []).map((slug, index) => [slug, index]))

  return candidates
    .map((writing) => ({
      writing,
      manualRank: manualOrder.get(writing.slug),
      sharedTags: writing.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .filter(({ manualRank, sharedTags }) => manualRank !== undefined || sharedTags > 0)
    .sort((left, right) => {
      const leftIsManual = left.manualRank !== undefined
      const rightIsManual = right.manualRank !== undefined

      if (leftIsManual !== rightIsManual) return leftIsManual ? -1 : 1
      if (leftIsManual && rightIsManual) return left.manualRank! - right.manualRank!
      return right.sharedTags - left.sharedTags || right.writing.publishedAt.localeCompare(left.writing.publishedAt)
    })
    .slice(0, limit)
    .map(({ writing }) => writing)
}

export const getWritingArchives = () => {
  const archives = new Map<string, number>()

  getAllWritings().forEach((writing) => {
    const month = writing.publishedAt.slice(0, 7)
    archives.set(month, (archives.get(month) ?? 0) + 1)
  })

  return [...archives.entries()].sort(([left], [right]) => right.localeCompare(left))
}

export const getAllTags = () => {
  const counts = new Map<string, number>()

  getAllWritings().forEach((writing) => {
    writing.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1))
  })

  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja"))
}

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(date))
