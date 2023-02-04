---
title: "Reactの子コンポーネント内でTwitterCardを設定する"
tags: ["TypeScript", "React"]
slug: twitter-card-in-react
coverImage: ""
---
TwitterCardを始め外部のサイトに情報を伝えるため`<meta>`タグを利用したい場合があります。  
React(Next)内では親となるコンポーネントの`<head>`タグ内で`<meta>`タグ設定を行うことが多いですが、  
グローバルな位置にない子コンポーネントから`<head>`タグ内に設定をしたい場合があります。

今回は親に_app.tsxが存在するindex.tsxの内部でTwitter Cardのタグ情報を設定したかったため、  
[react-helmet-async](https://github.com/staylor/react-helmet-async)を使用して子コンポーネントから親のheaderへタグ情報を設定する処理を追加しました。  

react-helmet-asyncはreact-helmetからforkされたモジュールであり、react-helmetはReactで使用した際  
mountされるタイミングが子コンポーネントのレンダリングに依存する＝バグを生む可能性があり非推奨のログが出るため、  
react-helmet-async側では対策として<HelmetProvider>内で囲われた<<Helmet>を同期的にレンダリングします。

詳細処理は以下のreact-helmet-async内で確認が可能です。  
[https://github.com/staylor/react-helmet-async/blob/eb63f20e205f1d8b9009c04bc3a7e2766a8d64d8/src/index.js#L223-L247](https://github.com/staylor/react-helmet-async/blob/eb63f20e205f1d8b9009c04bc3a7e2766a8d64d8/src/index.js#L223-L247)


```ts
const Component = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="Author: sena-v" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="sena-v.com" />
          <meta name="twitter:title" content={"sena-v.com"} />
          <meta name="twitter:description" content={"tech blog {...TypeScript,Node.js}"} />
          <script async src="googleManagerTag" />
          <script>
        </Helmet>
      </HelmetProvider>
    </>
  )
}
```

- 複雑な構造でも子からheaderタグを設定できるためコンポーネント分割が容易になる
- scriptタグも使用できるため、headerタグと使用感があまり変わらない
- 通常のhtml埋め込みと違い、変数での埋め込みやreact機能が使用できる

特にTwitterCardについては個別のページ情報を埋め込みたい場合子からの状態渡しを考えると複雑になるため、  
子コンポーネント化してpropsとしてページ情報を渡してセットできるためかなり便利になります。