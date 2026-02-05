/**
 * Resolved Questions Page Load Function
 *
 * Fetches resolved questions and resolution statistics.
 */

import type { PageLoad } from './$types';
import { fetchAllQuestions } from '$lib/services/questions';
import {
	getResolvedQuestions,
	getResolutionHistory,
	computeResolutionStats
} from '$lib/services/resolution';

export const load: PageLoad = async () => {
	const allQuestions = await fetchAllQuestions();
	const resolvedQuestions = getResolvedQuestions(allQuestions);
	const resolutionHistory = getResolutionHistory(allQuestions);
	const resolutionStats = computeResolutionStats(allQuestions);

	return {
		resolvedQuestions,
		resolutionHistory,
		resolutionStats,
		totalQuestions: allQuestions.length
	};
};
