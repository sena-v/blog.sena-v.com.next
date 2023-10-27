"use client"

import styles from "./PostSelectSingle.module.css"
import ReactMarkdown from "react-markdown"
import CodeBlock from "./CodeBlock"
import { useEffect, useState } from "react"
import { ItemType } from "@/utils/read-md"

export const PostSelectSingle = ({ posts }: { posts: ItemType[] }) => {
  const [postIndex, setPostIndex] = useState<number>(0)

  const post = posts[postIndex]

  const CoverImage = () => {
    if (!post.coverImage) return <></>

    return (
      <div className={styles.container_post_image}>
        <img src={post.coverImage} className={styles.post_image} />
      </div>
    )
  }

  useEffect(() => globalThis.scroll(0, 0), [])

  return (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <CoverImage />
      <ReactMarkdown
        components={{
          code: CodeBlock,
        }}
      >
        {post.content}
      </ReactMarkdown>
      <div className={styles.button_container}>
        <button
          className={`${styles.button} ${styles.left_button}`}
          onClick={() => setPostIndex(postIndex < 0 ? postIndex - 1 : 0)}
        >
          {"<<<"}
        </button>
        <div className={styles.button_space} />
        <p className={styles.button_space}>{post.date}</p>
        <div className={styles.button_space} />
        <button className={`${styles.button} ${styles.right_button}`} onClick={() => setPostIndex(postIndex + 1)}>
          {">>>"}
        </button>
      </div>
    </div>
  )
}
