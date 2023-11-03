import Ad from "@/old_components/Adsense"
import { Dispatch } from "react"

// TOPディレクトリの時だけTwitterを表示する？

export type TagPropsType = {
  tagCount: TagCountType[]
  setTagPage: Dispatch<string>
}

export type TagCountType = {
  tagName: string
  totalCount: number
}

const FloatMenu = (tagProps: TagPropsType) => {
  const createSideMenuTags = (tagCount: TagCountType[]) =>
    Object.entries(tagCount)
      .sort()
      .map((tag) => (
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
            cursor: "pointer",
          }}
          onClick={() => tagProps.setTagPage(tag[0])}
        >
          <b>{tag[0]}</b>
          <span style={{ fontSize: "9px" }}>({JSON.stringify(tag[1])})</span>
        </ul>
      ))

  return (
    <div
      style={{
        paddingTop: "1rem",
        textAlign: "right",
        backgroundColor: "#2F2D32",
        paddingRight: "600px",
      }}
    >
      <div
        style={{
          padding: "0.1rem",
          margin: "0 auto",
          textAlign: "center",
          fontFamily: "Helvetica Neue",
          borderRadius: "15px",
          width: "330px",
        }}
      >
        <div
          style={{
            width: "330px",
            margin: "0 auto",
            textAlign: "left",
            fontFamily: "Helvetica Neue",
            borderRadius: "15px",
            marginRight: "20px,",
          }}
        >
          <p
            style={{
              textAlign: "center",
              marginBottom: "20px",
              width: "320px",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "3px double",
              fontWeight: "bold",
              borderColor: "rgb(47, 45, 50) rgb(47, 45, 50) #ffffff rgb(47, 45, 50)",
            }}
          >
            Tags
          </p>

          <div style={{ width: "320px" }}>{createSideMenuTags({ ...tagProps.tagCount })}</div>
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
              borderColor: "rgb(47, 45, 50) rgb(47, 45, 50) #ffffff rgb(47, 45, 50)",
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
        <Ad />
      </div>
    </div>
  )
}

export default FloatMenu

// アイコン：ttps://qiita.com/tkit/items/932316c5f5f7b162b61e#github
// twitterモジュール追加：https://takumon.com/2018/10/07/
