"use client"

import styles from "./PostSelectSingle.module.css"
import ReactMarkdown from "react-markdown"
import { useEffect, useState } from "react"
import { ItemType } from "@/utils/read-md"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism"

export const CodeBlock = ({ inline, className, children }: any) => {
  if (inline) {
    return <code className={className}>{children}</code>
  }
  const match = /language-(\w+)/.exec(className || "")
  const lang = match && match[1] ? match[1] : ""
  return (
    <SyntaxHighlighter style={okaidia} language={lang}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  )
}

export const PostSelectSingle = ({ posts }: { posts: ItemType[] }) => {
  const [postIndex, setPostIndex] = useState<number>(0)

  const post = posts[postIndex]

  const CoverImage = () => {
    if (!post.coverImage) return <></>

    return (
      <div className={styles.container_post_image}>
        <img src={post.coverImage} alt={"coverImage"} className={styles.post_image} width="10" height="10" />
      </div>
    )
  }

  const components = {
    code: CodeBlock,
    img: (props: any) => (
      <div className={styles.container_post_image}>
        <img {...props} alt={props.alt ?? "postImage"} className={styles.post_image} width="10" height="10" />
      </div>
    ),
  }

  useEffect(() => globalThis.scroll(0, 0), [post])

  return (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <CoverImage />
      <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
      <p className={styles.post_date}>{post.date}</p>
      <div className={styles.button_container}>
        <button
          className={`${styles.button} ${styles.left_button}`}
          onClick={() => setPostIndex(postIndex < 0 ? postIndex - 1 : 0)}
        >
          {"<<<"}
        </button>
        <div className={styles.button_space} />
        <p className={styles.button_space}> - {postIndex + 1} - </p>
        <div className={styles.button_space} />
        <button className={`${styles.button} ${styles.right_button}`} onClick={() => setPostIndex(postIndex + 1)}>
          {">>>"}
        </button>
      </div>
    </div>
  )
}
