import assert from "node:assert/strict"
import test from "node:test"

import { getAllWritings, getRelatedWritings, getWritingArchives, getWritingBySlug } from "./content.ts"

test("archiveは新しい月から並び、件数を保持する", () => {
  const archives = getWritingArchives()
  assert.ok(archives.length > 0)
  assert.deepEqual([...archives].sort(([left], [right]) => right.localeCompare(left)), archives)
  assert.ok(archives.every(([month, count]) => /^\d{4}-\d{2}$/.test(month) && count > 0))
})

test("関連記事は現在記事を除外し、共有tagを持つ", () => {
  const current = getWritingBySlug("package-manager-node")
  assert.ok(current)
  const related = getRelatedWritings(current, 8)
  assert.ok(related.length > 0)
  assert.ok(related.every((writing) => writing.slug !== current.slug))
  assert.ok(related.every((writing) => writing.tags.some((tag) => current.tags.includes(tag))))
})

test("draft記事は公開面・個別URL・archiveから除外する", () => {
  assert.equal(getWritingBySlug("blog-reboot-2026"), undefined)
  assert.ok(getAllWritings().every((writing) => !writing.draft))
  assert.ok(getWritingArchives().every(([month]) => month !== "2026-08"))
})
