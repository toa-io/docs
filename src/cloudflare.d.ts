// what `wrangler.jsonc` binds the worker to
declare module 'cloudflare:workers' {
	export const env: {
		// the index of the documentation
		SEARCH: {
			search(request: {
				query: string;
				ai_search_options?: {
					retrieval?: {
						retrieval_type?: 'vector' | 'keyword' | 'hybrid';
						max_num_results?: number;
					};
				};
			}): Promise<{
				// `key` is the address of the page a passage is of
				chunks: { score: number; text: string; item: { key: string } }[];
			}>;
		};
		SEARCH_LIMIT: { limit(options: { key: string }): Promise<{ success: boolean }> };
	};
}
