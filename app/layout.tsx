import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"

import { Ga4 } from "@/components/client/Ga4/Ga4"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Suspense>
          <Ga4 />
        </Suspense>
        <SpeedInsights />
        {children}
      </body>
    </html>
  )
}
