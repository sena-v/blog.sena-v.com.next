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
  inlineSize: "580px",
  whiteSpace: "normal",
  overflowWrap: "break-word",
  margin: "15px auto",
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

export const postNameGrid = style({
  fontSize: "16px",
  fontWeight: "bold",

  verticalAlign: "middle",
  display: "inline-grid",
})

export const postNameID = style({
  fontSize: "16px",
  fontWeight: "normal",
  color: "#8e8c8c",

  verticalAlign: "middle",
})

export const postTextArea = style({
  width: "100%",
  fontSize: "18px",
})

export const iconImage = style({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  marginRight: "10px",
  verticalAlign: "middle",
})

export const foldableThreadContainer = style({
  marginTop: "40px",
})

export const foldableThreadButtonContainer = style({
  width: "100%",
  textAlign: "center",
})

export const foldableThreadButton = style({
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  outline: "none",
  appearance: "none",

  position: "relative",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "0 auto",
  maxWidth: "100px",
  padding: "10px 25px",
  color: "#313131",
  transition: "0.3s ease-in-out",
  fontWeight: 600,

  ":hover": {
    top: "1.5px",
  },

  "::before": {
    position: "absolute",
    content: "",
    width: "100%",
    height: "3px",
    top: "100%",
    left: 0,
    borderRadius: "3px",
    background: "#aeaeae",
    transition: ".5s",
  },
})

export const foldableThreadNone = style({
  border: "1px solid #333",
  height: 0,
  opacity: 0,
  padding: "0 10px",
  transition: ".5s",
  visibility: "hidden",
})

export const foldableThreadVisible = style({
  opacity: 1,
  padding: "10px",
  transition: ".5s",
  visibility: "visible",
})
