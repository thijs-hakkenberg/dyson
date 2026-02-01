/**
 * BOM Item Page Load Function
 *
 * Pre-loads phase data and item metadata on the server for better performance and SEO.
 */

import type { PageLoad } from './$types';
import { getPhaseById } from '$lib/services/content';
import { getBOMItemBySlug, fetchAllBOMSpecs } from '$lib/services/bom';
import { fetchQuestionsForBOMItemSlug } from '$lib/services/questions';

export const load: PageLoad = async ({ params }) => {
	const phase = getPhaseById(params.phase);
	const itemMeta = getBOMItemBySlug(params.item);

	// Only fetch specs if we have valid phase and item
	let specs = null;
	if (phase && itemMeta) {
		specs = await fetchAllBOMSpecs(params.phase, params.item);
	}

	// Get related research questions
	const relatedQuestions = await fetchQuestionsForBOMItemSlug(params.item);

	return {
		phase,
		itemMeta,
		specs,
		relatedQuestions,
		phaseId: params.phase,
		itemSlug: params.item
	};
};
