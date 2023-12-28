"use client"

import * as styles from "./SearchMenuModalBody.css"

import { clearSearchModalParams, setSearchModalParams, toggleModal } from "@/functions/cookie"

export const ModalBody = () => {
  return (
    <div className={styles.modalBody}>
      <form action={toggleModal}>
        <div>
          <button type="submit">❌</button>
        </div>
      </form>
      <form action={setSearchModalParams}>
        <div>
          ・フリーワード <input type="text" name="freeWord" />
        </div>
        <div>・ジャンルタグ </div>
        <div>
          ・年数 <input type="checkbox" name="years" value="2023" />
          2023
          <input type="checkbox" name="years" value="2022" />
          2022
        </div>
        <button type="submit">⭕️</button>
      </form>
      <form action={clearSearchModalParams}>
        <button type="submit">クリア</button>
      </form>
    </div>
  )
}
