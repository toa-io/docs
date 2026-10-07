import type { Plugin } from 'vite';
import { embed } from './embed.ts';
import { passages } from './passages.ts';

const ID = 'virtual:search-index';
const RESOLVED = `\0${ID}`;

/**
 * The index the search ranks by, as the `virtual:search-index` module: the passages of the
 * articles and their vectors, which are committed and completed when the site is built.
 *
 * A dev server has an empty one: embedding takes a while, and a query is embedded by Workers AI,
 * which a dev server does not reach, see README.
 */
export function index({ root }: { root: string }): Plugin {
	let build = false;

	return {
		name: 'search-index',
		configResolved(config) {
			build = config.command === 'build';
		},
		resolveId(id) {
			if (id === ID) return RESOLVED;
		},
		async load(id) {
			if (id !== RESOLVED) return;

			const found = build || process.env.REMOTE === 'true' ? passages(root) : [];
			const vectors = await embed(found);

			return `export default ${JSON.stringify({
				vectors,
				passages: found.map(({ href, anchor, text }) => ({ href, anchor, text }))
			})};`;
		}
	};
}
