/**
 * Validation Roadmap Domain Model for Project Dyson
 *
 * This module defines types for experiments and missions that can validate
 * open research questions and BOM item specifications.
 */

import type { BOMItemId, ResearchQuestionId } from './entities';

/**
 * Experiment status indicating the current state
 */
export type ExperimentStatus =
	| 'proposed' // Conceptual, not yet funded
	| 'funded' // Has funding, not started
	| 'in-progress' // Currently active
	| 'completed' // Finished with results
	| 'cancelled'; // No longer planned

/**
 * Experiment/Mission entity
 * Represents a validation experiment or mission that can resolve open questions
 */
export interface Experiment {
	/** Unique identifier for the experiment */
	id: string;

	/** Human-readable name */
	name: string;

	/** Detailed description of the experiment/mission */
	description: string;

	/** Target date for completion or launch (YYYY-MM-DD or YYYY) */
	targetDate: string;

	/** Current status */
	status: ExperimentStatus;

	/** Estimated cost in USD */
	estimatedCost: number;

	/** Organization responsible for the experiment */
	organization: string;

	/** Research questions this experiment can help resolve */
	relatedRQs: ResearchQuestionId[];

	/** BOM items this experiment validates */
	relatedBOMItems: BOMItemId[];

	/** Tags for categorization */
	tags: string[];

	/** Expected outcomes/deliverables */
	expectedOutcomes?: string[];

	/** URL for more information */
	referenceUrl?: string;

	/** Additional notes */
	notes?: string;
}

/**
 * Milestone in the roadmap timeline
 */
export interface RoadmapMilestone {
	/** Unique identifier */
	id: string;

	/** Milestone name */
	name: string;

	/** Target date (YYYY-MM-DD or YYYY) */
	targetDate: string;

	/** Description */
	description: string;

	/** Related experiments */
	relatedExperiments: string[];

	/** Whether this is a critical path milestone */
	criticalPath: boolean;
}

/**
 * Timeline data structure for visualization
 */
export interface RoadmapTimeline {
	/** All experiments */
	experiments: Experiment[];

	/** Key milestones */
	milestones: RoadmapMilestone[];

	/** Year range for display */
	yearRange: {
		start: number;
		end: number;
	};
}

/**
 * Statistics computed from roadmap data
 */
export interface RoadmapStats {
	total: number;
	byStatus: Record<ExperimentStatus, number>;
	byYear: Record<string, number>;
	totalEstimatedCost: number;
	questionsAddressed: number;
	bomItemsValidated: number;
}

/**
 * Filter criteria for experiments
 */
export interface ExperimentFilters {
	status?: ExperimentStatus;
	year?: string;
	organization?: string;
	relatedRQ?: ResearchQuestionId;
	relatedBOMItem?: BOMItemId;
	tags?: string[];
	search?: string;
}

// Type guards
export function isExperimentStatus(value: string): value is ExperimentStatus {
	return ['proposed', 'funded', 'in-progress', 'completed', 'cancelled'].includes(value);
}

// Status display helpers
export const experimentStatusLabels: Record<ExperimentStatus, string> = {
	proposed: 'Proposed',
	funded: 'Funded',
	'in-progress': 'In Progress',
	completed: 'Completed',
	cancelled: 'Cancelled'
};

export const experimentStatusColors: Record<ExperimentStatus, string> = {
	proposed: 'bg-space-600 text-star-dim',
	funded: 'bg-cosmic-blue/20 text-cosmic-cyan',
	'in-progress': 'bg-purple-500/20 text-purple-400',
	completed: 'bg-green-500/20 text-green-400',
	cancelled: 'bg-red-500/20 text-red-400'
};

export const experimentStatusIcons: Record<ExperimentStatus, string> = {
	proposed: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
	funded: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
	'in-progress': 'M13 10V3L4 14h7v7l9-11h-7z',
	completed: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
	cancelled: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
};
