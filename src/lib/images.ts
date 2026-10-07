interface Node {
	type?: string;
	value?: string;
	children?: Node[];
}

/**
 * Rehype plugin: an `<img>` a document writes as HTML is rendered with the component an image
 * written as Markdown is, so it takes what the component adds — `dark`, the picture of the dark
 * scheme.
 */
export function images() {
	return (tree: Node) => visit(tree);
}

// mdsvex names the components of its layout `Components`
function visit(node: Node) {
	if (node.type === 'raw' && node.value !== undefined)
		node.value = node.value.replace(/<img(?=[\s/>])/g, '<Components.img');

	node.children?.forEach(visit);
}
