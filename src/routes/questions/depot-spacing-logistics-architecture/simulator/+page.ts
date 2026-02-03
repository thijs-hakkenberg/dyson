/**
 * Depot Logistics Simulator Page Load
 */

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Depot Spacing Logistics Simulator',
		description:
			'Monte Carlo discrete event simulation for Dyson swarm depot logistics and maintenance drone operations',
		questionSlug: 'depot-spacing-logistics-architecture'
	};
};
