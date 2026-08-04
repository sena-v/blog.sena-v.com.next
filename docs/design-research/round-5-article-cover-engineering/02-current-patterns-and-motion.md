# 現在の見せ方とモーション

## 調査から残す六つの方向

### 1. 可変サイズのモジュラーグリッド

均一カードではなく、同じ基準線上で1×1、2×1、1×2を混ぜる。Bentoは広く使われているが、プロフィール、Skills、Spotify、地図を別々の角丸カードにするテンプレートは避ける。このブログでは、すべてのモジュールを記事に限定する。

### 2. 実画面をカバーとして使う

完成したUI、コードの一部、ブラウザー画面、ノートを記事カバーへする。画面全体を読ませるのではなく、記事の入口として判別できる縮尺へ切る。端末モックアップは小さく使い、画面より端末外形が目立たないようにする。

### 3. 紙とデジタルの境界を混ぜる

ノートの上にWebのカードを重ねるのではなく、同じグリッド上で紙の写真とデジタルカバーを同じ記事リンクとして扱う。偽テープ、破れ、強い影は使わず、素材差は輪郭、色温度、ピクセル密度で見せる。

### 4. 文字より先にカバーを走査できる

題名を隠さないが、最初に複数カバーの色・形を走査できる。第4回03の横並びはこの用途に再利用できる。固定文「静かな朝」ではなく、各カバーの下に対応記事の題名と日付を置く。

### 5. 動きは状態変化を説明する

現在よく見られる動きは、hover時の画像クロップ、カードのわずかな浮き、フィルター時の並び替え、ページ遷移時の共有画像、スクロールに応じた短いreveals。常時動くmarquee、粒子、カーソル追従、全面parallaxはブログには採用しない。

### 6. 技術力は演出の節度で見せる

コードや3Dを大きく見せるより、リンク領域、focus、レスポンシブ、reduced motion、画像読み込み、遷移の連続性が丁寧な方が、ブログのままDesign Engineeringの質を示せる。

## モーションを三段階に分ける

| 段階 | 内容 | このブログでの扱い |
| --- | --- | --- |
| M1: Micro | hover/focus、押下、画像の2〜4%拡大、caption reveal | 全候補に適用可能 |
| M2: Editorial | カバー→記事の共有遷移、フィルター再配置、短いscroll reveal | 3案のprototypeで比較 |
| M3: Immersive | WebGL、3D空間、全面parallax、カスタムカーソル | 通常ホームでは不採用 |

## 推奨モーション仕様

### カバーhover / focus

- 160〜220ms。
- 画像は`scale(1.02)`程度、またはクロップ位置を小さく移動する。
- 題名は常時表示し、hoverだけで情報を出さない。
- マウスとキーボードで同じ状態を見せる。

### 一覧から記事への遷移

- クリックしたカバーだけが記事先頭のカバーへ連続する。
- 背景全体は150〜220msのcross-fadeまで。
- Next.js固有のView Transition連携は現在もexperimentalなので、本番前提にせず比較用branchで検証する。
- 標準API非対応時は通常遷移へフォールバックする。

### scroll

- 画面へ入った記事群を6〜12px、120〜180msで一度だけ表示する程度。
- スクロール位置へ常時同期する場合はCSS Scroll-driven Animationsを候補にする。
- スクロールを横移動へ強制変換しない。
- stickyは一つのセクション内だけにする。

### reduced motion

- 基本状態を静止画として完成させる。
- `prefers-reduced-motion: reduce`ではtransform、parallax、shared elementを停止する。
- opacityまたは即時切り替えへ置き換える。
- 自動再生する動画カバーは採用しない。

参考:

- [W3C: prefers-reduced-motion](https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html)
- [Motion for React: Accessibility](https://motion.dev/docs/react-accessibility)
- [Chrome: scroll-driven animation performance](https://developer.chrome.com/blog/scroll-animation-performance-case-study/)
- [MDN: Using the View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)
- [Next.js: experimental viewTransition](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition)

## 性能予算

- ホームで読み込む高解像度カバーはファーストビューの2〜3枚だけ。
- それ以外は`next/image`の適切な`sizes`とlazy-loadを使う。
- モーションライブラリを導入する前にCSSだけのM1を実装する。
- Motionを使う場合は必要部品だけを読み、ホーム全体をClient Componentにしない。
- 画像カバーの総転送量とLCPをprototypeごとに計測する。
