import { error } from '@sveltejs/kit';
import { articles, sections } from '#lib/server/contents.ts';

// passages asked of the index, and articles answered
const PASSAGES = 20;
const LIMIT = 8;

// what a word of the query found in the title adds to the score of a passage, which is 0 to 1
const TITLE = 0.25;
const EXCERPT = 320;

const found = new Map(articles.map((article) => [article.href, article]));

/**
 * The articles whose passages answer the query, the best first.
 *
 * The index holds passages of the pages the site is crawled into, see README: a passage is
 * known by the address of its page, and an article is as good as its best passage.
 */
export async function search(
	platform: App.Platform | undefined,
	query: string,
	address: string
): Promise<SearchResult[]> {
	const env = platform?.env;

	// where the index is not bound: a dev server without the credentials of Cloudflare
	if (env?.SEARCH === undefined)
		error(
			503,
			`Search is unavailable: ${env === undefined ? 'no env' : Object.keys(env).join(' ')}`
		);

	const { success } = await env.SEARCH_LIMIT.limit({ key: address });

	if (!success) error(429, 'Too many searches');

	const { chunks } = await env.SEARCH.search({
		query,
		ai_search_options: { retrieval: { retrieval_type: 'hybrid', max_num_results: PASSAGES } }
	});

	const words = query.toLowerCase().split(/\s+/).filter(Boolean);
	const results = new Map<string, SearchResult>();

	for (const chunk of chunks) {
		const article = found.get(pathname(chunk.item.key));

		// the home page and the contents of a section are indexed as well
		if (article === undefined) continue;

		const title = article.title.toLowerCase();
		const share = words.filter((word) => title.includes(word)).length / words.length;
		const score = chunk.score + TITLE * share;

		if (score <= (results.get(article.href)?.score ?? -Infinity)) continue;

		results.set(article.href, {
			href: article.href,
			title: article.title,
			section: sections[article.section].name,
			chapter: article.chapter.title,
			excerpt: excerpt(chunk.text),
			score
		});
	}

	return [...results.values()].sort((a, b) => b.score - a.score).slice(0, LIMIT);
}

// `https://toa.io/model/basics/calls` → `/model/basics/calls/`
function pathname(key: string) {
	const path = key.replace(/^(?:https?:\/\/)?[^/]*/, '').replace(/[?#].*$/, '');

	return path.endsWith('/') ? path : `${path}/`;
}

// a passage is Markdown: what is left of it is its text and its code
function excerpt(markdown: string) {
	const text = markdown
		.replace(/```\w*/g, '')
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/^\s*(?:#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
		.replace(/(\*\*|__|\*|_)(?=\S)(.+?)(?<=\S)\1/g, '$2')
		.replace(/\s+/g, ' ')
		.trim();

	return text.length > EXCERPT ? `${text.slice(0, EXCERPT).replace(/\s+\S*$/, '')}…` : text;
}
