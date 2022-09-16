<script>
  import { onMount } from "svelte"
  import { score, numberOfCellsToBeRemoved, level } from "../stores/score.js"
  import { cells } from "../stores/cells.js"
  import { levelComplete } from "../stores/screen.js"
  import { enableSfx } from "../stores/settings.js"

  $: remainingCells = 30

  onMount(() => {
    remainingCells = 30
    $score = 0
  })

  $: updateScore($numberOfCellsToBeRemoved)
  $: if (remainingCells <= 0) setNextLevel()

  function updateScore() {
    const scoreToAdd = Math.floor(($numberOfCellsToBeRemoved * 10) * (1 + ($numberOfCellsToBeRemoved - 2) * .25))

    score.set($score + scoreToAdd)
    remainingCells = remainingCells - $numberOfCellsToBeRemoved

    if ($score > 0) playScoreAudio()
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
    }, 2500)
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
  <div class="level-complete">
    <div class="level-complete__title">
      <small>[</small>Complete<small>]</small>
    </div>

    Initiating next level...
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

  @keyframes fade-in-level-complete {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
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
    opacity: 0;
    animation: fade-in-level-complete 250ms 500ms forwards;
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
</style>
