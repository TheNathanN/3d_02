import React from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, OrbitControls } from "@react-three/drei"
import Box from "../Box"
import { useControls } from "leva"

useGLTF.preload("/assets/scene.glb")

const Scene = () => {
  const scene = useGLTF("/assets/scene.glb")
  const { rotationX, rotationY, rotationZ, positionX, positionY, positionZ } =
    useControls("Camera", {
      rotationX: {
        value: -0.5,
        min: -Math.PI,
        max: Math.PI,
        step: 0.1,
      },
      rotationY: {
        value: 0.8,
        min: -Math.PI,
        max: Math.PI,
        step: 0.01,
      },
      rotationZ: {
        value: 0.38,
        min: -Math.PI,
        max: Math.PI,
        step: 0.01,
      },
      positionX: {
        value: 5.559419082866227,
        min: -10,
        max: 10,
        step: 0.01,
      },
      positionY: {
        value: 2.9919200717879257,
        min: -10,
        max: 10,
        step: 0.1,
      },
      positionZ: {
        value: 4.831241119392819,
        min: -10,
        max: 10,
        step: 0.1,
      },
    })

  useFrame(({ camera }) => {
    camera.position.set(positionX, positionY, positionZ)
    camera.rotation.set(rotationX, rotationY, rotationZ)
  })

  return (
    <>
      <color attach="background" args={["black"]} />
      {/* <ambientLight /> */}
      {/* <pointLight position={[10, 10, 10]} /> */}
      {/* <Box position={[-1.2, 0, 0]} /> */}
      <primitive object={scene.scene} />
    </>
  )
}

export default Scene
