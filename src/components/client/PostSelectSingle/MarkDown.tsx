"use client"

import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism"

import * as styles from "./PostSelectSingle.css"

import { ItemType } from "@/utils/read-md"

export function MarkDown({ post }: { post: ItemType }) {
  const components = {
    code: CodeBlock,
    img: (props: any) => (
      <div className={styles.containerPostImage}>
        <img {...props} alt={props.alt ?? "postImage"} className={styles.postImage} width="10" height="10" />
      </div>
    ),
  }

  return <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
}

function CodeBlock({ inline, className, children }: any) {
  if (inline) {
    return <code className={className}>{children}</code>
  }
  const match = /language-(\w+)/.exec((className as string) || "")
  const lang = match && match[1] ? match[1] : ""

  // htmlTagが指定された場合、divの子要素ににそのままhtmlを埋め込む
  if (lang === "htmlTag") {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: children,
        }}
      />
    )
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
