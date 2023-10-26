import { ItemType } from "./read-md"

export const countTags = (allPosts: ItemType[]) => {
  // 全タグを配列にpush
  const tagAllList = allPosts
    .map((post) => {
      return [...post.tags]
    })
    .flat()

  // 全タグから重複を削除
  const tagReducedList = tagAllList.filter((x: string, i: number, self: string[]) => self.indexOf(x) === i)

  // 後にtype TagCountTypeになるが初期化時は空のためany
  const tagCount: any = { ALL: tagReducedList.length }

  // 重複文字でループしてタグ数をカウント
  for (let i = 0; i < tagReducedList.length; i++) {
    let count = 0
    tagAllList.forEach((tag) => tag === tagReducedList[i] && count++)

    // ループ後、tagCountにkey,valueでセット
    tagCount[tagReducedList[i]] = count
  }

  tagCount["ALL"] = tagReducedList.length

  return tagCount
}
