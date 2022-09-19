<script>
  import { onMount } from "svelte"
  import { cells } from "../stores/cells.js"
  import { screen, paused } from "../stores/screen.js"
  import { enableSfx } from "../stores/settings.js"

  export let cell
  export let disableRotate = false
  export let disableMove = false

  const maxCellY = 11
  const maxCellX = 5
  let rotating = false
  let active = false

  onMount(() => {
    const randomTimes = Math.floor((Math.random() * 4));

    if ($screen == "tutorial") return

    [...Array(randomTimes)].forEach(() => {
      rotateShapeArray()
    })
  })

  function rotateShape() {
    if (disableRotate) return
    if (cell.is_to_be_removed) return

    rotating = true

    setTimeout(() => {
      rotateShapeArray()

      rotating = false
    }, 100)

    playRotateAudio()
  }

  function rotateShapeArray() {
    cell.shape = cell.shape.map((_, index) => cell.shape.map(row => row[index]).reverse())
  }

  function startDrag(event) {
    if ($paused) return

    active = true
    let dragStart = event.changedTouches[0].pageX
    let dragCurrent = dragStart
    let dragAbsoluteStart = dragStart

    const target = event.target.closest("g")
    const size = target.getBoundingClientRect().width
    if (!target) return

    function mouseMove(event) {
      if (disableMove) return

      dragCurrent = event.changedTouches[0].pageX
      const difference = dragCurrent - dragStart
      let direction = 1
      let step = Math.floor(difference / size)
      if (difference < 0) {
        direction = -1
        step = Math.ceil(difference / size)
      }

      if ((direction == 1 && step > 0) || (direction == -1 && step < 0)) {
        dragStart = dragCurrent

        if (isCellAtEdge(direction)) return
        if (isCellOccupied(cell.x + direction, cell.y)) return
        if (cell.y != maxCellY && isAnyCellBelowFree()) return

        cell.x = cell.x + direction
      }
    }

    function mouseUp() {
      active = false
      document.removeEventListener("touchmove", mouseMove)
      document.removeEventListener("touchend", mouseUp)

      if (Math.abs(dragAbsoluteStart - dragCurrent) < size) rotateShape()
    }

    document.addEventListener("touchmove", mouseMove)
    document.addEventListener("touchend", mouseUp)
  }

  function isCellAtEdge(direction) {
    return cell.x == 0 && direction == -1 || cell.x == maxCellX && direction == 1
  }

  function isCellOccupied(x, y) {
    return $cells.filter(_cell => _cell.x == x && _cell.y == y).length > 0
  }

  function isAnyCellBelowFree() {
    return $cells.filter(_cell => _cell.x == cell.x && _cell.y > cell.y).length < maxCellY - cell.y
  }

  function playRotateAudio() {
    if (!$enableSfx) return

    const fileNumber = Math.floor((Math.random() * 4) + 1)
    const audio = new Audio(`sound/rotate/rotate-${ fileNumber }.mp3`)
    audio.play()
  }
</script>

<g class="cell { cell.connected ? "cell--connected" : "" } { cell.to_be_removed ? "cell--removing" : "" } cell--{ cell.connected_to[1] }"
   class:active
   style:transform="translate({ cell.x * 45 }px, { cell.y * 45 }px)"
   on:touchstart={ startDrag }>

  <rect height=45 width=45 fill=#ffffff0f />

  <g class="connectors" class:rotating width=45 height=45>
    { #each cell.shape as row, i }
      { #each row as connector, j }
          <rect height=15 width=15 x={ j * 15 } y={ i * 15 }
                class:connector
                fill="transparent"
                stroke="transparent"
                stroke-width=1 />
      { /each }
    { /each }
  </g>
</g>

<style lang="scss">
  $primary: #bd1d46;
  $gray: #738b98;

  .cell {
    --cell-color: #{ $gray };
    transition: transform 100ms linear;

    @for $i from 0 through 11 {
      &--#{ $i } {
        &.cell--connected {
          --cell-color: #{ adjust-hue($primary, (11 - $i) * 30) }
        }
      }
    }

    &--connected {
      .connectors {
        filter: drop-shadow(0 0 5px var(--cell-color));
      }
    }

    &--removing {
      .connectors {
        filter: none;
      }

      rect {
        transform: scale(0.25);
        fill: transparent;
        stroke: transparent;
        transition: fill 200ms 50ms, transform 200ms 50ms, stroke 0ms 50ms;
        transform-origin: center;
        transform-box: fill-box;
      }
    }
  }

  .cell:hover,
  .cell:active {
    stroke: #738b98;
  }

  .active,
  .active:hover,
  .active:active {
    stroke: #ffffffcc;
  }

  .connector {
    fill: var(--cell-color);
    stroke: var(--cell-color);
  }

  g {
    transform-box: fill-box;
  }

  .rotating {
    transform: rotate(90deg);
    transform-origin: center;
    transition: transform 100ms;
  }
</style>
