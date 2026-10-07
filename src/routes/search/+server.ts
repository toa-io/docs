import { error, json } from '@sveltejs/kit';
import { search } from '#lib/server/search.ts';
import { MIN, headers, query } from './query.ts';
import type { RequestHandler } from './$types';

export const prerender = false;
export const trailingSlash = 'always';

// answers a request that does not prefer HTML: the page beside answers one that does
export const GET: RequestHandler = async ({ url, platform, getClientAddress }) => {
	const q = query(url);

	if (q.length < MIN) error(400, `A query is at least ${MIN} characters`);

	return json(await search(platform, q, getClientAddress()), { headers });
};
