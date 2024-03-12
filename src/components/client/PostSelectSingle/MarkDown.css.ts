import { style } from "@vanilla-extract/css"

export const codeContainer = style({
  display: "inline-flex",
  alignItems: "center",
  position: "relative",
  top: "-2px",
})
export const code = style({
  color: "#FFFFFF",
  backgroundColor: "#1E1E1E",
  borderRadius: "4px",
  lineHeight: "25px",
  padding: "0 5px",
  margin: "0 2px",
})

export const postContainer = style({
  height: "200px",
  inlineSize: "850px",
  wordBreak: "break-all",
  overflowWrap: "break-word",
})
export const postName = style({
  width: "100%",
})
export const postText = style({
  width: "100%",
})
