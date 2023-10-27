import { ItemType } from "src/utils/read-md"
import { Box, Card, CardActionArea } from "@mui/material"
import { useRouter } from "next/router"
import React, { CSSProperties, useState, useEffect } from "react"

type PropsType = {
  post: ItemType
  createTags: (tags: string[], styleOption: CSSProperties) => JSX.Element[]
}

const PostThumbnail = ({ post, createTags }: PropsType) => {
  const [style, setStyle] = useState<Record<string, any>>([])
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
  const router = useRouter()
  const url = `posts/${post.slug}`

  useEffect(() => {
    const toggleStyle = (isMouseOver: boolean) => {
      const defaultStyle = { objectFit: "cover", height: "100%" }
      const mouseOverStyle = {
        objectFit: "cover",
        height: "100%",
        transform: "scale(1.2,1.2)",
      }

      setStyle(isMouseOver ? mouseOverStyle : defaultStyle)
    }

    toggleStyle(isMouseOver)
  }, [isMouseOver])

  const PostCoverImage = () => {
    return (
      <div
        style={{
          width: "100%",
          height: "180px",
          display: "flex",
          background: "white",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage}
          alt="画像"
          style={{ objectFit: "cover", height: "100%", ...style }}
          onMouseOver={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        />
      </div>
    )
  }

  return (
    <Box>
      <Card variant="outlined" sx={{ width: 350, height: 350, background: "#02032a2b" }} onMouseOver={() => {}}>
        <CardActionArea onClick={() => router.push(url)} style={{ paddingTop: 30, paddingBottom: 15 }}>
          <article>
            <PostCoverImage />
            <div style={{ padding: 10 }}>
              <div
                style={{
                  height: "3rem",
                }}
              >
                <span className="card-title">{post.title}</span>
              </div>
              <div
                style={{
                  height: "1.5rem",
                }}
              >
                <span
                  style={{
                    paddingTop: 10,
                    color: "#ffffff",
                  }}
                >
                  {" "}
                  {post.date}
                </span>
              </div>
              <div>{createTags(post.tags, { color: "white", marginTop: 3, marginBottom: 3 })}</div>
            </div>
            <br />
          </article>
        </CardActionArea>
      </Card>
    </Box>
  )
}
export default PostThumbnail
