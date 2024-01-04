import "./font.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Ga4 } from "@/components/client/Ga4/Ga4"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />
        <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet" />
      </head>
      <Ga4 />
      <SpeedInsights />
      <body>{children}</body>
    </html>
  )
}
