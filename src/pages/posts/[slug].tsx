import { NextPage, InferGetStaticPropsType } from "next"
import { getAllPosts, getPostBySlug } from "@src/utils/read-md"
import ReactMarkdown from "react-markdown"
import CodeBlock from "@src/components/CodeBlock"
import Link from "next/link"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const post = getPostBySlug(params.slug, [
    "slug",
    "title",
    "date",
    "tags",
    "content",
  ])

  // 変換結果をpropsとして渡す
  return {
    props: {
      post,
    },
  }
}

const SlugPage: NextPage<Props> = ({ post }) => {
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
export default SlugPage
