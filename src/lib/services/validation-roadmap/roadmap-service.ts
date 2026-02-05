/**
 * Validation Roadmap Service
 *
 * Provides functions for fetching, filtering, and analyzing validation experiments
 * and their relationship to research questions and BOM items.
 */

import type {
	Experiment,
	ExperimentStatus,
	ExperimentFilters,
	RoadmapTimeline,
	RoadmapStats,
	RoadmapMilestone
} from '$lib/types/roadmap';
import type { ResearchQuestionId, BOMItemId } from '$lib/types/entities';

// Use import.meta.glob to load YAML at build time
const yamlFiles = import.meta.glob('/static/content/validation-roadmap/**/*.yaml', {
	query: '?raw',
	import: 'default',
	eager: false
}) as Record<string, () => Promise<string>>;

/**
 * Cache for loaded data
 */
let experimentsCache: Experiment[] | null = null;
let milestonesCache: RoadmapMilestone[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60000; // 1 minute

/**
 * Simple YAML parser for experiments data
 */
function parseExperimentsYaml(content: string): {
	experiments: Experiment[];
	milestones: RoadmapMilestone[];
} {
	const experiments: Experiment[] = [];
	const milestones: RoadmapMilestone[] = [];

	const lines = content.split('\n');
	let currentSection: 'experiments' | 'milestones' | null = null;
	let currentItem: Record<string, unknown> | null = null;
	let currentArray: string | null = null;
	let indent = 0;

	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;

		const lineIndent = line.search(/\S/);

		// Top-level sections
		if (trimmed === 'experiments:') {
			currentSection = 'experiments';
			currentItem = null;
			continue;
		}
		if (trimmed === 'milestones:') {
			currentSection = 'milestones';
			currentItem = null;
			continue;
		}

		// Array item start
		if (trimmed.startsWith('- ')) {
			if (currentArray && currentItem) {
				// Array value
				const value = trimmed.slice(2).trim().replace(/^["']|["']$/g, '');
				if (!currentItem[currentArray]) currentItem[currentArray] = [];
				(currentItem[currentArray] as string[]).push(value);
				continue;
			}

			// New item in experiments or milestones
			if (currentItem && currentSection === 'experiments') {
				experiments.push(parseExperiment(currentItem));
			} else if (currentItem && currentSection === 'milestones') {
				milestones.push(parseMilestone(currentItem));
			}
			currentItem = {};
			currentArray = null;

			// Parse inline key-value if present
			const afterDash = trimmed.slice(2);
			if (afterDash.includes(':')) {
				const [key, ...valueParts] = afterDash.split(':');
				const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
				if (value) {
					currentItem[key.trim()] = value;
				} else {
					currentArray = key.trim();
				}
			}
			indent = lineIndent;
			continue;
		}

		// Key-value pair
		if (trimmed.includes(':') && currentItem) {
			const [key, ...valueParts] = trimmed.split(':');
			const keyTrimmed = key.trim();
			const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');

			if (value === '' || value === 'null') {
				// Could be array start or null value
				if (
					[
						'relatedRQs',
						'relatedBOMItems',
						'tags',
						'expectedOutcomes',
						'relatedExperiments'
					].includes(keyTrimmed)
				) {
					currentArray = keyTrimmed;
					currentItem[keyTrimmed] = [];
				} else {
					currentItem[keyTrimmed] = null;
				}
			} else {
				currentArray = null;
				currentItem[keyTrimmed] = value;
			}
		}
	}

	// Handle last item
	if (currentItem) {
		if (currentSection === 'experiments') {
			experiments.push(parseExperiment(currentItem));
		} else if (currentSection === 'milestones') {
			milestones.push(parseMilestone(currentItem));
		}
	}

	return { experiments, milestones };
}

function parseExperiment(raw: Record<string, unknown>): Experiment {
	return {
		id: (raw.id as string) || '',
		name: (raw.name as string) || '',
		description: (raw.description as string) || '',
		targetDate: (raw.targetDate as string) || '',
		status: ((raw.status as ExperimentStatus) || 'proposed') as ExperimentStatus,
		estimatedCost: parseInt(raw.estimatedCost as string, 10) || 0,
		organization: (raw.organization as string) || '',
		relatedRQs: ((raw.relatedRQs as string[]) || []) as ResearchQuestionId[],
		relatedBOMItems: ((raw.relatedBOMItems as string[]) || []) as BOMItemId[],
		tags: (raw.tags as string[]) || [],
		expectedOutcomes: (raw.expectedOutcomes as string[]) || undefined,
		referenceUrl: (raw.referenceUrl as string) || undefined,
		notes: (raw.notes as string) || undefined
	};
}

function parseMilestone(raw: Record<string, unknown>): RoadmapMilestone {
	return {
		id: (raw.id as string) || '',
		name: (raw.name as string) || '',
		targetDate: (raw.targetDate as string) || '',
		description: (raw.description as string) || '',
		relatedExperiments: (raw.relatedExperiments as string[]) || [],
		criticalPath: raw.criticalPath === 'true' || raw.criticalPath === true
	};
}

/**
 * Load and parse all roadmap data
 */
async function loadData(): Promise<{
	experiments: Experiment[];
	milestones: RoadmapMilestone[];
}> {
	const now = Date.now();

	// Return cached data if valid
	if (experimentsCache && milestonesCache && now - cacheTimestamp < CACHE_TTL_MS) {
		return {
			experiments: experimentsCache,
			milestones: milestonesCache
		};
	}

	// Load experiments.yaml
	const indexPath = '/static/content/validation-roadmap/experiments.yaml';
	const loader = yamlFiles[indexPath];

	if (!loader) {
		console.warn('Roadmap experiments.yaml not found');
		return { experiments: [], milestones: [] };
	}

	try {
		const content = await loader();
		const data = parseExperimentsYaml(content);

		// Update cache
		experimentsCache = data.experiments;
		milestonesCache = data.milestones;
		cacheTimestamp = now;

		return data;
	} catch (error) {
		console.error('Error loading roadmap data:', error);
		return { experiments: [], milestones: [] };
	}
}

/**
 * Fetch all experiments
 */
export async function getExperiments(): Promise<Experiment[]> {
	const { experiments } = await loadData();
	return experiments;
}

/**
 * Fetch experiments by status
 */
export async function getExperimentsByStatus(status: ExperimentStatus): Promise<Experiment[]> {
	const experiments = await getExperiments();
	return experiments.filter((e) => e.status === status);
}

/**
 * Fetch experiments for a specific research question
 */
export async function getExperimentsForRQ(rqId: ResearchQuestionId): Promise<Experiment[]> {
	const experiments = await getExperiments();
	return experiments.filter((e) => e.relatedRQs.includes(rqId));
}

/**
 * Fetch experiments for a specific BOM item
 */
export async function getExperimentsForBOMItem(bomItemId: BOMItemId): Promise<Experiment[]> {
	const experiments = await getExperiments();
	return experiments.filter((e) => e.relatedBOMItems.includes(bomItemId));
}

/**
 * Filter experiments with multiple criteria
 */
export function filterExperiments(
	experiments: Experiment[],
	filters: ExperimentFilters
): Experiment[] {
	let results = experiments;

	if (filters.status) {
		results = results.filter((e) => e.status === filters.status);
	}

	if (filters.year) {
		results = results.filter((e) => e.targetDate.startsWith(filters.year!));
	}

	if (filters.organization) {
		results = results.filter((e) =>
			e.organization.toLowerCase().includes(filters.organization!.toLowerCase())
		);
	}

	if (filters.relatedRQ) {
		results = results.filter((e) => e.relatedRQs.includes(filters.relatedRQ!));
	}

	if (filters.relatedBOMItem) {
		results = results.filter((e) => e.relatedBOMItems.includes(filters.relatedBOMItem!));
	}

	if (filters.tags && filters.tags.length > 0) {
		results = results.filter((e) => filters.tags!.some((tag) => e.tags.includes(tag)));
	}

	if (filters.search) {
		const searchLower = filters.search.toLowerCase();
		results = results.filter(
			(e) =>
				e.name.toLowerCase().includes(searchLower) ||
				e.description.toLowerCase().includes(searchLower) ||
				e.organization.toLowerCase().includes(searchLower) ||
				e.tags.some((tag) => tag.toLowerCase().includes(searchLower))
		);
	}

	return results;
}

/**
 * Get timeline data for visualization
 */
export async function getTimelineData(): Promise<RoadmapTimeline> {
	const { experiments, milestones } = await loadData();

	// Calculate year range
	const years = experiments.map((e) => parseInt(e.targetDate.split('-')[0], 10)).filter((y) => !isNaN(y));
	const milestoneYears = milestones
		.map((m) => parseInt(m.targetDate.split('-')[0], 10))
		.filter((y) => !isNaN(y));
	const allYears = [...years, ...milestoneYears];

	const yearRange = {
		start: allYears.length > 0 ? Math.min(...allYears) : new Date().getFullYear(),
		end: allYears.length > 0 ? Math.max(...allYears) : new Date().getFullYear() + 5
	};

	return {
		experiments,
		milestones,
		yearRange
	};
}

/**
 * Compute roadmap statistics
 */
export function computeRoadmapStats(experiments: Experiment[]): RoadmapStats {
	const stats: RoadmapStats = {
		total: experiments.length,
		byStatus: {
			proposed: 0,
			funded: 0,
			'in-progress': 0,
			completed: 0,
			cancelled: 0
		},
		byYear: {},
		totalEstimatedCost: 0,
		questionsAddressed: 0,
		bomItemsValidated: 0
	};

	const uniqueRQs = new Set<string>();
	const uniqueBOMItems = new Set<string>();

	for (const exp of experiments) {
		stats.byStatus[exp.status]++;
		stats.totalEstimatedCost += exp.estimatedCost;

		const year = exp.targetDate.split('-')[0];
		stats.byYear[year] = (stats.byYear[year] || 0) + 1;

		for (const rq of exp.relatedRQs) {
			uniqueRQs.add(rq);
		}
		for (const bom of exp.relatedBOMItems) {
			uniqueBOMItems.add(bom);
		}
	}

	stats.questionsAddressed = uniqueRQs.size;
	stats.bomItemsValidated = uniqueBOMItems.size;

	return stats;
}

/**
 * Get experiment by ID
 */
export async function getExperimentById(id: string): Promise<Experiment | null> {
	const experiments = await getExperiments();
	return experiments.find((e) => e.id === id) || null;
}

/**
 * Get all unique tags from experiments
 */
export function extractAllTags(experiments: Experiment[]): string[] {
	const tagSet = new Set<string>();
	for (const exp of experiments) {
		for (const tag of exp.tags) {
			tagSet.add(tag);
		}
	}
	return Array.from(tagSet).sort();
}

/**
 * Get all unique organizations
 */
export function extractAllOrganizations(experiments: Experiment[]): string[] {
	const orgSet = new Set<string>();
	for (const exp of experiments) {
		orgSet.add(exp.organization);
	}
	return Array.from(orgSet).sort();
}

/**
 * Get all unique years
 */
export function extractAllYears(experiments: Experiment[]): string[] {
	const yearSet = new Set<string>();
	for (const exp of experiments) {
		const year = exp.targetDate.split('-')[0];
		if (year) yearSet.add(year);
	}
	return Array.from(yearSet).sort();
}

/**
 * Clear cache (for development/testing)
 */
export function clearRoadmapCache(): void {
	experimentsCache = null;
	milestonesCache = null;
	cacheTimestamp = 0;
}
