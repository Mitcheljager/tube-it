<script>
  import { onMount, onDestroy } from "svelte"
  import { paused, levelComplete } from "../stores/screen.js"
  import { cells, cellShapes, cellNextX } from "../stores/cells.js"
  import { level } from "../stores/score.js"
  import { enableMusic } from "../stores/settings.js"
  import Grid from "./Grid.svelte"
  import Score from "./Score.svelte"
  import Paused from "./Paused.svelte"
  import Gameover from "./Gameover.svelte"

  let addCellInterval
  let gameover
  let audioElement

  onMount(() => {
    $level = 0
    $levelComplete = false
    gameover = false
    variableInterval()
  })

  onDestroy(() => { clearTimeout(addCellInterval) })

  $: checkCellsOutOfFrame($cells)

  $: if (audioElement) $paused ? audioElement.pause() : audioElement.play()

  function variableInterval() {
    addCellInterval = setTimeout(() => {
      if (!$paused && !gameover && !$levelComplete) addRandomCell()
      variableInterval()
    }, Math.max(1500 - ($level * 100), 500))
  }

  function addRandomCell() {
    const cellShape = getWeightedCellShape()
    const randomString = Math.random().toString(16).substr(2, 5)

    $cells = [...$cells, { id: randomString, x: $cellNextX, y: -1, shape: cellShape.shape }]

    $cellNextX = Math.floor((Math.random() * 6))
  }

  function getWeightedCellShape() {
    const items = []
    $cellShapes.forEach(s => {
      [...Array(s.weight)].forEach(() => { items.push(s) })
    })

    return items[Math.floor(Math.random() * items.length)]
  }

  function pause() {
    $paused = !$paused
  }

  function checkCellsOutOfFrame() {
    const cellsOutOfFrame = $cells.filter(c => c.y < 0)
    if (!cellsOutOfFrame.length) return

    setTimeout(() => {
      if ($paused) return

      if (cellsOutOfFrame.some(c => $cells.filter(c2 => c.id == c2.id && c2.y < 0).length > 0)) {
        gameover = true
      }
    }, 1000)
  }
</script>

{ #if $enableMusic }
  <audio src="sound/theme.mp3" autoplay="true" loop="true" bind:this={audioElement} />
{ /if }

<main class="board">
	<div class="board__header">
    <div class="button" on:click={ pause }><span>[</span>pause<span>]</span></div>
    <Score />
  </div>

	<div class="board__content">
    { #if $paused }
      <Paused />
    { /if }

    { #if gameover }
      <Gameover />
    { /if }

		<Grid />
	</div>
</main>

<style lang="scss">
  .board {
    display: grid;
    grid-template:
      "info"
      "content";
    grid-template-rows: 100px auto;
    color: lightgray;
    height: 100vh;
  }

  .board__header {
    grid-area: info;
    display: flex;
    align-items: center;
    padding: .75rem;
    border-bottom: 1px solid #ffffff30;
    font-size: clamp(21px, 6.5vw, 28px);
    font-weight: bold;
    text-shadow: -4px 4px 0 #ccccff33;
    text-transform: lowercase;
  }

  .board__content {
    grid-area: content;
    display: flex;
    justify-content: center;
    overflow-x: hidden;
    background: #12191d;
  }

  .button {
    border: 0;
    color: #c08706;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;

    span {
      color: #738b98;
    }
  }
</style>
