import { atom } from "recoil"

export const cameraState = atom({
  key: "cameraState",
  default: {
    position: {
      x: 5.6,
      y: 2.1,
      z: 4.8,
    },
    rotation: { x: 6.3, y: 0.8, z: 6.28 },
  },
})

export const pageState = atom({
  key: "pageState",
  default: 0,
})
