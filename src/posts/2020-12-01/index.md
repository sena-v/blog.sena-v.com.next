---
title: "自分がReactを選ぶべきだと思うただ1つの理由"
tags: ["JavaScript", "React", "Vue", "技術"]
slug: "reason-react-recommend"
---

今後何を勉強するかを分析して、対応幅が広くなりそうな React をやろうと思った。
Vue と同じくフレームワークだったり Cli ツールだったり色々あるので、
React 内の各ツールと Vue を比較しながら React をやる方向に考えを持っていくために調べてみることにした。

# React

![](../images/posts-image/2020-12-01-01.png)![](../images/posts-image/2020-12-01-02.jpg)

Vue と比べて JavaScript がメインの開発であるため、初学者が取り組む場合 JS 学習から始める必要がある。
(非同期、イベント駆動、基本的な ES バージョン差の吸収ができないと厳しいかも)
学習コストが高い以外、特に弱点みたいなものはない印象。

デメリット記事から見ても、React の問題というよりは導入事例が少なかった事が大きいので、
現在知見は量があり Node.js が書ける人は抵抗なく入れると思われる。

開発する場合 CRA(create-react-app)によるプロジェクト生成・Next.js(フレームワーク)他
ボイラープレートを使用した環境構築をすることになるが、CRA だとクライアントサイドでのレンダリングが
基本になり SEO の面で弱いため、Next の SSR(Server Side Rendering)または SSG(Static Site Genelator)で
SEO に強いサイトを作成することが一般的。

CRA は機能を後で導入したくなった場合カスタマイズが面倒だったり、実運用に必要な機能は要拡張なので、
手軽に・かつ SEO を気にしない機能を作る場合以外のプロジェクトであまりおすすめできない印象がある。

- 特に抵抗ないなら Next を使っとこう
- TypeScript 学習をしておくと最新フロントエンド環境に追いつける

参考リンク
[Next.js の特徴と採用するメリットについて考えてみた](https://freelance-jak.com/technology/react/2325/)
[Next.js 4 年目の知見：SSR はもう古い、Vercel に API サーバを置くな](https://qiita.com/jagaapple/items/faf125e28f8c2860269c)：機能レベルの知識視点。
[なぜ Next.js を採用するのか？](https://mottox2.com/posts/429)：CRA と Next.js の比較
[CRA (Create React App), Next.JS, Gatsby【 どう使い分けるのか？】](https://watablogtravel.com/cra-create-react-app-next-js-gatsby%E3%80%90-%E3%81%A9%E3%81%86%E4%BD%BF%E3%81%84%E5%88%86%E3%81%91%E3%82%8B%E3%81%AE%E3%81%8B%EF%BC%9F%E3%80%91/)

# Vue.js

![](../images/posts-image/2020-12-01-03.png)
![](../images/posts-image/2020-12-01-04.jpg)

React と比べて単一コンポーネントに html/css/JavaScript が纏まっている。
そのため機能が分割されておりシンプルなコードにしやすく理解が楽になる。

また TypeScript との相性があまり良くない。
クリティカルに言及している記事はないっぽいけど、お悩み相談の記事に書いてある事に加えて
2019 年版 Vue.jsTips から解釈すると、Vue.js 自体 JavaScript が動的であることを生かした FW であるため、
型が発生することで本来存在していない要対応の問題が出てきてしまう問題はあると思う。

使用するボイラープレートによっては上の限りではないけど、はじめからどっちでも良いのであれば
多種多様な機能を公式導入できる React + TypeScript にシフトするプロジェクトが多い気はする。

加えて、Tips 記事へのリアクションでも多く見られる「Vuex を入れるなら Nuxt 以外の FW を使うべき」という部分と「大規模になるなら Vuex を入れたほうがいい」という考え方が競合するので、
個人勉強レベルで「入れてみた or 入れなかった」で学習難度に差が出るのも気になった。

- 初学者が集まるプロジェクトなら Vue の方が楽。2 が主流だが Vue-Cli3 の発展に期待。
- Vuex が曲者。導入する場合は上と異なり分かる人がいないときつくなりそうなイメージ

追記：Veux についてはツイッターで流れてきた LINE の Potato4d さんのスライドが参考になりました。
　　　 Vue3 はより使われるようになると思うので、タイミングを見て検討するのがベターかも。

参考リンク

[【Vue.js】vue-cli と Nuxt.js の比較まとめ](https://qiita.com/beanbeenzou/items/772b42687810539b9237)：自動ルーティングの有無、状態管理の有無
[Nuxt.js に飛びつく前に~Nuxt.js を習得するための前提技術と、その勉強方法の紹介~](https://qiita.com/newt0/items/763b0c228a8451c68865)
[2019 年版 Vue.js を使ってる人には必ず知っていてほしい Vue.js の武器とドキュメントに書かれていないコンポーネントやメンテナンスの際に役立つ Tips](https://qiita.com/kahirokunn/items/6b4834b9a13406535f32)
[【Vue.js】Vuex の「状態管理」はいったい何の状態を管理しているのか調べた](https://www.i-ryo.com/entry/2019/12/03/063040)
[開発は Vue.js でしたいけど、TypeScript を入れたい問題をどうするかフロントエンド開発のお悩み相談](https://logmi.jp/tech/articles/322416)

# 採用事例系

Vue はフロントエンドエンジニアが多い企業(特に Web デザイナー・コーダー)で導入されることが多く、動きが多くなったり連携モジュールが多くなりそうな場合は React を採用している会社が多い印象を受けた。

[DMM 採用事例 2018](https://logmi.jp/tech/articles/320546)：基本 Nuxt、Next も使ってみているためどっちでもという感じではある
[Yahoo 採用事例 2018](https://techblog.yahoo.co.jp/advent-calendar-2018/yahoo-frontend/)：Next が多い
[Next 採用事例まとめ](https://dyno.design/articles/corporate-sites-nextjs/)：参考程度。大手でも結構使ってるよ、的な
[ホットペッパービューティーコスメ](https://codezine.jp/article/detail/12700)：チャレンジ気味な AMP 開発で Vue なく React を選んだ

# 結論

- 小中規模のプロジェクトの場合ほぼ差は出ない。メンバーの習熟度を見て選択する。
- React→<u>大規模になると状態管理的に優勢</u>。React Native を勉強すればスマホアプリも作れる。
- Vue→ 学習コストが低いので小規模で収まることが確実なら工数少なくできる。Vuex が辛い。

大規模なプロジェクトの採用シェアが高く、小中規模の差が出にくいので遠回りしても JavaScript を学ぶ
→React を勉強する方向が一番メリットが大きそう。Node.js に発展できればほぼなんでも作れるので、
案件に配属される予定があるのであれば Vue、個人開発 or 学習目線で実施するなら React が良いと思う。

学習レベルは上の通り、プロジェクトにおいては Vuex を使う場合工数かければできないことはないと思うので
<u>**React-TypeScript の採用知見がとても多い事**</u>が一番の React 採用理由だと思う。

## その他

[あらためて React と Vue を比較してみる〔2020 年最新版〕](https://freelance-jak.com/technology/react/2472/)
[React（Web）と React Native（with expo）の同じところ違うところ](https://tech.asoview.co.jp/entry/2019/12/10/085554)
