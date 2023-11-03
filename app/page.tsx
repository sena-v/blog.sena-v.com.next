import * as styles from "./page.css"
import { getAllPosts } from "src/utils/read-md"
import { countTags } from "src/utils/tag-count"
import { PostSelectSingle } from "@/components/PostSelectSingle"
import Link from "next/link"

export default function Home() {
  const allPosts = getAllPosts(["slug", "title", "coverImage", "date", "tags", "content"])
  const tagCount = countTags(allPosts)

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <a href="./">sena-v.com</a>
      </div>
      <div className={styles.linkContainer}>
        <Link href="https://github.com/sena-v" className={styles.link}>
          Github
        </Link>
        <Link href="https://qiita.com/sena_v" className={styles.link}>
          Qiita
        </Link>
        <Link href="https://twitter.com/card1nal_tetra" className={styles.link}>
          X(Twitter)
        </Link>
        <Link href="https://github.com/sena-v/blog.sena-v.com.next" className={styles.link}>
          SourceCode
        </Link>
      </div>
      <PostSelectSingle posts={allPosts} />
    </main>
  )
}
