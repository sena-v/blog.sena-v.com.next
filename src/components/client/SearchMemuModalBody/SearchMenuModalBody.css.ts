import { style } from "@vanilla-extract/css"

const modalHeight = "600px"

export const modalBody = style({
  margin: "0 auto",
  height: modalHeight,
  width: "800px",

  backgroundColor: "white",
  border: "1px solid black",
})

export const closeButtonArea = style({
  textAlign: "right",
})

export const closeButton = style({
  height: "35px",
  width: "35px",

  margin: "5px",
  borderRadius: "50%",

  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  outline: "none",
  padding: "0",
  font: "inherit",
  color: "inherit",
  appearance: "none",

  transition: "0.3s",

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    transform: "rotate(180deg)",
  },
})

export const modalTitle = style({
  fontSize: "20px",
  textAlign: "center",
})

export const searchResult = style({
  margin: "10px auto",
  textAlign: "center",
})

export const errorMessage = style({
  margin: "20px auto",
  textAlign: "center",
  color: "red",
})
