// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			home: { name: string; title: string; motto: string; keywords: string };
			model: { title: string; description: string; keywords: string };
			articles: Article[];
		}
		// interface PageState {}
		// interface Platform {}
	}

	interface Article {
		href: string;
		title: string;
		chapter: { number: string; title: string; href: string };
		description: string;
		keywords: string;
	}
}

export {};
