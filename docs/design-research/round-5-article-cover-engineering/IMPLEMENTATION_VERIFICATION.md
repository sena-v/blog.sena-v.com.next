# Article cover implementation verification

検証日: 2026-08-03
対象branch: `feature/blog-reboot-2026`
対象URL: `http://127.0.0.1:3000/` (`next build` + `next start`)

## 仕様チェック

- desktopは実記事DOMを同一比率の端末shell内へ表示し、portraitを初期値にする。
- portraitは1619×886 viewportで約617.88×1289.05px、本文17px、端末上端61pxとし、上側64%をviewport内へ表示する。下側36%はstage外へ続け、左右railを各285px残しながら本文幅約485.81px（約28字/行）を確保する。
- desktop readerは外側documentをviewport高へ固定し、footerを非表示にする。記事本文と各索引だけが独立してscrollする。
- landscapeは同じmeshを回転し、uniform scale `1.2369924` で1120×536.84375相当にする。
- portrait/landscapeのlayout長辺・短辺比はともに `2.08623`、E2E許容誤差は0.001未満。端末は静止時に正面・左右対称へ戻り、fine pointer操作中だけshell全体が最大X 2.4° / Y 3.8°で傾く。
- landscapeからの「縦表示へ切り替える」操作を常時表示する。
- 端末方向はpresentation上の一時状態として扱い、reload・再訪・別記事では必ずportraitから開始する。themeだけを継続設定として保存し、landscapeを既定表示にしない。
- CSSとWebGLは短辺比3.2%の均一bezelを使い、内側radiusを外側radiusからbezel幅だけ引いて同心にする。1619×886 viewportではportrait bezelが上下左右約19.77px、landscapeが約17.17px。graphite rim、端末自身のshadow、中央対称の弱いaccent lightにより黒背景上でもbezelを識別できる。offsetした背面layerは置かない。
- bezelの基準色は操作前後で同じCSS material layerが持ち、lazy WebGLは上から16%の弱いscreen blendで光沢だけを追加する。CSS fallbackからWebGLへ切り替わっても基準gradientは変えず、縦横往復後もcomputed backgroundと実画像が一致する。pointer位置はReact renderを介さずCSS custom propertyへ渡し、neutral highlightをbezel上で左右・上下に追従させる。
- 端末内側に白borderを置かず、WebGL screenは照明を反射しない黒材質にする。縦横切替中はlive DOMとCSS rimを`visibility:hidden`でも遮断し、外装の反射も白ではなくgraphiteに抑えてinset・角丸の変形途中を見せない。
- 回転中のWebGL外装は、実canvas viewport・現在角度・uniform scaleから毎frameのbounding boxを求めてfitさせる。中間角度でもmeshを矩形clipせず、一度縮小してから横向きへ拡大する。
- 上記のfitで小さくなる回転中はWebGL layer自体を`visibility:hidden`にし、rose glowと細いarcへ置き換える。小さい端末や黒いWebGL面が背景で回る状態を見せない。
- portraitは見出しとArchiveを左285px railへ統合し、中央device、右285px索引の対称3列にする。portrait索引本文は14px以上、landscapeは1.25:1:1の3索引とし、列間を44px以下にする。1280×720のlandscape readerでも本文・概要を13px以上、目次を11px以上にする。
- landscapeはheader下16pxから開始し、上端の窮屈さを避けつつ索引下端もviewport内へ収める。
- orientation controlは64px gutter内の36px controlにし、bezel・右索引の双方から14pxを確保する。focus/hover時はSVGの約22°のpink arcから約1600msで349°までlinearに円周を描き、横長tooltipや瞬時の全周pink化を行わない。
- light readerはwarm white、ink、muted、linkを個別token化し、背景とのcontrast ratioを本文17.23:1、補助文字6.97:1、link 6.88:1にする。theme toggleは44×24pxの2列grid、18px knob、中央揃えSVG iconにし、portrait/landscapeとlight/darkの全状態でknobとicon中心の誤差を0.01px未満にする。drawerも同じtokenを継承し、light theme中だけdrawerがdarkへ戻らないようにする。
- Archiveの月選択はURL遷移せず、その場で記事linkを展開する。件数は月と同じ1行へ表示する。portraitでは画面高に応じて320〜580pxを使用し、関連記事用の短い高さ上限を共有しない。月内の記事はseparatorで区切り、外部記事は矢印だけでなく「外部サイト」ラベルと外部link iconを併記する。
- index headingは静的な`↕`をやめ、motion付き`SCROLL` cueを表示する。thumbは30pxの白い太線円と、鼻先・前後差のある耳・背中・胸・後脚・尾が連続して読める赤pinkの右向きrabbit outlineを使用し、44pxの操作領域を確保する。内部は中抜きで、目・口・頬は描かない。
- smartphone幅では端末shellを外し、同じArticleReaderを直接表示する。WebGL/canvasは読み込まない。
- desktopのdrawerは`show()`を使って端末screen内だけを覆う左側sheetにし、portrait/landscapeともhamburgerと同じ左方向から表示する。close buttonはdrawer左上の44px targetとし、hamburgerとの横中心差を16px未満にする。3本線hamburgerへpointer/focusが入った瞬間の端末transformを固定し、開閉によるheader方向への位置ずれを防ぐ。外側は`overflow:clip`、focus復帰は`preventScroll`を使い、Escape・見出し移動後のfocusを維持する。theme変更は常時見えるheaderに一元化し、drawer内の重複controlは置かない。端末内wordmarkのdotはpink、theme iconはactive SVG自体を18px knob内部のgrid中央へ置き、座標補正に依存しない。実smartphone drawerも左側全高sheet、カード型navigation、番号付き目次、関連記事を持つ。
- reader wordmarkは17px以上、44pxの操作領域を持つbuttonとする。wordmarkまたはheader空白面から、desktopでは端末内reader、smartphoneではdocumentを先頭へ戻す。menu・theme操作では誤発火せず、reduced motionではsmooth scrollを使わない。
- Writingsのtag絞り込みはpopoverで複数選択・AND検索を行い、選択中tagの個別解除・一括解除、query/archive条件の維持を行う。
- Writings heroは総数を`記事数 36`と明記し、裸の数字だけを表示しない。
- Aboutは「書いていること」と外部・記事一覧linkへ絞り、説明的な方針sectionを置かない。global headerはwordmarkとは別に`ホーム`を明示し、390px幅でも3リンクを横overflowさせない。
- 外側左railは主見出しをeyebrowの1.6倍以上にし、`SENA-V.COM / READING DESK`へ18pxのpink ruleを付ける。主題と文脈labelを同じ強さにせず、意図的なhierarchyとして見せる。
- desktop判定はclient navigation後もmatch結果を共有し、関連記事・人気記事・Archiveの内部link遷移でSP用readerを一度描画してからdesktopへ戻すflashを発生させない。遷移中のDOM mutationをE2Eで監視し、SP用DOM 0件とtheme維持を検証する。
- hard reloadでは初期HTML内のmobile readerをdesktopへ一瞬表示しない。headの早期`js` markerとCSS media queryで同寸法の軽量bootstrap shellを選び、client chunkを遮断した状態でも端末・左右rail・記事見出しを安定表示する。JavaScript無効時は元のsemanticなresponsive readerを残し、mobile hydration後はbootstrap DOMを除去する。
- リライト前の記事はfrontmatterの`draft`で管理し、一覧・トップ・関連記事・人気記事・Archive・RSS・sitemap・静的生成URLから同じcontent層で除外する。source fileは保持し、公開時にfrontmatterを戻せるようにする。
- WebGLはdesktopのhover/focus/回転操作まで遅延し、CSS shellと記事DOMを先に表示する。
- 未読込状態からの回転操作はWebGL canvasの準備完了まで現在表示を保ち、準備後に回転する。DOMとrimの復帰は固定timerではなく、shellのwidth・height両方の`transitionend`後も最終aspect比への到達を描画frameごとに確認してから行う。低速描画でも中間形状へ枠を戻さない。
- R3F 9.7.0が内部利用する`THREE.Clock`と整合するThree.js r182を固定し、r183以降の非推奨warningを避ける。
- WebGL不能時もCSS shellへfallbackし、記事本文を失わない。
- `prefers-reduced-motion`ではpointer tiltを無効化し、keyboard scroll、focus restoration、見出しfocusを実装する。
- GA4 Data APIのcredentialとPVはserver外へ出さず、12時間cacheと静的fallbackを持つ。
- ローカル記事画像は実寸・responsive `srcset`・lazy loadingを持つ。
- Markdown見出しIDはremark AST変換で決定し、SSRとhydrationの二重描画でも連番がずれないようにする。

