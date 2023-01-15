import { Canvas } from "@react-three/fiber"
import Scene from "../Scene"

const CanvasComp = () => {
  return (
    <Canvas
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [6.112394303554678, 2.0016786743249346, 5.398195392152441],
      }}
    >
      <ambientLight />
      <Scene />
    </Canvas>
  )
}

export default CanvasComp
