import React from "react"
import { ScrollControls } from "@react-three/drei"
import Scene from "../Scene"

const Exerience = () => {
  return (
    <>
      <color attach="background" args={["black"]} />

      <ScrollControls pages={5}>
        <Scene />
      </ScrollControls>
    </>
  )
}

export default Exerience
