/**
 * Ontology Services Module
 *
 * Re-exports all ontology-related functionality.
 */

// Fetcher exports
export { loadTaxonomy, loadArtifactMappings, clearOntologyCache } from './ontology-fetchers';

// Parser exports
export { parseTaxonomyYaml, parseArtifactMappingsYaml } from './ontology-parsers';

// Service exports
export {
	loadOntology,
	buildTagIndex,
	getTopicMap,
	getDomainMap,
	resolveTagsToTopics,
	isTagMapped,
	getTopic,
	getDomain,
	getDomainForTopic,
	getArtifactsForTopic,
	getTopicsForArtifact,
	computeOntologyStats,
	findUnmappedTags,
	clearAllOntologyCaches
} from './ontology-service';
