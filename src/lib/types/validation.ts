/**
 * Validation Domain Model for Project Dyson
 *
 * This module defines types for tracking validation status of LLM predictions
 * and specifications against real data, experiments, or expert review.
 */

import type { BOMItemId, ResearchQuestionId } from './entities';

/**
 * Validation status indicating the current state of a claim
 */
export type ValidationStatus =
	| 'unvalidated' // Not yet tested against real data
	| 'validated' // Confirmed by evidence
	| 'partially-validated' // Some aspects confirmed, others uncertain
	| 'refuted' // Contradicted by evidence
	| 'outdated'; // Was validated but new data may change conclusion

/**
 * Source type indicating how validation was performed
 */
export type ValidationSource =
	| 'experiment' // Physical testing or demonstration
	| 'simulation' // Computational modeling/analysis
	| 'expert-review' // Review by domain experts
	| 'literature' // Published research or documentation
	| 'mission-data'; // Data from actual space missions

/**
 * A single validation entry representing one validation event
 */
export interface ValidationEntry {
	/** Unique identifier for this validation entry */
	id: string;

	/** Date the validation was performed or recorded */
	date: string;

	/** Source type of the validation */
	source: ValidationSource;

	/** Details about the validation source (e.g., paper title, mission name) */
	sourceDetails: string;

	/** The conclusion drawn from this validation */
	conclusion: string;

	/** Confidence level from 0-100 */
	confidence: number;

	/** Related research questions that this validation informs */
	relatedRQs: ResearchQuestionId[];

	/** Optional URL to source document or data */
	sourceUrl?: string;

	/** Who performed or recorded this validation */
	validator?: string;

	/** Additional notes */
	notes?: string;
}

/**
 * A validated claim representing a specific LLM prediction or specification
 */
export interface ValidatedClaim {
	/** Unique identifier for the claim */
	id: string;

	/** Human-readable identifier/slug for URLs */
	slug: string;

	/** The specific claim or prediction being tracked */
	claim: string;

	/** Optional BOM item this claim relates to */
	bomItemId?: BOMItemId;

	/** Optional research question this claim relates to */
	questionId?: ResearchQuestionId;

	/** Current validation status */
	status: ValidationStatus;

	/** All validation entries for this claim */
	validations: ValidationEntry[];

	/** When this claim record was last updated */
	lastUpdated: string;

	/** Phase this claim relates to */
	phaseId?: string;

	/** Tags for categorization */
	tags: string[];

	/** The original source of the claim (which LLM, consensus doc, etc.) */
	claimSource: string;
}

/**
 * Statistics computed from validation data
 */
export interface ValidationStats {
	total: number;
	byStatus: Record<ValidationStatus, number>;
	bySource: Record<ValidationSource, number>;
	averageConfidence: number;
	recentValidations: number; // Last 30 days
}

/**
 * Filter criteria for validations
 */
export interface ValidationFilters {
	status?: ValidationStatus;
	source?: ValidationSource;
	bomItemId?: BOMItemId;
	questionId?: ResearchQuestionId;
	phaseId?: string;
	minConfidence?: number;
	tags?: string[];
	search?: string;
}

// Type guards
export function isValidationStatus(value: string): value is ValidationStatus {
	return ['unvalidated', 'validated', 'partially-validated', 'refuted', 'outdated'].includes(value);
}

export function isValidationSource(value: string): value is ValidationSource {
	return ['experiment', 'simulation', 'expert-review', 'literature', 'mission-data'].includes(
		value
	);
}

// Status display helpers
export const validationStatusLabels: Record<ValidationStatus, string> = {
	unvalidated: 'Unvalidated',
	validated: 'Validated',
	'partially-validated': 'Partially Validated',
	refuted: 'Refuted',
	outdated: 'Outdated'
};

export const validationStatusColors: Record<ValidationStatus, string> = {
	unvalidated: 'bg-space-600 text-star-dim',
	validated: 'bg-green-500/20 text-green-400',
	'partially-validated': 'bg-yellow-500/20 text-yellow-400',
	refuted: 'bg-red-500/20 text-red-400',
	outdated: 'bg-orange-500/20 text-orange-400'
};

export const validationSourceLabels: Record<ValidationSource, string> = {
	experiment: 'Experiment',
	simulation: 'Simulation',
	'expert-review': 'Expert Review',
	literature: 'Literature',
	'mission-data': 'Mission Data'
};

export const validationSourceIcons: Record<ValidationSource, string> = {
	experiment: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
	simulation: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
	'expert-review': 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
	literature: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
	'mission-data': 'M13 10V3L4 14h7v7l9-11h-7z'
};
