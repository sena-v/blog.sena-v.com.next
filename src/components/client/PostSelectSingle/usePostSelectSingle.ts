import { siteUrl } from "@/utils/constants"
import { ItemType } from "@/utils/read-md"

export const usePostSelectSingle = (props: { posts: ItemType[]; targetIndex: number }) => {
  const { posts, targetIndex } = props

  // slugが一致する対象の記事を取得
  const targetPost = posts[targetIndex]

  const currentUrl = `${siteUrl}/?slug=${posts[targetIndex].slug}`

  return { targetPost, currentUrl }
}
