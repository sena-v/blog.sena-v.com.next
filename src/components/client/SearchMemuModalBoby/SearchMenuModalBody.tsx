"use client"

import { redirect } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

import * as styles from "./SearchMenuModalBody.css"

import { SearchModalParamsType, clearSearchModalParams, setSearchModalParams, toggleModal } from "@/functions/cookie"

export const ModalBody = () => {
  const { register, handleSubmit } = useForm<SearchModalParamsType>()

  const onSubmit: SubmitHandler<SearchModalParamsType> = async (data) => {
    await setSearchModalParams(data)
  }

  const resetSelect = async () => {
    await clearSearchModalParams()
    redirect("/")
  }

  return (
    <div className={styles.modalBody}>
      <form action={toggleModal}>
        <div>
          <button type="submit">❌</button>
        </div>
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          ・フリーワード <input {...register("titleWords")} />
        </div>
        <div>・ジャンルタグ </div>
        <div>
          <input type="hidden" {...register("years")} value="" disabled />
          ・年数 <input type="checkbox" {...register("years")} value="2023" />
          2023
          <input type="checkbox" {...register("years")} value="2022" />
          2022
        </div>
        <button type="submit">⭕️</button>
      </form>
      <form action={resetSelect}>
        <button type="submit">絞り込みをクリア</button>
      </form>
    </div>
  )
}
