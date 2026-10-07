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
		// interface Platform {}
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
}

export {};
