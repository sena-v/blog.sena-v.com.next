---
title: "Reactで迷ったこと①: function or アロー関数"
tags: ["TypeScript","React"]
slug: component-function-or-allow
coverImage: "react.png"
---

基本的には参考文献を引用し、Reactを触り始めた人でも参考にできるよう解説を簡略化する目的でまとめている。

### 前提
- React・NodeJSチュートリアル程度は終わっている
- TypeScriptの型についてチュートリアルレベルの理解はある

# 関数コンポーネントは function？アロー関数？

関数コンポーネントの定義方法は以下の2通りが存在する

```tsx
export function Main() {
	return(<a href="test">test</a>)
}

export const Main = () => {
	return(<a href="test">test</a>)
}
```

2023年4月時点の仕様だと、React的な範疇では明確にこちらが優れている的なものはない。  
海外記事を見たりするとfunctionで定義されていることが多く、日本ではアロー関数定義しているものが多い印象を受ける。

### functionでのコンポーネント定義

- 単純にアロー関数と比べ文字数が少ない
- 公式ドキュメントの書き方に準拠している
- (デメリット)日本だとアロー関数層が多いため、規約等で縛られる可能性がある
- (デメリット)JavaScript仕様だとfunction定義はthis等で不利な点がある

参考  
[React公式ドキュメント: 関数コンポーネント](https://ja.legacy.reactjs.org/tutorial/tutorial.html#function-components)  
[サバイバルTypeScript: functionとアロー関数の使いわけ](https://typescriptbook.jp/reference/functions/function-expression-vs-arrow-functions#%E5%BE%93%E6%9D%A5%E3%81%AE%E9%96%A2%E6%95%B0%E3%81%A8%E3%82%A2%E3%83%AD%E3%83%BC%E9%96%A2%E6%95%B0%E3%81%AE%E4%BD%BF%E3%81%84%E5%88%86%E3%81%91)

### アロー関数でのコンポーネント定義

- 日本だとアロー関数派閥が多いため違和感が少ない
- 内部処理がない場合returnを省略できるため、記述量が減る
- (デメリット)公式ドキュメントがfunctionのため、公式しか読まない派はfunctionを優先する
- (デメリット)node的にはfunctionの方が処理パフォーマンスが良い

参考  
[node.js 「通常の関数」と「アロー関数」のパフォーマンスを計測する](https://mebee.info/2021/11/01/post-26379/)  
[Twitter集合知: 「アロー関数式派の明確なメリットとは」](https://twitter.com/clockmaker/status/1555399611535491073?lang=ja)

## パフォーマンスだけなら他の戦略をすべてやってからでも良いのでは？

パフォーマンスを気にする場合、前提として現在構築しているシステムの速度が遅いと感ているはずである。  
パフォーマンス改善については非同期の並列化・useMemo useCallbackの活用・ループ処理の軽量化etc…  
上記以外にもいろいろな手段があるため、まずはそちらをしっかりと実践できるように知識をつけるべきだと思う。

## 結論

- 好みで選んでいいが、選ぶ場合理由があると統一しやすい
- 特にlinter等で縛っていない場合は好みで良い