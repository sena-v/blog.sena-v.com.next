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
