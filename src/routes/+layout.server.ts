import intro from '$docs/0.intro.md?raw';
import { keywords } from '#lib/keywords.ts';
import type { LayoutServerLoad } from './$types';

// the introduction is the table of contents: it defines titles, summaries and the reading order
const LINK = /\[([^\]]+)\]\(([\w-]+)\/\d+\.([\w-]+)\.md\)\*\*\s+— ([^]*?)(?=\n\d+\. |\n\n|$)/g;

// `## Chapter I. Foundations`
const chapters = Array.from(intro.matchAll(/^## (Chapter (\w+)\. (.+))$/gm), (match) => ({
	index: match.index,
	number: match[2],
	title: match[3],
	// the heading's id, as rehype-slug makes it
	href: `/#${match[1]
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s/g, '-')}`
}));

const articles: Article[] = Array.from(intro.matchAll(LINK), (match) => {
	const [, title, chapter, article, summary] = match;
	const href = `/${chapter}/${article}/`;
	const description = summary.replace(/\s+/g, ' ').trim();
	const { number, title: name, href: anchor } = chapters.findLast((c) => c.index < match.index)!;

	if (!(href in keywords)) throw new Error(`No keywords for ${href}`);

	return {
		href,
		title,
		chapter: { number, title: name, href: anchor },
		description: description[0].toUpperCase() + description.slice(1),
		keywords: keywords[href]
	};
});

// `# Toa: Composable Application Runtime` followed by the `**motto**`
const [, name, title] = /^# ([^:\n]+): (.+)$/m.exec(intro) ?? [];
const [, motto] = /^\*\*([^*]+)\*\*$/m.exec(intro) ?? [];

const home = { name, title, motto, keywords: keywords['/'] };

export const load: LayoutServerLoad = () => ({ home, articles });
