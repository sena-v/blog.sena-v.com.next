# ブログデザイン調査 2026

調査日: 2026-08-02

対象: `blog.sena-v.com` の次期デザイン

> **2026-08-03 追記:** 第4回20案への反応から、写真自体の物語ではなく「記事カバーの編集グリッド」と「紙・端末・コードの混成」が好みの中心だと整理した。現在のエンジニア系個人サイトとモーションを調べ、記事カバーとWebGL記事ビューアを比較する[第5回調査](./round-5-article-cover-engineering/README.md)を追加した。その後、大きな端末内の記事画面、中央配置、縦横回転、目次、dark modeへ方向を絞り、[ブログ改善 1st最終デザイン・機能仕様](./round-5-article-cover-engineering/FIRST_FINAL_DESIGN_SPEC.md)として確定・実装した。比較用画像はリポジトリ肥大化を避けるため削除し、最終縦横2枚だけを軽量WebPで保持する。

## 第1回の結論（現在は保留）

以下は年表を前提にした第1回の結論であり、現在の推奨ではない。一般的な「エンジニアのポートフォリオサイト」へ寄せない方針は維持するが、年表をホームの主役にする案は第2回で外した。

最も相性がよいのは、記事の公開履歴そのものを主役にする **A案「年輪 / Editorial Timeline」** である。そこへ、B案の手触りや個人的な注記を少量混ぜる。実装比率の目安は次の通り。

- A案「年輪」70%: 降順の年表、年ごとの索引、罫線を中心とした編集的レイアウト
- B案「書斎」20%: 近況、短い余談、本人が撮影・作成した小さな素材
- D案「技術雑誌」10%: 日本語見出しの組み方と、ページごとの強弱

ポートフォリオ性は、独立した `Projects` ページや実績カードではなく、次の情報から自然に伝える。

1. 2019年から続く記事の時間軸
2. Aboutの「現在 / これまで / 関心」
3. 代表記事に付ける短い編集注記
4. GitHub、Qiita、外部記事への導線
5. ブログ自体を更新した判断と検証の記事

## このフォルダの読み方

現在の実装基準は[ブログ改善 1st最終デザイン・機能仕様](./round-5-article-cover-engineering/FIRST_FINAL_DESIGN_SPEC.md)。[第5回 Article Covers × Design Engineering](./round-5-article-cover-engineering/README.md)以下は、その結論に至る比較と判断の履歴である。第4回は好みを特定した過程、第3回は全方向の振れ幅、第2回は静かな案、第1回は年表中心の記録として残す。

### 第1回のファイル

1. [00-current-audit.md](./00-current-audit.md): 現在のサイトと、変えない要件
2. [01-source-catalog.md](./01-source-catalog.md): 調査した実在サイト、公開ソース、基準資料
3. [02-principles.md](./02-principles.md): 調査から抽出した設計原則とAIテンプレート感を避ける基準
4. [03-design-directions.md](./03-design-directions.md): 5つのデザイン案、参照元、画面仕様、比較
5. [04-recommendation-and-plan.md](./04-recommendation-and-plan.md): 推奨案と、実装へ進む場合の工程
6. [05-mockup-prompts.md](./05-mockup-prompts.md): 画像の生成条件、最終プロンプト、実装時の注意

比較用モックは方向確定後に削除した。各案の文章と判断理由だけを履歴として残している。

## 調査の扱い

- 実在サイトは模写元ではなく、情報設計、密度、タイポグラフィ、動きの判断を分解するための参照資料として扱った。
- 技術的な判断は、W3C、MDN、web.dev、Next.jsなどの一次資料を優先した。
- 「AIっぽい」は規格ではないため、2026年の論考、複数の実例、現在の画面に見られる共通パターンを照合した定性的な評価である。
- 第三者サイトのスクリーンショットはリポジトリへ複製していない。モデルページへ直接リンクし、提案画像はこのサイト用に新規作成する。
- 比較画像は方向確定後に削除した。選定後の要件と検証結果は1st最終仕様と実装検証書へ集約する。

## 現在の状態

1st最終仕様に基づく実DOM reader、responsive表示、遅延WebGL外装、索引、theme、drawer、GA4 fallbackを`feature/blog-reboot-2026`へ実装済み。現在の受け入れ結果は[IMPLEMENTATION_VERIFICATION.md](./round-5-article-cover-engineering/IMPLEMENTATION_VERIFICATION.md)を正とする。
