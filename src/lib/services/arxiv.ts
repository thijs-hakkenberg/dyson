import type { ArxivPaper, ArxivSearchParams, ArxivSearchResult } from '$lib/types';

// Relevant arXiv categories for Dyson swarm research
export const ARXIV_CATEGORIES = [
	{ id: 'astro-ph.SR', name: 'Solar and Stellar Astrophysics' },
	{ id: 'astro-ph.EP', name: 'Earth and Planetary Astrophysics' },
	{ id: 'astro-ph.IM', name: 'Instrumentation and Methods' },
	{ id: 'physics.space-ph', name: 'Space Physics' },
	{ id: 'physics.pop-ph', name: 'Popular Physics' },
	{ id: 'cond-mat.mtrl-sci', name: 'Materials Science' }
];

// Suggested search terms for Project Dyson research
export const SUGGESTED_TERMS = [
	'Dyson sphere',
	'Dyson swarm',
	'megastructure',
	'solar sail',
	'space-based solar power',
	'asteroid mining',
	'space manufacturing',
	'in-situ resource utilization',
	'solar energy harvesting',
	'orbital mechanics',
	'space station design',
	'thermal radiator',
	'photovoltaic space'
];

/**
 * Client-side function to search arXiv via API route
 * This handles CORS issues through server proxy
 */
export async function searchArxiv(params: ArxivSearchParams): Promise<ArxivSearchResult> {
	try {
		const response = await fetch('/api/arxiv', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`arXiv API error: ${response.status} - ${errorText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('arXiv search error:', error);
		return {
			papers: [],
			totalResults: 0,
			startIndex: 0
		};
	}
}

/**
 * Format paper date for display
 */
export function formatPaperDate(date: Date): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	}).format(new Date(date));
}

