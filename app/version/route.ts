export const dynamic = "force-dynamic"

export function GET() {
  return new Response(process.env.VERCEL_GIT_COMMIT_SHA ?? "local", {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  })
}
