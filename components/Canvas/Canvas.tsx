import { Canvas } from "@react-three/fiber"
import Experience from "../Experience"
import { Html, Loader } from "@react-three/drei"
import { Suspense } from "react"
import Loading from "../Loading/Loading"

const CanvasComp = () => {
  return (
    <>
      <Canvas
        camera={{
          fov: 75,
          near: 1,
          far: 1000,
          position: [5.559419082866227, 2.9919200717879257, 4.831241119392819],
        }}
      >
        <Suspense
          fallback={
            <Html>
              <Loading />
            </Html>
          }
        >
          <ambientLight />
          <Experience />
        </Suspense>
      </Canvas>
    </>
  )
}

export default CanvasComp
