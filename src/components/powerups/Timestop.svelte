<script>
  import { onMount, onDestroy } from "svelte"
  import { scale } from "svelte/transition"
  import { Confetti } from "svelte-confetti"
  import { timestopPowerupActive, activePowerup } from "../../stores/powerups"
  import { enableSfx } from "../../stores/settings"
  import { cells } from "../../stores/cells"

  onMount(() => {
    if (!$cells.length) return
    $timestopPowerupActive = true

    playAudio()
    setTimeout(() => $activePowerup = null, 10000)
  })

  onDestroy(() => $timestopPowerupActive = false)

  function playAudio() {
    if (!$enableSfx) return

    const audio = new Audio("sound/powerups/timestop.wav")
    audio.play()
  }
</script>

<h2 transition:scale={{ duration: 250 }}>
  Timestop!

  <div class="confetti">
    <Confetti y={[-0.5, 0.5]} x={[-0.5, 0.5]} amount={20} size={10} rounded fallDistance=0px colorArray={["#fdbb2d", "#23c1c3"]} />
  </div>
</h2>

<style lang="scss">
  @keyframes animate-background {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 25% }
    100% { background-position: 0% 50% }
  }

  h2 {
    position: fixed;
    left: 0;
    top: 25%;
    width: 100%;
    color: #fdbb2d;
    text-align: center;
    font-weight: bold;
    font-size: clamp(28px, 10vw, 32px);
    text-transform: lowercase;
    pointer-events: none;

    @supports (background-clip: text) {
      background-clip: text;
      background-size: 300% 300%;
      background-image: linear-gradient(to left, #fdbb2d, #23c1c3, #fdbb2d, #fdbb2d, #23c1c3, #fdbb2d);
      color: transparent;
      animation: animate-background 1500ms linear infinite;
    }
  }

  .confetti {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: -1;
  }
</style>
