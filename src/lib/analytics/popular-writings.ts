export type ArticlePageViews = {
  pagePath: string
  views: number
}

function getArticleSlug(pagePath: string): string | null {
  const pathname = pagePath.split(/[?#]/, 1)[0].replace(/\/$/, "")
  const match = pathname.match(/^\/articles\/([^/]+)$/)

  if (!match) return null

  try {
    return decodeURIComponent(match[1])
  } catch {
    return null
  }
}

/**
 * GA4の集計値を使ってslugを並べ替える。PV数そのものは呼び出し側へ返さない。
 * fallbackSlugsは公開日の降順を想定し、同数・未計測時の安定した順序にも使う。
 */
export function rankArticleSlugsByViews(rows: ArticlePageViews[], fallbackSlugs: string[]): string[] {
  const fallbackOrder = new Map(fallbackSlugs.map((slug, index) => [slug, index]))
  const viewsBySlug = new Map<string, number>()

  for (const row of rows) {
    if (!Number.isFinite(row.views) || row.views < 0) continue

    const slug = getArticleSlug(row.pagePath)
    if (!slug || !fallbackOrder.has(slug)) continue

    viewsBySlug.set(slug, (viewsBySlug.get(slug) ?? 0) + row.views)
  }

  return [...fallbackSlugs].sort((left, right) => {
    const viewDifference = (viewsBySlug.get(right) ?? 0) - (viewsBySlug.get(left) ?? 0)
    return viewDifference || (fallbackOrder.get(left) ?? 0) - (fallbackOrder.get(right) ?? 0)
  })
}
