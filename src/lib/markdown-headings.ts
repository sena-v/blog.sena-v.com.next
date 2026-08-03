export type MarkdownHeading = {
  depth: 2 | 3
  id: string
  text: string
}

export function headingSlug(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ja")
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "section"
}

export function uniqueHeadingId(value: string, occurrences: Map<string, number>) {
  const slug = headingSlug(value)
  const count = occurrences.get(slug) ?? 0
  occurrences.set(slug, count + 1)
  return count === 0 ? slug : `${slug}-${count + 1}`
}

export function extractMarkdownHeadings(markdown: string): MarkdownHeading[] {
  const occurrences = new Map<string, number>()
  let inFence = false

  return markdown.split("\n").flatMap((line) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      return []
    }
    if (inFence) return []

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) return []
    const text = match[2].replace(/\[([^\]]+)]\([^)]*\)/g, "$1").replace(/[`*_~]/g, "").trim()
    if (!text) return []

    return [{ depth: match[1].length as 2 | 3, text, id: uniqueHeadingId(text, occurrences) }]
  })
}
