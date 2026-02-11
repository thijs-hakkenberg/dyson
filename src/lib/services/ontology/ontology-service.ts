/**
 * Ontology Service
 *
 * Core query logic for the ontology system. Builds indexes from taxonomy YAML
 * and resolves artifact tags to ontology topics at runtime.
 */

import type {
	OntologyDomain,
	OntologyTopic,
	TopicId,
	DomainId,
	ArtifactReference,
	ArtifactType,
	OntologyStats
} from '$lib/types/ontology';
import { loadTaxonomy, loadArtifactMappings } from './ontology-fetchers';
import { fetchAllQuestions } from '$lib/services/questions';
import { fetchAllBlogPosts } from '$lib/services/blog';
import { fetchAllValidations } from '$lib/services/validation';
import { BOM_ITEM_SLUGS } from '$lib/services/bom/bom-data';

// Cached indexes
let domainsCache: OntologyDomain[] | null = null;
let tagIndexCache: Map<string, TopicId[]> | null = null;
let topicMapCache: Map<TopicId, OntologyTopic> | null = null;
let domainMapCache: Map<DomainId, OntologyDomain> | null = null;

/**
 * Load the ontology and build domain/topic structures
 */
export function loadOntology(): OntologyDomain[] {
	if (domainsCache) return domainsCache;

	const taxonomy = loadTaxonomy();
	const domains: OntologyDomain[] = taxonomy.domains.map((d) => ({
		id: d.id,
		name: d.name,
		description: d.description,
		icon: d.icon,
		topics: d.topics.map((t) => ({
			id: t.id,
			name: t.name,
			description: t.description,
			legacyTags: t.legacyTags || [],
			domainId: d.id
		}))
	}));

	domainsCache = domains;
	return domains;
}

/**
 * Build reverse index: legacyTag -> TopicId[] (case-insensitive)
 */
export function buildTagIndex(): Map<string, TopicId[]> {
	if (tagIndexCache) return tagIndexCache;

	const domains = loadOntology();
	const index = new Map<string, TopicId[]>();

	for (const domain of domains) {
		for (const topic of domain.topics) {
			for (const tag of topic.legacyTags) {
				const key = tag.toLowerCase();
				const existing = index.get(key) || [];
				if (!existing.includes(topic.id)) {
					existing.push(topic.id);
				}
				index.set(key, existing);
			}
		}
	}

	tagIndexCache = index;
	return index;
}

/**
 * Build topic lookup map: TopicId -> OntologyTopic
 */
export function getTopicMap(): Map<TopicId, OntologyTopic> {
	if (topicMapCache) return topicMapCache;

	const domains = loadOntology();
	const map = new Map<TopicId, OntologyTopic>();

	for (const domain of domains) {
		for (const topic of domain.topics) {
			map.set(topic.id, topic);
		}
	}

	topicMapCache = map;
	return map;
}

/**
 * Build domain lookup map: DomainId -> OntologyDomain
 */
export function getDomainMap(): Map<DomainId, OntologyDomain> {
	if (domainMapCache) return domainMapCache;

	const domains = loadOntology();
	const map = new Map<DomainId, OntologyDomain>();

	for (const domain of domains) {
		map.set(domain.id, domain);
	}

	domainMapCache = map;
	return map;
}

/**
 * Resolve an array of legacy tags to ontology topics
 */
export function resolveTagsToTopics(tags: string[]): OntologyTopic[] {
	const tagIndex = buildTagIndex();
	const topicMap = getTopicMap();
	const seen = new Set<TopicId>();
	const topics: OntologyTopic[] = [];

	for (const tag of tags) {
		const topicIds = tagIndex.get(tag.toLowerCase()) || [];
		for (const id of topicIds) {
			if (!seen.has(id)) {
				seen.add(id);
				const topic = topicMap.get(id);
				if (topic) topics.push(topic);
			}
		}
	}

	return topics;
}

/**
 * Check if a tag resolves to any topic
 */
export function isTagMapped(tag: string): boolean {
	const tagIndex = buildTagIndex();
	return tagIndex.has(tag.toLowerCase());
}

/**
 * Get topic by ID
 */
export function getTopic(topicId: TopicId): OntologyTopic | undefined {
	return getTopicMap().get(topicId);
}

/**
 * Get domain by ID
 */
export function getDomain(domainId: DomainId): OntologyDomain | undefined {
	return getDomainMap().get(domainId);
}

/**
 * Get the domain that contains a topic
 */
export function getDomainForTopic(topicId: TopicId): OntologyDomain | undefined {
	const topic = getTopicMap().get(topicId);
	if (!topic) return undefined;
	return getDomainMap().get(topic.domainId);
}

/**
 * Get all artifacts matching a topic, including those from:
 * 1. Tag-based resolution (research questions, blog posts, validations)
 * 2. Explicit artifact mappings (BOM items, simulations)
 */
