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
 * Build arXiv search query string
 */
export function buildSearchQuery(
	terms: string[],
	categories?: string[],
	combineTermsWithAnd = false
): string {
	const termOperator = combineTermsWithAnd ? '+AND+' : '+OR+';

	let query = '';

	if (terms.length > 0) {
		const termQueries = terms.map((term) => {
			// Wrap multi-word terms in quotes
			const escapedTerm = term.includes(' ') ? `"${term}"` : term;
			return `all:${escapedTerm}`;
		});
		query = termQueries.join(termOperator);
	}

	if (categories && categories.length > 0) {
		const catQuery = categories.map((cat) => `cat:${cat}`).join('+OR+');
		if (query) {
			query = `(${query})+AND+(${catQuery})`;
		} else {
			query = catQuery;
		}
	}

	return query;
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

/**
 * Extract arXiv ID from full URL or ID
 */
export function extractArxivId(idOrUrl: string): string {
	const match = idOrUrl.match(/(\d{4}\.\d{4,5})(v\d+)?/);
	return match ? match[1] : idOrUrl;
}

/**
 * Generate arXiv URLs from ID
 */
export function getArxivUrls(id: string): { abstract: string; pdf: string } {
	const cleanId = extractArxivId(id);
	return {
		abstract: `https://arxiv.org/abs/${cleanId}`,
		pdf: `https://arxiv.org/pdf/${cleanId}.pdf`
	};
}
