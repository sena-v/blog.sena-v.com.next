// {Array.isArray(props) ? (
//   <Home allPosts={props} />
// ) : (
//   <Slug post={props as Item} />
// )}

import Home from "src/components/TopPage"
import Slug from "src/components/Post"

import { Item } from "src/utils/read-md"
import { AllPosts } from "src/components/TopPage"

export type Props = AllPosts | Item

export const MainContent = (content: Props) => {
  return <></>
}
