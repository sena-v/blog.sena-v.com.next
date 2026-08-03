import type { Metadata } from "next"
import Link from "next/link"

import { gitHubUrl, qiitaUrl, twitterUrl } from "@/utils/constants"

export const metadata: Metadata = {
  title: "About",
  description: "sena-vと、この個人ブログで書いていることについて。",
  alternates: { canonical: "/about" },
}

function ExternalLinkMark() {
  return (
    <span className="about-link-end">
      <span>外部</span>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M5 11 11 5M6 5h5v5" />
      </svg>
    </span>
  )
}

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <header className="page-hero about-hero about-shell shell">
        <div className="about-hero-label">
          <p className="eyebrow"><span>ABOUT</span><span>/ sena-v.com</span></p>
        </div>
        <div className="page-hero-copy">
          <h1>このブログについて</h1>
          <p className="page-intro">
            TypeScriptやNext.js、個人開発で詰まったことを書いています。
          </p>
        </div>
        <dl className="about-history" aria-label="ブログの沿革">
          <div><dt>2019</dt><dd>Qiitaへ投稿開始</dd></div>
          <div><dt>2020</dt><dd>sena-v.com開始</dd></div>
          <div><dt>2026</dt><dd>ブログを再構築</dd></div>
        </dl>
      </header>

      <section className="section about-shell shell about-section">
        <article className="about-prose">
          <section className="about-chapter about-chapter-main">
            <header>
              <h2>書いていること</h2>
            </header>
            <div className="about-chapter-copy">
              <p>
                2019年にQiitaへ投稿を始め、2020年からこのブログにも書いています。
                実装中に詰まったことや、使い比べて分かった違いを、あとで自分が読み返せる形で残しています。
              </p>
              <ul className="about-topic-list" aria-label="主に扱う技術とテーマ">
                <li>#TypeScript</li>
                <li>#JavaScript</li>
                <li>#React</li>
                <li>#Next.js</li>
                <li>#Node.js</li>
                <li>#個人開発</li>
              </ul>
            </div>
          </section>

        </article>

        <aside className="about-aside" aria-label="外部リンクと記事一覧">
          <div className="about-links">
            <div className="about-links-heading">
              <h2>リンク</h2>
            </div>
            <ul>
              <li>
                <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
                  <span><strong>GitHub</strong><small>コード</small></span>
                  <ExternalLinkMark />
                  <span className="sr-only">（新しいタブで開く）</span>
                </a>
              </li>
              <li>
                <a href={qiitaUrl} target="_blank" rel="noopener noreferrer">
                  <span><strong>Qiita</strong><small>過去記事</small></span>
                  <ExternalLinkMark />
                  <span className="sr-only">（新しいタブで開く）</span>
                </a>
              </li>
              <li>
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                  <span><strong>X</strong><small>日々のメモ</small></span>
                  <ExternalLinkMark />
                  <span className="sr-only">（新しいタブで開く）</span>
                </a>
              </li>
              <li>
                <Link href="/writings">
                  <span><strong>記事一覧</strong><small>このブログ</small></span>
                  <span className="about-link-end"><span>サイト内</span><span aria-hidden="true">→</span></span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  )
}
