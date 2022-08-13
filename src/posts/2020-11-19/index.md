---
title: '[JavaScript]なろうランキングをAPIで一括取得する'
date: '2020-11-19'
tags: ['JavaScript']
slug: 'narou-rank-get'
---

API が使える環境があり、定期的にそれを使っているならちょっとコード化するだけで<br>
やりたいことが数秒短縮できる、みたいな記事です。<br>

## やろうと思った経緯

夏頃ステイホームの暇さに煽られ、kindlePaperWhite を購入しました。<br>
暇つぶしに「小説家になろう」を読み続け数ヶ月、有名所を読み終えたため<br>
まだ見ぬ掘り出しモノを探すためランキングをローラーするようになりました。<br>

何度もサイトにアクセスしているため、いちいちアクセスするのが面倒になったのと<br>
(**単純にランキングが多少見にくいみたいなところもある**)<br>
現プロジェクトで使っている API の call 側が複雑で分かりにくいスパゲッティ実装であり<br>
復習を兼ねてかんたんな実装を試してみたかったため、<br>
見たいランキングだけ node で取得して text 化するモジュールを作成しました。<br>

## やりたいこと

① パラメータ設定済みの API を叩き JSON を取得<br>
② 適当なファイルに出力<br>

### API を叩き JSON を取得

rpm の request を入れて完成まで行ったのですが request は今年の 2 月頃から非推奨のため<br>
axios に変更しました。request 使用が簡単すぎたので大丈夫かな？と思ったのですが<br>
使ってみたら現場と同じだったり、Promise だけでほぼ差異はありませんでした。<br>

### 適当なファイルに出力

今回は cli 出力だと見辛いかな？程度の文字数だけどリッチに見せたいような事もないので<br>
簡易的に text で出力するようにしました。<br>

## 実装

ソース：https://github.com/sena-v/narouRankingToText<br>

```js
const axiosBase = require('axios'); // ①に使用
const fs = require('fs'); // ②に使用

// urlと検索パラメータを保管
const url = 'https://api.syosetu.com/novelapi/api/';
const weeklyURL = '?genre=201&order=weeklypoint&of=t-n-w-s-k-gf-gl-l-nu';
const monthlyURL = '?genre=201&order=monthlypoint&of=t-n-w-s-k-gf-gl-l-nu';

const axios = axiosBase.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0',
  },
  responseType: 'json',
});

let outputText = null;

const fileOutput = (text) => {
  // weekly取得時は出力せずreturn
  if (outputText === null) {
    fs.writeFileSync('output.txt', '');
    outputText = text;
    return;
  }

  outputText = outputText + text;
  const arrText = outputText.split('\\n');
  console.log(arrText);

  try {
    for (let txt of arrText) {
      fs.appendFile('output.txt', txt + '\r\n', () => {});
    }

    console.log('write end');
  } catch (e) {
    console.log(e);
  }
};

const narouListGet = (adress) =>
  axios.get('/' + adress).then((data) => fileOutput(JSON.stringify(data.data)));

narouListGet(weeklyURL);
narouListGet(monthlyURL);
```

楽さを重視したので text 出力にしましたが、JSON 加工だけできれば後フロントとの繋ぎだけなので<br>
fs については今回深く理解する必要はないかなと思ったため上書き更新による実装になっています。<br>

## 実行結果

![kekka](../images/posts-image/2020-11-19-01.png)

読んでみようかな、となる判断材料になる箇所だけ抜き出す形式にしたため、検索件数を増やすとか、<br>
別ランキングを取得するところもパラメータ変更で対応できる形式となります。<br>

### 止まったところ

#### api 側使用について

userAgent が未設定の場合エラーページの html が JSON 返還されるため、<br>
axios の header に適当な値を追加して get する形式としました。<br>

#### fs モジュール appendFile の引数不足

fs.appendFile()は引数を 3 個取り、3 個目が callback 形式でエラー出力に使用されるため<br>
今回は特にエラーを考えない形で空関数を設定し回避しました。<br>

## まとめ

サイト open→weekly 一覧を撫でる →monthly 一覧を撫でる、を 1 コマンドでできるようになったので<br>
復習ついでとしては地味に時間短縮できるものができました。<br>

・今回の実装だけの話<br>
投稿系サイトにありえる「更新が止まっている物を読み始めても途中で止まり意味がない」という問題を<br>
今回は weekly/monthly に上がってくる＝更新止まっていない、としてケアしていますが、<br>
暇があったら narou.rb と連携して読了済み小説のタグ抽出から好きな小説の傾向を判断して<br>
自動取得するとかの拡張もいいかもしれないなと思いました。<br>

## 参考

[[axios]axios の導入と簡単な使い方](https://qiita.com/ksh-fthr/items/2daaaf3a15c4c11956e9)
[[node.js] テキストファイルを読みこみ](https://qiita.com/amanatsu5151/items/0d2e7ba8d31f3eece660)
