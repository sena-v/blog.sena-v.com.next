import { siteUrl } from "@/utils/constants"
import { ItemType } from "@/utils/read-md"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const usePostSelectSingle = (posts: ItemType[]) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const findIndexByValue = (targetValue: string): number => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].slug === targetValue) {
        return i // 一致する要素のインデックスを返す
      }
    }
    return 0 // 一致する要素が見つからない場合は0を返す(topを表示)
  }

  // slugが一致する対象の記事を取得
  const postIndex = findIndexByValue(searchParams.get("slug") ?? "")
  const post = posts[postIndex]

  // slugを指定して記事を表示
  const moveNextIndexPage = (index: number) => {
    router.push(`/?slug=${posts[index].slug}`)
  }

  const currentUrl = `${siteUrl}/?slug=${posts[postIndex].slug}`

  useEffect(() => globalThis.scroll(0, 0), [post])

  return {
    post,
    postIndex,
    currentUrl,
    moveNextIndexPage,
  }
}
