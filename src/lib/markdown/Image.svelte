<script lang="ts">
	interface Props {
		src: string;
		/** the picture of the dark scheme, where there is one */
		dark?: string;
		alt?: string;
		title?: string;
	}

	let { src, dark, alt = '', title }: Props = $props();

	// the text column, and twice that for a dense screen
	const WIDTHS = [768, 1536];
	const SIZES = '(min-width: 48rem) 48rem, 100vw';
	const UPLOAD = '/image/upload/';

	const hosted = (url: string) => url.includes('res.cloudinary.com') && url.includes(UPLOAD);

	// Cloudinary resizes and re-encodes an upload on request, by what its address says
	const sized = (url: string, width: number) =>
		hosted(url) ? url.replace(UPLOAD, `${UPLOAD}f_auto,q_auto,w_${width}/`) : url;

	const srcset = (url: string) =>
		hosted(url) ? WIDTHS.map((width) => `${sized(url, width)} ${width}w`).join(', ') : url;
</script>

<picture class="block">
	{#if dark}
		<source media="(prefers-color-scheme: dark)" srcset={srcset(dark)} sizes={SIZES} />
	{/if}
	<img
		src={sized(src, WIDTHS[1])}
		srcset={srcset(src)}
		sizes={SIZES}
		{alt}
		{title}
		loading="lazy"
		class={{ 'w-full': hosted(src), melting: dark !== undefined }}
	/>
</picture>
