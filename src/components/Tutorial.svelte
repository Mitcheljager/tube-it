<script>
  import { screen } from "../stores/screen.js"
  import { cells, cellShapes } from "../stores/cells.js"
  import { enableSfx } from "../stores/settings.js"
  import Grid from "./Grid.svelte"

  let level = -1
  let tutorialComplete = false

  $: setCellsForLevel(level)
  $: if ($cells.length == 0 && level < 4) level++

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
    } else if (level == 4) {
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
  <div class="tutorial-complete">
    <div class="tutorial-complete__title">
      <small>[</small>Complete<small>]</small>
    </div>

    <div class="button" on:click={ () => { $screen = "menu" } }><span>&gt;</span> Return to Menu</div>
  </div>
{ /if }

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
    font-weight: bold;
    cursor: pointer;

    span {
      color: #738b98;
    }
  }

  @keyframes fade-in-tutorial-complete {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .tutorial-complete {
    text-align: center;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    opacity: 0;
    text-transform: lowercase;
    animation: fade-in-tutorial-complete 250ms 500ms forwards;
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
</style>
