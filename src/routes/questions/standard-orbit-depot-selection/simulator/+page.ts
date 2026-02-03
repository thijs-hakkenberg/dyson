import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Standard Depot Orbit Selection Simulator',
		description:
			'Multi-objective Monte Carlo trade analysis for depot orbital location selection',
		questionSlug: 'standard-orbit-depot-selection'
	};
};
