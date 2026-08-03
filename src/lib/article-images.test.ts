import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"

import { getArticleImageDimensions, normalizeArticleImageSrc } from "./article-images.ts"
import { getLocalWritingsOnly } from "./content.ts"

test("本文中の全ローカル画像がresponsive source用の実寸を持つ", () => {
  const referencedImages = new Set<string>()

  for (const writing of getLocalWritingsOnly()) {
    for (const match of writing.content?.matchAll(/!\[[^\]]*]\(([^)\s]+)(?:\s+[^)]*)?\)/g) ?? []) {
      const src = normalizeArticleImageSrc(match[1])
      if (!src.startsWith("/images/")) continue

      const dimensions = getArticleImageDimensions(src)
      assert.ok(dimensions, `${writing.slug}: ${src} の実寸が未登録です`)
      assert.ok(dimensions.width > 0 && dimensions.height > 0)
      assert.equal(fs.existsSync(path.join(process.cwd(), "public", src)), true, `${src} がpublicに存在しません`)
      referencedImages.add(src)
    }
  }

  assert.ok(referencedImages.size > 0)
})

test("本文中の全画像が空でない代替文を持つ", () => {
  let imageCount = 0

  for (const writing of getLocalWritingsOnly()) {
    for (const match of writing.content?.matchAll(/!\[([^\]]*)]\(([^)\s]+)(?:\s+[^)]*)?\)/g) ?? []) {
      imageCount += 1
      assert.notEqual(match[1].trim(), "", `${writing.slug}: ${match[2]} の代替文が空です`)
    }
  }

  assert.ok(imageCount > 0)
})
