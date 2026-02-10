/**
 * Solar Mass Extraction Rate Simulator Page Load
 *
 * Addresses research question rq-3b-2: Solar mass extraction rate limits
 */

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Solar Mass Extraction Rate Simulator',
		description:
			'Model solar mass extraction rate limits, stellar response, and stability boundaries for Caplan engine operations',
		questionSlug: 'solar-mass-extraction-rate-limits'
	};
};
