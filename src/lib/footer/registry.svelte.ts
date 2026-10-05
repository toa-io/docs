import { onDestroy, type Snippet } from 'svelte';
import { browser } from '$app/env';
import { page } from '$app/state';

export type Placeholder = 'start' | 'center' | 'end';

class Registration {
	mounted = $state(true);

	// a getter, as the content of a mounted component may change
	constructor(readonly content: () => Snippet) {}
}

class Registry {
	private readonly registrations = $state<Record<Placeholder, Registration[]>>({
		start: [],
		center: [],
		end: []
	});

	// the content of the last mounted registration
	current(placeholder: Placeholder): Snippet | undefined {
		return this.registrations[placeholder].findLast(({ mounted }) => mounted)?.content();
	}

	add(placeholder: Placeholder, registration: Registration) {
		this.registrations[placeholder].push(registration);
	}

	remove(placeholder: Placeholder, registration: Registration) {
		const registrations = this.registrations[placeholder];
		const index = registrations.findLastIndex((r) => r.content === registration.content);

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
export function register(placeholder: Placeholder, content: () => Snippet) {
	const footer = registry();
	const registration = new Registration(content);

	footer.add(placeholder, registration);

	onDestroy(() => {
		registration.mounted = false;

		// A page is mounted aside, while the one it replaces is still shown: the list of
		// registrations it has added to is not there yet when that one is destroyed.
		queueMicrotask(() => footer.remove(placeholder, registration));
	});
}
