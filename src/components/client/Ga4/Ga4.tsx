"use client"

import Head from "next/head"
import Script from "next/script"

export const Ga4 = () => {
  return (
    <>
      <Head>
        <ScriptGa />
      </Head>
    </>
  )
}

const ScriptGa = () => {
  return (
    <>
      <Script
        defer
        id="ga-connect"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        defer
        id="ga-track"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", '${process.env.NEXT_PUBLIC_GA_ID}');
        `,
        }}
      />
    </>
  )
}
