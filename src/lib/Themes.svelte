<script lang="ts">
	// Temporary: a switcher to choose the color theme
	import { onMount } from 'svelte';

	const themes = ['ink', 'pine', 'plum', 'ember', 'tide'];

	let current = $state<string>();

	onMount(() => {
		current = document.documentElement.dataset.theme;
	});

	function select(theme?: string) {
		current = theme;

		if (theme === undefined) {
			delete document.documentElement.dataset.theme;
			localStorage.removeItem('theme');
		} else {
			document.documentElement.dataset.theme = theme;
			localStorage.setItem('theme', theme);
		}
	}
</script>

<div class="flex flex-wrap items-center gap-2 pt-8 text-sm">
	<button class:font-bold={current === undefined} onclick={() => select()}>default</button>
	{#each themes as theme (theme)}
		<button
			data-theme={theme}
			class="theme rounded-md border px-3 py-1"
			class:font-bold={current === theme}
			onclick={() => select(theme)}
		>
			{theme}
		</button>
	{/each}
</div>

<style>
	button {
		cursor: pointer;
	}

	.theme {
		background: var(--background);
		color: var(--foreground);
		border-color: var(--muted-foreground);
	}
</style>
