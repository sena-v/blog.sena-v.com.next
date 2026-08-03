# 記事カバーを主役にした30方向

全案で、表示される画像は対応記事へのリンクである。生成画像内の写真、コード、画面は仮素材。

## A. Contact / Proof Grid

### 01. Dark Cover Grid
- 構造: 暗い3×3。各カバー下に題名と日付。第4回01を記事専用へ修正。
- fallback: `code / browser / note`を混在。
- motion: hoverした一枚だけ彩度とクロップが戻る。

### 02. Light Proof Grid
- 構造: 白い4×3校正面。赤い選択印は注目記事3件を示す。
- fallback: 画像指定なしでも白黒の汎用カバーを生成。
- motion: focusで赤い括弧が描画される。

### 03. Article Filmstrip
- 構造: 横一列5カバー。写真固有captionを廃止し、題名・日付だけを付ける。
- fallback: 同じ高さで異なるクロップ。
- motion: hoverで画像が2%拡大し題名の下線が伸びる。

### 04. Asymmetric Cover Board
- 構造: 2×2、1×1、1×2を混ぜた7記事。カードUIではなく一枚の紙面。
- fallback: サイズ別にクロップを事前生成。
- motion: 読み順を壊さない短い順次表示。

### 05. Cover Index Split
- 構造: 左60%に6カバー、右40%に同じ6記事の文字索引。
- fallback: 画像と文字の対応を連番で保証。
- motion: 索引hoverで対応カバーだけ強調。

### 06. Cropped Atlas
- 構造: 12カバーを細い横長・正方形・縦長へ編集し、題名を外側へ置く。
- fallback: 一つの汎用素材でもクロップ差を作る。
- motion: hoverで元のクロップ位置へゆっくり戻る。

## B. Physical × Digital

### 07. Notebook Cover Overlay
- 構造: 見開きノートを背景にせず一モジュールとして置き、周囲に5記事カバー。
- fallback: ノート自体も一記事のcover。
- motion: カバーが紙面から2px浮く程度。

### 08. Paper and Screen Board
- 構造: 第4回13の発展。ノート、コード、ブラウザー、写真の6記事を同じ基準線へ。
- fallback: 各素材型をcoverFallbackで指定。
- motion: hoverで記事メタ情報が素材下に展開。

### 09. Generic Phone Rack
- 構造: Apple固有要素のない汎用端末3台に記事カバーを表示し、横に通常カバー3件。
- fallback: `device`は自サイトのモバイル画面を入れる。
- motion: hoverで端末内だけ短くスクロール。

### 10. Browser and Photo Grid
- 構造: 汎用ブラウザー窓3件 + 写真カバー3件。すべて同じ記事階層。
- fallback: ブラウザー枠はCSS、画面部分だけ画像。
- motion: focusでブラウザーのtitle barだけ点灯。

### 11. Code Paper Covers
- 構造: コード印刷、実画面、ノートを小さな6カバーへ分解。
- fallback: コードは自作短断片をタグ別に選ぶ。
- motion: hoverでコードの注目行を一行だけ強調。

### 12. Floating Interface Notes
- 構造: 生成りの紙面上に、5つのデジタルカバーと2つの紙カバーを非対称配置。
- fallback: 影ではなく輪郭と色温度で素材差を示す。
- motion: pointerに追従せず、hover時の1px移動のみ。

## C. Engineering Visual Language

### 13. Dev Desk Bento
- 構造: 第4回13/20の中間。8記事をコード、画面、紙、写真として可変グリッドへ。
- fallback: 全モジュールが記事で、プロフィールカードを置かない。
- motion: layout animationでフィルター再配置。

### 14. Terminal Cover Matrix
- 構造: ターミナル風カバー4件と写真・ノート4件を混ぜる。コード面積は1/3以下。
- fallback: 実コマンドではなく公開可能な検証断片。
- motion: hoverでcursorが一度だけblink。

