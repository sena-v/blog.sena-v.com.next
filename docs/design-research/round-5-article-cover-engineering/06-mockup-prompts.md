# 30モックアップの生成条件

## 共通条件

- Use case: `ui-mockup`
- 1536×1024、デスクトップのWebサイト正面。ブラウザー外枠なし。
- `sena-v.com`の日本語個人ブログ。ポートフォリオのProjects/Skills/metricsは置かない。
- 画面上の各画像は必ず記事カバー／サムネイルで、記事リンクに対応する。
- 写真へ記事と別の詩的captionを付けない。
- `cover`未指定の記事にはcode、browser、terminal、note、generic device、abstract gridの汎用カバーを表示する。
- 題名は常時読める。hoverしないと題名が分からない構造にしない。
- 第4回03、11、13、20の良い部分を言語化して参照し、既存画像自体は入力しない。
- 角丸カード群、glass、過剰な影、グラデーション球体、3D AIオブジェクト、timelineを避ける。
- iPhone、Appleロゴ、Dynamic Island、HomeボタンなどApple固有要素を描かない。
- 汎用端末は単純な縦長矩形と画面だけにする。
- 生成内の写真、画面、コードは仮素材であり、本番では使わない。

## 共通記事

- 「ブログを作り直している」
- 「GA4のpage_viewを一度だけ送る」
- 「古い記事をどう残すか」
- 「Next.jsを更新した記録」
- 「検索状態をURLで共有する」
- 「外部で書いた記事をまとめる」
- 「画像を軽くするために試したこと」
- 「個人ブログをまた書き始める」

## 30案の差分

| # | Prompt key |
| --- | --- |
| 01 | dark 3×3 article-cover grid |
| 02 | light 4×3 proof grid with red selection brackets |
| 03 | one horizontal strip of five linked article covers |
| 04 | asymmetric 7-cover editorial board |
| 05 | six covers plus matching text index |
| 06 | atlas of twelve varied crops |
| 07 | notebook as one cover plus five digital covers |
| 08 | paper, screen, code, photo on shared baselines |
| 09 | three generic phone frames plus three normal covers |
| 10 | three browser covers plus three photo covers |
| 11 | six small code, paper and screen covers |
| 12 | seven restrained physical/digital floating modules |
| 13 | eight article-only dev desk bento modules |
| 14 | terminal covers occupy less than one third |
| 15 | IDE-inspired article index and small preview |
| 16 | cover grid with metadata inspector |
| 17 | before/after diff visual language |
| 18 | desktop/tablet/generic phone cover ratios |
| 19 | charcoal, ivory, muted orange modules |
| 20 | ivory, black, cobalt modules |
| 21 | monochrome ledger, one color hover state |
| 22 | medium latest cover plus five horizontal covers |
| 23 | alternating wide and narrow cover mosaic |
| 24 | dense index with fixed small hover preview |
| 25 | list and article-header shared transition storyboard |
| 26 | regular crop and hover crop states |
| 27 | three expandable stacks, all titles visible |
| 28 | article list and pinned cover preview |
| 29 | latest/popular/external filter morph layout |
| 30 | shallow layered paper/browser/device/photo article canvas |

## 生成方法

- OpenAI `imagegen` built-in modeによる新規生成。
- 30案を別プロンプトで一枚ずつ生成する。
- 既存モックアップを参照画像として投入しない。
- PNGを`mockups/`へコピーし、01〜15と16〜30の比較シートを作る。
- 生成画像の文字精度ではなく、画像密度、記事との対応、素材の混ざり方、モーション余地を評価する。
