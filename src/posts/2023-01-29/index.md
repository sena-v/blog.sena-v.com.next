---
title: "Reactの子コンポーネント内でTwitterCardを設定する"
tags: ["TypeScript", "React"]
slug: twitter-card-in-react
---
TwitterCardを始め外部のサイトに情報を伝えるため、`<meta>`タグを利用したい場合があります。  
React(Next)内では親となるコンポーネントの`<head>`タグ内で`<meta>`タグ設定を行うことが多いですが、  
グローバルな位置にない子コンポーネントから`<head>`タグに設定をしたい場合があります。

今回は親に_app.tsxが存在するindex.tsxの内部でTwitter Cardのタグ情報を設定したかったため、  
`react-helmet`と