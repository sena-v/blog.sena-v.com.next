# 一次資料と実装原則

## 編集と一次資料

### The Morgan Library & Museum — Peter Hujar's Contact Sheets

- [Record-Keeping and Ephemeral Proof](https://www.themorgan.org/blog/peter-hujars-contact-sheets-record-keeping-and-ephemeral-proof)
- [Peter Hujar's Rough Drafts](https://www.themorgan.org/blog/peter-hujars-rough-drafts)

コンタクトシートは完成写真の縮小一覧ではなく、最初の確認、記録、選択、クロップのための作業物だった。油性鉛筆の印や欠けたフレームが、写真家の判断を残している。今回の連番や注記は、この「判断の痕跡」をWeb上で再現するために使い、フィルム風の装飾を模倣するためには使わない。

### Magnum Photos — Making the Image

- [Elliott Erwitt: Mother and Child](https://www.magnumphotos.com/theory-and-practice/contact-sheet-mother-child-elliott-erwitt-portrait/)

連続するフレームから、時間の進み方と最終構図へ近づく過程を読めるという説明を参照した。ホームで複数写真を使う場合も、似た写真を敷き詰めるのではなく、順序に意味を持たせる。

## 個人サイトの実例

### Paul Stamatiou

- [About / site colophon](https://paulstamatiou.com/about)
- [Timeline](https://paulstamatiou.com/timeline)

本人撮影の写真を内容として扱い、写真セット用の表示も自作している。既製のギャラリーテーマを当てるのではなく、素材に必要な表示を実装する姿勢を参照する。

### Austin Kleon

- [austinkleon.com](https://austinkleon.com/)

本、ノート、制作途中の断片が日々の記事と同じ場所に現れる。完成した代表作だけで自己紹介せず、観察と制作を継続して公開する点を参照する。

### Maggie Appleton

- [Colophon](https://maggieappleton.com/colophon)

AstroとMDXを土台に、内容固有の図やコンポーネントを足している。全記事へ同じサムネイル形式を要求せず、必要な記事だけ個別に見せ方を変える判断を参照する。

### Craig Mod

- [craigmod.com](https://craigmod.com/)

写真、長文、ニュースレター、書籍を同じ著者の活動として扱う。写真を背景装飾へ退かせず、文章と同じ重さを持つ記録として配置する。

### Jason Santa Maria

- [jasonsantamaria.com](https://jasonsantamaria.com/)

過去版を残しつつ、記事単位のアートディレクションを行ってきた個人サイト。サイト全体を毎回作り替えず、特定の記事や特集だけ表示を変える選択肢のモデルにする。

### Aresluna / Ohara Daijiro

- [Aresluna](https://aresluna.org/)
- [Ohara Daijiro](https://oharadaijiro.com/)

アーカイブを一覧として整理する精度と、制作物の画像・文字組み自体を内容にする姿勢を参照する。借り物の「手仕事感」ではなく、本人の制作物から画面の個性を作る。

## 画像実装の基準

### Next.js Image

- [Image Optimization](https://nextjs.org/docs/app/getting-started/images)
- [Production checklist](https://nextjs.org/docs/app/guides/production-checklist)

静的importで寸法を確定し、`next/image`の`srcset`、モダン形式、lazy-load、レイアウトシフト防止を利用する。ファーストビューの一枚だけを優先し、画面外の小画像を先読みしない。

### Responsive images

- [web.dev: Responsive images](https://web.dev/articles/responsive-images)
- [web.dev: Serve responsive images](https://web.dev/articles/serve-responsive-images)

デスクトップ用の大画像をモバイルへそのまま送らない。単なる縮小で主題が失われる場合は`picture`によるアートディレクション、そうでなければ同じ画像の適切な幅を配信する。

### W3C image component

- [W3C Design System: Image](https://design-system.w3.org/components/image.html)

意味を持つ画像には文脈に合うaltを付け、装飾画像は空altにする。figcaptionはaltの代替ではなく補足として使う。文字情報は画像へ焼き込まずHTMLに置く。

## 本人素材を使う前のチェック

1. 写真、ノート、画面の権利を本人が持っているか確認する。
2. EXIFの位置情報、端末名、撮影時刻を公開用ファイルから除く。
3. 住所、移動経路、勤務先の内部情報、APIキー、通知、個人名をトリミングまたはマスクする。
4. 外部記事は全文画像を複製せず、掲載先、題名、初出日、リンク、短い自分の紹介をHTMLで持つ。
5. 元ファイルはGitへ入れず、公開用に縮小・圧縮した派生物だけを管理する。
6. モックアップの仮画像を、本番で本人素材に差し替えないまま公開しない。
