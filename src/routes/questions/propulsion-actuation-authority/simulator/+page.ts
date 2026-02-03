import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Propulsion Actuation Authority Simulator',
		description:
			'Monte Carlo simulation evaluating propulsion control authority for station-keeping and collision avoidance',
		questionSlug: 'propulsion-actuation-authority'
	};
};
