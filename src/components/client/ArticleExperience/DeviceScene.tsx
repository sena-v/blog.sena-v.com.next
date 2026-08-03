"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"

import type { ReaderOrientation } from "@/components/article-experience/types"

const DEVICE_WIDTH = 1
const DEVICE_HEIGHT = 2.08623
const LANDSCAPE_SCALE = 1.2369924

type DeviceSceneProps = {
  orientation: ReaderOrientation
  reducedMotion: boolean
  onReady?: () => void
}

function roundedRectangle(width: number, height: number, radius: number) {
  const shape = new THREE.Shape()
  const x = -width / 2
  const y = -height / 2
  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + height - radius)
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  shape.lineTo(x + radius, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)
  return shape
}

function DeviceModel({ orientation, reducedMotion }: DeviceSceneProps) {
  const fitRef = useRef<THREE.Group>(null)
  const orientationRef = useRef<THREE.Group>(null)
  const invalidate = useThree((state) => state.invalidate)
  const bodyGeometry = useMemo(() => {
    const geometry = new THREE.ExtrudeGeometry(roundedRectangle(DEVICE_WIDTH, DEVICE_HEIGHT, 0.108), {
      depth: 0.045,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.012,
      curveSegments: 18,
    })
    geometry.center()
    return geometry
  }, [])
  const screenGeometry = useMemo(
    () => new THREE.ShapeGeometry(roundedRectangle(0.936, DEVICE_HEIGHT - 0.064, 0.076), 18),
    [],
  )
  const islandGeometry = useMemo(
    () => new THREE.ShapeGeometry(roundedRectangle(0.258, 0.064, 0.032), 10),
    [],
  )

  useEffect(() => {
    invalidate()
  }, [invalidate, orientation])

  useEffect(() => () => {
    bodyGeometry.dispose()
    screenGeometry.dispose()
    islandGeometry.dispose()
  }, [bodyGeometry, islandGeometry, screenGeometry])

  useFrame((state, delta) => {
    const fit = fitRef.current
    const oriented = orientationRef.current
    if (!fit || !oriented) return

    const targetZ = orientation === "landscape" ? -Math.PI / 2 : 0
    const targetScale = orientation === "landscape" ? LANDSCAPE_SCALE : 1
    const targetFitScale = orientation === "landscape" ? 1.68 : 0.96

    if (reducedMotion) {
      fit.scale.setScalar(targetFitScale)
      oriented.rotation.z = targetZ
      oriented.scale.setScalar(targetScale)
      return
    }

    const damping = 9
    oriented.rotation.z = THREE.MathUtils.damp(oriented.rotation.z, targetZ, damping, delta)
    const nextScale = THREE.MathUtils.damp(oriented.scale.x, targetScale, damping, delta)
    oriented.scale.setScalar(nextScale)
    const rotationProgress = THREE.MathUtils.clamp(Math.abs(oriented.rotation.z) / (Math.PI / 2), 0, 1)
    const cosine = Math.abs(Math.cos(oriented.rotation.z))
    const sine = Math.abs(Math.sin(oriented.rotation.z))
    const bevelWidth = DEVICE_WIDTH + 0.024
    const bevelHeight = DEVICE_HEIGHT + 0.024
    const rotatedWidth = (bevelWidth * cosine + bevelHeight * sine) * oriented.scale.x
    const rotatedHeight = (bevelWidth * sine + bevelHeight * cosine) * oriented.scale.y
    const exactViewportFit = Math.min(
      state.viewport.width / rotatedWidth,
      state.viewport.height / rotatedHeight,
    )
    const endpointPadding = THREE.MathUtils.lerp(0.97, 0.994, rotationProgress)
    const turnClearance = 1 - Math.sin(Math.PI * rotationProgress) * 0.08
    const animatedFitScale = exactViewportFit * endpointPadding * turnClearance
    const nextFitScale = THREE.MathUtils.damp(fit.scale.x, animatedFitScale, damping, delta)
    fit.scale.setScalar(nextFitScale)

    const moving =
      Math.abs(oriented.rotation.z - targetZ) > 0.0005 ||
      Math.abs(oriented.scale.x - targetScale) > 0.0005 ||
      Math.abs(fit.scale.x - animatedFitScale) > 0.0005
    if (moving) invalidate()
  })

  return (
    <group ref={fitRef}>
      <group ref={orientationRef}>
        <mesh geometry={bodyGeometry} castShadow receiveShadow>
          <meshStandardMaterial color="#0f1116" metalness={0.72} roughness={0.42} />
        </mesh>
        <mesh geometry={screenGeometry} position={[0, 0, 0.043]}>
          <meshBasicMaterial color="#020306" />
        </mesh>
        <mesh geometry={islandGeometry} position={[0, 0.91, 0.05]}>
          <meshBasicMaterial color="#000104" />
        </mesh>
      </group>
    </group>
  )
}

export function DeviceScene({ orientation, reducedMotion, onReady }: DeviceSceneProps) {
  return (
    <Canvas
      className="device-canvas"
      frameloop="demand"
      camera={{ position: [0, 0, 6], near: 0.1, far: 40, fov: 20 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={onReady}
      aria-hidden="true"
    >
      <ambientLight intensity={0.72} />
      <directionalLight position={[3, 5, 8]} intensity={1.35} color="#aeb2bd" castShadow />
      <pointLight position={[-4, -3, 5]} intensity={9} distance={12} color="#ff2f68" />
      <DeviceModel orientation={orientation} reducedMotion={reducedMotion} />
    </Canvas>
  )
}
