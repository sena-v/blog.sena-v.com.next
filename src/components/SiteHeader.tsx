import Link from "next/link"

import { HomeLogoLink } from "@/components/client/HomeLogoLink"

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <HomeLogoLink />
        <nav aria-label="メインナビゲーション">
          <ul className="nav-list">
            <li>
              <Link href="/">ホーム</Link>
            </li>
            <li>
              <Link href="/writings">記事一覧</Link>
            </li>
            <li>
              <Link href="/about">ブログについて</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
