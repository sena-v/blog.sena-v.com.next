"use client"

import { redirect } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

import * as styles from "./SearchMenuModalBody.css"

import { SearchModalParamsType, clearSearchModalParams, setSearchModalParams, toggleModal } from "@/functions/cookie"

export const SearchMenuModalBody = (props: {
  tags: Array<[string, number]>
  years: Array<[string, number]>
  postsCount: number
  filterResult: boolean | undefined
}) => {
  const { register, handleSubmit } = useForm<SearchModalParamsType>()

  const onSubmit: SubmitHandler<SearchModalParamsType> = async (data) => {
    await setSearchModalParams(data as SearchModalParamsType)
  }

  const resetSelect = async () => {
    await clearSearchModalParams()
    redirect("/")
  }

  return (
    <div className={styles.modalBody}>
      <form action={toggleModal}>
        <div className={styles.closeButtonArea}>
          <button type="submit" className={styles.closeButton}>
            ❌
          </button>
        </div>
        <div className={styles.modalTitle}>Search Menu</div>
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>・フリーワード</div>
        <div className={styles.selectArea}>
          <input {...register("titleWords")} />
        </div>
        <div>・ジャンルタグ </div>
        <div className={styles.selectArea}>
          {props.tags.map((tag) => (
            <span key={tag[0]} className={styles.tags}>
              <label>{tag[0]}</label>
              <input type="checkbox" {...register("tags")} value={tag[0]} />
            </span>
          ))}
        </div>
        <div>
          ・年数
          <div className={styles.selectArea}>
            {props.years.map((year) => (
              <span key={year[0]}>
                <label>{year[0]}</label>
                <input type="checkbox" {...register("years")} value={year[0]} />
              </span>
            ))}
          </div>
        </div>
        <div className={styles.submitButtonArea}>
          <button type="submit" className={styles.button}>
            Search articles
          </button>
        </div>
      </form>
      <div className={styles.searchResult}>絞り込み後件数：{props.postsCount}</div>
      <div className={styles.errorMessage}>
        {props.filterResult === false && "検索結果が0件のため全投稿を表示しています"}
        <br />
        {props.filterResult === false && "※複合条件の場合検索結果が少なくなります"}
      </div>
      <div className={styles.submitButtonArea}>
        <form action={resetSelect}>
          <button type="submit" className={styles.button}>
            Delete all & return to site top
          </button>
        </form>
      </div>
    </div>
  )
}
