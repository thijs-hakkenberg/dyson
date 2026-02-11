/**
 * Ontology Fetchers
 *
 * Loads taxonomy and artifact mapping YAML files using Vite's import.meta.glob.
 * Uses eager loading for consistent SSR/client behavior.
 */

import type { TaxonomyYAML, ArtifactMappingYAML } from '$lib/types/ontology';
import { parseTaxonomyYaml, parseArtifactMappingsYaml } from './ontology-parsers';

// Use import.meta.glob with eager: true for build-time loading
const yamlFiles = import.meta.glob('/src/content/ontology/*.yaml', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

let taxonomyCache: TaxonomyYAML | null = null;
let mappingsCache: ArtifactMappingYAML | null = null;

/**
 * Load and parse the taxonomy YAML
 */
export function loadTaxonomy(): TaxonomyYAML {
	if (taxonomyCache) return taxonomyCache;

	const path = '/src/content/ontology/taxonomy.yaml';
	const content = yamlFiles[path];

	if (!content) {
		console.warn('taxonomy.yaml not found');
		return { version: '1.0', domains: [] };
	}

	taxonomyCache = parseTaxonomyYaml(content);
	return taxonomyCache;
}

/**
 * Load and parse the artifact mappings YAML
 */
export function loadArtifactMappings(): ArtifactMappingYAML {
	if (mappingsCache) return mappingsCache;

	const path = '/src/content/ontology/artifact-mappings.yaml';
	const content = yamlFiles[path];

	if (!content) {
		console.warn('artifact-mappings.yaml not found');
		return { version: '1.0', mappings: [] };
	}

	mappingsCache = parseArtifactMappingsYaml(content);
	return mappingsCache;
}

/**
 * Clear caches (for development/testing)
 */
export function clearOntologyCache(): void {
	taxonomyCache = null;
	mappingsCache = null;
}
