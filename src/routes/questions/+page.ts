/**
 * Questions List Page Load Function
 *
 * Fetches all questions and statistics for the list view.
 */

import type { PageLoad } from './$types';
import { fetchAllQuestions, computeQuestionStats } from '$lib/services/questions';

export const load: PageLoad = async ({ fetch }) => {
	const questions = await fetchAllQuestions();
	const stats = computeQuestionStats(questions);

	return {
		questions,
		stats
	};
};
