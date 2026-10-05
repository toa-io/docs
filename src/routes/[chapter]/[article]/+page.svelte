<script lang="ts">
	import { page } from '$app/state';
	import { House } from '@lucide/svelte';
	import * as Footer from '#lib/footer/index.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const index = $derived(data.articles.findIndex((a) => a.href === page.url.pathname));
	const previous = $derived(index > 0 ? data.articles[index - 1] : undefined);
	const next = $derived(index === -1 ? undefined : data.articles[index + 1]);
</script>

<data.content />

<Footer.Start>
	{#if previous}
		<a href={previous.href} class="no-underline!">← {previous.title}</a>
	{/if}
</Footer.Start>

<Footer.Center>
	<a href="/" aria-label="Contents"><House class="size-4 text-muted-foreground" /></a>
</Footer.Center>

<Footer.End>
	{#if next}
		<a href={next.href} class="no-underline!">{next.title} →</a>
	{/if}
</Footer.End>
