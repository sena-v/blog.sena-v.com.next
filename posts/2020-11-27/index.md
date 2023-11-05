---
title: "2020年最新技術とそれに関する知見"
tags: ["技術"]
slug: "2020-tech-trend"
coverImage: "posts-image/2020-11-27-01.png"
---

最近 Twitter で流れてきて気になった単語。  
単語レベルではすべてシェアがフラットに見えるので、Qiita の直近一ヶ月記事件数がどれくらいか？  
というある程度意味のある観点で調べてみて将来的にどうなのか、触れるべきかどうかを考える。  

2020/10/23-11/23 の記事数を表示。

# Flutter

![](../images/posts-image/2020-11-27-01.png)

Qiita 投稿記事　**103**件

iOS と Android に対して同じコードでアプリを開発できるフレームワーク。
JavaScript に似た Dart 言語での開発となる。JavaScript との違いは[こちら(Quora)](https://jp.quora.com/JavaScript%E3%81%A8Dart%E3%81%AE%E4%B8%BB%E3%81%AA%E9%81%95%E3%81%84%E3%81%AF%E3%81%A9%E3%81%86%E3%81%84%E3%81%A3%E3%81%9F%E7%82%B9%E3%81%A7%E3%81%99%E3%81%8B)参照。

乱暴に言うと TypeScript の書き方が違うモノ。TypeScript よりユーザーが少ないので情報が得辛い。  
めちゃくちゃ変わるわけではないので学習コストはそこまで高くないが、JavaScript だけで  
iOS/Android 開発に対応できる<u>React Native と比べて以下の問題がある。</u>  

- <u>採用事例が React Native に対し極端に少ない</u>こと
- Dart を覚えてもここでしか使うことがないため、TypeScript を導入した React Native と比較すると学習効率が悪くなる

※ReactNative 採用事例として Facebook や Instagram、Airbnb 等のビッグネームがあるが、  
　 Flutter は Google 以外大手企業での採用事例が少ない。  

参考：[モバイルアプリ開発に Google の Flutter を使うべき 8 つの理由](https://goworkship.com/magazine/mobile-apps-google-flutter/)

### 感想

- Flutter の方がコンパイルが早いらしいのでデカくなればなるほど有利かも
- 単純な案件数で見たとき少ないので、<u>覚えてもそのまま使わない可能性も大</u>
- 採用する案件があったら飛びついて中で勉強させてもらうのはめちゃくちゃ有意義だと思う

# Glide

![](../images/posts-image/2020-11-27-02.png)

Qiita 投稿記事　**6**件

NoCode 開発ツール。GoogleSpreadSheet をデータベースのように使って web アプリを作成可。  
GUI 操作だけでそれっぽいものが作れるので、構築すればメンテナンス等を企業側ができ  
自社内で使う情報ポータル等を作ってるような採用事例はあるらしい。社内 SE なら出番あるかも  

参考：[非エンジニアでもできる Glide を使った PWA アプリ開発](https://medium.com/@yonemoto/%E9%9D%9E%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%A7%E3%82%82%E3%81%A7%E3%81%8D%E3%82%8B-glide-%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9F-pwa-%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA-9ed8f4b7f7a5)

感想

- 情報表示系ならデバッグ等なしでできそうなので、データを表示してアクセス稼ぐページを作る場合、
  DB 構築等が必要ないため開発コストをかなり少なくできる(スクレイピングとの相性が良いかも)
- 用途が明確でない限りコード書ける人間がわざわざ触る意味はあまりない。

# React / Vue

React Qiita 投稿記事　**349**件
Vue Qiita 投稿記事　**395**件

Vue も React も現在ではフロントエンドフレームワークとしてかなり使われており、  
Angular と比べて比較的規模感の小さい現場でも導入されていること・マイクロサービスと  
GO の流行感からフロントエンドをやっていこうとすれば避けて通れなさそうな技術になっている。  

複雑な処理でなければバックエンドは Firebase や各企業が提供している API でなんとかなるため、  
個人開発をやりたい場合 Vue/React さえわかっていれば開発工数を大きく減らすことができ大変便利。  
両者とも SSR / SPA 対応できるので、チームの JavaScript レベルでどちらか選定する感じになりそう。  

※以下、Vue はハンズオン程度の知識、React は調査レベルの知識前提になります

## Vue.js

![](../images/posts-image/2020-11-27-03.png)

Vue は component 単位で html/JavaScript/CSS が一つになった.vue ファイルが作られ、  
1 ページ 1 ページの処理・コンテンツをまとめて管理できるので開発者が少ない環境であれば  
ファイル移動が少なくシームレスな開発ができそうな感じで良かったと思う。  

ただ記法が混ざった.vue ファイルが結構癖があって、lint がうまく動かなかったり  
Vue は v-model・v-for 等データのバインディングが Vue のネイティブ機能で存在しているため  
独自記法になれるまでは多少つらい感じだった。  

加えて Vue については BootStrap のようにパーツ的に扱える素の Vue、  
かなり使われている Vue CLI2 と 2018 年 8 月ごろに出た Vue CLI3 があり、区別する必要がある。  
CLI3 では CLI2 で使えていた外部ツールがまだ対応していない、記法が変わっているなど  
ネット上 QA も使っている CLI バージョンに対応しているか注意深く見る必要があり、  
超大手が使っている React と比べると情報の取捨選択は難しくなるかなと思う。  

Nuxt(大規模には向いてるが設定が増える)とか Vuetify(途中導入するとバージョン違いでコケる)等  
開発パターンにも差があるので 1 個に入れ込みすぎると現場で全く使わなかった、的な事はあるかも。  

### Vue のまとめ

- component 単位で書けるためファイル移動が少なく開発できて楽
- .vue ファイルが独自記法のため癖があってなれるまで難しい
- 素 Vue/Cli2/Cli3 の差がデカく、情報の正確な取捨選択が必要
- 触った感として<u>バージョン差異は少し大変だけど全体的にシームレスな開発の楽さが大きかった</u>。

## React

![](../images/posts-image/2020-11-27-04.png)

FaceBook 等大手が使っているフロントエンドフレームワーク。  
.vue のような形ではなく JSX 記法を用いて JavaScript で html を出力していく方式。  

あまり意識せずに vue を勉強していたが、React の記法を見ているとかなり JavaScript に寄っており  
めちゃくちゃ開発しやすそうなので、先に知っていたら React から手を付けてたかもしれない。  

Vue は Java 開発をしていたときの JQuery に持っていたイメージと近く、JavaScript の知識が少なくても  
ドキュメントを読み込めばサクサク進める感じだったが、React については JavaScript 的な書き方が  
必須となるためある程度知識がある前提なら React の方が発展性があるように感じた。  
(vue だと.vue 由来のよくわからないエラーとなるが、React だと JS エラーとして解決できるため)  

React にも React Native や Next 等のフレームワークがあるため現場での差異吸収は必要だと思うが、  
トータルの知識を JavaScript レベルに集約できそうなので、勉強のしがいはかなりありそうだった。  

※余談レベルだが Line の開発者 LT で、現在のデファクトは React + TypeScript という話が出ていたため  
　この組み合わせの開発経験については知見もしっかりしておりかなり将来に有利に働くと思う。  

### React のまとめ

- <u>JavaScript/node 的書き方がわかる前提になる</u>が、汎用性・発展性は高そう
- React/ReactNative の差は未確認だが JS ベースなので必要以上の心配はいらなさそう
- これからは TypeScript 前提になってくるかも

# Docker

![](../images/posts-image/2020-11-27-05.png)

Qiita 投稿記事　**675**件

仮想化ツール。2020 late の MacBook で使えない(新 OS のせい？)事が話題(2020/11 現在)  
もう流石にモダン開発では必須、常用してない会社に在籍するのは考えるべきだと思う。  
AWS、GCP ともにコンテナ運用が主流になっているので、Docker Hub にアップされている  
イメージの組み合わせだけでいろいろな環境を構築できて便利。  

Docker については使ってる企業と使ってない企業では年収 100 万前後変わってくるイメージなので  
もし SES 系企業から転職する場合は一つのラインとして考えてもいいと思う。  

※転職先の技術判断に関して、AWS に関しては準レガシーくらいな企業でも本番用として  
　<u>「ある程度シニアな社員が」</u>使っていたり、各種フレームワークについては相手としている業界で  
　使われているモノが変わってくるため、会社の技術レベルが図りにくい。  
　特に前者は入っても自分が AWS を触れなかったり、シニア社員は残業代で給与が高くなっているため  
　必然的に社内の労働時間が長め、ということがあり得る。(あくまで経験談)  
　社員が全員 Docker を使っている環境は比較的貸与 PC のスペックも高く、ECS 常用しているケースが  
　考えれられるため、スキルレベルの平均値も高く比例して年収も高くなると思われる。  

### 感想

- 検索件数のベンチマーク的に使用、やはり今では仮想環境の必須知識なのでもう少し慣れたい
- 運用自体は問題ないが<u>構築に対するスキルが今一つのため今後一番身につけたい</u>所
- もう少し個人開発に使っていきたい所はある

# GraphQL

![](../images/posts-image/2020-11-27-06.png)

Qiita 投稿記事　**46**件

API 用に使用するクエリ言語。QL=クエリ言語なので SQL の Web 版だと考えると理解しやすい。  
RESTApi だと削除は delete、登録は get/post 等エンドポイントが複数になることに対して、  
GraphQL はエンドポイントを一つにし、飛んできたリクエストをクエリにて処理し JSON 返却する。  

エンドポイントが増えないため、エンドポイント仕様策定に余分な工数を使ったり  
実装後メンバー間でエンドポイントの仕様差が出てきてしまう等の問題をケアできる。  
(get で登録処理を書いているメンバーがいたり、post で登録処理を書いているメンバーがいたり、等)  

ネット上知見が少ないことに加え、以下の問題点が存在する。  

- 複雑なクエリになると実装が難しかったりエンドポイントが一つのため分析が難しい
- REST の HTTP エラーが戻ってくる形と異なり検索ができてしまえば 200 が戻るため結果解析が必要
- ライブラリがそこまで充実しているわけではないので、連携する機能によっては実装が面倒になる

  参考：[Web API 初心者と学ぶ GraphQL](https://qiita.com/SiragumoHuin/items/cc58f456bc43a1be41b4)  
  　　　[初心者目線で GraphQL を解説！～同じ WebAPI の REST との違いは？～](https://vitalify.jp/app-lab/vietnam-offshore/20171006-graphql/#3RESTRESTful)  
  　　　[「GraphQL」徹底入門 ─ REST との比較、API・フロント双方の実装から学ぶ](https://eh-career.com/engineerhub/entry/2018/12/26/103000)  

### 感想

- 乗り換える場合ライブラリ等を考えるとコスト感が高そうで面倒かも、フルスクラッチならあり？
- <u>よっぽど理由がなければ REST が採用されそう</u>。Flutter(≒Dart)に考え方は似てるかも

# Electron

![](../images/posts-image/2020-11-27-07.png)

Qiita 投稿記事　**33**件

JavaScript でデスクトップアプリを作れるフレームワーク。  
採用事例は Slack、Visual Studio Code 等。  
JavaScript でフロント、サーバーサードはできるけどデスクトップアプリは作れないのかな？と思って  
調べたら Electron があった。以前は Windows アプリ開発用に別のツール的な物があったらしい。  

[Qiita の Slack 開発環境分析](https://qiita.com/Masahiro_T/items/4c0476f5ae9314b0e347)を見る限り、バックエンドさえ組めればある程度の物が作れそう。  
デスクトップアプリにする必要があるか？(広告収入は？セキュリティは？等の問題があるので)を  
考え、スタンドアロンで動かす必要がある場合は Electron を勉強する選択肢もいいかなと思った。  

ただ他デスクトップツールやデバイスと連携したいみたいなことがなければ Web アプリ or  
React Native で足りるため、個人開発レベルの優先度としては低くてもいいかな、と思った。  

参考：[ようこそ！Electron 入門](https://qiita.com/umamichi/items/6ce4f46c1458e89c4cfc)  

### 感想

- フロント pureJS、バックエンド node でも開発できそうなので、ツール開発したいなら便利かも  
- といっても Flutter 等の選択肢もあるので、参画する可能性がある案件次第で判断したい。  

# JavaScript

Qiita 投稿記事　**1207**件

現在のメイン言語、使ってるとフロント～バックまで触れて最強感がある。  
後述の Qiita タグ検索でも件数は圧倒的であり、廃れるにしても代替言語が熟れない限り  
フロントエンドとしては一択なのである程度延命できると思う。  

処理速度が他言語と比べて遅めな事、静的型付けではないことからバックエンド処理としては  
他言語が採用されることも多いため、<u>逆発想として node を使用している案件はモダンなケースが多い</u>  

バックエンド処理については各企業もの API を使うことである程度吸収できるので、  
express とか node が使えればある程度何でもできるようになる。  

将来的観点として<u>TypeScript がよりシェアが増えたときに乗り換えできるように勉強</u>したり、  
<u>GO 等実行速度の早い言語を勉強して案件の幅を広げていく</u>ことが重要かなと思う。  

## ex.言語別(タグで検索)

### メイン使用言語

JavaScript Qiita 投稿記事　 745 件  
TypeScript Qiita 投稿記事　 173 件

### 将来触れる可能性のある言語

Python Qiita 投稿記事　 981 件  
Go Qiita 投稿記事　 107 件  
kotlin Qiita 投稿記事　 108 件

### 触れる予定は無いがウォッチすべき言語

Ruby Qiita 投稿記事　 691 件  
PHP Qiita 投稿記事　 378 件  
Java Qiita 投稿記事　 297 件  
C# Qiita 投稿記事　 191 件

言語利用シェアでもほんの参考程度にしかならないため感想は列挙のみとする。

- JavaScript は node/vue/react 等に吸われているのかフロント・サーバーサイドと  
  両方が使用可能にも関わらず思ったより多くなかった。
- 新しい言語は記事数を見て流行っていないと捉えるか？「流行りの走り」段階と捉えるか？  
  数字の推移だけでなく採用事例をみて注視していく必要がある。
- Python が非常に多いが機械学習系モジュール開発など Python 案件のレベルは高くなる傾向にある  
  ＝小手先で勉強しても太刀打ちできないのでは？感がある
- 気になっているのは GO、新規言語を覚えるなら採用事例を見つつ第一選択肢として考える？  

# 全体感想

ストレートに勉強して利がありそうなのは以下項目

- React + TypeScript の開発環境(個人開発目線)
- React Native でのスマホアプリ作成
- Docker + AWS の「現場開発レベルを想定した」環境構築
- GO(項目としては割愛したが調査も含めて)

Flitter / Electron / React Native については選択になるが、前 2 個は独自の考え方となってくるので  
調べたら技術シェア的に個人レベルで勉強するメリットが薄く感じた。  

文字でまとめると方針も正確になるため、トレンド変化したタイミングでまた分析してみようと思う。

とりあえず Qiita セールで React の講座を買った！