## 自動検証

| 検証 | 結果 |
| --- | --- |
| ESLint | pass、warning 0 |
| TypeScript | pass |
| Unit tests | 12 / 12 pass |
| Internal content/link validation | Markdown source 37件（公開36件）、slug 37件、external URL 51件を検証 |
| Production build | pass、77 pages |
| Playwright E2E | 20 / 20 pass（hard reload初期HTMLを含む。目次focusは並列10回反復もpass） |
| npm dependency audit | 0 vulnerabilities |
| `git diff --check` | pass |
| In-app browser console | error / warning 0（WebGL起動後を含む） |

E2Eには端末比率、縦64%表示、縦横切替、reload時のportrait復帰とtheme保持、WebGL準備待ち、操作前後・縦横往復後のbezel基準色、pointer追従highlight、回転中のDOM/rim非表示、pointer左右追従とleave時のspring-back、外側scroll固定、左右285px rail、見出し比率1.6倍以上と18px eyebrow rule、orientation controlの両側gutterと1600ms SVG円周animation、均一bezel、light theme contrast・toggle中心・drawer配色、3本線hamburger・左上44px close・drawer内theme control 0件・17px以上のpink-dot wordmark・headerからのscroll-to-top・knob内icon中心0px、return control、索引文字サイズ、1280×720 landscape本文サイズ、30px rabbit outlineと44px hit area、Writingsの複数tag AND検索・個別解除・記事数表記、Writings/Aboutの初見密度、About方針section不在、global `ホーム`導線と390px header収まり、Archive専用高さ・2019.12の4行separator・外部サイト表記、3種の内部遷移中SP flash不在、draftのsitemap除外、端末screen内drawerと開閉前後0.5px未満の位置固定、Tab focus trap・Escape・見出しfocus、reduced motion時のtilt無効化、WebGL fallback、smartphoneでのcanvas不在・横overflow不在、responsive画像、redirect、SEO metadata、security headers、privacy/analytics条件を含む。

