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
  height: "auto",
  inlineSize: "530px",
  whiteSpace: "normal",
  overflowWrap: "break-word",
  margin: "10px auto",
  padding: "12px",

  border: "1px solid #b0b0b0",
  borderRadius: "12px",

  fontSize: "17px",
  fontFamily: "Helvetica",
})
export const postNameArea = style({
  height: "50px",
  width: "100%",
  paddingBottom: "10px",
})
export const postTextArea = style({
  width: "100%",
  fontSize: "20px",
})

export const iconImage = style({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  marginRight: "10px",
  verticalAlign: "middle",
})
