import { useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { Suspense, useState } from "react"

useGLTF.preload("/assets/scene.glb")

const Experience = () => {
  const scene = useGLTF("/assets/scene.glb")
  const scroll = useScroll()

  const { rotationX, rotationY, rotationZ, positionX, positionY, positionZ } =
    useControls("Camera", {
      rotationX: {
        value: 6.3,
        min: -Math.PI * 2,
        max: Math.PI * 2,
        step: 0.1,
      },
      rotationY: {
        value: 0.84,
        min: -Math.PI * 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      rotationZ: {
        value: 6.28,
        min: -Math.PI * 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      positionX: {
        value: 5.6,
        min: -10,
        max: 10,
        step: 0.01,
      },
      positionY: {
        value: 2.0,
        min: -10,
        max: 10,
        step: 0.1,
      },
      positionZ: {
        value: 4.8,
        min: -10,
        max: 10,
        step: 0.1,
      },
    })

  const offsetCheckpoints = [0.0, 0.2, 0.4, 0.6, 0.8, 1]

  const cameraCheckpoints = [
    {
      rotation: { x: 6.3, y: 0.84, z: 6.28 },
      position: { x: 5.6, y: 2.0, z: 4.8 },
    },
    {
      rotation: { x: 6.3, y: 0.84, z: 6.28 },
      position: { x: 0.38, y: 2.0, z: 0.42 },
    },
    {
      rotation: { x: 6.3, y: 1.64, z: 6.28 },
      position: { x: 0.32, y: 2.0, z: 0.1 },
    },
    {
      rotation: { x: 6.3, y: 0.16, z: 6.28 },
      position: { x: 0.32, y: 2.0, z: 0.1 },
    },
    {
      rotation: { x: 6.3, y: -1.44, z: 6.28 },
      position: { x: 0.32, y: 2.0, z: 0.1 },
    },
    {
      rotation: { x: 6.3, y: -2.86, z: 6.28 },
      position: { x: 0.32, y: 2.0, z: 0.1 },
    },
  ]

  useFrame(({ camera }) => {
    // Pages
    const { offset, pages } = scroll
    const { position, rotation } = cameraCheckpoints[0]

    // Control the camera with scroll position
    const offsetPos = -offset * 27
    const newX = position.x + offsetPos
    const newZ = position.z + offsetPos

    camera.rotation.set(rotationX, rotationY, rotationZ)
    camera.position.set(newX, position.y, newZ)
  })

  return <primitive object={scene.scene} />
}

export default Experience
