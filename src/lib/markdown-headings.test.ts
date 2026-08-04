import assert from "node:assert/strict"
import test from "node:test"

import { extractMarkdownHeadings, headingSlug } from "./markdown-headings.ts"

test("日本語見出しを安定したIDへ変換する", () => {
  assert.equal(headingSlug("WebGL / DOM 構成"), "webgl-dom-構成")
  assert.equal(headingSlug("  端末の向き  "), "端末の向き")
})

test("code fenceを除外し、重複見出しへ連番を付ける", () => {
  const headings = extractMarkdownHeadings(`
## はじめに
### 詳細
\`\`\`md
## コード内
\`\`\`
## はじめに
`)

  assert.deepEqual(headings, [
    { depth: 2, id: "はじめに", text: "はじめに" },
    { depth: 3, id: "詳細", text: "詳細" },
    { depth: 2, id: "はじめに-2", text: "はじめに" },
  ])
})
