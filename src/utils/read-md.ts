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
export const getPostDates = () => {
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
export const getPostByDate = (postDate: string, fields: string[] = []) => {
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
export const getAllPosts = () => {
  const fields = ["slug", "title", "coverImage", "date", "tags", "content"]

  const dates = getPostDates()
  const posts = dates
    .map((date) => getPostByDate(date, fields))
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

export const getFilteredPost = (filterParams: string) => {
  // stringでcookieに保存された値から各パラメータを取得する
  const { titleWords, selectedTags, years }: { titleWords: string; selectedTags: string[]; years: string[] } =
    JSON.parse(filterParams)

  const _titleWords = titleWords.split(" ")
  const _selectedTags = selectedTags ?? []

  // 全値が一致する要素のみ配列化する
  const posts = getAllPosts()
  const filteredPost: ItemType[] = posts.filter((post) => {
    const isTitleMatched =
      _titleWords.length === 0 ? true : _titleWords.every((titleWord) => post.title.includes(titleWord))
    const isTagMatched = _selectedTags.length === 0 ? true : _selectedTags.every((tag) => post.tags.includes(tag))
    const isYearMatched = years.length === 0 ? true : years.some((y) => post.date.includes(y))

    return isTitleMatched && isTagMatched && isYearMatched && post
  })

  return filteredPost
}

export const getAllTagsAndYears = () => {
  const posts = getAllPosts()

  const tags = posts.map((post) => post.tags).flat()
  const years = posts.map((post) => post.date.slice(0, 4))

  const sortAndCount = (recordArr: Record<string, number>) => {
    return Object.entries(recordArr).sort((a, b) => {
      const isAlphabetA = /^[a-zA-Z]/.test(a[0])
      const isAlphabetB = /^[a-zA-Z]/.test(b[0])

      if (isAlphabetA && isAlphabetB) {
        // 両方ともアルファベット
        return b[1] - a[1]
      } else if (isAlphabetA) {
        // Aがアルファベット
        return -1
      } else if (isAlphabetB) {
        // Bがアルファベット
        return 1
      } else {
        // どちらもアルファベットでない
        return b[1] - a[1]
      }
    })
  }

  // 同名をまとめてカウントした値と合わせて返す
  const countOccurrences = (arr: string[]): Record<string, number> => {
    const result: Record<string, number> = {}

    arr.forEach((value) => {
      if (result[value]) {
        result[value]++
      } else {
        result[value] = 1
      }
    })

    return result
  }

  const tagsCount = sortAndCount(countOccurrences(tags))
  const yearsCount = sortAndCount(countOccurrences(years)).sort((a, b) => {
    return Number(b[0]) - Number(a[0])
  })

  return { tagsCount, yearsCount }
}
