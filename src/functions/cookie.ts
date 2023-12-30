"use server"

import { cookies } from "next/headers"

export const toggleModal = async () => {
  const isSearchModalOpen = cookies().get("searchMenuModal")?.value

  if (isSearchModalOpen === "true") {
    cookies().set("searchMenuModal", "false")
  } else {
    cookies().set("searchMenuModal", "true")
  }
}

export interface SearchModalParamsType {
  titleWords: string[]
  tags: string[]
  years: string[]
}

// 記事の絞り込み条件をクッキーに保存
export const setSearchModalParams = async (formData: SearchModalParamsType) => {
  const data = {
    titleWords: formData.titleWords,
    tags: formData.tags,
    years: formData.years ? formData.years : [],
  }

  cookies().set("searchModalParams", JSON.stringify(data))

  console.log("setSearchModalParams", data)
}

export const clearSearchModalParams = async () => {
  cookies().delete("searchModalParams")
  cookies().delete("searchMenuModal")
}
