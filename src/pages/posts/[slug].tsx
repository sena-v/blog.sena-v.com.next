/* eslint-disable @next/next/next-script-for-ga */
import { Helmet } from "react-helmet"
import Header from "@src/components/Header"
import Footer from "@src/components/Footer"
import FloatMenu from "@src/components/FloatMenu"
import Float from "@src/components/Float"
import Post from "@src/components/Post"

import { NextPage, InferGetStaticPropsType } from "next"
import { getAllPosts, getPostBySlug } from "@src/utils/read-md"
import { countTags } from "@src/utils/tag-count"
import { useRecoilState } from "recoil"
import { selectTagAtom } from "@src/recoil/globalState"
import { useRouter } from "next/router"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const post = getPostBySlug(params.slug, ["slug", "title", "date", "tags", "content"])

  // タグカウントのために全記事を取得し、タグ計算(SSGのためビルド時のみ)
  const allPosts = getAllPosts(["slug", "title", "date", "tags"])
  const tagCount = countTags(allPosts)

  // 変換結果をpropsとして渡す
  return {
    props: {
      post,
      tagCount,
    },
  }
}

const SlugPage: NextPage<Props> = ({ post, tagCount }) => {
  const [selectTagName, setSelectTagName] = useRecoilState(selectTagAtom)
  const router = useRouter()

  const selectTagNameFromSlugPage = (tag: string) => {
    // recoilにタグ選択情報を保存してTopへ遷移
    setSelectTagName(tag)

    router.push("/")
  }

  return (
    <>
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-76NH7ZL65V" />
        <script>
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-76NH7ZL65V');
  `}
        </script>
      </Helmet>
      <Header siteTitle={"sena-v.com"} setTagPage={selectTagNameFromSlugPage} />
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
          <Post {...post} />
        </div>

        <FloatMenu tagCount={tagCount} setTagPage={selectTagNameFromSlugPage} />
      </div>
      <Footer />
    </>
  )
}
export default SlugPage
