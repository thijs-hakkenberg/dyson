/**
 * Constellation Simulator Page Load
 */

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'NEA Constellation Coverage Simulator',
		description: 'Monte Carlo simulation to determine optimal constellation size for NEA survey coverage',
		questionSlug: 'minimum-constellation-size'
	};
};
