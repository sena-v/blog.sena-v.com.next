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

// layout.tsxだとクエリパラメータを取得できないので、page.tsxでメタデータを生成する
interface Props {
  searchParams: Record<string, string | string[] | undefined>
}

// 動的設定を用いてメタデータを生成する(urlが何であっても同じメタデータを返すことができる)
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { urlWithQuery } = getAllPostAndTargetSlug(props)

  return {
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: urlWithQuery,
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

export default function Home(props: Props) {
  const { allPosts, targetIndex } = getAllPostAndTargetSlug(props)

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
      <PostSelectSingle posts={allPosts} targetIndex={targetIndex} />
    </main>
  )
}

const getAllPostAndTargetSlug = (props: Props) => {
  const allPosts = getAllPosts(["slug", "title", "coverImage", "date", "tags", "content"])

  // slugが一致する対象の記事を取得
  const targetIndex = (() => {
    for (let i = 0; i < allPosts.length; i++) {
      if (allPosts[i].slug === props.searchParams.slug) {
        return i // 一致する要素のインデックスを返す
      }
    }
    return 0 // 一致する要素が見つからない場合は0を返す(topを表示)
  })()

  // slugが一致する対象の記事のslugを取得(構造上一致しない場合はtop記事のslugが返る)
  const targetSlug = allPosts[targetIndex].slug

  const urlWithQuery = `${siteUrl}/?slug=${targetSlug}`

  return { allPosts, targetIndex, urlWithQuery }
}
