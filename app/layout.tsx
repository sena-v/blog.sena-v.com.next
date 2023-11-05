import type { Metadata } from "next"

import "./font.css"
import { Ga4 } from "@/components/client/Ga4/Ga4"
import { siteDescription, siteTitle, siteUrl } from "@/utils/constants"

// 動的設定を用いてメタデータを生成する(urlが何であっても同じメタデータを返すことができる)
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: siteUrl,
      siteName: siteTitle,
      description: siteDescription,
      images: `${siteUrl}/background.jpg`,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Ga4 />
      <body>{children}</body>
    </html>
  )
}
