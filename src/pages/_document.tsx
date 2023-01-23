import { MetaTag } from "@src/components/MetaTag"
import NextDocument, { Head, Html, Main, NextScript } from "next/document"

class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5515095500922112"
            crossOrigin="anonymous"
          ></script>
          <MetaTag />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
