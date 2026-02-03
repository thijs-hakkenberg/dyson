/**
 * Swarm Coordination Architecture Simulator Page Load
 */

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Swarm Coordination Architecture Simulator',
		description:
			'Monte Carlo simulation comparing coordination topologies for large-scale Dyson swarms',
		questionSlug: 'swarm-coordination-architecture-scale'
	};
};
