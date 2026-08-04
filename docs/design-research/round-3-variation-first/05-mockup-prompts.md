# モックアップ生成条件とプロンプト

## 生成方法

- モード: Codex組み込みの画像生成
- 用途分類: `ui-mockup`
- 意図: 新規生成
- 出力: PNG、1536 × 1024、20案 + 一覧1枚
- 参照画像: なし
- 第三者サイトのスクリーンショット入力: なし

各画像は一案につき一回の独立した生成として作成した。実在サイト名をプロンプトへ入れず、調査から抽出した情報設計だけを、このブログ向けのオリジナル構図へ変換した。

## 全案の共通指定

```text
Use case: ui-mockup
Asset type: high-fidelity desktop homepage mockup
Create an original homepage for the Japanese personal technology blog "sena-v.".
Blog first, portfolio second.
Style/medium: realistic shippable website UI, no browser chrome.
Composition/framing: 1536x1024 desktop canvas.
Constraints: original composition; practical readable Japanese hierarchy; no timeline; no year groups; no portfolio metrics; no generic AI illustration; no watermark.
```

各案ではこの共通指定に、以下の構図、色、文字、禁止事項を加えた。画像内で共通して使用した記事データは次の通り。

```text
"sena-v."
"技術について試したことと、あとで読み返したいことを書いています。"
"数年止まったNext.jsブログを、履歴を残して再構築した"
"使用したことのないパッケージマネージャーを比較してみた"
"JavaScriptバージョンを全部見返してみる"
"すべての記事"
"このブログについて"
"Qiita"
"RSS"
```

## 01. 本の余白

```text
Primary request: "Book Margin". Contemporary Japanese essay collection.
Composition: a narrow 760px reading column slightly left of center, slim marginalia column on the right, latest article with a short introduction, three quiet article links.
Color: warm off-white paper, near-black ink, restrained dark vermilion.
Typography: Japanese Mincho for titles and prose, neutral sans-serif for date and navigation.
Avoid: photos, cards, gradients, glow, glassmorphism.
```

## 02. 新聞机

```text
Primary request: "Newspaper Desk". Contemporary independent newspaper edited by one person.
Composition: masthead and dateline, asymmetric three-column grid, one lead article and two narrower columns for short posts and one external article, fine rules and baseline rhythm.
Color: newsprint ivory, carbon black, muted cobalt.
Typography: Japanese editorial Mincho lead, condensed sans-serif metadata.
Avoid: boxed cards, bento dashboard, equal article lengths, gradients, glow.
```

## 03. 一冊の表紙

```text
Primary request: "Single Cover". Cover and contents page of one carefully edited book.
Composition: one enormous Japanese latest-article title with deliberate line breaks, tiny date at outer edge, restrained bottom contents list, no photo.
Color: pale cool gray, black, dark green underline.
Typography: expressive bold Japanese gothic, tiny sans-serif navigation.
Avoid: cards, stock imagery, gradients, glow.
```

## 04. 脚注ジャーナル

```text
Primary request: "Marginalia Journal". Latest article begins on the home page; concise notes, dates and links sit in a scholarly margin.
Composition: prose column with two paragraphs, narrow right margin with three annotations and short rules, one small technical sketch.
Color: creamy paper, charcoal, muted navy, pencil gray.
Typography: Japanese Mincho prose, monospaced annotation, sans-serif navigation.
Avoid: floating cards, dashboard, decorative scribble, gradients.
```

## 05. 編集索引

```text
Primary request: "Editorial Index". Museum collection catalog, not spreadsheet.
Composition: large title and introduction, eight rows aligned by date, long title, type and topic, fine horizontal rules, search and plain sort links.
Color: white, near-black, muted ultramarine.
Typography: grotesk sans-serif and monospaced metadata.
Text also includes: "記事を探す", "新しい順", "よく読まれている順", "外部記事".
Avoid: admin-table appearance, cards, colored pills, gradients.
```

## 06. 関心の星座

```text
Primary request: "Topic Constellation". Organize by three personal interests rather than chronology, without a literal network diagram.
Composition: three asymmetrically placed text clusters at intentionally different scales; each has two underlined article links; latest article at upper left; spatial distance suggests relationships.
Color: soft white, black, deep teal, tiny muted orange.
Typography: expressive Japanese gothic topic headings, calm sans-serif links.
Text also includes: "Webの基礎", "作業環境", "振り返り", "最新の記事".
Avoid: connection lines, circles, bubbles, cards, pills, gradient.
```

