const ga4MeasurementIdPattern = /^G-[A-Z0-9]+$/

type Ga4Environment = {
  explicitlyEnabled?: string
  measurementId?: string
  vercelEnvironment?: string
}

export function buildGa4PageLocation(origin: string, path: string) {
  const canonicalOrigin = new URL(origin).origin
  const location = new URL(path, origin)
  return `${canonicalOrigin}${location.pathname}`
}

export function resolveGa4MeasurementId({
  explicitlyEnabled,
  measurementId,
  vercelEnvironment,
}: Ga4Environment): string | null {
  const enabled = explicitlyEnabled === "true" || (explicitlyEnabled !== "false" && vercelEnvironment === "production")
  const candidate = measurementId?.trim() ?? ""

  return enabled && ga4MeasurementIdPattern.test(candidate) ? candidate : null
}
