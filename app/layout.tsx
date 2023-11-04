import type { Metadata } from "next"

import "./font.css"
import { Ga4 } from "@/components/client/Ga4/Ga4"

export const metadata: Metadata = {
  title: "sena-v.com",
  description: "tech and hobby blog by sena-v (Next.js App Router)",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://sena-v.com",
    siteName: "sena-v.com",
    images: [
      {
        url: "https://sena-v.com/ogp.png",
        width: 1200,
        height: 630,
        alt: "sena-v.com",
      },
    ],
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
