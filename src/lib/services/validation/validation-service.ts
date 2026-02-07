/**
 * Validation Service
 *
 * Provides lookup, filtering, and aggregation functions for validation data.
 * Works with both synchronous data and async fetched data.
 */

import type {
	ValidatedClaim,
	ValidationEntry,
	ValidationStatus,
	ValidationSource,
	ValidationStats,
	ValidationFilters
} from '$lib/types/validation';
import type { BOMItemId, ResearchQuestionId } from '$lib/types/entities';
import yaml from 'js-yaml';

// Use import.meta.glob to load validation YAML file at build time
const validationFiles = import.meta.glob('/src/content/validations/*.yaml', {
	query: '?raw',
	import: 'default',
	eager: false
}) as Record<string, () => Promise<string>>;

/**
 * Cache for loaded validations to avoid redundant fetches
 */
let validationsCache: ValidatedClaim[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60000; // 1 minute cache

/**
 * Parse YAML validation file content
 */
interface ValidationYAML {
	validations: ValidatedClaim[];
}

function parseValidationFile(content: string): ValidatedClaim[] {
	try {
		const data = yaml.load(content) as ValidationYAML;
		return data?.validations || [];
	} catch {
		console.error('Failed to parse validation YAML');
		return [];
	}
}

/**
 * Fetch all validations with caching
 */
export async function fetchAllValidations(): Promise<ValidatedClaim[]> {
	const now = Date.now();

	// Return cached data if still valid
	if (validationsCache && now - cacheTimestamp < CACHE_TTL_MS) {
		return validationsCache;
	}

	const validations: ValidatedClaim[] = [];

	// Load all validation files
	const loadPromises = Object.entries(validationFiles).map(async ([, loader]) => {
		try {
			const content = await loader();
			return parseValidationFile(content);
		} catch {
			return [];
		}
	});

	const results = await Promise.all(loadPromises);
	for (const claims of results) {
		validations.push(...claims);
	}

	// Sort by last updated (most recent first)
	validations.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

	// Update cache
	validationsCache = validations;
	cacheTimestamp = now;

	return validations;
}

/**
 * Get validation status for a specific claim
 */
export async function getValidationStatus(claimId: string): Promise<ValidatedClaim | null> {
	const validations = await fetchAllValidations();
	return validations.find((v) => v.id === claimId) || null;
}

/**
 * Get validation by slug
 */
export async function getValidationBySlug(slug: string): Promise<ValidatedClaim | null> {
	const validations = await fetchAllValidations();
	return validations.find((v) => v.slug === slug) || null;
}

/**
 * Get all validations for a specific BOM item
 */
export async function getValidationsForBOMItem(bomId: BOMItemId): Promise<ValidatedClaim[]> {
	const validations = await fetchAllValidations();
	return validations.filter((v) => v.bomItemId === bomId);
}

/**
 * Get all validations for a specific research question
 */
export async function getValidationsForQuestion(
	questionId: ResearchQuestionId
): Promise<ValidatedClaim[]> {
	const validations = await fetchAllValidations();
	return validations.filter(
		(v) =>
			v.questionId === questionId ||
			v.validations.some((entry) => entry.relatedRQs.includes(questionId))
	);
}

/**
 * Filter validations by status
 */
export function filterByStatus(
	validations: ValidatedClaim[],
	status: ValidationStatus
): ValidatedClaim[] {
	return validations.filter((v) => v.status === status);
}

/**
 * Filter validations by source type
 */
export function filterBySource(
	validations: ValidatedClaim[],
	source: ValidationSource
): ValidatedClaim[] {
	return validations.filter((v) => v.validations.some((entry) => entry.source === source));
}

/**
 * Filter validations with multiple criteria
 */
export function filterValidations(
	validations: ValidatedClaim[],
	filters: ValidationFilters
): ValidatedClaim[] {
	let results = validations;

	if (filters.status) {
		results = results.filter((v) => v.status === filters.status);
	}

	if (filters.source) {
		results = results.filter((v) => v.validations.some((entry) => entry.source === filters.source));
	}

	if (filters.bomItemId) {
		results = results.filter((v) => v.bomItemId === filters.bomItemId);
	}

	if (filters.questionId) {
		results = results.filter(
			(v) =>
				v.questionId === filters.questionId ||
				v.validations.some((entry) => entry.relatedRQs.includes(filters.questionId!))
		);
	}

	if (filters.phaseId) {
		results = results.filter((v) => v.phaseId === filters.phaseId);
	}

	if (filters.minConfidence !== undefined) {
		results = results.filter((v) =>
			v.validations.some((entry) => entry.confidence >= filters.minConfidence!)
		);
	}

	if (filters.tags && filters.tags.length > 0) {
		results = results.filter((v) => filters.tags!.some((tag) => v.tags.includes(tag)));
	}

	if (filters.search) {
		const searchLower = filters.search.toLowerCase();
		results = results.filter(
			(v) =>
				v.claim.toLowerCase().includes(searchLower) ||
				v.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
				v.validations.some(
					(entry) =>
						entry.sourceDetails.toLowerCase().includes(searchLower) ||
						entry.conclusion.toLowerCase().includes(searchLower)
				)
		);
	}

	return results;
}

/**
 * Compute validation statistics from a list of validations
 */
export function computeValidationStats(validations: ValidatedClaim[]): ValidationStats {
	const stats: ValidationStats = {
		total: validations.length,
		byStatus: {
			unvalidated: 0,
			validated: 0,
			'partially-validated': 0,
			refuted: 0,
			outdated: 0
		},
		bySource: {
			experiment: 0,
			simulation: 0,
			'expert-review': 0,
			literature: 0,
			'mission-data': 0
		},
		averageConfidence: 0,
		recentValidations: 0
	};

	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	let totalConfidence = 0;
	let confidenceCount = 0;

	for (const claim of validations) {
		stats.byStatus[claim.status]++;

		// Count sources
		const sourcesInClaim = new Set<ValidationSource>();
		for (const entry of claim.validations) {
			sourcesInClaim.add(entry.source);
			totalConfidence += entry.confidence;
			confidenceCount++;

			// Check if recent
			if (new Date(entry.date) >= thirtyDaysAgo) {
				stats.recentValidations++;
			}
		}
		for (const source of sourcesInClaim) {
			stats.bySource[source]++;
		}
	}

	stats.averageConfidence = confidenceCount > 0 ? Math.round(totalConfidence / confidenceCount) : 0;

	return stats;
}

/**
 * Get recent validations (most recently updated claims)
 */
export async function getRecentValidations(limit: number = 10): Promise<ValidatedClaim[]> {
	const validations = await fetchAllValidations();
	return validations.slice(0, limit);
}

/**
 * Get validations with entries from the last N days
 */
export async function getValidationsFromLastDays(days: number): Promise<ValidatedClaim[]> {
	const validations = await fetchAllValidations();
	const cutoffDate = new Date();
	cutoffDate.setDate(cutoffDate.getDate() - days);

	return validations.filter((v) =>
		v.validations.some((entry) => new Date(entry.date) >= cutoffDate)
	);
}

/**
 * Extract all unique tags from validations
 */
export function extractAllTags(validations: ValidatedClaim[]): string[] {
	const tagSet = new Set<string>();
	for (const claim of validations) {
		for (const tag of claim.tags) {
			tagSet.add(tag);
		}
	}
	return Array.from(tagSet).sort();
}

/**
 * Get the latest validation entry for a claim
 */
export function getLatestValidationEntry(claim: ValidatedClaim): ValidationEntry | null {
	if (claim.validations.length === 0) return null;

	return claim.validations.reduce((latest, entry) =>
		new Date(entry.date) > new Date(latest.date) ? entry : latest
	);
}

/**
 * Clear the validations cache (useful for development/testing)
 */
export function clearValidationsCache(): void {
	validationsCache = null;
	cacheTimestamp = 0;
}
