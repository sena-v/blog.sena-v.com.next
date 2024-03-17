import { style } from "@vanilla-extract/css"

const modalHeight = "600px"

export const modalBody = style({
  height: modalHeight,
  width: "800px",

  backgroundColor: "white",
  border: "1px solid black",
})

export const headerButtonContainer = style({
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

export const initButton = style({
  height: "40px",
  width: "100px",

  color: "black",
  backgroundColor: "white",
  border: "0",
  fontSize: "14px",
  borderRadius: "4px",
  fontFamily: "'Raleway', sans-serif",
  transition: "0.3s",
  overflow: "hidden",

  ":hover": {
    fontWeight: "bold",
  },
})

export const modalTitle = style({
  fontSize: "30px",
  textAlign: "center",
})

export const selectAreaContainer = style({
  margin: "15px auto",
})

export const selectArea = style({
  display: "inline-block",
  width: "97%",
  marginLeft: "15px",
})

export const inputTitleWords = style({
  width: "95%",
  height: "20px",

  borderWidth: "0 0 1px 0",
  borderStyle: "solid",
  borderColor: "rgba(0,76,170,0.4)",

  ":focus": {
    outline: "none",
  },
})

export const submitButtonArea = style({
  textAlign: "center",
})

export const headerButtonArea = style({
  display: "inline-block",
})

export const searchButton = style({
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

const commonCheckBoxButtonValue = {
  display: "inline-block",
  height: "30px",
  lineHeight: "30px",
  color: "#FFFFFF",

  padding: "0 10px",
  margin: "2px 2px",

  borderRadius: "15px",
}

export const checkBoxButton = style({
  ...commonCheckBoxButtonValue,

  background: "rgba(0,76,170,0.4)",
})
export const selectedCheckBoxButton = style({
  ...commonCheckBoxButtonValue,

  background: "rgba(0,76,170,1)",
})

export const footerAreaContainer = style({
  margin: "60px auto",
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

  animation: "shake .1s linear infinite",
})

export const label = style({
  display: "inline-block",
  width: "auto",
  maxWidth: "100%",
})
