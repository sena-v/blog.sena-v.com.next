# Exact shared device × scrollable editorial index

生成・検証日: 2026-08-03

> **Visual direction update:** copy、font、red寄りneon、rabbit outlineのscroll thumbを比較する[Rabbit scroll thumb × neon rose direction](./14-rabbit-scroll-neon-rose-direction.md)を追加した。端末の寸法基準は本資料を継続して使う。

縦横で端末外形が変わって見える問題を解消するため、画像生成モデルへ端末形状を任せず、同じ寸法定数からportrait / landscapeを描画した。横表示は同じ端末を90度回転し、uniform scaleを上げるだけである。前回までの小型回転操作、非対称3カラム、関連記事 + 人気記事、scroll affordance、明るいsoft neon pinkも統合した。

比較用モックとHTML prototypeは方向確定後に削除した。現在の見た目は[最終portrait / landscape](./FIRST_FINAL_DESIGN_SPEC.md#2-最終visual-direction)、実測値は[実装検証書](./IMPLEMENTATION_VERIFICATION.md)を参照する。


## 同一端末比率

portraitの基準boxは`434 × 905.421875px`。landscapeではこのboxを90度回転し、`1.2369924`倍へuniform scaleして`1120 × 536.84375px`として表示する。縦横でwidthとheightを別々に伸縮しない。

| State | Outer box | 長辺 / 短辺 | Screen box | 長辺 / 短辺 |
| --- | --- | ---: | --- | ---: |
| portrait | `434 × 905.421875` | `2.0862255` | `398 × 865.296875` | `2.1741128` |
| landscape | `1120 × 536.84375` | `2.0862681` | `1072 × 493.0625` | `2.1741666` |

CSS layout engineのsub-pixel丸めを除き、外装は`150 / 71.9 = 2.08623`、画面は`2622 / 1206 = 2.17413`を共有する。

```css
:root {
  --device-ratio: 71.9 / 150;
  --screen-ratio: 1206 / 2622;
}

.device--portrait {
  width: 434px;
  aspect-ratio: var(--device-ratio);
}

.device--landscape {
  width: 1120px;
  aspect-ratio: 150 / 71.9;
}
```

WebGL実装では別meshを二つ作らず、同一groupへ`rotation.z`とuniform `scale`だけを適用する。

```ts
const landscapeScale = 1120 / 905.421875; // 1.2369924

device.rotation.z = orientation === "landscape" ? Math.PI / 2 : 0;
device.scale.setScalar(orientation === "landscape" ? landscapeScale : 1);
```

## 回転操作

- hit target: `44 × 44px`
- visible ring: `32px`
- icon: `18px`
- stroke: `1px`
- 常時表示labelは`横`または`縦`の9pxだけ
- full labelの`横表示 / 縦表示`はtooltipと`aria-label`で提供
- portrait / landscapeとも端末右側に置き、中央より少し下へ寄せる

前案の`72px`円、長いlabel、accent underlineは廃止した。操作は認識できるが、端末や記事indexより先に目へ入らない強さにする。

## scroll可能であることの伝え方

一覧は太いbrowser scrollbarを出さず、次の4要素を組み合わせる。

1. 2〜3件を完全表示し、その次の行を途中まで見せる。
2. list末尾の約`22px`だけCSS maskで薄く消す。
3. 右端に`2px`のrailと`28px`のthumbを常時表示する。
4. headingはlistの外へ置き、本文部分だけがscrollすることを示す。

portraitではarchive、関連記事、人気記事を個別にscroll可能にする。landscapeでは記事一覧、関連記事、人気記事を個別にscroll可能にする。wheel、trackpad、drag、keyboard操作を受け、focus中のrailだけを`--accent-bright`へ変える。

## landscape下部の編集感

下部は3列を維持するが、完全な等幅にはしない。

- 全体幅を端末外装と同じ`1120px`へ限定する。
- 列幅は`1.35fr 1fr 1fr`。
- 記事一覧は日付 + title、関連記事はtitle + tag、人気記事は大きなrank + titleと、列ごとに文字のリズムを変える。
- individual cardは使わず、細いtop ruleと余白で区切る。
- 3列すべてに同じscroll cueを持たせるが、情報表現は均一化しない。

## brighter red-pink neon

| Token | Value | `#050608`とのcontrast | 用途 |
| --- | --- | ---: | --- |
| `--text` | `#FFF7FB` | `19.26:1` | 見出し、本文 |
| `--muted` | `#B8BAC2` | `10.46:1` | metadata、補助文 |
| `--accent` | `#FF68B8` | `7.65:1` | 現在位置、短いrule、code token |
| `--accent-bright` | `#FF7FC7` | `8.80:1` | active、rank、scroll thumb edge |
| `--accent-soft` | `#FFD1E8` | `15.00:1` | focus edge、淡いhighlight |

本文をpinkにせず、accentを小面積へ限定する。glowは最大2〜3pxのedge softnessとし、大きなpink面や強いbloomを作らない。

OpenAI `imagegen` built-in modeで新しい配色とscroll表現のart-direction draftを生成したが、外装が指定比率より縦長になったため最終成果物には採用しなかった。採用したUI判断は現在の最終仕様と実装へ統合している。
