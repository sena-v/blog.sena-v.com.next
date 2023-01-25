import { ItemType } from "src/utils/read-md"
import ReactMarkdown from "react-markdown"
import CodeBlock from "@src/components/CodeBlock"
import SharingButton from "@src/components/ShareButton"

const Post = ({ ...post }: ItemType) => {
  const createTags = (tags: string[]) =>
    post.tags.map((tag) => (
      <ul key={tag} className="post-tag">
        {tag}
      </ul>
    ))

  const url = `https://sena-v.com/posts/${post.slug}`

  return (
    <>
      <article className="slug-post">
        <h2
          style={{
            height: "50px",
            margin: 0,
            verticalAlign: "center",
          }}
        >
          {post.title}
        </h2>
        <p
          style={{
            height: "30px",
            marginBottom: "10px",
            verticalAlign: "center",
          }}
        >
          {post.date}&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <div>{createTags(post.tags)}</div>

        <section>
          <ReactMarkdown
            components={{
              code: CodeBlock,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </section>
        <SharingButton url={url} title={post.title} />
      </article>
    </>
  )
}
export default Post
