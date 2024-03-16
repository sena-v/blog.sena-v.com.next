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
}
