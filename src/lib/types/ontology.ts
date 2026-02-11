/**
 * Ontology Type Definitions
 *
 * Defines the domain/topic taxonomy and artifact reference types
 * for the unified ontology system.
 */

export type TopicId = string;
export type DomainId = string;

export interface OntologyTopic {
	id: TopicId;
	name: string;
	description?: string;
	legacyTags: string[];
	domainId: DomainId;
}

export interface OntologyDomain {
	id: DomainId;
	name: string;
	description: string;
	icon: string;
	topics: OntologyTopic[];
}

export type ArtifactType =
	| 'research-question'
	| 'blog-post'
	| 'bom-item'
	| 'validation'
	| 'experiment'
	| 'simulation'
	| 'organization';

export interface ArtifactReference {
	type: ArtifactType;
	id: string;
	slug: string;
	title: string;
	phaseId?: string;
	url: string;
}

export interface OntologyTree {
	domains: OntologyDomain[];
	topicArtifacts: Map<TopicId, ArtifactReference[]>;
	stats: OntologyStats;
}

export interface OntologyStats {
	domainCount: number;
	topicCount: number;
	mappedArtifactCount: number;
	unmappedTagCount: number;
}

/**
 * Raw YAML structures before parsing
 */
export interface TaxonomyYAML {
	version: string;
	domains: {
		id: string;
		name: string;
		description: string;
		icon: string;
		topics: {
			id: string;
			name: string;
			description?: string;
			legacyTags: string[];
		}[];
	}[];
}

export interface ArtifactMappingYAML {
	version: string;
	mappings: {
		type: ArtifactType;
		items: {
			id: string;
			slug: string;
			topics: TopicId[];
		}[];
	}[];
}
