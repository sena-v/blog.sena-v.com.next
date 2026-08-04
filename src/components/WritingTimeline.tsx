import Link from "next/link"

import { formatDate, type Writing } from "@/lib/content"

export function WritingTimeline({ writings }: { writings: Writing[] }) {
  return (
    <ol className="writing-timeline">
      {writings.map((writing) => (
        <li className="writing-timeline-entry" key={`${writing.kind}-${writing.slug}`}>
          <div className="timeline-entry-meta">
            <time dateTime={writing.publishedAt}>{formatDate(writing.publishedAt)}</time>
            <span className={`kind-badge kind-${writing.kind}`}>
              {writing.kind === "external" ? writing.platform : "sena-v.com"}
            </span>
          </div>
          <h2>
            {writing.kind === "external" && writing.externalUrl ? (
              <a className="timeline-title" href={writing.externalUrl} target="_blank" rel="noopener noreferrer">
                <span>{writing.title}</span>
                <span className="timeline-external-label" aria-hidden="true">
                  外部サイト
                  <svg viewBox="0 0 12 12" focusable="false">
                    <path d="M4.25 2.25h-2v7.5h7.5v-2M6.25 2.25h3.5v3.5M9.5 2.5l-4.25 4.25" />
                  </svg>
                </span>
                <span className="sr-only">（新しいタブで開く）</span>
              </a>
            ) : (
              <Link className="timeline-title" href={`/articles/${writing.slug}`}>
                {writing.title}
              </Link>
            )}
          </h2>
          <p>{writing.summary}</p>
          {writing.kind === "external" && writing.importedAt && (
            <p className="timeline-archive-note">このサイトへ収録 {formatDate(writing.importedAt)}</p>
          )}
          <ul className="tag-list" aria-label="タグ">
            {writing.tags.map((tag) => (
              <li key={tag}>
                <Link className="tag-link" href={`/tags/${encodeURIComponent(tag)}`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
