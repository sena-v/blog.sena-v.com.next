import fs from "fs"
import { join } from "path"
import matter from "gray-matter"

export type ItemType = {
  slug: string
  content: string
  title: string
  date: string
  tags: string[]
}

// postsが格納されているディレクトリを取得する
// memo: process.cwd() はカレントディレクトリ
const postsDirectory = join(process.cwd(), "src/posts")

// posts配下にあるディレクトリ名(slug)をすべて取得する
export const getPostSlugs = () => {
  // まずはファイル名、ディレクトリ名を両方取得する
  const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true })
  // ディレクトリ名のみに絞り込んで返す
  return allDirents
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name)
}

/**
 * 与えられたslugから記事の内容を取得して返す
 * @param slug
 * @param fields 取得したい値 (slug | content | title | tags)
 */
export const getPostBySlug = (slug: string, fields: string[] = []) => {
  // ファイルを読み込む
  const fullPath = join(postsDirectory, slug, "index.md")
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const items: ItemType = {
    slug: "",
    content: "",
    title: "",
    date: "",
    tags: [],
  }

  // TODO: slugが日付で取得されてしまっているが、SSG時に参照するフォルダ名=slugのため大きく治す必要あり

  // 指定された値を取得してくる
  // memo: slugが指定されたとき、contentが指定されたとき、frontmatterの中身が指定されたときで返却の仕方が異なる
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug
    }
    if (field === "content") {
      items[field] = content.toString()
    }

    if (field === "title" || field === "tags") {
      items[field] = data[field]
    }
  })

  // 格納フォルダ名を投稿日付とする(md内にdateを書くと乖離する可能性が出るため)
  items["date"] = slug

  return items
}

/**
 * すべての記事から指定したfieldsの値を取得する
 * @param fields 取得したい値 (slug | content | title | tags)
 */
export const getAllPosts = (fields: string[] = []) => {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((a, b) => {
      // 日付順ソート
      const slugA = a.date
      const slugB = b.date

      if (slugA < slugB) {
        return 1
      } else {
        slugB < slugA
      }

      return slugA <= slugB ? 1 : -1
    })

  return posts
}
