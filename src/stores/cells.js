import { writable, readable } from "svelte/store"

const cells = writable([])
const cellNextX = writable(0)

const cellShapes = readable([
  { shape: [[0, 1, 0], [1, 1, 1], [0, 1, 0]], weight: 1 }, // plus
  { shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], weight: 1 }, // T
  // { shape: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], weight: 1 }, // Empty
  { shape: [[0, 1, 0], [1, 1, 0], [0, 0, 0]], weight: 10 }, // corner
  { shape: [[0, 0, 0], [1, 1, 1], [0, 0, 0]], weight: 10 } // pipe
])

export { cells, cellShapes, cellNextX }
