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
  transition: "0.2s",

  ":hover": {
    backgroundColor: "#4d4d4d",
  },
})

export const modal = style({
  width: "100%",
  height: "100%",
  position: "fixed",
  backgroundColor: "rgba(0,0,0,0.3)",
  zIndex: 10,
})

export const modalDisabled = style({
  display: "none",
})

const modalHeight = "600px"

export const modalBodyContainer = style({
  height: modalHeight,
  width: "100%",

  display: "flex",
  justifyContent: "center",
})

export const modalBody = style({
  height: modalHeight,
  width: "800px",

  backgroundColor: "white",
  border: "1px solid black",
})

export const modalBodySpaceTop = style({
  height: "180px",
  width: "100%",

  backgroundColor: "transparent",
  border: "none",
  padding: "0",
})

export const modalBodySpaceSide = style({
  height: modalHeight,
  width: "310px",

  backgroundColor: "transparent",
  border: "none",
  padding: "0",
})

export const modalBodySpaceBottom = style({
  height: "400px",
  width: "100%",

  backgroundColor: "transparent",
  border: "none",
  padding: "0",
})
