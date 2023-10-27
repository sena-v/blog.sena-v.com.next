import styles from "./page.module.css"
import { getAllPosts } from "src/utils/read-md"
import { countTags } from "src/utils/tag-count"
import { PostSelectSingle } from "@/components/PostSelectSingle"

export default function Home() {
  const allPosts = getAllPosts(["slug", "title", "coverImage", "date", "tags", "content"])
  const tagCount = countTags(allPosts)

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <a href="/">sena-v.com</a>
      </div>
      <PostSelectSingle posts={allPosts} />
    </main>
  )
}
