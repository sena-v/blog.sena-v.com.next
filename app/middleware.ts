// middleware.ts
import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const country = request.geo?.country

  if (process.env.NODE_ENV === "production") {
    if (country && country !== "JP") {
      console.info(`IPアドレスが日本以外のため、アクセスを拒否しました。[request.ip = ${request.ip}]`)
      return new NextResponse(null, { status: 401 })
    }
  }

  // RSCで現在のurlを取れるようにheader情報へ現在のurlを追加
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-url", request.url)

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  })
}
