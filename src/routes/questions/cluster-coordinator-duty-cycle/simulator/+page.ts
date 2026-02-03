import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Cluster Coordinator Duty Cycle Simulator',
		description:
			'Discrete event simulation analyzing optimal coordinator rotation duty cycles for swarm clusters',
		questionSlug: 'cluster-coordinator-duty-cycle'
	};
};
