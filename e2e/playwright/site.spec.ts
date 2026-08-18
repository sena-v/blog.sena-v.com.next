import { expect, test } from "@playwright/test"

test("desktopの初期HTMLとhydration後でshellとtheme toggleの位置が変わらない", async ({ page }) => {
  await page.setViewportSize({ width: 1619, height: 886 })
  await page.route("**/_next/static/chunks/**", (route) => (
    route.request().resourceType() === "script" ? route.abort() : route.continue()
  ))
  await page.goto("/", { waitUntil: "domcontentloaded" })

  await expect(page.locator("html")).toHaveClass(/js/)
  await expect(page.locator(".hydration-mobile-reader")).toBeHidden()
  await expect(page.locator(".desktop-reader-bootstrap")).toBeVisible()
  const bootstrapLayout = await page.evaluate(() => {
    const device = document.querySelector(".desktop-reader-bootstrap .device-shell")!.getBoundingClientRect()
    const theme = document.querySelector(".bootstrap-reader-header i:last-child")!.getBoundingClientRect()
    const menu = document.querySelector(".bootstrap-reader-header i:first-child")!.getBoundingClientRect()
    const brand = document.querySelector(".bootstrap-reader-header b")!.getBoundingClientRect()
    return {
      device: { x: device.x, y: device.y, width: device.width, height: device.height },
      theme: { x: theme.x, y: theme.y, width: theme.width, height: theme.height },
      menu: { x: menu.x, y: menu.y, width: menu.width, height: menu.height },
      brand: { x: brand.x, y: brand.y, width: brand.width, height: brand.height },
      visibleRatio: (Math.min(device.bottom, innerHeight) - device.top) / device.height,
      overflowX: document.documentElement.scrollWidth - innerWidth,
    }
  })
  expect(bootstrapLayout.device.width).toBeGreaterThanOrEqual(600)
  expect(bootstrapLayout.visibleRatio).toBeGreaterThan(0.63)
  expect(bootstrapLayout.visibleRatio).toBeLessThan(0.65)
  expect(bootstrapLayout.overflowX).toBe(0)

  await page.unroute("**/_next/static/chunks/**")
  for (let attempt = 0; attempt < 5; attempt += 1) {
    await page.reload({ waitUntil: "domcontentloaded" })
    await expect(page.locator(".theme-toggle")).toBeVisible()
    const hydratedLayout = await page.evaluate(() => {
      const device = document.querySelector(".device-shell")!.getBoundingClientRect()
      const theme = document.querySelector(".theme-toggle")!.getBoundingClientRect()
      const menu = document.querySelector(".reader-menu-button span:nth-child(2)")!.getBoundingClientRect()
      const brand = document.querySelector(".reader-brand")!.getBoundingClientRect()
      return {
        device: { x: device.x, y: device.y, width: device.width, height: device.height },
        theme: { x: theme.x, y: theme.y, width: theme.width, height: theme.height },
        menu: { x: menu.x, y: menu.y, width: menu.width, height: menu.height },
        brand: { x: brand.x, y: brand.y, width: brand.width, height: brand.height },
      }
    })
    for (const key of ["x", "y", "width", "height"] as const) {
      expect(Math.abs(hydratedLayout.device[key] - bootstrapLayout.device[key])).toBeLessThan(1)
      expect(Math.abs(hydratedLayout.theme[key] - bootstrapLayout.theme[key])).toBeLessThan(1)
    }
    for (const element of ["menu", "brand"] as const) {
      for (const axis of ["x", "y"] as const) {
        const hydratedCenter = hydratedLayout[element][axis] + hydratedLayout[element][axis === "x" ? "width" : "height"] / 2
        const bootstrapCenter = bootstrapLayout[element][axis] + bootstrapLayout[element][axis === "x" ? "width" : "height"] / 2
        expect(Math.abs(hydratedCenter - bootstrapCenter)).toBeLessThan(1)
      }
    }
  }
})

