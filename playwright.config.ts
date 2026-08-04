import { defineConfig, devices } from "@playwright/test"

const serveConfig = (() => {
  if (!process.env.PLAYWRIGHT_BASE_URL)
    return {
      webServer: {
        command: "npm run start",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: !process.env.CI,
      },
    }
})()

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e/playwright",
  // WebGL, focus, and sessionStorage checks share finite browser/GPU resources;
  // running this interaction-heavy file serially avoids cross-page focus and frame contention.
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  timeout: 60 * 1000,

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  ...serveConfig,
})
