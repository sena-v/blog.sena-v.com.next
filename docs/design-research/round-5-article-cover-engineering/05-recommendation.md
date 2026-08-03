# 推奨する絞り方

## WebGL端末案を含む現時点の有力系統

追加フィードバック後は、[WebGL記事ビューア30案](./07-webgl-device-explorer.md)を先に比較する。端末を主役にするかではなく、**端末画面が記事を読みやすくし、通常の記事一覧を壊していないか**で選ぶ。

その後の画像反応により、端末を小さなpreviewにする案は優先度を下げ、[大画面端末10案](./09-device-focus-shortlist.md)へ絞った。さらに中央配置、縦から横への回転、hamburger内の目次、dark mode、赤系dark paletteへ要件を絞ったため、現在は[縦横回転の5ペア](./10-portrait-landscape-rotation-study.md)を最優先の比較対象にする。

大画面端末10案時点の候補は次の4案。縦横回転の5ペアへの反応後に更新する。

- **02 Command List + Right Reader**: 一覧と検索を最も自然に残せる。
- **04 Nearly Full-Height Solo Reader**: 主画面へのフォーカスが最も強い。
- **09 Right Reader + Numbered Archive**: ブログの時間軸と強い編集性を両立する。
- **10 Cover-to-Reader Moment**: 記事サムネイルとWebGL遷移を結び付けられる。

06の6度傾きは独立したレイアウト案ではなく、上記4案へ追加できるmotion optionとして扱う。

最初に見る候補は次の6案。

- **09 Index Left, Phone Right**: ブログとして最も堅実。
- **10 Cover Grid with Device Preview**: 記事カバーの好みを維持しやすい。
- **12 Proof Sheet plus Phone**: 第4回02の良さをそのまま発展できる。
- **13 Loose Leaf Device Set**: 第4回13の好感触に最も近い。
- **26 Floating Cover Orbit**: WebGLを使う意味が最も画面に出る。
- **30 Cover-to-Reader Transition**: 将来の遷移仕様として有力。

実装方式は、外装だけをWebGL、記事画面と索引をDOMにする混成を第一候補にする。30枚を比較した後、端末占有率が小・中・大の各一案へ絞り、localhostで操作可能な試作にする。

## 記事カバー全般の有力系統

30案を見た後、次の四系統から一案ずつ残すと好みを判断しやすい。

### A. 校正面

- 01 Dark Cover Grid
- 02 Light Proof Grid
- 04 Asymmetric Cover Board

第4回01・02の良さを最も直接継ぐ。記事数、カバー有無、人気順への拡張にも強い。

### B. 現物と画面

- 08 Paper and Screen Board
- 12 Floating Interface Notes
- 13 Dev Desk Bento

第4回11・13で好感触だった「リアルとの複合」を、全要素が記事リンクになるよう修正した系統。

### C. 編集とエンジニアリング

- 16 Component Inspector
- 19 Charcoal Orange Modules
- 20 Ivory Cobalt Modules

写真ブログにせず、技術的で現代的な印象を強められる。19は第4回20の好みの配色を継ぐ。

### D. 将来の動き

- 25 Shared Cover Transition
- 26 Hover Crop Grid
- 29 Filter Morph Grid

静止画の構造を保ちながら、実装後に動きを加える余地を比較する系統。

## 端末追加前の暫定推奨

**13 Dev Desk Bentoを構造の中心、01または02を一覧密度の基準、25を遷移仕様として混ぜる。**

```text
ホームの静止構造       13: 紙・画面・コード・写真を記事カバーとして混在
一覧の規律             01/02: 連番、狭い間隔、題名との明確な対応
将来のモーション       25: クリックしたカバーだけ記事ヘッダーへ連続
配色候補               19: charcoal / ivory / muted orange
```

この組み合わせなら、ブログ記事が主役のまま「デザインも実装も丁寧なエンジニア」という印象を画面から作れる。

## localhostで比較する候補

端末案の画像への反応を取るまではHTML化しない。反応後、従来案と端末案から最大3案を選ぶ。

1. **02 Light Proof Grid** — 最も明快なカバー一覧。
2. **13 Dev Desk Bento** — 好みの中心と推定する混成案。
3. **19 Charcoal Orange Modules** — 暗色とスタイルを強めた案。

端末案では09、13、26、30から1〜2案を置き換える。端末が大きい案と小さい案を同時に試し、WebGL自体の好みと端末サイズの好みを分離する。

25のshared transitionは3案すべてへ同じ実験として付け、レイアウトの評価とモーションの評価を分ける。

## 実装前に必要な素材

- カバーを明示できる記事を5〜8件選ぶ。
- `code / browser / terminal / note / device / abstract-grid`の汎用カバーを各1点作る。
- 外部記事2〜3件は自作fallbackで表示する。
- 実データの題名長でdesktop/mobileの折り返しを確認する。
- Apple固有形状を含まない端末外装を作る。外装はWebGL、画面はDOMを第一候補にする。

## 今回も選ばないもの

- 全面3D、ゲーム型ナビゲーション（記事ビューアとして限定したWebGLは比較対象へ変更）
- 画像が常時動く動画グリッド
- 横スクロールを強制する記事一覧
- Projects / Skills / ExperienceのBentoカード
- 記事と別の物語を持つ写真企画
- 生成画像を本人の写真や制作画面として公開すること
