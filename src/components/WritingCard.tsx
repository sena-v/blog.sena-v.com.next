import Link from "next/link"

import { formatDate, type Writing } from "@/lib/content"

export function WritingCard({ writing }: { writing: Writing }) {
  const cardBody = (
    <>
      <div className="card-meta">
        <time dateTime={writing.publishedAt}>
          {writing.kind === "external" ? "初出 " : ""}{formatDate(writing.publishedAt)}
        </time>
        <span className={`kind-badge kind-${writing.kind}`}>
          {writing.kind === "external" ? writing.platform : "sena-v.com"}
        </span>
      </div>
      {writing.kind === "external" && writing.importedAt && (
        <span className="archive-note">このサイトへ収録 {formatDate(writing.importedAt)}</span>
      )}
      <h3>{writing.title}</h3>
      <p>{writing.summary}</p>
      <ul className="tag-list" aria-label="タグ">
        {writing.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
      <span className="card-action">
        {writing.kind === "external" ? "外部サイトで読む ↗" : "記事を読む →"}
      </span>
    </>
  )

  if (writing.kind === "external" && writing.externalUrl) {
    return (
      <a className="writing-card" href={writing.externalUrl} target="_blank" rel="noopener noreferrer">
        {cardBody}
        <span className="sr-only">（新しいタブで開く）</span>
      </a>
    )
  }

  return (
    <Link className="writing-card" href={`/articles/${writing.slug}`}>
      {cardBody}
    </Link>
  )
}
