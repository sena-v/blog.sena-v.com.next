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
  selectedTags: string[]
  years: string[]
}

// 記事の絞り込み条件をクッキーに保存
export const setSearchModalParams = async (formData: SearchModalParamsType) => {
  cookies().set(
    "searchModalParams",
    JSON.stringify({
      titleWords: formData.titleWords,
      selectedTags: formData.selectedTags,
      years: formData.years ? formData.years : [],
    }),
  )
}

export const clearSearchModalParams = async () => {
  cookies().delete("searchModalParams")
  cookies().delete("searchMenuModal")
}
