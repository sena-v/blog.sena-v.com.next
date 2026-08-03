# 中央端末の縦表示5案・横表示5案

調査日: 2026-08-03

## 今回決まった方向

- デフォルトは中央に一台だけ置く縦表示。
- 端末外の`横表示`ボタンを押すと、WebGL外装が時計回りに90度回り、少し拡大する。
- 横表示は縦画面を引き伸ばさず、本文 + 目次、本文 + コードなどへresponsive reflowする。
- 端末内は実際に操作できるDOM。ハンバーガーから記事目次、関連記事、テーマ切替を開く。
- 実際のスマートフォンで閲覧するときは3D端末を表示せず、同じ記事DOMをviewportへ直接出す。
- 外側はdarkを基調とし、orangeを使わない。赤、ruby、crimson、oxbloodとneutral darkを比較する。

比較用モックは方向確定後に削除した。以下は縦01〜05と横01〜05を同じ順番で対応させた文章による比較履歴である。

## 5つの縦横ペア

### Pair 01. Red Ink Editorial

- 縦: 左に年・月、右に関連記事。端末中央。
- 横: 本文68%、固定目次と関連記事32%。
- 回転ボタンを端末のすぐ右に置く、最も説明なしで理解しやすい基準案。

### Pair 02. Ruby Mauve Quiet Stage

- 縦: 周囲を減らし、端末下へ`縦 / 横`segmented control。
- 横: 本文と大きな図・コードを二列化。
- 端末へのfocusが最も強く、rubyがorangeより落ち着いて見える案。

### Pair 03. Crimson TOC Drawer

- 縦: hamburgerを開き、右42%に記事目次・関連記事・dark modeを表示。
- 横: 本文66%、drawer 34%。横幅が増えるため題名を隠さない。
- 実際のスマートフォンで使うmenu構造を最も直接確認できる案。

### Pair 04. Oxblood Slate Dark Reader

- 縦: 外側だけでなく端末内の記事もdark mode。
- 横: darkの本文、code、archiveを三分割。
- `横表示 / ライト`を端末横へ置き、orientationとthemeを独立して操作する。

### Pair 05. Scarlet Command Dock

- 縦: 端末下のdockに`目次 / 横表示 / テーマ`を集約。
- 横: 本文と大きなcode pane。dockは`目次 / 縦表示 / テーマ`へ変わる。
- 外側の操作を最も少ない場所へまとめられる案。

## 赤系dark paletteの調査

Radix Colorsはdark用のgray、mauve、slateと、red、ruby、crimsonの各12段階scaleを持つ。公式のpalette compositionでは、red / ruby / crimsonは近い色相を含むmauveと自然に組み合わせられ、neutralを優先するならgrayも使える。dark modeは同じtoken名をdark scaleへ切り替えられる。

今回の色はRadixのdark scaleを中心に、画像生成用の紙色だけを追加した。コントラスト値はsRGBのWCAG計算。通常文字は4.5:1以上、大きな文字は3:1以上というWCAG 2.2 AAを下限にする。

| Pair | Background | Primary | Muted | Accent | bgとのcontrast（Primary / Muted / Accent） |
| --- | --- | --- | --- | --- | --- |
| 01 Red Ink | `#111111` | `#eeeeee` | `#b4b4b4` | `#e5484d` | `16.28 / 9.11 / 4.82` |
| 02 Ruby Mauve | `#121113` | `#eeeef0` | `#b5b2bc` | `#e54666` | `16.25 / 9.02 / 4.84` |
| 03 Crimson Mauve | `#191114` | `#eeeef0` | `#b5b2bc` | `#e93d82` | `16.02 / 8.89 / 4.82` |
| 04 Oxblood Slate | `#111113` | `#edeef0` | `#b0b4ba` | `#ff9592` | `16.25 / 9.06 / 8.95` |
| 05 Scarlet Cool Black | `#0d0e10` | `#f2f0ee` | `#b4b4b4` | `#ec5d5e` | `16.99 / 9.31 / 5.79` |

Pair 04の暗いoxblood `#b54548`は背景とのcontrastが`3.51:1`なので、通常サイズの文字には使わない。大きな連番、選択面、borderへ限定し、リンクと小文字には`#ff9592`を使う。赤だけで選択状態を伝えず、下線、太さ、icon、`aria-current`を併用する。

参考:

