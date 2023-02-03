import { ItemType } from "src/utils/read-md"
import { Box, Card, CardActionArea } from "@mui/material"
import { useRouter } from "next/router"
import React, { CSSProperties } from "react"

type PropsType = {
  post: ItemType
  createTags: (tags: string[], styleOption: CSSProperties) => JSX.Element[]
}

const PostThumbnail = ({ post, createTags }: PropsType) => {
  const router = useRouter()
  const url = `posts/${post.slug}`

  const PostCoverImage = () => {
    const coverImageUrl = "/images/icon.png" //post.slug ??

    return (
      <div
        style={{
          width: "100%",
          height: "180px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverImageUrl} alt="画像" style={{ width: "50%" }} />
      </div>
    )
  }

  return (
    <Box>
      <Card variant="outlined" sx={{ width: 350, height: 350, background: "#95959529" }} onMouseOver={() => {}}>
        <CardActionArea onClick={() => router.push(url)} style={{ padding: 15 }}>
          <article>
            <PostCoverImage />
            <div
              style={{
                height: "3rem",
              }}
            >
              {post.title}
            </div>
            <div
              style={{
                height: "1.5rem",
              }}
            >
              {post.date}&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div>{createTags(post.tags, { color: "white", marginTop: 3, marginBottom: 3 })}</div>
            <br />
          </article>
        </CardActionArea>
      </Card>
    </Box>
  )
}
export default PostThumbnail
