"use client"

import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism"

import * as styles from "./PostSelectSingle.css"

import { ItemType } from "@/utils/read-md"

export function MarkDown({ post }: { post: ItemType }) {
  const components = {
    a: (props: any) => <a {...props} className={styles.link} />,
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const match = /language-(\w+)/.exec(className || "")
  const lang = match && match[1] ? match[1] : ""
  return (
    <SyntaxHighlighter style={okaidia} language={lang}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  )
}
