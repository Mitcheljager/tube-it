<script>
  import { screen } from "./stores/screen.js"
  import Game from "./components/Game.svelte"
  import Menu from "./components/Menu.svelte"
  import Tutorial from "./components/Tutorial.svelte"
	import Settings from "./components/Settings.svelte"

  const screens = [
    { component: Game, identifier: "game" },
    { component: Menu, identifier: "menu" },
    { component: Tutorial, identifier: "tutorial" },
		{ component: Settings, identifier: "settings" }
  ]
</script>

<svelte:component this={ screens.filter(i =>  i.identifier == $screen)[0].component } />

<style lang="scss">
	:global(:root) {
		font-size: 14px;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		padding: 0;
    background: darken(#12191d, 5%);
    font-family: "Consolas", monospace;
    color: #e5e5e5;
	}

	:global(p) {
		margin: 0;
	}
</style>
