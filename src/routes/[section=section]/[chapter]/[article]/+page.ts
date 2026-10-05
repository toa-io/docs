import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { EntryGenerator, PageLoad } from './$types';

const modules = import.meta.glob<{ default: Component }>('$content/*/*/*.md');

// `…/model/basics/1.calls.md` → `model/basics/calls`
const articles = Object.fromEntries(
	Object.entries(modules).map(([file, module]) => {
		const [section, chapter, name] = file.split('/').slice(-3);

		return [`${section}/${chapter}/${name.replace(/^\d+\./, '').replace(/\.md$/, '')}`, module];
	})
);

export const entries: EntryGenerator = () =>
	Object.keys(articles).map((key) => {
		const [section, chapter, article] = key.split('/');

		return { section: section as Section['id'], chapter, article };
	});

export const load: PageLoad = async ({ params }) => {
	const module = articles[`${params.section}/${params.chapter}/${params.article}`];

	if (module === undefined) error(404, 'Not found');

	return { content: (await module()).default };
};
