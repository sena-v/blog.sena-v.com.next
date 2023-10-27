---
title: "[JavaScript]なろうランキングをAPIで一括取得する"
tags: ["JavaScript"]
slug: "narou-rank-get"
coverImage: "posts-image/2020-11-19-01.png"
---

API が使える環境があり、定期的にそれを使っているならちょっとコード化するだけで  
やりたいことが数秒短縮できる、みたいな記事です。  

## やろうと思った経緯

夏頃ステイホームの暇さに煽られ、kindlePaperWhite を購入しました。  
暇つぶしに「小説家になろう」を読み続け数ヶ月、有名所を読み終えたため  
まだ見ぬ掘り出しモノを探すためランキングをローラーするようになりました。  

何度もサイトにアクセスしているため、いちいちアクセスするのが面倒になったのと、  
(**単純にランキングが多少見にくいみたいなところもある**)  
現プロジェクトで使っている API の call 側が複雑で分かりにくいスパゲッティ実装であり  
復習を兼ねてかんたんな実装を試してみたかったため、  
見たいランキングだけ node で取得して text 化するモジュールを作成しました。  

## やりたいこと

① パラメータ設定済みの API を叩き JSON を取得  
② 適当なファイルに出力  

### API を叩き JSON を取得

rpm の request を入れて完成まで行ったのですが request は今年の 2 月頃から非推奨のため  
axios に変更しました。request 使用が簡単すぎたので大丈夫かな？と思ったのですが  
使ってみたら現場と同じだったり、Promise だけでほぼ差異はありませんでした。  

### 適当なファイルに出力

今回は cli 出力だと見辛いかな？程度の文字数だけどリッチに見せたいような事もないので  
簡易的に text で出力するようにしました。  

## 実装

ソース：https://github.com/sena-v/narouRankingToText

```js
const axiosBase = require("axios") // ①に使用
const fs = require("fs") // ②に使用

// urlと検索パラメータを保管
const url = "https://api.syosetu.com/novelapi/api/"
const weeklyURL = "?genre=201&order=weeklypoint&of=t-n-w-s-k-gf-gl-l-nu"
const monthlyURL = "?genre=201&order=monthlypoint&of=t-n-w-s-k-gf-gl-l-nu"

const axios = axiosBase.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent": "Mozilla/5.0",
  },
  responseType: "json",
})

let outputText = null

const fileOutput = (text) => {
  // weekly取得時は出力せずreturn
  if (outputText === null) {
    fs.writeFileSync("output.txt", "")
    outputText = text
    return
  }

  outputText = outputText + text
  const arrText = outputText.split("\\n")
  console.log(arrText)

  try {
    for (let txt of arrText) {
      fs.appendFile("output.txt", txt + "\r\n", () => {})
    }

    console.log("write end")
  } catch (e) {
    console.log(e)
  }
}

const narouListGet = (adress) =>
  axios.get("/" + adress).then((data) => fileOutput(JSON.stringify(data.data)))

narouListGet(weeklyURL)
narouListGet(monthlyURL)
```

楽さを重視したので text 出力にしましたが、JSON 加工だけできれば後フロントとの繋ぎだけなので  
fs については今回深く理解する必要はないかなと思ったため上書き更新による実装になっています。  

## 実行結果

![kekka](../images/posts-image/2020-11-19-01.png)

読んでみようかな、となる判断材料になる箇所だけ抜き出す形式にしたため、検索件数を増やすとか、  
別ランキングを取得するところもパラメータ変更で対応できる形式となります。  

### 止まったところ

#### api 側使用について

userAgent が未設定の場合エラーページの html が JSON 返還されるため、  
axios の header に適当な値を追加して get する形式としました。  

#### fs モジュール appendFile の引数不足

fs.appendFile()は引数を 3 個取り、3 個目が callback 形式でエラー出力に使用されるため  
今回は特にエラーを考えない形で空関数を設定し回避しました。  

## まとめ

サイト open→weekly 一覧を撫でる →monthly 一覧を撫でる、を 1 コマンドでできるようになったので  
復習ついでとしては地味に時間短縮できるものができました。  

・今回の実装だけの話  
投稿系サイトにありえる「更新が止まっている物を読み始めても途中で止まり意味がない」という問題を  
今回は weekly/monthly に上がってくる＝更新止まっていない、としてケアしていますが、  
暇があったら narou.rb と連携して読了済み小説のタグ抽出から好きな小説の傾向を判断して  
自動取得するとかの拡張もいいかもしれないなと思いました。  

## 参考

[[axios]axios の導入と簡単な使い方](https://qiita.com/ksh-fthr/items/2daaaf3a15c4c11956e9)
[[node.js] テキストファイルを読みこみ](https://qiita.com/amanatsu5151/items/0d2e7ba8d31f3eece660)
