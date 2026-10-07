import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { Passage } from './passages.ts';

// The model a query is embedded with by Workers AI, `@cf/baai/bge-small-en-v1.5`, as ONNX:
// the two give the same vector for the same text, so the passages are embedded here.
const MODEL = 'Xenova/bge-small-en-v1.5';
const BATCH = 32;

// a component of a unit vector is kept as a byte
const SCALE = 127;

// The vectors already computed, a file for an article: the text of a passage, hashed, names its
// vector. They are committed, so that a build embeds only what a commit forgot, see README.
const VECTORS = path.join(import.meta.dirname, 'vectors');

type Vectors = Record<string, string>;

/** The vectors of the passages, a byte for a component, in base64. */
export async function embed(passages: Passage[]): Promise<string[]> {
	const texts = passages.map(({ context, text }) => `${context}\n\n${text}`);
	const keys = texts.map((text) => createHash('sha256').update(text).digest('base64url'));
	const files = passages.map(({ href }) => `${href.slice(1, -1).replaceAll('/', '.')}.json`);
	const known = Object.fromEntries([...new Set(files)].map((file) => [file, read(file)]));
	const missing = keys.flatMap((key, index) => (key in known[files[index]] ? [] : [index]));

	if (missing.length > 0) {
		console.log(`Embedding ${missing.length} of ${passages.length} passages`);

		// a heavy dependency, loaded only when there is something to embed
		const { pipeline } = await import('@huggingface/transformers');
		const model = await pipeline('feature-extraction', MODEL, { dtype: 'fp32' });

		for (let i = 0; i < missing.length; i += BATCH) {
			const batch = missing.slice(i, i + BATCH);
			const output = await model(
				batch.map((index) => texts[index]),
				{ pooling: 'cls', normalize: true }
			);

			(output.tolist() as number[][]).forEach((vector, b) => {
				const bytes = Int8Array.from(vector, (value) => Math.round(value * SCALE));

				known[files[batch[b]]][keys[batch[b]]] = Buffer.from(bytes.buffer).toString('base64');
			});
		}
	}

	// a file holds the passages its article has now, in their order
	const current: Record<string, Vectors> = {};

	keys.forEach((key, index) => ((current[files[index]] ??= {})[key] = known[files[index]][key]));

	fs.mkdirSync(VECTORS, { recursive: true });

	for (const file of fs.readdirSync(VECTORS))
		if (!(file in current)) fs.rmSync(path.join(VECTORS, file));

	for (const [file, vectors] of Object.entries(current)) {
		const content = `${JSON.stringify(vectors, null, '\t')}\n`;

		if (content !== source(file)) fs.writeFileSync(path.join(VECTORS, file), content);
	}

	return keys.map((key, index) => current[files[index]][key]);
}

function source(file: string) {
	const filename = path.join(VECTORS, file);

	return fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : undefined;
}

function read(file: string): Vectors {
	return JSON.parse(source(file) ?? '{}');
}
