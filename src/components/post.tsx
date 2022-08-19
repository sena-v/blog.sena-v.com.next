import { ItemType } from "src/utils/read-md"
import ReactMarkdown from "react-markdown"
import CodeBlock from "@src/components/CodeBlock"
import Link from "next/link"

const Post = ({ ...post }: ItemType) => {
  const createTags = (tags: string[]) =>
    post.tags.map((tag) => (
      <ul key={tag} className="post-tag">
        {tag}
      </ul>
    ))

  return (
    <article className="slug-post">
      <h2>{post.title}</h2>
      <p>{post.date}</p>
      <p>{createTags(post.tags)}</p>
      <section>
        <ReactMarkdown
          components={{
            code: CodeBlock,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </section>
    </article>
  )
}
export default Post
