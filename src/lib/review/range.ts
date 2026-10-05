import type { Comment } from './storage.ts';

const CONTEXT = 24;

export const context = (range: Range, root: Node) => {
	const before = document.createRange();
	before.selectNodeContents(root);
	before.setEnd(range.startContainer, range.startOffset);

	const after = document.createRange();
	after.selectNodeContents(root);
	after.setStart(range.endContainer, range.endOffset);

	return {
		prefix: before.toString().slice(-CONTEXT),
		suffix: after.toString().slice(0, CONTEXT)
	};
};

export const wrapRange = (range: Range, id: string, pending = false): boolean => {
	try {
		const nodes = textNodesInRange(range);
		if (nodes.length === 0) return false;

		for (let i = nodes.length - 1; i >= 0; i--) {
			const node = nodes[i];
			if (node === undefined) continue;
			const from = range.startContainer === node ? range.startOffset : 0;
			const to = range.endContainer === node ? range.endOffset : node.data.length;
			wrapSlice(node, from, to, id, pending);
		}

		return true;
	} catch {
		return false;
	}
};

export const unwrap = (id: string): void => {
	for (const mark of document.querySelectorAll(`mark[data-review="${CSS.escape(id)}"]`)) {
		const parent = mark.parentNode;
		mark.replaceWith(...mark.childNodes);
		parent?.normalize();
	}
};

export const locateAndWrap = (root: Element, comment: Comment): boolean => {
	if (root.querySelector(`mark[data-review="${CSS.escape(comment.id)}"]`)) return true;

	const range = locate(root, comment);
	if (range === null) return false;

	return wrapRange(range, comment.id);
};

const locate = (root: Element, comment: Comment): Range | null => {
	const text = root.textContent ?? '';
	let from = 0;

	while (from <= text.length) {
		const i = text.indexOf(comment.quote, from);
		if (i === -1) return null;

		const before = text.slice(Math.max(0, i - comment.prefix.length), i);
		const after = text.slice(
			i + comment.quote.length,
			i + comment.quote.length + comment.suffix.length
		);

		if (before.endsWith(comment.prefix) && after.startsWith(comment.suffix))
			return offsetsToRange(root, i, i + comment.quote.length);

		from = i + 1;
	}

	return null;
};

const offsetsToRange = (root: Element, start: number, end: number): Range | null => {
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
	let pos = 0;
	let startNode: Text | undefined;
	let startOff = 0;
	let endNode: Text | undefined;
	let endOff = 0;
	let node: Node | null;

	while ((node = walker.nextNode())) {
		const text = node as Text;
		const len = text.data.length;

		if (startNode === undefined && pos + len >= start) {
			startNode = text;
			startOff = start - pos;
		}

		if (pos + len >= end) {
			endNode = text;
			endOff = end - pos;
			break;
		}

		pos += len;
	}

	if (startNode === undefined || endNode === undefined) return null;

	const range = document.createRange();
	range.setStart(startNode, startOff);
	range.setEnd(endNode, endOff);
	return range;
};

const textNodesInRange = (range: Range): Text[] => {
	const ancestor = range.commonAncestorContainer;

	if (ancestor.nodeType === Node.TEXT_NODE) return [ancestor as Text];

	const walker = document.createTreeWalker(ancestor, NodeFilter.SHOW_TEXT);
	const nodes: Text[] = [];
	let node: Node | null;

	while ((node = walker.nextNode())) {
		if (range.intersectsNode(node)) nodes.push(node as Text);
	}

	return nodes;
};

const wrapSlice = (node: Text, from: number, to: number, id: string, pending: boolean): void => {
	if (from >= to) return;

	const target = from > 0 ? node.splitText(from) : node;

	if (to - from < target.data.length) target.splitText(to - from);

	const mark = document.createElement('mark');
	mark.dataset.review = id;
	mark.className = pending ? 'review-mark pending' : 'review-mark';
	target.parentNode!.insertBefore(mark, target);
	mark.appendChild(target);
};
