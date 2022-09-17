<script>
  import { screen } from "../stores/screen.js"
  import { enableMusic, enableSfx } from "../stores/settings.js"

  $: saveToLocalStorage("enableMusic", $enableMusic)
  $: saveToLocalStorage("enableSfx", $enableSfx)

  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value)
  }
</script>

<div class="container">
  <div class="title"><small>[settings]</small></div>

  <div>
    <label>
      <div><span>&gt;</span> Enable music</div>

      <input type="checkbox" bind:checked={ $enableMusic } />
    </label>

    <label>
      <div><span>&gt;</span> Enable sound effects</div>

      <input type="checkbox" bind:checked={ $enableSfx } />
    </label>
  </div>

  <div class="tray">
    <div class="button" on:click={ () => { $screen = "menu" } }><span>&gt;</span> Return to menu</div>
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
  }

  .tray {
    margin-top: 5rem;
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

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: clamp(20px, 6.5vw, 24px);
    white-space: nowrap;
    text-transform: lowercase;

    span {
      color: #738b98;
      font-weight: bold;
    }
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    margin-left: 1rem;
    border: 3px solid #738b98;
    box-shadow: -4px 4px 0 #ccccff33, inset 0 0 0 4px black;

    &:checked {
      background: #c08706;
      border-color: #dfdfdf;
    }
  }
</style>
