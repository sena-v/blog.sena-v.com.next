import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LayoutClientSide } from "./layoutClientSide"

export const metadata: Metadata = {
  title: "sena-v.com",
  description: "tech and hobby blog by sena-v (Next.js App Router)",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <LayoutClientSide />
      <body>{children}</body>
    </html>
  )
}
