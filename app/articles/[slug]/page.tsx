import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ArticleExperience } from "@/components/ArticleExperience"
import { getLocalWritingsOnly, getWritingBySlug } from "@/lib/content"
import { siteUrl } from "@/utils/constants"

type ArticlePageProps = { params: Promise<{ slug: string }> }

export const generateStaticParams = () => getLocalWritingsOnly().map(({ slug }) => ({ slug }))

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const writing = getWritingBySlug((await params).slug)
  if (!writing) return {}

  const path = `/articles/${writing.slug}`
  return {
    title: writing.title,
    description: writing.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: writing.title,
      description: writing.summary,
      url: path,
      publishedTime: writing.publishedAt,
      modifiedTime: writing.updatedAt,
      tags: writing.tags,
      images: writing.coverImage ? [writing.coverImage] : ["/background.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: writing.title,
      description: writing.summary,
      images: writing.coverImage ? [writing.coverImage] : ["/background.jpg"],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const writing = getWritingBySlug((await params).slug)
  if (!writing?.content) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: writing.title,
    description: writing.summary,
    datePublished: writing.publishedAt,
    dateModified: writing.updatedAt ?? writing.publishedAt,
    mainEntityOfPage: `${siteUrl}/articles/${writing.slug}`,
    author: { "@type": "Person", name: "sena-v", url: siteUrl },
    publisher: { "@type": "Person", name: "sena-v" },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ArticleExperience writing={writing as typeof writing & { content: string }} />
    </>
  )
}
