import { style, globalStyle } from "@vanilla-extract/css"

globalStyle("html, body", {
  textAlign: "left",
  margin: "0px",
})

globalStyle("a", {
  color: "white",
  textDecoration: "none",
})

export const main = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  minHeight: "100vh",
  backgroundColor: "white",
  backgroundImage: "url('/background.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 62% bottom",
  overflow: "hidden",
})

export const title = style({
  maxWidth: "1100px",
  width: "var(--max-width)",
  margin: "10px auto",
  fontFamily: "'Caveat', cursive",
  fontSize: "100px",
  color: "white",
  fontStyle: "bold",
})
export const linkContainer = style({
  maxWidth: "1100px",
  width: "var(--max-width)",
  margin: "4px auto",
  fontFamily: "'Caveat', cursive",
  fontSize: "20px",
  color: "white",
  fontStyle: "bold",

  "@media": {
    "screen and (max-width:1080px)": {
      display: "none",
    },
  },
})

export const link = style({
  margin: "100px",
  color: "white",
})
