import Link from "next/link"
// import Ad from "./adsense"

// TOPディレクトリの時だけTwitterを表示する？

export type TagCountType = { tagCount: TagDataType[] }

type TagDataType = {
  tagName: string
  totalCount: number
}

const FloatMenu = (tagCountList: TagCountType) => {
  const createSideMenuTags = (tagCount: TagDataType[]) =>
    Object.entries(tagCount).map((tag) => (
      <ul
        key={tag[0]}
        style={{
          marginLeft: "0px",
          marginRight: "5px",
          marginBottom: "5px",
          display: "inline-block",
          backgroundColor: "#181818",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "2px",
          paddingBottom: "2px",
          borderRadius: "10px",
        }}
      >
        <Link key={tag[0]} href={`/tags/${tag[0]}`} aria-label={tag[0]}>
          {tag[0]}
        </Link>
        <span style={{ fontSize: "9px" }}>({JSON.stringify(tag[1])})</span>
      </ul>
    ))

  return (
    <div
      style={{
        paddingTop: "1rem",
        textAlign: "right",
        backgroundColor: "#2F2D32",
        // paddingLeft: `40px`,
        paddingRight: "600px",
      }}
    >
      <div
        style={{
          // floatMenu: `left`, なんで入れたか忘れたけど消して問題なかったのでコメントアウト
          // position: `fixed`,
          // width: `240px`,
          // height: `500px`,
          padding: "0.1rem",
          margin: "0 auto",
          textAlign: "center",
          fontFamily: "Helvetica Neue",
          // background: `#CE4532`,
          borderRadius: "15px",
          width: "330px",
        }}
      >
        <div
          style={{
            width: "330px",
            // padding: `1rem`,
            margin: "0 auto",
            textAlign: "left",
            fontFamily: "Helvetica Neue",
            borderRadius: "15px",
            marginRight: "20px,",
          }}
        >
          <p
            style={{
              // paddingLeft: `30%`,
              textAlign: "center",
              marginBottom: "20px",
              width: "320px",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "3px double",
              fontWeight: "bold",
              borderColor:
                "rgb(47, 45, 50) rgb(47, 45, 50) #ffffff rgb(47, 45, 50)",
            }}
          >
            Tags
          </p>

          <div style={{ width: "320px" }}>
            {createSideMenuTags({ ...tagCountList.tagCount })}
          </div>
          <p
            style={{
              paddingTop: "10px",
              textAlign: "center",
              marginBottom: "20px",
              width: "320px",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "3px double",
              fontWeight: "bold",
              borderColor:
                "rgb(47, 45, 50) rgb(47, 45, 50) #ffffff rgb(47, 45, 50)",
            }}
          />
          <br />
        </div>
        <div
          style={{
            textAlign: "left",
          }}
        >
          <a
            className="twitter-timeline"
            data-lang="ja"
            data-width="330px"
            data-height="600px"
            data-dnt="true"
            data-theme="dark"
            href="https://twitter.com/card1nal_tetra?ref_src=twsrc%5Etfw"
          >
            &nbsp;
          </a>
        </div>

        {/* <Ad /> */}
      </div>
    </div>
  )
}

export default FloatMenu

// アイコン：ttps://qiita.com/tkit/items/932316c5f5f7b162b61e#github
// twitterモジュール追加：https://takumon.com/2018/10/07/
