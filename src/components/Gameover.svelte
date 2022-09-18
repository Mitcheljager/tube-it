<script>
  import { onMount } from "svelte"
  import { fade, fly, scale } from "svelte/transition"
  import { paused, screen } from "../stores/screen.js"
  import { score } from "../stores/score.js"

  onMount(playAudio)

  function playAudio() {
    const audio = new Audio("sound/gameover.mp3")
    audio.play()
  }
</script>

<div in:fade={{ duration: 500 }} class="fullscreen">
  <div class="title" in:scale={{ duration: 750 }}>[<small>Game Over</small>]</div>

  <div>
    <div in:fly={{ y: 50, duration: 500, delay: 1000 }} class="final-score">Final score: <strong>{ $score }</strong></div>
    <div in:fade={{ duration: 500, delay: 1000 }} class="button" on:click={ () => { $screen = "menu"; $paused = false } }><span>&gt;</span> Exit to menu</div>
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
    left: 0;
    width: 100%;
    text-align: center;
    bottom: 3rem;
    font-weight: bold;
    font-size: 24px;

    strong {
      color: #c08706;
    }
  }
</style>
