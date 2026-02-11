/**
 * Ontology Parsers
 *
 * YAML parsing utilities for taxonomy and artifact mapping files.
 * Uses js-yaml for reliable parsing.
 */

import yaml from 'js-yaml';
import type { TaxonomyYAML, ArtifactMappingYAML } from '$lib/types/ontology';

/**
 * Parse taxonomy YAML content
 */
export function parseTaxonomyYaml(content: string): TaxonomyYAML {
	try {
		const data = yaml.load(content) as TaxonomyYAML;
		if (!data || !data.domains) {
			return { version: '1.0', domains: [] };
		}
		// Ensure all topics have legacyTags arrays
		for (const domain of data.domains) {
			for (const topic of domain.topics) {
				if (!topic.legacyTags) {
					topic.legacyTags = [];
				}
			}
		}
		return data;
	} catch (err) {
		console.error('Failed to parse taxonomy YAML:', err);
		return { version: '1.0', domains: [] };
	}
}

/**
 * Parse artifact mappings YAML content
 */
export function parseArtifactMappingsYaml(content: string): ArtifactMappingYAML {
	try {
		const data = yaml.load(content) as ArtifactMappingYAML;
		if (!data || !data.mappings) {
			return { version: '1.0', mappings: [] };
		}
		return data;
	} catch (err) {
		console.error('Failed to parse artifact mappings YAML:', err);
		return { version: '1.0', mappings: [] };
	}
}
