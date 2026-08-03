"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

import { buildGa4PageLocation } from "@/lib/analytics/ga4"
import { siteUrl } from "@/utils/constants"

type Ga4Props = {
  measurementId: string
}

function Ga4PageViews({ measurementId }: Ga4Props) {
  const pathname = usePathname()
  const lastSentPathname = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const sendPageView = () => {
      if (cancelled || !window.gtag || lastSentPathname.current === pathname) return
      const pageLocation = buildGa4PageLocation(siteUrl, pathname)
      lastSentPathname.current = pathname
      window.gtag("event", "page_view", {
        page_location: pageLocation,
        page_path: pathname,
        page_title: document.title,
      })
    }

    if (window.gtag) {
      const timer = window.setTimeout(sendPageView, 0)
      return () => {
        cancelled = true
        window.clearTimeout(timer)
      }
    }

    window.addEventListener("sena-v-ga4-ready", sendPageView, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener("sena-v-ga4-ready", sendPageView)
    }
  }, [measurementId, pathname])

  return null
}

export function Ga4({ measurementId }: Ga4Props) {
  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: false,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
          window.dispatchEvent(new Event('sena-v-ga4-ready'));
        `}
      </Script>
      <Script
        id="ga4-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Ga4PageViews measurementId={measurementId} />
    </>
  )
}
