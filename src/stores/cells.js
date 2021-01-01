import { writable, readable } from "svelte/store"

const cells = writable([])

const cellShapes = readable([
  [[0, 1, 0], [1, 1, 1], [0, 1, 0]], // plus
  [[0, 1, 0], [1, 1, 1], [0, 0, 0]], // T
  [[0, 1, 0], [1, 1, 0], [0, 0, 0]], // corner
  [[0, 0, 0], [1, 1, 1], [0, 0, 0]] // pipe
])

export { cells, cellShapes }
