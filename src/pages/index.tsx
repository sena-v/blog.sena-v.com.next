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
import { countTags } from "@src/utils/tag-count"
import { useRecoilState } from "recoil"
import { selectTagAtom } from "@src/recoil/globalState"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["slug", "title", "date", "tags"])

  const tagCount = countTags(allPosts)

  return {
    props: { allPosts, tagCount },
  }
}

const Layout = ({ allPosts, tagCount }: Props) => {
  const [selectTagName, setSelectTagName] = useRecoilState(selectTagAtom)

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
      <Header siteTitle={"sena-v.com"} setTagPage={setSelectTagName} />
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
            <TopPage allPosts={allPosts} setTagPage={setSelectTagName} />
          ) : (
            <TagPage
              allPosts={allPosts}
              selectTagName={selectTagName}
              setTagPage={setSelectTagName}
            />
          )}
        </div>

        <FloatMenu tagCount={tagCount} setTagPage={setSelectTagName} />
      </div>
      <Footer />
    </>
  )
}

export default Layout
