import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Self-Replication Closure Threshold Simulator',
		description:
			'Simulate exponential growth of self-replicating manufacturing foundries with closure ratio, degradation, and vitamin supply constraints',
		questionSlug: 'self-replication-closure-threshold'
	};
};
