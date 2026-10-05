import intro from '$docs/0.intro.md?raw';
import type { LayoutServerLoad } from './$types';

// the introduction is the table of contents: it defines titles and the reading order
const LINK = /\[([^\]]+)\]\(([\w-]+)\/\d+\.([\w-]+)\.md\)/g;

const articles: Article[] = Array.from(intro.matchAll(LINK), ([, title, chapter, article]) => ({
	href: `/${chapter}/${article}/`,
	title
}));

export const load: LayoutServerLoad = () => ({ articles });
