<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import * as Footer from '#lib/footer/index.ts';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const article = $derived(data.articles.find((a) => a.href === page.url.pathname));
	const title = $derived(
		article === undefined ? `${data.home.name}: ${data.home.title}` : `${article.title} · Toa`
	);
	const description = $derived(article?.description ?? data.home.motto);
	const keywords = $derived(article?.keywords ?? data.home.keywords);
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="keywords" content={keywords} />
</svelte:head>

<div class="container mx-auto flex min-h-dvh max-w-5xl flex-col p-4">
	<article class="flex-1">
		{#if article}
			<a href={article.chapter.href} class="text-sm text-muted-foreground no-underline!">
				{article.chapter.number}
				{article.chapter.title}
			</a>
		{/if}
		{@render children()}
	</article>
	<Footer.Place />
</div>
