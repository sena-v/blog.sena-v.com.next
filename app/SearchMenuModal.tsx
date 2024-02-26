import { cookies } from "next/headers"

import { PostDataTypes } from "./page"
import * as styles from "./SearchMenuModal.css"

import { SearchMenuModalBody } from "@/components/client/SearchMemuModalBody/SearchMenuModalBody"
import { toggleModal } from "@/functions/cookie"
import { getAllTagsAndYears } from "@/utils/read-md"

export const SearchMenuButton = async () => {
  return (
    <form action={toggleModal}>
      <button type="submit" className={styles.button} data-testid="button-open-modal">
        <div className={styles.foldableMenu} data-testid="open-search-menu">
          Search Menu
        </div>
      </button>
    </form>
  )
}

export const SearchMenuModal = (props: { data: PostDataTypes }) => {
  const isModalOpen = cookies().get("searchMenuModal")?.value
  const modalClassString = isModalOpen === "true" ? styles.modal : `${styles.modal} ${styles.modalDisabled}`

  // fsがサーバー側でしか使用できないので先に取得してクライアント側に渡す
  const tagsAndYears = getAllTagsAndYears()
  const searchMenuModalBodyVar = {
    ...tagsAndYears,
    postsCount: props.data.posts.length,
    filterResult: props.data.filterResult,
  }

  const ModalSideComponent = () => {
    return (
      <div data-testid="button-outer-modal">
        <form action={toggleModal}>
          <button type="submit" className={styles.modalBodySpaceSide}></button>
        </form>
      </div>
    )
  }

  return (
    <div className={modalClassString} data-testid="search-menu">
      <div>
        <form action={toggleModal}>
          <button type="submit" className={styles.modalBodySpaceTop}></button>
        </form>
      </div>

      <div className={styles.modalBodyContainer}>
        <ModalSideComponent />
        <SearchMenuModalBody {...searchMenuModalBodyVar} />
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