### 15. IDE Panel Index
- 構造: IDEの分割ペインを抽象化し、ファイル一覧を記事索引、editorをhover previewにする。
- fallback: 常時表示題名でIDE操作を知らなくても読める。
- motion: 選択記事のpreviewが短く切り替わる。

### 16. Component Inspector
- 構造: 左に6記事カバー、右に選択中記事の小さなmetadata inspector。
- fallback: inspectorは日付・タグ・掲載先だけ。
- motion: hover/focusで右の内容をcross-fade。

### 17. Diff Cover Board
- 構造: before/after、追加/削除の色をカバーの視覚言語にする8記事面。
- fallback: 実diffがない記事は二色の抽象グリッド。
- motion: hoverでbeforeからafterへwipe。

### 18. Responsive Proof Grid
- 構造: desktop、tablet、phone比率のカバーを混ぜ、各記事の表示対象ではなく単なる形として使う。
- fallback: 汎用端末枠。Apple固有形状なし。
- motion: resizeではなくhoverで別viewportをpreview。

## D. Editorial Portfolio Hybrid

### 19. Charcoal Orange Modules
- 構造: 第4回20の配色を継承し、7断片すべてを記事カバーへ修正。
- fallback: orangeは選択・focusだけに使う。
- motion: hoverで細いorange outlineが一周する。

### 20. Ivory Cobalt Modules
- 構造: 明るい紙面、黒文字、cobaltの操作色。8記事の可変グリッド。
- fallback: 画像なしはcobaltの番号と題名。
- motion: 画像の青いマスクが短く外れる。

### 21. Monochrome Cover Ledger
- 構造: 白黒カバー10件を収蔵品台帳のように並べ、題名は常時表示。
- fallback: 画像指定ありも一旦白黒化、hoverで色を戻す。
- motion: 色復帰だけ。移動なし。

### 22. Editorial Split Strip
- 構造: 左に最新1件の中サイズ、右に横長5件。大判を避けた雑誌扉。
- fallback: 最新記事にも汎用カバーを許可。
- motion: 最新記事だけshared transition候補。

### 23. Wide Narrow Mosaic
- 構造: 横長4件と細い縦長4件を交互に置く。文字量は一定にしない。
- fallback: focalPointで細いクロップを管理。
- motion: hoverで細いカバーが横へ少し広がる。

### 24. Index with Hover Preview
- 構造: 高密度な記事索引 + 右下に小さなカバーpreview。画像は索引の補助。
- fallback: pointerなし端末では各行に小thumbnailを表示。
- motion: preview位置は固定、画像だけcross-fade。

## E. Motion-ready Layouts

### 25. Shared Cover Transition
- 構造: 6カバーと、クリック後の記事ヘッダーを同一画面に小さく示す遷移検討案。
- fallback: API非対応時は通常リンク。
- motion: 選択カバーだけが記事先頭へ移る。

### 26. Hover Crop Grid
- 構造: 9記事を異なる焦点位置でクロップ。通常とhoverの二状態を一部に示す。
- fallback: abstract-gridもcrop変化できる。
- motion: `object-position`とscaleの小変化。

### 27. Expandable Cover Stack
- 構造: 3組の重なった記事カバー。hover/focusで同じ組の3件が展開する。
- fallback: DOMには常に全題名を置く。
- motion: layout animation。reduced motionは最初から展開。

### 28. Pinned Cover Rail
- 構造: 左の短い記事リストをスクロールすると、右の固定領域でカバーだけ切り替わる。
- fallback: モバイルは通常の画像付き一列。
- motion: scroll位置同期はcross-fadeのみ。

### 29. Filter Morph Grid
- 構造: 新着、人気、外部の切替で同じ8カバーが再配置される。
- fallback: URLの`sort`を保ち、JSなしでも一覧を表示。
- motion: 位置と寸法のlayout animation。

### 30. Layered Article Canvas
- 構造: 紙、ブラウザー、汎用端末、写真を浅い三層に置く9記事面。没入型にはしない。
- fallback: 層はCSS Gridのz-indexだけで、Canvas/WebGL不要。
- motion: hoverした層だけ2〜4px前へ。reduced motionは静止。
