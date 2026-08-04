# 横04 refinement: balanced navigation × soft neon pink

生成日: 2026-08-03

> **追加refinement:** 縦横で同じ端末比率を厳密に共有し、小型回転操作とscroll affordanceを統合した[Exact shared device × scrollable editorial index](./13-exact-shared-device-scroll-ui.md)を現在の優先案とする。

横04 `Signal Scarlet Dark`を基準に、回転操作の左右バランス、端末下の情報量、縦表示の右rail、accentの明るさを修正した。現時点ではこの縦横ペアを次のlocalhost prototypeの基準にする。

## 横表示


### 修正したこと

- 左中央にあった回転操作を端末の右中央へ移した。
- 回転操作は`72px`の円を1個だけ使い、icon、stroke、label間隔をcomponent tokenとして固定する。
- 端末下を3等分し、左から`記事一覧 / 新しい順`、`関連記事`、`人気記事`を置いた。
- 3列は見出し位置、row height、divider、arrow位置を揃えた。個別のcardにはしない。
- 端末内は好感触だった横04の`article + code`を維持した。

## 縦表示


### 修正したこと

- 左archive、中央端末の構造は維持した。
- 右railを上下に分け、上へ`関連記事`、下へ`人気記事`を置いた。
- `横表示`操作は端末と右railの間に置き、横表示と同じ`72px` componentを使う。
- 横表示と同じdark surface、本文色、soft neon pinkを使い、回転後も同じdesign systemに見えるようにした。

## 回転操作の固定値

画像生成では同じ寸法を指定したが、本実装ではCSS custom propertyで一元化する。viewportやorientationごとに別の数値を持たせない。

```css
:root {
  --orientation-control-size: 72px;
  --orientation-control-icon-size: 28px;
  --orientation-control-stroke: 1px;
  --orientation-control-device-gap: 24px;
  --orientation-control-label-gap: 12px;
}
```

```ts
export const orientationControl = {
  size: 72,
  iconSize: 28,
  strokeWidth: 1,
  deviceGap: 24,
  labelGap: 12,
} as const;
```

- portrait: 端末右辺から`24px`、端末のvertical centerに配置する。
- landscape: 端末右辺から`24px`、端末のvertical centerに配置する。
- 狭いdesktopでは下へ逃がさず、端末scaleと周囲railを先に縮小する。
- mobile実機ではWebGL模擬回転を使わないため、この操作自体を表示しない。

## 下段3カラム

| 左 | 中央 | 右 |
| --- | --- | --- |
| `記事一覧` | `関連記事` | `人気記事` |
| 公開日降順 | 現在の記事との関連順 | GA4の閲覧データ順 |
| 日付 + title | title + tag | rank + title |

`人気記事`はPV数自体を画面へ出さず、順位だけに使う。GA4連携前や十分な期間のデータがない場合は、人気順を推測して表示せず、編集選定の`よく読んでほしい記事`へlabelごと切り替える。

desktopでは3列を同じ幅へ揃える。横表示の端末だけを大きく見せたい場合でも、下段の開始位置と全体幅は端末外形へ揃え、回転操作の領域は3列幅に含めない。

## soft neon pink palette

前回の`#FF233D`は深いscarletとしてはよいが、黒面ではやや重く見えた。新案は白成分を増やしたpinkへ移し、本文はcool whiteのまま保つ。

| Token | Value | `#050608`とのcontrast | 用途 |
| --- | --- | ---: | --- |
| `--text` | `#F7F7FA` | `18.96:1` | 見出し、本文 |
| `--muted` | `#ADB0B8` | `9.34:1` | metadata、補助文 |
| `--accent` | `#FF5C96` | `6.97:1` | 選択線、rank、短いlabel |
| `--accent-soft` | `#FFC0D5` | `13.27:1` | 小さなhighlight、focus edge |
| `--background` | `#050608` | — | page background |
| `--surface` | `#0B0D10` | — | phone screen、code surface |

```css
:root {
  --background: #050608;
  --surface: #0b0d10;
  --text: #f7f7fa;
  --muted: #adb0b8;
  --accent: #ff5c96;
  --accent-soft: #ffc0d5;
}
```

accentは本文や広い面へ使わない。focus ring、現在位置、ranking number、短いcode tokenへ限定し、glowは最大でも2〜4pxのedge softnessにする。orange、amber、copper、red-orangeは引き続き使わない。

## 次のprototype

1. この2枚を同一page上のportrait / landscape stateとして静止実装する。
2. 回転操作を共通component化し、StorybookまたはPlaywright screenshotで`72px`を確認する。
3. 端末外装の比率testに加え、回転操作の直径・端末からのgapもtestする。
4. 下段3カラムを実データで組み、`人気記事`はGA4連携まではeditorial fallbackにする。
5. 静止状態を確認してからWebGL回転motionを追加する。

## 生成条件

- OpenAI `imagegen` built-in mode。
- 横は前回の横04を構造参照として新規生成。
- 縦は前回の縦推奨案と今回の横案を参照して新規生成。
- soft neon palette、右側の単一回転操作、`72px` control、横下段3カラム、縦右rail上下分割を明示した。
- 画像内の記事、日付、codeはlayout比較用の仮表示。
