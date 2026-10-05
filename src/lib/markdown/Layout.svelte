<script module lang="ts">
	// components the documents are rendered with
	export {
		default as h2,
		default as h3,
		default as h4,
		default as h5,
		default as h6
	} from './Heading.svelte';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
