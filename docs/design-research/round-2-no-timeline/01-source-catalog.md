# 第2回の調査ソース

調査日: 2026-08-02

## 調査の見方

第2回は「モダンな見た目」を一式で借りず、次の四点を別々に観察した。

- ホームに何件見せ、何を別ページへ逃がしているか
- 本人性を画像、文章、色、余白のどこで出しているか
- ブログと仕事の情報を同居させるか、分けるか
- 公開されている場合、どの程度の技術で実現しているか

公開ソースを確認できないサイトの技術は推測しない。

## 静かな個人ブログと本人性

### S01. Steph Ango

- 画面: [stephango.com](https://stephango.com/)、[About](https://stephango.com/about)
- 本人説明の実装情報: プレーンテキストをObsidianで編集し、Jekyllで生成、Netlifyへ公開。配色は本人制作の[Flexoki](https://stephango.com/flexoki)。テンプレートは非公開。
- 観察: About、Now、Writing、Projects、Recipesを短い名詞で分ける。ホームが経歴説明で埋まらず、色と語彙が本人性を担う。
- 今回への抽出: 入口を4つ以内にする、本人制作の配色を一つの署名にする。

### S02. Manuel Moreale

- 画面: [manuelmoreale.com](https://manuelmoreale.com/)、[About](https://manuelmoreale.com/about)
- 本人説明の実装情報: Kirby、Hetzner VPS、Iowan書体。
- 設計記事: [On Websites](https://manuelmoreale.com/thoughts/on-websites)
- 観察: ブログに必要なのは内容への短い経路だと考え、現在月の記事だけを既定表示する。自己紹介は飾らず、本人の口調と生活の写真が残る。
- 今回への抽出: ホームの件数を期間で制限し、過去はアーカイブへ送る。

### S03. Frank Chimero

- 画面: [frankchimero.com](https://frankchimero.com/)、[Post Archive](https://frankchimero.com/blog/)
- 設計記事: [Everything Easy is Hard Again](https://frankchimero.com/blog/2018/everything-easy/)
- 観察: 直接的な写真・挿絵・一文を選び、複雑なUIで個性を証明しない。アーカイブは題名と日付だけでも成立する。
- 今回への抽出: ホームの一つの強い要素と、静かな保管庫を分ける。

### S04. Craig Mod

- 画面: [craigmod.com](https://craigmod.com/)、[About](https://craigmod.com/about/)
- 観察: 作家、写真家、歩く人という複数の面を、実際の写真・本・長い本人文でつなぐ。UI装飾ではなく作品自体が視覚要素になる。
- 今回への抽出: 写真を使うなら本人の活動と不可分な一枚に限定する。

### S05. Lee Robinson

- 画面: [leerob.com/index](https://leerob.com/index)、[Bio](https://leerob.com/bio)
- 公開テンプレート: [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog)
- 実装: 公開テンプレートはNext.js、MDX、Tailwind CSS、TypeScript。現在の本人サイトと完全に同一とは断定しない。
- 観察: 自己紹介、代表的な文章、Writing/Codeへのリンクを一段落でつなぐ。ホームですべての投稿を見せない。
- 今回への抽出: 代表記事を少数選び、プロフィール文の中から自然にリンクする。

### S06. Pedro Duarte

- 画面: [ped.ro](https://ped.ro/)
- 観察: 長い一つの自己紹介文の語句をリンクに変える。カードや節見出しに分けず、読む行為そのものをナビゲーションにする。
- 今回への抽出: 「文章地図」案。ただし日本語ではリンク密度を下げる。

### S07. Jim Nielsen

- 画面: [jim-nielsen.com](https://www.jim-nielsen.com/)、[Blog](https://blog.jim-nielsen.com/)
- ソース: [jimniels/blog](https://github.com/jimniels/blog)
- 設計記事: [Feat: New Style](https://blog.jim-nielsen.com/2021/feat-new-style/)、[My Failed Personal Site Redesign](https://blog.jim-nielsen.com/2024/my-failed-peronsal-site-redesign/)
- 観察: ホーム、ブログ、ノートを別々に進化させる。ブログでは装飾を減らし、ナビゲーションをホームだけに置く実験もしている。失敗案も公開して判断理由を残す。
- 今回への抽出: 本文画面をホームよりさらに静かにする。モバイルを後回しにしない。

### S08. Julia Evans

- 画面: [jvns.ca](https://jvns.ca/)
- 実装記事: [Some notes on upgrading Hugo](https://jvns.ca/blog/2024/10/07/some-notes-on-upgrading-hugo/)
- 観察: 最新10件とカテゴリを分ける。本人制作の技術Zineがポートフォリオとして自然に機能する。
- 今回への抽出: 日付ではなく題材から入れる「話題の棚」。最新件数には上限を設ける。

### S09. Derek Sivers

- 画面: [sive.rs](https://sive.rs/)
- 観察: 本人紹介、Now、記事、書籍、プロジェクトを通常の見出しとリンクで置く。2026年時点で本人執筆・非AIであることも一文で示す。
- 今回への抽出: ほぼブラウザ標準の見た目でも、本人の具体的な言葉があれば固有になる。

### S10. Jeremy Keith

- 画面: [adactio.com](https://adactio.com/)
- 観察: Journal、Links、Articles、Notesを投稿形式で分け、長く運用している。最新の短い投稿がそのままホームになる。
- 今回への抽出: 完成記事だけでなく外部リンクや短文を持つ余地。ただし初回は分類を増やさない。

### S11. Heydon Pickering

- 画面: [heydonworks.com](https://heydonworks.com/)
- 観察: 本人の肖像、サイトが「しないこと」、少数の入口だけで強く記憶に残る。
- 今回への抽出: 機能や価値を足す代わりに、運営方針を一つだけ明言する。

### S12. Lynn Fisher

- 画面: [lynnandtonic.com](https://lynnandtonic.com/)
- 観察: 名前、職能、番号付きの少数リンク、バージョン番号だけで表紙を作る。レスポンシブ幅そのものを表現に使うことで知られる。
- 今回への抽出: ホームを索引表紙まで圧縮できる。ただしブログへの入口を最優先にする。

### S13. Elliot Jay Stocks

- 画面: [elliotjaystocks.com](https://elliotjaystocks.com/)
- 実装: フッターでKirbyとホスティングを明記。
- 観察: 書籍、ニュースレター、Podcast、ブログ、音楽を本人の文章と実物画像でつなぐ。
- 今回への抽出: 一枚の画像を置くなら、本人が実際に作った物や撮った物にする。

### S14. Marcin Wichary

- 画面: [aresluna.org](https://aresluna.org/)
- 観察: 多数の活動を、カードではなく題材別の文章リンクとして整理する。技術史、キーボード、タイポグラフィなど、分類語自体が人物像になる。
- 今回への抽出: 題材の棚。ただし37件規模ではホームに全棚を展開しない。

## ブログとポートフォリオの境界

### S15. Delba de Oliveira

- 画面: [delba.dev](https://delba.dev/)
- 観察: WorkとPersonalを文章で分け、担当したことを具体的に書く。装飾やスキルロゴより役割が先。
- 今回への抽出: Aboutで仕事と個人活動を明示的に分ける場合の参考。ホームには移植しない。

### S16. Maggie Appleton

- 画面: [maggieappleton.com](https://maggieappleton.com/)
- ソース: [MaggieAppleton/maggieappleton.com-V3](https://github.com/MaggieAppleton/maggieappleton.com-V3)
- 実装: Astro、MDX、型付きコレクション、Webmentionsなど。
- 観察: Essays、Notes、Patternsを時間ではなく性質で分ける。本人の図と文章が活動説明になる。
- 今回への抽出: 題材または成熟度による入口。ただし独自分類は記事が増えてから。

### S17. Tania Rascia

- 画面: [tania.dev](https://tania.dev/)、[About](https://tania.dev/me/)
- ソース: [taniarascia/taniarascia.com](https://github.com/taniarascia/taniarascia.com)
- 観察: 記事、Notes、Projectsを持つが、本人の言葉と最近の内容を先に見せる。
- 今回への抽出: Projectsを消すことではなく、ブログより前に出さない優先順位。

### S18. Andy Bell

- 画面: [bell.bz](https://bell.bz/)
- 設計過程: [Personal website redesign](https://piccalil.li/projects/personal-site/1/)
- 実装: 2026年版はAstro、HTML、CSS、Web Components、デザイントークン。
- 観察: 先にHTMLの粗い版を公開し、UIと表現を段階的に磨く。
- 今回への抽出: 10案を画像から一案に決め切らず、上位2案をlocalhostのHTMLで比較する。

## 文字・索引・強い一要素

### S19. Frank Chimero Design Archive

- 画面: [design.frankchimero.com](https://design.frankchimero.com/)
- 観察: 年、種類、案件名を細い文字で揃え、作品を大量のカードへ入れない。
- 今回への抽出: Swiss Index案の列と余白。ブログ本文には同じ密度を持ち込まない。

### S20. Anthony Fu

- 画面: [antfu.me](https://antfu.me/)
- ソース: [antfu/antfu.me](https://github.com/antfu/antfu.me)
- 実装: Vite、UnoCSS、TypeScript。
- 観察: 仕事、OSS、写真、文章を別サイトに分断せず、一人の関心として置く。
- 今回への抽出: Aboutで仕事外の関心を一つ置く。

### S21. Rauno Freiberg

- 画面: [raunofreiberg.com](https://raunofreiberg.com/)
- 観察: 少ない言葉と精密な動きで職能を示す。
- 今回への抽出: Swiss Poster案の緊張感。ただし動きを主役にせず、静止状態を完成させる。

### S22. Emil Kowalski

- 画面: [emilkowal.ski](https://emilkowal.ski/)
- 記事: [You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)
- 観察: 動きを使わない判断自体もデザイン品質になる。
- 今回への抽出: ホームの登場演出、スクロール出現、ホバー浮上を全案で不要とする。

### S23. Josh W. Comeau

- 画面: [joshwcomeau.com](https://www.joshwcomeau.com/)
- 実装解説: [How I Built My Blog](https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/)
- 観察: 複雑な表現は記事理解に必要な場所だけに置く。サイト全体は特殊な大規模事例なので、技術量は模倣しない。
- 今回への抽出: 特別な記事だけをアートディレクションし、通常記事を巻き込まない。

### S24. Ahmad Shadeed

- 画面: [ishadeed.com](https://ishadeed.com/)
- 観察: 大見出しと図解を使うが、記事の題材に結び付いている。
- 今回への抽出: Cover Story案で最新1件だけ見出しを大きくする。

### S25. Max Böck

- 画面: [mxb.dev](https://mxb.dev/)
- ソース: [maxboeck/mxb](https://github.com/maxboeck/mxb)
- 実装: Eleventy。公開リポジトリにVite、Workbox、Webmention処理もある。
- 観察: 長期運用と本人の遊びを共存させる。
- 今回への抽出: 表現を足すならサイト全体へ薄く広げず、一つだけ選ぶ。

## ごちゃつきを減らすための設計資料

### G01. Content-first design

- [A List Apart: Content-First Design](https://alistapart.com/blog/post/content-first-design/)
- [Smashing Magazine: Content First — Design Last](https://www.smashingmagazine.com/2015/02/design-last/)
- 適用: ダミーのカードではなく、現在の長い日本語題名を入れてから画面を決める。

### G02. Accessible typography and linear reading

- [web.dev: Accessible typography](https://web.dev/learn/accessibility/typography)
- [web.dev: Typography](https://web.dev/learn/design/typography/)
- 適用: 複雑な多段組を避け、日本語は40字/行以下を出発点にする。本文は左揃え、相対単位、十分な行間を使う。

### G03. Cognitive load

- [Smashing Magazine: Reducing Cognitive Overload](https://www.smashingmagazine.com/2016/09/reducing-cognitive-overload-for-a-better-user-experience/)
- 適用: 同じ画面で画像、色、種類の違う文字、アイコン、メタデータを競わせない。重複情報を消す。

### G04. Fluid typography

- [web.dev: Responsive and fluid typography with Baseline CSS features](https://web.dev/articles/baseline-in-action-fluid-type)
- 適用: 2025年末時点のBaseline機能を使い、画面幅だけでなくユーザーの文字サイズを尊重する。

### G05. Accessibility

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- 適用: フォーカス、コントラスト、拡大、操作対象、動きの抑制をデザイン仕様に含める。

### G06. Performance

- [web.dev: Font best practices](https://web.dev/articles/font-best-practices)
- [web.dev: Optimize CLS](https://web.dev/articles/optimize-cls)
- [Next.js Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)
- 適用: 写真案も初期表示1点、寸法予約。日本語Webフォントは見出し1ウェイトまでを候補とし、必須にしない。

## 意図的に採用しない参考

- Awwwards上位の3D・全面Canvas・カスタムカーソル
- SaaSランディングページ向けのBento Grid
- AIサイトビルダーのポートフォリオテンプレート
- 全記事へ自動生成するカバー画像
- 見た目だけの偽ターミナル
- 本人と関係のない紙・インク・手書き風素材
