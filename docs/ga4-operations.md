# GA4運用・検証メモ

最終更新: 2026-08-04

この文書は、sena-v.comのGoogle Analytics 4計測を本番で有効にし、後からData APIで人気順を作るための作業記録である。Google Analyticsの管理画面やGoogle Cloudを変更する前に、対象アカウントとプロパティを確認する。

## コード側の方針

- `NEXT_PUBLIC_GA_ID` はMeasurement IDだけを持つ。公開情報だが、実値はVercel環境変数で管理する。
- Vercelでは `VERCEL_ENV=production` のときだけGA4を読み込む。
- Previewとlocalhostでは読み込まない。ローカルで検証するときだけ `GA4_ENABLED=true` を明示する。
- 緊急停止時はProductionでも `GA4_ENABLED=false` にする。
- `gtag('config')` は `send_page_view: false` で初期化時に一度だけ呼ぶ。
- page viewはApp Routerのpathname変更時に手動で一度だけ送る。`page_location`と`page_path`へqueryとfragmentを含めない。
- GA4拡張計測の「ブラウザの履歴イベントに基づくページの変更」は無効にし、手動page viewと重複させない。
- 外部リンククリックは拡張計測に任せ、独自eventを重ねて送らない。
- Google Signalsと広告パーソナライズ用シグナルはコード側でも無効にする。

手動page viewと自動履歴計測を併用すると重複する。検索条件をGET parameterで保持しながら検索文字列を送信しないため、このブログではpathnameだけを使う手動page viewへ統一する。

- [Measure single-page applications](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)
- [Measure pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [GA4 Data redaction](https://support.google.com/analytics/answer/13544947)

## 本番有効化前の確認

### 1. 既存プロパティ

- [ ] sena-v.comを所有するGoogleアカウントでGA4を開く。
- [ ] 対象Property IDとWeb data streamのMeasurement IDを記録する。
- [ ] 現在の `G-` IDとVercelの `NEXT_PUBLIC_GA_ID` が一致することを確認する。
- [ ] 過去データの開始日と、直近90日に有効なpage viewがあるか確認する。
- [ ] タイムゾーンが日本に設定されているか確認する。

### 2. Data stream

- [ ] 拡張計測を有効にする。
- [ ] Page viewsの詳細設定で「Page changes based on browser history events」を無効にする。
- [ ] 外部リンククリックを有効にする。
- [ ] 独自コードやGoogle Tag Managerから同じpage viewを送っていないことを確認する。
- [ ] Site searchは無効にし、ブログ内検索語を収集しない。
- [ ] Data redactionでメールアドレスの自動redactionを有効にする。
- [ ] Data redactionでURL query parameterの `query` をredactする。

### 3. データと広告の設定

- [ ] データ保持期間を14か月にする。
- [ ] Google Signalsを利用しないことを確認する。
- [ ] 広告パーソナライズを利用しないことを確認する。
- [ ] Google Adsへリンクされていない、または意図したリンクだけであることを確認する。
- [ ] 自分のアクセスを除外する必要があれば、Internal traffic filterをTestingで検証してから有効にする。

### 4. Privacy

- [ ] `/privacy` の説明と実際の設定が一致する。
- [ ] 個人を特定できる情報をURL、page title、イベントパラメータへ入れない。
- [ ] 法令や訪問者の地域に応じた同意管理が必要か、公開前に別途判断する。
- [ ] 計測目的やサービスを変えたらPrivacyページも同時に更新する。

## DebugView / Realtimeでの受け入れ確認

本番相当の環境で、次の順に操作する。

1. トップを直接開く。
2. Writingsへクライアント遷移する。
3. 記事を一つ開く。
4. Writingsで検索する。
5. Qiitaなど外部記事へのリンクを開く。

期待結果:

- [ ] 各画面で `page_view` が一度だけ記録される。
- [ ] `/articles/{slug}` が正しいpage pathとして記録される。
- [ ] Writingsで検索しても検索語がイベントやpage locationに残らない。
- [ ] 初回表示とApp Router遷移で、各pathnameの `page_view` が一度だけ送信される。
- [ ] 外部リンクは `click` と `outbound=true` で確認できる。
- [ ] localhostの操作は記録されない。
- [ ] Vercel Previewの操作は記録されない。
- [ ] ページタイトルと参照元が画面遷移後も正しい。

初回公開後は、二重計測を修正した影響でPVが以前より少なく見える可能性がある。修正前後の数値を単純比較せず、正常化した日を注記する。

## Data API

人気順はGA4 Data APIの `runReport` で取得する。

- dimension: `pagePath`
- metric: `screenPageViews`
- date range: `30daysAgo` から `yesterday`
- filter: `/articles/` で始まるpath
- cache: 6〜24時間

取得後は、有効なローカル記事slugと照合する。アプリが受け取る最終結果はslugの配列だけとし、PV数とGA4の生レスポンスを公開しない。API障害、認証失敗、データ不足時は新着順へ戻す。

コードでは、GA4の行をslug順へ変換する純粋関数と、server-onlyのData API clientを実装している。認証情報がない場合、OAuth / Data APIの失敗、またはデータが空の場合は、新着順の「よく読んでほしい記事」へ戻る。認証情報・access token・PV値はClient Componentへ渡さず、Server Componentへslug順だけを返す。取得結果は12時間cacheし、requestごとにGoogle APIを呼ばない。

### Google Cloud側

- [ ] 専用Google Cloud projectを決める。
- [ ] Google Analytics Data APIを有効にする。
- [ ] 読み取り専用のサービスアカウントを作る。
- [ ] GA4プロパティに必要最小限のViewer権限を付ける。
- [ ] Property ID、client email、private keyをVercel Production環境変数へ登録する。
- [ ] 秘密鍵をPreview、Development、Git、ログへ出さない。
- [ ] 最初の `runReport` をローカルまたは一時的な安全な環境から実行する。

- [Google Analytics Data API overview](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Data API quickstart](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart)
- [API dimensions and metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)

## 30日後に記事へ残す材料

記事は実装完了時ではなく、30日程度の計測と人気順の検証後に書く。

- 更新前のGA4コードと、二重計測が起こり得た理由
- Next.js App Routerでの画面遷移とGA4の拡張計測
- localhostとPreviewを除外した方法
- 広告向け機能を使わず、ブログ改善に範囲を限定した理由
- Data APIの認証、キャッシュ、フォールバック
- 実数を表に出さず、slugの順序だけを渡す設計
- Lighthouse、Core Web Vitals、第三者スクリプトの影響
- 業務知識を自分のサイトへ適用して、理解が変わった点

「GA4を導入した」という紹介だけにせず、誤計測をどう見つけ、どの設定を選び、実データで何を確かめたかを書く。
