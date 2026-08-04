# Rabbit scroll thumb × neon rose direction

生成日: 2026-08-03

> **追加refinement:** rabbit thumbを小さくして外円を白へ変更し、到達先を示す回転iconとdark-mode toggleを追加した[Micro rabbit thumb × destination icons × theme toggle](./15-micro-rabbit-destination-icons-theme-toggle.md)を現在の優先案とする。

細部の実装精度より、全体のvisual directionを決めるための縦横イメージ。前案の構造を維持し、scroll thumb、copy、font、accentを変更した。

比較用モックは方向確定後に削除した。採用した縦横の見た目は[最終仕様](./FIRST_FINAL_DESIGN_SPEC.md#2-最終visual-direction)を参照する。


## 今回の方向

- 仮copyを`コードと設計、たまにそのほか。`へ変更する。
- 明朝中心の硬いeditorial typographyから、geometric grotesk + Japanese Gothicへ移す。
- purpleに見えた淡いpinkをやめ、red寄りのneon roseへ移す。
- scroll thumbを円形にし、二本の耳と顔外形だけからなるrabbit outlineを入れる。
- rabbitはscroll railだけで使い、回転操作や端末内には使わない。
- 回転操作は小さなdevice iconのままにし、rabbitと意味を分ける。
- bezelは将来のWebGL prototypeで詰める。今回の画像では少し細く見せる程度に留める。

## Rabbit outline

可愛さを目的にしたmascotではなく、小サイズでも判別できるgeometric symbolとして扱う。

- 18〜20pxの円形thumb。
- 内側は一筆のmonoline。
- 二本の細長い耳から頭部輪郭へ連続させる。
- 目、鼻、口、頬、毛、胴体は描かない。
- circleはgraphite、outlineだけをneon roseにする。
- hover / drag時だけ2px程度のedge glowを強める。

## Provisional copy

`思考のログを、エンジニアの言葉で。`は説明的かつ自己演出的に見えるため廃止する。今回の`コードと設計、たまにそのほか。`は、内容を限定しすぎず、個人ブログらしい余白を残す仮copyである。

## Type direction

- Latin / brand / dates / ranks: Space Grotesk、Neue Haas Grotesk系のgeometric sans。
- Japanese UI / article title: Zen Kaku Gothic New、Noto Sans JP系の現代的Gothic。
- code: compact monospace。
- brandと大見出しだけweightを上げ、本文はregularで読む。
- rounded fontや極端に太いdisplay fontへは寄せない。

## Color direction

| Token | Value | 用途 |
| --- | --- | --- |
| `--background` | `#030406` | page background |
| `--surface` | `#08090C` | phone / code surface |
| `--text` | `#FFF8FA` | main text |
| `--muted` | `#A7AAB2` | metadata |
| `--neon-rose` | `#FF2F68` | selection / rule / rabbit |
| `--neon-rose-active` | `#FF4F7F` | active / drag / ranks |
| `--neon-rose-soft` | `#FFD0DC` | pale focus edge |

violet、lavender、purple、blue-magentaを避ける。pinkを広い面や本文へ使わず、短い線、rank、scroll thumb、code tokenへ限定する。

## 保留する細部

- 実際のbezel thicknessとcorner radius。
- rabbit outlineの最終vector path。
- scrollbar railの太さとthumbのdrag範囲。
- font file、weight、Japanese fallbackの最終選定。
- WebGL material、reflection、回転motion。

端末の本実装比率は[前回のexact ratio仕様](./13-exact-shared-device-scroll-ui.md)を引き継ぐ。今回の画像生成はvisual direction用であり、端末寸法の検証画像としては使わない。

## 生成条件

- OpenAI `imagegen` built-in mode。
- 前回のexact-ratio画像をedit targetとして使用。
- portrait / landscapeは別々に生成し、geometric typography、red-biased neon rose、rabbit scroll thumb、小型回転操作を共通条件にした。
