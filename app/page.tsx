import { Metadata } from "next"
import { cookies } from "next/headers"
import Link from "next/link"
import { getAllPosts, getFilteredPost, ItemType } from "src/utils/read-md"

import * as styles from "./page.css"
import { SearchMenuButton, SearchMenuModal } from "./SearchMenuModal"
import { _Caveat } from "../src/utils/font"

import { GoTopButton } from "@/components/client/GoTopButton/GoTopButton"
import { PostSelectSingle } from "@/components/client/PostSelectSingle/PostSelectSingle"
import { gitHubUrl, qiitaUrl, siteSourceCodeUrl, siteTitle, siteUrl, twitterUrl } from "@/utils/constants"
import { moveSiteTop } from "@/utils/routerUtil"

// layout.tsxだとクエリパラメータを取得できないので、page.tsxでメタデータを生成する
interface PropsTypes {
  searchParams: Record<string, string | string[] | undefined>
}

export interface PostDataTypes {
  posts: ItemType[]
  filterResult: boolean | undefined
}

// 動的設定を用いてメタデータを生成する(urlが何であっても同じメタデータを返すことができる)
export async function generateMetadata(props: PropsTypes): Promise<Metadata> {
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

export default function Home(props: PropsTypes) {
  const filterParams = cookies().get("searchModalParams")?.value
  const { data, targetIndex } = initPostsData(props, filterParams)

  return (
    <main className={styles.main}>
      <div className={styles.backgroundImageContainer}>
        {/* <Image
          src="/background.jpg"
          className={styles.backgroundImage}
          alt="bgImage"
          width={1000}
          height={1000}
          loading="lazy"
        /> */}
      </div>
      <div className={`${styles.title} ${_Caveat.className}`}>
        <form action={moveSiteTop}>
          <button className={styles.siteTopButton}>sena-v.com</button>
        </form>
      </div>
      <div className={`${styles.linkContainer} ${_Caveat.className}`}>
        <Link href={gitHubUrl} target="_blank" data-testid="button-github">
          <div className={styles.link}>Github</div>
        </Link>
        <Link href={qiitaUrl} target="_blank" data-testid="button-qiita">
          <div className={styles.link}>Qiita</div>
        </Link>
        <Link href={twitterUrl} target="_blank" data-testid="button-twitter">
          <div className={styles.link}>X(Twitter)</div>
        </Link>
        <Link href={siteSourceCodeUrl} target="_blank" data-testid="button-source">
          <div className={styles.link}>SourceCode</div>
        </Link>
        <SearchMenuButton />
      </div>
      <div className={styles.postSingleContainer}>
        <PostSelectSingle data={data} targetIndex={targetIndex} />
        <GoTopButton />
      </div>
      <SearchMenuModal data={data} />
    </main>
  )
}

const initPostsData = (props: PropsTypes, filterParams: string | undefined) => {
  // cookieにfilterParamsがセットされているかどうかで表示する記事を判定
  const data: PostDataTypes = (() => {
    const allPosts = getAllPosts()

    if (!filterParams) return { posts: allPosts, filterResult: undefined }
    const filteredPost = getFilteredPost(filterParams)

    // 正しくフィルタリングされている場合はフィルタリング結果を返す
    if (filterParams && filteredPost.length > 0) return { posts: filteredPost, filterResult: true }
    else return { posts: allPosts, filterResult: false }
  })()

  // slugが一致する対象の記事を取得
  const targetIndex = (() => {
    for (let i = 0; i < data.posts.length; i++) {
      if (data.posts[i].slug === props.searchParams.slug) {
        return i // 一致する要素のインデックスを返す
      }
    }
    return 0 // 一致する要素が見つからない場合は0を返す(topを表示)
  })()

  // slugが一致する対象の記事のslugを取得(構造上一致しない場合はtop記事のslugが返る)
  const targetSlug = data.posts[targetIndex].slug
  const targetPostTitle = data.posts[targetIndex].title

  const urlWithQuery = `${siteUrl}/?slug=${targetSlug}`

  return { data, targetIndex, targetPostTitle, urlWithQuery }
}
