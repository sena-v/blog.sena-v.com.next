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

export const setSearchModalParams = async (formData: FormData) => {
  // formDataをdecodableな形でcookieに保存する
  formData.forEach((value, key) => {})

  cookies().set("searchModalParams", JSON.stringify({ aaaa: "bbbb" }))

  console.log(formData) // cookies().get("searchMenuModal")?.value)
}

export const clearSearchModalParams = async (formData: FormData) => {
  cookies().delete("searchModalParams")
}
