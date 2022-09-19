<script>
  import { onMount, onDestroy } from "svelte"
  import { cells, cellNextX } from "../stores/cells.js"
  import { numberOfCellsToBeRemoved } from "../stores/score.js"
  import { paused, screen } from "../stores/screen.js"

  import Cell from "./Cell.svelte"
  import GridBg from "./GridBg.svelte"
  import Aside from "./Aside.svelte"

  export let disableRotateFor = []
  export let disableMoveFor = []

  const maxCellY = 11
  const maxCellX = 5
  const adjacentCellDirections = [
    [0, -1, [2, 1], "up"],
    [1, 0, [1, 0], "right"],
    [0, 1, [0, 1], "down"],
    [-1, 0, [1, 2], "left"]
  ]

  let checkedCells = []
  let watchCells = JSON.stringify($cells)
  let moveInterval

  $: if (watchCells != JSON.stringify($cells)) {
    checkConnections()

    watchCells = JSON.stringify($cells)
  }

  onMount(() => {
    moveFlyingCells()

    moveInterval = setInterval(moveFlyingCells, 100)
  })

  onDestroy(() => {
    $cells = []
    clearInterval(moveInterval)
  })

  function moveFlyingCells() {
    if ($paused) return

    $cells = $cells.map(cell => {
      if (isAnyCellBelowFree(cell)) cell.y++
      return cell
    })
  }

  function checkConnections() {
    checkedCells = []
    $cells.map(c => { c.connected = false; c.connected_to = -1 })

    $cells.filter(c => c.x == 0 || c.x == maxCellX).forEach(cell => {
      if (isAnyCellBelowFree(cell)) return

      if (!(cell.x == 0 && cell.shape[1][0] ||
            cell.x == maxCellX && cell.shape[1][2])
         ) return

      cell.connected = true
      cell.connected_to = [cell.x, cell.y]

      checkAdjacentCells(cell)
    })
  }

  function checkAdjacentCells(cell) {
    checkedCells.push($cells.findIndex(c => c == cell))

    adjacentCellDirections.forEach(direction => {
      if (!cellHasConnectorInDirection(cell, direction)) return

      const adjacentCellIndex = $cells.findIndex(c => c.x == cell.x + direction[0] && c.y == cell.y + direction[1])

      if (adjacentCellIndex == -1) return
      if (!$cells[adjacentCellIndex].shape[direction[2][0]][direction[2][1]]) return
      if (isAnyCellBelowFree($cells[adjacentCellIndex])) return
      if (checkCompletedLine(cell, adjacentCellIndex)) return
      if (checkedCells.includes(adjacentCellIndex)) return

      $cells[adjacentCellIndex].connected = true
      $cells[adjacentCellIndex].connected_to = cell.connected_to

      checkAdjacentCells($cells[adjacentCellIndex])
    })
  }

  function checkCompletedLine(cell, cellIndex) {
    if (cell.to_be_removed) return

    if ($cells[cellIndex].connected == true && $cells[cellIndex].connected_to != cell.connected_to) {
      const cellsToBeRemoved = $cells.filter(c => c.connected_to == cell.connected_to || c.connected_to == $cells[cellIndex].connected_to)
      $numberOfCellsToBeRemoved = cellsToBeRemoved.length

      setTimeout(() => cellsToBeRemoved.map(c => c.to_be_removed = true))
      setTimeout(() => {
        if ($cells[cellIndex]) $cells = $cells.filter(c => !cellsToBeRemoved.includes(c))
      }, 250)

      return true
    }

    return false
  }

  function isAnyCellBelowFree(cell) {
    return $cells.filter(_cell => _cell.x == cell.x && _cell.y > cell.y).length < maxCellY - cell.y
  }

  function cellHasConnectorInDirection(cell, direction) {
    if (direction[3] == "up" && !cell.shape[0][1]) return false
    if (direction[3] == "right" && !cell.shape[1][2]) return false
    if (direction[3] == "down" && !cell.shape[2][1]) return false
    if (direction[3] == "left" && !cell.shape[1][0]) return false

    return true
  }
</script>

<svg viewBox="0 0 330 540">
  <rect width=330 height=540 fill=#12191d />

  <svg width=270 x=30>
    <GridBg />

    { #if $screen != "tutorial" }
      <text x={ 45 * $cellNextX + 14 }
            y=24
            font-size=30
            fill=#738b98>↓</text>
    { /if }

    { #each $cells as cell (cell.id) }
      <Cell { cell } disableMove={disableMoveFor.includes(cell.id)} disableRotate={disableRotateFor.includes(cell.id)} />
    { /each }
  </svg>

  <Aside />
  <Aside align=right />
</svg>

<style>
  svg {
    height: calc(100vh - 100px);
    width: auto;
    background: #12191d;
  }
</style>
