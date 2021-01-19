import { writable } from "svelte/store"

const score = writable(0)
const numberOfCellsToBeRemoved = writable(0)
const level = writable(0)

export { score, numberOfCellsToBeRemoved, level }
