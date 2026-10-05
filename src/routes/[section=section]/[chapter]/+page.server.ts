import { error } from '@sveltejs/kit';
import { chapters } from '#lib/server/contents.ts';
import type { EntryGenerator, PageServerLoad } from './$types';

const href = (section: string, chapter: string) => `/${section}/${chapter}/`;

// nothing links to these pages
export const entries: EntryGenerator = () =>
	chapters.map((chapter) => {
		const [, section, name] = chapter.href.split('/');

		return { section: section as Section['id'], chapter: name };
	});

export const load: PageServerLoad = ({ params }) => {
	if (!chapters.some((chapter) => chapter.href === href(params.section, params.chapter)))
		error(404, 'Not found');
};
