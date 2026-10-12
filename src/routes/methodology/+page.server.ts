import type { PageServerLoad } from './$types';
import { getMethodologyDocs, critiqueRoundsFor } from '$lib/services/methodology';

export const load: PageServerLoad = () => ({
	docs: getMethodologyDocs().map(({ slug, title, summary, sha }) => ({
		slug,
		title,
		summary,
		rounds: critiqueRoundsFor(sha).length
	}))
});
