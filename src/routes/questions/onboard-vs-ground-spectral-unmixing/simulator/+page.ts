/**
 * Spectral Analysis Simulator Page Load
 */

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'On-board vs Ground Spectral Unmixing Simulator',
		description:
			'Monte Carlo simulation comparing on-board spectral processing vs ground-based analysis for asteroid prospecting',
		questionSlug: 'onboard-vs-ground-spectral-unmixing'
	};
};
