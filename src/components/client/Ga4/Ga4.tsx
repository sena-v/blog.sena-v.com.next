"use client"

import Head from "next/head"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

export const Ga4 = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" />
        <ScriptGa />
      </Head>
    </>
  )
}

const ScriptGa = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? ""
  const existsGaId = GA_MEASUREMENT_ID !== ""

  const pageView = (path: string) => {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
    })
  }

  useEffect(() => {
    if (!existsGaId) {
      return
    }
    const url = pathname + searchParams.toString()
    pageView(url)
  }, [pathname, searchParams])

  return (
    <>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
