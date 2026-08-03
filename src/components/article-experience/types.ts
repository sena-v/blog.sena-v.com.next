export type ReaderTheme = "dark" | "light"
export type ReaderOrientation = "portrait" | "landscape"

export type ReaderWriting = {
  kind: "local" | "external"
  slug: string
  title: string
  summary: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  content: string
}

export type ReaderIndexItem = {
  id: string
  href: string
  title: string
  meta?: string
  tag?: string
  rank?: number
  external?: boolean
  current?: boolean
  children?: ReaderIndexItem[]
}

export type ArticleExperienceData = {
  writing: ReaderWriting
  archive: ReaderIndexItem[]
  allArticles: ReaderIndexItem[]
  related: ReaderIndexItem[]
  popular: ReaderIndexItem[]
  popularLabel: string
}
