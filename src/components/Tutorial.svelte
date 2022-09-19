<script>
  import { fade, scale } from "svelte/transition"
  import { screen } from "../stores/screen.js"
  import { cells, cellShapes } from "../stores/cells.js"
  import { enableSfx } from "../stores/settings.js"
  import Grid from "./Grid.svelte"

  let level = -1
  let tutorialComplete = false
  let text = ""
  let disableRotateFor = []
  let disableMoveFor = []

  $: setCellsForLevel(level)
  $: if ($cells.length == 0 && level < 5) level++

  function setCellsForLevel() {
    if (level == 0) {
      text = "The objective is to <strong>connect pipes</strong> between two points <br><br> <span>Tap to rotate</span>"

      disableRotateFor = [0, 1, 2, 4, 5]

      $cells = [
        { id: 0, x: 0, y: 0, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 1, x: 1, y: -1, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 2, x: 2, y: -2, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 3, x: 3, y: -3, connected_to: -1, shape: [[0, 1, 0], [0, 1, 0], [0, 1, 0]] },
        { id: 4, x: 4, y: -4, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 5, x: 5, y: -5, connected_to: -1, shape: $cellShapes[3].shape }
      ]
    } else if (level == 1) {
      text = "You can connect to any point <strong>regardless of color</strong> <br><br> <span>Tap to rotate</span>"

      disableRotateFor = [10, 11, 12, 13, 14, 15, 16, 17, 18]
      disableMoveFor = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

      $cells = [
        { id: 10, x: 0, y: 0, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 11, x: 1, y: -1, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 12, x: 2, y: -2, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 13, x: 3, y: -3, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 14, x: 4, y: -4, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 15, x: 5, y: -5, connected_to: -1, shape: [[0, 1, 0], [1, 1, 0], [0, 0, 0]] },
        { id: 16, x: 5, y: -6, connected_to: -1, shape: [[0, 1, 0], [0, 1, 0], [0, 1, 0]] },
        { id: 17, x: 5, y: -7, connected_to: -1, shape: [[0, 1, 0], [0, 1, 0], [0, 1, 0]] },
        { id: 18, x: 5, y: -8, connected_to: -1, shape: [[0, 1, 0], [0, 1, 0], [0, 1, 0]] },
        { id: 19, x: 5, y: -9, connected_to: -1, shape: [[0, 1, 0], [0, 1, 1], [0, 0, 0]] }
      ]
    } else if (level == 2) {
      text = "You can connect to any <strong>side</strong> <br><br> <span>Tap to rotate</span>"

      disableRotateFor = [20, 21, 22]
      disableMoveFor = [20, 21, 22, 23]

      $cells = [
        { id: 20, x: 0, y: 0, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 21, x: 0, y: -1, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 22, x: 1, y: -2, connected_to: -1, shape: [[0, 1, 0], [1, 1, 0], [0, 0, 0]] },
        { id: 23, x: 1, y: -3, connected_to: -1, shape: [[0, 1, 0], [0, 1, 1], [0, 0, 0]] },
      ]
    } else if (level == 3) {
      text = "Cells can be <strong>moved</strong> by dragging <br><br> <span>Tap and drag to move</span>"

      disableRotateFor = [30, 31, 32, 33, 34, 35]
      disableMoveFor = [30, 31, 32, 34, 35]

      $cells = [
        { id: 30, x: 0, y: 0, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 31, x: 1, y: -1, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 32, x: 2, y: -2, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 33, x: 1, y: -3, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 34, x: 4, y: -3, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 35, x: 5, y: -4, connected_to: -1, shape: $cellShapes[3].shape }
      ]
    } else if (level == 4) {
      text = "Cells can be <strong>moved</strong> even when they are not on top <br><br> <span>Tap and drag to move</span>"

      disableRotateFor = [40, 41, 42, 43, 44, 45, 46, 47, 48]
      disableMoveFor = [40, 41, 42, 43, 44, 45, 46, 48]

      $cells = [
        { id: 41, x: 0, y: 0, connected_to: -1, shape: [[0, 1, 0], [0, 1, 1], [0, 0, 0]] },
        { id: 42, x: 1, y: -1, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 43, x: 3, y: -2, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 44, x: 4, y: -3, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 45, x: 5, y: -4, connected_to: -1, shape: $cellShapes[3].shape },
        { id: 46, x: 0, y: -5, connected_to: -1, shape: [[0, 1, 0], [0, 1, 0], [0, 1, 0]] },
        { id: 47, x: 0, y: -6, connected_to: -1, shape: [[0, 0, 0], [1, 1, 1], [0, 0, 0]] },
        { id: 48, x: 0, y: -7, connected_to: -1, shape: [[0, 0, 0], [1, 1, 0], [0, 1, 0]] },
      ]
    } else if (level == 5) {
      text = ""
      tutorialComplete = true
    }

   if (level > 0) playAudio()
  }

  function playAudio() {
      if (!$enableSfx) return

      const fileNumber = Math.floor((Math.random() * 5) + 1)
      new Audio(`sound/score/score-${ fileNumber }.mp3`).play()
    }
</script>

{ #if tutorialComplete }
  <div class="tutorial-complete" in:fade={{ duration: 500, delay: 500 }}>
    <div class="tutorial-complete__title" in:scale={{ duration: 500, delay: 750 }}>
      <small>[</small>Complete<small>]</small>
    </div>

    <div class="button" on:click={ () => { $screen = "menu" } }><span>&gt;</span> Return to Menu</div>
  </div>
{ /if }

<main class="board">
	<div class="board__header">
    <div class="button" on:click={ () => { $screen = "menu" } }><span>&gt;</span> [Menu]</div>

    <div class="progress">
      { level + 1 }/4
    </div>

    <div class="text">{@html text}</div>
  </div>

	<div class="board__content">
		<Grid {disableMoveFor} {disableRotateFor} />
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
    font-size: clamp(24px, 8vw, 28px);
    font-weight: bold;
    cursor: pointer;

    span {
      color: #738b98;
    }
  }

  .tutorial-complete {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 100%;
    transform: translateX(-50%) translateY(-50%);
    text-transform: lowercase;
    text-align: center;
  }

  .tutorial-complete__title {
    margin-bottom: 2rem;
    color: white;
    font-size: 48px;
    font-weight: bold;

    small {
      font-size: 2rem;
      color: #738b98;
    }
  }

  .progress {
    margin-left: auto;
  }

  .text {
    position: fixed;
    width: 100%;
    padding: 2rem 1rem;
    top: 7.15rem;
    left: 0;
    background: #080b0d77;
    font-size: clamp(24px, 5vw, 28px);
    text-align: center;

    :global(strong) {
      color: #c08706;
    }

    :global(span) {
      color: #bd1d46;
    }
  }
</style>
