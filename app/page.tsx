import { Metadata } from "next"
import { cookies } from "next/headers"
import Link from "next/link"
import { getAllPosts, getFilteredPost, ItemType } from "src/utils/read-md"

import * as styles from "./page.css"
import { SearchMenuButton, SearchMenuModal } from "./SearchMenuModal"

import { PostSelectSingle } from "@/components/client/PostSelectSingle/PostSelectSingle"
import { gitHubUrl, qiitaUrl, siteSourceCodeUrl, siteTitle, siteUrl, twitterUrl } from "@/utils/constants"

// layout.tsxだとクエリパラメータを取得できないので、page.tsxでメタデータを生成する
interface Props {
  searchParams: Record<string, string | string[] | undefined>
}

// 動的設定を用いてメタデータを生成する(urlが何であっても同じメタデータを返すことができる)
export async function generateMetadata(props: Props): Promise<Metadata> {
  const filterParams = decodeURI(cookies().get("searchModalParams")?.value ?? "")
  const { targetPostTitle, urlWithQuery } = initPostsData(props, filterParams)

  return {
    title: siteTitle,
    description: targetPostTitle,
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: urlWithQuery,
      siteName: siteTitle,
      description: targetPostTitle,
      images: `${siteUrl}/background.jpg`,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: targetPostTitle,
    },
  }
}

export default function Home(props: Props) {
  const filterParams = cookies().get("searchModalParams")?.value
  const { posts, targetIndex } = initPostsData(props, filterParams)

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <a href="./">sena-v.com</a>
      </div>
      <div className={styles.linkContainer}>
        <div className={styles.link}>
          <Link href={gitHubUrl}>Github</Link>
        </div>
        <div className={styles.link}>
          <Link href={qiitaUrl}>Qiita</Link>
        </div>
        <div className={styles.link}>
          <Link href={twitterUrl}>X(Twitter)</Link>
        </div>
        <div className={styles.link}>
          <Link href={siteSourceCodeUrl}>SourceCode</Link>
        </div>
        <SearchMenuButton />
      </div>
      <PostSelectSingle posts={posts} targetIndex={targetIndex} />
      <SearchMenuModal />
    </main>
  )
}

const initPostsData = (props: Props, filterParams: string | undefined) => {
  // cookieにfilterParamsがセットされているかどうかで表示する記事を判定
  const posts: ItemType[] = (() => {
    const allPosts = getAllPosts()

    if (!filterParams) return allPosts
    const filteredPost = getFilteredPost(filterParams)

    // 正しくフィルタリングされている場合はフィルタリング結果を返す
    if (filterParams && filteredPost.length > 0) return filteredPost
    else return allPosts
  })()

  // slugが一致する対象の記事を取得
  const targetIndex = (() => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].slug === props.searchParams.slug) {
        return i // 一致する要素のインデックスを返す
      }
    }
    return 0 // 一致する要素が見つからない場合は0を返す(topを表示)
  })()

  // slugが一致する対象の記事のslugを取得(構造上一致しない場合はtop記事のslugが返る)
  const targetSlug = posts[targetIndex].slug
  const targetPostTitle = posts[targetIndex].title

  const urlWithQuery = `${siteUrl}/?slug=${targetSlug}`

  return { posts, targetIndex, targetPostTitle, urlWithQuery }
}
