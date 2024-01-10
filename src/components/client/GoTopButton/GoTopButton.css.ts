import { style } from "@vanilla-extract/css"

export const container = style({
  position: "fixed",
  zIndex: 3,
  marginTop: "340px",
  marginLeft: "960px",
  width: "10px",
})

export const button = style({
  height: "30px",
  lineHeight: "30px",
  width: "30px",
  textAlign: "center",

  cursor: "pointer",
  marginBottom: "50px",
  backgroundColor: "rgba(255,255,255,0.2)",
  borderRadius: "20px",

  transition: "0.2s",
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.4)",
  },
})
