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
const publicImagesDirectory = path.join(process.cwd(), "public", "images")
const writingSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const writingDatePattern = /^(\d{4})-(\d{2})-(\d{2})(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2}))?$/
const localFrontmatterKeys = [
  "title",
  "slug",
  "summary",
  "tags",
  "coverImage",
  "publishedAt",
  "updatedAt",
  "relatedSlugs",
  "featured",
  "draft",
] as const
const externalFrontmatterKeys = [
  "title",
  "slug",
  "summary",
  "publishedAt",
  "updatedAt",
  "importedAt",
  "tags",
  "externalUrl",
  "platform",
  "featured",
  "draft",
] as const

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

const optionalString = (data: Record<string, unknown>, key: string, filePath: string) => {
  const value = data[key]
  if (value === undefined) return undefined
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${key} must be a non-empty string when provided: ${filePath}`)
  }
  return value.trim()
}

export const validateFrontmatterKeys = (
  data: Record<string, unknown>,
  allowedKeys: readonly string[],
  filePath = "content",
) => {
  const unknownKeys = Object.keys(data).filter((key) => !allowedKeys.includes(key))
  if (unknownKeys.length > 0) {
    throw new Error(
      `Unknown frontmatter field${unknownKeys.length === 1 ? "" : "s"} ${unknownKeys.join(", ")}: ${filePath}`,
    )
  }
}

export const validateOptionalBoolean = (value: unknown, key: string, filePath = "content") => {
  if (value === undefined) return false
  if (typeof value !== "boolean") throw new Error(`${key} must be a boolean when provided: ${filePath}`)
  return value
}

export const validateWritingSlug = (value: string, filePath = "content") => {
  if (!writingSlugPattern.test(value)) {
    throw new Error(`slug must contain only lowercase letters, numbers, and single hyphens: ${filePath}`)
  }

  return value
}

export const validateWritingDate = (value: string, key = "date", filePath = "content") => {
  const match = writingDatePattern.exec(value)
  if (!match || Number.isNaN(Date.parse(value))) {
    throw new Error(`${key} must be an ISO 8601 date: ${filePath}`)
  }

  const [, year, month, day] = match
  const calendarDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  if (
    calendarDate.getUTCFullYear() !== Number(year) ||
    calendarDate.getUTCMonth() + 1 !== Number(month) ||
    calendarDate.getUTCDate() !== Number(day)
  ) {
    throw new Error(`${key} must be a real calendar date: ${filePath}`)
  }

  return value
}

export const validateCoverImage = (value: string, filePath = "content") => {
  const segments = value.split("/")
  if (
    value.startsWith("/") ||
    value.includes("\\") ||
    /[?#\0]/.test(value) ||
    segments.some((segment) => segment === "" || segment === "." || segment === "..")
  ) {
    throw new Error(`coverImage must be a relative path below public/images: ${filePath}`)
  }

  const resolvedPath = path.resolve(publicImagesDirectory, value)
  const imageRoot = `${fs.realpathSync(publicImagesDirectory)}${path.sep}`
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`coverImage must reference an existing file below public/images: ${filePath}`)
  }

  const realPath = fs.realpathSync(resolvedPath)
  if (!realPath.startsWith(imageRoot) || !fs.statSync(realPath).isFile()) {
    throw new Error(`coverImage must reference an existing file below public/images: ${filePath}`)
  }

  return value
}

const requiredSlug = (data: Record<string, unknown>, filePath: string) =>
  validateWritingSlug(requiredString(data, "slug", filePath), filePath)

const requiredDate = (data: Record<string, unknown>, key: string, filePath: string) =>
  validateWritingDate(requiredString(data, key, filePath), key, filePath)

const optionalDate = (data: Record<string, unknown>, key: string, filePath: string) => {
  const value = optionalString(data, key, filePath)
  return value ? validateWritingDate(value, key, filePath) : undefined
}

const requiredHttpUrl = (data: Record<string, unknown>, key: string, filePath: string) => {
  const value = requiredString(data, key, filePath)

  try {
    const url = new URL(value)
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Unsupported protocol")
    if (url.username || url.password) throw new Error("Credentials are not allowed")
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
      validateFrontmatterKeys(data, localFrontmatterKeys, filePath)
      const coverImage = optionalString(data, "coverImage", filePath)
      const publishedAt = validateWritingDate(
        optionalString(data, "publishedAt", filePath) ?? entry.name,
        "publishedAt",
        filePath,
      )

      return {
        kind: "local" as const,
        slug: requiredSlug(data, filePath),
        title: requiredString(data, "title", filePath),
        summary: optionalString(data, "summary", filePath) ?? makeSummary(content),
        publishedAt,
        updatedAt: optionalDate(data, "updatedAt", filePath),
        tags: stringArray(data, "tags", filePath),
        coverImage: coverImage ? `/images/${validateCoverImage(coverImage, filePath)}` : undefined,
        content,
        relatedSlugs: optionalStringArray(data, "relatedSlugs", filePath)?.map((slug) =>
          validateWritingSlug(slug, filePath),
        ),
        featured: validateOptionalBoolean(data.featured, "featured", filePath),
        draft: validateOptionalBoolean(data.draft, "draft", filePath),
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
      validateFrontmatterKeys(data, externalFrontmatterKeys, filePath)

      return {
        kind: "external" as const,
        slug: requiredSlug(data, filePath),
        title: requiredString(data, "title", filePath),
        summary: requiredString(data, "summary", filePath),
        publishedAt: requiredDate(data, "publishedAt", filePath),
        updatedAt: optionalDate(data, "updatedAt", filePath),
        importedAt: requiredDate(data, "importedAt", filePath),
        tags: stringArray(data, "tags", filePath),
        externalUrl: requiredHttpUrl(data, "externalUrl", filePath),
        platform: requiredString(data, "platform", filePath),
        featured: validateOptionalBoolean(data.featured, "featured", filePath),
        draft: validateOptionalBoolean(data.draft, "draft", filePath),
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

export const getWritingBySlug = (slug: string) => getLocalWritingsOnly().find((writing) => writing.slug === slug)

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
