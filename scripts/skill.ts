// writes the agent skill, `skills/toa`, from the `userspace` section:
// `0.intro.md` becomes `SKILL.md`, and links to `model` become links to the website;
// `--check` writes nothing and fails if the skill is not what would be written
import fs from 'node:fs';
import path from 'node:path';
import { anchor, route } from '../src/lib/links.ts';

const SITE = 'https://toa.io';
const INTRO = '0.intro.md';
const SKILL = 'SKILL.md';

const HEADER = `---
name: toa
description: >-
  How to build an application on Toa, the runtime for distributed systems: components, state,
  operations, events, tasks, the HTTP API, identities and access, tests, configuration and
  deployment. Use when writing, changing, testing or reviewing code of an application that has a
  \`context.toa.yaml\` or \`manifest.toa.yaml\`, or when asked how to do something with Toa.
---

# Building Applications on Toa

How to turn business requirements into a working application on Toa: what to write, which files
to create, how to run and test it. Why the runtime behaves the way it does, and what it
guarantees, is in the [mental model](${SITE}/model/).

Every article answers "how do I do X?", stands on its own, and links to what it relies on. Find
the one the task needs by its summary below and read that file. Every example comes from the
same application — a small shop with orders and customer accounts.
`;

const root = path.resolve(import.meta.dirname, '..');
const content = path.join(root, 'content');
const source = path.join(content, 'userspace');
const target = path.join(root, 'skills', 'toa');

const LINK = /\]\(([^)\s:#]+\.md)(?:#([^)\s]+))?\)/g;

function rewrite(text: string, file: string) {
	return text.replace(LINK, (match, href: string, slug?: string) => {
		const linked = path.relative(content, path.resolve(source, path.dirname(file), href));
		const [section, ...rest] = linked.split(path.sep);

		if (section === 'model') {
			const to = route(linked);

			return `](${SITE}${to}${slug === undefined ? '' : `#${anchor(to, slug)}`})`;
		}

		if (section !== 'userspace') throw new Error(`${file}: ${href} is outside the documentation`);

		if (!fs.existsSync(path.join(content, linked))) throw new Error(`${file}: ${href} is missing`);

		if (rest.join('/') !== INTRO) return match;

		const to = path.relative(path.dirname(file), SKILL) + (slug === undefined ? '' : `#${slug}`);

		return `](${to})`;
	});
}

function generate() {
	const files: Record<string, string> = {};

	for (const file of fs.readdirSync(source, { recursive: true, encoding: 'utf8' })) {
		if (!file.endsWith('.md')) continue;

		const text = rewrite(fs.readFileSync(path.join(source, file), 'utf8'), file);

		// the table of contents starts at the first chapter
		if (file === INTRO) files[SKILL] = `${HEADER}\n${text.slice(text.indexOf('\n## ') + 1)}`;
		else files[file] = text;
	}

	return files;
}

function existing() {
	if (!fs.existsSync(target)) return {};

	return Object.fromEntries(
		fs
			.readdirSync(target, { recursive: true, encoding: 'utf8' })
			.filter((file) => fs.statSync(path.join(target, file)).isFile())
			.map((file) => [file, fs.readFileSync(path.join(target, file), 'utf8')])
	);
}

const files = generate();

if (process.argv.includes('--check')) {
	const written = existing();
	const stale = [...new Set([...Object.keys(files), ...Object.keys(written)])].filter(
		(file) => files[file] !== written[file]
	);

	if (stale.length > 0) {
		console.error(`The skill is stale, run \`npm run skill\`:\n${stale.join('\n')}`);
		process.exit(1);
	}
} else {
	fs.rmSync(target, { recursive: true, force: true });

	for (const [file, text] of Object.entries(files)) {
		fs.mkdirSync(path.dirname(path.join(target, file)), { recursive: true });
		fs.writeFileSync(path.join(target, file), text);
	}
}