test("トップページが実記事を中心にしたdesktop readerを表示する", async ({ page }) => {
  await page.setViewportSize({ width: 1619, height: 886 })
  await page.goto("/")

  await expect(page).toHaveTitle(/sena-v\.com/)
  await expect(page.locator(".experience-heading h1")).toContainText("フロントエンドの実装メモ")
  await expect(page.locator(".desktop-experience")).toHaveAttribute("data-orientation", "portrait")
  await expect(page.locator(".article-reader .reader-article-header h1")).toBeVisible()
  await expect(page.locator(".orientation-control")).toHaveCount(1)
  const orientationButton = page.getByRole("button", { name: "横表示へ切り替える" })
  await expect(orientationButton).toBeVisible()
  await expect(orientationButton).not.toHaveAttribute("aria-pressed")
  await expect(orientationButton).toHaveAccessibleDescription("現在は縦表示")
  await expect(page.locator(".reader-menu-button span")).toHaveCount(3)
  expect(await page.locator(".reader-brand-dot").evaluate((element) => ({
    actual: getComputedStyle(element).color,
    expected: getComputedStyle(document.documentElement).getPropertyValue("--accent-active").trim(),
  }))).toEqual({ actual: "rgb(255, 79, 127)", expected: "#ff4f7f" })
  const readerBrand = page.getByRole("button", { name: "記事の先頭へ戻る" })
  const readerScroll = page.locator(".reader-scroll")
  expect(await readerBrand.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize)))
    .toBeGreaterThanOrEqual(17)
  const themeIconCentering = await page.locator(".theme-toggle").evaluate((element) => {
    const knob = element.querySelector(".theme-toggle-knob")!.getBoundingClientRect()
    const icon = element.querySelector(".theme-toggle-knob-icon")!.getBoundingClientRect()
    return {
      x: Math.abs((knob.left + knob.width / 2) - (icon.left + icon.width / 2)),
      y: Math.abs((knob.top + knob.height / 2) - (icon.top + icon.height / 2)),
    }
  })
  expect(themeIconCentering.x).toBeLessThan(0.01)
  expect(themeIconCentering.y).toBeLessThan(0.01)
  const themeButton = page.locator(".theme-toggle")
  await expect(themeButton).not.toHaveAttribute("aria-pressed")
  await expect(themeButton).toHaveAccessibleDescription(/現在は(ダーク|ライト)モード/)
  const visualHierarchy = await page.locator(".device-shell").evaluate((element) => {
    const box = element.getBoundingClientRect()
    const rim = getComputedStyle(element, "::before")
    const screenElement = document.querySelector(".device-screen-layer")!
    const screenBox = screenElement.getBoundingClientRect()
    const screen = getComputedStyle(screenElement)
    const orientationControlBox = document.querySelector(".orientation-control")!.getBoundingClientRect()
    const rightRailBox = document.querySelector(".portrait-side-panel")!.getBoundingClientRect()
    const stageTurnSignal = getComputedStyle(element.parentElement!, "::before")
    const heading = document.querySelector(".experience-heading h1")!
    const kicker = document.querySelector(".experience-kicker")!
    const kickerAccent = getComputedStyle(kicker, "::before")
    return {
      width: box.width,
      top: box.top,
      rim: rim.borderTopColor,
      rimBackground: rim.backgroundImage,
      visibleRatio: (Math.min(box.bottom, innerHeight) - Math.max(box.top, 0)) / box.height,
      controlGaps: {
        deviceToControl: orientationControlBox.left - box.right,
        controlToRail: rightRailBox.left - orientationControlBox.right,
      },
      transform: getComputedStyle(element).transform,
      screenBorder: screen.borderTopWidth,
      radii: {
        outer: Number.parseFloat(rim.borderTopLeftRadius),
        inner: Number.parseFloat(screen.borderTopLeftRadius),
      },
      bezelGaps: [
        screenBox.top - box.top,
        box.right - screenBox.right,
        box.bottom - screenBox.bottom,
        screenBox.left - box.left,
      ],
      rails: {
        left: document.querySelector(".portrait-left-rail")?.getBoundingClientRect().width,
        right: document.querySelector(".portrait-side-panel")?.getBoundingClientRect().width,
      },
      archiveHeight: document.querySelector(".portrait-archive-panel .scroll-index-scroller")?.getBoundingClientRect().height,
      sideLinkFont: Number.parseFloat(getComputedStyle(document.querySelector(".portrait-side-panel .index-copy a")!).fontSize),
      stageTurnSignal: {
        content: stageTurnSignal.content,
        opacity: stageTurnSignal.opacity,
        borderRadius: stageTurnSignal.borderRadius,
      },
      headingHierarchy: {
        titleFont: Number.parseFloat(getComputedStyle(heading).fontSize),
        kickerFont: Number.parseFloat(getComputedStyle(kicker).fontSize),
        accentWidth: Number.parseFloat(kickerAccent.width),
        accentColor: kickerAccent.backgroundColor,
      },
    }
  })
  expect(visualHierarchy.width).toBeGreaterThanOrEqual(600)
  expect(visualHierarchy.top).toBeGreaterThanOrEqual(60)
  expect(visualHierarchy.top).toBeLessThan(70)
  expect(visualHierarchy.visibleRatio).toBeGreaterThan(0.64)
  expect(visualHierarchy.visibleRatio).toBeLessThan(0.66)
  expect(visualHierarchy.controlGaps.deviceToControl).toBeGreaterThanOrEqual(12)
  expect(visualHierarchy.controlGaps.controlToRail).toBeGreaterThanOrEqual(12)
  expect(visualHierarchy.rim).not.toBe("rgba(0, 0, 0, 0)")
  expect(visualHierarchy.transform).not.toBe("none")
  expect(visualHierarchy.screenBorder).toBe("0px")
  expect(Math.max(...visualHierarchy.bezelGaps) - Math.min(...visualHierarchy.bezelGaps)).toBeLessThan(0.5)
  expect(Math.abs(
    visualHierarchy.radii.outer - visualHierarchy.radii.inner - visualHierarchy.bezelGaps[0],
  )).toBeLessThan(0.5)
  expect(visualHierarchy.rails).toEqual({ left: 285, right: 285 })
  expect(visualHierarchy.archiveHeight).toBeGreaterThanOrEqual(560)
  expect(visualHierarchy.sideLinkFont).toBeGreaterThanOrEqual(14)
  expect(visualHierarchy.stageTurnSignal).toEqual({ content: '""', opacity: "0", borderRadius: "50%" })
  expect(visualHierarchy.headingHierarchy.titleFont / visualHierarchy.headingHierarchy.kickerFont).toBeGreaterThan(1.6)
  expect(visualHierarchy.headingHierarchy.accentWidth).toBe(18)
  expect(visualHierarchy.headingHierarchy.accentColor).toBe("rgb(255, 79, 127)")

  await readerScroll.evaluate((element) => { element.scrollTop = 240 })
  expect(await readerScroll.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
  await readerBrand.click()
  await expect.poll(() => readerScroll.evaluate((element) => element.scrollTop)).toBeLessThan(1)

  const orientationControl = page.locator(".orientation-control")
  const orientationRing = orientationControl.locator(".orientation-ring")
  const orientationProgress = orientationRing.locator(".orientation-progress circle")
  expect(await orientationControl.evaluate((element) => ({
    width: element.getBoundingClientRect().width,
    tooltipContent: getComputedStyle(element, "::after").content,
  }))).toEqual({ width: 36, tooltipContent: "none" })
  expect(Number.parseFloat(await orientationProgress.evaluate((element) => (
    getComputedStyle(element).strokeDashoffset
  )))).toBeCloseTo(94, 0)
  await orientationControl.hover()
  await expect.poll(() => orientationProgress.evaluate((element) => Number.parseFloat(
    getComputedStyle(element).strokeDashoffset,
  )), { timeout: 2_000 }).toBeLessThan(94)
  const partialOrientationProgress = Number.parseFloat(await orientationProgress.evaluate((element) => (
    getComputedStyle(element).strokeDashoffset
  )))
  expect(partialOrientationProgress).toBeGreaterThan(60)
  expect(partialOrientationProgress).toBeLessThan(94)
  await expect.poll(() => orientationProgress.evaluate((element) => Number.parseFloat(
    getComputedStyle(element).strokeDashoffset,
  )), { timeout: 6_000 }).toBeLessThan(5)

  const device = page.locator(".device-shell")
  const deviceBox = await device.boundingBox()
  expect(deviceBox).not.toBeNull()
  await page.mouse.move(deviceBox!.x + deviceBox!.width * 0.15, deviceBox!.y + deviceBox!.height / 2)
  await expect.poll(() => device.evaluate((element) => element.style.getPropertyValue("--device-tilt-y"))).toMatch(/^-/)
  expect(Number.parseFloat(await device.evaluate((element) => element.style.getPropertyValue("--device-tilt-y")))).toBeLessThan(-2.2)
  expect(Number.parseFloat(await device.evaluate((element) => element.style.getPropertyValue("--device-highlight-x")))).toBeLessThan(35)
  await expect(page.locator(".desktop-experience")).toHaveAttribute("data-webgl-mode", "webgl")
  await expect(page.locator("canvas")).toHaveCount(1, { timeout: 15_000 })
  expect(await device.evaluate((element) => getComputedStyle(element, "::before").backgroundImage))
    .toContain("rgb(68, 71, 81)")
  await page.mouse.move(0, 0)
  await expect.poll(() => device.evaluate((element) => element.style.getPropertyValue("--device-tilt-y"))).toBe("0.000deg")
  await expect.poll(() => device.evaluate((element) => element.style.getPropertyValue("--device-highlight-x"))).toBe("50.00%")
  const activeDeviceBox = await device.boundingBox()
  expect(activeDeviceBox).not.toBeNull()
  // The shell itself is transformed by the first tilt. Keep the second sample
  // inside its projected surface instead of using the transformed bounding edge.
  await page.mouse.move(
    activeDeviceBox!.x + activeDeviceBox!.width * 0.15,
    activeDeviceBox!.y + activeDeviceBox!.height / 2,
  )
  await expect.poll(() => device.evaluate((element) => element.style.getPropertyValue("--device-tilt-y"))).toMatch(/^-/)
  const rightDeviceBox = await device.boundingBox()
  expect(rightDeviceBox).not.toBeNull()
  await page.mouse.move(
    rightDeviceBox!.x + rightDeviceBox!.width * 0.85,
    rightDeviceBox!.y + rightDeviceBox!.height / 2,
    { steps: 5 },
  )
  await expect.poll(() => device.evaluate((element) => (
    Number.parseFloat(element.style.getPropertyValue("--device-tilt-y")) > 0
  ))).toBe(true)
  expect(Number.parseFloat(await device.evaluate((element) => element.style.getPropertyValue("--device-highlight-x")))).toBeGreaterThan(65)
  await page.waitForTimeout(900)
  expect(Number.parseFloat(await device.evaluate((element) => element.style.getPropertyValue("--device-tilt-y"))))
    .toBeGreaterThan(0)
  await page.mouse.move(0, 0)
  await expect.poll(() => device.evaluate((element) => element.style.getPropertyValue("--device-tilt-y")))
    .toBe("0.000deg")
  const leaveDeviceBox = await device.boundingBox()
  expect(leaveDeviceBox).not.toBeNull()
  await page.mouse.move(
    leaveDeviceBox!.x + leaveDeviceBox!.width * 0.15,
    leaveDeviceBox!.y + leaveDeviceBox!.height / 2,
  )
  await expect.poll(() => device.evaluate((element) => element.style.getPropertyValue("--device-tilt-y"))).toMatch(/^-/)
  await page.mouse.move(0, 0)
  await expect.poll(() => device.evaluate((element) => element.style.getPropertyValue("--device-tilt-y"))).toBe("0.000deg")

  const stageStructure = await page.evaluate(() => {
    const heading = document.querySelector(".experience-heading")?.getBoundingClientRect()
    const device = document.querySelector(".device-shell")?.getBoundingClientRect()
    window.scrollTo(0, 400)
    return {
      bodyOverflow: getComputedStyle(document.body).overflow,
      headingRight: heading?.right,
      deviceLeft: device?.left,
      scrollY: window.scrollY,
      footerVisible: getComputedStyle(document.querySelector(".site-footer")!).display,
    }
  })
  expect(stageStructure.headingRight).toBeLessThan(stageStructure.deviceLeft!)
  expect(stageStructure.bodyOverflow).toBe("clip")
  expect(stageStructure.scrollY).toBe(0)
  expect(stageStructure.footerVisible).toBe("none")

  await page.setViewportSize({ width: 1200, height: 800 })
  await page.waitForTimeout(800)
  const desktopBoundary = await page.evaluate(() => {
    const shell = document.querySelector(".device-shell")!.getBoundingClientRect()
    const control = document.querySelector(".orientation-control")!.getBoundingClientRect()
    const rightRail = document.querySelector(".portrait-side-panel")!.getBoundingClientRect()
    return {
      overflowX: document.documentElement.scrollWidth - innerWidth,
      deviceToControl: control.left - shell.right,
      controlToRail: rightRail.left - control.right,
    }
  })
  expect(desktopBoundary.overflowX).toBe(0)
  expect(desktopBoundary.deviceToControl).toBeGreaterThanOrEqual(12)
  expect(desktopBoundary.controlToRail).toBeGreaterThanOrEqual(12)
})

