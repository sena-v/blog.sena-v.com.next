import { cookies } from "next/headers"

import * as styles from "./SearchMenuModal.css"

export const SearchMenuButton = async () => {
  return (
    <form action={toggleModal}>
      <button type="submit" className={styles.button}>
        <div className={styles.foldableMenu}>Search Menu</div>
      </button>
    </form>
  )
}

export const SearchMenuModal = () => {
  const isModalOpen = cookies().get("searchMenuModal")?.value
  const classNameString = isModalOpen === "true" ? styles.modal : `${styles.modal} ${styles.modalDisabled}`

  return (
    <div className={classNameString}>
      <form action={toggleModal}>
        <button type="submit">❌</button>
        aaaaaaaaa
      </form>
    </div>
  )
}

const toggleModal = async () => {
  "use server"

  const isSearchModalOpen = cookies().get("searchMenuModal")?.value

  if (isSearchModalOpen === "true") {
    cookies().set("searchMenuModal", "false")
  } else {
    cookies().set("searchMenuModal", "true")
  }
}
