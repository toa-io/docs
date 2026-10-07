<script lang="ts">
	import { CornerDownLeft } from '@lucide/svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import * as Command from '#lib/components/ui/command/index.ts';
	import { palette } from './palette.svelte.ts';
	import Result from './Result.svelte';

	// the query is sent once typing has stopped for this long
	const PAUSE = 300;
	const MIN = 3;

	let query = $state('');
	let results = $state<SearchResult[]>([]);
	let status = $state<'idle' | 'loading' | 'found' | 'failed'>('idle');

	const trimmed = $derived(query.trim());
	const all = $derived(`/search/?q=${encodeURIComponent(trimmed)}`);

	$effect(() => {
		const q = trimmed;

		if (q.length < MIN) {
			results = [];
			status = 'idle';

			return;
		}

		status = 'loading';

		const controller = new AbortController();

		const timer = setTimeout(async () => {
			try {
				const response = await fetch(`/search/?q=${encodeURIComponent(q)}`, {
					headers: { accept: 'application/json' },
					signal: controller.signal
				});

				if (!response.ok) throw new Error(response.statusText);

				results = await response.json();
				status = 'found';
			} catch {
				// a request is aborted by the next one, which is not a failure
				if (!controller.signal.aborted) status = 'failed';
			}
		}, PAUSE);

		return () => {
			clearTimeout(timer);
			controller.abort();
		};
	});

	afterNavigate(() => {
		palette.open = false;
	});

	function typing(target: EventTarget | null) {
		return (
			target instanceof HTMLElement &&
			(target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
		);
	}

	function onkeydown(event: KeyboardEvent) {
		const keys = event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey);
		const slash = event.key === '/' && !palette.open && !typing(event.target);

		if (!keys && !slash) return;

		event.preventDefault();
		palette.open = keys ? !palette.open : true;
	}
</script>

<svelte:window {onkeydown} />

<Command.Dialog
	bind:open={palette.open}
	title="Search"
	description="Search the documentation"
	shouldFilter={false}
	class="top-[12%] sm:max-w-xl"
>
	<Command.Input bind:value={query} aria-label="Search the documentation" />

	<!-- without results there is only the field -->
	{#if status === 'failed'}
		<p class="px-3 py-6 text-center text-sm text-destructive">
			Search is unavailable. Try again in a moment.
		</p>
	{:else if results.length > 0}
		<Command.List class="max-h-[min(28rem,60dvh)]">
			<Command.Group class={status === 'loading' ? 'opacity-50 transition-opacity' : ''}>
				{#each results as result (result.href)}
					<Command.LinkItem
						href={result.href}
						value={result.href}
						class="items-start px-3 py-2 no-underline"
						onSelect={() => goto(result.href)}
					>
						<Result {result} />
					</Command.LinkItem>
				{/each}

				<Command.LinkItem
					href={all}
					value={all}
					class="px-3 py-2 text-muted-foreground no-underline"
					onSelect={() => goto(all)}
				>
					All results for “{trimmed}”
					<CornerDownLeft
						class="ml-auto size-3.5 opacity-0 group-data-selected/command-item:opacity-100"
					/>
				</Command.LinkItem>
			</Command.Group>
		</Command.List>
	{/if}
</Command.Dialog>
