/**
 * Orbital Location Trade Analysis Simulator Page Load
 *
 * Addresses research questions:
 * - rq-1-19: Optimal orbital location for swarm construction
 * - rq-1-36: Depot orbit selection criteria
 */

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Orbital Location Trade Analysis Simulator',
		description:
			'Multi-objective Monte Carlo analysis comparing orbital depot locations from lunar NRHO to Mercury orbit',
		questionSlug: 'orbital-location-trade-analysis'
	};
};
