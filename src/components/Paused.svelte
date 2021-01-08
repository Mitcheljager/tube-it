<script>
  import { paused, screen } from "../stores/screen.js"
</script>

<div class="fullscreen">
  <div class="title">[Paused]</div>

  <div>
    <div class="button" on:click={ () => { $paused = !$paused } }><span>&gt;</span> Continue</div>
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
    background: darken(#12191d, 5%);
  }

  .title {
    margin-bottom: 2rem;
    color: #c08706;
    font-size: 48px;
    font-weight: bold;
    text-transform: lowercase;
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
</style>
