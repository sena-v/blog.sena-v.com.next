import assert from "node:assert/strict"
import test from "node:test"

import { rankArticleSlugsByViews } from "./popular-writings.ts"

test("記事PVを合算し、数値を返さずslugだけを人気順にする", () => {
  const result = rankArticleSlugsByViews(
    [
      { pagePath: "/articles/older", views: 8 },
      { pagePath: "/articles/newer?from=test", views: 2 },
      { pagePath: "/articles/older/", views: 4 },
    ],
    ["newer", "older", "unmeasured"],
  )

  assert.deepEqual(result, ["older", "newer", "unmeasured"])
})

test("同数・未計測は公開日の降順を維持する", () => {
  const result = rankArticleSlugsByViews(
    [
      { pagePath: "/articles/newer", views: 3 },
      { pagePath: "/articles/older", views: 3 },
    ],
    ["newer", "older", "unmeasured"],
  )

  assert.deepEqual(result, ["newer", "older", "unmeasured"])
})

test("記事外、未知のslug、不正な値を除外する", () => {
  const fallback = ["known", "other"]
  const result = rankArticleSlugsByViews(
    [
      { pagePath: "/about", views: 100 },
      { pagePath: "/articles/unknown", views: 100 },
      { pagePath: "/articles/known", views: Number.NaN },
      { pagePath: "/articles/other", views: -1 },
    ],
    fallback,
  )

  assert.deepEqual(result, fallback)
})
