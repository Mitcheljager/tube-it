<script>
  import { onMount, afterUpdate, createEventDispatcher } from "svelte"
  import { tweened } from "svelte/motion"
  import { cells } from "../stores/cells.js"

  export let index
  export let cell

  let tweenedX = tweened(cell.x, { duration: 50 })
  let tweenedY = tweened(cell.y, { duration: 50 })
  $: $tweenedX = cell.x
  $: $tweenedY = cell.y

  const dispatch = createEventDispatcher()
  const maxCellY = 11
  const maxCellX = 5
  let rotating = false
  let active = false

  function updateCell() {
    setTimeout(() => { dispatch("updateCell", { index: index }) }, 100)
  }

  function rotateShape() {
    rotating = true

    setTimeout(() => {
      cell.shape = cell.shape.map((val, index) => cell.shape.map(row => row[index]).reverse())

      rotating = false
    }, 100)

    updateCell()
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

<g class="cell { cell.connected ? "connected" : "" } { cell.to_be_removed ? "removing" : "" }"
   class:active
   transform="translate({ $tweenedX * 45 }, { $tweenedY * 45 })"
   on:mousedown={ startDrag }>

  <rect height=45 width=45 fill=#ffffff0f />

  <g class="connectors" class:rotating width=45 height=45>
    { #each cell.shape as row, i }
      { #each row as connector, j }
          <rect height=15 width=15 x={ j * 15 } y={ i * 15 }
                fill={ connector ? (cell.connected ? "#bd1d46" : "#738b98") : "transparent" }
                stroke={ connector ? (cell.connected ? "#bd1d46" : "#738b98") : "transparent" }
                stroke-width=1 />
      { /each }
    { /each }
  </g>
</g>

<style lang="scss">
  .cell:hover,
  .cell:active {
    stroke: #738b98;
  }

  .active,
  .active:hover,
  .active:active {
    stroke: #ffffffcc;
  }

  .connected .connectors {
    filter: drop-shadow(0 0 5px #bd1d46);
  }

  .removing rect {
    transition: fill 200ms;
    fill: transparent;
    stroke: transparent;
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
