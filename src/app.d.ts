// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			home: { name: string; title: string; motto: string; keywords: string };
			sections: Record<string, Section>;
			chapters: Chapter[];
			articles: Article[];
		}
		// interface PageState {}
		// what `wrangler.jsonc` binds
		interface Platform {
			env: {
				// the index of the documentation
				SEARCH?: {
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
	}

	interface Section {
		// the directory of `content` it is rendered from
		id: 'model' | 'userspace';
		href: string;
		// `name` is what links to the section say
		name: string;
		title: string;
		description: string;
		keywords: string;
	}

	interface Chapter {
		href: string;
		title: string;
		// the route of the section
		section: string;
		description: string;
		keywords: string;
	}

	interface Article {
		href: string;
		title: string;
		section: string;
		// `anchor` is the place of the chapter in the contents
		chapter: { number: string; title: string; href: string; anchor: string };
		summary: string;
		description: string;
		keywords: string;
	}

	// an article found by a search
	interface SearchResult {
		href: string;
		title: string;
		// the names of the section and of the chapter the article is in
		section: string;
		chapter: string;
		// the passage that matched
		excerpt: string;
		score: number;
	}
}

export {};
