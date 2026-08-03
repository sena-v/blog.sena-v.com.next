import { NextResponse, type NextRequest } from "next/server"

const legacySlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function proxy(request: NextRequest) {
  const legacySlug = request.nextUrl.searchParams.get("slug")
  if (!legacySlug || !legacySlugPattern.test(legacySlug)) return NextResponse.next()

  const destination = request.nextUrl.clone()
  destination.pathname = `/articles/${legacySlug}`
  destination.search = ""
  destination.hash = ""
  return NextResponse.redirect(destination, 308)
}

export const config = { matcher: "/" }
