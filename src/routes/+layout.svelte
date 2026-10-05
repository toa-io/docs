<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import * as Footer from '#lib/footer/index.ts';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const meta = $derived.by(() => {
		const article = data.articles.find((a) => a.href === page.url.pathname);

		if (article !== undefined) return { ...article, title: `${article.title} · Toa` };
		const chapter = data.chapters.find((c) => c.href === page.url.pathname);

		if (chapter !== undefined) return { ...chapter, title: `${chapter.title} · Toa` };
		if (page.url.pathname === '/model/')
			return { ...data.model, title: `${data.model.title} · Toa` };

		return {
			title: `${data.home.name}: ${data.home.title}`,
			description: data.home.motto,
			keywords: data.home.keywords
		};
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<title>{meta.title}</title>
	<meta property="og:title" content={meta.title} />
	<meta name="description" content={meta.description} />
	<meta property="og:description" content={meta.description} />
	<meta name="keywords" content={meta.keywords} />
</svelte:head>

<div class="container mx-auto flex min-h-dvh max-w-5xl flex-col p-4">
	{@render children()}
	<Footer.Place />
</div>
