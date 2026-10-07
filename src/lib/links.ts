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
 * - rewrites relative links between documentation files (`../basics/1.calls.md#local-calls`,
 *   `../../model/basics/1.calls.md`) to site routes (`/model/basics/calls/#local`)
 * - gives the headings below the first level their laconic anchors, and finds their subtitles
 */
export function links({ root }: { root: string }) {
	return (tree: Node, file: { filename?: string }) => {
		const filename = file.filename ?? path.join(root, 'model', '0.intro.md');
		const dir = path.dirname(filename);
		const current = route(path.relative(root, filename));

		visit(tree, (node, next) => {
			if (node.tagName === 'a') link(node, dir, current);
			else if (node.tagName !== undefined && HEADINGS.has(node.tagName))
				heading(node, current, next);
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

// `Transition: change the current state`
const SUBTITLED = /^([^:]+): (.+)$/;

function heading(node: Node, current: string, next?: Node) {
	const properties = (node.properties ??= {});

	if (typeof properties.id === 'string') properties.id = anchor(current, properties.id);

	properties.level = node.tagName!.slice(1);

	const [text, ...rest] = node.children ?? [];
	const match = rest.length === 0 && text?.type === 'text' ? SUBTITLED.exec(text.value!) : null;

	if (match !== null) {
		// the subtitle is what follows the colon
		text.value = match[1];
		properties.subtitle = match[2][0].toUpperCase() + match[2].slice(1);
	} else if (next !== undefined && emphasis(next) !== undefined) {
		// or the emphasized paragraph under the heading
		properties.subtitle = emphasis(next);
		next.type = 'comment';
		next.value = '';
	}
}

// the text of a paragraph that is emphasized as a whole
function emphasis(node: Node) {
	const [em, ...rest] = node.children ?? [];
	const [text, ...more] = em?.children ?? [];

	if (node.tagName !== 'p' || rest.length > 0 || em?.tagName !== 'em') return undefined;
	if (more.length > 0 || text?.type !== 'text') return undefined;

	return text.value;
}

// `model/basics/1.calls.md` → `/model/basics/calls/`, `model/0.intro.md` → `/model/`
function route(file: string) {
	const segments = file
		.split(path.sep)
		.filter((segment) => segment !== '0.intro.md')
		.map((segment) => segment.replace(/^\d+\./, '').replace(/\.md$/, ''));

	return `/${segments.join('/')}/`;
}

// calls `fn` with each node and the element that follows it
function visit(node: Node, fn: (node: Node, next?: Node) => void, next?: Node) {
	const children = node.children ?? [];

	fn(node, next);

	children.forEach((child, index) =>
		visit(
			child,
			fn,
			children.slice(index + 1).find((sibling) => sibling.type === 'element')
		)
	);
}
