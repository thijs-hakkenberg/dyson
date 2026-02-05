/**
 * Validation Dashboard Page Load Function
 *
 * Fetches all validations and statistics for the dashboard view.
 */

import type { PageLoad } from './$types';
import { fetchAllValidations, computeValidationStats, extractAllTags } from '$lib/services/validation';

export const load: PageLoad = async () => {
	const validations = await fetchAllValidations();
	const stats = computeValidationStats(validations);
	const allTags = extractAllTags(validations);

	return {
		validations,
		stats,
		allTags
	};
};
