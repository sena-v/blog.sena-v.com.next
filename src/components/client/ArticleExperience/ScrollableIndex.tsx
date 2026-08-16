"use client"

import Link from "next/link"
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"

import type { ReaderIndexItem } from "@/components/article-experience/types"

const RABBIT_THUMB_SIZE = 30
const RABBIT_KEYBOARD_FEEDBACK_DURATION = 280

type ScrollableIndexProps = {
  title: string
  label: string
  items: ReaderIndexItem[]
  variant?: "archive" | "articles" | "related" | "popular"
  compact?: boolean
}

export function ScrollableIndex({
  title,
  label,
  items,
  variant = "articles",
  compact = false,
}: ScrollableIndexProps) {
  const generatedId = useId().replaceAll(":", "")
  const regionId = `scroll-index-${generatedId}`
  const scrollerRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ pointerY: number; scrollTop: number } | null>(null)
  const interactionTimerRef = useRef<number | null>(null)
  const [position, setPosition] = useState({ value: 0, max: 0, ratio: 0 })
  const [isInteracting, setIsInteracting] = useState(false)
  const [expandedArchiveId, setExpandedArchiveId] = useState<string | null>(() =>
    variant === "archive"
      ? items.find((item) => item.children?.some((child) => child.current))?.id ?? null
      : null,
  )

  const updatePosition = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight)
    setPosition({ value: scroller.scrollTop, max, ratio: max > 0 ? scroller.scrollTop / max : 0 })
  }, [])

  useEffect(() => {
    updatePosition()
    const scroller = scrollerRef.current
    if (!scroller || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(updatePosition)
    observer.observe(scroller)
    if (scroller.firstElementChild) observer.observe(scroller.firstElementChild)
    return () => observer.disconnect()
  }, [items, updatePosition])

  useEffect(() => () => {
    if (interactionTimerRef.current !== null) window.clearTimeout(interactionTimerRef.current)
  }, [])

  function scrollByAmount(amount: number) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    scrollerRef.current?.scrollBy({ top: amount, behavior: reduceMotion ? "auto" : "smooth" })
  }

  function handleThumbKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const viewport = scrollerRef.current?.clientHeight ?? 120
    const amounts: Partial<Record<string, number>> = {
      ArrowUp: -42,
      ArrowDown: 42,
      PageUp: -viewport,
      PageDown: viewport,
      Home: -Number.MAX_SAFE_INTEGER,
      End: Number.MAX_SAFE_INTEGER,
    }
    const amount = amounts[event.key]
    if (amount === undefined) return
    event.preventDefault()
    setIsInteracting(true)
    if (interactionTimerRef.current !== null) window.clearTimeout(interactionTimerRef.current)
    interactionTimerRef.current = window.setTimeout(() => {
      interactionTimerRef.current = null
      setIsInteracting(false)
    }, RABBIT_KEYBOARD_FEEDBACK_DURATION)
    scrollByAmount(amount)
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current
    if (!scroller || position.max <= 0) return
    if (interactionTimerRef.current !== null) {
      window.clearTimeout(interactionTimerRef.current)
      interactionTimerRef.current = null
    }
    setIsInteracting(true)
    dragRef.current = { pointerY: event.clientY, scrollTop: scroller.scrollTop }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    const scroller = scrollerRef.current
    const rail = railRef.current
    if (!drag || !scroller || !rail || position.max <= 0) return
    const availableTrack = Math.max(1, rail.clientHeight - RABBIT_THUMB_SIZE)
    scroller.scrollTop = drag.scrollTop + ((event.clientY - drag.pointerY) / availableTrack) * position.max
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    dragRef.current = null
    setIsInteracting(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <section className={`scroll-index scroll-index-${variant}${compact ? " scroll-index-compact" : ""}`} aria-labelledby={`${regionId}-title`}>
      <header className="scroll-index-heading">
        <h2 id={`${regionId}-title`}>{title}</h2>
        <span className={`scroll-index-cue${position.max > 0 ? " is-active" : ""}`} aria-hidden="true">
          <span>SCROLL</span>
          <svg viewBox="0 0 10 14" focusable="false">
            <path d="M5 1v10M2 8l3 3 3-3" />
          </svg>
        </span>
      </header>
      <div className="scroll-index-viewport">
        <div
          ref={scrollerRef}
          id={regionId}
          className="scroll-index-scroller"
          tabIndex={0}
          aria-label={label}
          onScroll={updatePosition}
        >
          <ol>
            {items.map((item) => {
              if (variant === "archive") {
                const expanded = expandedArchiveId === item.id
                const panelId = `${regionId}-${item.id}`
                return (
                  <li key={item.id} className={`archive-item${expanded ? " is-expanded" : ""}`}>
                    <button
                      className="archive-toggle"
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => setExpandedArchiveId(expanded ? null : item.id)}
                    >
                      <span className="archive-month">{item.title}</span>
                      <span className="archive-count">{item.meta}</span>
                      <span className="archive-toggle-mark" aria-hidden="true" />
                    </button>
                    {expanded && (
                      <ul id={panelId} className="archive-articles">
                        {item.children?.map((child) => (
                          <li key={child.id}>
                            <IndexLink item={child} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              }

              return (
                <li key={item.id} className={item.current ? "is-current" : undefined}>
                  {item.rank && <span className="index-rank" aria-label={`${item.rank}位`}>{String(item.rank).padStart(2, "0")}</span>}
                  <div className="index-copy">
                    <IndexLink item={item} />
                    {variant !== "popular" && (item.meta || item.tag) && (
                      <span className="index-meta">{item.meta}{item.meta && item.tag ? " · " : ""}{item.tag}</span>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
        <div ref={railRef} className="scroll-rail" aria-hidden={position.max === 0}>
          <div
            className={`rabbit-thumb-hit${isInteracting ? " is-interacting" : ""}`}
            role="scrollbar"
            tabIndex={position.max > 0 ? 0 : -1}
            aria-controls={regionId}
            aria-label={`${label}のスクロール位置`}
            aria-orientation="vertical"
            aria-valuemin={0}
            aria-valuemax={Math.round(position.max)}
            aria-valuenow={Math.round(position.value)}
            data-interacting={isInteracting ? "true" : "false"}
            style={{ top: `calc(${position.ratio * 100}% - ${position.ratio * RABBIT_THUMB_SIZE}px)` }}
            onKeyDown={handleThumbKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onLostPointerCapture={stopDragging}
          >
            <RabbitThumb />
          </div>
        </div>
      </div>
    </section>
  )
}

function RabbitThumb() {
  return (
    <svg className="rabbit-thumb" viewBox="0 0 30 30" aria-hidden="true" focusable="false">
      <circle className="rabbit-ring" cx="15" cy="15" r="13" />
      <path
        className="rabbit-glyph"
        d="M7.6 21.8c-1.4-.6-1.9-1.9-1.4-3 .4-.9 1.4-1.2 2.3-.7.2-2.4 1.6-4.4 3.9-5.2 1.6-.6 3.1-.5 4.5.1-.8-3.5-.4-6.6 1.3-8.5 1.3 2 1.8 4.8 1.2 7.2 1-2.5 2.3-4.2 3.7-4.7.3 2.5-.4 4.8-2.1 6.4 1.6.5 2.6 1.4 3.1 2.6l1.9.7-2 1.3c-.3 1.4-1.6 2.3-3.5 2.7l1.3 1.9h-3.6l-1.3-1.3c-2.5 1.5-5.6 1.7-9.3.5Z"
      />
    </svg>
  )
}

function IndexLink({ item }: { item: ReaderIndexItem }) {
  return item.external ? (
    <a className="index-external-link" href={item.href} target="_blank" rel="noopener noreferrer">
      <span className="index-link-title">{item.title}</span>
      <span className="index-external-label">
        <span>外部サイト</span>
        <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
          <path d="M4.25 2.25h-2v7.5h7.5v-2M6.25 2.25h3.5v3.5M9.5 2.5l-4.25 4.25" />
        </svg>
      </span>
    </a>
  ) : (
    <Link href={item.href} prefetch={false} aria-current={item.current ? "page" : undefined}>{item.title}</Link>
  )
}
