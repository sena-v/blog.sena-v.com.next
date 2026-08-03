import type { ComponentProps, ReactNode } from "react"
import Image from "next/image"
import ReactMarkdown, { type Components } from "react-markdown"

import { getArticleImageDimensions, normalizeArticleImageSrc } from "@/lib/article-images"
import { uniqueHeadingId } from "@/lib/markdown-headings"

type MarkdownAstNode = {
  type?: string
  depth?: number
  value?: string
  children?: MarkdownAstNode[]
  data?: {
    hProperties?: Record<string, unknown>
  }
}

function markdownAstText(node: MarkdownAstNode): string {
  if (typeof node.value === "string") return node.value
  return node.children?.map(markdownAstText).join("") ?? ""
}

function remarkHeadingIds() {
  return (tree: MarkdownAstNode) => {
    const headingOccurrences = new Map<string, number>()
    const visit = (node: MarkdownAstNode) => {
      if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
        const id = uniqueHeadingId(markdownAstText(node), headingOccurrences)
        node.data = {
          ...node.data,
          hProperties: { ...node.data?.hProperties, id },
        }
      }
      node.children?.forEach(visit)
    }
    visit(tree)
  }
}

export function MarkdownArticle({ content }: { content: string }) {
  const components: Components = {
    a: ({ href, children, ...props }: ComponentProps<"a">) => {
      const external = href?.startsWith("http://") || href?.startsWith("https://")
      return (
        <a {...props} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
          {children}
          {external && <span className="sr-only">（新しいタブで開く）</span>}
        </a>
      )
    },
    img: ({ alt, src, title, ...props }: ComponentProps<"img">) => {
      const normalizedSrc = typeof src === "string" ? normalizeArticleImageSrc(src) : src
      const dimensions = typeof normalizedSrc === "string" ? getArticleImageDimensions(normalizedSrc) : undefined
      if (typeof normalizedSrc === "string" && dimensions) {
        return (
          <Image
            src={normalizedSrc}
            alt={alt ?? ""}
            title={title}
            width={dimensions.width}
            height={dimensions.height}
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1199px) 664px, 720px"
            loading="lazy"
          />
        )
      }
      return <img {...props} src={normalizedSrc} alt={alt ?? ""} title={title} loading="lazy" decoding="async" />
    },
    pre: ({ children }: { children?: ReactNode }) => <>{children}</>,
    code: Code,
    h2: ({ children, node, ...props }) => {
      void node
      return <h2 {...props} tabIndex={-1}>{children}</h2>
    },
    h3: ({ children, node, ...props }) => {
      void node
      return <h3 {...props} tabIndex={-1}>{children}</h3>
    },
  }

  return <ReactMarkdown components={components} remarkPlugins={[remarkHeadingIds]}>{content}</ReactMarkdown>
}

function Code({ className, children, ...props }: ComponentProps<"code"> & { children?: ReactNode }) {
  const codeText = String(children ?? "")
  const language = /language-([^\s]+)/.exec(className ?? "")?.[1]

  if (!language) return <code {...props}>{children}</code>
  if (language === "threadToPost") return <ThreadArchive value={codeText} />
  if (language === "timeline") return <ArticleTimeline value={codeText} />

  return (
    <pre className="code-block" tabIndex={0} aria-label={`${language}のコード`}>
      <code className={className}>{codeText.replace(/\n$/, "")}</code>
    </pre>
  )
}

function ArticleTimeline({ value }: { value: string }) {
  const items = value
    .split("\n")
    .map((line) => {
      const separator = line.indexOf("@")
      return separator >= 0
        ? { title: line.slice(0, separator).trim(), description: line.slice(separator + 1).trim() }
        : { title: "", description: "" }
    })
    .filter(({ title, description }) => title && description)

  return (
    <ol className="timeline article-timeline">
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ol>
  )
}

function ThreadArchive({ value }: { value: string }) {
  const posts = value
    .split(",")
    .map((entry) => {
      const separator = entry.indexOf("@")
      return separator >= 0
        ? { name: entry.slice(0, separator).trim(), text: entry.slice(separator + 1).trim() }
        : { name: "", text: "" }
    })
    .filter(({ name, text }) => name && text)

  return (
    <section className="thread-archive" aria-label="投稿スレッドのアーカイブ">
      {posts.map((post, index) => (
        <article className="thread-item" key={`${post.name}-${index}`}>
          <strong>{post.name} · @sena-v.com</strong>
          <p>{post.text}</p>
        </article>
      ))}
    </section>
  )
}
