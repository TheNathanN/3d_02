import { useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { Suspense } from "react"
import { CameraPosition } from "@/types"
import { useScrollStore, useCameraStore, useSceneStore } from "@/state"
import { cameraCheckpoints } from "@/helpers/cameraCheckpoints"

useGLTF.preload("/assets/scene.glb")

const Experience = () => {
  const scene = useGLTF("/assets/scene.glb")
  const scroll = useScroll()
  const cameraCheckpoint = useCameraStore((state) => state.position)
  const setCameraCheckpoint = useCameraStore((state) => state.setPosition)
  const scrollCheckpoint = useScrollStore((state) => state.offset)
  const setScrollCheckpoint = useScrollStore((state) => state.setOffset)
  const currentScene = useSceneStore((state) => state.scene)
  const setScene = useSceneStore((state) => state.setScene)

  useFrame(({ camera }) => {
    // Pages
    const { offset } = scroll
    const { position, rotation } = cameraCheckpoints[currentScene]
    const offsetRef = offset - scrollCheckpoint

    const nextCheckpoint =
      cameraCheckpoints[currentScene + 1] ?? cameraCheckpoints[currentScene - 1]

    // const previousCheckpoint =
    //   cameraCheckpoints[currentScene - 1] ?? cameraCheckpoints[currentScene + 1]

    const cameraPosition: CameraPosition = {
      rotation: {
        x: +camera.rotation.x.toFixed(2),
        y: +camera.rotation.y.toFixed(2),
        z: +camera.rotation.z.toFixed(2),
      },
      position: {
        x: +camera.position.x.toFixed(2),
        y: +camera.position.y.toFixed(2),
        z: +camera.position.z.toFixed(2),
      },
    }

    // Check which scene we are in so that the camera knows where to go
    if (currentScene === 0) {
      // Control the camera with scroll position
      /* SPEED */
      const offsetPos = -offsetRef * 30
      /* POSITION */
      const newPositionX = cameraCheckpoint.position.x + offsetPos
      const newPositionZ = cameraCheckpoint.position.z + offsetPos

      // Set the camera position and rotation based on new values controlled by scroll
      camera.rotation.set(rotation.x, rotation.y, rotation.z)
      camera.position.set(newPositionX, position.y, newPositionZ)

      // Check if the camera has reached the next checkpoint
      if (
        cameraPosition.position.x <= nextCheckpoint.position.x &&
        cameraPosition.position.z <= nextCheckpoint.position.z
      ) {
        setScene(1)
        setScrollCheckpoint(offset)
        setCameraCheckpoint(nextCheckpoint)
      }
    } else if (currentScene === 1) {
      // Control the camera with scroll position
      /* SPEED */
      const offsetPos = -offsetRef * 10
      /* ROTATION */
      const newRotationY = cameraCheckpoint.rotation.y - offsetPos
      /* POSITION */
      const newPositionX = cameraCheckpoint.position.x + offsetPos

      // Set the camera position and rotation based on new values controlled by scroll
      camera.rotation.set(rotation.x, newRotationY, rotation.z)
      camera.position.set(newPositionX, position.y, position.z)

      // Check if the camera has reached the next checkpoint
      if (
        cameraPosition.rotation.y >= nextCheckpoint.rotation.y &&
        cameraPosition.position.x <= nextCheckpoint.position.x &&
        cameraPosition.position.z >= nextCheckpoint.position.z
      ) {
        setScene(2)
        setScrollCheckpoint(offset)
        setCameraCheckpoint(nextCheckpoint)
      }
    } else if (currentScene === 2) {
      // Control the camera with scroll position
      /* SPEED */
      const offsetPos = -offsetRef * 10
      /* ROTATION */
      const newRotationY = cameraCheckpoint.rotation.y - offsetPos

      // Set the camera position and rotation based on new values controlled by scroll
      camera.rotation.set(rotation.x, newRotationY, rotation.z)
      camera.position.set(
        cameraPosition.position.x,
        cameraPosition.position.y,
        cameraPosition.position.z
      )
    }
  })

  return (
    <Suspense fallback={null}>
      <primitive object={scene.scene} />
    </Suspense>
  )
}

export default Experience
