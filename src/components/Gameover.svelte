<script>
  import { onMount } from "svelte"
  import { fade, fly, scale } from "svelte/transition"
  import { Preferences } from "@capacitor/preferences"
  import { paused, screen } from "../stores/screen.js"
  import { enableSfx } from "../stores/settings.js"
  import { score } from "../stores/score.js"

  let highscore = 0

  onMount(() => {
    playAudio()
    getSetHighscore()
  })

  function playAudio() {
    if (!$enableSfx) return

    const audio = new Audio("sound/gameover.mp3")
    audio.play()
  }

  async function getSetHighscore() {
    const { value } = await Preferences.get({ key: "highscore" })

    highscore = parseInt(value || 0)
    if ($score > highscore) await Preferences.set({ key: "highscore", value: $score })
  }
</script>

<div in:fade={{ duration: 500 }} class="fullscreen">
  <div class="title" in:scale={{ duration: 750 }}>[<small>Game Over</small>]</div>

  <div class="final-score" in:fly={{ y: 50, duration: 500, delay: 1000 }}>
    <div>Final score: <strong>{ $score.toLocaleString() }</strong></div>
    {#if highscore > 0 && $score > highscore}
      <div class="highscore new">New highscore!</div>
    {:else if highscore > 0}
      <div class="highscore">Highscore: <strong>{ highscore.toLocaleString() }</strong></div>
    {/if}
  </div>

  <div in:fade={{ duration: 500, delay: 1000 }} class="button" on:click={ () => { $screen = "menu"; $paused = false } }><span>&gt;</span> Exit to menu</div>
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
    text-transform: lowercase;

    strong {
      color: #c08706;
    }
  }

  @keyframes animate-background {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 25% }
    100% { background-position: 0% 50% }
  }

  .highscore {
    font-size: 18px;

    &.new {
      $primary: #bd1d46;

      background-image: linear-gradient(
        to left,
        $primary,
        adjust-hue($primary, + 300),
        adjust-hue($primary, + 270),
        adjust-hue($primary, + 240),
        adjust-hue($primary, + 210),
        adjust-hue($primary, + 180),
        adjust-hue($primary, + 150),
        adjust-hue($primary, + 120),
        adjust-hue($primary, + 90),
        adjust-hue($primary, + 60),
        adjust-hue($primary, + 30),
        $primary
      );
      background-clip: text;
      background-size: 300% 300%;
      color: transparent;
      animation: animate-background 2500ms linear infinite;
    }
  }
</style>
