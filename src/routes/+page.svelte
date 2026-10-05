<script lang="ts">
	import { BookText, Brain, ChevronRight } from '@lucide/svelte';
	import * as Footer from '#lib/footer/index.ts';
	import * as Item from '#lib/components/ui/item/index.ts';
	import GitHub from '#lib/GitHub.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="flex flex-1 flex-col justify-center gap-12">
	<header class="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
		<div class="md:flex-1">
			<h1 class="pb-0 text-6xl md:pb-0 md:text-7xl">{data.home.name}</h1>
			<p class="mt-2 text-xl text-muted-foreground">{data.home.title}</p>
		</div>
		<p class="text-lg text-balance text-foreground md:flex-1 md:border-l md:pl-10">
			{data.home.motto}
		</p>
	</header>

	<nav>
		<div class="grid w-fit auto-cols-fr gap-4 sm:grid-flow-col">
			<Item.Root variant="outline">
				{#snippet child({ props })}
					<a href="/model/" {...props} class={[props.class, 'no-underline hover:text-foreground']}>
						<Item.Media variant="icon"><Brain /></Item.Media>
						<Item.Content>
							<Item.Title>Mental model</Item.Title>
							<Item.Description>Understanding the runtime</Item.Description>
						</Item.Content>
						<Item.Actions><ChevronRight class="size-4" /></Item.Actions>
					</a>
				{/snippet}
			</Item.Root>

			<Item.Root variant="outline" aria-disabled="true" class="opacity-50">
				<Item.Media variant="icon"><BookText /></Item.Media>
				<Item.Content>
					<Item.Title>Userspace</Item.Title>
					<Item.Description>How to use</Item.Description>
				</Item.Content>
				<Item.Actions><ChevronRight class="size-4" /></Item.Actions>
			</Item.Root>
		</div>
	</nav>
</main>

<Footer.Center>
	<a href="https://github.com/toa-io/toa" aria-label="Toa on GitHub" class="text-muted-foreground">
		<GitHub />
	</a>
</Footer.Center>

<Footer.End>
	<a href="https://creativecommons.org/licenses/by/4.0/" class="text-xs">CC BY 4.0</a>
</Footer.End>
