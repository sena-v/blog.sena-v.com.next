import Link from "next/link"
import { ItemType } from "src/utils/read-md"

export type AllPosts = {
  allPosts: ItemType[]
}

const TopPage = ({ allPosts }: AllPosts) => {
  const createTags = (tags: string[]) =>
    tags.map((tag) => (
      <ul key={tag} className="post-tag">
        <Link key={tag} href={`/tags/${tag}`}>
          {tag}
        </Link>
      </ul>
    ))

  return (
    <ul>
      {allPosts.map((post) => (
        <article key={post.slug} className="top-post">
          <time dateTime={post.date}>{post.date}</time>
          <h2 className="top">
            <Link href={`/posts/${post.slug}`} aria-label={post.title}>
              {post.title}
            </Link>
          </h2>
          <div>{createTags(post.tags.sort())}</div>
        </article>
      ))}
    </ul>
  )
}

export default TopPage
