---
title: "vanilla-extractでGoogle Fontsを使う"
tags: ["vanilla-extract","React","css"]
slug: vanilla-extract-fonts
coverImage: "posts-image/2023-11-04.png"
---

App Routerアップデート当時はほぼCSS Modules一択だったため  
ブログ・本業ではCSS Modulesを使用していたが、以下の辛みがあった。

- 熟練者ほどネストを推奨しない記事が多く、独自クラス増えがち
- 規約で縛れていないため、初心者はネストしたクラスを書きがち
- 上記が相反するため、いろいろなCSS定義が書けてしまう
- lintが独自のものになる為面倒

上記解決のためApp Routerに対応したCSSフレームワークを検討したが、  
Emotionは初動のApp Router対応が遅かったこと、Panda CSSは独自ルールを使用するため  
開発者ツールで参照が非常に見にくくなること・背景画像指定がバグっぽい挙動で安定性が十分でないこと、  
できるだけRSCの割合を増やしたいのでサーバー側で使用できるCSSフレームワークににしたいことから  
最終的にvanilla-extractに行き着いた。  

vanilla-extractは9割CSS Modulesと書きっぷりが同じで、単純に".css"が".css.ts"になって  
書き方がTypeScriptに寄るだけなので同じ粒度で開発できること、規約によりネスト制限などで縛りがあり  
上の問題点をかなりカバーしてくれるのでベストかどうかはともかくベターな選択肢だった。  

当ブログではGoogle Fontsを使用しているがCSS Modules側ではglobal.cssで読み込みを行っており、  
vanilla-extractの公式記述やstack overflowを参照してもデフォルトの書き方で対応ができなかった。

```ts
import { globalFontFace, style } from '@vanilla-extract/css';

const comicCaveat = 'GlobalComicCaveat';

globalFontFace(comicCaveat, {
  // src: 'local("Comic Sans MS")' ← 公式の書き方
  src : "url(https://fonts.googleapis.com/css2?family=Caveat&display=swap)",
  fontDisplay: swap // stack overflowの対策、ロード速度の調整
});

export const font = style({
  fontFamily: comicCaveat
});
```

SPA構成でRSCの遷移を繰り返していると偶にCSSが飛ぶ事がある現象と同じで、RSCだとサーバー側で処理が行われ  
クライアント側への転送が終わったあとCSSの更新が実施されるが描画完了扱いとなっているのかFontの遅延適応が  
できなくなっているんじゃないかなという挙動になる。  

考えてみれば簡単だがclient側のglobalにCSSをロードしてあげれば問題ないため"global.css"を定義して  
そこにGoogle Fontの"@import"を書けばよいが、vanilla-extractを使う場合に"global.css"を作成してしまうと  
ジュニアなエンジニアはそこに定義を書き勝ちになってしまうので、命名でゆるく縛る感じが良いと思った。  

```css
/* 基本は使用しない、読み込み順が早くないといけないstyle関連のみ使用する */
@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');

```

ファイル名も"font.css"とした上で"layout.tsx"でimportすることによりFontの適応が問題なく実施できた。