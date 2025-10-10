"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { ItemType } from "@/utils/read-md"

import * as styles from "./UnderPagingButton.css"

export const UnderPagingButton = (props: { posts: ItemType[]; targetIndex: number }) => {
  const { posts, targetIndex } = props
  const router = useRouter()

  // slugを指定して記事を表示
  const moveNextIndexPage = (index: number) => {
    router.push(`/?slug=${posts[index].slug}`)
  }

  useEffect(() => {
    globalThis.scroll(0, 0)

    // トップルートに飛んだ場合、記事の0番目のクエリをつけたページにリダイレクトさせる(OGP対策)
    if (targetIndex === 0) {
      router.push(`/?slug=${posts[0].slug}`)
    }
  }, [])

  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.button} ${styles.leftButton}`}
        onClick={() => moveNextIndexPage(targetIndex < 0 ? targetIndex - 1 : 0)}
        data-testid="paging-minus"
      >
        {"<<<"}
      </button>
      <div className={styles.buttonSpace} />
      <p className={styles.buttonSpace}> - {targetIndex + 1} - </p>
      <div className={styles.buttonSpace} />
      <button
        className={`${styles.button} ${styles.rightButton}`}
        onClick={() => moveNextIndexPage(targetIndex + 1)}
        data-testid="paging-plus"
      >
        {">>>"}
      </button>
    </div>
  )
}
