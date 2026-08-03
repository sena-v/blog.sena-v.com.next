import fs from "node:fs"

const postToPost = function () {
  const currentUrl = new URL(document.URL)
  const statusMatch = /^\/([^/]+)\/status\/\d+(?:\/|$)/.exec(currentUrl.pathname)
  if ((currentUrl.hostname !== "x.com" && !currentUrl.hostname.endsWith(".x.com")) || !statusMatch) {
    throw new Error("Xのスレッドを表示しているページで実行してください")
  }
  const threadHandle = decodeURIComponent(statusMatch[1]).toLowerCase()

  const texts = Array.from(document.querySelectorAll('article[data-testid="tweet"]'))
    .map((post) => {
      const userNameLines = post.querySelector('[data-testid="User-Name"]')?.innerText.split("\n") ?? []
      const name = userNameLines[0]?.trim() ?? ""
      const handle = userNameLines.find((line) => line.trim().startsWith("@"))?.trim().slice(1).toLowerCase() ?? ""
      const text = post.querySelector('[data-testid="tweetText"]')?.innerText.trim() ?? ""
      return {
        handle,
        text,
        name,
      }
    })
    .filter(({ handle, text }) => handle === threadHandle && text !== "")

  if (texts.length === 0) throw new Error("表示中の投稿本文を取得できませんでした")

  // 一度整形したobjectをhtml変換してクリップボードへコピー
  const html = texts
    .map(({ name, text }) => {
      return `${name}@\n${text},\n`
    })
    .join("")

  navigator.clipboard
    .writeText(html)
    .then(() => alert(`${texts.length}件をクリップボードへコピーしました`))
    .catch((e) => alert("エラー！ " + e.message))
}

const text = postToPost.toString().replace(/\r?\n/g, "").replace(/ {2,}/g, " ")
const bookmarklet = `javascript:(${text})();\n`
const outputPath = new URL("./bookmarklet.txt", import.meta.url)
const checkOnly = process.argv.includes("--check")

if (checkOnly) {
  const current = fs.readFileSync(outputPath, "utf8")
  if (current !== bookmarklet) {
    console.error("bookmarklet.txt is stale; run npm run build:bookmarklet")
    process.exitCode = 1
  }
} else {
  fs.writeFileSync(outputPath, bookmarklet)
  console.log("bookmarklet.txtを更新しました")
}
