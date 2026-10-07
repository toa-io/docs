<script lang="ts">
	import type { Snippet } from 'svelte';
	import Image from './Image.svelte';

	interface Props {
		src: string;
		/** the picture of the dark scheme, where there is one */
		dark?: string;
		alt?: string;
		ratio?: string;
		children: Snippet;
	}

	let { src, dark, alt, ratio, children }: Props = $props();

	// how wide the picture is drawn
	const WIDTH = 384;
	// the part of it that takes room beside the text
	const INSIDE = 3 / 4;
</script>

<!--
	Text with a picture to its right. The text starts where the headings do. Part of the picture
	takes room beside it and pushes the text; the rest hangs past the edge of the page, so a
	narrower window shows less of it, down to that part. Where there is no room for text beside
	it, the picture is gone.
-->
<div class="illustrated flex items-start gap-8">
	<div class="illustrated-text min-w-0 flex-1 space-y-4">
		{@render children()}
	</div>
	<div class="illustrated-picture hidden shrink-0 md:block" style:width="{WIDTH * INSIDE}px">
		<div style:width="{WIDTH}px">
			<Image {src} {dark} {alt} {ratio} width={WIDTH} />
		</div>
	</div>
</div>
