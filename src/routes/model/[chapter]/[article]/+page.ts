import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { EntryGenerator, PageLoad } from './$types';

const modules = import.meta.glob<{ default: Component }>('$content/*/*.md');

// `…/basics/1.calls.md` → `basics/calls`
const articles = Object.fromEntries(
	Object.entries(modules).map(([file, module]) => {
		const [chapter, name] = file.split('/').slice(-2);

		return [`${chapter}/${name.replace(/^\d+\./, '').replace(/\.md$/, '')}`, module];
	})
);

export const entries: EntryGenerator = () =>
	Object.keys(articles).map((key) => {
		const [chapter, article] = key.split('/');

		return { chapter, article };
	});

export const load: PageLoad = async ({ params }) => {
	const module = articles[`${params.chapter}/${params.article}`];

	if (module === undefined) error(404, 'Not found');

	return { content: (await module()).default };
};
