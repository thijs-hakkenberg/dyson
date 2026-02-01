/**
 * Fleet Logistics Simulator Page Load
 */

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Fleet Size vs Vehicle Capacity Simulator',
		description:
			'Monte Carlo discrete event simulation comparing fleet configurations for asteroid mining logistics',
		questionSlug: 'fleet-size-vs-vehicle-capacity'
	};
};
