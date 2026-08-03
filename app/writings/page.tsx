import type { Metadata } from "next"
import Link from "next/link"

import { WritingTimeline } from "@/components/WritingTimeline"
import { getAllTags, getAllWritings } from "@/lib/content"

export const metadata: Metadata = {
  title: "Writings",
  description: "sena-vが公開した技術記事と外部メディアへの投稿一覧。タイトル・概要・タグから検索できます。",
  alternates: { canonical: "/writings" },
}

type WritingsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const firstValue = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? ""
const allValues = (value: string | string[] | undefined) =>
  [...new Set((Array.isArray(value) ? value : value ? [value] : []).map((item) => item.trim()).filter(Boolean))]

type WritingsFilters = {
  query: string
  tags: string[]
  archive: string
}

const buildWritingsHref = ({ query, tags, archive }: WritingsFilters) => {
  const params = new URLSearchParams()
  if (query) params.set("query", query)
  tags.forEach((tag) => params.append("tag", tag))
  if (archive) params.set("archive", archive)
  const search = params.toString()
  return search ? `/writings?${search}` : "/writings"
}

export default async function WritingsPage({ searchParams }: WritingsPageProps) {
  const params = await searchParams
  const query = firstValue(params.query).trim()
  const selectedArchive = firstValue(params.archive).trim()
  const normalizedQuery = query.toLocaleLowerCase("ja")
  const allWritings = getAllWritings()
  const tags = getAllTags()
  const knownTags = new Set(tags.map(([tag]) => tag))
  const selectedTags = allValues(params.tag).filter((tag) => knownTags.has(tag))
  const filters = { query, tags: selectedTags, archive: selectedArchive }
  const tagsClearHref = buildWritingsHref({ ...filters, tags: [] })
  const writings = allWritings.filter((writing) => {
    const matchesQuery =
      normalizedQuery === "" ||
      [writing.title, writing.summary, ...writing.tags].join(" ").toLocaleLowerCase("ja").includes(normalizedQuery)
    const matchesTags = selectedTags.every((tag) => writing.tags.includes(tag))
    const matchesArchive = selectedArchive === "" || writing.publishedAt.startsWith(selectedArchive)
    return matchesQuery && matchesTags && matchesArchive
  })

  return (
    <main id="main-content" className="writings-page">
      <header className="page-hero writings-hero shell">
        <div className="page-hero-copy">
          <p className="eyebrow">WRITINGS / 記事数 {allWritings.length}</p>
          <h1>記事一覧</h1>
        </div>
        <p className="page-intro">
          このブログとQiitaで公開した記事を、最初に公開した日付の順で並べています。
        </p>
      </header>
      <section className="section writings-section shell" aria-label="記事一覧">
        <div className="writings-controls">
          <form className="search-panel" action="/writings" method="get" role="search">
            <label className="sr-only" htmlFor="writing-search">記事を検索</label>
            <input
              id="writing-search"
              type="search"
              name="query"
              defaultValue={query}
              placeholder="タイトル・概要・タグから検索"
            />
            {selectedTags.map((tag) => <input key={tag} type="hidden" name="tag" value={tag} />)}
            {selectedArchive && <input type="hidden" name="archive" value={selectedArchive} />}
            <button type="submit">検索</button>
          </form>

          <div className="tag-filter">
            <div className={`tag-filter-row${selectedTags.length ? " has-selection" : ""}`}>
              <button
                className="tag-filter-trigger"
                type="button"
                popoverTarget="writings-tag-filter"
                aria-haspopup="dialog"
              >
                <span>
                  {selectedTags.length === 0 && "タグで絞り込む"}
                  {selectedTags.length === 1 && `#${selectedTags[0]}`}
                  {selectedTags.length > 1 && `${selectedTags.length}タグ選択中`}
                </span>
                <span className="tag-filter-count">
                  {selectedTags.length ? `${selectedTags.length} SELECTED` : `${tags.length} TAGS`}
                </span>
              </button>
              {selectedTags.length > 0 && (
                <Link
                  className="tag-filter-clear"
                  href={tagsClearHref}
                  aria-label="選択中のタグをすべて解除"
                >
                  タグ解除
                </Link>
              )}
            </div>
            <div
              id="writings-tag-filter"
              className="tag-filter-popover"
              popover="auto"
              role="dialog"
              aria-label="タグで絞り込む"
            >
              <header className="tag-filter-popover-head">
                <div>
                  <p>タグを選ぶ</p>
                  <span>複数選択・AND検索</span>
                </div>
                <div className="tag-filter-popover-actions">
                  {selectedTags.length > 0 && <Link href={tagsClearHref}>すべて外す</Link>}
                  <button
                    type="button"
                    popoverTarget="writings-tag-filter"
                    popoverTargetAction="hide"
                    aria-label="タグ選択を閉じる"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </header>
              <form className="tag-filter-form" action="/writings" method="get">
                {query && <input type="hidden" name="query" value={query} />}
                {selectedArchive && <input type="hidden" name="archive" value={selectedArchive} />}
                <ul className="tags-cloud" aria-label="タグで絞り込む">
                  {tags.map(([tag, count]) => (
                    <li key={tag}>
                      <label>
                        <input
                          className="tag-filter-checkbox"
                          type="checkbox"
                          name="tag"
                          value={tag}
                          defaultChecked={selectedTags.includes(tag)}
                        />
                        <span className="tag-hash" aria-hidden="true">#</span>
                        <span>{tag}</span>
                        <span className="tag-result-count" aria-hidden="true">{count}</span>
                        <span className="tag-check" aria-hidden="true">✓</span>
                      </label>
                    </li>
                  ))}
                </ul>
                <footer className="tag-filter-footer">
                  <span>選んだタグをすべて含む記事を表示します</span>
                  <button type="submit">タグを適用</button>
                </footer>
              </form>
            </div>
          </div>
        </div>

        <div className="filter-bar" aria-live="polite">
          <span>{writings.length} / {allWritings.length} 件</span>
          {(query || selectedTags.length > 0 || selectedArchive) && (
            <>
              <span>·</span>
              {(query || selectedArchive) && (
                <span>{query && `「${query}」`} {selectedArchive && selectedArchive.replace("-", ".")}</span>
              )}
              {selectedTags.length > 0 && (
                <span className="active-tag-filters" aria-label="選択中のタグ">
                  {selectedTags.map((tag) => (
                    <Link
                      key={tag}
                      href={buildWritingsHref({ ...filters, tags: selectedTags.filter((item) => item !== tag) })}
                      aria-label={`${tag}のタグ絞り込みを解除`}
                    >
                      #{tag}<span aria-hidden="true">×</span>
                    </Link>
                  ))}
                </span>
              )}
              <Link href="/writings">すべて解除</Link>
            </>
          )}
        </div>

        {writings.length > 0 ? (
          <WritingTimeline writings={writings} />
        ) : (
          <div className="empty-state">
            <h2>該当する記事はありません</h2>
            <p>検索語またはタグを変えてお試しください。</p>
          </div>
        )}
      </section>
    </main>
  )
}
