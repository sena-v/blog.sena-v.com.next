import { NextPage, InferGetStaticPropsType } from "next"
import { Box } from "@chakra-ui/react"
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
      <ul
        key={tag}
        style={{
          marginLeft: "0px",
          marginBottom: "10px",
          marginRight: "10px",
          display: "inline-block",
          backgroundColor: "#98e1ff",
          paddingLeft: "5px",
          paddingRight: "5px",
          borderRadius: "5px",
        }}
        className="tag"
      >
        <Link key={tag} href={`/tags/${tag}`} className="tag">
          {tag}
        </Link>
      </ul>
    ))

  return (
    <ul>
      {allPosts.map((post) => (
        <article key={post.slug}>
          <h2>
            <Link href={`/posts/${post.slug}`} aria-label={post.title}>
              {post.title}
            </Link>
          </h2>
          <div>{createTags(post.tags)}</div>
          <time dateTime={post.date}>{post.date}</time>
        </article>
      ))}
    </ul>
  )
}

export default Home
