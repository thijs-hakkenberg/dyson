import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Fleet Coordination Scale Constraints Simulator',
		description:
			'Discrete event simulation identifying coordination bottlenecks at manufacturing fleet scale',
		questionSlug: 'fleet-coordination-scale-constraints'
	};
};
