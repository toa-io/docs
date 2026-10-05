<script lang="ts">
	import Intro from '$docs/0.intro.md';
	import { House } from '@lucide/svelte';
	import * as Footer from '#lib/footer/index.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<article class="flex-1">
	<a href="/" class="text-sm text-muted-foreground no-underline">{data.home.name}</a>

	<h1>{data.model.title}</h1>

	<div class="intro space-y-4">
		<Intro />
	</div>
</article>

<Footer.Center>
	<a href="/" aria-label="Home"><House class="size-4 text-muted-foreground" /></a>
</Footer.Center>

<style>
	/* the title and the motto of the runtime are shown on the home page */
	.intro :global(> h1:first-child),
	.intro :global(> h1:first-child + p) {
		display: none;
	}

	/* the links of the contents are bold in the source */
	.intro :global(strong:has(> a)) {
		font-weight: normal;
	}
</style>
