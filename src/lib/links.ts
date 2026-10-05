import path from 'node:path';
import GithubSlugger from 'github-slugger';
import { anchors } from './anchors.ts';

interface Node {
	type?: string;
	tagName?: string;
	value?: string;
	properties?: Record<string, unknown>;
	children?: Node[];
}

const HEADINGS = new Set(['h2', 'h3', 'h4', 'h5', 'h6']);

// laconic anchors by the slugs the headings have in the sources, by route
const slugs = Object.fromEntries(
	Object.entries(anchors).map(([route, headings]) => {
		const slugger = new GithubSlugger();

		return [
			route,
			Object.fromEntries(
				Object.entries(headings).map(([text, anchor]) => [slugger.slug(text), anchor])
			)
		];
	})
);

const anchor = (route: string, slug: string) => slugs[route]?.[slug] ?? slug;

/**
 * Rehype plugin, expects the headings to have ids (`rehype-slug`):
 *
 * - rewrites relative links between documentation files (`../basics/1.calls.md#local-calls`)
 *   to site routes (`/basics/calls/#local`)
 * - gives the headings below the first level their laconic anchors, and links to them
 */
export function links({ root }: { root: string }) {
	return (tree: Node, file: { filename?: string }) => {
		const filename = file.filename ?? path.join(root, '0.intro.md');
		const dir = path.dirname(filename);
		const current = route(path.relative(root, filename));

		visit(tree, (node) => {
			if (node.tagName === 'a') link(node, dir, current);
			else if (node.tagName !== undefined && HEADINGS.has(node.tagName)) heading(node, current);
		});
	};

	function link(node: Node, dir: string, current: string) {
		const href = node.properties?.href;

		if (typeof href !== 'string') return;

		const match = /^([^:#]+\.md)?(?:#(.+))?$/.exec(href);

		if (match === null) return;

		const [, file, slug] = match;
		const target =
			file === undefined ? current : route(path.relative(root, path.resolve(dir, file)));
		const fragment = slug === undefined ? '' : `#${anchor(target, slug)}`;

		node.properties!.href = (file === undefined ? '' : target) + fragment;
	}
}

function heading(node: Node, current: string) {
	const slug = node.properties?.id;

	if (typeof slug !== 'string') return;

	const id = anchor(current, slug);

	node.properties!.id = id;
	node.children = [
		{
			type: 'element',
			tagName: 'a',
			properties: { href: `#${id}`, className: ['anchor'], ariaLabel: 'Link to this section' },
			children: [{ type: 'text', value: '§' }]
		},
		...(node.children ?? [])
	];
}

// `basics/1.calls.md` → `/basics/calls/`, `0.intro.md` → `/`
function route(file: string) {
	if (file === '0.intro.md') return '/';

	const segments = file
		.split(path.sep)
		.map((segment) => segment.replace(/^\d+\./, '').replace(/\.md$/, ''));

	return `/${segments.join('/')}/`;
}

function visit(node: Node, fn: (node: Node) => void) {
	const children = node.children;

	fn(node);
	children?.forEach((child) => visit(child, fn));
}
