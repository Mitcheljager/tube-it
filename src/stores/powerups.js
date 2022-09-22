import { writable, readable } from "svelte/store"
import Timestop from "../components/powerups/Timestop.svelte"

export const activePowerup = writable(null)
export const timestopPowerupActive = writable(false)
export const powerups = readable({
  Timestop: {
    icon: `
      <circle cx=22.5 cy=22.5 r=15 stroke=#fdbb2d stroke-width=3 fill=transparent style="filter: drop-shadow(0 0 5px #fdbb2d);" />
      <line x1=22.5 x2=22.5 y1=15 y2=22.5 stroke=#fdbb2d stroke-width=3 stroke-linecap=round style="filter: drop-shadow(0 0 5px #fdbb2d);" />
      <line x1=22.5 x2=27 y1=22.5 y2=22.5 stroke=#fdbb2d stroke-width=3 stroke-linecap=round style="filter: drop-shadow(0 0 5px #fdbb2d);" />
    `,
    component: Timestop
  }
})
