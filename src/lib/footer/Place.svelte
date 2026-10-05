<script lang="ts">
	import { registry } from './registry.svelte.ts';

	const footer = registry();
</script>

<footer class="mt-auto pt-8 pb-4 text-sm text-muted-foreground">
	<div class="flex min-h-5 items-center [&>div]:flex-1">
		<div class="text-left">{@render footer.current('start')?.()}</div>
		<div class="flex items-center justify-center">{@render footer.current('center')?.()}</div>
		<div class="flex items-center justify-end text-right">{@render footer.current('end')?.()}</div>
	</div>
</footer>
