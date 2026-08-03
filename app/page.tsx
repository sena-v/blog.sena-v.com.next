import { redirect } from "next/navigation"

import { ArticleExperience } from "@/components/ArticleExperience"
import { getLocalWritingsOnly } from "@/lib/content"

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function Home({ searchParams }: HomeProps) {
  const legacySlugValue = (await searchParams).slug
  const legacySlug = Array.isArray(legacySlugValue) ? legacySlugValue[0] : legacySlugValue
  if (legacySlug) redirect(`/articles/${encodeURIComponent(legacySlug)}`)

  const latest = getLocalWritingsOnly()[0]
  if (!latest?.content) throw new Error("At least one local article is required")

  return <ArticleExperience writing={latest as typeof latest & { content: string }} />
}
