import "./font.css"
import { Ga4 } from "@/components/client/Ga4/Ga4"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Ga4 />
      <body>{children}</body>
    </html>
  )
}
