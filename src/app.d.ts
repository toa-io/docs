// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			home: { name: string; title: string; motto: string; keywords: string };
			model: { title: string; description: string; keywords: string };
			chapters: Chapter[];
			articles: Article[];
		}
		// interface PageState {}
		// interface Platform {}
	}

	interface Chapter {
		href: string;
		title: string;
		description: string;
		keywords: string;
	}

	interface Article {
		href: string;
		title: string;
		// `anchor` is the place of the chapter in the contents
		chapter: { number: string; title: string; href: string; anchor: string };
		summary: string;
		description: string;
		keywords: string;
	}
}

export {};
