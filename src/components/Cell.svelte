<script>
  import { onMount, afterUpdate, createEventDispatcher } from "svelte"
  import { tweened } from "svelte/motion"
  import { cells } from "../stores/cells.js"

  export let index
  export let cell

  let tweenedX = tweened(cell.x, { duration: 100 })
  let tweenedY = tweened(cell.y, { duration: 100 })
  $: $tweenedX = cell.x
  $: $tweenedY = cell.y

  const dispatch = createEventDispatcher()
  const maxCellY = 11
  const maxCellX = 5
  let rotating = false
  let active = false

  onMount(() => {
    const randomTimes = Math.floor((Math.random() * 4));

    [...Array(randomTimes)].forEach(() => {
      rotateShapeArray()
    })
  })

  function updateCell() {
    setTimeout(() => { dispatch("updateCell", { index: index }) }, 100)
  }

  function rotateShape() {
    rotating = true

    setTimeout(() => {
      rotateShapeArray()

      rotating = false
    }, 100)

    updateCell()
  }

  function rotateShapeArray() {
    cell.shape = cell.shape.map((val, index) => cell.shape.map(row => row[index]).reverse())
  }

  function startDrag(event) {
    active = true
    let dragStart = event.pageX
    let dragCurrent = dragStart

    const target = event.target.closest("g")
    if (!target) return

    function mouseMove(event) {
      dragCurrent = event.pageX
      const difference = dragCurrent - dragStart
      const size = target.getBoundingClientRect().width
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

        updateCell()
      }
    }

    function mouseUp(event) {
      active = false
      document.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseup", mouseUp)

      if (dragStart == dragCurrent) rotateShape()
    }

    document.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseup", mouseUp)
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
</script>

<g class="cell { cell.connected ? "cell--connected" : "" } { cell.to_be_removed ? "cell--removing" : "" } cell--{ cell.connected_to[1] }"
   class:active
   transform="translate({ $tweenedX * 45 }, { $tweenedY * 45 })"
   on:mousedown={ startDrag }>

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
        transition: fill 200ms, transform 200ms;
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
