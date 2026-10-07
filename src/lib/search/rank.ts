export interface Index {
	// the vector of each passage, a byte for a component, in base64
	vectors: string[];
	passages: { href: string; anchor?: string; text: string }[];
}

export interface Ranked {
	passage: Index['passages'][number];
	score: number;
}

// what the words of the query found in a passage add to how alike it is to the query, at most
const WORDS = 0.3;

// and those found in what its article is about
const ABOUT = 0.1;

// a passage this much less alike than the best one is not shown
const WORTH = 0.85;

// and neither is one that has this little to do with the query, whatever the others are
const FLOOR = 0.62;

/**
 * The index as it is ranked by: unit vectors one after another, the texts in lower case, and
 * what each article is about — its title and keywords — by its route.
 */
export function prepare(index: Index, about: Record<string, string>) {
	const decoded = index.vectors.map((vector) =>
		Float32Array.from(new Int8Array(Uint8Array.from(atob(vector), (c) => c.charCodeAt(0)).buffer))
	);

	const dimensions = decoded[0]?.length ?? 0;
	const vectors = new Float32Array(decoded.length * dimensions);

	decoded.forEach((vector, p) => {
		const length = Math.sqrt(vector.reduce((sum, value) => sum + value ** 2, 0));

		vector.forEach((value, i) => (vectors[p * dimensions + i] = value / length));
	});

	return {
		passages: index.passages,
		dimensions,
		vectors,
		texts: index.passages.map(({ text }) => text.toLowerCase()),
		about: index.passages.map(({ href }) => (about[href] ?? '').toLowerCase())
	};
}

export type Prepared = ReturnType<typeof prepare>;

/**
 * The best passage of each article, the best first.
 *
 * A passage is as good as it is alike to the query by meaning, and better for the words of the
 * query it holds: a rare word, as the name of a directive, weighs more than a common one.
 */
export function rank(index: Prepared, query: string, vector: number[]): Ranked[] {
	const { dimensions, vectors, texts, about, passages } = index;
	const length = Math.sqrt(vector.reduce((sum, value) => sum + value ** 2, 0));
	const words = [...new Set(query.toLowerCase().split(/\s+/).filter(Boolean))];

	// how rare a word is among the passages, 0 to 1
	const holds = words.map((word) => texts.map((text) => text.includes(word)));
	const rarity = holds.map(
		(held) => 1 - Math.log(1 + held.filter(Boolean).length) / Math.log(1 + texts.length)
	);

	const best = new Map<string, Ranked>();

	for (let p = 0; p < passages.length; p++) {
		let alike = 0;

		for (let i = 0; i < dimensions; i++) alike += vectors[p * dimensions + i] * vector[i];

		const found = rarity.reduce((sum, value, w) => sum + (holds[w][p] ? value : 0), 0);
		const subject = words.filter((word) => about[p].includes(word)).length;
		const score = alike / length + (WORDS * found + ABOUT * subject) / words.length;
		const passage = passages[p];

		if (score > (best.get(passage.href)?.score ?? -Infinity))
			best.set(passage.href, { passage, score });
	}

	const ranked = [...best.values()].sort((a, b) => b.score - a.score);

	return ranked.filter(({ score }) => score >= FLOOR && score >= ranked[0].score * WORTH);
}
