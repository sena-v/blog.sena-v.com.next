"use client"

import * as styles from "./SearchMenu.css"

export const SearchMenu = () => {
  const displayModal = () => {
    console.log("onSubmit")
  }

  return (
    <>
      <form action={displayModal}>
        <button type="submit" className={styles.button}>
          <div className={styles.foldableMenu}>Search Menu</div>
        </button>
      </form>
    </>
  )
}
