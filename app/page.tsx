import { Metadata } from "next"
import Link from "next/link"
import { getAllPosts } from "src/utils/read-md"

import * as styles from "./page.css"

import { PostSelectSingle } from "@/components/client/PostSelectSingle/PostSelectSingle"
import {
  gitHubUrl,
  qiitaUrl,
  siteDescription,
  siteSourceCodeUrl,
  siteTitle,
  siteUrl,
  twitterUrl,
} from "@/utils/constants"

// 動的設定を用いてメタデータを生成する(urlが何であっても同じメタデータを返すことができる)
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: siteUrl,
      siteName: siteTitle,
      description: siteDescription,
      images: `${siteUrl}/background.jpg`,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
    },
  }
}

export default function Home() {
  const allPosts = getAllPosts(["slug", "title", "coverImage", "date", "tags", "content"])

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <a href="./">sena-v.com</a>
      </div>
      <div className={styles.linkContainer}>
        <Link href={gitHubUrl} className={styles.link}>
          Github
        </Link>
        <Link href={qiitaUrl} className={styles.link}>
          Qiita
        </Link>
        <Link href={twitterUrl} className={styles.link}>
          X(Twitter)
        </Link>
        <Link href={siteSourceCodeUrl} className={styles.link}>
          SourceCode
        </Link>
      </div>
      <PostSelectSingle posts={allPosts} />
    </main>
  )
}
