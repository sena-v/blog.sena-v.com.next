import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy",
  description: "sena-v.comのアクセス解析とデータの扱いについて。",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <header className="page-hero shell">
        <p className="eyebrow">PRIVACY</p>
        <h1>アクセス解析について</h1>
        <p className="page-intro">このブログで使うアクセス解析と、取得したデータの扱いを記載します。</p>
      </header>

      <article className="prose">
        <h2>Google Analyticsの利用</h2>
        <p>
          このブログでは、記事がどのくらい読まれているか、どこから訪問されたか、表示や導線に問題がないかを確認するため、
          Google Analytics 4を利用します。
        </p>
        <p>
          Google Analyticsは、閲覧したページ、訪問時刻、参照元、ブラウザや端末のおおまかな情報などを収集します。
          標準のJavaScriptタグでは、利用者とセッションを区別するためにファーストパーティCookieが使われます。
          このブログから氏名、メールアドレスなどをGoogle Analyticsへ送ることはありません。
        </p>
        <h2>このブログでの使い方</h2>
        <p>
          集計値は、更新内容の検討と、記事一覧の人気順を作るために使います。PV数そのものを記事ページや公開APIへ掲載する予定はありません。
          広告配信や広告向けのユーザー分析は目的としておらず、Google
          Signalsと広告パーソナライズ用シグナルはサイト側の設定で無効にします。
        </p>
        <p>
          外部サイトへのリンクがクリックされたことは、Google Analyticsの拡張計測機能によって記録される場合があります。
          page viewはqueryを除いたpathnameだけを送信し、ブログ内で入力された検索語は収集しません。加えて、メールアドレスと検索パラメータを送らないためのredactionを設定します。
          計測は本番サイトだけで行い、localhostとVercelのPreview Deploymentでは行いません。
        </p>
        <h2>Googleによるデータの扱いと無効化</h2>
        <p>
          Google Analyticsに送信されたデータの扱いは、Googleの規約とPrivacy Policyに基づきます。
          ブラウザのCookie設定やGoogle Analyticsオプトアウトアドオンを使って、計測を無効にできます。
        </p>
        <ul>
          <li>
            <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer">
              Google Analytics利用規約
            </a>
          </li>
          <li>
            <a href="https://policies.google.com/privacy?hl=ja" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
          </li>
          <li>
            <a href="https://tools.google.com/dlpage/gaoptout?hl=ja" target="_blank" rel="noopener noreferrer">
              Google Analyticsオプトアウトアドオン
            </a>
          </li>
        </ul>
        <h2>見直し</h2>
        <p>利用する計測機能、法令、Googleの仕様、ブログでの利用目的が変わった場合は、このページを更新します。</p>
        <p>
          <small>制定日: 2026年8月2日</small>
        </p>
      </article>
    </main>
  )
}
