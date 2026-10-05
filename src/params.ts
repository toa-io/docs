import { defineParams } from '@sveltejs/kit/params';

export const params = defineParams({
	// the sections of the documentation, each a directory of `content`
	section: (param) => (param === 'model' || param === 'userspace' ? param : undefined)
});
