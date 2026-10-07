<script lang="ts">
	import { page } from '$app/state';
	import SectionIcon from '#lib/SectionIcon.svelte';
	import * as Footer from '#lib/footer/index.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const article = $derived(data.articles.find((a) => a.href === page.url.pathname));
	// the reading order is that of the section
	const siblings = $derived(data.articles.filter((a) => a.section === article?.section));
	const index = $derived(siblings.findIndex((a) => a.href === page.url.pathname));
	const previous = $derived(index > 0 ? siblings[index - 1] : undefined);
	const next = $derived(index === -1 ? undefined : siblings[index + 1]);
</script>

<article class="flex-1">
	{#if article}
		<a href={article.chapter.anchor} class="text-sm text-muted-foreground no-underline">
			{article.chapter.number}
			{article.chapter.title}
		</a>
	{/if}

	<data.content />
</article>

<Footer.Start>
	{#if previous}
		<!-- a narrow screen has no room for the titles: the arrows stay -->
		<a
			href={previous.href}
			class="-m-3 p-3 text-base no-underline sm:m-0 sm:p-0 sm:text-sm"
			aria-label={previous.title}
		>
			←<span class="hidden sm:inline">&nbsp;{previous.title}</span>
		</a>
	{/if}
</Footer.Start>

<Footer.Center>
	<a href={`/${page.params.section}/`} aria-label="Contents"
		><SectionIcon section={page.params.section} class="size-4 text-muted-foreground" /></a
	>
</Footer.Center>

<Footer.End>
	{#if next}
		<a
			href={next.href}
			class="-m-3 p-3 text-base no-underline sm:m-0 sm:p-0 sm:text-sm"
			aria-label={next.title}
		>
			<span class="hidden sm:inline">{next.title}&nbsp;</span>→
		</a>
	{/if}
</Footer.End>
