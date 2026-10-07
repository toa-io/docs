interface Node {
	type?: string;
	tagName?: string;
	value?: string;
	properties?: Record<string, unknown>;
	children?: Node[];
}

const UPLOAD = '/image/upload/';
const TAG = /<(img|Illustrated)(?=[\s/>])([^>]*)>/g;
const SRC = /\ssrc="([^"]+)"/;

/**
 * Rehype plugin: an `<img>` a document writes as HTML is rendered with the component an image
 * written as Markdown is, so it takes what the component adds — `dark`, the picture of the dark
 * scheme. `<Illustrated>` around paragraphs sets a picture to their right.
 *
 * Every picture is given its proportions, so the page keeps room for it while it loads.
 */
export function images() {
	return async (tree: Node) => {
		const nodes: Node[] = [];

		collect(tree, nodes);

		await Promise.all(nodes.map(async (node) => (node.type === 'raw' ? html(node) : image(node))));
	};
}

function collect(node: Node, found: Node[]) {
	if (node.type === 'raw' || node.tagName === 'img') found.push(node);

	node.children?.forEach((child) => collect(child, found));
}

// an image written as Markdown
async function image(node: Node) {
	const src = node.properties?.src;

	if (typeof src === 'string') node.properties!.ratio = await ratio(src);
}

// mdsvex names the components of its layout `Components`
async function html(node: Node) {
	const ratios = new Map<string, string | undefined>();

	for (const [, , attributes] of node.value!.matchAll(TAG)) {
		const src = SRC.exec(attributes)?.[1];

		if (src !== undefined) ratios.set(src, await ratio(src));
	}

	node.value = node
		.value!.replace(TAG, (_, tag: string, attributes: string) => {
			const proportions = ratios.get(SRC.exec(attributes)?.[1] ?? '');
			const added = proportions === undefined ? '' : ` ratio="${proportions}"`;

			return `<Components.${tag}${added}${attributes}>`;
		})
		.replace(/<\/Illustrated>/g, '</Components.Illustrated>');
}

const known = new Map<string, Promise<string | undefined>>();

// Cloudinary tells the size of an upload; of a picture kept elsewhere nothing is known
function ratio(src: string) {
	if (!src.includes('res.cloudinary.com') || !src.includes(UPLOAD)) return undefined;
	if (!known.has(src)) known.set(src, measure(src));

	return known.get(src);
}

async function measure(src: string) {
	try {
		const response = await fetch(src.replace(UPLOAD, `${UPLOAD}fl_getinfo/`));
		const { input } = (await response.json()) as { input: { width: number; height: number } };

		return `${input.width} / ${input.height}`;
	} catch {
		// the picture is shown all the same, and the page moves when it arrives
		return undefined;
	}
}
