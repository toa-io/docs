<script lang="ts">
	import { Command as CommandPrimitive } from 'bits-ui';
	import * as InputGroup from '#lib/components/ui/input-group/index.js';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { Spinner } from '#lib/components/ui/spinner/index.js';
	import { cn } from '#lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(''),
		loading = false,
		...restProps
	}: CommandPrimitive.InputProps & { loading?: boolean } = $props();
</script>

<div data-slot="command-input-wrapper" class="p-1">
	<InputGroup.Root
		class="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!"
	>
		<CommandPrimitive.Input
			{value}
			data-slot="command-input"
			class={cn(
				'w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...restProps}
		>
			{#snippet child({ props })}
				<InputGroup.Input {...props} bind:value bind:ref />
			{/snippet}
		</CommandPrimitive.Input>
		<InputGroup.Addon>
			<SearchIcon class="size-4 shrink-0 opacity-50" />
		</InputGroup.Addon>
		{#if loading}
			<InputGroup.Addon align="inline-end">
				<Spinner aria-label="Searching" />
			</InputGroup.Addon>
		{/if}
	</InputGroup.Root>
</div>
