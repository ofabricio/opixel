<script lang="ts">
	import Tools from "./comps/Tools.svelte";
	import Canvas from "./comps/Canvas.svelte";
</script>

<div class="container">
	<Tools />

	<Canvas />
</div>

<style>
	.container {
		padding: 0.5rem;
		display: grid;
		height: 100%;
		gap: 0.5rem;

		grid-template-columns: auto 1fr;
		grid-template-rows: auto;
		grid-template-areas: "tools canvas";
	}
</style>
