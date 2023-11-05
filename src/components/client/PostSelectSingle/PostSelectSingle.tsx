"use client"

import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism"

import * as styles from "./PostSelectSingle.css"
import { usePostSelectSingle } from "./usePostSelectSingle"

import { SharingButtons } from "@/components/ShareButton/ShareButton"
import { ItemType } from "@/utils/read-md"

export function PostSelectSingle({ posts }: { posts: ItemType[] }) {
  const { post, postIndex, currentUrl, moveNextIndexPage } = usePostSelectSingle(posts)

  const CoverImage = () => {
    if (!post.coverImage) return <></>

    return (
      <div className={styles.containerPostImage}>
        <img src={post.coverImage} alt={"coverImage"} className={styles.postImage} width="10" height="10" />
      </div>
    )
  }

  const components = {
    code: CodeBlock,
    img: (props: any) => (
      <div className={styles.containerPostImage}>
        <img {...props} alt={props.alt ?? "postImage"} className={styles.postImage} width="10" height="10" />
      </div>
    ),
  }

  return (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <SharingButtons title={post.title} url={currentUrl} />
      <CoverImage />
      <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
      <p className={styles.postDate}>{post.date}</p>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${styles.leftButton}`}
          onClick={() => moveNextIndexPage(postIndex < 0 ? postIndex - 1 : 0)}
        >
          {"<<<"}
        </button>
        <div className={styles.buttonSpace} />
        <p className={styles.buttonSpace}> - {postIndex + 1} - </p>
        <div className={styles.buttonSpace} />
        <button className={`${styles.button} ${styles.rightButton}`} onClick={() => moveNextIndexPage(postIndex + 1)}>
          {">>>"}
        </button>
      </div>
    </div>
  )
}

function CodeBlock({ inline, className, children }: any) {
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
