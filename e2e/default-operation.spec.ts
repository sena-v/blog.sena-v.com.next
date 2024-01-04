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

test("モーダルの動作確認", async ({ page, context }) => {
  await page.goto(rootUrl)
  await page.waitForTimeout(1000 * 5)

  // モーダルを開いた時、要素が表示されている
  await page.getByRole("button", { name: "Search Menu" }).click()
  await expect(page.getByTestId("search-menu")).toBeVisible()

  // モーダルを閉じた時、要素が非表示になる
  await page.getByRole("button", { name: "❌" }).click()
  await expect(page.getByTestId("search-menu")).not.toBeVisible()

  // モーダルを開いて、現在の検索総件数が表示される(文字が表示されている)
  await page.getByRole("button", { name: "Search Menu" }).click()
  const firstCount = await page.getByTestId("current-search-count").textContent()
  expect(firstCount).not.toBeNull()

  // モーダルからタグがクリックでき、選択状態になる
  await page.getByTestId("tag_1").click()
  await page.getByTestId("year_1").click()
  await expect(page.getByTestId("tag_1")).toBeChecked()
  await expect(page.getByTestId("year_1")).toBeChecked()

  // タグをクリックしただけだと検索総件数の数値が変わらない
  await page.getByTestId("current-search-count").textContent()
  const secondCount = await page.getByTestId("current-search-count").textContent()
  expect(secondCount).toBe(firstCount)

  // ボタンを再度押すと選択がリセットされる
  await page.getByTestId("tag_1").click()
  await page.getByTestId("year_1").click()
  await expect(page.getByTestId("tag_1")).not.toBeChecked()
  await expect(page.getByTestId("year_1")).not.toBeChecked()

  // 条件を入れて検索ボタンをクリックすると検索総件数の数値が変わる(最初のstringと異なる)
  await page.getByTestId("search-modal").getByText("TypeScript").click()
  await page.getByTestId("search-modal").getByText("2023").click()
  await page.getByText("Search articles").click()

  const thirdCount = page.getByTestId("current-search-count").textContent()
  expect(thirdCount).not.toBe(firstCount)

  // モーダルの選択初期化ボタンを押し、再度モーダルに戻ると選択リセットと検索総件数の数値が変わる
  await page.getByRole("button", { name: "Init Filter" }).click()
  await page.getByRole("button", { name: "Search Menu" }).click()
  await expect(page.getByTestId("search-modal").getByText("TypeScript")).not.toBeChecked()
  await expect(page.getByTestId("search-modal").getByText("2023")).not.toBeChecked()
  const fourthCount = await page.getByTestId("current-search-count").textContent()
  expect(fourthCount).toBe(firstCount)
})

// data-testIdを使ったボタンを使用して、開く新しいページをオブジェクトとして返す
const getTargetPageObject = async (page: Page, context: BrowserContext, testId: string) => {
  const pagePromise = context.waitForEvent("page")
  await page.getByTestId(testId).click()
  const newPage = await pagePromise
  await newPage.waitForLoadState()

  return newPage
}
