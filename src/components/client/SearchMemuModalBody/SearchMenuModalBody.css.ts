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
  fontSize: "30px",
  textAlign: "center",

  fontFamily: "'Caveat', cursive",
})

export const selectArea = style({
  margin: "5px 15px",
})

export const submitButtonArea = style({
  textAlign: "center",
})

export const button = style({
  height: "40px",
  width: "230px",

  background: "#333",
  color: "#ccc",
  border: "0",
  fontSize: "14px",
  borderRadius: "4px",
  fontFamily: "'Raleway', sans-serif",
  transition: "0.3s",
  overflow: "hidden",

  ":hover": {
    color: "white",
  },
})

export const tags = style({
  display: "inline-block",
  height: "30px",
})

export const searchResult = style({
  margin: "10px 0px 5px 0px",
  textAlign: "center",
})

export const errorMessage = style({
  height: "50px",
  margin: "0px 0px 5px 0px",

  textAlign: "center",
  fontSize: "14px",
  color: "red",
})
