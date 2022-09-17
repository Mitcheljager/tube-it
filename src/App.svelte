<script>
  import { onMount } from "svelte"
  import { screen } from "./stores/screen.js"
	import { enableMusic, enableSfx } from "./stores/settings.js"
	import { Capacitor } from '@capacitor/core'
  import Game from "./components/Game.svelte"
  import Menu from "./components/Menu.svelte"
  import Tutorial from "./components/Tutorial.svelte"
	import Settings from "./components/Settings.svelte"
	import NativeSettings from "./components/NativeSettings.svelte"

  const screens = [
    { component: Game, identifier: "game" },
    { component: Menu, identifier: "menu" },
    { component: Tutorial, identifier: "tutorial" },
		{ component: Settings, identifier: "settings" }
  ]

	onMount(() => {
		$enableMusic = getFromLocalStorage("enableMusic", true)
		$enableSfx = getFromLocalStorage("enableSfx", true)
	})

	function getFromLocalStorage(key, defaultValue) {
		const value = localStorage.getItem(key)

		if (value == "false") return false
		if (value == "true") return true
		if (value) return value
		return defaultValue
	}
</script>

{#if Capacitor.isNativePlatform()}
	<NativeSettings />
{/if}

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
