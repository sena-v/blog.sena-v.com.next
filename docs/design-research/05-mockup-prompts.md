# コンセプト画像の生成記録

作成日: 2026-08-02

## 用途と制約

- モード: 新規生成（既存サイトのスクリーンショット編集ではない）
- 用途: 五つの情報設計と視覚密度を比較するためのコンセプト画像
- 既存サイトを模写せず、調査で分解した原則をこのブログの架空画面へ再構成する
- 画像内の日本語は参考であり、実装時は必ずHTMLの実データを使う
- 画像をそのままデザイン仕様や背景素材として公開しない
- 共通の禁止事項: SaaSヒーロー、CTAボタン2個、数値カード、Bento Grid、紫青グラデーション、ガラス面、発光、過剰な角丸、偽ターミナル、ストックイラスト

## A. 年輪 / Editorial Timeline

保存先: `mockups/a-editorial-timeline.png`

```text
Create one original high-fidelity desktop web design concept for sena-v's Japanese personal technology blog, 1440x1024, straight-on screenshot with no browser chrome. The site is blog-first and portfolio-second. Build the whole composition around a descending editorial timeline: compact left-aligned header “sena-v.”, small Japanese introduction “技術のことと、日々の記録。” and simple text navigation “記事 / このブログについて / RSS”. Below, show years 2026, 2025, 2024 in a narrow left rail, a continuous fine vertical rule with small solid dots, dates, source labels, real-looking Japanese article titles and short summaries. The newest title is “数年止まったNext.jsブログを、履歴を残して再構築した”. Use warm near-white paper, near-black Japanese typography, muted gray metadata, one deep forest-green accent. Strong editorial hierarchy, generous but not huge whitespace, crisp rules, flat surface, accessible contrast. Article rows are not cards. No hero marketing section, no CTA buttons, no metrics, no bento grid, no gradients, no glass, no glow, no generic illustrations, no big rounded containers, no English uppercase eyebrow labels. The result should feel like a carefully edited long-running Japanese personal weblog, calm, human, and implementable with semantic HTML and CSS Grid.
```

## B. 書斎 / Personal Notebook

保存先: `mockups/b-personal-notebook.png`

```text
Create one original high-fidelity desktop web design concept for sena-v's Japanese personal technology blog, 1440x1024, straight-on screenshot with no browser chrome. The concept is a calm personal study and working notebook, not a portfolio template and not a scrapbook. Compact left-aligned site name “sena-v.”, an informal two-line Japanese note about writing down technology and daily discoveries, plain text navigation. Make the descending article timeline the main content with years, fine rules, dots, dates, source names, varied Japanese title lengths, and small human editorial notes in the margin. Include at most one tiny authentic-looking monochrome line sketch of a notebook or desk object, used like a personal annotation, never as a stock hero. Warm off-white paper, graphite gray, ink black, one restrained dark vermilion accent, precise Japanese sans-serif body type, small serif or mono numerals only. Use footnote marks, underlines, margin notes and page-like rhythm, but no torn paper, tape, handwriting font, random rotation, fake texture overload, cards, pills, shadows, gradients, bento layout, CTA buttons or metrics. It should look maintained by one thoughtful engineer over years and be fully plausible in semantic HTML and restrained CSS.
```

## C. 索引 / Developer Ledger

保存先: `mockups/c-developer-ledger.png`

```text
Create one original high-fidelity desktop web design concept for sena-v's Japanese personal technology blog, 1440x1024, straight-on screenshot with no browser chrome. Use the visual logic of a library index and engineering change ledger, but do not imitate a terminal. A compact header “sena-v.” and short Japanese sentence sits above a dense descending archive. Show year groups 2026, 2025, 2024; align date, article title, source and tags into precise columns with a fine timeline rule and small markers. Latest entries have one-line summaries; older entries are compact. Include a visible but quiet search field labeled “記事を検索” and textual tag links such as #nextjs, #typescript, #blog. Ivory-white background, near-black ink, fine gray rules, one cobalt-blue accent. Japanese body text is a clean sans-serif; use monospace only for dates, tags and code-like metadata. No tiny unreadable text. Absolutely no fake command prompt, green-on-black hacker styling, cards, pills, shadows, rounded dashboard panels, gradients, bento grid, metrics or generic portfolio sections. The mood is fast, exact, archival, personal and modern, achievable with CSS Grid, container queries and semantic ordered lists.
```

## D. 技術雑誌 / Japanese Web Magazine

保存先: `mockups/d-japanese-web-magazine.png`

```text
Create one original high-fidelity desktop web design concept for sena-v's Japanese personal technology blog, 1440x1024, straight-on screenshot with no browser chrome. Reinterpret a thoughtful independent Japanese technology magazine as a personal weblog. Use a compact masthead “sena-v.”, simple Japanese navigation and one large latest article headline “数年止まったNext.jsブログを、履歴を残して再構築した”, then connect it directly into a descending year timeline for 2026, 2025 and 2024. Make the grid editorial and mildly asymmetrical, with bold Japanese headline typography, thin precise rules, varied article title sizes based on editorial importance, dates and source labels. Use clean white or pale ivory, rich black, and one restrained vermilion-red accent. At most one abstract diagram made of lines and dots related to the timeline; no decorative AI illustration. Normal articles must still work without thumbnails. The page should be dramatic through typography and spacing, then calm in the reading areas. No marketing hero copy, CTA buttons, project cards, bento grid, rounded cards, glass, glow, gradients, stock imagery, giant quotation, or portfolio metrics. It must feel like an individual editor-engineer, not a media company and not an AI website template.
```

## E. 静かな蔵書 / Quiet Archive

保存先: `mockups/e-quiet-archive.png`

```text
Create one original high-fidelity desktop web design concept for sena-v's Japanese personal technology blog, 1440x1024, straight-on screenshot with no browser chrome. Design an exceptionally quiet, durable personal archive: compact “sena-v.” wordmark, one plain Japanese sentence “技術のことと、日々の記録。” and text navigation, followed immediately by a descending article timeline grouped by 2026, 2025 and 2024. Show clear dates and Japanese article titles, with summaries only for the newest two entries. Use almost-white paper, charcoal text, very light gray rules and one subdued blue-black accent on links and the current-year dot. One readable Japanese sans-serif family, careful line height, elegant modest scale, abundant but practical whitespace. No images, no icons, no cards, no pills, no shadows, no gradients, no animation cues, no oversized hero, no metrics, no bento layout, no “Projects / Skills / Contact” portfolio template. Avoid becoming empty minimalism: show enough real article rows and useful navigation to feel like an actively used blog. Make the quality come from typography, alignment, focus states and spacing, fully achievable with semantic HTML and a small amount of CSS.
```

## 実装時の注意

生成画像は、方向の差を一枚で説明するため実画面より強調されることがある。実装では次を優先する。

1. 実際の日本語をブラウザで組む
2. 320pxから広い画面までの流れを確認する
3. 画像にしか存在しない飾りを安易に再現しない
4. WCAGのコントラスト、フォーカス、拡大要件を満たす
5. 現在の37件を入れて密度を再評価する
