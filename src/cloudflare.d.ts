// what `wrangler.jsonc` binds the worker to
declare module 'cloudflare:workers' {
	export const env: {
		// the model that embeds a query
		AI: {
			run(
				model: string,
				input: { text: string[]; pooling?: 'mean' | 'cls' }
			): Promise<{ data: number[][] }>;
		};
		SEARCH_LIMIT: { limit(options: { key: string }): Promise<{ success: boolean }> };
	};
}

// the index of the search, see `#lib/search/index/plugin.ts`
declare module 'virtual:search-index' {
	const index: import('#lib/search/rank.ts').Index;

	export default index;
}
