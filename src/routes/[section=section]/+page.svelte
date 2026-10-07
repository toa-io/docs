<script lang="ts">
	import Model from '$content/model/0.intro.md';
	import Userspace from '$content/userspace/0.intro.md';
	import { House } from '@lucide/svelte';
	import { page } from '$app/state';
	import * as Footer from '#lib/footer/index.ts';
	import { Clipboard } from '#lib/components/clipboard/index.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const intros = { model: Model, userspace: Userspace };

	// installs the section as an agent skill, see `skills`
	const SKILL = 'npx skills add toa-io/docs';

	const section = $derived(data.sections[page.url.pathname]);
	const Intro = $derived(intros[page.params.section as keyof typeof intros]);
</script>

<article class="flex-1">
	<a href="/" class="text-sm text-muted-foreground no-underline">{data.home.name}</a>

	<h1>{section.title}</h1>

	<div class={['intro space-y-4', page.params.section]}>
		<Intro />

		{#if page.params.section === 'userspace'}
			<div class="skill">
				<Clipboard text={SKILL} label={SKILL} variant="outline" size="sm" class="font-mono" />
			</div>
		{/if}
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

	/* the skill is shown after the opening of the introduction, before its first chapter */
	.intro.userspace {
		display: flex;
		flex-direction: column;

		/* what is centered in the text column keeps its width */
		> :global(*) {
			width: 100%;
		}

		> :global(:is(h2, hgroup)),
		> :global(:is(h2, hgroup) ~ *) {
			order: 2;
		}

		> .skill {
			display: flex;
			justify-content: center;
			order: 1;
			margin-block: 1.5rem 2rem;
		}
	}

	/*
	 * An introduction that opens with an illustrated text: the picture stands beside the title as
	 * well, from the top of the page. The title, the text and the picture are laid out as one grid.
	 */
	@media (min-width: 48rem) {
		article:has(:global(.intro > .illustrated)) {
			display: grid;
			grid-template-columns: minmax(0, 1fr) auto;
			/* a picture taller than what stands beside it leaves the room under the text */
			grid-template-rows: auto auto 1fr;
			column-gap: 2rem;
			align-content: start;

			> :global(*) {
				grid-column: 1 / -1;
			}

			> a {
				grid-area: 1 / 1;
				justify-self: start;
				/* a grid item takes the space set between blocks, which a link in a line did not */
				margin-block: 0;
			}

			> h1 {
				grid-area: 2 / 1;
			}

			> .intro,
			:global(.intro > .illustrated) {
				display: contents;
			}

			:global(.intro > *) {
				grid-column: 1 / -1;
			}

			:global(.illustrated-text) {
				grid-area: 3 / 1;
				margin-bottom: 1rem;
			}

			:global(.illustrated-picture) {
				grid-area: 1 / 2 / 4 / 3;
			}
		}
	}

	/* the links of the contents are bold in the source */
	.intro :global(strong:has(> a)) {
		font-weight: normal;
	}
</style>
