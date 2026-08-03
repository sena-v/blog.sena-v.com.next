# 第5回デザイン調査: Article Covers × Design Engineering

調査日: 2026-08-02

第4回20案への具体的な反応を基に、写真を独立した観察記録ではなく、記事へ移動するためのカバー／サムネイルとして扱う方向へ修正した。現代のデザインエンジニア系個人サイト、ブログ、モーション実装を調べ、30方向を比較する。追加フィードバックを受け、汎用スマートフォンをWebGL上の記事ビューアとして扱う30案も同じ調査内で比較する。

## 現在の基準

実装へ進むときは、まず次の3点を見る。

1. [ブログ改善 1st最終デザイン・機能仕様](./FIRST_FINAL_DESIGN_SPEC.md)
2. [1st final portrait](./final-v1/portrait.webp)
3. [1st final landscape](./final-v1/landscape.webp)

`00`〜`15`の文書は、好みの特定と仕様へ至った判断履歴である。比較画像は方向確定後に削除し、最終縦横2枚だけを保持する。相違がある場合は1st最終仕様を優先する。

## 調査履歴を読む順番

1. [好みの推定](./00-preference-profile.md)
2. [WebGL記事ビューアの構造30案](./07-webgl-device-explorer.md)
3. [大画面端末10案の詳細](./09-device-focus-shortlist.md)
4. [縦横回転・配色・モバイル仕様](./10-portrait-landscape-rotation-study.md)
5. [iPhone比率固定・赤系neon横5案と縦推奨案](./11-iphone-ratio-neon-refinement.md)
6. [横04 refinement: balanced navigation × soft neon pink](./12-balanced-navigation-soft-neon.md)
7. [Exact shared device × scrollable editorial index](./13-exact-shared-device-scroll-ui.md)
8. [Rabbit scroll thumb × neon rose direction](./14-rabbit-scroll-neon-rose-direction.md)
9. [Micro rabbit thumb × destination icons × theme toggle](./15-micro-rabbit-destination-icons-theme-toggle.md)

## 今回の修正点

- 画像はすべて記事リンクの一部として扱う。
- 写真に「静かな朝」「季節の途中」など、記事とは別の物語を付けない。
- `cover`指定があればその画像、なければ管理された汎用カバーを表示する。
- 実写、紙、コード、画面を混ぜても、各要素がどの記事へつながるかを明確にする。
- 大判写真、図、コードが画面の主役になりすぎる構図は外す。
- モーションは記事の選択・遷移・並び替えを補助する。自動再生の装飾は使わない。
- 当初は汎用端末枠を想定したが、追加フィードバックを受け、現在はAppleの公開寸法を基準にiPhone 17 Pro相当の比率へ固定する。商標やApple logoは表示しない。

## ファイル

- [FIRST_FINAL_DESIGN_SPEC.md](./FIRST_FINAL_DESIGN_SPEC.md): 実装時に優先する1st最終デザイン・機能仕様
- [00-preference-profile.md](./00-preference-profile.md): 第4回への反応から推定した好き・嫌い
- [01-reference-catalog.md](./01-reference-catalog.md): 個人サイトと実装資料30件
- [02-current-patterns-and-motion.md](./02-current-patterns-and-motion.md): 現在の見せ方とモーションの段階
- [03-cover-system.md](./03-cover-system.md): カバー指定、フォールバック、権利、性能
- [04-thirty-directions.md](./04-thirty-directions.md): 30案の構造と動き
- [05-recommendation.md](./05-recommendation.md): 有力系統とlocalhost比較手順
- [06-mockup-prompts.md](./06-mockup-prompts.md): 生成条件とプロンプト一覧
- [07-webgl-device-explorer.md](./07-webgl-device-explorer.md): 端末サイズと一覧比率を変えた30案
- [08-device-mockup-prompts.md](./08-device-mockup-prompts.md): 端末案の生成条件
- [09-device-focus-shortlist.md](./09-device-focus-shortlist.md): 好感触の2案から絞った大画面端末10案
- [10-portrait-landscape-rotation-study.md](./10-portrait-landscape-rotation-study.md): 中央端末の縦横ペア、回転、目次、モバイル、dark mode、赤系配色
- [11-iphone-ratio-neon-refinement.md](./11-iphone-ratio-neon-refinement.md): iPhone 17 Pro比率、横5案、縦推奨案、neon red palette、比率test
- [12-balanced-navigation-soft-neon.md](./12-balanced-navigation-soft-neon.md): 横04の選定後refinement、右側回転操作、3カラム、関連記事 + 人気記事、soft neon pink
- [13-exact-shared-device-scroll-ui.md](./13-exact-shared-device-scroll-ui.md): 縦横で共有する厳密な端末比率、小型回転操作、scroll cue、brighter pink
- [14-rabbit-scroll-neon-rose-direction.md](./14-rabbit-scroll-neon-rose-direction.md): rabbit outline scroll thumb、仮copy、geometric font、red寄りneon rose
- [15-micro-rabbit-destination-icons-theme-toggle.md](./15-micro-rabbit-destination-icons-theme-toggle.md): 小径white rabbit thumb、到達先icon、端末内theme toggle
- [final-v1](./final-v1): 1st finalとして固定したportrait / landscapeの軽量WebP

## モックアップの扱い

最終画像の記事本文、日付、コード、端末画面は構造比較用の仮表示であり、現行サイトの事実ではない。本実装は本人が権利を持つ記事と公開可能な自サイト画面だけを使う。選定済みの要件は[ブログ改善 1st最終デザイン・機能仕様](./FIRST_FINAL_DESIGN_SPEC.md)、実測値は[実装検証書](./IMPLEMENTATION_VERIFICATION.md)を優先する。
