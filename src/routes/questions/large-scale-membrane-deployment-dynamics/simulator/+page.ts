import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => ({
	title: 'Membrane Deployment Dynamics Simulator',
	description:
		'Analyze structural stability and flutter boundaries for large-scale thin-film membrane deployment',
	questionSlug: 'large-scale-membrane-deployment-dynamics'
});
