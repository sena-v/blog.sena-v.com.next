import { cookies } from "next/headers"

import * as styles from "./SearchMenuModal.css"

import { ModalBody } from "@/components/client/SearchMemuModalBoby/SearchMenuModalBody"
import { toggleModal } from "@/functions/cookie"

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
  const modalClassString = isModalOpen === "true" ? styles.modal : `${styles.modal} ${styles.modalDisabled}`

  // const a = getAllTagsAndYears()

  const ModalSideComponent = () => {
    return (
      <div>
        <form action={toggleModal}>
          <button type="submit" className={styles.modalBodySpaceSide}></button>
        </form>
      </div>
    )
  }

  return (
    <div className={modalClassString}>
      <div>
        <form action={toggleModal}>
          <button type="submit" className={styles.modalBodySpaceTop}></button>
        </form>
      </div>

      <div className={styles.modalBodyContainer}>
        <ModalSideComponent />
        <ModalBody />
        <ModalSideComponent />
      </div>

      <div>
        <form action={toggleModal}>
          <button type="submit" className={styles.modalBodySpaceBottom}></button>
        </form>
      </div>
    </div>
  )
}
