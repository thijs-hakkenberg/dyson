/**
 * Shkadov Mirror Standoff Distance Simulator Page Load
 *
 * Addresses research question rq-3b-1: Shkadov mirror standoff distance optimization
 */

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	return {
		title: 'Shkadov Mirror Standoff Distance Simulator',
		description:
			'Trade study simulator for Shkadov mirror standoff distance, analyzing thrust, mass, temperature, and feasibility trade-offs',
		questionSlug: 'shkadov-standoff-distance-optimization'
	};
};
