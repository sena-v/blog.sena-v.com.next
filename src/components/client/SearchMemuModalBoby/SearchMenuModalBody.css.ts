import { style } from "@vanilla-extract/css"

const modalHeight = "600px"

export const modalBody = style({
  margin: "0 auto",
  height: modalHeight,
  width: "800px",

  backgroundColor: "white",
  border: "1px solid black",
})