test("同一比率の端末をuniform scaleで縦横切替し、reader状態を維持する", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1100 })
  await page.goto("/articles/package-manager-node")
  const experience = page.locator(".desktop-experience")
  const device = page.locator(".device-shell")
  const readerScroll = page.locator(".reader-scroll")

  await expect(device).toBeVisible()
  const portraitBox = await device.boundingBox()
  expect(portraitBox).not.toBeNull()
  const portraitLayoutSize = await device.evaluate((element) => {
    const style = getComputedStyle(element)
    return { width: parseFloat(style.width), height: parseFloat(style.height) }
  })
  const initialRimBackground = await device.evaluate((element) => (
    getComputedStyle(element, "::before").backgroundImage
  ))
  expect(Math.abs(portraitLayoutSize.height / portraitLayoutSize.width - 2.08623)).toBeLessThan(0.001)
  await readerScroll.evaluate((element) => { element.scrollTop = 150 })
  const initialScroll = await readerScroll.evaluate((element) => element.scrollTop)
  await page.evaluate(() => {
    type TransitionSample = { state: string | null; ready: string | null; visualVisibility: string; rimVisibility: string; screenVisibility: string }
    const scope = window as typeof window & { __deviceTransitionSamples?: TransitionSample[] }
    const experienceElement = document.querySelector(".desktop-experience")
    const shell = document.querySelector(".device-shell")
    const visual = document.querySelector(".device-visual-layer")
    const screen = document.querySelector(".device-screen-layer")
    if (!experienceElement || !shell || !visual || !screen) return
    scope.__deviceTransitionSamples = []
    const capture = () => scope.__deviceTransitionSamples?.push({
      state: experienceElement.getAttribute("data-transition-state"),
      ready: experienceElement.getAttribute("data-webgl-ready"),
      visualVisibility: getComputedStyle(visual).visibility,
      rimVisibility: getComputedStyle(shell, "::before").visibility,
      screenVisibility: getComputedStyle(screen).visibility,
    })
    new MutationObserver(() => {
      capture()
      requestAnimationFrame(capture)
      window.setTimeout(capture, 140)
    }).observe(experienceElement, {
      attributes: true,
      attributeFilter: ["class", "data-transition-state", "data-webgl-ready"],
    })
  })

  await page.getByRole("button", { name: "横表示へ切り替える" }).click()
  await expect(experience).toHaveAttribute("data-orientation", "landscape")
  await expect(experience).toHaveAttribute("data-webgl-mode", "webgl")
  await expect(page.locator("canvas")).toHaveCount(1, { timeout: 15_000 })
  await expect(experience).toHaveAttribute("data-device-uniform-scale", "1.2369924")
  const portraitReturnButton = page.getByRole("button", { name: "縦表示へ切り替える" })
  await expect(portraitReturnButton).toBeEnabled()
  await expect(portraitReturnButton).toHaveAccessibleDescription("現在は横表示")
  await expect(experience).not.toHaveClass(/is-rotating/, { timeout: 5_000 })
  const transitionSamples = await page.evaluate(() => {
    type TransitionSample = { state: string | null; ready: string | null; visualVisibility: string; rimVisibility: string; screenVisibility: string }
    return (window as typeof window & { __deviceTransitionSamples?: TransitionSample[] }).__deviceTransitionSamples ?? []
  })
  expect(transitionSamples.some((sample) => (
    sample.state === "rotating" &&
    sample.ready === "true" &&
    sample.visualVisibility === "hidden" &&
    sample.rimVisibility === "hidden" &&
    sample.screenVisibility === "hidden"
  )), JSON.stringify(transitionSamples)).toBe(true)
  await page.evaluate(() => window.scrollTo(0, 0))

  const landscapeBox = await device.boundingBox()
  expect(landscapeBox).not.toBeNull()
  const landscapeLayoutSize = await device.evaluate((element) => {
    const style = getComputedStyle(element)
    return { width: parseFloat(style.width), height: parseFloat(style.height) }
  })
  expect(
    Math.abs(landscapeLayoutSize.width / landscapeLayoutSize.height - 2.08623),
    JSON.stringify(landscapeLayoutSize),
  ).toBeLessThan(0.001)
  expect(await readerScroll.evaluate((element) => element.scrollTop)).toBeGreaterThanOrEqual(initialScroll - 4)
  const orientationControlBox = await page.locator(".orientation-control").boundingBox()
  expect(orientationControlBox).not.toBeNull()
  expect(orientationControlBox!.x + orientationControlBox!.width).toBeLessThanOrEqual(1600)
  expect(landscapeBox!.y).toBeGreaterThanOrEqual(60)
  expect(landscapeBox!.y).toBeLessThan(180)
  await expect(page.getByRole("button", { name: "縦表示へ切り替える" })).toBeVisible()
  await expect(page.locator(".landscape-indexes .scroll-index-articles li")).toHaveCount(36)
  await expect(page.locator(".landscape-indexes .scroll-index-popular .index-meta")).toHaveCount(0)
  expect(await page.locator(".landscape-indexes .index-copy a").first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(14)
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.waitForTimeout(300)
  const landscapeReaderType = await page.locator(".article-reader-landscape").evaluate((element) => ({
    prose: Number.parseFloat(getComputedStyle(element.querySelector(".reader-prose")!).fontSize),
    summary: Number.parseFloat(getComputedStyle(element.querySelector(".reader-summary")!).fontSize),
    date: Number.parseFloat(getComputedStyle(element.querySelector(".reader-date")!).fontSize),
    tags: Number.parseFloat(getComputedStyle(element.querySelector(".reader-tags li")!).fontSize),
    tocLabel: Number.parseFloat(getComputedStyle(element.querySelector(".reader-side-notes > p")!).fontSize),
    toc: Number.parseFloat(getComputedStyle(element.querySelector(".reader-side-notes button")!).fontSize),
  }))
  expect(landscapeReaderType.prose).toBeGreaterThanOrEqual(13)
  expect(landscapeReaderType.summary).toBeGreaterThanOrEqual(13)
  expect(landscapeReaderType.date).toBeGreaterThanOrEqual(11)
  expect(landscapeReaderType.tags).toBeGreaterThanOrEqual(10.5)
  expect(landscapeReaderType.tocLabel).toBeGreaterThanOrEqual(11)
  expect(landscapeReaderType.toc).toBeGreaterThanOrEqual(12)

  const reader = page.locator(".article-reader")
  const startedDark = await reader.getAttribute("data-reader-theme") === "dark"
  const nextTheme = startedDark ? "light" : "dark"
  const themeButtonName = startedDark ? "ライトモードへ切り替える" : "ダークモードへ切り替える"
  await page.getByRole("button", { name: themeButtonName }).click()
  await expect(reader).toHaveAttribute("data-reader-theme", nextTheme)
  await expect(page.locator(".theme-toggle")).toHaveAccessibleDescription(
    `現在は${nextTheme === "dark" ? "ダーク" : "ライト"}モード`,
  )
  await page.reload()
  await expect(page.locator(".desktop-experience")).toHaveAttribute("data-orientation", "portrait")
  await expect(page.locator(".article-reader")).toHaveAttribute("data-reader-theme", nextTheme)
  await page.getByRole("button", { name: "横表示へ切り替える" }).click()
  await expect(experience).not.toHaveClass(/is-rotating/, { timeout: 5_000 })
  await page.getByRole("button", { name: "縦表示へ切り替える" }).click()
  await expect(experience).not.toHaveClass(/is-rotating/, { timeout: 5_000 })
  await expect(reader).toHaveAttribute("data-reader-theme", nextTheme)
  expect(await device.evaluate((element) => getComputedStyle(element, "::before").backgroundImage))
    .toBe(initialRimBackground)
})

