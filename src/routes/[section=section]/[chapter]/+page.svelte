<script lang="ts">
	import { page } from '$app/state';
	import { ArrowUp } from '@lucide/svelte';
	import * as Footer from '#lib/footer/index.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const chapter = $derived(data.chapters.find((c) => c.href === page.url.pathname));
	const section = $derived(data.sections[`/${page.params.section}/`]);
	const articles = $derived(data.articles.filter((a) => a.chapter.href === page.url.pathname));
</script>

{#if chapter}
	<article class="flex-1">
		<a href={section.href} class="text-sm text-muted-foreground no-underline">{section.name}</a>

		<hgroup>
			<h1>{chapter.title}</h1>
			<p>{chapter.description}</p>
		</hgroup>

		<ol>
			{#each articles as article (article.href)}
				<li><a href={article.href}>{article.title}</a> — {article.summary}</li>
			{/each}
		</ol>
	</article>
{/if}

<Footer.Center>
	<a href={section.href} aria-label="Contents"><ArrowUp class="size-4 text-muted-foreground" /></a>
</Footer.Center>
