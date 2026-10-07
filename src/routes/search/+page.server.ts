import { search } from '#lib/server/search.ts';
import { MIN, headers, query } from './query.ts';
import type { PageServerLoad } from './$types';

// what is found depends on the query
export const prerender = false;

export const load: PageServerLoad = async ({ url, platform, getClientAddress, setHeaders }) => {
	const q = query(url);

	setHeaders(headers);

	return { query: q, results: q.length < MIN ? [] : await search(platform, q, getClientAddress()) };
};