## 受け入れ条件対応表

| 仕様の受け入れ条件 | 証拠 | 結果 |
| --- | --- | --- |
| 同一mesh・外装比率誤差0.001以内 | portrait / landscapeのcomputed ratioをE2E計測 | pass |
| landscapeはuniform scale `1.2369924` | DOM属性、R3F groupの単一`setScalar`、E2E | pass |
| portrait → landscape → portrait | 両方向button操作と状態維持E2E | pass |
| 回転buttonは右側に1個、到達先を表示 | button count、`aria-label`、実座標をE2E計測 | pass |
| theme toggleを縦横で維持 | 切替・回転・reload後の属性をE2E確認 | pass |
| portraitの左右索引 / landscapeの3索引 | DOM件数、実JPEG、scroll領域を確認 | pass |
| next row・mask・rail・rabbit thumb | native scroll、mask、keyboard、ARIA scrollbar、SVG styleをE2E確認 | pass |
| rabbitは視認可能な白外円・pink横向き座り姿 | 30px、44px hit area、2.3px ring、1.4px以上の中抜きoutline、顔パーツなしをE2E確認 | pass |
| neon roseでpurple / orangeに寄せない | design tokenとJPEGを目視確認 | pass |
| hamburger・目次・keyboard・reduced motion | drawer focus復帰、見出しfocus、短いcrossfadeをE2E確認 | pass |
| smartphoneは外装なしで同じreader | 390×844でdesktop/canvas 0、mobile reader 1 | pass |
| PV・GA credentialをclientへ出さない | server-only module、secret scan、公開payload review | pass |
| WebGL / GA4障害時も閲覧可能 | CSS fallback E2E、静的新着fallback unit test | pass |
| screenshot・操作・fallback test | In-app Browser実操作、Playwright 20 / 20 | pass |

