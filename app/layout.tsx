import "./font.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Ga4 } from "@/components/client/Ga4/Ga4"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Ga4 />
      <SpeedInsights />
      <body>{children}</body>
    </html>
  )
}
