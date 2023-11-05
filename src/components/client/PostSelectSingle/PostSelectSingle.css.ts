import { style } from "@vanilla-extract/css"

export const container = style({
  maxWidth: "900px",
  width: "90%",
  margin: "0 auto",
  backgroundColor: "#fff",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0export const  1)",
})

/* ヘッダーのスタイル */
export const header = style({
  backgroundColor: "#0078d4",
  color: "#fff",
  padding: "10px",
  textAlign: "center",
})

export const headerH1 = style({
  margin: "0",
})

/* メインコンテンツのスタイル */
export const mainContent = style({
  padding: "20px",
})

/* 記事のタイトルのスタイル */
export const articleTitle = style({
  fontSize: "24px",
  color: "#333",
})

/* 記事の本文のスタイル */
export const articleContent = style({
  fontSize: "16px",
  lineHeight: "1export const  5",
})

/* フッターのスタイル */
export const footer = style({
  backgroundColor: "#0078d4",
  color: "#fff",
  padding: "10px",
  textAlign: "center",
})

export const containerPostImage = style({
  backgroundColor: "#ffffff",
  display: "block",
  textAlign: "center",
  margin: "auto",
  padding: "10px",
  height: "200px",
  width: "auto",
})

export const postImage = style({
  objectFit: "cover",
  height: "200px",
  width: "auto",
  maxHeight: "100%",
  maxWidth: "auto",
})

export const postDate = style({
  display: "block",
  textAlign: "center",
  margin: "auto",

  marginTop: "40px",
  marginBottom: "20px",
})

export const buttonContainer = style({
  marginBottom: "20px",
  textAlign: "center",
})

/* ボタンの共通スタイル */
export const button = style({
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#363c3f",
  color: "#fff",
  textDecoration: "none",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  textAlign: "center",
  ":hover": {
    backgroundColor: "#474c50",
  },
})

/* 左端のボタン */
export const leftButton = style({
  marginRight: "10px",
})

export const buttonSpace = style({
  width: "100px",
  display: "inline-block",

  "@media": {
    "screen and (max-width: 550px)": {
      display: "none",
    },
  },
})

/* 右端のボタン */
export const rightButton = style({
  marginLeft: "10px",
})
