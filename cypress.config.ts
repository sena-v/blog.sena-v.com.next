import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    supportFile: false,
    specPattern: "**/*.cy.ts",
    screenshotOnRunFailure: false,
    retries: 2,
    viewportHeight: 800,
    viewportWidth: 1200,
  },
})
