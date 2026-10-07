import fs from 'node:fs';
import path from 'node:path';
import GithubSlugger from 'github-slugger';
import { anchor, route } from '../../links.ts';

export interface Passage {
	// the route of the article, and the anchor of the heading the passage is under
	href: string;
	anchor?: string;
	// what the model reads: the titles above the passage, and its text
	context: string;
	text: string;
}

// a passage is about this long at most, in characters: the model reads 512 tokens
const LENGTH = 1200;

// too short to answer anything
const SHORTEST = 40;

/** The passages of every article under `root`, in the order of the files. */
export function passages(root: string): Passage[] {
	return fs
		.globSync('*/*/*.md', { cwd: root })
		.sort()
		.flatMap((file) => article(file, fs.readFileSync(path.join(root, file), 'utf8')));
}

function article(file: string, source: string): Passage[] {
	const href = route(file);
	// the ids of the headings are given by `rehype-slug`, in the order of the document
	const slugger = new GithubSlugger();
	const result: Passage[] = [];

	let title = '';
	let heading: { text: string; anchor?: string } = { text: '' };
	let lines: string[] = [];
	let fenced = false;

	const flush = () => {
		const context = [title, heading.text].filter(Boolean).join(' — ');

		for (const text of pieces(plain(lines.join('\n'))))
			result.push({ href, anchor: heading.anchor, context, text });

		lines = [];
	};

	for (const line of visible(source).split('\n')) {
		if (line.startsWith('```')) fenced = !fenced;

		const match = fenced ? null : /^(#{1,6})\s+(.+)$/.exec(line);

		if (match === null) {
			lines.push(line);
			continue;
		}

		flush();

		const text = plain(match[2]);
		const slug = slugger.slug(text);

		if (match[1].length === 1) title = text;
		else heading = { text, anchor: anchor(href, slug) };
	}

	flush();

	return result;
}

// what a reader does not see: notes for later and editorial remarks
function visible(source: string) {
	return source
		.replace(/<!--todo-->[^]*?<!--\/todo-->/g, '')
		.replace(/<!--[^]*?-->/g, '')
		.replace(/\(\([^]*?\)\)/g, '');
}

// the text of Markdown, with its code as code
function plain(markdown: string) {
	return markdown
		.replace(/^```.*$/gm, '')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/\[\^[^\]]*\]:?/g, '')
		.replace(/<\/?[A-Za-z][^>]*>/g, '')
		.replace(/^\s*(?:>|[-*+]|\d+\.)\s+/gm, '')
		.replace(/^\s*\|?[\s:|-]+\|[\s:|-]*$/gm, '')
		.replace(/(\*\*|__|\*|_)(?=\S)(.+?)(?<=\S)\1/g, '$2')
		.replace(/[ \t]+/g, ' ')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

// a text longer than a passage is cut between its paragraphs
function pieces(text: string): string[] {
	const result: string[] = [];
	let piece = '';

	for (const paragraph of text.split('\n\n')) {
		if (piece !== '' && piece.length + paragraph.length > LENGTH) {
			result.push(piece);
			piece = '';
		}

		piece += (piece === '' ? '' : '\n\n') + paragraph;
	}

	if (piece !== '') result.push(piece);

	return result.filter((piece) => piece.length >= SHORTEST);
}
