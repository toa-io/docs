<script lang="ts">
	import Intro from '$docs/0.intro.md';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="flex flex-col gap-6 py-12 md:flex-row md:items-center md:gap-10 md:py-20">
	<div class="md:flex-1">
		<p class="text-6xl font-bold tracking-tight md:text-7xl">{data.home.name}</p>
		<p class="mt-2 text-xl text-muted-foreground">{data.home.title}</p>
	</div>
	<p class="border-muted-foreground/25 text-lg text-balance md:flex-1 md:border-l md:pl-10">
		{data.home.motto}
	</p>
</section>

<div class="intro space-y-4">
	<Intro />
</div>

<style>
	/* the title and the motto are shown in the hero */
	.intro :global(> h1:first-child),
	.intro :global(> h1:first-child + p) {
		display: none;
	}
</style>
