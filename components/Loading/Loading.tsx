import React from "react"
import { Html, useProgress } from "@react-three/drei"

export default function Loading() {
  const { progress } = useProgress()
  return (
    <>
      <div>{progress.toFixed(0)}% Loading...</div>
    </>
  )
}
