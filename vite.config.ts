import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import slug from 'rehype-slug';
import { links } from './src/lib/links.ts';

// the documents the pages are rendered from
const content = path.resolve('content');

export default defineConfig({
	resolve: { alias: { $content: content } },
	// the documents are outside of what the dev server serves by default
	server: { fs: { allow: [content] } },
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				// Documents are an exception as well: mdsvex generates legacy components.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') || filename.endsWith('.md')
						? undefined
						: true
			},
			adapter: adapter(),
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					layout: path.resolve('src/lib/markdown/Layout.svelte'),
					rehypePlugins: [slug, [links, { root: content }]]
				})
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
