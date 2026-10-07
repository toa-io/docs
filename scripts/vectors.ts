// Embeds the passages of the documentation that are not embedded yet, see README
import { embed } from '../src/lib/search/index/embed.ts';
import { passages } from '../src/lib/search/index/passages.ts';

await embed(passages('content'));
