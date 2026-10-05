import { error } from '@sveltejs/kit';
import { chapters } from '#lib/server/contents.ts';
import type { EntryGenerator, PageServerLoad } from './$types';

const href = (chapter: string) => `/model/${chapter}/`;

// nothing links to these pages
export const entries: EntryGenerator = () =>
	chapters.map((chapter) => ({ chapter: chapter.href.split('/')[2] }));

export const load: PageServerLoad = ({ params }) => {
	if (!chapters.some((chapter) => chapter.href === href(params.chapter))) error(404, 'Not found');
};
