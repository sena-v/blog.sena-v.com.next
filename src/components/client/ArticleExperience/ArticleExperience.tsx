"use client"

import { lazy, Suspense, useLayoutEffect, useState, useSyncExternalStore } from "react"

import type { ArticleExperienceData, ReaderOrientation, ReaderTheme } from "@/components/article-experience/types"
import { ArticleReader } from "./ArticleReader"

const DesktopArticleExperience = lazy(() => import("./DesktopArticleExperience"))
let volatileTheme: ReaderTheme | undefined
const mediaMatchCache = new Map<string, boolean>()

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function trackReaderEvent(name: "theme_change" | "orientation_change", value: string) {
  window.gtag?.("event", name, { reader_state: value })
}

function syncThemePreferenceAttribute(theme?: ReaderTheme) {
  if (theme) {
    document.documentElement.dataset.readerThemePreference = theme
  } else {
    delete document.documentElement.dataset.readerThemePreference
  }
}

function useReaderTheme() {
  const theme = useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia("(prefers-color-scheme: light)")
      const onStorage = () => {
        volatileTheme = undefined
        try {
          const saved = window.localStorage.getItem("sena-v-reader-theme")
          syncThemePreferenceAttribute(saved === "dark" || saved === "light" ? saved : undefined)
        } catch {
          syncThemePreferenceAttribute()
        }
        onChange()
      }
      window.addEventListener("storage", onStorage)
      window.addEventListener("sena-v-theme-change", onChange)
      media.addEventListener("change", onChange)
      return () => {
        window.removeEventListener("storage", onStorage)
        window.removeEventListener("sena-v-theme-change", onChange)
        media.removeEventListener("change", onChange)
      }
    },
    () => {
      if (volatileTheme) return volatileTheme
      try {
        const saved = window.localStorage.getItem("sena-v-reader-theme")
        if (saved === "dark" || saved === "light") return saved
      } catch {
        // Storage may be unavailable in privacy modes.
      }
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
    },
    () => "dark",
  ) as ReaderTheme

  function setTheme(theme: ReaderTheme) {
    volatileTheme = theme
    syncThemePreferenceAttribute(theme)
    try {
      window.localStorage.setItem("sena-v-reader-theme", theme)
    } catch {
      // Theme still changes for this document through the synthetic event below.
    }
    window.dispatchEvent(new Event("sena-v-theme-change"))
    trackReaderEvent("theme_change", theme)
  }

  return [theme, setTheme] as const
}

function useMedia(query: string, initial = false) {
  const [matches, setMatches] = useState(() => mediaMatchCache.get(query) ?? initial)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    const update = () => {
      mediaMatchCache.set(query, media.matches)
      setMatches(media.matches)
    }
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [query])

  return matches
}

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

function DesktopReaderBootstrap({ data }: { data: ArticleExperienceData }) {
  return (
    <div className="desktop-reader-bootstrap-content" aria-hidden="true">
      <section className="desktop-experience desktop-experience-bootstrap">
        <div className="experience-grid">
          <aside className="portrait-left-rail">
            <header className="experience-heading">
              <p className="experience-kicker">SENA-V.COM / READING DESK</p>
              <h1>フロントエンドの実装メモ。</h1>
              <p>TypeScriptやNext.js、個人開発で詰まったことを書いています。</p>
            </header>
            <div className="bootstrap-index">
              <strong>Archive</strong>
              <span />
              <span />
              <span />
              <span />
            </div>
          </aside>

          <div className="device-column">
            <div className="device-shell bootstrap-device-shell">
              <div className="device-screen-layer bootstrap-reader-screen">
                <div className="bootstrap-reader-header">
                  <i />
                  <b>
                    sena-v<span>.</span>com
                  </b>
                  <i />
                </div>
                <div className="bootstrap-reader-copy">
                  <small>{data.writing.publishedAt.replaceAll("-", ".")}</small>
                  <strong>{data.writing.title}</strong>
                  <p>{data.writing.summary}</p>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>

          <aside className="portrait-side-panel bootstrap-side-panel">
            <div className="bootstrap-index">
              <strong>関連記事</strong>
              <span />
              <span />
            </div>
            <div className="bootstrap-index">
              <strong>{data.popularLabel}</strong>
              <span />
              <span />
              <span />
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export function ArticleExperienceClient({ data }: { data: ArticleExperienceData }) {
  const desktop = useMedia("(min-width: 1200px)")
  const landscapeScreen = useMedia("(orientation: landscape)")
  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)")
  const hydrated = useHydrated()
  const [theme, setTheme] = useReaderTheme()
  const mobileOrientation: ReaderOrientation = landscapeScreen ? "landscape" : "portrait"

  if (!desktop) {
    return (
      <>
        <main id="main-content" className="direct-reader-page hydration-mobile-reader">
          <div className="mobile-reader-intro">
            <p>コードと設計、たまにそのほか。</p>
            <span>最新の記事を、そのまま読む。</span>
          </div>
          <ArticleReader
            writing={data.writing}
            related={data.related}
            orientation={mobileOrientation}
            theme={theme}
            onThemeChange={setTheme}
            reducedMotion={reducedMotion}
            mobile
          />
        </main>
        {!hydrated && (
          <div className="desktop-reader-page desktop-reader-bootstrap">
            <DesktopReaderBootstrap data={data} />
          </div>
        )}
      </>
    )
  }

  return (
    <main id="main-content" className="desktop-reader-page">
      <Suspense fallback={<DesktopReaderBootstrap data={data} />}>
        <DesktopArticleExperience
          data={data}
          theme={theme}
          onThemeChange={setTheme}
          reducedMotion={reducedMotion}
          onOrientationChange={(orientation) => trackReaderEvent("orientation_change", orientation)}
        />
      </Suspense>
    </main>
  )
}
