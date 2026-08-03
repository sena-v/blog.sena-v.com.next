import assert from "node:assert/strict"
import test from "node:test"

import { resolveGa4MeasurementId } from "./ga4.ts"

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