test("ライトテーマは本文とdrawerの配色を共有し十分な文字コントラストを持つ", async ({ page }) => {
  await page.setViewportSize({ width: 1619, height: 886 })
  await page.goto("/")
  const reader = page.locator(".article-reader")
  const themeToggle = page.locator(".theme-toggle")
  await expect(themeToggle).toBeVisible()
  // DesktopArticleExperience replaces its server fallback during hydration.
  // Wait for that hand-off so the click targets the client-owned control.
  await page.waitForTimeout(600)
  if (await reader.getAttribute("data-reader-theme") !== "light") {
    await themeToggle.click()
  }
  await expect(reader).toHaveAttribute("data-reader-theme", "light")

  const activeToggleCenterDelta = async () => (
    themeToggle.evaluate((element) => {
      const knob = element.querySelector(".theme-toggle-knob")!.getBoundingClientRect()
      const icon = element.querySelector(".theme-toggle-knob-icon")!.getBoundingClientRect()
      return {
        x: Math.abs((knob.left + knob.width / 2) - (icon.left + icon.width / 2)),
        y: Math.abs((knob.top + knob.height / 2) - (icon.top + icon.height / 2)),
      }
    })
  )
  const expectCenteredToggle = (delta: { x: number; y: number }) => {
    expect(delta.x).toBeLessThan(0.01)
    expect(delta.y).toBeLessThan(0.01)
  }
  expectCenteredToggle(await activeToggleCenterDelta())
  await themeToggle.click()
  await expect(reader).toHaveAttribute("data-reader-theme", "dark")
  await expect.poll(async () => (await activeToggleCenterDelta()).x).toBeLessThan(0.01)
  await expect.poll(async () => (await activeToggleCenterDelta()).y).toBeLessThan(0.01)
  expectCenteredToggle(await activeToggleCenterDelta())
  await themeToggle.click()
  await expect(reader).toHaveAttribute("data-reader-theme", "light")
  await page.waitForTimeout(250)

  const contrast = await reader.evaluate((element) => {
    const parse = (value: string) => {
      const normalized = value.trim()
      if (/^#[0-9a-f]{6}$/i.test(normalized)) {
        return [1, 3, 5].map((index) => Number.parseInt(normalized.slice(index, index + 2), 16))
      }
      return normalized.match(/\d+(?:\.\d+)?/g)!.slice(0, 3).map(Number)
    }
    const luminance = (value: string) => {
      const channels = parse(value).map((channel) => {
        const normalized = channel / 255
        return normalized <= 0.04045
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
    }
    const ratio = (foreground: string, background: string) => {
      const lighter = Math.max(luminance(foreground), luminance(background))
      const darker = Math.min(luminance(foreground), luminance(background))
      return (lighter + 0.05) / (darker + 0.05)
    }
    const style = getComputedStyle(element)
    const background = style.getPropertyValue("--reader-bg").trim()
    return {
      background,
      text: ratio(style.getPropertyValue("--reader-text").trim(), background),
      muted: ratio(style.getPropertyValue("--reader-muted").trim(), background),
      link: ratio(style.getPropertyValue("--reader-link").trim(), background),
    }
  })
  expect(contrast.text).toBeGreaterThanOrEqual(12)
  expect(contrast.muted).toBeGreaterThanOrEqual(6)
  expect(contrast.link).toBeGreaterThanOrEqual(5)

  await page.getByRole("button", { name: "目次とメニューを開く" }).click()
  const drawer = page.getByRole("dialog", { name: "読む・探す" })
  await expect(drawer).toBeVisible()
  expect(await drawer.locator(".reader-drawer-inner").evaluate((element) => getComputedStyle(element).backgroundColor))
    .toBe("rgb(251, 248, 243)")
  await expect(drawer.getByRole("button", { name: /モードに切り替える/ })).toHaveCount(0)
  await expect(drawer.locator(".drawer-section-heading span").first()).toHaveCSS("color", "rgb(169, 21, 70)")
})

test("索引はnative scrollとrabbit thumbで操作できる", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 950 })
  await page.goto("/")
  const archive = page.locator(".portrait-archive-panel .scroll-index-scroller")
  const thumb = page.locator(".portrait-archive-panel [role=scrollbar]")

  await expect(archive).toBeVisible()
  await expect(thumb).toBeVisible()
  const rabbitPresentation = await thumb.locator(".rabbit-thumb").evaluate((element) => {
    const icon = getComputedStyle(element)
    const ring = getComputedStyle(element.querySelector(".rabbit-ring")!)
    const glyph = getComputedStyle(element.querySelector(".rabbit-glyph")!)
    const hit = element.parentElement!.getBoundingClientRect()
    return {
      width: parseFloat(icon.width),
      hitWidth: hit.width,
      hitHeight: hit.height,
      ringStroke: ring.stroke,
      ringWidth: ring.strokeWidth,
      glyphFill: glyph.fill,
      glyphStroke: glyph.stroke,
      glyphWidth: glyph.strokeWidth,
    }
  })
  expect(rabbitPresentation.width).toBeGreaterThanOrEqual(30)
  expect(rabbitPresentation.width).toBeLessThanOrEqual(32)
  expect(rabbitPresentation.hitWidth).toBeGreaterThanOrEqual(44)
  expect(rabbitPresentation.hitHeight).toBeGreaterThanOrEqual(44)
  expect(parseFloat(rabbitPresentation.ringWidth)).toBeGreaterThanOrEqual(2)
  expect(rabbitPresentation.ringStroke).not.toBe("none")
  expect(rabbitPresentation.glyphFill).toBe("none")
  expect(rabbitPresentation.glyphStroke).not.toBe("none")
  expect(parseFloat(rabbitPresentation.glyphWidth)).toBeGreaterThanOrEqual(1.4)
  expect(await archive.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true)
  expect(await archive.evaluate((element) => getComputedStyle(element).maskImage)).not.toBe("none")
  await expect(thumb).toHaveAttribute("data-interacting", "false")
  await thumb.focus()
  await thumb.press("ArrowDown")
  await expect(thumb).toHaveAttribute("data-interacting", "true")
  await expect.poll(() => archive.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
  await expect(thumb).toHaveAttribute("data-interacting", "false", { timeout: 1_000 })

  await archive.evaluate((element) => { element.scrollTop = 0 })
  await expect.poll(() => archive.evaluate((element) => element.scrollTop)).toBe(0)
  const thumbBox = await thumb.boundingBox()
  expect(thumbBox).not.toBeNull()
  await page.mouse.move(thumbBox!.x + thumbBox!.width / 2, thumbBox!.y + thumbBox!.height / 2)
  await page.mouse.down()
  await expect(thumb).toHaveAttribute("data-interacting", "true")
  await expect.poll(() => thumb.locator(".rabbit-thumb").evaluate((element) => getComputedStyle(element).transform))
    .not.toBe("none")
  await page.mouse.move(thumbBox!.x + thumbBox!.width / 2, thumbBox!.y + thumbBox!.height / 2 + 80, { steps: 4 })
  await expect.poll(async () => Number(await thumb.getAttribute("aria-valuenow"))).toBeGreaterThan(0)
  await page.mouse.up()
  await expect(thumb).toHaveAttribute("data-interacting", "false")

  await archive.focus()
  await archive.press("End")
  await expect.poll(() => archive.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
  await expect(thumb).toHaveAttribute("aria-valuenow", /[1-9]\d*/)

  const archiveMonth = page.locator(".archive-toggle").nth(1)
  await expect(archiveMonth).toHaveAttribute("aria-expanded", "false")
  const beforeExpandUrl = page.url()
  await archiveMonth.click()
  await expect(archiveMonth).toHaveAttribute("aria-expanded", "true")
  await expect(page.locator(".archive-item").nth(1).locator(".archive-articles a").first()).toBeVisible()
  expect(page.url()).toBe(beforeExpandUrl)
})

test("読了位置はdesktop readerとmobile pageのスクロールに追従する", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 950 })
  await page.goto("/articles/package-manager-node")

  const desktopProgress = page.getByRole("progressbar", { name: "記事の読了位置" })
  await expect(desktopProgress).toHaveAttribute("aria-valuemin", "0")
  await expect(desktopProgress).toHaveAttribute("aria-valuemax", "100")
  await expect(desktopProgress).toHaveAttribute("aria-valuenow", "0")
  await page.locator(".reader-scroll").evaluate((element) => {
    element.scrollTop = (element.scrollHeight - element.clientHeight) / 2
  })
  await expect.poll(async () => Number(await desktopProgress.getAttribute("aria-valuenow")))
    .toBeGreaterThan(40)
  expect(Number(await desktopProgress.getAttribute("aria-valuenow"))).toBeLessThan(60)
  await page.locator(".reader-scroll").evaluate((element) => {
    element.scrollTop = element.scrollHeight
  })
  await expect.poll(async () => Number(await desktopProgress.getAttribute("aria-valuenow")))
    .toBeGreaterThanOrEqual(99)
  await expect.poll(() => desktopProgress.evaluate((element) => (
    new DOMMatrix(getComputedStyle(element).transform).a
  ))).toBeGreaterThanOrEqual(0.99)

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/articles/package-manager-node")
  const mobileProgress = page.getByRole("progressbar", { name: "記事の読了位置" })
  await expect(mobileProgress).toHaveAttribute("aria-valuenow", "0")
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2))
  await expect.poll(async () => Number(await mobileProgress.getAttribute("aria-valuenow")))
    .toBeGreaterThan(5)
  expect(Number(await mobileProgress.getAttribute("aria-valuenow"))).toBeLessThan(95)
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect.poll(async () => Number(await mobileProgress.getAttribute("aria-valuenow")))
    .toBeGreaterThanOrEqual(99)
})

