import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Swarm Collision Probability Simulator',
		description:
			'Monte Carlo simulation analyzing collision probability and safe spacing requirements for Dyson swarm formations',
		questionSlug: 'swarm-collision-probability'
	};
};
