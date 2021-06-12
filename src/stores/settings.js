import { writable } from "svelte/store"

const enableMusic = writable(true)
const enableSfx = writable(true)

export { enableMusic, enableSfx }
