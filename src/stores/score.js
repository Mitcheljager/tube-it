import { writable, derived } from "svelte/store"

const score = writable(0)
const remainingCells = writable(0)
const numberOfCellsToBeRemoved = writable(0)
const level = writable(0)
const totalCellsForLevel = derived(level, ($level) => 30 + ($level * 15))

export { score, numberOfCellsToBeRemoved, level, remainingCells, totalCellsForLevel }
