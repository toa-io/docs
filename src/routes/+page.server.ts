import intro from '$docs/0.intro.md?raw';
import type { PageServerLoad } from './$types';

// `# Toa: Composable Application Runtime` followed by the `**motto**`
const [, name, title] = /^# ([^:\n]+): (.+)$/m.exec(intro) ?? [];
const [, motto] = /^\*\*([^*]+)\*\*$/m.exec(intro) ?? [];

export const load: PageServerLoad = () => ({ hero: { name, title, motto } });
