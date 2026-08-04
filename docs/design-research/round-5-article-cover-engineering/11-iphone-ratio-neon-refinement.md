# iPhone比率固定・赤系neon refinement

調査・生成日: 2026-08-03

> **追加refinement:** 横04を選定後、回転操作を右へ移し、横下段を3カラム、縦右railを関連記事 + 人気記事へ再構成した。[balanced navigation × soft neon pink](./12-balanced-navigation-soft-neon.md)を現在の優先案とする。

前回の横表示案へのフィードバックを受け、端末比率、回転操作、枠外の関連記事、赤系配色だけに論点を絞った。横5案はすべて「中央の横端末 + 左中央の回転ボタン1個 + 端末外の関連記事」を共通骨格にしている。縦案は前回の`01 Red Ink Editorial`の三分割構成へ、今回の推奨paletteを適用した。

## 今回固定すること

- 外装の基準はiPhone 17 Proの`150.0 mm × 71.9 mm`とし、縦の`height / width`、横の`width / height`をともに`2.08623`へ固定する。
- 画面は`2622 × 1206`を基準に、縦の`height / width`、横の`width / height`をともに`2.17413`へ固定する。
- 縦横で別々の端末meshを作らず、同じ外装をZ軸へ90度回す。したがって回転後に比率や角丸が変わらない。
- 回転操作は端末の左中央に1個だけ置く。横表示中は`縦表示`、縦表示中は`横表示`とする。
- 端末下の`縦 / 横`segmented controlは廃止する。回転iconを別の場所へ重複させない。
- 横表示でも関連記事を端末外へ残す。端末だけが浮いて見える構図にはしない。
- orange、amber、copper、bronze、warm brownを使わない。赤は小さな操作、罫線、番号、選択状態へ限定する。

寸法は[AppleのiPhone 17 Pro仕様](https://www.apple.com/iphone-17-pro/specs/)と[公式dimensional drawing](https://developer.apple.com/download/files/accessories/dimensional-drawings/iphone-17-pro.pdf)を基準にした。画像生成には固定boxと比率を明示したが、生成画像は視覚方向を比べるコンセプトであり、sub-pixel単位の寸法保証には使わない。本実装では数値定数と自動テストで厳密に固定する。

## 横表示5案

### 01 Neon Red Proof


- cool whiteの紙面と黒い外側を最も明確に分ける。
- 関連記事は右下3行。添付案に最も近い情報配置。
- 赤は`#FF3347`、P3では`color(display-p3 1 0.16 0.26)`を起点にする。

### 02 Laser Ruby OLED


- 本文、code、目次をdark面の中で三分割する。
- 関連記事は右下の縦rail。長い本文を読むengineer向けreaderとして最も機能的。
- accentは`#FF2F68`。ruby寄りだがpurpleへは寄せない。

### 03 Electric Crimson Split


- cool whiteの本文と大きな設計図を左右に分ける。
- 関連記事は下部2列。端末と枠外情報の横幅を揃えやすい。
- accentは`#FF3864`。本文ではなく番号とdiagram annotationへ使う。

### 04 Signal Scarlet Dark


- 本文とcodeをdark面の左右へ分け、端末外に関連記事3行と年indexを置く。
- 5案で最も黒の密度が高く、engineer blogとしての情報量と静けさが両立する。
- accentは`#FF233D`、P3では`color(display-p3 1 0.08 0.18)`を起点にする。
- **現時点の推奨案。**

### 05 Hot Rose Red Index


- 画面内をlight articleとdark diagramへ分ける。
- 関連記事を大きな01〜04のindexにするため、次の記事へ移る導線が最も強い。
- accentは`#FF2E6D`。pinkへ寄りすぎないよう、面では使わない。

## 縦表示: Signal Scarlet OLED


前回の縦01の構造を維持し、横04の配色と文字組みを適用した。左にarchive、右に関連記事、中央に一台だけの端末を置く。`横表示`は端末右中央の1個だけで、横へ回転した後は同じ操作が左中央へ移り`縦表示`になる。

## palette token

共通neutralを固定し、accentだけを比較する。P3は[CSS Color 4の`color()`](https://www.w3.org/TR/css-color-4/#color-function)を使い、sRGB fallbackを先に宣言する。wide-gamutを使えない画面でも意味が変わらないよう、色だけで選択状態を伝えない。

| Token | Value | 用途 |
| --- | --- | --- |
| `--black-0` | `#050608` | page background |
| `--black-1` | `#0B0D10` | phone screen / panel |
| `--black-2` | `#11141A` | code / elevated surface |
| `--text` | `#F5F7FA` | main text |
| `--muted` | `#9BA3AD` | metadata / inactive item |
| `--signal` | `#FF233D` | active rule / number / control |
| `--signal-p3` | `color(display-p3 1 0.08 0.18)` | P3対応画面のaccent override |

Radix ColorsもP3対応の色定義とdark background上の段階的scaleを提供しているため、実装時は単一の蛍光色を全面へ置かず、interaction stateごとの段階を作る。[Radix Colors overview](https://www.radix-ui.com/colors)と[custom palettes](https://www.radix-ui.com/colors/docs/overview/custom-palettes)を参照する。

```css
:root {
  --signal: #ff233d;
}

@supports (color: color(display-p3 1 0 0)) {
  :root {
    --signal: color(display-p3 1 0.08 0.18);
  }
}
```

## 実装時の比率固定

```ts
export const IPHONE_17_PRO = {
  outerPortrait: 71.9 / 150,
  outerLandscape: 150 / 71.9,
  screenPortrait: 1206 / 2622,
  screenLandscape: 2622 / 1206,
} as const;
```

```css
.device[data-orientation="portrait"] {
  aspect-ratio: 71.9 / 150;
}

.device[data-orientation="landscape"] {
  aspect-ratio: 150 / 71.9;
}

.device-screen[data-orientation="portrait"] {
  aspect-ratio: 1206 / 2622;
}

.device-screen[data-orientation="landscape"] {
  aspect-ratio: 2622 / 1206;
}
```

WebGLでは外装を`width = 0.719`、`height = 1.5`の同一groupとして作り、landscape時に`rotation.z = Math.PI / 2`へ動かす。画面DOMは同じgroupへ追従させるが、記事の内部layoutだけをorientation stateでreflowする。

visual regressionでは端末の`getBoundingClientRect()`を取得し、次を検証する。

```ts
const actual = box.width / box.height;
const expected = orientation === "landscape" ? 150 / 71.9 : 71.9 / 150;
expect(Math.abs(actual - expected)).toBeLessThan(0.001);
```

## 次の判断

まず横04と今回の縦案を一組としてlocalhostに静止実装する。その後、端末meshを90度回すprototype、記事DOMのreflow、関連記事の位置補間を順に加える。比較を残したい場合は、横01のlight記事面と横04のdark記事面だけをtheme variantとして持つ。02、03、05の情報構造は必要な部分だけ04へ統合し、5種類の別UIとして実装しない。

## 生成条件

- OpenAI `imagegen` built-in mode。
- 横5枚は添付された好感触案と、前回の横04を参照した新規生成。
- 縦1枚は前回の縦01と今回の横04を参照した新規生成。
- 生成時に外装`2.08623:1`、画面`2.17413:1`、単一回転操作、orange禁止を明記した。
- 記事本文、code、日付、図は構成比較用の仮表示。
