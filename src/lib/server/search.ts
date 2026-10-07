import { env } from 'cloudflare:workers';
import { error } from '@sveltejs/kit';
import index from 'virtual:search-index';
import { prepare, rank } from '#lib/search/rank.ts';
import { articles, sections } from '#lib/server/contents.ts';

// the model the passages are embedded with when the site is built, see `#lib/search/index`
const MODEL = '@cf/baai/bge-small-en-v1.5';

// what the model is trained to find passages by
const INSTRUCTION = 'Represent this sentence for searching relevant passages: ';

const LIMIT = 8;
const EXCERPT = 320;

const found = new Map(articles.map((article) => [article.href, article]));

const prepared = prepare(
	index,
	Object.fromEntries(articles.map(({ href, title, keywords }) => [href, `${title} ${keywords}`]))
);

/**
 * The articles whose passages answer the query, the best first: a result leads to the passage.
 *
 * The query is embedded by Workers AI and compared here with every passage of the index, which
 * is built with the site, see README.
 */
export async function search(query: string, address: string): Promise<SearchResult[]> {
	const { success } = await env.SEARCH_LIMIT.limit({ key: address });

	if (!success) error(429, 'Too many searches');

	const vector = await embed(query);

	return rank(prepared, query, vector)
		.filter(({ passage }) => found.has(passage.href))
		.slice(0, LIMIT)
		.map(({ passage, score }) => {
			const article = found.get(passage.href)!;

			return {
				href: passage.anchor === undefined ? article.href : `${article.href}#${passage.anchor}`,
				title: article.title,
				section: sections[article.section].name,
				chapter: article.chapter.title,
				excerpt: excerpt(passage.text),
				score
			};
		});
}

async function embed(query: string) {
	try {
		const { data } = await env.AI.run(MODEL, { text: [INSTRUCTION + query], pooling: 'cls' });

		return data[0];
	} catch (cause) {
		// the model is at Cloudflare only: a dev server does not reach it without credentials
		console.error(cause);
		error(503, 'Search is unavailable');
	}
}

function excerpt(text: string) {
	const line = text.replace(/\s+/g, ' ');

	return line.length > EXCERPT ? `${line.slice(0, EXCERPT).replace(/\s+\S*$/, '')}…` : line;
}
