import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { WritingCard } from "@/components/WritingCard"
import { getAllTags, getAllWritings } from "@/lib/content"

type TagPageProps = { params: Promise<{ tag: string }> }

export const generateStaticParams = () => getAllTags().map(([tag]) => ({ tag }))

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = (await params).tag
  return {
    title: `#${tag} の記事`,
    description: `${tag}に関するsena-vの技術記事一覧です。`,
    alternates: { canonical: `/tags/${encodeURIComponent(tag)}` },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = (await params).tag
  const writings = getAllWritings().filter((writing) => writing.tags.includes(tag))
  if (writings.length === 0) notFound()

  return (
    <main id="main-content">
      <header className="page-hero shell">
        <p className="eyebrow">TOPIC</p>
        <h1>#{tag}</h1>
        <p className="page-intro">{writings.length}件の記事があります。</p>
      </header>
      <section className="section shell" aria-label={`${tag}の記事`}>
        <div className="writing-grid">
          {writings.map((writing) => <WritingCard key={`${writing.kind}-${writing.slug}`} writing={writing} />)}
        </div>
        <p><Link className="text-link" href="/writings">← すべての記事へ</Link></p>
      </section>
    </main>
  )
}
