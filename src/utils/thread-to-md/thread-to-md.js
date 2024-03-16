import fs from "fs"

const postToPost = function () {
  if (!document.URL.includes("https://twitter.com/") || !document.URL.includes("status")) {
    throw new Error("X(Twitter)のスレッド表示できるページで実行してください")
  }

  const posts = Object.values(document.querySelectorAll('[data-testid="cellInnerDiv"]')).slice(0, -1)

  const texts = posts
    .map((post) => {
      // 引用ポストがある可能性があるので先行で分離する()
      const [myPost, qt] = post.innerText.split("引用")
      const arr = myPost.split(/\r\n|\n/).filter((v) => v)

      // 1個目はuserNameで固定(配列から削除してstringとして採用)
      const name = arr.splice(0, 1).join()

      // 判定文字に一致しない物を投稿テキストとして採用
      const text = []
      for (let i = 0; i <= arr.length; i++) {
        const elm = arr[i]

        // 決まった文字の場合削除
        const isConstants =
          elm === "." || elm === "·" || elm === "返信をツイートしましょう。" || elm === "返信" || elm === "返信をポスト"
        // リプライ件数がある場合数値のため削除
        const isReplyCount = Number(elm) > 0
        // 「XX時間」「XX分」「XX秒」のような時間表記を削除
        const isPostTime = (() => {
          const isPostTime1 = elm && (elm.length === 3 || elm.length === 4) && elm.includes("時間")
          const isPostTime2 = elm && (elm.length === 2 || elm.length === 3) && elm.includes("分")
          const isPostTime3 = elm && (elm.length === 2 || elm.length === 3) && elm.includes("秒")

          // 「2024年3月5日」のような時間表記を削除
          const isPostTime4 = elm && elm.includes(new Date().getFullYear()) && elm.includes("月") && elm.includes("日")

          return isPostTime1 || isPostTime2 || isPostTime3 || isPostTime4
        })()
        const isID = elm && elm.startsWith("@")

        // 全判定して引っかからない場合はtextとして採用
        if (elm && !isConstants && !isReplyCount && !isPostTime && !isID) text.push(elm)
      }

      // 全処理したら1件になるはずなのでそれをツイート内容として適応する
      return {
        text: text.join(""),
        name,
      }
    })
    .filter((v) => !!v.text)

  console.log(texts)

  // 一度整形したobjectをhtml変換してクリップボードへコピー
  const html = texts
    .map((text) => {
      return `${text.name}@\n${text.text},\n`
    })
    .join("")

  navigator.clipboard
    .writeText(html)
    .then(() => alert(`処理成功！ \r\n${html}`))
    .catch((e) => alert("エラー！ " + e.message))
}

const text = postToPost.toString().replace(/\r?\n/g, "").replace(/ {2,}/g, " ")
const bookmarklet = `javascript:(${text})();`

// Readmeからドラッグさせたいため、ブックマークレットstring形式でファイル書き出しする
fs.writeFile("src/utils/thread-to-md/bookmarklet.txt", bookmarklet, (err) => {
  if (err) console.log(err)
  else console.log("ブックマークレットtextが更新されました")
})
