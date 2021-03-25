<script>
  import { screen } from "../stores/screen.js"

</script>

<div class="container">
  <div class="title"><small>[</small>Tube<small>-</small><span>it</span><small>]</small></div>

  <div>
    <div class="button" on:click={ () => { $screen = "game" } }><span>&gt;</span> Start</div>
    <div class="button" on:click={ () => { $screen = "tutorial" } }><span>&gt;</span> Tutorial</div>
    <div class="button" on:click={ () => { $screen = "settings" } }><span>&gt;</span> Settings</div>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: darken(#12191d, 5%);
    text-shadow: -4px 4px 0 #ccccff33;
  }

  .title {
    margin-bottom: 2rem;
    color: #bd1d46;
    font-size: 48px;
    font-weight: bold;
    text-transform: lowercase;

    small {
      font-size: .75em;
      color: #738b98;
    }

    span {
      color: #c08706;
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
      color: #738b98
    }
  }
</style>
