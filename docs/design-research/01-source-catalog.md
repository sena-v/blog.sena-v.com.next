# 調査ソース一覧

調査日: 2026-08-02

## 分類

- **一次**: 仕様、公式ドキュメント、本人の解説、本人の公開リポジトリ
- **実例**: 実在する個人サイト。画面と情報設計を観察する資料
- **論考**: デザイン実務者や専門媒体による分析。規格ではなく判断材料
- **商用**: 自社製品の販売を含む記事。共通パターンの把握だけに使い、主張は割り引いて読む

第三者サイトは完成画面を丸ごと模写しない。複数サイトから、時間軸、文字組み、密度、動き、自己紹介の置き方を別々に抽出する。

## 実在サイトと実装方法

### S01. Maggie Appleton

- 種別: 実例 / 一次
- 画面: [maggieappleton.com](https://maggieappleton.com/)
- ソース: [MaggieAppleton/maggieappleton.com-V3](https://github.com/MaggieAppleton/maggieappleton.com-V3)
- 実装: Astro、MDX、型付きコレクション、CSS Masonry、Tippy.js、Webmentions。画像はAstroのPictureまたはCloudinary、動画はCloudflare R2。
- 観察: `Essays`、`Notes`、`Patterns` を完成度や性質で分ける。制作実績を並べず、思考と関心のネットワークを本人紹介にしている。
- 採用できる点: 記事の種類を説明する短い言葉、未完成なノートも許す設計、Aboutより内容を先に見せる姿勢。
- 注意: イラストとコンテンツ分類が本人固有なので、そのまま借りない。READMEでも作者自身が丸ごとのフォークを勧めていない。

### S02. Max Böck

- 種別: 実例 / 一次
- 画面: [mxb.dev](https://mxb.dev/)、[Writing](https://mxb.dev/blog/)
- ソース: [maxboeck/mxb](https://github.com/maxboeck/mxb)
- 実装: Eleventy。公開リポジトリにはVite、Workbox、Webmention用処理もある。
- 観察: 記事一覧は番号、日付、分類が中心で、トップも短い自己紹介と記事から始まる。テーマ切替は機能ではなく遊びとして本人らしさを加えている。
- 採用できる点: 長い運用履歴を隠さない、本文と索引の密度、1つだけ強い遊びを持つ。
- 注意: 多数のテーマ切替を今回の初回実装へ入れる必要はない。

### S03. Anthony Fu

- 種別: 実例 / 一次
- 画面: [antfu.me](https://antfu.me/)、[Posts](https://antfu.me/posts)
- ソース: [antfu/antfu.me](https://github.com/antfu/antfu.me)
- 実装: 公開リポジトリからVite、UnoCSS、TypeScriptベースであることを確認できる。
- 観察: ホームは文章中心で、仕事、OSS、写真、道具が一人の生活として連続する。記事一覧は年ごとのまとまりと日付が主役。
- 採用できる点: 年単位の見出し、題名と日付の高密度な一覧、複数の関心を無理に「プロジェクト」へ変換しないこと。

### S04. Tania Rascia

- 種別: 実例 / 一次
- 画面: [tania.dev](https://tania.dev/)、[About](https://tania.dev/me/)
- ソース: [taniarascia/taniarascia.com](https://github.com/taniarascia/taniarascia.com)
- 実装: Gatsby、React、Node.js。本人用のコードで、テンプレートとして作ったものではないと明記されている。
- 観察: `Blog`、`Notes`、`Projects` を同じホームへ並べるが、最初に出るのは本人の言葉と最近の記事。`Everything on this site is written by me, not AI.` の一文も、抽象的な品質アピールではなく運営方針として機能している。
- 採用できる点: 技術記事と個人メモの違いを短く説明すること、本人の生活を一文だけ混ぜること、Projectsを主役にしないこと。

### S05. Paco Coursey

- 種別: 実例
- 画面: [paco.me](https://paco.me/)
- 実装: 今回は公開ソースを確認できていない。サイト内のプロジェクトリンクからNext.js関連の制作物は確認できるが、サイト自体の技術と混同しない。
- 観察: `Building`、`Projects`、`Writing`、`Now` を短い文章とリンクだけで構成する。大きなカードや経歴年表を使わず、選び取った言葉が人柄を作る。
- 採用できる点: Aboutの短文化、`Now` の導入、余白と文章だけで差を作る方法。

### S06. Rauno Freiberg

- 種別: 実例
- 画面: [raunofreiberg.com](https://raunofreiberg.com/)
- 補助資料: [A1 Galleryの紹介](https://www.a1.gallery/website/rauno-freiberg)
- 実装: 補助資料ではNext.js、JetBrains Monoとされる。本人の公開ソースとしては未確認。
- 観察: `Make it fast / beautiful / consistent / carefully / timeless / soulful` という短い原則と、少数のリンクで職能を表す。動きと細部は強いが、情報量自体は少ない。
- 採用できる点: デザインの受入基準を短い言葉で持つこと、動きは数ではなく質で判断すること。
- 注意: ブログ主役の今回に、全面的な実験UIは過剰。

### S07. Emil Kowalski

- 種別: 実例 / 一次
- 画面: [emilkowal.ski](https://emilkowal.ski/)
- 記事: [You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)、[Train Your Judgement](https://emilkowal.ski/ui/train-your-judgement)
- 実装: サイト全体の公開ソースは今回確認できていない。記事中のデモではCSS Transform、Web Animations API、Motionなどを目的に応じて使い分けている。
- 観察: 本文内の小さな比較デモ自体がポートフォリオになる。本人は、頻繁に使う操作やキーボード操作へ不要なアニメーションを付けないよう勧めている。
- 採用できる点: 動きを入れる前に目的と閲覧頻度を問うこと。記事に必要なときだけ小さなデモを作ること。

### S08. Josh W. Comeau

- 種別: 実例 / 一次
- 画面: [joshwcomeau.com](https://www.joshwcomeau.com/)
- 実装解説: [How I Built My Blog 2024 “App Router” Edition](https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/)
- デザイン方針: [Contact / FAQ](https://www.joshwcomeau.com/contact/)
- 実装: Next.js App Router、React、MDX、Linaria、Shiki、Sandpack、React Spring、Framer Motionなど。本人はテンプレートやUIフレームワークを使わず、サイトを一から設計したと説明する。
- 観察: 遊びやインタラクションは多いが、すべて記事理解または本人の語り口に紐づく。技術を増やすこと自体が目的ではない。
- 採用できる点: カスタムのコード表示、記事に必要なインタラクティブ例、長く育てる前提。
- 注意: 10万行を超える特殊なブログであり、同じ複雑さを目標にしない。

### S09. Ahmad Shadeed

- 種別: 実例
- 画面: [ishadeed.com](https://ishadeed.com/)
- 実装: 今回はサイト全体の公開ソースを確認できていない。
- 観察: 大きな日本語雑誌にも応用できる強い見出し、図版、記事、仕事、教材が一つの編集面へ統合されている。記事カードだけに頼らず、セクションごとの見せ方を変える。
- 採用できる点: 見出しをデザインの中心にすること、代表記事だけ図版を使うこと、CSSレイアウト自体を作品にすること。

### S10. Sara Soueidan

- 種別: 実例 / 一次
- 画面: [sarasoueidan.com](https://www.sarasoueidan.com/)、[Blog archive](https://www.sarasoueidan.com/blog/archive/)
- 実装記事: [Global and Component Style Settings with CSS Variables](https://www.sarasoueidan.com/blog/style-settings-with-css-variables/)
- 観察: アクセシビリティという職能は、バッジやスキル一覧より記事、言葉、実装記事の蓄積から伝わる。記事一覧の公開日と更新日も明確。
- 採用できる点: 専門性をコンテンツで証明すること、公開日と更新日を明確に分けること、リンク文を具体的にすること。

### S11. Zach Leatherman

- 種別: 実例 / 一次
- 画面: [zachleat.com](https://www.zachleat.com/)、[About](https://www.zachleat.com/about/)
- 実装: Eleventy。フッターにビルド時刻、バージョン、スタイルガイド、編集リンクなどがある。
- 観察: 2007年からのサイト履歴や過去のロゴを隠さず、サイト史として公開する。現在の技術と古い個人Webの文化が同居する。
- 採用できる点: 古さを欠点ではなく履歴にすること、最終更新や編集経路を見せること、軽い遊びをAboutに置くこと。

### S12. Andy Bell

- 種別: 実例 / 一次
- 画面: [bell.bz](https://bell.bz/)、[Blog](https://bell.bz/blog/)
- 実装: 2026年の再構築ではAstro、HTML、CSS、Web Components、デザイントークンを利用。
- 観察: ホームは写真、短い紹介、記事・投稿・音楽へのリンクで成り立つ。「小さなインターネット上の家」という位置づけが明確。
- 採用できる点: ポートフォリオより自分の場所として設計すること、低忠実度のHTML版から段階的に磨くこと。

### S13. Kentaro Koga

- 種別: 実例
- 画面: [taroken.dev](https://www.taroken.dev/)
- 実装: 今回は公開ソースを確認できていない。
- 観察: Project、Photo、Blog、Whimが同じ人の活動として共存する。括弧付きの見出し、絵文字、写真などの癖があるため、一覧が多くてもテンプレートに見えにくい。
- 採用できる点: 仕事以外の小さな関心を一つ混ぜること、写真を使うなら本人の撮影物へ限定すること。

### S14. Natsu Ozawa

- 種別: 実例
- 画面: [natsuozawa.com](https://natsuozawa.com/)
- 実装: 今回は公開ソースを確認できていない。
- 観察: BlogとPortfolioを分けて持ちながら、長文の問題意識が本人紹介を兼ねる。自己評価の形容詞より考えているテーマを前に出す。
- 採用できる点: 技術領域の羅列ではなく問題意識をAboutへ置くこと。

### S15. Una Kravets

- 種別: 実例
- 画面: [una.github.io](https://una.github.io/)、[About](https://una.github.io/about/)
- 実装: GitHub Pages上の個人ブログ。今回の調査では現在のソース構成を深掘りしていない。
- 観察: CSS、デザイン、イラスト、ポッドキャストなどを一つの語り口へまとめる。絵文字や自作図が本人性を作る。
- 採用できる点: 本人が実際に作った図や小物だけを使うこと。

### S16. Creative Bloqの2026年ポートフォリオ事例集

- 種別: 論考 / 事例集
- 記事: [15 brilliant design portfolio examples, and why they work](https://www.creativebloq.com/portfolios/examples-712368)
- 観察: 2026年の選定理由は、派手さ単独より、明快さ、文章による文脈、本人らしさ、情報を過負荷にしないことへ集約されている。
- 採用できる点: 最初の数秒で役割を理解できること、背景説明を読めるが強制しないこと。

## 個人サイトの設計プロセス

### P01. Personal website redesign: The start

- 種別: 一次
- 記事: [The start](https://piccalil.li/projects/personal-site/1/)
- 要点: 一気に完成させず、粗い版から周期的に磨く。自分が保守したいと思えるサイトを目指す。
- 今回への適用: 5案から選んだ後も、ワイヤー、基本UI、表現の追加を別コミットにする。

### P02. Personal website redesign: Base-level planning

- 種別: 一次
- 記事: [Base-level planning](https://piccalil.li/projects/personal-site/2)
- 要点: 先に痛点と成功条件を列挙し、思いついた機能をその基準へ照らす。将来の再設計をテーマCSSの変更中心にできる構造を目標にする。
- 今回への適用: 「ブログらしい」「年表を残す」「AIテンプレートに見えない」を受入基準へ固定する。

### P03. Personal website redesign: Wrapping up the planning

- 種別: 一次
- 記事: [Wrapping up the planning](https://piccalil.li/projects/personal-site/3/)
- 要点: 既存ページ監査、データとURLの地図、内容の優先順位、HTMLシェル、UIデザイン、仕上げの順で進む。優先順位ワイヤーは見た目の発想に使わない。
- 今回への適用: 方向選択後、色やフォントより先にトップと記事の縦方向の順番を決める。

### P04. Personal website redesign: HTML-only build

- 種別: 一次
- 記事: [Getting started with the HTML only build](https://piccalil.li/projects/personal-site/4/)
- 要点: 一時的な見た目でも、セマンティックなHTMLとグローバルスタイルの基礎は使い続けられるようにする。
- 今回への適用: タイムラインをCSSだけで成立させ、検索やタグがなくても記事へ到達できるHTMLにする。

### P05. Building an Effective Dev Portfolio

- 種別: 一次 / 論考
- 記事: [Josh W. Comeau](https://www.joshwcomeau.com/effective-portfolio/)
- 要点: 見栄えだけでなく、誰が見るか、何を短時間で判断するか、制作物の文脈をどう伝えるかを先に考える。
- 今回への適用: 専用の作品カードを増やさず、Aboutと代表記事で採用側が知りたい文脈へ到達させる。

### P06. IndieWeb principles

- 種別: コミュニティ一次資料
- 記事: [IndieWeb principles](https://indieweb.org/principles)、[Use what you make](https://indieweb.org/use_what_you_make)
- 要点: 自分のドメイン、内容、メタデータを持つ。人間向けを先にし、自分でも使い、作る過程を共有する。
- 今回への適用: 外部記事を自サイトの時間軸へリンク統合し、ブログ自体を日常的に使う。

## 可読性、アクセシビリティ、性能

### G01. WCAG 2.2

- 種別: 一次
- 資料: [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/)、[What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- 適用: 通常文字4.5:1以上、拡大時の破綻防止、見えるフォーカス、見出しとラベル、24 CSS px相当以上のターゲットまたは十分な間隔を基準にする。

### G02. Reduced Motion

- 種別: 一次
- 資料: [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- 適用: 年表の出現演出、ページ遷移、ホバー移動はなくても理解できるようにし、設定時は非本質的な動きを止める。

### G03. Container Queries

- 種別: 一次
- 資料: [MDN: Getting started with CSS container queries](https://developer.mozilla.org/en-US/blog/getting-started-with-css-container-queries/)
- 適用: 記事行、注記、関連記事を置かれた幅で変形できるようにする。画面幅だけに依存した分岐を減らす。

### G04. Text wrapping

- 種別: 一次
- 資料: [MDN text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap)
- 適用: 短い見出しには `text-wrap: balance`、長文には原則通常の折返しを使う。`pretty` は性能との比較後に限定する。

### G05. Core Web Vitals

- 種別: 一次
- 資料: [How the Core Web Vitals thresholds were defined](https://web.dev/articles/defining-core-web-vitals-thresholds)
- 適用: 75パーセンタイルでLCP 2.5秒以下、INP 200ms以下、CLS 0.1以下を公開後の目標にする。

### G06. CLS

- 種別: 一次
- 資料: [Optimize Cumulative Layout Shift](https://web.dev/articles/optimize-cls)
- 適用: 画像寸法を予約し、フォント差し替えと後挿入コンテンツで記事位置を動かさない。

### G07. Web font performance

- 種別: 一次
- 資料: [Best practices for fonts](https://web.dev/articles/font-best-practices)、[Next.js Font Module](https://nextjs.org/docs/pages/api-reference/components/font)
- 適用: 日本語本文はまずシステムフォントで試す。Webフォントを入れる場合は1ファミリー、必要ウェイト、WOFF2、自己ホスト、実測を基本にする。

### G08. Japanese typography

- 種別: 一次
- 資料: [デジタル庁デザインシステム: タイポグラフィ](https://design.digital.go.jp/dads/foundations/typography/)、[Science Tokyo: タイポグラフィ](https://design-system.isct.ac.jp/ja/website/style-guide/design-tokens/typography)
- 適用: 書体だけで意味を伝えない。日本語は字間、行間、ウェイトをセットで検証し、見出しだけ `palt` の効果を比較する。

### G09. Line length

- 種別: 専門資料
- 資料: [Butterick’s Practical Typography: Line length](https://practicaltypography.com/line-length.html)
- 適用: 欧文の目安45〜90字を参考にしつつ、日本語本文は実機でおよそ32〜40字/行から比較する。現行の720px固定をそのまま正解にしない。

### G10. Type scale and vertical rhythm

- 種別: 一次 / 実務資料
- 資料: [GOV.UK Type scale](https://design-system.service.gov.uk/styles/type-scale/)
- 適用: 相対単位で拡大でき、行高と余白の段階が揃う小さなタイプスケールを作る。

### G11. Fluid type and spacing

- 種別: 実務資料
- 資料: [Utopia: Fluid responsive typography](https://utopia.fyi/blog/utopian-typography-is-easy/)、[Designing a Utopian layout grid](https://utopia.fyi/blog/designing-a-utopian-layout-grid/)
- 適用: `clamp()` で本文、見出し、余白を連動させる。ブレークポイントごとの微調整値を増やしすぎない。

### G12. Intrinsic layout

- 種別: 実務資料
- 資料: [Every Layout](https://every-layout.dev/layouts/)
- 適用: Stack、Cluster、Sidebar、Switcherに相当する少数のレイアウトプリミティブで画面を組む。

### G13. CSS architecture

- 種別: 実務資料
- 資料: [CUBE CSS](https://cube.fyi/)、[Composition](https://cube.fyi/composition)
- 適用: Composition、Utility、Block、Exceptionの考え方を参考に、カード固有CSSよりページ全体の流れとトークンを先に定義する。

### G14. Next.js production practices

- 種別: 一次
- 資料: [Production checklist](https://nextjs.org/docs/app/guides/production-checklist)、[Image Optimization](https://nextjs.org/docs/app/getting-started/images)、[Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- 適用: 静的レンダリング、`next/image`、Font Module、Metadata API、第三者スクリプトの遅延を維持する。

### G15. Scannability

- 種別: 研究ベースの実務資料
- 資料: [NN/g: F-Shaped Pattern of Reading on the Web](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)、[Be Succinct](https://www.nngroup.com/articles/be-succinct-writing-for-the-web/)
- 適用: 見出しの最初へ情報語を置き、日付、掲載元、題名の順序を一定にする。長い説明を読まなくても一覧を走査できるようにする。

### G16. Visual hierarchy and minimalism

- 種別: 研究ベースの実務資料
- 資料: [NN/g Visual Design Principles](https://media.nngroup.com/media/articles/attachments/Principles_Visual_Design-Letter.pdf)、[Why Zen Mode Isn’t the Answer to Everything](https://www.nngroup.com/articles/zen-mode/)
- 適用: 大きさの段階を増やしすぎず、重要度を揃える。ミニマルにするために検索やナビゲーションを隠さない。

## AIテンプレート感と同質化

この章の資料は規格ではない。2026年時点で、どのような表現が「AI生成の既定値」と認識され始めているかを見るための論考である。

### A01. The generic style of AI web design

- 種別: 論考
- 記事: [Kyle Chayka Industries](https://kylechayka.substack.com/p/the-generic-style-of-ai-web-design)
- 観察: ベージュ、錆色、大きなセリフ、字間を広げた副見出し、角丸アウトライン、ネオンなど、個々には妥当な選択も反復で記号化する。
- 今回への適用: 現行のベージュと緑を捨てるだけでは解決しない。色より先に、ヒーロー、数値、カードの定型を崩す。

### A02. Everything looks the same. Now what?

- 種別: 論考
- 記事: [Creative Bloq](https://www.creativebloq.com/ai/everything-looks-the-same-now-what)
- 観察: AI以前から業界別の安全な既定値へ収束していた。記事は、Webギャラリーだけでなく本、映画、建築、物質文化から参照を取ること、AIの出力を完成品にしないことを勧める。
- 今回への適用: 書籍の索引、技術同人誌、ノート、古い個人サイトもムードボードの対象にする。

### A03. Anti-AI Crafting

- 種別: 論考 / トレンド資料
- 記事: [Texture, warmth and tactile rebellion](https://www.creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026)
- 観察: 過度に滑らかな生成物への反動として、手作業の痕跡、写真、紙、インク、物理素材が注目されている。
- 今回への適用: 永続的な装飾へ生成画像を置くのではなく、本人が撮った机、ノート、機材、作った図を必要な場所だけに使う。

### A04. Why AI-generated websites look the same

- 種別: 商用記事
- 記事: [Shuffle](https://shuffle.dev/blog/2026/01/why-do-most-ai-generated-websites-look-the-same/)
- 観察: 曖昧な「clean, modern」だけでは、最頻のレイアウト、書体、色へ収束する。先に画面順、密度、除外事項、目的を決める必要がある。
- 今回への適用: 実装前にこの資料で各案の禁止事項まで固定する。

### A05. AI Design Slop

- 種別: 商用記事
- 記事: [SmoothUI](https://smoothui.dev/blog/ai-design-slop)
- 観察: 紫系グラデーション、ガラス面、同寸カード、すべてのホバーにバウンスなどが反復される。生成、批評、修正、再評価の反復を推奨する。
- 今回への適用: 実装後にスクリーンショットを見て、最大の違和感を一つずつ直す。ルールを書いただけで終わらせない。

## 調査から除外した使い方

- ギャラリーの上位サイトをそのまま「2026年らしさ」とみなすこと
- ソース不明のサイトについて、HTMLの痕跡だけでフレームワークを断定すること
- ポートフォリオ向けテンプレートをフォークし、色と文章だけ変えること
- 第三者のイラストや画面をリポジトリへ再配布すること
- デザイン案の比較前にUIライブラリやアニメーションライブラリを決めること
