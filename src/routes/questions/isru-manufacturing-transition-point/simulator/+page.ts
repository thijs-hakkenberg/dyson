/**
 * ISRU Manufacturing Transition Point Simulator Page Load
 */

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'ISRU Manufacturing Transition Point Simulator',
		description:
			'Monte Carlo simulation comparing in-space manufacturing vs Earth-based manufacturing with launch costs',
		questionSlug: 'isru-manufacturing-transition-point'
	};
};
