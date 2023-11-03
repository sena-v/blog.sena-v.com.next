/** @type {import('next').NextConfig} */

const withInterceptStdout = require("next-intercept-stdout")
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin")

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig = {
  reactStrictMode: true,
}

module.exports = withVanillaExtract(
  withInterceptStdout(nextConfig, (text) => (text.includes("Duplicate atom key") ? "" : text)),
)
