import { articles, sections } from '#lib/server/contents.ts';
import type { RequestHandler } from './$types';

const ORIGIN = 'https://toa.io';

export const prerender = true;

// What is worth finding.
// The pages of chapters are left out: nothing links to them, and they say nothing of their own.
export const GET: RequestHandler = () => {
	const paths = ['/', ...Object.keys(sections), ...articles.map((article) => article.href)];
	const urls = paths.map((path) => `\t<url><loc>${ORIGIN}${path}</loc></url>`).join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { 'content-type': 'application/xml' } }
	);
};
