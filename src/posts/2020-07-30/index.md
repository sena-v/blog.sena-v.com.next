---
title: "UWSCを使用しエビデンス取得を自動化する"
tags: ["技術"]
slug: "uwsc-screenshot-auto"
---

過去のプロジェクトにて、テスト時のエビデンス取得については選択範囲を切り取ると<br>
クリップボードに貼り付けられ、対象箇所にマーキング後保存するツールを使用していた。<br>
<br>
特に Excel への貼り付けが必要なくフォルダへ格納しても良い場合、1 操作で自動化できると<br>
より効率的なため、1 操作で取得 → 任意のディレクトリに保存してくれるスクリプトを作成した。<br>

今回、自動化については Windows の処理を自動化できる UWSC を使用した。<br>

UWSC を使用すると以下のメリットがある<br>
・任意の処理をコーディングすることで柔軟に自動化できる(ロギング等)<br>
・「win + shift + s」の場合名付け → 保存が発生するため、処理時間が削減できる<br>
・テスターがミスしそうな部分をコードでカバーできる(保存先のミス等)<br>

```js
// ファイルネームをタイムスタンプで仮指定
GETTIME()
DIM FileNameBefore = G_TIME_YY4 + G_TIME_MM2 + G_TIME_DD2 + G_TIME_HH2 + G_TIME_NN2 + ".jpg"

// エビデンスフォルダがない場合同ディレクトリ内に作成
DIM dir = GET_CUR_DIR + "\evidence\"
DIM MKDIR = "mkdir " + dir
if FOPEN(dir) THEN DOSCMD(MKDIR)

// Chromeのウィンドウをjpgとして一時保存
DIM id = GETID("Google Chrome")
SAVEIMG(dir + FileNameBefore, id,,,,,, 60)

// ファイル名を指定(外部から取得する場合この箇所で処理を実施)
DIM FileNameAfter = "test.jpg"

// ファイル名を指定された名称に変更
DIM RENCMD = "ren "+ dir + FileNameBefore + " " + FileNameAfter
DOSCMD(RENCMD)
```
