/**
 * Topic Detail Page Load Function
 *
 * Loads a specific topic with its artifacts and related topics.
 */

import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import {
	getTopic,
	getDomainForTopic,
	getArtifactsForTopic,
	loadOntology
} from '$lib/services/ontology';

export const load: PageLoad = async ({ params }) => {
	const topic = getTopic(params.topic);

	if (!topic) {
		throw error(404, `Topic "${params.topic}" not found`);
	}

	const domain = getDomainForTopic(params.topic);
	const artifacts = await getArtifactsForTopic(params.topic);

	// Get sibling topics from the same domain
	const siblingTopics = domain
		? domain.topics.filter((t) => t.id !== params.topic)
		: [];

	// Get related topics from other domains that share artifacts
	const allDomains = loadOntology();
	const relatedTopics = allDomains
		.flatMap((d) => d.topics)
		.filter((t) => t.id !== params.topic && t.domainId !== topic.domainId)
		.filter((t) => {
			// Check if any legacy tags overlap
			const topicTags = new Set(topic.legacyTags.map((tag) => tag.toLowerCase()));
			return t.legacyTags.some((tag) => topicTags.has(tag.toLowerCase()));
		})
		.slice(0, 6);

	return {
		topic,
		domain,
		artifacts,
		siblingTopics,
		relatedTopics
	};
};
