import React from "react"
import Box from "../Box"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useGLTF, OrbitControls } from "@react-three/drei"

useGLTF.preload("/assets/art_gallery/scene.gltf")

const Scene = () => {
  const scene = useGLTF("/assets/art_gallery/scene.gltf")

  // useFrame(({ camera }) => {
  //   console.log(camera)
  // })

  return (
    <>
      <color attach="background" args={["black"]} />
      <OrbitControls />
      {/* <ambientLight />
      <pointLight position={[10, 10, 10]} /> */}
      {/* <Box position={[-1.2, 0, 0]} /> */}
      <primitive object={scene.scene} />
    </>
  )
}

export default Scene
