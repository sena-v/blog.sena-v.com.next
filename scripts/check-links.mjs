import fs from "node:fs"
import path from "node:path"

import { parse as parseYaml } from "yaml"

const projectRoot = process.cwd()
const errors = []
const externalUrls = new Set()
const slugs = new Set()

const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(entryPath) : [entryPath]
  })

const contentMarkdownFiles = [
  ...walk(path.join(projectRoot, "posts")).filter((file) => file.endsWith(".md")),
  ...walk(path.join(projectRoot, "content", "external")).filter((file) => file.endsWith(".md")),
]
const documentationMarkdownFiles = [
  path.join(projectRoot, "README.md"),
  path.join(projectRoot, "content", "README.md"),
  ...walk(path.join(projectRoot, "docs")).filter((file) => file.endsWith(".md")),
]

const collectMarkdownLinks = (filePath, source) => {
  const relativePath = path.relative(projectRoot, filePath)

  for (const linkMatch of source.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = linkMatch[1]
    if (target.startsWith("http://") || target.startsWith("https://")) {
      externalUrls.add(target)
      continue
    }
    if (target.startsWith("#") || target.startsWith("mailto:")) continue
    if (/^\/(?:$|articles|tags|writings|about|privacy|projects)(?:\/|$)/.test(target)) continue

    const cleanTarget = decodeURIComponent(target.split("#")[0].split("?")[0])
    const legacyPublicTarget = cleanTarget.startsWith("../images/") ? cleanTarget.slice(3) : undefined
    const resolved = cleanTarget.startsWith("/")
      ? path.join(projectRoot, "public", cleanTarget)
      : legacyPublicTarget
        ? path.join(projectRoot, "public", legacyPublicTarget)
        : path.resolve(path.dirname(filePath), cleanTarget)

    if (!fs.existsSync(resolved)) errors.push(`${relativePath}: local link does not exist: ${target}`)
  }
}

for (const filePath of contentMarkdownFiles) {
  const relativePath = path.relative(projectRoot, filePath)
  const source = fs.readFileSync(filePath, "utf8")
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)

  if (!match) {
    errors.push(`${relativePath}: frontmatter is missing`)
    continue
  }

  const data = parseYaml(match[1])
  if (!data?.slug || typeof data.slug !== "string") errors.push(`${relativePath}: slug is missing`)
  else if (slugs.has(data.slug)) errors.push(`${relativePath}: duplicate slug "${data.slug}"`)
  else slugs.add(data.slug)

  if (!data?.title || typeof data.title !== "string") errors.push(`${relativePath}: title is missing`)
  if (!Array.isArray(data?.tags)) errors.push(`${relativePath}: tags must be an array`)

  if (relativePath.startsWith(`content${path.sep}external`)) {
    for (const field of ["summary", "publishedAt", "importedAt", "externalUrl", "platform"]) {
      if (!data?.[field] || typeof data[field] !== "string") errors.push(`${relativePath}: ${field} is missing`)
    }
    if (typeof data?.externalUrl === "string") externalUrls.add(data.externalUrl)
  }

  collectMarkdownLinks(filePath, source)
}

for (const filePath of documentationMarkdownFiles) {
  collectMarkdownLinks(filePath, fs.readFileSync(filePath, "utf8"))
}

for (const filePath of walk(path.join(projectRoot, "app")).filter((file) => /\.(tsx|ts)$/.test(file))) {
  const source = fs.readFileSync(filePath, "utf8")
  for (const match of source.matchAll(/(?:href|src)=["'](\/[^"'#?]*)["']/g)) {
    const target = match[1]
    if (/^\/(?:articles|tags|writings|about|projects|rss\.xml)/.test(target)) continue
    const publicPath = path.join(projectRoot, "public", target)
    if (!fs.existsSync(publicPath)) errors.push(`${path.relative(projectRoot, filePath)}: public file does not exist: ${target}`)
  }
}

if (process.env.CHECK_EXTERNAL_LINKS === "1") {
  const urls = [...externalUrls]
  for (let index = 0; index < urls.length; index += 8) {
    const batch = urls.slice(index, index + 8)
    await Promise.all(
      batch.map(async (url) => {
        try {
          const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15_000) })
          if (response.status === 404 || response.status === 410 || response.status >= 500) {
            errors.push(`${url}: returned HTTP ${response.status}`)
          }
        } catch (error) {
          errors.push(`${url}: ${error instanceof Error ? error.message : "request failed"}`)
        }
      }),
    )
  }
}

if (errors.length > 0) {
  console.error(`Link/content validation failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(
  `Validated ${contentMarkdownFiles.length} content files, ${documentationMarkdownFiles.length} documentation files, ${slugs.size} unique slugs, and ${externalUrls.size} external URLs.`,
)
