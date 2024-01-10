import { style, globalStyle } from "@vanilla-extract/css"

globalStyle("html, body", {
  textAlign: "left",
  margin: "0px",
})

globalStyle("a", {
  color: "white",
  textDecoration: "none",
})

globalStyle("p", {
  lineHeight: "30px",
})

export const main = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "transparent",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 62% bottom",
  overflow: "hidden",
})

export const backgroundImageContainer = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "auto",
  zIndex: "-1",
})
export const backgroundImage = style({
  width: "100%",
  height: "auto",
  zIndex: "-1",
})

export const title = style({
  maxWidth: "1100px",
  width: "var(--max-width)",
  margin: "10px auto",
  fontSize: "100px",
  color: "white",
  fontStyle: "bold",
})

export const linkContainer = style({
  width: "950px",
  margin: "0px auto",
  fontSize: "20px",
  color: "white",
  fontStyle: "bold",

  display: "flex",

  "@media": {
    "screen and (max-width:1080px)": {
      display: "none",
    },
  },
})

export const postSingleContainer = style({
  width: "950px",
  margin: "0px auto",

  display: "flex",
})

export const link = style({
  height: "35px",
  lineHeight: "35px",
  width: "190px",
  textAlign: "center",
  fontStyle: "bold",

  color: "white",

  transition: "0.2s",

  ":hover": {
    backgroundColor: "rgba(30,30,30,0.2)",
  },
})

export const siteTopButton = style({
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  outline: "none",
  padding: "0",
  font: "inherit",
  color: "inherit",
  appearance: "none",
})
