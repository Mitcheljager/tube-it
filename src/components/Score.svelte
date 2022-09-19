<script>
  import { onMount } from "svelte"
  import { scale, fade } from "svelte/transition"
  import { Confetti } from "svelte-confetti"
  import { score, numberOfCellsToBeRemoved, level } from "../stores/score.js"
  import { cells } from "../stores/cells.js"
  import { levelComplete } from "../stores/screen.js"
  import { enableSfx } from "../stores/settings.js"

  let remainingCells = 30
  let scoreNotification = 0

  onMount(() => {
    remainingCells = 30
    $score = 0
  })

  $: if ($numberOfCellsToBeRemoved > 0) updateScore()
  $: if (remainingCells <= 0) setNextLevel()
  $: confettiDistance = Math.min(Math.max(scoreNotification / 500, 0.5), 1)
  $: confettiCount = Math.min(Math.max(scoreNotification / 20, 10), 60)
  $: confettiSize = Math.min(Math.max(scoreNotification / 30, 5), 15)

  function updateScore() {
    const scoreToAdd = Math.floor(($numberOfCellsToBeRemoved * 10) * (1 + ($numberOfCellsToBeRemoved - 2) * .25))

    score.set($score + scoreToAdd)
    remainingCells = remainingCells - $numberOfCellsToBeRemoved

    if (scoreToAdd) toggleScoreNotification(scoreToAdd)
    if ($score > 0) playScoreAudio()

    $numberOfCellsToBeRemoved = 0
  }

  function setRemainingCellsForLevel() {
    remainingCells = 30 + (15 * $level)
  }

  function setNextLevel() {
    clearLevel()

    level.set($level + 1)
    setRemainingCellsForLevel()

    if ($score > 0) playNextLevelAudio()
  }

  function clearLevel() {
    levelComplete.set(true)

    setTimeout(() => {
      $cells.map(c => c.to_be_removed = true)

      setTimeout(() => {
        cells.set([])

        levelComplete.set(false)
      }, 250)
    }, 3000)
  }

  function playScoreAudio() {
    if (!$enableSfx) return

    const fileNumber = Math.floor((Math.random() * 5) + 1)
    new Audio(`sound/score/score-${ fileNumber }.mp3`).play()
  }

  function playNextLevelAudio() {
    if (!$enableSfx) return

    setTimeout(() => { new Audio(`sound/next-level.mp3`).play() }, 500)
  }

  async function toggleScoreNotification(score) {
    scoreNotification = score
    await new Promise(res => setTimeout(res, 1500))
    scoreNotification = 0
  }
</script>

<div class="score">
  <div class="score__column">
    <div class="line">
      <label>Level //</label>
    </div>

    <div class="line">
      { $level }
      <span>&lt;</span>
    </div>
  </div>

  <div class="score__column">
    <div class="line">
      <label>Remaining //</label>
    </div>

    <div class="line">
      { remainingCells }
      <span>&lt;</span>
    </div>
  </div>

  <div class="score__column">
    <div class="line">
      <label>Score //</label>
    </div>

    <div class="line">
      { $score }
      <span>&lt;</span>
    </div>
  </div>
</div>

{ #if $levelComplete }
  <div class="level-complete" in:fade={{ duration: 500, delay: 500 }}>
    <div class="level-complete__title" in:scale={{ duration: 500, delay: 500 }}>
      <small>[</small>Complete<small>]</small>
    </div>

    <div in:fade={{ duration: 500, delay: 1000 }}>
      Initiating next level...
    </div>
  </div>
{ /if }

{ #if scoreNotification }
  <div class="score-notification" style:--score={scoreNotification}>
    <div in:scale={{ duration: 250 }} out:fade={{ duration: 250 }}>
      +{ scoreNotification }
    </div>

    <div class="score-notification__confetti">
      <Confetti y={[-confettiDistance, confettiDistance]} x={[-confettiDistance, confettiDistance]} amount={isNaN(confettiCount) ? 0 : confettiCount} size={confettiSize} fallDistance=20px />
    </div>
  </div>
{ /if }

<style lang="scss">
  .score {
    margin-left: auto;
    text-align: right;

    @media (min-width: 768px) {
      display: flex;
    }
  }

  .score__column {
    margin-left: 1em;
    font-size: 28px;

    @media (max-width: 767px) {
      display: flex;
      justify-content: flex-end;
      font-size: 21px;
      margin-left: .5em;
    }
  }

  label,
  span {
    color: #738b98;
    font-size: 16px;
    font-weight: normal;
    margin-right: .25rem;

    @media (min-width: 768px) {
      margin-right: 0;
      font-size: 20px;
    }
  }

  .level-complete {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    text-align: center;
  }

  .level-complete__title {
    margin-bottom: 2rem;
    color: white;
    font-size: clamp(36px, 15vw, 48px);
    font-weight: bold;
    text-transform: lowercase;

    small {
      font-size: 2rem;
      color: #738b98;
    }
  }

  .score-notification {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: clamp(21px, calc((var(--score) / 20) * 1px), 60px);
  }

  .score-notification__confetti {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: -1;
  }
</style>
