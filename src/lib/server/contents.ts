import intro from '$content/0.intro.md?raw';
import { anchors } from '#lib/anchors.ts';
import { keywords } from '#lib/keywords.ts';

// The introduction is the table of contents:
// it defines chapters, titles, summaries and the reading order

// `## Chapter I. Foundations` followed by the `*subtitle*`
const CHAPTER = /^## (Chapter (\w+)\. (.+))\n+\*([^*]+)\*$/gm;

// `1. **[Calls](basics/1.calls.md)**` followed by the `— summary`
const ARTICLE = /\[([^\]]+)\]\(([\w-]+)\/\d+\.([\w-]+)\.md\)\*\*\s+— ([^]*?)(?=\n\d+\. |\n\n|$)/g;

const text = (value: string) => value.replace(/\s+/g, ' ').trim();
const capitalize = (value: string) => value[0].toUpperCase() + value.slice(1);

const headings = Array.from(intro.matchAll(CHAPTER), (match) => ({
	index: match.index,
	heading: match[1],
	number: match[2],
	title: match[3],
	subtitle: text(match[4])
}));

export const articles: Article[] = Array.from(intro.matchAll(ARTICLE), (match) => {
	const [, title, chapter, article, summary] = match;
	const href = `/model/${chapter}/${article}/`;
	const { number, title: name, heading } = headings.findLast((c) => c.index < match.index)!;

	if (!(href in keywords)) throw new Error(`No keywords for ${href}`);

	return {
		href,
		title,
		chapter: {
			number,
			title: name,
			href: `/model/${chapter}/`,
			anchor: `/model/#${anchors['/model/'][heading]}`
		},
		summary: text(summary),
		description: capitalize(text(summary)),
		keywords: keywords[href]
	};
});

export const chapters: Chapter[] = headings.map(({ number, title, heading, subtitle }) => {
	const own = articles.filter((article) => article.chapter.number === number);

	return {
		href: own[0].chapter.href,
		title: heading,
		description: subtitle,
		keywords: [title, ...own.map((article) => article.title)].join(', ')
	};
});

// `# Toa: Composable Application Runtime` followed by the `**motto**`
const [, name, title] = /^# ([^:\n]+): (.+)$/m.exec(intro) ?? [];
const [, motto] = /^\*\*([^*]+)\*\*$/m.exec(intro) ?? [];

export const home = { name, title, motto, keywords: keywords['/'] };

// the contents of the documentation
export const model = {
	title: 'Diving into the Mental Model',
	description:
		'What Toa is: the foundational concepts of the runtime, its main mechanisms, and how they fit together.',
	keywords: keywords['/model/']
};
