import fs from "fs"
import { join } from "path"
import matter from "gray-matter"

export interface ItemType {
  slug: string
  content: string
  title: string
  coverImage: string
  date: string
  tags: string[]
}

// postsが格納されているディレクトリを取得する
// process.cwd() はカレントディレクトリ
const postsDirectory = join(process.cwd(), "posts")

// posts配下にあるディレクトリ名(slug)をすべて取得する
export const getPostSlugs = () => {
  // まずはファイル名、ディレクトリ名を両方取得する
  const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true })
  // ディレクトリ名のみに絞り込んで返す
  return allDirents.filter((dirent) => dirent.isDirectory()).map(({ name }) => name)
}

/**
 * 与えられたslugから記事の内容を取得して返す
 * @param slug
 * @param fields 取得したい値 (slug | content | title | tags)
 */
export const getPostBySlug = (postDate: string, fields: string[] = []) => {
  // ファイルを読み込む
  const fullPath = join(postsDirectory, postDate, "index.md")
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const items: ItemType = {
    slug: "",
    content: "",
    title: "",
    coverImage: "",
    date: "",
    tags: [],
  }

  // 指定された値を取得してくる
  // slugが指定されたとき、contentが指定されたとき、frontmatterの中身が指定されたときで返却の仕方が異なる
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = data.slug
    }
    if (field === "content") {
      items[field] = content.toString()
    }

    if (field === "title" || field === "tags") {
      items[field] = data[field]
    }

    if (field === "coverImage") {
      const path = data.coverImage ?? ""
      items[field] = path.length > 0 ? `images/${data.coverImage}` : ""
    }
  })

  // 格納フォルダ名を投稿日付とする
  items.date = postDate

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
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        slugB < slugA
      }

      return slugA <= slugB ? 1 : -1
    })

  return posts
}
