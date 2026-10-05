// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			articles: Article[];
		}
		// interface PageState {}
		// interface Platform {}
	}

	interface Article {
		href: string;
		title: string;
	}
}

export {};
