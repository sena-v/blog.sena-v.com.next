# 実在サイト調査

## 調査方法

2026-08-02時点の各サイト、本人のColophon・制作記事、公開リポジトリを優先して確認した。第三者ギャラリーは探索の入口にだけ使い、技術スタックは本人または公開ソースで確認できた場合だけ記載する。画面は模写せず、情報設計と制作判断を分解して使う。

## 1. 読むことを主役にするサイト

### 01. [Frank Chimero](https://frankchimero.com/)

- 観点: トップを長い自己紹介にせず、仕事・本・作品・About・記事アーカイブへの短いディレクトリとして成立させる。
- 借りるもの: 少数リンクの編集、短いラベル、余白の強弱。
- 借りないもの: 英語の短いタイトルを前提にした極端な省略。
- 技術: 今回の一次資料では未確認。見た目からスタックを推測しない。

### 02. [Jason Santa Maria](https://jasonsantamaria.com/)

- 観点: 読書、書体、本人紹介、作品が同じ編集トーンでつながる。過去版も保存し、変化自体を履歴にしている。
- 公開確認: Kirby、Dreamhost。Roslindale、HEX Franklin、VCTR Monoを使用しているとフッターで明記。
- 借りるもの: 表示書体・本文書体・等幅書体の役割分担、過去版を消さない態度。

### 03. [Robin Sloan](https://www.robinsloan.com/) / [Colophon](https://www.robinsloan.com/colophon/)

- 観点: 書籍のような文字組みに、少し癖のある見出し書体を混ぜる。文章の人格が視覚言語と一致している。
- 公開確認: Ruby製のMiddleman。Filosofia、Trade Gothic Next、Kyrios、Vollkornを用途別に使用。
- 借りるもの: 画面全体を派手にせず、一箇所の書体選択で本人性を作る。

### 04. [Elliot Jay Stocks](https://elliotjaystocks.com/) / [制作記事](https://elliotjaystocks.com/blog/a-redesign-at-last)

- 観点: 本、ブログ、音楽、仕事を雑多なカードにせず、出版物のような階層で同居させる。
- 公開確認: Kirby、PHP、CSS Grid、Sass。現在もフッターでKirbyを明記。
- 借りるもの: セリフ体とサンセリフ体の明快な役割、セクションごとの密度差。

### 05. [Steph Ango](https://stephango.com/) / [About](https://stephango.com/about)

- 観点: 最新1件、トピック、全記事という単純な順番。装飾より色・罫線・字間を詰める。
- 公開確認: Obsidianの平文をJekyllで生成し、Netlifyで配信。本人制作のFlexoki配色。
- 借りるもの: 読むためのインク色、素朴な一覧、記事ファイル中心の運用。

### 06. [Manuel Moreale](https://manuelmoreale.com/)

- 観点: 個人の声を前面に置いた静かな日誌。更新頻度や生活の断片がデザインの一部になる。
- 公開確認: 本人の公開説明ではKirbyを使用。
- 借りるもの: サイト説明を営業文句にせず、普通の一人称で書く。

## 2. 密度とアーカイブを設計するサイト

### 07. [kottke.org](https://kottke.org/)

- 観点: リンク、短文、長文、画像が長い一つのフィードに混在する。高密度でも、投稿単位の区切りと書き手の調子で読める。
- 借りるもの: 外部記事と自サイト記事を別コンポーネントに隔離しすぎない考え方。
- 注意: 現状の更新量が大きく違うため、密度そのものは持ち込まない。

### 08. [Simon Willison’s Weblog](https://simonwillison.net/)

- 観点: Entries、Links、Quotes、Notes、Guidesを同一サイトに持ち、検索とタグで大量の蓄積を横断する。
- 借りるもの: 記事種別の差を、カードの色ではなくラベルと本文量で示す。
- 注意: 技術ニュースの更新量を前提にした密度は再現しない。

### 09. [Adactio](https://adactio.com/)

- 観点: Journal、Links、Articles、Notesを数千件単位で持ちながら、HTMLの見出しとリンクを中心に保つ。
- 借りるもの: 長寿ブログの履歴を「古さ」ではなく強みにする構造、普通のWebリンク。

### 10. [Jim Nielsen](https://www.jim-nielsen.com/) / [公開ブログソース](https://github.com/jimniels/blog)

- 観点: Blogging、Link Blogging、アイコン収集、制作物、経歴を「I’m …」という本人の言葉で束ねる。
- 公開確認: ブログのリポジトリが公開され、投稿・スクリプト・srcを分離している。
- 借りるもの: ポートフォリオ項目をProjectsカードにせず、継続中の行為として見せる。

### 11. [Aresluna / Marcin Wichary](https://aresluna.org/)

- 観点: キーボード、技術史、写真、書体などを大きな話題棚で整理する。量は多いが、本人の関心が先に見える。
- 借りるもの: 「何を書いたか」より「何を追いかけているか」で分類する話題索引。

### 12. [Laurel Schwulst](https://laurelschwulst.com/home/) / [制作記録](https://laurelschwulst.com/e/laurelschwulst/)

- 観点: writing、websites、worlds、teachingなど、異なる活動を相互接続された索引として扱う。
- 公開確認: Eleventy、暖かいオフホワイト`#FFFFF2`。
- 借りるもの: 固定の作品集ではなく、増え続ける世界としてサイトを設計する発想。

## 3. 画像と物質感を使うサイト

### 13. [Craig Mod](https://craigmod.com/)

- 観点: 写真、歩行、書籍、長文が出版活動としてつながる。写真は背景装飾ではなく、文章と同格の一次コンテンツ。
- 借りるもの: 本人が撮った画像だけを強く扱い、本文と無関係なストック画像を置かない。

