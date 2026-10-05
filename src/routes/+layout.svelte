<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { House } from '@lucide/svelte';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const index = $derived(data.articles.findIndex((a) => a.href === page.url.pathname));
	const article = $derived(data.articles[index]);
	const previous = $derived(index > 0 ? data.articles[index - 1] : undefined);
	const next = $derived(index === -1 ? undefined : data.articles[index + 1]);
	const title = $derived(article === undefined ? 'Toa' : `${article.title} · Toa`);
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<title>{title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<div class="container mx-auto flex min-h-dvh max-w-5xl flex-col p-4">
	<article class="flex-1">
		{@render children()}
	</article>
	{#if page.url.pathname !== '/'}
		<footer class="mt-auto mb-4 pt-4 text-sm text-muted-foreground">
			<div class="my-4 flex items-center [&>div]:flex-1">
				<div class="text-left">
					{#if previous}
						<a href={previous.href} class="no-underline!">← {previous.title}</a>
					{/if}
				</div>
				<div class="flex items-center justify-center">
					<a href="/" aria-label="Contents"><House class="size-4 text-muted-foreground" /></a>
				</div>
				<div class="text-right">
					{#if next}
						<a href={next.href} class="no-underline!">{next.title} →</a>
					{/if}
				</div>
			</div>
		</footer>
	{/if}
</div>
