import type { Metadata } from "next"

import "./font.css"
import { Ga4 } from "@/components/client/Ga4/Ga4"
import { siteDescription, siteTitle, siteUrl } from "@/utils/constants"

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: siteTitle,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/background.png`,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Ga4 />
      <body>{children}</body>
    </html>
  )
}
