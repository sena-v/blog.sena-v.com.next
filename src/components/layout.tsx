/* eslint-disable @next/next/next-script-for-ga */
import Image from "next/image"

import { Helmet } from "react-helmet"
import Header from "@src/components/Header"
// import Footer from "./footer"
// import Float from "./float"
// import FloatMenu from "./float-menu"
// import TopPage from "@src/components/TopPage"
// import Post from "@src/components/Post"

import { InferGetStaticPropsType } from "next"
import { getAllPosts } from "@src/utils/read-md"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["slug", "title", "date", "tags"])

  return {
    props: { allPosts },
  }
}

const Layout = ({ allPosts }: Props) => {
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50px minmax(auto, 950px) 80px",
          backgroundColor: "#2F2D32",
        }}
      >
        <div
          style={{
            gridColumn: 0 / 1,
            backgroundColor: "#2F2D32",
          }}
        >
          {/* <Float /> */}
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
          {/* <Post allPosts={props} /> */}
        </div>
        {/* <FloatMenu style={{ gridColumn: 3 / 4 }} /> */}
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Layout
