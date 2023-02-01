import { ItemType } from "src/utils/read-md"
import { Box, Card, CardActionArea } from "@mui/material"
import { useRouter } from "next/router"
import React, { Dispatch } from "react"

type PropsType = {
  post: ItemType
  createTags: (tags: string[]) => JSX.Element[]
}

const PostThumbnail = ({ post, createTags }: PropsType) => {
  const router = useRouter()
  const url = `posts/${post.slug}`

  return (
    <Box sx={{ width: 350 }}>
      <Card variant="outlined">
        <CardActionArea onClick={() => router.push(url)}>
          <article className="slug-post">
            {post.title}
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
            <br />
          </article>
        </CardActionArea>
      </Card>
    </Box>
  )
}
export default PostThumbnail