- [Radix Colors: composing a palette](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette)
- [Radix Themes: color](https://www.radix-ui.com/themes/docs/theme/color)
- [Radix Themes: dark mode](https://www.radix-ui.com/themes/docs/theme/dark-mode)
- [WCAG 2.2: Contrast Minimum](https://www.w3.org/TR/WCAG22/#contrast-minimum)

## 回転interactionの仕様

### 状態

```ts
type ReaderOrientation = "portrait" | "landscape";
type ReaderTheme = "system" | "light" | "dark";
type ReaderPanel = "closed" | "toc";
```

初期値は`portrait`。themeは保存済みの本人選択があればそれを優先し、なければ`prefers-color-scheme`へ合わせる。orientationは再訪時に持ち越さず毎回portraitから始める方が、最初に何が起きるか分かりやすい。

### 通常motion

1. `横表示`を押したら、ボタンを一時的にdisabledにする。
2. 0〜180msで縦DOMのopacityを下げる。
3. 40〜560msで外装をZ軸へ90度回し、scaleを`1`から`1.14〜1.20`へ上げる。
4. 端末が45度を越えたところでDOMをlandscape layoutへ切り替える。
5. 420〜680msで横DOMを表示し、ボタンlabelを`縦表示`へ変える。
6. 選択中の見出し、目次、theme、article idは維持する。

回転中の画面内容を無理に読ませず、外装の物理motionとDOMのresponsive transitionを分ける。横から縦は逆順。回転中心は画面中央に固定し、周囲の一覧を押し退けない。

scroll位置はpxで引き継がず、最も近い見出しidか0〜1のprogressを保存する。縦横で段組が変わっても、同じ意味位置から読み続けられる。

### Reduced motion

`prefers-reduced-motion: reduce`では3D回転とscaleを使わない。外装を150ms程度でcross-fadeし、DOMをportrait / landscapeへ切り替える。orientation button自体は残す。

参考:

- [Motion: useReducedMotion](https://motion.dev/docs/react-use-reduced-motion)

## WebGL外装とDOM画面

第一候補はReact Three Fiberで端末外装だけを描き、Dreiの`Html transform`で記事DOMを同じ3D objectへ結び付ける方式。`Html`はDOMをscene内のobject位置へ投影し、`transform`で`matrix3d`変形できる。ただし一部環境で文字がぼやける場合があるため、親を縮小し子を拡大する公式記載の回避策をlocalhost試作で検証する。

静止時に60fps renderを続ける必要はない。Canvasは`frameloop="demand"`とし、回転・theme切替・pointer interaction中だけ`invalidate()`する。

参考:

- [Drei: Html](https://drei.docs.pmnd.rs/misc/html)
- [React Three Fiber: scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [Three.js InteractionManager](https://threejs.org/docs/pages/InteractionManager.html)

## 実際のスマートフォン表示

mobile breakpointではCanvas、3D外装、外側のarchiveをmountしない。端末内で使った`ArticleReader`を通常のDOMとしてviewportへ直接表示する。

- hamburgerは右または左から出るmodal drawer。
- drawerは記事目次、関連記事、theme切替、このサイトについてを持つ。
- focus trap、`Escape`、閉じるbutton、現在見出しの`aria-current`を持つ。
- orientationは端末の物理回転とCSS media queryへ任せ、WebGLの模擬回転buttonは表示しない。
- portrait / landscapeとも同じURL、同じscroll container、同じarticle dataを使う。

dark modeは`<meta name="color-scheme" content="dark light">`と`color-scheme`を宣言し、OS設定を`prefers-color-scheme`で取得する。本人がtoggleした選択は保存し、初期paint前に反映して白いflashを防ぐ。

参考:

- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-color-scheme)
- [MDN: meta color-scheme](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme)

## 次の選び方

1. 縦の周囲UI: 左右索引（01）、静かな中央（02）、開いた目次（03）、dark本文（04）、下部dock（05）。
2. 横の記事構造: 本文 + 目次（01/03）、本文 + 図・code（02/05）、dark三分割（04）。
3. 色: neutral red、ruby、crimson、oxblood、scarlet。

この3項目は同じPairを選ぶ必要はない。たとえば`02の静かな縦構造 + 01の横目次 + 04のdark palette + 05のdock`のように合成してlocalhost prototypeへ進められる。

## 生成条件

- OpenAI `imagegen` built-in mode。
- 縦5枚は好感触だった2案と中央端末案を視覚参照として新規生成。
- 横5枚は対応する縦画像を一枚ずつ参照し、同じ端末・配色の回転後として生成。
- 生成画像の本文、code、日付、図は構成比較用の仮表示。
