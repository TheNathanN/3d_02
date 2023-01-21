import { useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { Suspense } from "react"
import { CameraPosition } from "@/types"
import { useScrollStore, useCameraStore, usePointerStore } from "@/state"

useGLTF.preload("/assets/scene.glb")

const Experience = () => {
  const scene = useGLTF("/assets/scene.glb")
  const scroll = useScroll()
  const cameraCheckpoint = useCameraStore((state) => state.position)
  const setCameraCheckpoint = useCameraStore((state) => state.setPosition)
  const scrollCheckpoint = useScrollStore((state) => state.offset)
  const setScrollCheckpoint = useScrollStore((state) => state.setOffset)
  const pointer = usePointerStore((state) => state.pointer)
  const setPointer = usePointerStore((state) => state.setPointer)

  const cameraCheckpoints: CameraPosition[] = [
    {
      rotation: { x: 6.3, y: 0.84, z: 6.28 },
      position: { x: 5.6, y: 2.0, z: 4.8 },
    },
    {
      rotation: { x: 6.3, y: 0.84, z: 6.28 },
      position: { x: 0.38, y: 2.0, z: -0.42 },
    },
    {
      rotation: { x: 6.3, y: 1.64, z: 6.28 },
      position: { x: 0.32, y: 2.0, z: -0.1 },
    },
    {
      rotation: { x: 6.3, y: 0.16, z: 6.28 },
      position: { x: 0.32, y: 2.0, z: -0.1 },
    },
    {
      rotation: { x: 6.3, y: -1.44, z: 6.28 },
      position: { x: 0.32, y: 2.0, z: -0.1 },
    },
    {
      rotation: { x: 6.3, y: -2.86, z: 6.28 },
      position: { x: 0.32, y: 2.0, z: -0.1 },
    },
  ]

  useFrame(({ camera }) => {
    // Pages
    const { offset, pages } = scroll
    const { position, rotation } = cameraCheckpoints[pointer]
    const offsetRef = offset - scrollCheckpoint

    // Check if we've reached a new checkpoint
    const nextCheckpoint =
      cameraCheckpoints[pointer + 1] ?? cameraCheckpoints[pointer - 1]
    const previousCheckpoint =
      cameraCheckpoints[pointer - 1] ?? cameraCheckpoints[pointer + 1]

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

    /* 
      TODO:
      #1: Debug positionForward
      #2: Debug rotationForward
      #3: Debug positionBackward
      #4: Debug rotationBackward

      Issues with the current implementation:
      - Not able to properly track checkpoints
    */

    const positionForward =
      +cameraPosition.position.x >= +nextCheckpoint.position.x &&
      +cameraPosition.position.y >= +nextCheckpoint.position.y &&
      +cameraPosition.position.z >= +nextCheckpoint.position.z

    console.log("positionForward: ", positionForward)

    const rotationForward =
      +cameraPosition.rotation.x >= +nextCheckpoint.rotation.x &&
      +cameraPosition.rotation.y >= +nextCheckpoint.rotation.y &&
      +cameraPosition.rotation.z >= +nextCheckpoint.rotation.z

    // console.log("rotationForward: ", rotationForward)

    const positionBackward =
      +cameraPosition.position.x <= +previousCheckpoint.position.x &&
      +cameraPosition.position.y <= +previousCheckpoint.position.y &&
      +cameraPosition.position.z <= +previousCheckpoint.position.z

    // console.log("positionBackward: ", positionBackward)

    const rotationBackward =
      +cameraPosition.rotation.x <= +previousCheckpoint.rotation.x &&
      +cameraPosition.rotation.y <= +previousCheckpoint.rotation.y &&
      +cameraPosition.rotation.z <= +previousCheckpoint.rotation.z

    // console.log("rotationBackward: ", rotationBackward)

    // if (positionForward && rotationForward) {
    //   setScrollCheckpoint(offset)
    //   setCameraCheckpoint(nextCheckpoint)
    //   setPointer(pointer + 1)
    // }
    // } else if (positionBackward && rotationBackward) {
    //   setScrollCheckpoint(offset)
    //   setCameraCheckpoint(previousCheckpoint)
    //   setPointer(pointer - 1)
    // }

    console.log(pointer)

    // Control the camera with scroll position
    const offsetPos = -offsetRef * 27
    const newX = cameraCheckpoint.position.x + offsetPos
    const newZ = cameraCheckpoint.position.z + offsetPos

    camera.rotation.set(
      cameraCheckpoint.rotation.x,
      cameraCheckpoint.rotation.y,
      cameraCheckpoint.rotation.z
    )
    camera.position.set(newX, cameraCheckpoint.position.y, newZ)
  })

  return <primitive object={scene.scene} />
}

export default Experience
