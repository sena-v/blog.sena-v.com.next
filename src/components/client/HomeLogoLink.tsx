"use client"

import Link from "next/link"
import type { MouseEvent as ReactMouseEvent } from "react"

export const HOME_LOGO_ACTIVATE_EVENT = "sena-v-home-logo-activate"

export function HomeLogoLink() {
  function handleClick(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return

    window.dispatchEvent(new Event(HOME_LOGO_ACTIVATE_EVENT))
  }

  return (
    <Link className="wordmark" href="/" aria-label="sena-v.com ホーム" onClick={handleClick}>
      sena-v<span aria-hidden="true">.</span>com
    </Link>
  )
}
