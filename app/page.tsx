import { ArticleExperience } from "@/components/ArticleExperience"
import { getLocalWritingsOnly } from "@/lib/content"

export const revalidate = 43200

export default async function Home() {
  const latest = getLocalWritingsOnly()[0]
  if (!latest?.content) throw new Error("At least one local article is required")

  return <ArticleExperience writing={latest as typeof latest & { content: string }} />
}
