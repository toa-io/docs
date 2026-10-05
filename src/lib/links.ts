import path from 'node:path';

interface Node {
	tagName?: string;
	properties?: Record<string, unknown>;
	children?: Node[];
}

/**
 * Rehype plugin: rewrites relative links between documentation files
 * (`../basics/1.calls.md#input`) to site routes (`/basics/calls/#input`).
 */
export function links({ root }: { root: string }) {
	return (tree: Node, file: { filename?: string }) => {
		const dir = path.dirname(file.filename ?? root);

		visit(tree, (node) => {
			const href = node.properties?.href;

			if (node.tagName !== 'a' || typeof href !== 'string') return;

			const match = /^([^:#]+\.md)(#.*)?$/.exec(href);

			if (match === null) return;

			const target = path.relative(root, path.resolve(dir, match[1]));

			node.properties!.href = route(target) + (match[2] ?? '');
		});
	};
}

// `basics/1.calls.md` → `/basics/calls/`
function route(file: string) {
	const segments = file
		.split(path.sep)
		.map((segment) => segment.replace(/^\d+\./, '').replace(/\.md$/, ''));

	return `/${segments.join('/')}/`;
}

function visit(node: Node, fn: (node: Node) => void) {
	fn(node);
	node.children?.forEach((child) => visit(child, fn));
}
