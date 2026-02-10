import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => ({
	title: 'Thermodynamic Cascade Efficiency Simulator',
	description:
		'Simulate energy flow through nested Matrioshka brain shells to determine viable layer count and total system efficiency',
	questionSlug: 'thermodynamic-cascade-efficiency-limits'
});
