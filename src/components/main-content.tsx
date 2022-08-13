// {Array.isArray(props) ? (
//   <Home allPosts={props} />
// ) : (
//   <Slug post={props as Item} />
// )}

import Home from "src/components/top-page"
import Slug from "src/components/post"

import { Item } from "src/utils/read-md"
import { AllPosts } from "src/components/top-page"

export type Props = AllPosts | Item

export const MainContent = (content: Props) => {
  return <></>
}