## 07. 書棚

```text
Primary request: "Library Shelves". Three vertical editorial shelves without literal books or furniture.
Composition: slim introduction, three tall unequal columns divided by rules, large vertical topic labels, two horizontal article titles per column, latest strip above.
Color: warm white, charcoal, oxblood.
Typography: Japanese Mincho topic labels and sans-serif article text.
Avoid: book illustrations, equal three-card layout, shadows, gradients.
```

## 08. 検索から始める

```text
Primary request: "Search First". Searching 37 accumulated articles is the visual start while still showing an active personal blog.
Composition: one large central search field, site sentence above, three recent articles below, three plain topic shortcuts to one side.
Color: cool white, ink black, restrained electric blue focus.
Typography: Japanese sans-serif, condensed search text, monospaced dates.
Text also includes: "記事を探す", "タイトルや本文から検索", "最近の記事".
Avoid: command palette modal, app dashboard, cards, tag pills, glow.
```

## 09. 一枚の写真

```text
Primary request: refined "Photo Anchor". Calm split layout with commissioned editorial art direction. Photo is a placeholder for a future user-owned photo.
Scene: candid lived-in worktable near a window in Japan, keyboard, worn notebook, cable, half-finished tea, imperfect daylight, no person.
Composition: irregular 55% photo field, right text panel with site name, two sentences, exactly three underlined article links.
Color: photograph supplies warmth; off-white and black interface.
Typography: understated Japanese sans-serif, one small serif accent.
Avoid: stock-photo polish, cards, gradients, artificial futuristic objects.
```

## 10. コンタクトシート

```text
Primary request: "Contact Sheet". Multiple photos are a personal visual index, not a portfolio gallery. Photos are placeholders for user-owned photos.
Scene: nine documentary photographs of everyday developer life in Japan: keyboard, street, notebook, train window, cable, café table, monitor, book spine, rainy pavement.
Composition: right two-thirds is a tight 3x3 contact sheet; left third has title, intro and three article links; tiny index numbers and captions.
Color: charcoal, warm neutral photos, off-white text, red proof marks.
Typography: monospaced captions, neutral Japanese sans-serif titles.
Avoid: cards, polaroids, fake tape, gradients, glow.
```

## 11. 机上のノート

```text
Primary request: "Working Notes". Human writing process shown through real-looking paper artifacts; placeholders for user-owned scans.
Scene: two notebook pages with rough Japanese diagrams and one printed code review sheet; used but clean; no scrapbook props.
Composition: three fragments asymmetrically center-left with typed annotations; recent articles and intro on right; annotations remain outside scans.
Color: white, graphite, faded blue pen, one red correction.
Typography: neutral Japanese sans-serif and monospaced annotations.
Text also includes: "書く前のメモ", "最近の記事".
Avoid: fake tape, drop-shadow cards, decorative collage, abstract AI art.
```

## 12. ビジュアルエッセイ

```text
Primary request: "Visual Essay". One recent technical essay becomes a magazine feature with article-specific diagram.
Subject: restrained diagram of an old Next.js blog moving through maintenance stages into a clean current site, simple blocks and arrows.
Composition: large feature title and intro left, wide diagram below or beside it, narrow contents column on far right.
Color: warm gray, black, moss green, orange diagram accents.
Typography: bold Japanese gothic title, Mincho intro, monospaced diagram labels.
Avoid: decorative hero abstraction, cards, navigation timeline, gradients, glow.
```

## 13. 日本語ポスター

```text
Primary request: "Japanese Poster". Japanese article titles are the graphic material, like a commissioned contemporary cultural poster.
Composition: three long titles occupy asymmetric areas at radically different scales; deliberate line breaks; dates at edges; compact navigation; one flat rectangle may crop behind text.
Color: ivory, black, vivid vermilion on about 15% of canvas.
Typography: composed bold Japanese gothic and small sans-serif metadata.
Avoid: photos, cards, English all-caps labels, gradients, shadows, glow.
```

## 14. 書体標本