test("関連記事・人気記事・archiveの遷移中にSPレイアウトやthemeへ戻らない", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 950 })

  const startProbe = async () => {
    await page.evaluate(() => {
      const probeWindow = window as typeof window & {
        __experienceProbe?: MutationObserver
        __experienceStates?: Array<{ direct: number; desktop: number; theme: string | null }>
      }
      probeWindow.__experienceStates = []
      const sample = () => {
        probeWindow.__experienceStates!.push({
          direct: document.querySelectorAll(".direct-reader-page").length,
          desktop: document.querySelectorAll(".desktop-experience").length,
          theme: document.querySelector(".article-reader")?.getAttribute("data-reader-theme") ?? null,
        })
      }
      probeWindow.__experienceProbe?.disconnect()
      probeWindow.__experienceProbe = new MutationObserver(sample)
      probeWindow.__experienceProbe.observe(document.documentElement, {
        attributes: true,
        childList: true,
        subtree: true,
      })
      sample()
    })
  }

  const finishProbe = async () => page.evaluate(() => {
    const probeWindow = window as typeof window & {
      __experienceProbe?: MutationObserver
      __experienceStates?: Array<{ direct: number; desktop: number; theme: string | null }>
    }
    probeWindow.__experienceProbe?.disconnect()
    return probeWindow.__experienceStates ?? []
  })

  const assertStableNavigation = async (prepareTarget: () => Promise<ReturnType<typeof page.locator>>) => {
    await page.goto("/articles/package-manager-node")
    await expect(page.locator(".desktop-experience")).toBeVisible()
    const initialTheme = await page.locator(".article-reader").getAttribute("data-reader-theme")
    const target = await prepareTarget()
    await expect(target).toBeVisible()
    const beforeUrl = page.url()
    await startProbe()
    await target.click()
    await expect(page).not.toHaveURL(beforeUrl)
    await expect(page.locator(".desktop-experience")).toBeVisible()
    const states = await finishProbe()
    expect(states.length).toBeGreaterThan(0)
    expect(states.every((state) => state.direct === 0)).toBe(true)
    expect(states.filter((state) => state.theme !== null).every((state) => state.theme === initialTheme)).toBe(true)
  }

  await assertStableNavigation(async () => (
    page.locator('.portrait-side-panel .scroll-index-related a:not([target]):not([aria-current="page"])').first()
  ))
  await assertStableNavigation(async () => (
    page.locator('.portrait-side-panel .scroll-index-popular a:not([target]):not([aria-current="page"])').first()
  ))
  await assertStableNavigation(async () => {
    const archive = page.locator(".portrait-archive-panel .scroll-index-scroller")
    const month = page.locator(".portrait-archive-panel .archive-toggle").nth(1)
    await archive.evaluate((element) => { element.scrollTop = 0 })
    await month.click()
    return page.locator('.portrait-archive-panel .archive-item').nth(1)
      .locator('a:not([target]):not([aria-current="page"])').first()
  })
})

test("2019年archiveは外部リンクを明示し、各記事をseparatorで区切る", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 950 })
  await page.goto("/articles/package-manager-node")
  const archive = page.locator(".portrait-archive-panel .scroll-index-scroller")
  await archive.evaluate((element) => { element.scrollTop = element.scrollHeight })
  const month = page.getByRole("button", { name: /2019\.12/ })
  await month.click()
  const item = month.locator("xpath=..")
  const links = item.locator(".archive-articles li")
  await expect(links).toHaveCount(4)
  await expect(item.locator('.index-external-link[target="_blank"] .index-external-label').first())
    .toHaveText(/外部サイト/)
  expect(await links.nth(1).evaluate((element) => getComputedStyle(element).borderTopWidth)).toBe("1px")
})

test("hamburger drawerはEscapeで閉じ、focusを戻す", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 950 })
  await page.goto("/articles/package-manager-node")
  await page.waitForTimeout(600)
  const trigger = page.getByRole("button", { name: "目次とメニューを開く" })
  const dialog = page.getByRole("dialog", { name: "読む・探す" })
  const device = page.locator(".device-shell")

  const portraitDeviceBox = await device.boundingBox()
  expect(portraitDeviceBox).not.toBeNull()
  await page.mouse.move(
    portraitDeviceBox!.x + portraitDeviceBox!.width * 0.82,
    portraitDeviceBox!.y + portraitDeviceBox!.height * 0.42,
  )
  await expect.poll(() => device.evaluate((element) => element.style.getPropertyValue("--device-tilt-y")))
    .not.toBe("")
  await page.waitForTimeout(50)
  await trigger.hover()
  await expect.poll(() => device.evaluate((element) => element.style.transform))
    .not.toBe("")
  const positionBeforePortraitDrawer = await page.evaluate(() => {
    const shell = document.querySelector<HTMLElement>(".device-shell")!
    const box = shell.getBoundingClientRect()
    return {
      top: box.top,
      left: box.left,
      tiltX: shell.style.getPropertyValue("--device-tilt-x"),
      tiltY: shell.style.getPropertyValue("--device-tilt-y"),
    }
  })

  await trigger.click()
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole("button", { name: "メニューを閉じる" })).toBeFocused()
  await expect(page.getByRole("button", { name: "横表示へ切り替える" })).toBeDisabled()
  await expect.poll(() => page.evaluate(() => {
    const screen = document.querySelector(".device-screen-layer")!.getBoundingClientRect()
    const sheet = document.querySelector(".reader-drawer-inner")!.getBoundingClientRect()
    return Math.abs(sheet.left - screen.left)
  })).toBeLessThan(1)
  const drawerControlPlacement = await page.evaluate(() => {
    const trigger = document.querySelector(".reader-menu-button")!.getBoundingClientRect()
    const close = document.querySelector(".reader-drawer-close")!.getBoundingClientRect()
    const drawer = document.querySelector(".reader-drawer")!.getBoundingClientRect()
    return {
      triggerCenterX: trigger.left + trigger.width / 2,
      closeCenterX: close.left + close.width / 2,
      closeFromLeadingEdge: close.left - drawer.left,
      closeSize: { width: close.width, height: close.height },
    }
  })
  expect(Math.abs(drawerControlPlacement.closeCenterX - drawerControlPlacement.triggerCenterX)).toBeLessThan(16)
  expect(drawerControlPlacement.closeFromLeadingEdge).toBeLessThan(36)
  expect(drawerControlPlacement.closeSize.width).toBeGreaterThanOrEqual(44)
  expect(drawerControlPlacement.closeSize.width).toBeLessThan(46)
  expect(drawerControlPlacement.closeSize.height).toBeGreaterThanOrEqual(44)
  expect(drawerControlPlacement.closeSize.height).toBeLessThan(46)
  const portraitDrawerPlacement = await page.evaluate(() => {
    const screen = document.querySelector(".device-screen-layer")!.getBoundingClientRect()
    const drawer = document.querySelector(".reader-drawer")!.getBoundingClientRect()
    const sheet = document.querySelector(".reader-drawer-inner")!.getBoundingClientRect()
    return {
      leftDelta: Math.abs(drawer.left - screen.left),
      topDelta: Math.abs(drawer.top - screen.top),
      containedRight: drawer.right <= screen.right,
      containedBottom: drawer.bottom <= screen.bottom,
      sheetWidth: sheet.width,
      sheetOverflow: Math.max(screen.left - sheet.left, sheet.right - screen.right, 0),
      deviceTop: document.querySelector(".device-shell")!.getBoundingClientRect().top,
      deviceLeft: document.querySelector(".device-shell")!.getBoundingClientRect().left,
      tiltX: (document.querySelector(".device-shell") as HTMLElement).style.getPropertyValue("--device-tilt-x"),
      tiltY: (document.querySelector(".device-shell") as HTMLElement).style.getPropertyValue("--device-tilt-y"),
      outerScroll: [
        document.documentElement.scrollTop,
        document.body.scrollTop,
        document.querySelector(".desktop-reader-page")!.scrollTop,
        document.querySelector(".desktop-experience")!.scrollTop,
      ],
    }
  })
  expect(portraitDrawerPlacement.leftDelta).toBeLessThan(1)
  expect(portraitDrawerPlacement.topDelta).toBeLessThan(1)
  expect(portraitDrawerPlacement.containedRight).toBe(true)
  expect(portraitDrawerPlacement.containedBottom).toBe(true)
  expect(portraitDrawerPlacement.sheetWidth).toBeGreaterThanOrEqual(350)
  expect(portraitDrawerPlacement.sheetOverflow).toBeLessThan(1)
  expect(Math.abs(portraitDrawerPlacement.deviceTop - positionBeforePortraitDrawer.top)).toBeLessThan(0.5)
  expect(Math.abs(portraitDrawerPlacement.deviceLeft - positionBeforePortraitDrawer.left)).toBeLessThan(0.5)
  expect(Math.abs(Number.parseFloat(portraitDrawerPlacement.tiltX) - Number.parseFloat(positionBeforePortraitDrawer.tiltX)))
    .toBeLessThan(0.1)
  expect(Math.abs(Number.parseFloat(portraitDrawerPlacement.tiltY) - Number.parseFloat(positionBeforePortraitDrawer.tiltY)))
    .toBeLessThan(0.1)
  expect(portraitDrawerPlacement.outerScroll).toEqual([0, 0, 0, 0])
  await expect(dialog.getByRole("heading", { name: "この記事の目次" })).toBeVisible()
  await expect(dialog.getByRole("button", { name: /モードに切り替える/ })).toHaveCount(0)
  await page.keyboard.press("Escape")
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await expect.poll(() => device.evaluate((element) => element.style.transform)).toBe("")
  await expect.poll(() => device.evaluate((element) => ({
    x: element.style.getPropertyValue("--device-tilt-x"),
    y: element.style.getPropertyValue("--device-tilt-y"),
  }))).toEqual({ x: "0.000deg", y: "0.000deg" })
  expect(await page.evaluate(() => [
    document.documentElement.scrollTop,
    document.body.scrollTop,
    document.querySelector(".desktop-reader-page")!.scrollTop,
    document.querySelector(".desktop-experience")!.scrollTop,
  ])).toEqual([0, 0, 0, 0])

  await page.getByRole("button", { name: "横表示へ切り替える" }).click()
  await expect(page.locator(".desktop-experience")).not.toHaveClass(/is-rotating/, { timeout: 5_000 })
  const landscapeGapBeforeDrawer = await page.evaluate(() => (
    document.querySelector(".device-shell")!.getBoundingClientRect().top
      - document.querySelector(".site-header")!.getBoundingClientRect().bottom
  ))
  expect(landscapeGapBeforeDrawer).toBeGreaterThanOrEqual(12)
  const landscapeDeviceBox = await device.boundingBox()
  expect(landscapeDeviceBox).not.toBeNull()
  await page.mouse.move(
    landscapeDeviceBox!.x + landscapeDeviceBox!.width * 0.78,
    landscapeDeviceBox!.y + landscapeDeviceBox!.height * 0.4,
  )
  await expect.poll(() => device.evaluate((element) => element.style.getPropertyValue("--device-tilt-y")))
    .not.toBe("0.000deg")
  await page.waitForTimeout(50)
  await trigger.hover()
  await expect.poll(() => device.evaluate((element) => element.style.transform))
    .not.toBe("")
  const positionBeforeLandscapeDrawer = await device.boundingBox()
  expect(positionBeforeLandscapeDrawer).not.toBeNull()
  await trigger.click()
  await expect(dialog).toBeVisible()
  const lastDrawerLink = dialog.locator('a[href]').last()
  await lastDrawerLink.focus()
  await page.keyboard.press("Tab")
  await expect(dialog.getByRole("button", { name: "メニューを閉じる" })).toBeFocused()
  await expect.poll(() => page.evaluate(() => {
    const screen = document.querySelector(".device-screen-layer")!.getBoundingClientRect()
    const sheet = document.querySelector(".reader-drawer-inner")!.getBoundingClientRect()
    return Math.abs(sheet.left - screen.left)
  })).toBeLessThan(1)
  const landscapeDrawerContained = await page.evaluate(() => {
    const screen = document.querySelector(".device-screen-layer")!.getBoundingClientRect()
    const drawer = document.querySelector(".reader-drawer")!.getBoundingClientRect()
    return drawer.left >= screen.left && drawer.right <= screen.right && drawer.top >= screen.top && drawer.bottom <= screen.bottom
  })
  expect(landscapeDrawerContained).toBe(true)
  const positionAfterLandscapeDrawer = await device.boundingBox()
  expect(positionAfterLandscapeDrawer).not.toBeNull()
  expect(Math.abs(positionAfterLandscapeDrawer!.y - positionBeforeLandscapeDrawer!.y)).toBeLessThan(0.5)
  expect(Math.abs(positionAfterLandscapeDrawer!.x - positionBeforeLandscapeDrawer!.x)).toBeLessThan(0.5)
  await page.keyboard.press("Escape")
  await expect(dialog).not.toBeVisible()
})

