import { error, json } from '@sveltejs/kit';
import { env } from 'cloudflare:workers';
import { search } from '#lib/server/search.ts';
import { MIN, headers, query } from './query.ts';
import type { RequestHandler } from './$types';

export const prerender = false;
export const trailingSlash = 'always';

// answers a request that does not prefer HTML: the page beside answers one that does
export const GET: RequestHandler = async ({ url, getClientAddress }) => {
	const q = query(url);

	// temporary: how long the model takes to embed a query
	if (url.searchParams.get('probe') === 'e') {
		const model = url.searchParams.get('model') ?? '@cf/baai/bge-small-en-v1.5';
		const times = [];
		let dimensions = 0;

		for (let i = 0; i < 3; i++) {
			const start = Date.now();
			const { data } = await env.AI.run(model, { text: [`${q} ${i}`], pooling: 'cls' });

			times.push(Date.now() - start);
			dimensions = data[0].length;
		}

		return json({ model, times, dimensions });
	}

	if (q.length < MIN) error(400, `A query is at least ${MIN} characters`);

	return json(await search(q, getClientAddress(), url.searchParams.get('probe') ?? ''), {
		headers
	});
};
