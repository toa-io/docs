<script lang="ts">
	// what is found, as the palette and the page of results show it
	let { result }: { result: SearchResult } = $props();

	// the passage is Markdown: its code is shown as code, every second part is one
	const parts = $derived(result.excerpt.split('`'));
</script>

<span class="flex min-w-0 flex-col gap-0.5">
	<span class="flex flex-wrap items-baseline gap-x-2">
		<span class="font-medium text-foreground">{result.title}</span>
		<span class="text-xs text-muted-foreground">{result.section} · {result.chapter}</span>
	</span>
	<span class="line-clamp-2 text-sm text-muted-foreground">
		{#each parts as part, index (index)}{#if index % 2 === 1}<code class="text-[0.9em]">{part}</code
				>{:else}{part}{/if}{/each}
	</span>
</span>
