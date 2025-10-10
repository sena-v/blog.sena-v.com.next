"use client"

import Image from "next/image"
import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { ItemType } from "@/utils/read-md"

import * as styles2 from "./MarkDown.css"
import * as styles from "./PostSelectSingle.css"

type MarkdownAnchorProps = ComponentPropsWithoutRef<"a">
type MarkdownImageProps = ComponentPropsWithoutRef<"img">
interface MarkdownCodeProps extends ComponentPropsWithoutRef<"code"> {
  inline?: boolean
  className?: string
  children?: ReactNode
}

export function MarkDown({ post }: { post: ItemType }) {
  const components: Components = {
    a: (anchorProps: MarkdownAnchorProps) => <a {...anchorProps} className={styles.link} />,
    code: CodeBlock as Components["code"],
    img: (imageProps: MarkdownImageProps) => (
      <div className={styles.containerPostImage}>
        <Image
          alt={imageProps.alt ?? "postImage"}
          src={typeof imageProps.src === "string" ? imageProps.src : ""}
          className={styles.postImage}
          width={500}
          height={500}
        />
      </div>
    ),
  }

  return <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
}

const normaliseChildrenToText = (value: ReactNode): string => {
  if (typeof value === "string") {
    return value
  }

  if (Array.isArray(value)) {
    return value.map((child) => normaliseChildrenToText(child)).join("")
  }

  return ""
}

const CodeBlock = ({ inline, className, children }: MarkdownCodeProps) => {
  // 改行コードがない場合インラインと判定する
  const codeContent = normaliseChildrenToText(children)
  const isInline = inline ?? !codeContent.includes("\n")

  if (isInline) {
    return (
      <span className={styles2.codeContainer}>
        <code className={styles2.code}>{codeContent}</code>
      </span>
    )
  }

  const match = className ? /language-(\w+)/.exec(className) : null
  const lang = match && match[1] ? match[1] : ""

  // htmlTagが指定された場合、divの子要素ににそのままhtmlを埋め込む
  if (lang === "threadToPost") {
    // 先頭にフラグ文字が入っていた場合、スレッド形式の投稿を記事形式に変換する
    return createStringThreadToPostHtml(codeContent)
  }

  // 言語にcodeSandboxが設定され、本文内にurlがある場合codeSandboxのパーツを表示する
  if (lang === "codeSandbox") {
    return (
      <iframe
        src={codeContent}
        style={{ width: "100%", height: "500px", border: 0, borderRadius: "4px", overflow: "hidden" }}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    )
  }

  return (
    <div style={{ overflow: "scroll" }}>
      <SyntaxHighlighter style={okaidia} language={lang}>
        {codeContent.replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  )
}

const createStringThreadToPostHtml = (htmlString: string) => {
  const [isThreadOpen, setIsThreadOpen] = useState(false)

  // 変換前に対応文字列を使用してオブジェクトに変換する
  const [top, ...threads] = htmlString
    .split(",")
    .filter((v) => !!v)
    .map((str) => {
      const [name, text] = str.split("@")
      return { name, text }
    })
    .filter((v) => !!v.text && !!v.name)

  const SinglePost = (data: { name: string; text: string }, index: number) => {
    return (
      <div key={index} className={styles2.postContainer}>
        <div className={styles2.postNameArea}>
          <Image alt="icon" src="/background.jpg" width={50} height={50} className={styles2.iconImage} />
          <div className={styles2.postNameGrid}>
            <div>{data.name}</div>
            <div className={styles2.postNameID}>@sena-v.com</div>
          </div>
        </div>
        <div className={styles2.postTextArea}>{data.text}</div>
      </div>
    )
  }

  // トップ記事以外は折りたたみたいので分離
  return (
    <div className={styles2.foldableThreadContainer}>
      {top && SinglePost(top, 0)}
      <div className={styles2.foldableThreadButtonContainer}>
        <span className={styles2.foldableThreadButton} onClick={() => setIsThreadOpen(!isThreadOpen)}>
          スレッドを開く
        </span>
      </div>
      <div className={!isThreadOpen ? styles2.foldableThreadNone : styles2.foldableThreadVisible}>
        {threads.map((thread, index) => SinglePost(thread, index))}
      </div>
    </div>
  )
}
