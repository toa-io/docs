import model from '$content/model/0.intro.md?raw';
import userspace from '$content/userspace/0.intro.md?raw';
import { anchors } from '#lib/anchors.ts';
import { keywords } from '#lib/keywords.ts';

// The introduction of a section is its table of contents:
// it defines chapters, titles, summaries and the reading order

// `## Chapter I. Foundations` followed by the `*subtitle*`
const CHAPTER = /^## (Chapter (\w+)\. (.+))\n+\*([^*]+)\*$/gm;

// `1. **[Calls](basics/1.calls.md)**` followed by the `— summary`
const ARTICLE = /\[([^\]]+)\]\(([\w-]+)\/\d+\.([\w-]+)\.md\)\*\*\s+— ([^]*?)(?=\n\d+\. |\n\n|$)/g;

const text = (value: string) => value.replace(/\s+/g, ' ').trim();
const capitalize = (value: string) => value[0].toUpperCase() + value.slice(1);

function contents(section: string, intro: string) {
	const root = `/${section}/`;

	const headings = Array.from(intro.matchAll(CHAPTER), (match) => ({
		index: match.index,
		heading: match[1],
		number: match[2],
		title: match[3],
		subtitle: text(match[4])
	}));

	const articles: Article[] = Array.from(intro.matchAll(ARTICLE), (match) => {
		const [, title, chapter, article, summary] = match;
		const href = `${root}${chapter}/${article}/`;
		const { number, title: name, heading } = headings.findLast((c) => c.index < match.index)!;

		if (!(href in keywords)) throw new Error(`No keywords for ${href}`);

		return {
			href,
			title,
			section: root,
			chapter: {
				number,
				title: name,
				href: `${root}${chapter}/`,
				anchor: `${root}#${anchors[root][heading]}`
			},
			summary: text(summary),
			description: capitalize(text(summary)),
			keywords: keywords[href]
		};
	});

	const chapters: Chapter[] = headings.map(({ number, title, heading, subtitle }) => {
		const own = articles.filter((article) => article.chapter.number === number);

		return {
			href: own[0].chapter.href,
			title: heading,
			section: root,
			description: subtitle,
			keywords: [title, ...own.map((article) => article.title)].join(', ')
		};
	});

	return { articles, chapters };
}

const parts = [contents('model', model), contents('userspace', userspace)];

export const articles = parts.flatMap((part) => part.articles);
export const chapters = parts.flatMap((part) => part.chapters);

// `# Toa: Composable Application Runtime` followed by the `**motto**`
const [, name, title] = /^# ([^:\n]+): (.+)$/m.exec(model) ?? [];
const [, motto] = /^\*\*([^*]+)\*\*$/m.exec(model) ?? [];

export const home = { name, title, motto, keywords: keywords['/'] };

// the contents of the documentation, by section
export const sections: Record<string, Section> = {
	'/model/': {
		id: 'model',
		href: '/model/',
		name: 'Mental model',
		title: 'Diving into the Mental Model',
		description:
			'What Toa is: the foundational concepts of the runtime, its main mechanisms, and how they fit together.',
		keywords: keywords['/model/']
	},
	'/userspace/': {
		id: 'userspace',
		href: '/userspace/',
		name: 'Userspace',
		title: 'Building Applications',
		description:
			'How to build an application on Toa: components, reliability, the gateway, platform services, and deployment, from the first operation to production.',
		keywords: keywords['/userspace/']
	}
};
