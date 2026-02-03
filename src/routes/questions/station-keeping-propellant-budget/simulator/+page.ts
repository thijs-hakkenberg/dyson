/**
 * Swarm Dynamics Simulator Page Load
 */

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Swarm Dynamics Simulator',
		description:
			'Monte Carlo simulation for Dyson swarm station-keeping, collision probability, and propulsion authority analysis',
		questionSlug: 'station-keeping-propellant-budget'
	};
};
