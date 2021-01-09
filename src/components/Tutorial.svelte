<script>
  import { onMount } from "svelte"
  import { screen } from "../stores/screen.js"
  import { cells, cellShapes } from "../stores/cells.js"
  import Grid from "./Grid.svelte"

  let level = -1

  $: setCellsForLevel(level)
  $: if ($cells.length == 0) level++

  function randomString() {
    return Math.random().toString(16).substr(2, 5)
  }

  function setCellsForLevel() {
    if (level == 0) {
      $cells = [
        { id: randomString(), x: 0, y: 0, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 1, y: -1, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 2, y: -2, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 3, y: -3, connected_to: -1, shape: [[0, 1, 0], [0, 1, 0], [0, 1, 0]] },
        { id: randomString(), x: 4, y: -4, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 5, y: -5, connected_to: -1, shape: $cellShapes[3].shape }
      ]
    } else if (level == 1) {
      $cells = [
        { id: randomString(), x: 0, y: 0, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 1, y: -1, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 2, y: -2, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 3, y: -3, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 4, y: -4, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 5, y: -5, connected_to: -1, shape: [[0, 1, 0], [1, 1, 0], [0, 0, 0]] },
        { id: randomString(), x: 5, y: -6, connected_to: -1, shape: [[0, 1, 0], [0, 1, 1], [0, 0, 0]] }
      ]
    } else if (level == 2) {
      $cells = [
        { id: randomString(), x: 0, y: 0, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 0, y: -1, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 1, y: -2, connected_to: -1, shape: [[0, 1, 0], [1, 1, 0], [0, 0, 0]] },
        { id: randomString(), x: 1, y: -3, connected_to: -1, shape: [[0, 1, 0], [1, 1, 0], [0, 0, 0]] },
      ]
    } else if (level == 3) {
      $cells = [
        { id: randomString(), x: 0, y: 0, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 1, y: -1, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 2, y: -2, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 2, y: -3, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 4, y: -3, connected_to: -1, shape: $cellShapes[3].shape },
        { id: randomString(), x: 5, y: -4, connected_to: -1, shape: $cellShapes[3].shape }
      ]
    }
  }
</script>

<main class="board">
	<div class="board__header">
    <div class="button" on:click={ () => { $screen = "menu" } }><span>&gt;</span> [Menu]</div>
  </div>

	<div class="board__content">
		<Grid />
	</div>
</main>

<style lang="scss">
  .board {
    display: grid;
    grid-template:
      "header"
      "content";
    grid-template-rows: 100px auto;
    color: lightgray;
    height: 100vh;
  }

  .board__header {
    grid-area: header;
    display: flex;
    align-items: center;
    padding: .75rem;
    border-bottom: 1px solid #ffffff30;
    font-size: 28px;
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
    cursor: pointer;

    span {
      color: #666;
      font-size: 20px;
      font-weight: normal
    }
  }
</style>
