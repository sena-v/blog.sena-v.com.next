"use server"

import { redirect } from "next/navigation"

import { clearSearchModalParams } from "@/functions/cookie"

export const moveSiteTop = async () => {
  await clearSearchModalParams()

  redirect("/")
}
