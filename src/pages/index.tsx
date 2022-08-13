import { NextPage, InferGetStaticPropsType } from "next"
import { getAllPosts } from "@src/utils/readMd"
import Link from "next/link"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["slug", "title", "date", "tags"])

  return {
    props: { allPosts },
  }
}

const Home: NextPage<Props> = ({ allPosts }) => {
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
          <div>{createTags(post.tags)}</div>
        </article>
      ))}
    </ul>
  )
}

export default Home
