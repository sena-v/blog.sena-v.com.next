import { MarkDown } from "./MarkDown"
import * as styles from "./PostSelectSingle.css"
import { usePostSelectSingle } from "./usePostSelectSingle"
import { SharingButtons } from "../ShareButton/ShareButton"
import { UnderPagingButton } from "../UnderPagingButton/UnderPagingButton"

import { ItemType } from "@/utils/read-md"

export function PostSelectSingle(props: { posts: ItemType[]; targetIndex: number }) {
  const { targetPost, currentUrl } = usePostSelectSingle(props)

  const CoverImage = () => {
    if (!targetPost.coverImage) return <></>

    return (
      <div className={styles.containerPostImage}>
        <img src={targetPost.coverImage} alt={"coverImage"} className={styles.postImage} width="10" height="10" />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1>{targetPost.title}</h1>
      <SharingButtons title={targetPost.title} url={currentUrl} />
      <CoverImage />
      <MarkDown post={targetPost} />
      <p className={styles.postDate}>{targetPost.date}</p>
      <UnderPagingButton {...props} />
    </div>
  )
}
