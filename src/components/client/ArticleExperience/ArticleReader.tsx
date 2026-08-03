"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, type MouseEvent as ReactMouseEvent } from "react"

import { MarkdownArticle } from "@/components/MarkdownArticle"
import type {
  ReaderIndexItem,
  ReaderOrientation,
  ReaderTheme,
  ReaderWriting,
} from "@/components/article-experience/types"
import { extractMarkdownHeadings } from "@/lib/markdown-headings"

type ArticleReaderProps = {
  writing: ReaderWriting
  related: ReaderIndexItem[]
  orientation: ReaderOrientation
  theme: ReaderTheme
  onThemeChange: (theme: ReaderTheme) => void
  onMenuIntentChange?: (active: boolean) => void
  onMenuStateChange?: (open: boolean) => void
  reducedMotion?: boolean
  mobile?: boolean
}

function formatReaderDate(value: string) {
  return value.replaceAll("-", ".")
}

export function ArticleReader({
  writing,
  related,
  orientation,
  theme,
  onThemeChange,
  onMenuIntentChange,
  onMenuStateChange,
  reducedMotion = false,
  mobile = false,
}: ArticleReaderProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const restoreTriggerFocusRef = useRef(true)
  const onMenuStateChangeRef = useRef(onMenuStateChange)
  const headings = useMemo(() => extractMarkdownHeadings(writing.content), [writing.content])

  useEffect(() => {
    onMenuStateChangeRef.current = onMenuStateChange
  }, [onMenuStateChange])

  useEffect(() => {
    const dialog = dialogRef.current
    const handleClose = () => {
      onMenuStateChangeRef.current?.(false)
      const shouldRestoreTrigger = restoreTriggerFocusRef.current
      restoreTriggerFocusRef.current = true
      if (shouldRestoreTrigger) triggerRef.current?.focus({ preventScroll: true })
    }
    const handleDesktopDrawerKeyboard = (event: globalThis.KeyboardEvent) => {
      if (mobile || !dialog?.open) return
      if (event.key === "Escape") {
        event.preventDefault()
        dialog.close()
        return
      }
      if (event.key !== "Tab") return
      const focusable = [...dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter((element) => !element.hidden && element.getClientRects().length > 0)
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) {
        event.preventDefault()
        dialog.focus({ preventScroll: true })
        return
      }
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    }
    dialog?.addEventListener("close", handleClose)
    document.addEventListener("keydown", handleDesktopDrawerKeyboard)
    return () => {
      dialog?.removeEventListener("close", handleClose)
      document.removeEventListener("keydown", handleDesktopDrawerKeyboard)
    }
  }, [mobile])

  function openDrawer() {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    restoreTriggerFocusRef.current = true
    onMenuStateChange?.(true)
    try {
      if (mobile) dialog.showModal()
      else dialog.show()
      dialog.querySelector<HTMLElement>(".reader-drawer-close")?.focus({ preventScroll: true })
    } catch (error) {
      onMenuStateChange?.(false)
      throw error
    }
  }

  function closeDrawer() {
    dialogRef.current?.close()
  }

  function closeDrawerFromSurface(event: ReactMouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeDrawer()
  }

  function navigateToHeading(id: string) {
    const focusHeading = (scroll: boolean) => {
      const heading = contentRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
      if (!heading) return
      if (scroll) heading.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })
      heading.focus({ preventScroll: true })
    }
    const moveToHeading = () => {
      focusHeading(true)
      // Closing the drawer updates parent state and can replace the article DOM.
      // Tasks are reliable in background tabs where animation frames may pause.
      // The delayed guard also wins over a browser's deferred dialog-focus restore
      // without stealing focus back after the visitor has moved elsewhere.
      const restoreHeadingFocus = () => {
        if (document.activeElement === document.body || document.activeElement === triggerRef.current) {
          focusHeading(false)
        }
      }
      window.setTimeout(restoreHeadingFocus, 0)
      window.setTimeout(restoreHeadingFocus, 350)
    }
    const dialog = dialogRef.current
    if (!dialog?.open) {
      moveToHeading()
      return
    }
    // The browser restores dialog focus as part of closing. Start the heading
    // move from the completed close event, then let two frames settle teardown.
    restoreTriggerFocusRef.current = false
    dialog.addEventListener("close", moveToHeading, { once: true })
    dialog.close()
  }

  function scrollReaderToTop() {
    const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth"
    if (mobile) {
      window.scrollTo({ top: 0, behavior })
      return
    }
    contentRef.current?.scrollTo({ top: 0, behavior })
  }

  function handleHeaderSurfaceClick(event: ReactMouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) scrollReaderToTop()
  }

  const nextTheme = theme === "dark" ? "light" : "dark"

  return (
    <section
      className={`article-reader article-reader-${orientation}${mobile ? " article-reader-mobile" : ""}`}
      data-reader-theme={theme}
      aria-label={`${writing.title}の記事reader`}
    >
      <header className="reader-header" onClick={handleHeaderSurfaceClick}>
        <button
          ref={triggerRef}
          className="reader-menu-button"
          type="button"
          onClick={openDrawer}
          onPointerEnter={() => onMenuIntentChange?.(true)}
          onPointerLeave={() => onMenuIntentChange?.(false)}
          onFocus={() => onMenuIntentChange?.(true)}
          onBlur={() => onMenuIntentChange?.(false)}
          aria-haspopup="dialog"
          aria-label="目次とメニューを開く"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <button
          className="reader-brand"
          type="button"
          onClick={scrollReaderToTop}
          aria-label="記事の先頭へ戻る"
          title="記事の先頭へ戻る"
        >
          sena-v<span className="reader-brand-dot">.</span>com
        </button>
        <button
          className="theme-toggle"
          type="button"
          onClick={() => onThemeChange(nextTheme)}
          aria-label={`${nextTheme === "dark" ? "ダーク" : "ライト"}モードへ切り替える`}
          aria-pressed={theme === "dark"}
          title={`${nextTheme === "dark" ? "ダーク" : "ライト"}モードへ`}
        >
          <span className="theme-icon theme-icon-sun" aria-hidden="true">
            <svg viewBox="0 0 16 16" focusable="false">
              <circle cx="8" cy="8" r="2.6" />
              <path d="M8 1.2v2M8 12.8v2M1.2 8h2M12.8 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M12.8 3.2l-1.4 1.4M4.6 11.4l-1.4 1.4" />
            </svg>
          </span>
          <span className="theme-icon theme-icon-moon" aria-hidden="true">
            <svg viewBox="0 0 16 16" focusable="false">
              <circle cx="8" cy="8" r="4.35" />
              <path d="M5.9 6.25h.01M9.85 5.75h.01M9.35 9.65h.01" strokeWidth="2" />
            </svg>
          </span>
          <span className="theme-toggle-knob" aria-hidden="true">
            {theme === "dark" ? (
              <svg className="theme-toggle-knob-icon" viewBox="0 0 16 16" focusable="false">
                <circle cx="8" cy="8" r="4.35" />
                <path d="M5.9 6.25h.01M9.85 5.75h.01M9.35 9.65h.01" strokeWidth="2" />
              </svg>
            ) : (
              <svg className="theme-toggle-knob-icon" viewBox="0 0 16 16" focusable="false">
                <circle cx="8" cy="8" r="2.6" />
                <path d="M8 1.2v2M8 12.8v2M1.2 8h2M12.8 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M12.8 3.2l-1.4 1.4M4.6 11.4l-1.4 1.4" />
              </svg>
            )}
          </span>
        </button>
      </header>

      <div ref={contentRef} className="reader-scroll" tabIndex={0} aria-label="記事本文">
        <div className="reader-layout">
          <article className="reader-article">
            <header className="reader-article-header">
              <p className="reader-date">{formatReaderDate(writing.publishedAt)}</p>
              <h1>{writing.title}</h1>
              <p className="reader-summary">{writing.summary}</p>
              <ul className="reader-tags" aria-label="タグ">
                {writing.tags.slice(0, 5).map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </header>
            <div className="reader-prose">
              <MarkdownArticle content={writing.content} />
            </div>
          </article>

          {orientation === "landscape" && (
            <aside className="reader-side-notes" aria-label="記事の目次">
              <p>目次</p>
              <ol>
                {headings.slice(0, 10).map((heading) => (
                  <li key={heading.id} className={`toc-depth-${heading.depth}`}>
                    <button type="button" onClick={() => heading && navigateToHeading(heading.id)}>{heading.text}</button>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="reader-drawer"
        aria-labelledby="reader-drawer-title"
        onClick={closeDrawerFromSurface}
      >
        <div className="reader-drawer-inner">
          <div className="reader-drawer-head">
            <button className="reader-drawer-close" type="button" onClick={closeDrawer} aria-label="メニューを閉じる">
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
              </svg>
            </button>
            <div>
              <p>READER MENU</p>
              <h2 id="reader-drawer-title">読む・探す</h2>
            </div>
          </div>
          <nav aria-label="サイトナビゲーション">
            <Link href="/">ホーム</Link>
            <Link href="/writings">記事一覧</Link>
            <Link href="/about">このブログについて</Link>
          </nav>
          {headings.length > 0 && (
            <section className="drawer-section drawer-section-toc" aria-labelledby="drawer-toc-heading">
              <div className="drawer-section-heading">
                <h3 id="drawer-toc-heading">この記事の目次</h3>
                <span>{String(headings.length).padStart(2, "0")}</span>
              </div>
              <ol className="drawer-list">
                {headings.map((heading) => (
                  <li key={heading.id} className={`toc-depth-${heading.depth}`}>
                    <button type="button" onClick={() => navigateToHeading(heading.id)}>{heading.text}</button>
                  </li>
                ))}
              </ol>
            </section>
          )}
          <section className="drawer-section drawer-section-related" aria-labelledby="drawer-related-heading">
            <div className="drawer-section-heading">
              <h3 id="drawer-related-heading">関連記事</h3>
              <span>{String(Math.min(related.length, 5)).padStart(2, "0")}</span>
            </div>
            <ul className="drawer-list">
              {related.slice(0, 5).map((item) => (
                <li key={item.id}>
                  {item.external ? (
                    <a className="drawer-external-link" href={item.href} target="_blank" rel="noopener noreferrer">
                      <span>{item.title}</span>
                      <span className="drawer-external-label">
                        外部サイト
                        <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                          <path d="M4.25 2.25h-2v7.5h7.5v-2M6.25 2.25h3.5v3.5M9.5 2.5l-4.25 4.25" />
                        </svg>
                      </span>
                    </a>
                  ) : (
                    <Link href={item.href}>{item.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </dialog>
    </section>
  )
}
