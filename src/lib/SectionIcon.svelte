<script lang="ts">
	import { BookText, Brain } from '@lucide/svelte';

	// the icons the sections have on the home page
	const icons = { model: Brain, userspace: BookText };

	let { section, class: className }: { section?: string; class?: string } = $props();

	const Icon = $derived(icons[section as keyof typeof icons]);
</script>

<Icon class={className} />
