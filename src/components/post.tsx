import { Item } from "src/utils/read-md"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

const Post = (post: Item) => {
  const createTags = (tags: string[]) =>
    post.tags.map((tag) => (
      <ul key={tag} className="post-tag">
        <Link key={tag} href={`/tags/${tag}`}>
          {tag}
        </Link>
      </ul>
    ))

  return (
    <article className="slug-post">
      <h2>{post.title}</h2>
      <p>{post.date}</p>
      <p>{createTags(post.tags)}</p>
      <section>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </section>
    </article>
  )
}
export default Post
