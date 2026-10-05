export type Comment = {
	id: string;
	quote: string;
	prefix: string;
	suffix: string;
	comment: string;
};

type Store = Record<string, Comment[]>;

const KEY = 'review';

export const load = (path: string): Comment[] => {
	try {
		const all = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Store;
		return all[path] ?? [];
	} catch {
		return [];
	}
};

export const save = (path: string, comments: Comment[]): void => {
	try {
		const all = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Store;

		if (comments.length === 0) delete all[path];
		else all[path] = comments;

		localStorage.setItem(KEY, JSON.stringify(all));
	} catch {
		// private mode, quota
	}
};

export const clear = (): void => {
	try {
		localStorage.removeItem(KEY);
	} catch {
		// private mode
	}
};

export const serialize = (comments: Comment[]): string =>
	comments.map((c) => `${blockquote(c.quote)}\n${c.comment}`).join('\n\n');

const blockquote = (quote: string) =>
	quote
		.split('\n')
		.map((line) => `> ${line}`)
		.join('\n');
