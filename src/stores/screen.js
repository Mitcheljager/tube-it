import { writable } from "svelte/store"

const screen = writable("menu")
const paused = writable(false)
const levelComplete = writable(false)

export { screen, paused, levelComplete }
