<script>
  import { onMount } from "svelte"
  import { paused, screen } from "../stores/screen.js"
  import { score } from "../stores/score.js"

  onMount(playAudio)

  function playAudio() {
    const audio = new Audio("sound/gameover.mp3")
    audio.play()
  }
</script>

<div class="fullscreen">
  <div class="title">[<small>Game Over</small>]</div>

  <div>
    <div class="final-score">Final score: <strong>{ $score }</strong></div>
    <div class="button" on:click={ () => { $screen = "menu"; $paused = false } }><span>&gt;</span> Exit to menu</div>
  </div>
</div>

<style lang="scss">
  .fullscreen {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #000000bb;
  }

  .title {
    margin-bottom: 2rem;
    color: #738b98;
    font-size: 48px;
    font-weight: bold;
    text-transform: lowercase;

    small {
      font-size: 1em;
      color: #bd1d46;
    }
  }

  .button {
    padding: .25rem 0;
    margin-left: -2rem;
    font-weight: bold;
    font-size: 28px;
    cursor: pointer;
    text-transform: lowercase;

    &:hover,
    &:active {
      color: white;
    }

    span {
      color: #738b98;
    }
  }

  .final-score {
    position: fixed;
    bottom: 2rem;
    font-weight: bold;
    font-size: 24px;

    span {
      color: #738b98;
    }

    strong {
      color: #c08706;
    }
  }
</style>
