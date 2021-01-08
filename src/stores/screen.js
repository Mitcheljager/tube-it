import { writable } from "svelte/store"

const screen = writable("menu")
const paused = writable(false)

export { screen, paused }
