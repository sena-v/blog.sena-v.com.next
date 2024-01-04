"use client"

import { SubmitHandler, useForm } from "react-hook-form"

import * as styles from "./SearchMenuModalBody.css"

import { SearchModalParamsType, setSearchModalParams, toggleModal } from "@/functions/cookie"
import { moveSiteTop } from "@/utils/routerUtil"

export const SearchMenuModalBody = (props: {
  tags: Array<[string, number]>
  years: Array<[string, number]>
  postsCount: number
  filterResult: boolean | undefined
}) => {
  const { register, handleSubmit, watch, reset } = useForm<SearchModalParamsType>()

  const onSubmit: SubmitHandler<SearchModalParamsType> = async (data) => {
    await setSearchModalParams(data)
  }

  const resetSelect = async () => {
    reset()
    await moveSiteTop()
  }

  const watchData = watch()

  const Tags = () => {
    const _tags = watchData.tags || []

    return (
      <>
        {props.tags.map((tag) => (
          <label key={tag[0]} className={styles.label}>
            <span className={_tags.includes(tag[0]) ? styles.selectedCheckBoxButton : styles.checkBoxButton}>
              <input type="checkbox" {...register("tags")} value={tag[0]} hidden />
              {tag[0]}
            </span>
          </label>
        ))}
      </>
    )
  }

  const Years = () => {
    const _years = watchData.years || []

    return (
      <>
        {props.years.map((year) => (
          <label key={year[0]} className={styles.label}>
            <span className={_years.includes(year[0]) ? styles.selectedCheckBoxButton : styles.checkBoxButton}>
              <input type="checkbox" {...register("years")} value={year[0]} hidden />
              {year[0]}
            </span>
          </label>
        ))}
      </>
    )
  }

  return (
    <div className={styles.modalBody}>
      <div className={styles.headerButtonContainer}>
        <div className={styles.headerButtonArea}>
          <form action={resetSelect}>
            <button type="submit" className={styles.initButton}>
              Init Filter
            </button>
          </form>
        </div>
        <div className={styles.headerButtonArea}>
          <div>
            <form action={toggleModal}>
              <button type="submit" className={styles.closeButton}>
                ❌
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.modalTitle}>Search Menu</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.selectAreaContainer}>
          <div>・フリーワード(タイトル)</div>
          <div className={styles.selectArea}>
            <input {...register("titleWords")} className={styles.inputTitleWords} />
          </div>
        </div>
        <div className={styles.selectAreaContainer}>
          <div>・ジャンルタグ </div>
          <div className={styles.selectArea}>
            <Tags />
          </div>
        </div>
        <div className={styles.selectAreaContainer}>
          <div>・年数</div>
          <div className={styles.selectArea}>
            <Years />
          </div>
        </div>
        <div className={styles.footerAreaContainer}>
          <div className={styles.submitButtonArea}>
            <button type="submit" className={styles.searchButton}>
              Search articles
            </button>
          </div>
          <div className={styles.searchResult}>現在の総表示記事数：{props.postsCount}</div>
          <div className={styles.errorMessage}>
            {props.filterResult === false && "検索結果が0件のため全投稿を表示しています"}
            <br />
            {props.filterResult === false &&
              "※複合条件の場合検索結果が少なくなります、右上のInit Filterで初期値に戻ります"}
          </div>
        </div>
      </form>
    </div>
  )
}
