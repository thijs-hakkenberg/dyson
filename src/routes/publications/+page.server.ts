/**
 * Publications List Page Load Function
 *
 * Fetches the publications registry for the publications index page.
 */

import type { PageServerLoad } from './$types';
import { fetchAllPublications } from '$lib/services/publications';

export const load: PageServerLoad = async () => {
	const publications = await fetchAllPublications();

	return {
		publications
	};
};
