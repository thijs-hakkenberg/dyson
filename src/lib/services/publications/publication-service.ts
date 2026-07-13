/**
 * Publication Service
 *
 * Loads the publications registry (paper portfolio: venue, status, DOI) from
 * src/content/publications/*.yaml.
 */

import type { Publication } from '$lib/types/publication';
import yaml from 'js-yaml';

const publicationFiles = import.meta.glob('/src/content/publications/*.yaml', {
	query: '?raw',
	import: 'default',
	eager: false
}) as Record<string, () => Promise<string>>;

interface PublicationYAML {
	publications: Publication[];
}

function parsePublicationFile(content: string): Publication[] {
	try {
		const data = yaml.load(content) as PublicationYAML;
		return data?.publications || [];
	} catch {
		console.error('Failed to parse publications YAML');
		return [];
	}
}

let publicationsCache: Publication[] | null = null;

/**
 * Fetch all publications, sorted by paper number.
 */
export async function fetchAllPublications(): Promise<Publication[]> {
	if (publicationsCache) {
		return publicationsCache;
	}

	const publications: Publication[] = [];
	const loadPromises = Object.entries(publicationFiles).map(async ([, loader]) => {
		try {
			const content = await loader();
			return parsePublicationFile(content);
		} catch {
			return [];
		}
	});

	const results = await Promise.all(loadPromises);
	for (const pubs of results) {
		publications.push(...pubs);
	}

	publications.sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }));

	publicationsCache = publications;
	return publications;
}
