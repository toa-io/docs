<script lang="ts">
	import { Search } from '@lucide/svelte';
	import { palette } from './palette.svelte.ts';
</script>

<!-- the keys that open the palette; a screen that is touched has none and shows a magnifier -->
<button
	type="button"
	class="-m-2 cursor-pointer p-2 hover:text-foreground"
	aria-label="Search"
	aria-keyshortcuts="Meta+K Control+K /"
	onclick={() => (palette.open = true)}
>
	<kbd class="keys rounded-sm border px-1.5 py-0.5 font-sans text-xs">
		<span class="mac">⌘K</span><span class="other">Ctrl K</span>
	</kbd>
	<Search class="touch size-4" />
</button>

<style>
	/* `mac` is set on the document before it is painted, see `app.html` */
	.mac,
	:global(html.mac) .other,
	button :global(.touch) {
		display: none;
	}

	:global(html.mac) .mac {
		display: inline;
	}

	@media (pointer: coarse) {
		.keys {
			display: none;
		}

		button :global(.touch) {
			display: block;
		}
	}
</style>
