import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import slug from 'rehype-slug';
import { links } from './src/lib/links.ts';

// Toa documentation sources: the `docs` directory of the `toa` repository
const docs = path.resolve(process.env.TOA_DOCS ?? '../toa/docs');

export default defineConfig({
	resolve: { alias: { $docs: docs } },
	server: { fs: { allow: [docs] } },
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			preprocess: [
				mdsvex({ extensions: ['.svx', '.md'], rehypePlugins: [slug, [links, { root: docs }]] })
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
