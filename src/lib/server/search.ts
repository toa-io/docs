import { env } from 'cloudflare:workers';
import { error } from '@sveltejs/kit';
import { articles, sections } from '#lib/server/contents.ts';

// passages asked of the index, and articles answered
const PASSAGES = 20;
const LIMIT = 8;

// what a word of the query found in the title adds to the score of a passage, which is 0 to 1
const TITLE = 0.25;
const EXCERPT = 320;

// the score under which a passage has nothing to do with the query
const WORTH = 0.05;

// how alike a passage is to the query at least, 0 to 1
const THRESHOLD = 0.2;

const found = new Map(articles.map((article) => [article.href, article]));

/**
 * The articles whose passages answer the query, the best first.
 *
 * The index holds passages of the pages the site is crawled into, see README: a passage is
 * known by the address of its page, and an article is as good as its best passage.
 */
export async function search(query: string, address: string, probe = ''): Promise<SearchResult[]> {
	const { success } = await env.SEARCH_LIMIT.limit({ key: address });

	if (!success) error(429, 'Too many searches');

	const chunks = await passages(query, probe);

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

	const sorted = [...results.values()].sort((a, b) => b.score - a.score);

	// the best is shown whatever its score is, the rest if they are any good
	return sorted.filter((result, index) => index === 0 || result.score >= WORTH).slice(0, LIMIT);
}

async function passages(query: string, probe: string) {
	try {
		const { chunks } = await env.SEARCH.search({
			query,
			ai_search_options: {
				retrieval: {
					retrieval_type: probe.includes('v')
						? 'vector'
						: probe.includes('k')
							? 'keyword'
							: 'hybrid',
					// a question in the reader's words shares few words with its answer
					keyword_match_mode: 'or',
					match_threshold: THRESHOLD,
					max_num_results: probe.includes('f') ? 8 : PASSAGES
				},
				// the order is the reranker's, and what it thinks little of is still shown, last
				reranking: { enabled: !probe.includes('n'), match_threshold: 0 }
			}
		});

		return chunks;
	} catch (cause) {
		// the index is at Cloudflare only: a dev server does not reach it without credentials
		console.error(cause);
		error(503, 'Search is unavailable');
	}
}

// `https://toa.io/model/basics/calls` → `/model/basics/calls/`
function pathname(key: string) {
	const path = key.replace(/^(?:https?:\/\/)?[^/]*/, '').replace(/[?#].*$/, '');

	return path.endsWith('/') ? path : `${path}/`;
}

// A passage is Markdown of a crawled page: what is left of it is its text and its code. The first
// passage of a page opens with what the crawler read from its head, the link to its chapter and
// its title, which the result shows by itself.
function excerpt(markdown: string) {
	const text = markdown
		.replace(/^\s*---\n[^]*?\n---\n/, '')
		.replace(/^\s*\[[^\]]*\]\([^)]*\)\s*$/gm, '')
		.replace(/^# .*$/gm, '')
		.replace(/```\w*/g, '')
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/^\s*(?:#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
		.replace(/§/g, '')
		.replace(/(\*\*|__|\*|_)(?=\S)(.+?)(?<=\S)\1/g, '$2')
		.replace(/\s+/g, ' ')
		.trim();

	return text.length > EXCERPT ? `${text.slice(0, EXCERPT).replace(/\s+\S*$/, '')}…` : text;
}
