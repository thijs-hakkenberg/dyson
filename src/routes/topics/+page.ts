/**
 * Topics Browser Page Load Function
 *
 * Loads the ontology tree with domain/topic structure and artifact counts.
 */

import type { PageLoad } from './$types';
import {
	loadOntology,
	getArtifactsForTopic,
	computeOntologyStats
} from '$lib/services/ontology';

export const load: PageLoad = async () => {
	const domains = loadOntology();

	// Build artifact counts per topic
	const artifactCounts = new Map<string, number>();
	for (const domain of domains) {
		for (const topic of domain.topics) {
			const artifacts = await getArtifactsForTopic(topic.id);
			artifactCounts.set(topic.id, artifacts.length);
		}
	}

	const stats = await computeOntologyStats();

	return {
		domains,
		artifactCounts: Object.fromEntries(artifactCounts),
		stats
	};
};
