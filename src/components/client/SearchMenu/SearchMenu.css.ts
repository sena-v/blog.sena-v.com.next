import { style } from "@vanilla-extract/css"

export const button = style({
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  outline: "none",
  padding: "0",
  font: "inherit",
  color: "inherit",
  appearance: "none",
})

export const foldableMenu = style({
  height: "35px",
  lineHeight: "35px",
  width: "190px",
  textAlign: "center",
  fontStyle: "bold",

  color: "white",
  backgroundColor: "#3d3d3d",

  cursor: "pointer",
})
