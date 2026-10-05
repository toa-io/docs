<script lang="ts">
	import type { Snippet } from 'svelte';
	import { register } from './registry.svelte.ts';

	let { children }: { children: Snippet } = $props();

	register('center', () => children);
</script>
