import { ArticleExperienceClient } from "@/components/client/ArticleExperience/ArticleExperience"
import type { ArticleExperienceData, ReaderIndexItem } from "@/components/article-experience/types"
import {
  formatDate,
  getAllWritings,
  getLocalWritingsOnly,
  getRelatedWritings,
  getWritingArchives,
  type Writing,
} from "@/lib/content"
import { getPopularWritingSlugs } from "@/lib/analytics/popular-writings.server"

function writingHref(writing: Writing) {
  return writing.kind === "external" ? writing.externalUrl! : `/articles/${writing.slug}`
}

function toIndexItem(writing: Writing, currentSlug: string): ReaderIndexItem {
  return {
    id: `${writing.kind}-${writing.slug}`,
    href: writingHref(writing),
    title: writing.title,
    meta: formatDate(writing.publishedAt),
    tag: writing.tags[0],
    external: writing.kind === "external",
    current: writing.slug === currentSlug,
  }
}

export async function ArticleExperience({ writing }: { writing: Writing & { content: string } }) {
  const allWritings = getAllWritings()
  const localWritings = getLocalWritingsOnly()
  const localBySlug = new Map(localWritings.map((item) => [item.slug, item]))
  const fallbackSlugs = localWritings.map((item) => item.slug)
  const popularResult = await getPopularWritingSlugs(fallbackSlugs)
  const writingsByMonth = new Map<string, Writing[]>()
  allWritings.forEach((item) => {
    const month = item.publishedAt.slice(0, 7)
    writingsByMonth.set(month, [...(writingsByMonth.get(month) ?? []), item])
  })
  const popular = popularResult.slugs
    .map((slug) => localBySlug.get(slug))
    .filter((item): item is Writing => Boolean(item))
    .slice(0, 8)
    .map((item, index) => ({ ...toIndexItem(item, writing.slug), rank: index + 1 }))

  const data: ArticleExperienceData = {
    writing: {
      kind: writing.kind,
      slug: writing.slug,
      title: writing.title,
      summary: writing.summary,
      publishedAt: writing.publishedAt,
      updatedAt: writing.updatedAt,
      tags: writing.tags,
      content: writing.content,
    },
    archive: getWritingArchives().map(([month, count]) => ({
      id: month,
      href: `/writings?archive=${month}`,
      title: month.replace("-", "."),
      meta: `${count}件`,
      children: (writingsByMonth.get(month) ?? []).map((item) => toIndexItem(item, writing.slug)),
    })),
    allArticles: allWritings.map((item) => toIndexItem(item, writing.slug)),
    related: getRelatedWritings(writing, 8).map((item) => toIndexItem(item, writing.slug)),
    popular,
    popularLabel: popularResult.source === "ga4" ? "人気記事" : "よく読んでほしい記事",
  }

  return <ArticleExperienceClient data={data} />
}
