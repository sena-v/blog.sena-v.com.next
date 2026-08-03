import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="sena-v.com ホーム">
          sena-v<span aria-hidden="true">.</span>com
        </Link>
        <nav aria-label="メインナビゲーション">
          <ul className="nav-list">
            <li>
              <Link href="/writings">記事一覧</Link>
            </li>
            <li>
              <Link href="/about">このブログについて</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
