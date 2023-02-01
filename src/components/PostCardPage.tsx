import { Dispatch } from "react"
import { ItemType } from "src/utils/read-md"
import PostThumbnail from "./PostThumbnail"
import Grid from "@mui/material/Grid"
import { Box } from "@mui/material"

type PropsType = {
  allPosts: ItemType[]
  setTagPage: Dispatch<string>
}

const PostCardPage = ({ allPosts, setTagPage }: PropsType) => {
  const createTags = (tags: string[]) =>
    tags.map((tag) => (
      <ul key={tag} className="post-tag-top" onClick={() => setTagPage(tag)}>
        {tag}
      </ul>
    ))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ul>
        <Grid container spacing={2}>
          {allPosts.map((post, index) => (
            <Grid item key={index} md={6} xl={4}>
              <PostThumbnail {...{ post, createTags }} />
            </Grid>
          ))}
        </Grid>
      </ul>
    </Box>
  )
}

export default PostCardPage
