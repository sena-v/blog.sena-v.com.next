import { caveatFontClass } from "./font.css"

// Expose a static className so CI builds do not depend on remote font downloads.
export const _Caveat = {
  className: caveatFontClass,
} as const
