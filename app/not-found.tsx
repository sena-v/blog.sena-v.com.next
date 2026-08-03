import Link from "next/link"

export default function NotFound() {
  return (
    <main id="main-content" className="section shell">
      <div className="empty-state">
        <p className="eyebrow">404 · NOT FOUND</p>
        <h1>ページが見つかりませんでした</h1>
        <p>URLが変更されたか、ページが削除された可能性があります。</p>
        <div className="button-row" style={{ justifyContent: "center" }}>
          <Link className="button button-primary" href="/">ホームへ戻る</Link>
          <Link className="button button-secondary" href="/writings">記事を探す</Link>
        </div>
      </div>
    </main>
  )
}
