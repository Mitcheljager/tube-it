<script>
  import { onMount } from "svelte"
  import { readable, get } from "svelte/store"
  import { cells, cellShapes } from "../stores/cells.js"
  import Cell from "./Cell.svelte"
  import GridBg from "./GridBg.svelte"

  const maxCellY = 11
  const maxCellX = 5
  const adjecentCellDirections = [
    [0, -1, [2, 1], "up"],
    [1, 0, [1, 0], "right"],
    [0, 1, [0, 1], "down"],
    [-1, 0, [1, 2], "left"]
  ]

  let checkedCells = []
  let watchCells = JSON.stringify($cells)

  $: {
    if (watchCells != JSON.stringify($cells)) {
      checkConnections()

      watchCells = JSON.stringify($cells)
    }
  }

  onMount(() => {
    moveFlyingCells()
    setInterval(moveFlyingCells, 50);

    [...Array(20)].forEach((_, i) => { addRandomCell() })

    // setInterval(addRandomCell, 5000)
  })

  function addRandomCell() {
    const shape = $cellShapes[Math.floor(Math.random() * $cellShapes.length)]
    $cells = [...$cells, { id: Math.random().toString(16).substr(2, 5), x: Math.floor((Math.random() * 6)), y: -1, shape: shape }]
  }

  function moveFlyingCells() {
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
      let occupiedCell

      checkAdjecentCells(cell)
    })
  }

  function checkAdjecentCells(cell) {
    checkedCells.push($cells.findIndex(c => c == cell))

    adjecentCellDirections.forEach(direction => {
      if (!cellHasConnectorInDirection(cell, direction)) return

      const adjecentCellIndex = $cells.findIndex(c => c.x == cell.x + direction[0] && c.y == cell.y + direction[1])

      if (adjecentCellIndex == -1) return

      if ($cells[adjecentCellIndex].shape[direction[2][0]][direction[2][1]]) {
        if (checkCompletedLine(cell, adjecentCellIndex)) return
        if (checkedCells.includes(adjecentCellIndex)) return

        $cells[adjecentCellIndex].connected = true
        $cells[adjecentCellIndex].connected_to = cell.connected_to

        checkAdjecentCells($cells[adjecentCellIndex])
      }
    })
  }

  function checkCompletedLine(cell, cellIndex) {
    if ($cells[cellIndex].connected == true && $cells[cellIndex].connected_to != cell.connected_to) {
      $cells.map(c => {
        if (c.connected_to == cell.connected_to || c.connected_to == $cells[cellIndex].connected_to) {
          c.to_be_removed = true
        }
      })

      setTimeout(() => {
        $cells = $cells.filter(c => c.connected_to != cell.connected_to && c.connected_to != $cells[cellIndex].connected_to)
      }, 200)

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

<svg viewBox="0 0 270 540">
  <rect width=270 height=540 fill=#12191d />
  <GridBg />

  { #each $cells as cell, index (cell.id) }
    <Cell { cell } { index } />
  { /each }
</svg>

<style>
  svg {
    height: calc(100vh - 100px);
    width: auto;
    background: #222;
  }
</style>
