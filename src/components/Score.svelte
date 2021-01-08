<script>
  import { onDestroy } from "svelte"
  import { score, numberOfCellsToBeRemoved } from "../stores/score.js"

  onDestroy(() => {
    $score = 0
  })

  $: updateScore($numberOfCellsToBeRemoved)

  function updateScore() {
    const scoreToAdd = Math.floor(($numberOfCellsToBeRemoved * 10) * (1 + ($numberOfCellsToBeRemoved - 2) * .25))

    $score = $score + scoreToAdd
    $numberOfCellsToBeRemoved = 0
  }
</script>

<div class="score">
  <div class="score__column">
    <div class="line">
      <label>Score //</label>
    </div>

    <div class="line">
      { $score }
      <span>&lt;</span>
    </div>
  </div>

  <div class="score__column">
    <div class="line">
      <label>Cells remaining //</label>
    </div>

    <div class="line">
      { $numberOfCellsToBeRemoved }
      <span>&lt;</span>
    </div>
  </div>
</div>

<style lang="scss">
  .score {
    display: flex;
    margin-left: auto;
    text-align: right;
  }

  .score__column {
    margin-left: 1em;
  }

  label,
  span {
    color: #666;
    font-size: 20px;
    font-weight: normal;
  }
</style>