test("reduced motionでは短いcrossfadeで切り替える", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.setViewportSize({ width: 1440, height: 950 })
  await page.goto("/")
  const experience = page.locator(".desktop-experience")
  const device = page.locator(".device-shell")

  await expect(device).toHaveAttribute("data-interactive-tilt", "disabled")
  await expect(device).toHaveCSS("transform", "none")

  await page.getByRole("button", { name: "横表示へ切り替える" }).click()
  await expect(experience).toHaveAttribute("data-orientation", "landscape")
  await expect(experience).not.toHaveClass(/is-rotating/, { timeout: 500 })

  await page.goto("/writings")
  const hero = page.locator(".writings-hero")
  await expect(hero).toHaveCSS("animation-name", "none")
  await expect(hero).toHaveCSS("opacity", "1")
  const wordmark = page.getByRole("link", { name: "sena-v.com ホーム" })
  await wordmark.focus()
  await expect(wordmark).toHaveCSS("transform", "none")
  await expect(wordmark.locator("span")).toHaveCSS("transform", "none")
  const timelineTitle = page.locator(".timeline-title").first()
  await timelineTitle.focus()
  const transitionDurationMs = async (element: typeof timelineTitle) => element.evaluate((target) => {
    const value = getComputedStyle(target).transitionDuration.split(",")[0].trim()
    return Number.parseFloat(value) * (value.endsWith("ms") ? 1 : 1_000)
  })
  expect(await transitionDurationMs(timelineTitle)).toBeLessThanOrEqual(1)
  await expect(timelineTitle).toHaveCSS("transform", "none")
  const homeLink = page.locator(".site-header .nav-list a").filter({ hasText: "ホーム" })
  await homeLink.focus()
  expect(await homeLink.evaluate((element) => getComputedStyle(element, "::after").transform)).toBe("none")
  await page.getByRole("button", { name: /タグで絞り込む/ }).click()
  const tagDialog = page.getByRole("dialog", { name: "タグで絞り込む" })
  await expect(tagDialog).toBeVisible()
  expect(await transitionDurationMs(tagDialog)).toBeLessThanOrEqual(1)
})

test("左上ロゴは横向き端末をデフォルトの縦表示へ戻す", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.setViewportSize({ width: 1440, height: 950 })
  await page.goto("/")
  const experience = page.locator(".desktop-experience")

  await page.getByRole("button", { name: "横表示へ切り替える" }).click()
  await expect(experience).toHaveAttribute("data-orientation", "landscape")
  await expect(experience).not.toHaveClass(/is-rotating/, { timeout: 500 })

  await page.getByRole("link", { name: "sena-v.com ホーム" }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(experience).toHaveAttribute("data-orientation", "portrait")
  await expect(experience).not.toHaveClass(/is-rotating/, { timeout: 500 })
})

test("WebGL初期化不能でもCSS shellと記事DOMを表示する", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null
  })
  await page.setViewportSize({ width: 1440, height: 950 })
  await page.goto("/")

  await expect(page.locator(".desktop-experience")).toHaveAttribute("data-webgl-mode", "css-fallback")
  await expect(page.locator(".css-device-fallback")).toBeVisible()
  await expect(page.locator(".reader-article")).toBeVisible()
})

test("実スマートフォン幅ではWebGL bundleを描画せず同じreaderを直接使う", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  await expect(page.locator(".article-reader-mobile")).toBeVisible()
  await expect(page.locator(".desktop-experience")).toHaveCount(0)
  await expect(page.locator("canvas")).toHaveCount(0)
  await expect(page.getByRole("navigation", { name: "メインナビゲーション" })).toBeVisible()
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(hasHorizontalOverflow).toBe(false)

  const decodedScriptSizes = await page.evaluate(() =>
    performance.getEntriesByType("resource")
      .filter((entry) => entry.name.includes("/_next/static/") && entry.name.endsWith(".js"))
      .map((entry) => (entry as PerformanceResourceTiming).decodedBodySize),
  )
  expect(Math.max(...decodedScriptSizes, 0)).toBeLessThan(600_000)

  await page.evaluate(() => window.scrollTo(0, 520))
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  await page.getByRole("button", { name: "記事の先頭へ戻る" }).click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(1)

  await page.getByRole("button", { name: "目次とメニューを開く" }).click()
  const drawer = page.getByRole("dialog", { name: "読む・探す" })
  await expect.poll(async () => (await drawer.boundingBox())?.x ?? Number.MAX_SAFE_INTEGER).toBeLessThanOrEqual(1)
  const drawerBox = await drawer.boundingBox()
  expect(drawerBox).not.toBeNull()
  expect(drawerBox!.width).toBeGreaterThanOrEqual(370)
  await expect(drawer.getByRole("link", { name: "記事一覧" })).toBeVisible()
  await expect(drawer.getByRole("button", { name: /モードに切り替える/ })).toHaveCount(0)
  await expect.poll(async () => {
    const [activeDrawerBox, activeCloseBox] = await Promise.all([
      drawer.boundingBox(),
      drawer.getByRole("button", { name: "メニューを閉じる" }).boundingBox(),
    ])
    return activeDrawerBox && activeCloseBox
      ? activeCloseBox.x - activeDrawerBox.x
      : Number.MAX_SAFE_INTEGER
  }).toBeLessThan(36)
  const mobileCloseBox = await drawer.getByRole("button", { name: "メニューを閉じる" }).boundingBox()
  expect(mobileCloseBox).not.toBeNull()
  expect(mobileCloseBox!.width).toBeGreaterThanOrEqual(43.9)
  expect(mobileCloseBox!.height).toBeGreaterThanOrEqual(43.9)
})

