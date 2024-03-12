"use client"

import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism"

import * as styles2 from "./MarkDown.css"
import * as styles from "./PostSelectSingle.css"

import { ItemType } from "@/utils/read-md"

export function MarkDown({ post }: { post: ItemType }) {
  const components = {
    a: (props: any) => <a {...props} className={styles.link} />,
    code: CodeBlock,
    img: (props: any) => (
      <div className={styles.containerPostImage}>
        <Image
          alt={props.alt ?? "postImage"}
          src={props.src}
          className={styles.postImage}
          width={500}
          height={500}
          priority={true}
        />
      </div>
    ),
  }

  return <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
}

function CodeBlock({ inline, className, children }: any) {
  // 改行コードがない場合インラインと判定する
  const isInline = (children as string).includes("\n") ? false : true

  if (isInline) {
    return (
      <span className={styles2.codeContainer}>
        <code className={styles2.code}>{children}</code>
      </span>
    )
  }

  const match = /language-(\w+)/.exec(className as string)
  const lang = match && match[1] ? match[1] : ""

  // htmlTagが指定された場合、divの子要素ににそのままhtmlを埋め込む
  if (lang === "threadToPost") {
    // 先頭にフラグ文字が入っていた場合、スレッド形式の投稿を記事形式に変換する
    return createStringThreadToPostHtml(children as string)
  }

  // 言語にcodeSandboxが設定され、本文内にurlがある場合codeSandboxのパーツを表示する
  if (lang === "codeSandbox") {
    return (
      <iframe
        src={children}
        style={{ width: "100%", height: "500px", border: 0, borderRadius: "4px", overflow: "hidden" }}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    )
  }

  return (
    <SyntaxHighlighter style={okaidia} language={lang}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  )
}

const createStringThreadToPostHtml = (htmlString: string) => {
  // 変換前に対応文字列を使用してオブジェクトに変換する
  const threads = htmlString
    .split(",")
    .filter((v) => !!v)
    .map((str) => {
      const [name, text] = str.split("@")
      return { name, text }
    })
    .filter((v) => !!v.text && !!v.name)

  return (
    <>
      {threads.map((thread, index) => {
        return (
          <div key={index} className={styles2.postContainer}>
            <div className={styles2.postName}>{thread.name}</div>
            <div className={styles2.postText}>{thread.text}</div>
          </div>
        )
      })}
    </>
  )
}
