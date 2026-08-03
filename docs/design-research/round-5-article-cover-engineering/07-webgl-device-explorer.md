# WebGL記事ビューア 30案

## この方向の意味

スマートフォンを実績を誇示するモックアップではなく、記事を選び、カバーと冒頭を試し読みするためのビューアとして使う。端末の外側には通常のDOMで記事題名、日付、タグを残す。端末を回せない環境でもブログとして成立し、WebGLは閲覧を補助する一層に留める。

端末はApple製品の再現ではない。ロゴ、Dynamic Island、Homeボタン、固有のセンサーや側面ボタンを持たない、角のある薄い汎用ディスプレイとして扱う。

## A. 端末中心 — 画面を大きく見せる

### 01. Upright Reader

- 中央に高さ60%の正面端末。左に最新5件、右に選択記事の要約。
- 画面内の記事が読め、一覧も消えない基準案。

### 02. Right Crop Reader

- 右端から高さ85%の端末を半分だけ見せ、左65%を記事索引にする。
- 大きな実画面と高い一覧性を両立する。

### 03. Low Stage Reader

- 端末を画面下から40%だけ出し、上部へ横長の記事カバーを並べる。
- 端末を主役にしつつ、写真ブログに見えにくい。

### 04. Tilted Technical Reader

- 端末を12度だけ傾け、背面にワイヤーフレームを一枚重ねる。
- pointerで正面へ戻る動きを想定する。

### 05. Landscape Code Reader

- 横向き汎用端末にコード記事を表示し、下に通常記事6件を置く。
- 横長画面が支配しないよう占有率は45%に抑える。

### 06. Close Screen, Small Body

- 画面内容を大きくし、端末枠は細く、外形は上下を画面外へ切る。
- 「スマホ広告」より記事画面に見せる。

### 07. Suspended Reader

- 小さめの端末を中央上に浮かせ、周囲の番号付き索引と細線で対応させる。
- 物理演出は控えめ、操作対象だけ明確にする。

### 08. Darkroom Reader

- charcoal背景、ivoryの端末画面、muted orangeの選択線。
- 第4回20の色の好みを端末案へ移す。

## B. 一覧＋端末プレビュー — ブログ性を優先

### 09. Index Left, Phone Right

- 左70%に10記事の密な索引、右30%に小さな正面端末。
- hover/focusした記事を端末内で切り替える最も実用的な案。

### 10. Cover Grid with Device Preview

- 左に2×3のカバー、右に幅28%の端末。各カバーは題名付き。
- 画像中心だが端末はあくまで選択結果。

### 11. Phone Between Two Columns

- 中央に細い端末、左右へ年代の異なる記事列。
- 対称すぎないよう列位置と見出しサイズをずらす。

### 12. Proof Sheet plus Phone

- 第4回02の校正面に小さな端末プレビューを重ねる。
- 赤い校正記号と端末内の選択記事を対応させる。

### 13. Loose Leaf Device Set

- 第4回13の紙・画面・コードの並びへ、中サイズ端末を一モジュールとして入れる。
- 各紙片、画面、端末が別の記事カバーである。

### 14. Worktable Article Console

- charcoalの作業台に記事カバー、短いコード片、端末を7モジュールで配置。
- 現物とデジタルの合成を最も強める。

### 15. Browser and Phone Pair

- 同じ選択記事のdesktop版をブラウザー、mobile版を端末で並べる。
- 残りの記事は下の文字索引へ置く。

### 16. Command Palette Preview

- 左に検索・タグ・並び替えをcommand palette風に置き、右端末に結果を表示。
- IDEそのものではなくブログの操作として読めるようにする。

## C. 複数端末 — 状態と遷移を見せる

### 17. Three Reading States

- 3台に一覧、記事冒頭、コードブロックを表示する。
- 同じブログの状態であり、別プロジェクトにはしない。

### 18. Device Fan

- 3台を浅く扇状に重ね、最前面だけ正面にする。
- 選択で前後が入れ替わる動きを想定する。