test("旧slug URLを新しい記事URLへ転送する", async ({ page }) => {
  await page.goto("/?slug=next-14-app-router")
  await expect(page).toHaveURL(/\/articles\/next-14-app-router$/)
  await expect(page.locator(".reader-article-header h1")).toContainText("Next14")

  await page.goto("/?slug=..%2Fadmin")
  await expect(page).toHaveURL(/\/?slug=\.\.%2Fadmin$/)

  await page.goto("/projects/blog-reboot")
  await expect(page).toHaveURL(/\/writings$/)
})

test("記事一覧をGETパラメータとarchiveで検索できる", async ({ page }) => {
  await page.goto("/writings?archive=2024-03")
  await expect(page.getByText("2024.03")).toBeVisible()

  await page.getByRole("searchbox", { name: "記事を検索" }).fill("パッケージ")
  await page.getByRole("button", { name: "検索" }).click()
  await expect(page).toHaveURL(/query=%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8/)
  await expect(page.getByText("すべて解除")).toBeVisible()
  await expect(page.locator(".writing-timeline-entry").first()).toBeVisible()
})

test("記事一覧の反復リンクは表示だけでRSCを一括prefetchしない", async ({ page }) => {
  const repeatedLinkPrefetches: string[] = []
  page.on("request", (request) => {
    const requestUrl = new URL(request.url())
    const isRscRequest = request.headers().rsc === "1" || requestUrl.searchParams.has("_rsc")
    const writingsFilterKeys = [...requestUrl.searchParams.keys()].filter((key) => key !== "_rsc")
    const isRepeatedDestination = (
      requestUrl.pathname.startsWith("/articles/")
      || requestUrl.pathname.startsWith("/tags/")
      || (requestUrl.pathname === "/writings" && writingsFilterKeys.length > 0)
    )
    if (isRscRequest && isRepeatedDestination) repeatedLinkPrefetches.push(request.url())
  })

  await page.goto("/writings")
  await page.waitForTimeout(1_800)

  expect(repeatedLinkPrefetches).toEqual([])
})

test("記事一覧で複数タグをAND検索し、個別解除しても他の条件を残せる", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/writings?query=%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8&tag=node&archive=2024-03")
  await page.getByRole("button", { name: /#node/ }).click()
  const tagDialog = page.getByRole("dialog", { name: "タグで絞り込む" })
  await expect(tagDialog.getByRole("checkbox", { name: /node/ })).toBeChecked()
  await tagDialog.getByText("技術", { exact: true }).click()
  await expect(tagDialog.getByRole("checkbox", { name: /技術/ })).toBeChecked()
  await tagDialog.getByRole("button", { name: "タグを適用" }).click()
  await page.waitForURL((url) => url.searchParams.getAll("tag").length === 2)

  expect(new URL(page.url()).searchParams.getAll("tag").sort()).toEqual(["node", "技術"].sort())
  await expect(page.getByRole("link", { name: "nodeのタグ絞り込みを解除" })).toBeVisible()
  await expect(page.getByRole("link", { name: "技術のタグ絞り込みを解除" })).toBeVisible()
  await expect(page.locator(".writing-timeline-entry")).toHaveCount(1)

  await page.getByRole("link", { name: "nodeのタグ絞り込みを解除" }).click()
  await page.waitForURL((url) => url.searchParams.getAll("tag").length === 1)
  expect(new URL(page.url()).searchParams.getAll("tag")).toEqual(["技術"])
  expect(new URL(page.url()).searchParams.get("query")).toBe("パッケージ")
  expect(new URL(page.url()).searchParams.get("archive")).toBe("2024-03")
})

test("記事一覧は未知のarchive値を絞り込み条件として採用しない", async ({ page }) => {
  await page.goto("/writings?archive=../../private")

  const visibleEntries = await page.locator(".writing-timeline-entry").count()
  expect(visibleEntries).toBeGreaterThan(0)
  await expect(page.locator(".filter-bar")).toContainText(`${visibleEntries} / ${visibleEntries} 件`)
  await expect(page.locator('input[name="archive"]')).toHaveCount(0)
  await expect(page.getByRole("link", { name: "すべて解除" })).toHaveCount(0)
})

test("記事一覧とAboutは1280pxの初見で主要内容まで見える密度にする", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto("/writings")
  await expect(page.locator(".writings-hero .eyebrow")).toHaveText(/^WRITINGS \/ 記事数 \d+$/)
  await expect(page.locator(".site-header nav").getByRole("link", { name: "ホーム", exact: true }))
    .toHaveAttribute("href", "/")
  const writingsDensity = await page.evaluate(() => {
    const hero = document.querySelector(".writings-hero")!.getBoundingClientRect()
    const title = document.querySelector(".writings-hero h1")!
    const search = document.querySelector(".writings-page .search-panel")!.getBoundingClientRect()
    const firstEntry = document.querySelector(".writing-timeline-entry")!.getBoundingClientRect()
    return {
      heroHeight: hero.height,
      titleSize: Number.parseFloat(getComputedStyle(title).fontSize),
      searchHeight: search.height,
      firstEntryTop: firstEntry.top,
      tagsOpen: document.querySelector(".tag-filter-popover")!.matches(":popover-open"),
    }
  })
  expect(writingsDensity.heroHeight).toBeLessThan(240)
  expect(writingsDensity.titleSize).toBeLessThanOrEqual(60)
  expect(writingsDensity.searchHeight).toBeLessThanOrEqual(52)
  expect(writingsDensity.firstEntryTop).toBeLessThan(500)
  expect(writingsDensity.tagsOpen).toBe(false)
  const firstEntryTopBeforeTags = writingsDensity.firstEntryTop
  await page.getByRole("button", { name: /タグで絞り込む/ }).click()
  const tagDialog = page.getByRole("dialog", { name: "タグで絞り込む" })
  await expect(tagDialog).toBeVisible()
  const expandedTagLayout = await tagDialog.evaluate((dialog) => {
    const cloud = dialog.querySelector(".tags-cloud")
    const footer = dialog.querySelector(".tag-filter-footer")
    const applyButton = footer?.querySelector("button")
    if (!cloud || !footer || !applyButton) return null

    const originalItems = [...cloud.children]
    const scrollHeightBefore = cloud.scrollHeight
    for (let repeat = 0; repeat < 2; repeat += 1) {
      originalItems.forEach((item) => cloud.append(item.cloneNode(true)))
    }
    cloud.scrollTop = cloud.scrollHeight

    const dialogBox = dialog.getBoundingClientRect()
    const footerBox = footer.getBoundingClientRect()
    const buttonBox = applyButton.getBoundingClientRect()
    return {
      tagCountBefore: originalItems.length,
      tagCountAfter: cloud.children.length,
      scrollHeightBefore,
      scrollHeightAfter: cloud.scrollHeight,
      scrollTop: cloud.scrollTop,
      footerBottomGap: dialogBox.bottom - footerBox.bottom,
      buttonBottomGap: dialogBox.bottom - buttonBox.bottom,
      buttonRightGap: dialogBox.right - buttonBox.right,
    }
  })
  if (!expandedTagLayout) throw new Error("タグpopoverのレイアウト要素を取得できません")
  expect(expandedTagLayout.tagCountAfter).toBe(expandedTagLayout.tagCountBefore * 3)
  expect(expandedTagLayout.scrollHeightAfter).toBeGreaterThan(expandedTagLayout.scrollHeightBefore)
  expect(expandedTagLayout.scrollTop).toBeGreaterThan(0)
  expect(expandedTagLayout.footerBottomGap).toBeGreaterThanOrEqual(0)
  expect(expandedTagLayout.buttonBottomGap).toBeGreaterThanOrEqual(10)
  expect(expandedTagLayout.buttonRightGap).toBeGreaterThanOrEqual(10)
  expect(await page.locator(".writing-timeline-entry").first().evaluate((element) => element.getBoundingClientRect().top))
    .toBeCloseTo(firstEntryTopBeforeTags, 0)
  await page.getByRole("button", { name: "タグ選択を閉じる" }).click()
  await expect(tagDialog).toBeHidden()

  await page.goto("/about")
  await expect(page.locator(".about-policy-grid")).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "日付を変えずに残す" })).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "迷った過程も書く" })).toHaveCount(0)
  const aboutDensity = await page.evaluate(() => {
    const hero = document.querySelector(".about-hero")!.getBoundingClientRect()
    const title = document.querySelector(".about-hero h1")!
    const firstParagraph = document.querySelector(".about-prose p")!.getBoundingClientRect()
    return {
      heroHeight: hero.height,
      titleSize: Number.parseFloat(getComputedStyle(title).fontSize),
      firstParagraphTop: firstParagraph.top,
    }
  })
  expect(aboutDensity.heroHeight).toBeLessThan(270)
  expect(aboutDensity.titleSize).toBeLessThanOrEqual(60)
  expect(aboutDensity.firstParagraphTop).toBeLessThan(500)

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/about")
  const mobileAbout = await page.evaluate(() => {
    const title = document.querySelector(".about-hero h1")!.getBoundingClientRect()
    const history = document.querySelector(".about-history")!.getBoundingClientRect()
    const firstChapter = document.querySelector(".about-chapter-main")!.getBoundingClientRect()
    const links = document.querySelector(".about-links")!.getBoundingClientRect()
    const navigation = document.querySelector(".site-header nav")!.getBoundingClientRect()
    return {
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      titleRight: title.right,
      historyRight: history.right,
      firstChapterRight: firstChapter.right,
      linksRight: links.right,
      navigationRight: navigation.right,
      viewportWidth: window.innerWidth,
    }
  })
  expect(mobileAbout.overflowX).toBe(0)
  expect(mobileAbout.titleRight).toBeLessThan(mobileAbout.viewportWidth)
  expect(mobileAbout.historyRight).toBeLessThan(mobileAbout.viewportWidth)
  expect(mobileAbout.firstChapterRight).toBeLessThan(mobileAbout.viewportWidth)
  expect(mobileAbout.linksRight).toBeLessThan(mobileAbout.viewportWidth)
  expect(mobileAbout.navigationRight).toBeLessThanOrEqual(mobileAbout.viewportWidth)
})

