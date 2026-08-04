# Portrait device presentation research

調査日: 2026-08-03

## 観察したパターン

- [Apple Design Resources](https://developer.apple.com/design/resources/)は公式product bezelとUI kitを分けて提供し、端末表現を独立したdesign assetとして扱っている。
- [Apple Marketing Resources and Identity Guidelines](https://developer.apple.com/app-store/marketing/guidelines/)は、対応端末を示す場合に公式product bezelを使い、提供解像度で判読できる大きさを保つよう求めている。
- Appleの[Launching](https://developer.apple.com/design/human-interface-guidelines/launching)は実端末では現在の物理orientationで起動するよう案内し、`UISupportedInterfaceOrientations`の既定値はportraitである。物理orientationを持たないweb mockでは、過去の操作を疑似的な端末状態として復元する根拠はない。
- [ViewPortal](https://viewport.al/)はiPhoneを単なる装飾画像にせず、`402 × 874 px / 100%`のlive viewport、端末名、回転操作を一体で見せている。
- [Raycast for iOS](https://www.rayca.st/ios)は1台の正面端末だけでheroを完結させず、複数の機能画像、iOS integration、motionをページ全体へ分散している。
- [Flighty](https://flighty.com/)は端末の外形そのものを主役にするのではなく、遅延予測、Live Activities、地図など実際の画面内容を機能ごとのstoryとして見せている。
- Appleの[Behind the Design: Flighty](https://developer.apple.com/news/?id=970ncww4)も、端末単体を傾け続ける表現ではなく、手に持った利用文脈や複数のUI要素を組み合わせて製品を説明している。
- [Framer AppLanPage](https://www.framer.com/community/marketplace/templates/applanpage/)はheroのiPhone mockupを画像または動画のmedia slotとして扱い、appear/scroll effectsを組み合わせている。

## 比較から得た基準

- ViewPortalのように操作対象そのものがlive viewportなら、正面・左右対称で置き、向きと実寸感を操作UIで伝える。
- Appleの公式bezelとmarketing guidelineに合わせ、輪郭は端末として判別できる精度を保ちつつ、画面内容を判読できる大きさを優先する。
- FlightyとRaycastのように、スタイルは画面の傾きではなく、実UI、周辺の編集情報、タイポグラフィ、抑えた光で作る。
- perspective、重なったscreen、offset plateは静止画heroでは使えるが、スクロール・回転する長時間閲覧用UIで常時使うと、奥行きの意味が変化し、文字と枠の安定性を損なう。

## このブログでの判断

記事本文は装飾画像ではなくlive DOMであり、長時間読むため、強いperspectiveや複数端末化は採用しない。

- 低いdesktop viewportではfull deviceを縮小して収めず、1619×886では上側64%をviewport内へ見せ、下側36%はstage外へ自然に続ける。本文は端末内でscrollできるため、左右railを各285px残しながら本文幅約485.81pxを確保し、機能を失わず実寸感を優先する。
- reader本文は16pxを下限にする。
- 端末は縦横とも静止時に正面・左右対称へ戻す。常時tiltとoffsetした背面plateは置かない。fine pointerの移動中だけ最大X 2.4° / Y 3.8°のtiltを与え、neutral highlightをpointer方向へ追従させて操作と反射の関係を伝える。
- 横向きは現在ページ内の探索操作に限定し、storageへ保存しない。物理端末の向きを取得できないweb上のmockでは、reload・再訪・記事移動時に情報量と端末らしさを最も早く伝えられるportraitへ戻す。
- bezelは縦横とも短辺比3.2%で上下左右を同じ物理幅にし、screen radiusをouter radiusからbezel幅だけ引く。percentage insetを縦横軸へ別々に適用して上だけ太く見える状態を避ける。
- 黒背景からの分離は、正確な薄いbezel、端末自身のshadow、中心が揃った低contrastのaccent lightだけで行う。
- 内側screenに白いborderは付けない。回転中はlive DOM layerとCSS rimを`visibility:hidden`でも遮断し、opacityの描画タイミングだけに依存せず、insetとradiusが変形する途中の枠を見せない。
- 操作可能性は端末横の回転buttonと実際にscrollできる内容で伝え、装飾的な`LIVE DOM` labelは置かない。
- WebGLは操作時lazy loadのままにし、同一meshの縦横回転と金属外装の弱い光沢に使う。操作前後で色が切り替わらないようgraphiteの基準materialはCSS layerに一元化し、WebGLは低opacityのscreen blendに限定する。pointer tiltは外装だけを動かさず、canvas・live DOM・CSS rimを含むshell全体へ同じcompositor transformを適用する。React stateやWebGL frame loopはpointerごとに更新せず、`requestAnimationFrame`でCSS custom propertyだけを更新する。
- 回転開始時とpointer leave時はtiltを0へ戻し、入力経路がleaveを配送しない場合もpointer停止800ms後に正面へspring-backする。`prefers-reduced-motion: reduce`とtouch pointerでは無効にする。
- WebGLが未読込の状態で回転buttonを直接押した場合は、canvasの`onCreated`まで現在の端末を保ってから回転を開始する。回転後のlive DOM復帰は固定timerではなく、shellのwidth・height両方の`transitionend`後も最終aspect比への到達を描画frameごとに確認する。WebGL失敗時だけ150msのCSS cross-fadeへ退避する。
- 物理回転の中央でcanvas内に収めるための縮小が必要になるが、その小さい中間形状は見せない。回転中はWebGL canvas自体を`visibility:hidden`にし、中央は対称なrose glowと端末形状ではない細いarcだけを表示する。完了後に新しい向きの端末を戻す。
- scroll thumbは可愛すぎる全身character iconをやめ、白い太めの外円と、右へ伸びる鼻先・上へ分離する2本の長い耳を明確にした右向きの赤pink rabbit silhouetteを持つ30px inline SVGにする。目・鼻の点・口・頬・胴体は描かない。操作領域は44pxを確保する。

## Drawer dismissalと情報階層

- W3Cの[Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)は、dialog内に見えるclose buttonを置き、Escapeで閉じ、閉じた後は原則として呼び出し元へfocusを戻すことを推奨している。左右位置そのものは規定していない。
- Appleの[Modality](https://developer.apple.com/design/human-interface-guidelines/modality)も、modalには明確なdismiss手段を用意し、platformで既知の配置と挙動に合わせることを求めている。
- Appleの[Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)は、必要な要素へ絞ることと、現在地・次の操作が分かる明確なhierarchyを重視している。

このreaderでは左上のhamburgerから左方向のdrawerを開くため、close buttonもdrawerの左上へ置く。44px targetを維持し、hamburgerとcloseの横中心差を16px未満にして、開閉の操作位置を連続させる。Escapeとtriggerへのfocus復帰も維持する。themeは常時見えるreader headerだけで変更できるため、drawer内の重複controlは削除する。

外側左railは「コードと設計、たまにそのほか。」をページの主題として最も大きくし、`SENA-V.COM / READING DESK`は18pxのpink ruleを伴うeyebrowとして従属させる。両者を同じ強さにせず、主見出しと文脈labelの役割差を意図的に見せる。
