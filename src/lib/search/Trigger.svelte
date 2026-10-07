<script lang="ts">
	import { Search } from '@lucide/svelte';
	import { palette } from './palette.svelte.ts';

	function open() {
		keyboard();
		palette.open = true;
	}

	// A phone shows its keyboard only for a field focused by the touch itself, and the field of
	// the palette is focused after it: a field focused now holds the keyboard until that one is.
	function keyboard() {
		const field = document.createElement('input');

		field.style.cssText = 'position: fixed; top: 0; opacity: 0; height: 0; font-size: 16px';
		document.body.append(field);
		field.focus();
		setTimeout(() => field.remove(), 1000);
	}
</script>

<!-- the keys that open the palette; a screen that is touched has none and shows a magnifier -->
<button
	type="button"
	class="-m-2 cursor-pointer p-2 hover:text-foreground"
	aria-label="Search"
	aria-keyshortcuts="Meta+K Control+K /"
	onclick={open}
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