```text
Primary request: "Type Specimen". Article titles become systematic specimen rows while remaining practical links.
Composition: five full-width rows; each title has intentional weight and size; dates and topics share a baseline; small navigation.
Color: white, rich black, one acid-yellow rule and dark-blue link state.
Typography: type-foundry specimen precision; variable grotesk for English/numbers and coordinated Japanese gothic.
Text also includes: "記事の標本".
Avoid: decorative lettering, warped text, cards, photos, gradients, glow.
```

## 15. モノクロZINE

```text
Primary request: "Monochrome Zine". Self-published, energetic and human-edited while readable.
Subject: one small high-contrast crop of a keyboard cable and notebook corner.
Composition: unequal alternating black and white fields; one huge title, narrow note column, external article line and small image interrupt the grid.
Color: black, warm white, one fluorescent-orange registration mark.
Typography: bold Japanese gothic and small monospaced metadata.
Text also includes: "最新の記事", "短いメモ", "外部で書いた記事".
Avoid: cards, fake ripped paper, stickers, gradients, glow.
```

## 16. 色面編集

```text
Primary request: "Color Field Editorial". Unequal flat-color areas organize topics without resembling bento cards.
Composition: newest article in white top strip; below, three strongly unequal interlocking fields for Webの基礎, 作業環境, 振り返り; no rounded gaps.
Color: chalk white, forest green, dusty salmon, pale butter yellow, accessible black text.
Typography: Japanese neo-grotesk and restrained Mincho site name.
Avoid: equal three-column features, pills, cards, gradients, glass, shadows.
```

## 17. 素のWeb

```text
Primary request: "Native Web". Celebrate plain HTML and default conventions with meticulous spacing.
Composition: left-aligned 780px document, heading, two-sentence intro, bulleted list of five articles, ordinary footer links, one horizontal rule.
Color: pale warm gray, black, accessible classic blue links, one purple visited link.
Typography: Japanese system sans-serif and monospaced dates.
Avoid: cards, photos, icons, badges, gradients, glow.
```

## 18. 小さな遊び場

```text
Primary request: "One Handmade Detail". Calm blog with exactly one memorable motif recreatable in CSS or tiny SVG.
Subject: one flat line-art mechanical keyboard keycap made of simple geometry, revealing a tiny "書く" label; no mascot, no 3D.
Composition: article list on left half; negative space on right contains the motif.
Color: warm cream, brown-black, muted mint, small coral.
Typography: friendly mature Japanese sans-serif and compact mono metadata.
Avoid: generic 3D blob, emoji, cards, gradients, glow.
```

## 19. 編集デスク

```text
Primary request: "Editorial Desk". Three concurrent streams—full articles, short notes, external writing—without imitating app windows.
Composition: three unequal vertical panes separated only by thin rules; 2–3 entries each; small masthead; no independent scrollbars or title bars.
Color: fog gray, ink black, muted cobalt, pale peach.
Typography: Japanese sans-serif titles, monospaced notes, restrained Mincho publication names.
Text also includes: "記事", "短いメモ", "外部で書いた記事".
Avoid: app dashboard, cards, status badges, gradients, glow.
```

## 20. 季節号

```text
Primary request: "Seasonal Edition". Stable quiet blog with one quarterly cover color, one user-owned seasonal photo placeholder, and one short current note.
Scene: small candid summer photograph of iced tea next to a notebook in window light.
Composition: pale-blue edition field across top with "2026 夏", off-center photo and one-line note; stable white article list below.
Color: pale blue, white, black, small tomato red.
Typography: elegant Japanese sans-serif and modest Mincho edition label.
Text also includes: "最近はブログを少しずつ直しています。", "最近の記事".
Avoid: campaign landing page, cards, stock-scene polish, gradients, glow.
```

## 実装時の注意

- 生成画像内の日本語は、構図確認用であり、そのまま画像として公開しない。
- 写真、スキャン、図版は仮素材。採用案に応じて本人素材またはHTML/CSSの図へ置き換える。
- 文字組みはブラウザーで実際の日本語題名を入れ、改行、行間、フォントフォールバックを確認する。
- 生成画像をCSSで精密に模写するのではなく、情報の順番、面積比、余白、役割だけを実装へ移す。
