import "../src/utils/font"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"

import { Ga4 } from "@/components/client/Ga4/Ga4"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Suspense>
        <Ga4 />
      </Suspense>
      <SpeedInsights />
      <body>{children}</body>
    </html>
  )
}
