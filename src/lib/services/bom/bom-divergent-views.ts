/**
 * Divergent Views Service
 *
 * Provides functions for fetching and filtering divergent views by priority.
 */

import type { DivergentViewsData, DivergentViewTopic, DivergentViewPriority } from '$lib/types/divergent-views';
import { getAllBOMItemsForPhase } from './bom-data';
import { getDivergentViewsPath } from './bom-paths';
import { parseDivergentViewsYAML } from './bom-parsers';

/**
 * Priority order for sorting (critical first)
 */
const PRIORITY_ORDER: Record<DivergentViewPriority, number> = {
	critical: 0,
	high: 1,
	medium: 2,
	low: 3
};

/**
 * Extended topic with metadata for prioritized views
 */
export interface PrioritizedDivergentView extends DivergentViewTopic {
	bomId: string;
	itemSlug: string;
	itemName: string;
	phaseId: string;
}

/**
 * Fetch divergent views for a specific phase and item
 */
async function fetchDivergentViewsForItem(
	phaseId: string,
	itemSlug: string
): Promise<DivergentViewsData | null> {
	const path = getDivergentViewsPath(phaseId, itemSlug);

	try {
		const response = await fetch(path);
		if (!response.ok) return null;

		const content = await response.text();
		return parseDivergentViewsYAML(content);
	} catch {
		return null;
	}
}

/**
 * Get all divergent views for a phase (or all phases), sorted by priority
 * @param phaseId - Optional phase ID to filter by
 * @returns Array of prioritized divergent views sorted by priority (critical first)
 */
export async function getPrioritizedDivergentViews(
	phaseId?: string
): Promise<PrioritizedDivergentView[]> {
	const phases = phaseId ? [phaseId] : ['phase-0', 'phase-1', 'phase-2'];
	const allViews: PrioritizedDivergentView[] = [];

	for (const phase of phases) {
		const items = getAllBOMItemsForPhase(phase);

		for (const item of items) {
			const data = await fetchDivergentViewsForItem(phase, item.slug);
			if (!data) continue;

			for (const topic of data.topics) {
				allViews.push({
					...topic,
					bomId: data.bomId,
					itemSlug: data.itemSlug,
					itemName: item.name,
					phaseId: phase
				});
			}
		}
	}

	// Sort by priority (critical first), then by topic name
	return allViews.sort((a, b) => {
		const priorityA = PRIORITY_ORDER[a.priority || 'medium'];
		const priorityB = PRIORITY_ORDER[b.priority || 'medium'];

		if (priorityA !== priorityB) {
			return priorityA - priorityB;
		}

		return a.topic.localeCompare(b.topic);
	});
}

/**
 * Get divergent views filtered by a specific priority level
 * @param priority - The priority level to filter by
 * @param phaseId - Optional phase ID to filter by
 * @returns Array of divergent views matching the priority
 */
export async function getDivergentViewsByPriority(
	priority: DivergentViewPriority,
	phaseId?: string
): Promise<PrioritizedDivergentView[]> {
	const allViews = await getPrioritizedDivergentViews(phaseId);
	return allViews.filter((view) => (view.priority || 'medium') === priority);
}

/**
 * Get summary counts of divergent views by priority
 * @param phaseId - Optional phase ID to filter by
 * @returns Object with counts for each priority level
 */
export async function getDivergentViewPriorityCounts(
	phaseId?: string
): Promise<Record<DivergentViewPriority, number>> {
	const allViews = await getPrioritizedDivergentViews(phaseId);

	const counts: Record<DivergentViewPriority, number> = {
		critical: 0,
		high: 0,
		medium: 0,
		low: 0
	};

	for (const view of allViews) {
		const priority = view.priority || 'medium';
		counts[priority]++;
	}

	return counts;
}
