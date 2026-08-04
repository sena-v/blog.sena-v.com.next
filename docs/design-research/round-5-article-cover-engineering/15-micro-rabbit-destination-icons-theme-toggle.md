# Micro rabbit thumb × destination icons × theme toggle

生成日: 2026-08-03

前案のvisual directionを維持し、rabbit scroll thumbのvisual weight、回転iconの意味、dark-mode toggleを修正した縦横ペア。

比較用モックは方向確定後に削除した。採用した縦横の見た目は[最終仕様](./FIRST_FINAL_DESIGN_SPEC.md#2-最終visual-direction)を参照する。


## 修正点

### Rabbit scroll thumb

- 全体を`14〜16px`の小径にする。
- 外円は`#FFF8FA`の白、`2px` stroke。
- 内側のrabbit outlineだけを`#FF4F7F`、`1px` monolineにする。
- rabbitはscroll rail上だけに置き、回転操作や端末内では使わない。
- 目、鼻、口、頬、胴体は描かない。

### Orientation control

iconは現在の向きではなく、押した後に到達する向きを表す。

- portrait state: 横長phone icon + `横`。
- landscape state: 縦長phone icon + `縦`。
- `aria-label`は`横表示へ切り替える` / `縦表示へ切り替える`。
- rabbit symbolとは形と役割を明確に分ける。

### Theme toggle

- 端末画面内headerの右上へ常設する。
- sunを左、moonを右に持つ小型pill。
- 現在のdark stateではmoon側を`#FF4F7F`で選択表示する。
- portrait / landscapeで同じcomponentを使う。
- hamburger、目次drawer、theme stateは回転時にも維持する。

## 引き継ぐ方向

- 仮copy: `コードと設計、たまにそのほか。`
- geometric sans + Japanese Gothic。
- black + red-biased neon rose。
- 横下部は記事一覧、関連記事、人気記事の3カラム。
- 縦右railは関連記事、人気記事の上下構成。
- 端末の実装比率は[exact ratio仕様](./13-exact-shared-device-scroll-ui.md)を使う。

## 生成条件

- OpenAI `imagegen` built-in mode。
- 前回の縦横画像を個別のedit targetとして使用。
- rabbit thumbの小径化と白stroke、destination-oriented icon、sun/moon toggleだけを主変更として指定。
