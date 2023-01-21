import { create } from "zustand"
import { CameraPosition } from "./types"

// Store Types
interface CameraStore {
  position: CameraPosition
  setPosition: (position: CameraPosition) => void
}

interface ScrollStore {
  offset: number
  setOffset: (offset: number) => void
}

interface PointerStore {
  pointer: number
  setPointer: (pointer: number) => void
}

// Store
export const useCameraStore = create<CameraStore>((set) => ({
  position: {
    rotation: { x: 6.3, y: 0.84, z: 6.28 },
    position: { x: 5.6, y: 2.0, z: 4.8 },
  },
  setPosition: (position: CameraPosition) => set({ position }),
}))

export const useScrollStore = create<ScrollStore>((set) => ({
  offset: 0.0,
  setOffset: (offset: number) => set({ offset }),
}))

export const usePointerStore = create<PointerStore>((set) => ({
  pointer: 0,
  setPointer: (pointer: number) => set({ pointer }),
}))
