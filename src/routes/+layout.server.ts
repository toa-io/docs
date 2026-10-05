import { articles, chapters, home, sections } from '#lib/server/contents.ts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => ({ home, sections, chapters, articles });
