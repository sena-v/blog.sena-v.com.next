import Link from "next/link"
import { ItemType } from "src/utils/read-md"
import { Dispatch } from "react"

export type AllPostsType = {
  allPosts: ItemType[]
  selectTagName: string
  setTagPage: Dispatch<string>
}

const TagPage = ({ allPosts, selectTagName, setTagPage }: AllPostsType) => {
  // allPost内でタグが存在する物のみ絞り込み
  const filteredPosts = allPosts
    .map((post) => {
      if (post.tags.indexOf(selectTagName) >= 0) return post
    })
    .filter((v) => v) as ItemType[]

  const createTags = (tags: string[]) =>
    tags.map((tag) => (
      <ul key={tag} className="post-tag" onClick={() => setTagPage(tag)}>
        {tag}
      </ul>
    ))

  return (
    <ul>
      {filteredPosts.map((post) => (
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

export default TagPage
