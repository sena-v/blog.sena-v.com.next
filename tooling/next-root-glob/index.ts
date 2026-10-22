// Nextのfast-glob由来の未修正braces依存を除く。上流で依存が除去されたらoverrideごと削除する。
import picomatch from "picomatch"
import { globSync as findDirectories } from "tinyglobby"
import { isAbsolute } from "node:path"

// @next/eslint-plugin-next 16.4.2のget-root-dirsが使用するAPIだけを提供する。
export function globSync(pattern: string, options: { readonly onlyDirectories: true }): string[] {
  if (options.onlyDirectories !== true) {
    throw new TypeError("Next.jsの探索にはonlyDirectories: trueが必要です")
  }
  // https://superchupu.dev/tinyglobby/migration の移行条件に従い、指定した根の暗黙展開を止める。
  const directories = findDirectories(pattern, {
    onlyDirectories: true,
    expandDirectories: false,
    absolute: isAbsolute(pattern),
  })
  // 末尾を探す正規表現の繰り返し走査を避け、入力長に比例する処理で正規化する。
  const segments = pattern.split("/")
  const lastSegment = segments.findLastIndex((segment) => segment.length > 0)
  const matchingPattern = segments.slice(0, lastSegment + 1).join("/") || "/"
  const matches = picomatch(matchingPattern, { strictSlashes: true })
  return (
    directories
      .map((directory) => directory.replace(/\/$/, "") || "/")
      // tinyglobbyがapp/**に含めるapp自体を除き、fast-globの探索根を維持する。
      .filter((directory) => matches(directory))
  )
}
