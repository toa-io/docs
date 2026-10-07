<script lang="ts">
	import { House, Search } from '@lucide/svelte';
	import * as Footer from '#lib/footer/index.ts';
	import * as InputGroup from '#lib/components/ui/input-group/index.ts';
	import Result from '#lib/search/Result.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<article class="flex-1">
	<a href="/" class="text-sm text-muted-foreground no-underline">{data.home.name}</a>

	<h1>Search</h1>

	<form action="/search/" role="search">
		<InputGroup.Root class="h-10">
			<InputGroup.Input
				type="search"
				name="q"
				value={data.query}
				aria-label="Search the documentation"
				autocomplete="off"
				class="text-base"
			/>
			<InputGroup.Addon><Search /></InputGroup.Addon>
		</InputGroup.Root>
	</form>

	{#if data.results.length > 0}
		<ol class="list-none space-y-1 pl-0">
			{#each data.results as result (result.href)}
				<li>
					<a
						href={result.href}
						class="-mx-3 block rounded-lg px-3 py-2 no-underline hover:bg-muted"
					>
						<Result {result} />
					</a>
				</li>
			{/each}
		</ol>
	{:else if data.query !== ''}
		<p class="text-muted-foreground">Nothing found for “{data.query}”.</p>
	{/if}
</article>

<Footer.Center>
	<a href="/" aria-label="Home"><House class="size-4 text-muted-foreground" /></a>
</Footer.Center>
