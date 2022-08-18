/* eslint-disable @next/next/next-script-for-ga */
import { Helmet } from "react-helmet"
import Header from "@src/components/Header"
import Footer from "@src/components/Footer"
import FloatMenu from "@src/components/FloatMenu"
import Float from "@src/components/Float"
import TopPage from "@src/components/TopPage"
import TagPage from "@src/components/TagPage"

import { InferGetStaticPropsType } from "next"
import { getAllPosts } from "@src/utils/read-md"
import { useState } from "react"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["slug", "title", "date", "tags"])

  // 全タグを配列にpush
  const tagAllList = allPosts
    .map((post) => {
      return [...post.tags]
    })
    .flat()

  // 全タグから重複を削除
  const tagReducedList = tagAllList.filter(
    (x: string, i: number, self: string[]) => self.indexOf(x) === i
  )

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

  return {
    props: { allPosts, tagCount },
  }
}

const Layout = ({ allPosts, tagCount }: Props) => {
  const [selectTagName, setSelectTagName] = useState("")

  console.log(selectTagName)

  return (
    <>
      <Helmet>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-76NH7ZL65V"
        />
        <script>
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-76NH7ZL65V');
  `}
        </script>
      </Helmet>
      <Header siteTitle={"sena-v.com"} />
      <title style={{ display: "none" }}>{"sena-v.com"}</title>
      <meta name="description" content="Author: sena-v" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50px minmax(700px, auto) 350px",
        }}
      >
        <div
          style={{
            gridColumn: 0 / 1,
            backgroundColor: "#2F2D32",
          }}
        >
          <Float />
        </div>
        <div
          style={{
            maxWidth: 1200,
            paddingTop: "2rem ",
            paddingBottom: "120px",
            paddingRight: "2rem",
            paddingLeft: "3rem",

            gridColumn: 1 / 2,
            backgroundColor: "#2F2D32",
          }}
        >
          {!selectTagName || selectTagName === "ALL" ? (
            <TopPage allPosts={allPosts} />
          ) : (
            <TagPage allPosts={allPosts} selectTagName={selectTagName} />
          )}
        </div>

        <FloatMenu tagCount={tagCount} setTagPage={setSelectTagName} />
      </div>
      <Footer />
    </>
  )
}

export default Layout
