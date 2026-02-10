/**
 * ML Trajectory Deployment Optimization Simulator Page Load
 */

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'ML Trajectory Deployment Optimizer',
		description:
			'Compare deployment strategies using neural network trajectory estimation for optimal swarm deployment sequencing',
		questionSlug: 'ml-trajectory-deployment-optimization'
	};
};
