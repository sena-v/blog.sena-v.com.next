// Next.jsの探索処理を置き換えても、探索根と既存の検査ルールを維持する。
import assert from "node:assert/strict"
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join, relative, resolve } from "node:path"
import { test } from "node:test"
import { execFileSync } from "node:child_process"
import { ESLint } from "eslint"

const require = createRequire(import.meta.url)
const pluginEntry = require.resolve("@next/eslint-plugin-next")
const nextRequire = createRequire(pluginEntry)
mkdirSync(resolve("review-runs"), { recursive: true })

test("Nextの探索でディレクトリ展開、ファイル混入、globstarの親混入を防ぐ", (t) => {
  const fixture = mkdtempSync(resolve("review-runs/next-root-glob-"))
  t.after(() => rmSync(fixture, { recursive: true, force: true }))
  for (const directory of ["apps/blog/app/about", "apps/docs/pages", "apps/.hidden"]) {
    mkdirSync(join(fixture, directory), { recursive: true })
  }
  writeFileSync(join(fixture, "apps/readme.txt"), "fixture")
  const rootModule: unknown = nextRequire("./utils/get-root-dirs.js")
  assert(rootModule && typeof rootModule === "object" && "getRootDirs" in rootModule)
  assert.equal(typeof rootModule.getRootDirs, "function")
  assert(typeof rootModule.getRootDirs === "function")
  const cases = [
    { pattern: "apps/", roots: ["apps"] },
    { pattern: "apps/blog", roots: ["apps/blog"] },
    { pattern: "apps/*", roots: ["apps/blog", "apps/docs"] },
    {
      pattern: "apps/**",
      roots: ["apps/blog", "apps/blog/app", "apps/blog/app/about", "apps/docs", "apps/docs/pages"],
    },
    { pattern: "apps/{blog,docs}", roots: ["apps/blog", "apps/docs"] },
    { pattern: "missing/*", roots: [] },
  ]
  for (const { pattern, roots } of cases) {
    const result: unknown = rootModule.getRootDirs({
      cwd: fixture,
      settings: { next: { rootDir: join(fixture, pattern) } },
    })
    assert(Array.isArray(result))
    assert.deepEqual(result.sort(), roots.map((root) => join(fixture, root)).sort(), pattern)
  }
  for (const prefix of [relative(process.cwd(), fixture), `./${relative(process.cwd(), fixture)}`]) {
    const result: unknown = rootModule.getRootDirs({
      cwd: process.cwd(),
      settings: { next: { rootDir: `${prefix}/apps/*` } },
    })
    assert(Array.isArray(result))
    assert.deepEqual(
      result.map((directory) => resolve(directory)).sort(),
      [join(fixture, "apps/blog"), join(fixture, "apps/docs")].sort(),
    )
  }
})

test("深くネストしたbrace入力でもスタックを枯渇させない", () => {
  // 小さいスタックで再現し、マシンごとのスタック容量に成功判定を依存させない。
  const output = execFileSync(
    process.execPath,
    [
      "--stack-size=256",
      "-e",
      `
    const { createRequire } = require('node:module');
    const nextRequire = createRequire(require.resolve('@next/eslint-plugin-next'));
    const { getRootDirs } = nextRequire('./utils/get-root-dirs.js');
    const roots = getRootDirs({cwd: process.cwd(), settings: {next: {rootDir: '{'.repeat(3500) + '}'.repeat(3500)}}});
    console.log(JSON.stringify(roots));
  `,
    ],
    { encoding: "utf8" },
  )
  assert.deepEqual(JSON.parse(output), [])
})

test("Nextの内部リンク検査がglobで指定されたアプリのページを検出する", async (t) => {
  const fixture = mkdtempSync(resolve("review-runs/next-root-rule-"))
  t.after(() => rmSync(fixture, { recursive: true, force: true }))
  mkdirSync(join(fixture, "apps/blog/pages"), { recursive: true })
  writeFileSync(join(fixture, "apps/blog/pages/about.tsx"), "export default function Page() { return null }")
  const eslint = new ESLint({ overrideConfig: { settings: { next: { rootDir: `${fixture}/apps/*` } } } })
  const results = await eslint.lintText('export default function Example() { return <a href="/about">About</a> }', {
    filePath: "app/example.tsx",
  })
  assert(results[0].messages.some((message) => message.ruleId === "@next/next/no-html-link-for-pages"))
})