### 19. Article Arc

- 小さな5台を弧状に置き、中央の一台だけ大きくする。
- carouselだがドラッグを必須操作にしない。

### 20. Portrait / Landscape Pair

- 縦端末と横端末を一組にし、文章記事とコード記事の見え方を比較する。
- 外側に通常の記事一覧を残す。

### 21. Responsive Rack

- desktop、tablet比率、phone比率の3面を棚状に配置する。
- すべて汎用矩形でブランド端末を再現しない。

### 22. Exploded Screens

- 一台の端末背後に3枚の記事画面を浅くずらして置く。
- 端末の部品分解ではなく、閲覧履歴の層として表す。

## D. 現物とWebGLの合成

### 23. Phone on Proof Paper

- 生成りの校正紙、赤鉛筆の印、端末を同じ面へ置く。
- 紙面の記事題名と端末画面が対応する。

### 24. Metal Rail Reader

- 細い金属レールへ端末と記事カバーを吊るす編集展示。
- 写真スタジオ風にせず背景をフラットに保つ。

### 25. Code Paper Base

- 公開可能なコード断片を印刷した紙の上に端末を置き、周囲に記事索引。
- コード面積は全体の1/4以下。

### 26. Floating Cover Orbit

- 端末の周囲へ4枚の記事カバーを浅く浮かせ、選択カバーが端末へ入る。
- 3Dオブジェクトは記事カバーだけに限定する。

### 27. Desk Object Composite

- 小さな端末、メモ、ブラウザー、写真カバーを高密度に構成する。
- 全要素を記事リンクにし、生活写真の物語は作らない。

## E. 操作の見せ方

### 28. Drag to Inspect

- 同じ一台を「通常」「ドラッグ中」「正面復帰」の3状態で小さく示す。
- 回転は最大12度、離すと必ず読める正面へ戻る。

### 29. Filter and Screen Swap

- `新着 / よく読まれている / 外部`でDOM一覧と端末画面が同時に切り替わる。
- WebGLなしでも通常のフィルターとして動く。

### 30. Cover-to-Reader Transition

- 左の記事カバーを選ぶと、そのカバーが端末画面へ収まり、次に記事ページへつながる3段階。
- 端末演出を閲覧遷移に直接結び付ける最有力モーション案。

## 実装方式の比較

### 推奨: 3D外装 + DOM画面

端末の外装と影だけをThree.js / React Three Fiberで描き、記事画面は操作可能なDOMとして同期させる。Three.jsの`InteractionManager`は`HTMLTexture`を持つ3Dオブジェクトに対して、DOM要素のCSS `matrix3d`を毎フレーム同期し、ブラウザー本来のpointer eventを渡せる。CSS3DRendererでもDOMを3D変形できるが、geometryやmaterialを使えず、100%以外のブラウザー・画面zoomをサポートしない制約がある。

参考:

- [Three.js InteractionManager](https://threejs.org/docs/pages/InteractionManager.html)
- [Three.js CSS3DRenderer](https://threejs.org/docs/pages/CSS3DRenderer.html)
- [React Three Fiber events](https://r3f.docs.pmnd.rs/api/events)

### 避ける: 記事全体を画像textureにする

Canvas内のtextureに記事を焼くと、リンク、テキスト選択、検索、読み上げ、通常のスクロールが弱くなる。ホームのDOM一覧を必ず残し、端末内はpreviewと位置付ける。

## 操作と性能の上限

- pointerでの傾きはX/Yとも最大12度。離したら200〜320msで正面へ戻す。
- 端末画面のスクロールと端末回転を同時に発生させない。
- `prefers-reduced-motion`では正面静止、DOM一覧のみで全記事へ移動できる。
- 画面外、background tab、操作停止後は連続renderを止め、必要時だけinvalidateする。
- mobileではWebGL端末を小さく再現せず、通常の記事リストへ切り替える。
- WebGL初期化失敗時も端末領域をDOMの静止previewへ置き換える。
