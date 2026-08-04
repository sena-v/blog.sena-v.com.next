"use client"

import {
  Component,
  lazy,
  Suspense,
  type ErrorInfo,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"

import type {
  ArticleExperienceData,
  ReaderOrientation,
  ReaderTheme,
} from "@/components/article-experience/types"
import { ArticleReader } from "./ArticleReader"
import { ScrollableIndex } from "./ScrollableIndex"

const DeviceScene = lazy(() => import("./DeviceScene").then((module) => ({ default: module.DeviceScene })))

type DesktopArticleExperienceProps = {
  data: ArticleExperienceData
  theme: ReaderTheme
  onThemeChange: (theme: ReaderTheme) => void
  reducedMotion: boolean
  onOrientationChange: (orientation: ReaderOrientation) => void
}

type NavigatorWithDeviceHints = Navigator & {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

function canUseWebGL() {
  try {
    const navigatorWithHints = navigator as NavigatorWithDeviceHints
    if (navigatorWithHints.connection?.saveData) return false
    if (navigatorWithHints.deviceMemory && navigatorWithHints.deviceMemory <= 2) return false
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) || canvas.getContext("webgl")
    context?.getExtension("WEBGL_lose_context")?.loseContext()
    return Boolean(context)
  } catch {
    return false
  }
}

class WebGLErrorBoundary extends Component<{
  children: ReactNode
  fallback: ReactNode
  onError: () => void
}, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("WebGL device shell failed; using the CSS fallback", error.message, info.componentStack)
    this.props.onError()
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function CssDeviceFallback() {
  return <div className="css-device-fallback" aria-hidden="true"><span /></div>
}

export default function DesktopArticleExperience({
  data,
  theme,
  onThemeChange,
  reducedMotion,
  onOrientationChange,
}: DesktopArticleExperienceProps) {
  const [orientation, setOrientation] = useState<ReaderOrientation>("portrait")
  const [contentOrientation, setContentOrientation] = useState<ReaderOrientation>("portrait")
  const [rotating, setRotating] = useState(false)
  const [webglSupported] = useState(canUseWebGL)
  const [webglActivated, setWebglActivated] = useState(false)
  const [webglReady, setWebglReady] = useState(false)
  const [webglFailed, setWebglFailed] = useState(false)
  const [preparingWebGL, setPreparingWebGL] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const orientationStatusId = useId()
  const timers = useRef<number[]>([])
  const deviceShellRef = useRef<HTMLDivElement>(null)
  const tiltFrame = useRef<number | null>(null)
  const drawerOpenRef = useRef(false)
  const menuIntentRef = useRef(false)
  const tiltTarget = useRef({ x: 0, y: 0, highlightX: 50, highlightY: 14 })
  const pendingOrientation = useRef<ReaderOrientation | null>(null)
  const transitionCleanup = useRef<(() => void) | null>(null)
  const usesWebGL = webglSupported && !webglFailed

  useEffect(() => () => {
    timers.current.forEach(window.clearTimeout)
    transitionCleanup.current?.()
    if (tiltFrame.current !== null) window.cancelAnimationFrame(tiltFrame.current)
  }, [])

  function queueDeviceTilt(x: number, y: number, highlightX = 50, highlightY = 14) {
    tiltTarget.current = { x, y, highlightX, highlightY }
    if (tiltFrame.current !== null) return
    tiltFrame.current = window.requestAnimationFrame(() => {
      tiltFrame.current = null
      const shell = deviceShellRef.current
      if (!shell) return
      shell.style.setProperty("--device-tilt-x", `${tiltTarget.current.x.toFixed(3)}deg`)
      shell.style.setProperty("--device-tilt-y", `${tiltTarget.current.y.toFixed(3)}deg`)
      shell.style.setProperty("--device-highlight-x", `${tiltTarget.current.highlightX.toFixed(2)}%`)
      shell.style.setProperty("--device-highlight-y", `${tiltTarget.current.highlightY.toFixed(2)}%`)
    })
  }

  function resetDeviceTilt() {
    queueDeviceTilt(0, 0)
  }

  function lockDeviceTransform() {
    const shell = deviceShellRef.current
    if (!shell || shell.style.transform) return
    shell.style.transform = getComputedStyle(shell).transform
  }

  function releaseDeviceTransform() {
    deviceShellRef.current?.style.removeProperty("transform")
  }

  function handleDevicePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (
      reducedMotion
      || rotating
      || drawerOpenRef.current
      || menuIntentRef.current
      || event.pointerType === "touch"
    ) return
    releaseDeviceTransform()
    activateWebGL()
    const rect = event.currentTarget.getBoundingClientRect()
    const horizontal = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1))
    const vertical = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1))
    queueDeviceTilt(
      vertical * -2.4,
      horizontal * 3.8,
      50 + horizontal * 36,
      Math.max(8, Math.min(48, 18 + vertical * 28)),
    )
  }

  function handleDevicePointerLeave() {
    if (drawerOpenRef.current) return
    releaseDeviceTransform()
    resetDeviceTilt()
  }

  function handleMenuStateChange(open: boolean) {
    drawerOpenRef.current = open
    setDrawerOpen(open)
    if (open) {
      lockDeviceTransform()
      return
    }
    releaseDeviceTransform()
    resetDeviceTilt()
  }

  function handleMenuIntentChange(active: boolean) {
    menuIntentRef.current = active
    if (active) {
      lockDeviceTransform()
      return
    }
    if (!drawerOpenRef.current) releaseDeviceTransform()
  }

  function startOrientationChange(next: ReaderOrientation, lightweight = false) {
    transitionCleanup.current?.()
    transitionCleanup.current = null
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    const contentDelay = reducedMotion || lightweight ? 0 : 320

    setRotating(true)
    setOrientation(next)
    onOrientationChange(next)

    timers.current.push(window.setTimeout(() => setContentOrientation(next), contentDelay))
    if (reducedMotion || lightweight) {
      timers.current.push(window.setTimeout(() => setRotating(false), 150))
      return
    }

    const shell = deviceShellRef.current
    let settled = false
    let fallbackTimer = 0
    let settleFrame = 0
    const endedProperties = new Set<string>()
    const targetAspectRatio = next === "landscape" ? 2.08623 : 1 / 2.08623
    const finish = () => {
      if (settled) return
      settled = true
      shell?.removeEventListener("transitionend", handleTransitionEnd)
      window.clearTimeout(fallbackTimer)
      window.cancelAnimationFrame(settleFrame)
      timers.current = timers.current.filter((timer) => timer !== fallbackTimer)
      transitionCleanup.current = null
      setRotating(false)
    }
    const waitForFinalLayout = () => {
      settleFrame = 0
      if (!shell) {
        finish()
        return
      }
      const style = getComputedStyle(shell)
      const width = Number.parseFloat(style.width)
      const height = Number.parseFloat(style.height)
      if (height > 0 && Math.abs(width / height - targetAspectRatio) < 0.001) {
        finish()
        return
      }
      settleFrame = window.requestAnimationFrame(waitForFinalLayout)
    }
    const finishAfterPaint = () => {
      if (!settleFrame) settleFrame = window.requestAnimationFrame(waitForFinalLayout)
    }
    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== shell || (event.propertyName !== "width" && event.propertyName !== "height")) return
      endedProperties.add(event.propertyName)
      if (endedProperties.has("width") && endedProperties.has("height")) finishAfterPaint()
    }
    shell?.addEventListener("transitionend", handleTransitionEnd)
    fallbackTimer = window.setTimeout(finish, 5_000)
    timers.current.push(fallbackTimer)
    transitionCleanup.current = () => {
      settled = true
      shell?.removeEventListener("transitionend", handleTransitionEnd)
      window.clearTimeout(fallbackTimer)
      window.cancelAnimationFrame(settleFrame)
    }
  }

  function handleWebGLReady() {
    setWebglReady(true)
    const pending = pendingOrientation.current
    if (!pending) return
    pendingOrientation.current = null
    setPreparingWebGL(false)
    startOrientationChange(pending)
  }

  function handleWebGLFailure() {
    setWebglFailed(true)
    setWebglReady(false)
    const pending = pendingOrientation.current
    pendingOrientation.current = null
    setPreparingWebGL(false)
    if (pending) {
      startOrientationChange(pending, true)
      return
    }
    transitionCleanup.current?.()
    transitionCleanup.current = null
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    setContentOrientation(orientation)
    setRotating(false)
  }

  function switchOrientation() {
    if (rotating || preparingWebGL || drawerOpenRef.current) return
    releaseDeviceTransform()
    resetDeviceTilt()
    const next: ReaderOrientation = orientation === "portrait" ? "landscape" : "portrait"
    if (reducedMotion || !usesWebGL) {
      startOrientationChange(next, true)
      return
    }
    if (!webglReady) {
      pendingOrientation.current = next
      setPreparingWebGL(true)
      setWebglActivated(true)
      return
    }
    startOrientationChange(next)
  }

  const nextOrientation = orientation === "portrait" ? "landscape" : "portrait"
  const nextLabel = nextOrientation === "landscape" ? "横" : "縦"
  const webglMode = usesWebGL ? (webglActivated ? "webgl" : "deferred") : "css-fallback"

  function activateWebGL() {
    if (usesWebGL) setWebglActivated(true)
  }

  return (
    <section
      className={`desktop-experience is-${orientation}${rotating ? " is-rotating" : ""}`}
      data-orientation={orientation}
      data-device-aspect-ratio="2.08623"
      data-device-uniform-scale={orientation === "landscape" ? "1.2369924" : "1"}
      data-webgl-mode={webglMode}
      data-webgl-ready={webglReady ? "true" : "false"}
      data-transition-state={preparingWebGL ? "preparing" : rotating ? "rotating" : "idle"}
    >
      <div className="experience-grid">
        <aside className="portrait-left-rail">
          <header className="experience-heading">
            <p className="experience-kicker">SENA-V.COM / READING DESK</p>
            <h1>フロントエンドの実装メモ。</h1>
            <p>TypeScriptやNext.js、個人開発で詰まったことを書いています。</p>
          </header>
          <div className="portrait-archive-panel">
            <ScrollableIndex title="Archive" label="年月別の記事archive" items={data.archive} variant="archive" />
          </div>
        </aside>

        <div
          className="device-column"
          onPointerEnter={activateWebGL}
          onPointerLeave={handleDevicePointerLeave}
          onFocusCapture={activateWebGL}
        >
          <div
            className="device-shell"
            ref={deviceShellRef}
            onPointerMove={handleDevicePointerMove}
            onPointerLeave={handleDevicePointerLeave}
            data-interactive-tilt={reducedMotion ? "disabled" : "enabled"}
          >
            <div className="device-visual-layer">
              {webglActivated ? (
                <WebGLErrorBoundary fallback={<CssDeviceFallback />} onError={handleWebGLFailure}>
                  <Suspense fallback={<CssDeviceFallback />}>
                    <DeviceScene
                      orientation={orientation}
                      reducedMotion={reducedMotion}
                      onReady={handleWebGLReady}
                    />
                  </Suspense>
                </WebGLErrorBoundary>
              ) : (
                <CssDeviceFallback />
              )}
            </div>
            <div className="device-screen-layer">
              <ArticleReader
                writing={data.writing}
                related={data.related}
                orientation={contentOrientation}
                theme={theme}
                onThemeChange={onThemeChange}
                onMenuIntentChange={handleMenuIntentChange}
                onMenuStateChange={handleMenuStateChange}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>
          <button
            className="orientation-control"
            type="button"
            onClick={switchOrientation}
            onPointerEnter={activateWebGL}
            onFocus={activateWebGL}
            disabled={rotating || preparingWebGL || drawerOpen}
            aria-busy={rotating || preparingWebGL}
            aria-label={`${nextLabel}表示へ切り替える`}
            aria-describedby={orientationStatusId}
          >
            <span className={`orientation-ring orientation-target-${nextOrientation}`} aria-hidden="true">
              <svg className="orientation-progress" viewBox="0 0 32 32" focusable="false">
                <circle cx="16" cy="16" r="14.5" pathLength="100" />
              </svg>
              <span className="orientation-phone" />
            </span>
            <span className="orientation-label" aria-hidden="true">{nextLabel}</span>
          </button>
          <span id={orientationStatusId} className="orientation-status sr-only" aria-live="polite">
            {preparingWebGL
              ? "端末表示を準備中"
              : rotating
                ? `${orientation === "portrait" ? "縦" : "横"}表示へ切り替え中`
                : `現在は${orientation === "portrait" ? "縦" : "横"}表示`}
          </span>
        </div>

        <aside className="portrait-side-panel">
          <ScrollableIndex title="関連記事" label="関連記事" items={data.related} variant="related" compact />
          <ScrollableIndex title={data.popularLabel} label={data.popularLabel} items={data.popular} variant="popular" compact />
        </aside>

        <div className="landscape-indexes">
          <ScrollableIndex title="記事一覧" label="公開日の新しい順の記事一覧" items={data.allArticles} variant="articles" />
          <ScrollableIndex title="関連記事" label="関連記事" items={data.related} variant="related" />
          <ScrollableIndex title={data.popularLabel} label={data.popularLabel} items={data.popular} variant="popular" />
        </div>
      </div>
      {!webglSupported && <p className="webgl-fallback-note">省電力設定に合わせ、軽量な2D端末表示を使用しています。</p>}
    </section>
  )
}
