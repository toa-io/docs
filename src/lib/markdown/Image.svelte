<script lang="ts">
	interface Props {
		src: string;
		/** the picture of the dark scheme, where there is one */
		dark?: string;
		alt?: string;
		title?: string;
		/** how wide it is drawn, where that is not the text column */
		width?: number;
		/** its proportions, `width / height`: the room kept for it while it loads */
		ratio?: string;
	}

	let { src, dark, alt = '', title, width, ratio }: Props = $props();

	// the text column, and twice that for a dense screen
	const COLUMN = 768;
	const widths = $derived([width ?? COLUMN, (width ?? COLUMN) * 2]);
	const sizes = $derived(width === undefined ? '(min-width: 48rem) 48rem, 100vw' : `${width}px`);
	const UPLOAD = '/image/upload/';

	const hosted = (url: string) => url.includes('res.cloudinary.com') && url.includes(UPLOAD);

	// Cloudinary resizes and re-encodes an upload on request, by what its address says
	const sized = (url: string, width: number) =>
		hosted(url) ? url.replace(UPLOAD, `${UPLOAD}f_auto,q_auto,w_${width}/`) : url;

	const srcset = (url: string) =>
		hosted(url) ? widths.map((width) => `${sized(url, width)} ${width}w`).join(', ') : url;
</script>

<picture class="block">
	{#if dark}
		<source media="(prefers-color-scheme: dark)" srcset={srcset(dark)} {sizes} />
	{/if}
	<img
		src={sized(src, widths[1])}
		srcset={srcset(src)}
		{sizes}
		{alt}
		{title}
		loading="lazy"
		class={{ 'w-full': hosted(src), melting: dark !== undefined }}
		style:aspect-ratio={ratio}
	/>
</picture>
