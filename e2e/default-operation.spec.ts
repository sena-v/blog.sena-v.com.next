import { test, expect, Page, BrowserContext } from "@playwright/test"

import { gitHubUrl, qiitaUrl, siteSourceCodeUrl, twitterUrl } from "@/utils/constants"

const rootUrl = process.env.NODE_ENV === "production" ? "https://sena-v.com/" : "http://localhost:3000/"

test("ページの初期動作確認", async ({ page, context }) => {
  await page.goto(rootUrl)
  await page.waitForTimeout(1000 * 5)

  // サイトタイトルが正しく表示されることを確認
  await expect(page).toHaveTitle(/sena-v.com/)

  // トップページの記事タイトルを取得
  await page.waitForSelector("h1")
  const firstPostTitle = page.locator("h1")
  const firstText = await firstPostTitle.first().textContent()

  // 遷移して次の記事のタイトルを取得
  await page.getByRole("button", { name: ">>>" }).click()
  await page.waitForTimeout(1000 * 1)
  const secondPostTitle = page.locator("h1")
  const secondText = await secondPostTitle.first().textContent()

  // タイトルが変化することを確認
  expect(firstText).not.toBe(secondText)

  // 前に遷移して記事のタイトルを取得
  await page.getByRole("button", { name: "<<<" }).click()
  await page.waitForTimeout(1000 * 1)
  const thirdPostTitle = page.locator("h1")
  const thirdText = await thirdPostTitle.first().textContent()

  // タイトルが同じ値になることを確認
  expect(firstText).toBe(thirdText)

  // 各種タブを押した時に開くタブが正しいことを確認
  const gitHubPage = await getTargetPageObject(page, context, "button-github")
  expect(gitHubPage.url()).toBe(gitHubUrl)

  const qiitaPage = await getTargetPageObject(page, context, "button-qiita")
  expect(qiitaPage.url()).toBe(qiitaUrl)

  const twitterPage = await getTargetPageObject(page, context, "button-twitter")
  expect(twitterPage.url()).toBe(twitterUrl)

  const siteSourceCodePage = await getTargetPageObject(page, context, "button-source")
  expect(siteSourceCodePage.url()).toBe(siteSourceCodeUrl)
})

// data-testIdを使ったボタンを使用して、開く新しいページをオブジェクトとして返す
const getTargetPageObject = async (page: Page, context: BrowserContext, testId: string) => {
  const pagePromise = context.waitForEvent("page")
  await page.getByTestId(testId).click()
  const newPage = await pagePromise
  await newPage.waitForLoadState()

  return newPage
}
