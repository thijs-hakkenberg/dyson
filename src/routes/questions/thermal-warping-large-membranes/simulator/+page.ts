import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => ({
	title: 'Thermal Warping Membrane Simulator',
	description:
		'Monte Carlo simulation of thermal warping effects on large thin-film membranes in the solar environment',
	questionSlug: 'thermal-warping-large-membranes'
});
