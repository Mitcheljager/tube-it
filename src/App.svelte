<script>
  import Grid from "./components/Grid.svelte"
</script>

<main class="board">
	<div class="board__info"></div>
	<div class="board__content">
		<Grid />
	</div>
</main>

<style>
	:global(:root) {
		font-size: 14px;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: "Consolas", monospace;
	}

	:global(p) {
		margin: 0;
	}

	.board {
		display: grid;
		grid-template:
			"info"
			"content";
		grid-template-rows: 100px auto;
		background: black;
		color: lightgray;
		height: 100vh;
	}

	.board__info {
		grid-area: info;
	}

	.board__content {
		grid-area: content;
		display: flex;
		justify-content: center;
	}
</style>