## Lighthouse 13.4.1

最終production buildをmobile標準設定とdesktop presetで再計測した結果。

| Profile | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 97 | 100 | 100 | 100 | 0.91s | 2.66s | 23ms | 0 | 286KB |
| Desktop | 100 | 100 | 100 | 100 | 0.25s | 0.76s | 0ms | 0 | 350KB |

desktopでWebGLを初期loadしていた中間版はPerformance 69 / TBT 1,201ms / 626KBだった。操作時lazy loadとhard reload用のCSS bootstrapを統合した最終版はPerformance 100 / TBT 0ms、mobileはPerformance 97 / TBT 23msとなった。mobileはR3F/Three.js chunkを要求しない。フィールド値は本番公開後にCrUXまたはVercel Speed Insightsで継続監視する。

## Visual QA

In-app Browserと独立Chromiumで1619×886、1280×720、390×844を実操作した。1619×886の100%相当表示でportrait shellは617.88×1289.05px、本文17px、端末上端61px、viewport内の可視比率64.00%、左右railは各285px、orientation controlとの間隔は端末・右railの双方14px、bezelは上下左右19.77px、横overflowは0pxだった。1280×720ではportrait shell493.56px、landscape shell998.40×478.56px、landscape本文13.48pxを維持した。本文を最下端へ手操作すると最終要素は可視下端より52.31px上に収まり、外側scrollTopは0のままだった。

WebGLはhover後にcanvas 1件・readyとなり、pointer位置に応じてtiltとbezel highlightが追従した。portrait→landscape→portrait後もreturn control、基準gradient、均一bezelを維持し、操作後のIn-app Browser consoleはerror / warning 0だった。SPではcanvas 0件、drawerはviewport左端、横overflow 0pxをE2Eで確認した。desktop drawerはportrait/landscapeとも端末screen内で、closeはleading側44px target、Tab focus trap・Escape・見出しfocus・閉じた後の正面復帰を確認した。外部事例と採用判断は`PORTRAIT_DEVICE_RESEARCH.md`へ記録した。

## セキュリティ・privacyレビュー

- CSP、HSTS、`X-Content-Type-Options`、`Referrer-Policy`、`Permissions-Policy`、COOP/CORP、frame拒否headerをproduction responseで検証した。
- 外部記事frontmatterのURLはabsolute HTTP(S)だけを受理し、外部linkは `noopener noreferrer` と新規tab表記を持つ。
- GA4とSpeed InsightsはVercel production以外では自動読込しない。
- GA4 service account secretは環境変数のみで扱い、client payloadはslugとfallback/GA4 sourceだけを受け取る。
- credential形式のsecret scanでは `.env.example` の説明用placeholder以外を検出していない。
- Markdown内のHTMLを直接実行せず、画像pathも既知のlocal assetだけを最適化対象にする。

## 残る運用確認

- GA4 service accountをproductionへ設定後、権限・property ID・12時間cacheの実データ疎通を確認する。
- 実ユーザーのLCP/INPは本番field dataで監視する。localhostのsynthetic testだけではfield CWVを保証しない。
