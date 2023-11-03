import type { Metadata } from "next"

import "./font.css"
import { Ga4 } from "@/components/client/Ga4/Ga4"

export const metadata: Metadata = {
  title: "sena-v.com",
  description: "tech and hobby blog by sena-v (Next.js App Router)",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Ga4 />
      <body>{children}</body>
    </html>
  )
}
