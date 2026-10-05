import { articles, chapters, home, model } from '#lib/server/contents.ts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => ({ home, model, chapters, articles });
