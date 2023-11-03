"use client"

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
