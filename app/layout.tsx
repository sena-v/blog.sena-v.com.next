import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"

import { Ga4 } from "@/components/client/Ga4/Ga4"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { resolveGa4MeasurementId } from "@/lib/analytics/ga4"
import { siteDescription, siteTitle, siteUrl, twitterUrl } from "@/utils/constants"

const readerThemePreferenceScript = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("sena-v-reader-theme");if(t==="dark"||t==="light")document.documentElement.dataset.readerThemePreference=t}catch(e){}`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteTitle} — 技術と日々の記録`,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: siteTitle,
    title: `${siteTitle} — 技術と日々の記録`,
    description: siteDescription,
    url: siteUrl,
    images: [{ url: "/background.jpg", width: 1000, height: 1000, alt: siteTitle }],
  },
  twitter: {
    card: "summary_large_image",
    creator: twitterUrl.replace("https://x.com/", "@"),
    images: ["/background.jpg"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga4MeasurementId = resolveGa4MeasurementId({
    explicitlyEnabled: process.env.GA4_ENABLED,
    measurementId: process.env.NEXT_PUBLIC_GA_ID,
    vercelEnvironment: process.env.VERCEL_ENV,
  })
  const speedInsightsEnabled = process.env.VERCEL_ENV === "production"

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: readerThemePreferenceScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          本文へ移動
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        {ga4MeasurementId ? <Ga4 measurementId={ga4MeasurementId} /> : null}
        {speedInsightsEnabled ? <SpeedInsights /> : null}
      </body>
    </html>
  )
}
