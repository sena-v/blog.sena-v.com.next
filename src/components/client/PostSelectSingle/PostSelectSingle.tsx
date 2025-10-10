import Image from "next/image"

import { MarkDown } from "./MarkDown"
import * as styles from "./PostSelectSingle.css"
import { usePostSelectSingle } from "./usePostSelectSingle"
import { SharingButtons } from "../ShareButton/ShareButton"
import { UnderPagingButton } from "../UnderPagingButton/UnderPagingButton"

import type { PostDataTypes } from "app/page"

export function PostSelectSingle(props: { data: PostDataTypes; targetIndex: number }) {
  const { targetPost, currentUrl } = usePostSelectSingle(props.data.posts, props.targetIndex)

  const CoverImage = () => {
    if (!targetPost.coverImage) return <></>

    return (
      <div className={styles.containerPostImage}>
        <Image
          src={`/${targetPost.coverImage}`}
          alt={"coverImage"}
          className={styles.postImage}
          width={500}
          height={500}
          priority={true}
        />
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
      <UnderPagingButton posts={props.data.posts} targetIndex={props.targetIndex} />
    </div>
  )
}
