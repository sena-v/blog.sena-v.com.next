import assert from "node:assert/strict"
import test from "node:test"

import { buildGa4PageLocation, resolveGa4MeasurementId } from "./ga4.ts"

test("page locationからqueryとfragmentを除外する", () => {
  assert.equal(
    buildGa4PageLocation("https://sena-v.com", "/writings?query=private%20search&tags=React#results"),
    "https://sena-v.com/writings",
  )
  assert.equal(
    buildGa4PageLocation("https://sena-v.com", "/articles/package-manager-node"),
    "https://sena-v.com/articles/package-manager-node",
  )
  assert.equal(
    buildGa4PageLocation("https://sena-v.com", "//attacker.example/secret?query=private"),
    "https://sena-v.com/secret",
  )
})

test("Vercel Productionでは有効なMeasurement IDを返す", () => {
  assert.equal(resolveGa4MeasurementId({ measurementId: "G-ABC123", vercelEnvironment: "production" }), "G-ABC123")
})

test("Previewとローカルでは明示的に有効化しない限り計測しない", () => {
  assert.equal(resolveGa4MeasurementId({ measurementId: "G-ABC123", vercelEnvironment: "preview" }), null)
  assert.equal(resolveGa4MeasurementId({ measurementId: "G-ABC123" }), null)
  assert.equal(resolveGa4MeasurementId({ explicitlyEnabled: "true", measurementId: "G-ABC123" }), "G-ABC123")
})

test("明示的な無効化と不正なMeasurement IDを拒否する", () => {
  assert.equal(
    resolveGa4MeasurementId({
      explicitlyEnabled: "false",
      measurementId: "G-ABC123",
      vercelEnvironment: "production",
    }),
    null,
  )
  assert.equal(
    resolveGa4MeasurementId({
      explicitlyEnabled: "true",
      measurementId: "not-a-measurement-id",
    }),
    null,
  )
})
