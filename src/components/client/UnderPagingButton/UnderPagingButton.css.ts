import { style } from "@vanilla-extract/css"

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
