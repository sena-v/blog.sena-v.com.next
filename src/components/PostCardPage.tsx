import { CSSProperties, Dispatch } from "react"
import { ItemType } from "src/utils/read-md"
import PostThumbnail from "./PostThumbnail"
import Grid from "@mui/material/Grid"
import { Box } from "@mui/material"

type PropsType = {
  allPosts: ItemType[]
  setTagPage: Dispatch<string>
}

const PostCardPage = ({ allPosts, setTagPage }: PropsType) => {
  const createTags = (tags: string[], styleOption?: CSSProperties) =>
    tags.map((tag) => (
      <ul key={tag} className="post-tag-top" style={{ ...styleOption }} onClick={() => setTagPage(tag)}>
        {tag}
      </ul>
    ))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ul>
        <Grid container spacing={2}>
          {allPosts.map((post, index) => (
            <Grid item key={index}>
              <PostThumbnail {...{ post, createTags }} />
            </Grid>
          ))}
        </Grid>
      </ul>
    </Box>
  )
}

export default PostCardPage
