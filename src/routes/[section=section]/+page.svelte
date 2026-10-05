<script lang="ts">
	import Model from '$content/model/0.intro.md';
	import Userspace from '$content/userspace/0.intro.md';
	import { House } from '@lucide/svelte';
	import { page } from '$app/state';
	import * as Footer from '#lib/footer/index.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const intros = { model: Model, userspace: Userspace };

	const section = $derived(data.sections[page.url.pathname]);
	const Intro = $derived(intros[page.params.section as keyof typeof intros]);
</script>

<article class="flex-1">
	<a href="/" class="text-sm text-muted-foreground no-underline">{data.home.name}</a>

	<h1>{section.title}</h1>

	<div class={['intro space-y-4', page.params.section]}>
		<Intro />
	</div>
</article>

<Footer.Center>
	<a href="/" aria-label="Home"><House class="size-4 text-muted-foreground" /></a>
</Footer.Center>

<style>
	/* the title of a section is the heading of the page */
	.intro :global(> h1:first-child),
	/* and the motto of the runtime is shown on the home page */
	.intro.model :global(> h1:first-child + p) {
		display: none;
	}

	/* the links of the contents are bold in the source */
	.intro :global(strong:has(> a)) {
		font-weight: normal;
	}
</style>
