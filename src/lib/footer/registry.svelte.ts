import { onDestroy, type Snippet } from 'svelte';

// a getter, as the content of a mounted component may change
type Content = () => Snippet;
import { browser } from '$app/env';
import { page } from '$app/state';

export type Placeholder = 'start' | 'center' | 'end';

class Registry {
	private readonly registrations = $state<Record<Placeholder, Content[]>>({
		start: [],
		center: [],
		end: []
	});

	// the last mounted registration
	current(placeholder: Placeholder): Snippet | undefined {
		return this.registrations[placeholder].at(-1)?.();
	}

	add(placeholder: Placeholder, content: Content) {
		this.registrations[placeholder].push(content);
	}

	remove(placeholder: Placeholder, content: Content) {
		const registrations = this.registrations[placeholder];
		const index = registrations.lastIndexOf(content);

		if (index !== -1) registrations.splice(index, 1);
	}
}

const client = new Registry();

// the server renders requests concurrently, each has a registry of its own
const requests = new WeakMap<object, Registry>();

export function registry(): Registry {
	if (browser) return client;

	let request = requests.get(page.url);

	if (request === undefined) requests.set(page.url, (request = new Registry()));

	return request;
}

// called by a component: its content is registered while the component is mounted
export function register(placeholder: Placeholder, content: Content) {
	const footer = registry();

	footer.add(placeholder, content);
	onDestroy(() => footer.remove(placeholder, content));
}