### 14. [Paul Stamatiou](https://paulstamatiou.com/) / [About](https://paulstamatiou.com/about)

- 観点: 写真セット、長文、制作物を高密度に見せる一方、サイト制作そのものを継続的な個人プロジェクトとして公開する。
- 公開確認: Next.js、Vercel、CloudFront、Framer Motion、Tailwind CSS、一部を変更したshadcn、MDX。フォントは手動subset。
- 借りるもの: 写真を使うなら配信・クロップ・記事内コンポーネントまで一体で設計する姿勢。
- 注意: 今回のブログには機能量が過剰。技術スタックをそのまま増やさない。

### 15. [Austin Kleon](https://austinkleon.com/)

- 観点: 写真、スキャン、引用、短文を日々の制作机のように混ぜる。素材の不揃いさが本人性になる。
- 借りるもの: 本人のメモ、図、撮影物を記事の自然な一部にする。
- 注意: 手書き風フォントや偽スキャンで表面だけ再現しない。

### 16. [Ohara Daijiro / 大原大次郎](https://oharadaijiro.com/)

- 観点: タイポグラフィ、紙、線、影、立体が作品一覧の物質感を作る。
- 借りるもの: 写真を矩形カードのサムネイルに閉じ込めず、余白と配置で一つの物体として扱う。

## 4. グラフィックと遊びを前面に出すサイト

### 17. [Maggie Appleton](https://maggieappleton.com/) / [Colophon](https://maggieappleton.com/colophon)

- 観点: Essays、Notes、Patterns、Libraryを、挿絵と成長段階を持つデジタルガーデンとして整理する。
- 公開確認: Astro、MDX、HTML/CSS/JavaScript、Vercel、Motion。Canela Display/TextとLato、Utopiaのfluid type scale。
- 借りるもの: 図や注釈を記事内容の一部として設計すること。記事種別に意味を持たせること。

### 18. [Lynn Fisher](https://lynnandtonic.com/) / [公開ソース](https://github.com/lynnandtonic/lynnandtonic.com)

- 観点: 定期的なサイト刷新、CSS造形、レスポンシブそのものを表現へ使う。
- 公開確認: リポジトリにPug、Stylus、JavaScript、過去版CSSを保存。
- 借りるもの: 小さな遊びを一つだけ自作し、サイトの更新履歴として残す。
- 注意: 年ごとの全面刷新は保守コストが高いため、季節要素など限定範囲で試す。

### 19. [Takuya Matsuyama / craftz.dog](https://www.craftz.dog/) / [公開ソース](https://github.com/craftzdog/craftzdog-homepage)

- 観点: 開発者プロフィールに3Dの犬、イラスト、制作物を混ぜ、記憶に残る一つの象徴を持つ。
- 公開確認: Next.js、Chakra UI、Three.js、Framer Motion。
- 借りるもの: 既製の抽象図ではなく、本人固有のモチーフを一つ持つ考え方。
- 注意: ブログには3Dと依存関係が過剰。CSSまたは軽い静止画で十分かを先に問う。

### 20. [Shunsuke Kudo / 工藤俊祐](https://shunsukekudo.com/)

- 観点: 動画とタイポグラフィを大きく使い、個々の作品を説明カードではなく画面構成として見せる。
- 借りるもの: 日本語とラテン文字のスケール差、非対称なクロップ。
- 技術: 今回の一次資料では未確認。

### 21. [SHONEN-B](https://www.koji-ka.com/)

- 観点: システム表示、連番、レール、線画を統一した「Future Archive」。強いアートディレクションの例。
- 借りるもの: 連番や状態ラベルを使うなら、全体の概念と文章まで統一すること。
- 注意: `STATUS/ACTIVE`のような英語UIはこのブログではAIテンプレート感につながりやすい。

### 22. [SANOGRAPHIX](https://sanographix.github.io/)

- 観点: プロジェクトとブログを分けつつ、作者のグラフィック感を共通させる。日本語個人Webの実務的な例。
- 借りるもの: 作品入口をホームへ置きすぎず、ブログと制作物の導線を短くする。

## 5. 小さな個人Webとして成立するサイト

### 23. [Andy Bell](https://bell.bz/) / [制作記事](https://bell.bz/i-hooked-up-eleventy-to-wordpress-api/)

- 観点: 「little home on the web」として、仕事、教育、音楽、ブログを本人の文章で接続する。
- 公開確認: 現行制作記事ではEleventy、WordPress REST API、通常のCSSセットアップを説明。
- 借りるもの: ツールより執筆しやすさを優先する判断、自然な一人称。

### 24. [Paco Coursey](https://paco.me/)

- 観点: Building、Projects、Writing、Nowを短い文章と通常リンクで構成する。少ない要素でも細部で精度を出す。
- 借りるもの: 代表的な制作物を大きなポートフォリオ欄にせず、文章の流れへ収める。

## 横断して得た判断

1. デザイナーらしさは、特殊なフレームワークより、内容の分類、書体の役割、素材の出所に表れる。
2. 公開スタックはJekyll、Eleventy、Kirby、Astro、Next.jsとばらばらで、特定技術が見た目を決めていない。
3. 強いサイトほど、本人の写真、挿絵、書体、収集物、語り口のどれかが中核にある。
4. ブログとポートフォリオを両立する実例は、Projectsカードより、記事・制作物・現在の関心を同じ言葉で編集している。
5. Next.jsのままでも20方向は実現可能。増やすべきなのは依存関係ではなく、CSS Grid、タイポグラフィ、画像のart direction、少量のMDX表現である。
