# 記事カバーとフォールバックの仕様

## 結論

カバーは記事本文の挿絵ではなく、一覧で記事を識別するための視覚リンクとして扱う。内容を厳密に説明する必要はないが、誤解を招く人物、製品、会社、場所を使わない。

## 優先順位

```text
1. 記事にcoverが明示されている
   └─ 本人写真 / 自サイト画面 / 公開可能なコード・ノート / 自作画像

2. cover未指定、記事の種別から汎用カバーを選べる
   └─ code / browser / terminal / note / device / abstract-grid

3. 種別も未指定
   └─ slugから決定的に選ぶ汎用カバー + 記事題名

4. 画像を読み込めない
   └─ 色面、連番、題名だけのHTML/CSS表示
```

## frontmatter案

```yaml
cover:
  src: /images/articles/blog-reboot/cover.webp
  alt: ブログの変更前後を並べた画面
  focalPoint: 52% 40%
  fit: cover
  credit: null
coverFallback: browser
```

`cover`全体を必須にしない。最小構成は`coverFallback: code`だけでよい。

## 汎用カバー

最初は6種類程度を自作して使い回す。

| 種類 | 見た目 | 適する記事 |
| --- | --- | --- |
| `code` | 架空ではない短い自作コード断片 | 実装、JavaScript、Next.js |
| `browser` | 汎用ブラウザー枠と自サイトの画面 | UI、ルーティング、SEO |
| `terminal` | コマンドと短い検証結果 | 基盤更新、CI、Node.js |
| `note` | 公開可能な本人メモまたは無地の方眼 | 設計、振り返り、方針 |
| `device` | Apple固有要素のない汎用スマートフォン | レスポンシブ、モバイルUI |
| `abstract-grid` | 色、罫線、slug番号だけ | その他、古い記事 |

同じ画像を全記事へ表示するより、`slug`のhashからクロップ、色、番号を決める。ランダムにはせず、再buildしても同じ見た目を保つ。

## 記事と直接関係のない写真を使う場合

- 写真は人物、商品、会社、特定イベントを示さない抽象度にする。
- 光、机、建築の細部、手元、移動中の窓など、一般的な対象に限定する。
- 記事題名を隣接させ、写真だけを意味の本体にしない。
- 写真が装飾なら空altにし、リンクのアクセシブルネームは記事題名から取る。
- 写真に「この記事で扱う技術の実物」と誤認させるcaptionを付けない。

## 外部画像とスクリーンショット

- 外部記事のOG画像を自動取得・複製しない。
- 外部記事は自作の汎用カバー + 掲載先名 + 初出日で表示する。
- 自サイトの画面は利用できるが、通知、個人情報、計測ID、勤務先情報を確認する。
- 第三者サービス画面を使う場合は、ロゴや画面の利用条件を確認する。

## iPhone風の端末について

AppleのMarketing Guidelinesでは、Apple提供の製品画像は対象アプリの販促などライセンス条件内で使い、改変しないことが求められる。汎用端末イラストにはApple固有のHomeボタン、sensor housing、switch、volume controlsなどを入れないよう案内されている。

このブログの通常記事カバーでは次を採用する。

- `iPhone`とは呼ばない。
- Appleロゴ、Dynamic Island、固有ボタン配置を描かない。
- CSSの単純な縦長矩形 + 画面 + 細い外枠にする。
- 端末は画面内容を支える小要素に留める。
- Apple製品自体を扱う記事だけ、利用条件を確認して公式素材を検討する。

参考: [Apple App Store Marketing Guidelines](https://developer.apple.com/app-store/marketing/guidelines/)

## 画像コンポーネント

```tsx
<ArticleCover
  article={article}
  sizes="(min-width: 1200px) 25vw, (min-width: 720px) 50vw, 100vw"
  priority={index < 2}
  motion="shared-if-supported"
/>
```

必要な責務:

- 静的importまたは明示寸法でCLSを防ぐ。
- cover、fallback、画像エラーを同じ比率で扱う。
- 画像なしでも題名が読める。
- hover、focus、reduced motionを一箇所で管理する。
- 外部記事ではprovider固有画像へ依存しない。
