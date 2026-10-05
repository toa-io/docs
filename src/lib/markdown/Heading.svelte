<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		level: string;
		id?: string;
		subtitle?: string;
		children: Snippet;
	}

	let { level, id, subtitle, children }: Props = $props();
</script>

{#snippet heading()}
	<svelte:element this={`h${level}`} {id}>
		{#if id}
			<a href="#{id}" class="mark" aria-label="Link to this section">§</a>
		{/if}{@render children()}
	</svelte:element>
{/snippet}

{#if subtitle}
	<hgroup>
		{@render heading()}
		<p class="text-muted-foreground" class:pl-5={id}>{subtitle}</p>
	</hgroup>
{:else}
	{@render heading()}
{/if}

<style>
	/* of a fixed width: the subtitle is indented by it, to start where the text of the heading does */
	.mark {
		display: inline-block;
		width: 1.25rem;
		font-weight: normal;
		text-decoration: none;
		color: color-mix(in oklab, var(--muted-foreground) 50%, transparent);
	}

	.mark:hover {
		color: var(--muted-foreground);
	}
</style>