test("記事一覧の動きはhero・wordmark・navigation・記事行・タグ操作に限定する", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto("/writings")

  const hero = page.locator(".writings-hero")
  await expect(hero).toHaveCSS("animation-name", "editorial-enter")
  expect(await hero.evaluate((element) => Number.parseFloat(getComputedStyle(element).animationDuration)))
    .toBeGreaterThan(0)

  const homeLink = page.locator(".site-header .nav-list a").filter({ hasText: "ホーム" })
  const initialUnderline = await homeLink.evaluate((element) => getComputedStyle(element, "::after").transform)
  await homeLink.focus()
  await expect.poll(() => homeLink.evaluate((element) => getComputedStyle(element, "::after").transform))
    .not.toBe(initialUnderline)

  const wordmark = page.getByRole("link", { name: "sena-v.com ホーム" })
  const wordmarkDot = wordmark.locator("span")
  const initialWordmarkTransform = await wordmark.evaluate((element) => getComputedStyle(element).transform)
  const initialDotTransform = await wordmarkDot.evaluate((element) => getComputedStyle(element).transform)
  await wordmark.hover()
  await expect.poll(() => wordmark.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(initialWordmarkTransform)
  await expect.poll(() => wordmarkDot.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(initialDotTransform)
  await page.mouse.move(0, 0)
  await wordmark.focus()
  await expect.poll(() => wordmark.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(initialWordmarkTransform)

  const firstTitle = page.locator(".timeline-title").first()
  const firstEntry = firstTitle.locator("xpath=ancestor::*[contains(@class, 'writing-timeline-entry')]")
  const initialTitleTransform = await firstTitle.evaluate((element) => getComputedStyle(element).transform)
  await firstTitle.hover()
  await expect.poll(() => firstTitle.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(initialTitleTransform)
  await expect.poll(() => firstEntry.evaluate((element) => getComputedStyle(element).backgroundColor))
    .not.toBe("rgba(0, 0, 0, 0)")
  await page.mouse.move(0, 0)
  await firstTitle.focus()
  await expect.poll(() => firstTitle.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(initialTitleTransform)

  await page.getByRole("button", { name: /タグで絞り込む/ }).click()
  const tagDialog = page.getByRole("dialog", { name: "タグで絞り込む" })
  await expect(tagDialog).toBeVisible()
  await expect.poll(() => tagDialog.evaluate((element) => getComputedStyle(element).opacity)).toBe("1")
  expect(await tagDialog.evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration)))
    .toBeGreaterThan(0)
  const tagCheckbox = tagDialog.getByRole("checkbox", { name: /技術/ })
  await tagDialog.getByText("技術", { exact: true }).click()
  await expect(tagCheckbox).toBeChecked()
  await expect.poll(() => tagCheckbox.evaluate((element) => (
    getComputedStyle(element.parentElement!.querySelector(".tag-check")!).opacity
  ))).toBe("1")
  await page.getByRole("button", { name: "タグ選択を閉じる" }).click()
  await expect(tagDialog).toBeHidden()
})

test("ローカル記事にmetadata・構造化データ・目次がある", async ({ page }) => {
  await page.goto("/articles/package-manager-node")

  await expect(page).toHaveTitle(/使用したことのないパッケージマネージャー/)
  await expect(page.locator(".desktop-experience")).toBeVisible()
  await expect(page.locator(".reader-article-header h1")).toContainText("パッケージマネージャー")
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)
  await page.getByRole("button", { name: "目次とメニューを開く" }).click()
  await expect(page.locator(".drawer-list button").first()).toBeVisible()
  await page.getByRole("dialog", { name: "読む・探す" }).getByRole("button", { name: "times-検証" }).click()
  await expect.poll(() => page.evaluate(() => ({
    id: document.activeElement?.id ?? "",
    tag: document.activeElement?.tagName ?? "",
    className: document.activeElement?.className ?? "",
  })), { timeout: 10_000 }).toEqual({ id: "times-検証", tag: "H2", className: "" })
})

test("過去記事の相対画像pathを公開画像へ正規化する", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/articles/firebase-deploy")
  await page.waitForLoadState("networkidle")
  const image = page.locator(".reader-prose img").first()
  await expect(image).toHaveAttribute("srcset", /2020-09-29-01\.png/)
  await image.scrollIntoViewIfNeeded()
  await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
})

test("外部記事を新しいタブへのリンクとして明示する", async ({ page }) => {
  await page.goto("/writings?tag=Angular")
  const externalEntries = page.locator(".writing-timeline-entry")
  await expect(externalEntries).toHaveCount(2)
  await expect(externalEntries.first().locator('a.timeline-title[target="_blank"]')).toHaveAttribute("rel", /noreferrer/)
  await expect(externalEntries.first()).toContainText("Qiita")
  await expect(externalEntries.first().locator(".timeline-external-label")).toHaveText(/外部サイト/)
})

test("RSS・sitemap・robots・production security headersを配信する", async ({ request }) => {
  const home = await request.get("/")
  const csp = home.headers()["content-security-policy"]
  expect(csp).toContain("frame-ancestors 'none'")
  expect(csp).toContain("script-src-attr 'none'")
  expect(csp).toContain("frame-src 'none'")
  expect(csp).toContain("img-src 'self' data: blob:")
  expect(csp).not.toMatch(/img-src[^;]*https:/)
  expect(home.headers()["x-frame-options"]).toBe("DENY")
  expect(home.headers()["x-powered-by"]).toBeUndefined()
  expect(home.headers()["cross-origin-resource-policy"]).toBe("same-origin")
  expect(home.headers()["cross-origin-opener-policy"]).toBe("same-origin")
  const homeHtml = await home.text()
  expect(homeHtml).toContain('property="og:image:width" content="1600"')
  expect(homeHtml).toContain('property="og:image:height" content="1200"')
  const iconHref = /<link rel="icon" href="([^"]*\/icon\.png[^"]*)"/.exec(homeHtml)?.[1]
  expect(iconHref).toBeTruthy()
  const icon = await request.get(iconHref!)
  expect(icon.headers()["content-type"]).toContain("image/png")

  const rss = await request.get("/rss.xml")
  expect(rss.ok()).toBeTruthy()
  expect(rss.headers()["content-type"]).toContain("application/rss+xml")
  expect(await rss.text()).toContain("<rss version=\"2.0\">")

  const sitemap = await request.get("/sitemap.xml")
  expect(sitemap.ok()).toBeTruthy()
  const sitemapXml = await sitemap.text()
  expect(sitemapXml).toContain("/articles/package-manager-node")
  expect(sitemapXml).not.toContain("/articles/blog-reboot-2026")
  expect(sitemapXml.match(/<loc>https:\/\/sena-v\.com<\/loc>\s*<lastmod>/)).toBeNull()

  const robots = await request.get("/robots.txt")
  expect(robots.ok()).toBeTruthy()
  expect(await robots.text()).toContain("Sitemap: https://sena-v.com/sitemap.xml")
})

test("アクセス解析の説明を公開し、ローカルではGA4を読み込まない", async ({ page }) => {
  await page.goto("/privacy")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("アクセス解析について")
  await expect(page.locator('script[src*="googletagmanager.com"]')).toHaveCount(0)
  await expect(page.locator('script[src*="_vercel/speed-insights"]')).toHaveCount(0)
  await expect(page.getByRole("link", { name: "Privacy", exact: true })).toBeVisible()
})
