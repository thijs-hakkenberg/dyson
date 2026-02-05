/**
 * Validation Detail Page Load Function
 *
 * Fetches a specific validated claim by slug.
 */

import type { PageLoad, EntryGenerator } from './$types';
import { fetchAllValidations, getValidationBySlug } from '$lib/services/validation';
import { error } from '@sveltejs/kit';

// Generate entries for prerendering
export const entries: EntryGenerator = async () => {
	const validations = await fetchAllValidations();
	return validations.map((v) => ({ slug: v.slug }));
};

export const load: PageLoad = async ({ params }) => {
	const claim = await getValidationBySlug(params.slug);

	if (!claim) {
		error(404, {
			message: 'Validation not found'
		});
	}

	// Get related validations (same tags or BOM item)
	const allValidations = await fetchAllValidations();
	const relatedValidations = allValidations
		.filter((v) =>
			v.id !== claim.id &&
			(v.bomItemId === claim.bomItemId ||
			 v.tags.some(tag => claim.tags.includes(tag)))
		)
		.slice(0, 4);

	return {
		claim,
		relatedValidations
	};
};