export async function getArtifactsForTopic(topicId: TopicId): Promise<ArtifactReference[]> {
	const tagIndex = buildTagIndex();
	const topic = getTopicMap().get(topicId);
	if (!topic) return [];

	// Build a set of tags that resolve to this topic
	const matchingTags = new Set<string>();
	for (const [tag, topicIds] of tagIndex.entries()) {
		if (topicIds.includes(topicId)) {
			matchingTags.add(tag);
		}
	}

	const artifacts: ArtifactReference[] = [];

	// 1. Research questions (tag-based)
	const questions = await fetchAllQuestions();
	for (const q of questions) {
		if (q.tags.some((t) => matchingTags.has(t.toLowerCase()))) {
			artifacts.push({
				type: 'research-question',
				id: q.id,
				slug: q.slug,
				title: q.title,
				phaseId: q.sourcePhaseId,
				url: `/questions/${q.slug}`
			});
		}
	}

	// 2. Blog posts (tag-based)
	const posts = await fetchAllBlogPosts();
	for (const p of posts) {
		if (p.tags.some((t) => matchingTags.has(t.toLowerCase()))) {
			artifacts.push({
				type: 'blog-post',
				id: p.slug,
				slug: p.slug,
				title: p.title,
				url: `/blog/${p.slug}`
			});
		}
	}

	// 3. Validations (tag-based)
	const validations = await fetchAllValidations();
	for (const v of validations) {
		if (v.tags.some((t: string) => matchingTags.has(t.toLowerCase()))) {
			artifacts.push({
				type: 'validation',
				id: v.id,
				slug: v.slug,
				title: v.claim,
				phaseId: v.phaseId,
				url: `/validation`
			});
		}
	}

	// 4. BOM items (from artifact mappings)
	const mappings = loadArtifactMappings();
	for (const group of mappings.mappings) {
		for (const item of group.items) {
			if (item.topics.includes(topicId)) {
				const bomName = getBOMItemName(item.id);
				const phaseId = `phase-${item.id.split('-')[1]}` as string;
				artifacts.push({
					type: group.type,
					id: item.id,
					slug: item.slug,
					title: bomName || item.slug,
					phaseId,
					url: `/plan/${phaseId}/bom/${item.slug}`
				});
			}
		}
	}

	return artifacts;
}

/**
 * Get topics for a specific artifact (reverse lookup)
 */
export function getTopicsForArtifact(
	type: ArtifactType,
	tags: string[],
	id?: string
): OntologyTopic[] {
	const topics = resolveTagsToTopics(tags);

	// Also check artifact mappings for BOM items
	if (type === 'bom-item' && id) {
		const mappings = loadArtifactMappings();
		for (const group of mappings.mappings) {
			if (group.type !== 'bom-item') continue;
			const item = group.items.find((i) => i.id === id || i.slug === id);
			if (item) {
				const topicMap = getTopicMap();
				for (const topicId of item.topics) {
					const topic = topicMap.get(topicId);
					if (topic && !topics.some((t) => t.id === topicId)) {
						topics.push(topic);
					}
				}
			}
		}
	}

	return topics;
}

/**
 * Compute ontology stats
 */
export async function computeOntologyStats(): Promise<OntologyStats> {
	const domains = loadOntology();
	let topicCount = 0;
	for (const d of domains) {
		topicCount += d.topics.length;
	}

	// Count mapped artifacts
	const allArtifactIds = new Set<string>();
	for (const domain of domains) {
		for (const topic of domain.topics) {
			const artifacts = await getArtifactsForTopic(topic.id);
			for (const a of artifacts) {
				allArtifactIds.add(`${a.type}:${a.id}`);
			}
		}
	}

	// Count unmapped tags
	const unmapped = await findUnmappedTags();

	return {
		domainCount: domains.length,
		topicCount,
		mappedArtifactCount: allArtifactIds.size,
		unmappedTagCount: unmapped.length
	};
}

/**
 * Find all tags across artifacts that don't map to any topic
 */
export async function findUnmappedTags(): Promise<string[]> {
	const tagIndex = buildTagIndex();
	const allTags = new Set<string>();

	const questions = await fetchAllQuestions();
	for (const q of questions) {
		for (const t of q.tags) allTags.add(t);
	}

	const posts = await fetchAllBlogPosts();
	for (const p of posts) {
		for (const t of p.tags) allTags.add(t);
	}

	const validations = await fetchAllValidations();
	for (const v of validations) {
		for (const t of v.tags) allTags.add(t);
	}

	return Array.from(allTags)
		.filter((tag) => !tagIndex.has(tag.toLowerCase()))
		.sort();
}

/**
 * Get BOM item name from ID using the slug mapping
 */
function getBOMItemName(bomId: string): string {
	const slug = BOM_ITEM_SLUGS[bomId];
	if (!slug) return bomId;
	return slug
		.split('-')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
}

/**
 * Clear all ontology caches
 */
export function clearAllOntologyCaches(): void {
	domainsCache = null;
	tagIndexCache = null;
	topicMapCache = null;
	domainMapCache = null;
}
