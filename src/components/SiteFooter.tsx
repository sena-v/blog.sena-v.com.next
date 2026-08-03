import Link from "next/link"

import { gitHubUrl, qiitaUrl, siteSourceCodeUrl, twitterUrl } from "@/utils/constants"

const externalLinks = [
  ["GitHub", gitHubUrl],
  ["Qiita", qiitaUrl],
  ["X", twitterUrl],
  ["Source", siteSourceCodeUrl],
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="wordmark footer-wordmark" href="/">
            sena-v<span aria-hidden="true">.</span>com
          </Link>
          <p>コードと設計、たまにそのほか。</p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <ul>
            <li><Link href="/writings">Writings</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/rss.xml">RSS</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-label">Elsewhere</p>
          <ul>
            {externalLinks.map(([label, href]) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {label} <span className="sr-only">（新しいタブで開く）</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell footer-bottom">
        <small>© {new Date().getFullYear()} sena-v. Built with Next.js.</small>
      </div>
    </footer>
  )
}
