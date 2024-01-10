"use client"
import * as styles from "./GoTopButton.css"

export const GoTopButton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        △
      </div>
      <div className={styles.button} onClick={() => window.scrollTo({ top: 10000, behavior: "smooth" })}>
        ▽
      </div>
    </div>
  )
}
