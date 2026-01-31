import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ArxivPaper, ArxivSearchParams, ArxivSearchResult } from '$lib/types';

// This API route cannot be prerendered - it requires a server
export const prerender = false;

const ARXIV_API = 'http://export.arxiv.org/api/query';

/**
 * Parse arXiv Atom XML response into structured data
 */
function parseArxivXML(xml: string): ArxivSearchResult {
	const papers: ArxivPaper[] = [];

	// Extract total results
	const totalMatch = xml.match(/<opensearch:totalResults[^>]*>(\d+)<\/opensearch:totalResults>/);
	const totalResults = totalMatch ? parseInt(totalMatch[1], 10) : 0;

	// Extract start index
	const startMatch = xml.match(/<opensearch:startIndex[^>]*>(\d+)<\/opensearch:startIndex>/);
	const startIndex = startMatch ? parseInt(startMatch[1], 10) : 0;

	// Extract entries
	const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
	let match;

	while ((match = entryRegex.exec(xml)) !== null) {
		const entry = match[1];

		// Extract ID
		const idMatch = entry.match(/<id>(.*?)<\/id>/);
		const id = idMatch ? idMatch[1].replace('http://arxiv.org/abs/', '') : '';

		// Extract title
		const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
		const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '';

		// Extract summary
		const summaryMatch = entry.match(/<summary>([\s\S]*?)<\/summary>/);
		const summary = summaryMatch ? summaryMatch[1].replace(/\s+/g, ' ').trim() : '';

		// Extract authors
		const authors: string[] = [];
		const authorRegex = /<author>\s*<name>(.*?)<\/name>/g;
		let authorMatch;
		while ((authorMatch = authorRegex.exec(entry)) !== null) {
			authors.push(authorMatch[1].trim());
		}

		// Extract dates
		const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
		const published = publishedMatch ? new Date(publishedMatch[1]) : new Date();

		const updatedMatch = entry.match(/<updated>(.*?)<\/updated>/);
		const updated = updatedMatch ? new Date(updatedMatch[1]) : published;

		// Extract categories
		const categories: string[] = [];
		const categoryRegex = /<category[^>]*term="([^"]+)"/g;
		let catMatch;
		while ((catMatch = categoryRegex.exec(entry)) !== null) {
			categories.push(catMatch[1]);
		}

		// Extract PDF link
		const pdfMatch = entry.match(/<link[^>]*title="pdf"[^>]*href="([^"]+)"/);
		const pdfUrl = pdfMatch ? pdfMatch[1] : `https://arxiv.org/pdf/${id}.pdf`;

		papers.push({
			id,
			title,
			authors,
			summary,
			published,
			updated,
			categories,
			pdfUrl,
			arxivUrl: `https://arxiv.org/abs/${id}`
		});
	}

	return { papers, totalResults, startIndex };
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const params: ArxivSearchParams = await request.json();
		const { query, categories, maxResults = 20, sortBy = 'relevance', sortOrder = 'descending' } =
			params;

		if (!query) {
			throw error(400, 'Missing required field: query');
		}

		// Build search query
		let searchQuery = query;

		// Add category filter if specified
		if (categories && categories.length > 0) {
			const catFilter = categories.map((cat) => `cat:${cat}`).join('+OR+');
			searchQuery = `(${searchQuery})+AND+(${catFilter})`;
		}

		// Build URL
		const url = new URL(ARXIV_API);
		url.searchParams.set('search_query', searchQuery);
		url.searchParams.set('start', '0');
		url.searchParams.set('max_results', maxResults.toString());
		url.searchParams.set('sortBy', sortBy);
		url.searchParams.set('sortOrder', sortOrder);

		const response = await fetch(url.toString());

		if (!response.ok) {
			throw error(response.status, `arXiv API error: ${response.statusText}`);
		}

		const xml = await response.text();
		const result = parseArxivXML(xml);

		return json(result);
	} catch (err) {
		console.error('arXiv API route error:', err);
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(500, 'Internal server error');
	}
};
