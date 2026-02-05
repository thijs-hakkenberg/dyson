/**
 * Validation Roadmap Page Load Function
 *
 * Fetches experiments, timeline data, and statistics for the roadmap view.
 */

import type { PageLoad } from './$types';
import {
	getExperiments,
	getTimelineData,
	computeRoadmapStats,
	extractAllYears
} from '$lib/services/validation-roadmap';

export const load: PageLoad = async () => {
	const experiments = await getExperiments();
	const timelineData = await getTimelineData();
	const stats = computeRoadmapStats(experiments);
	const years = extractAllYears(experiments);

	return {
		experiments,
		timelineData,
		stats,
		years
	};
};
