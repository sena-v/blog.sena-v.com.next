export type ArticleImageDimensions = {
  width: number
  height: number
}

export const articleImageDimensions: Readonly<Record<string, ArticleImageDimensions>> = {
  "/images/posts-image/2020-09-29-01.png": { width: 825, height: 510 },
  "/images/posts-image/2020-11-19-01.png": { width: 747, height: 287 },
  "/images/posts-image/2020-11-27-01.png": { width: 150, height: 150 },
  "/images/posts-image/2020-11-27-02.png": { width: 150, height: 150 },
  "/images/posts-image/2020-11-27-03.png": { width: 150, height: 150 },
  "/images/posts-image/2020-11-27-04.png": { width: 150, height: 150 },
  "/images/posts-image/2020-11-27-05.png": { width: 150, height: 150 },
  "/images/posts-image/2020-11-27-06.png": { width: 150, height: 150 },
  "/images/posts-image/2020-11-27-07.png": { width: 150, height: 150 },
  "/images/posts-image/2020-12-01-01.png": { width: 150, height: 150 },
  "/images/posts-image/2020-12-01-02.jpg": { width: 150, height: 150 },
  "/images/posts-image/2020-12-01-03.png": { width: 150, height: 150 },
  "/images/posts-image/2020-12-01-04.jpg": { width: 300, height: 200 },
  "/images/posts-image/2020-12-27.png": { width: 960, height: 504 },
  "/images/posts-image/2020-12-30.png": { width: 1005, height: 486 },
  "/images/posts-image/2022-08-09.jpg": { width: 454, height: 498 },
  "/images/posts-image/2023-01-17.png": { width: 400, height: 400 },
  "/images/posts-image/2023-01-26.png": { width: 1222, height: 296 },
}

export function normalizeArticleImageSrc(src: string) {
  return src.replace(/^(?:\.\.\/)+images\//, "/images/")
}

export function getArticleImageDimensions(src: string) {
  return articleImageDimensions[normalizeArticleImageSrc(src)]
}
