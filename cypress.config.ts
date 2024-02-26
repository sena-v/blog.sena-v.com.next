import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    supportFile: false,
    screenshotOnRunFailure: false,
    retries: 2,
  },
})
