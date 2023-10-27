import { atom } from "recoil"

export const selectTagAtom = atom<string>({
  key: "selectTag",
  default: "",
})
