/**
 * Resolution Service
 *
 * Provides functions for tracking and analyzing resolution status of research questions.
 * Includes resolution history, implications tracking, and statistics computation.
 */

import type {
	ResearchQuestion,
	ResearchQuestionId,
	PhaseId,
	ResolutionStatus,
	ResolutionSourceType
} from '$lib/types/entities';

/**
 * Resolution event for timeline tracking
 */
export interface ResolutionEvent {
	questionId: ResearchQuestionId;
	questionTitle: string;
	questionSlug: string;
	resolutionStatus: ResolutionStatus;
	resolutionDate: string;
	resolutionSource: ResolutionSourceType;
	resolutionSummary: string;
	phaseId: PhaseId;
}

/**
 * Implication for a resolved question
 */
export interface Implication {
	questionId: ResearchQuestionId;
	questionTitle: string;
	questionSlug: string;
	implication: string;
	affectedBOMItems: string[];
	affectedQuestions: ResearchQuestionId[];
}

/**
 * Resolution statistics
 */
export interface ResolutionStats {
	total: number;
	resolved: number;
	open: number;
	partiallyResolved: number;
	superseded: number;
	bySource: Record<ResolutionSourceType, number>;
	byPhase: Record<string, { total: number; resolved: number; open: number }>;
}

/**
 * Get all resolved questions from a list
 * @param questions Array of research questions
 * @param phaseId Optional filter by phase
 */
export function getResolvedQuestions(
	questions: ResearchQuestion[],
	phaseId?: PhaseId
): ResearchQuestion[] {
	let filtered = questions.filter(
		(q) => q.resolutionStatus === 'resolved' || q.resolutionStatus === 'partially-resolved'
	);

	if (phaseId) {
		filtered = filtered.filter((q) => q.sourcePhaseId === phaseId);
	}

	// Sort by resolution date (most recent first)
	return filtered.sort((a, b) => {
		const dateA = a.resolutionDate || '0000-00-00';
		const dateB = b.resolutionDate || '0000-00-00';
		return dateB.localeCompare(dateA);
	});
}

/**
 * Get all open questions from a list
 * @param questions Array of research questions
 * @param phaseId Optional filter by phase
 */
export function getOpenQuestions(
	questions: ResearchQuestion[],
	phaseId?: PhaseId
): ResearchQuestion[] {
	let filtered = questions.filter(
		(q) => !q.resolutionStatus || q.resolutionStatus === 'open'
	);

	if (phaseId) {
		filtered = filtered.filter((q) => q.sourcePhaseId === phaseId);
	}

	return filtered;
}

/**
 * Get resolution history as a timeline of events
 * @param questions Array of research questions
 */
export function getResolutionHistory(questions: ResearchQuestion[]): ResolutionEvent[] {
	const events: ResolutionEvent[] = [];

	for (const q of questions) {
		if (q.resolutionStatus && q.resolutionStatus !== 'open' && q.resolutionDate) {
			events.push({
				questionId: q.id,
				questionTitle: q.title,
				questionSlug: q.slug,
				resolutionStatus: q.resolutionStatus,
				resolutionDate: q.resolutionDate,
				resolutionSource: q.resolutionSource || 'consensus',
				resolutionSummary: q.resolutionSummary || '',
				phaseId: q.sourcePhaseId
			});
		}
	}

	// Sort by date (most recent first)
	return events.sort((a, b) => b.resolutionDate.localeCompare(a.resolutionDate));
}

/**
 * Get implications for a specific resolved question
 * @param questions Array of research questions
 * @param questionId The question ID to get implications for
 */
export function getImplicationsForResolution(
	questions: ResearchQuestion[],
	questionId: ResearchQuestionId
): Implication[] {
	const question = questions.find((q) => q.id === questionId);
	if (!question || !question.implications || question.implications.length === 0) {
		return [];
	}

	return question.implications.map((impl) => ({
		questionId: question.id,
		questionTitle: question.title,
		questionSlug: question.slug,
		implication: impl,
		affectedBOMItems: question.relatedBOMItems.map(String),
		affectedQuestions: question.relatedQuestionIds
	}));
}

/**
 * Compute resolution statistics from a list of questions
 * @param questions Array of research questions
 */
export function computeResolutionStats(questions: ResearchQuestion[]): ResolutionStats {
	const stats: ResolutionStats = {
		total: questions.length,
		resolved: 0,
		open: 0,
		partiallyResolved: 0,
		superseded: 0,
		bySource: {
			paper: 0,
			experiment: 0,
			expert: 0,
			simulation: 0,
			'industry-data': 0,
			consensus: 0
		},
		byPhase: {
			'phase-0': { total: 0, resolved: 0, open: 0 },
			'phase-1': { total: 0, resolved: 0, open: 0 },
			'phase-2': { total: 0, resolved: 0, open: 0 }
		}
	};

	for (const q of questions) {
		// Count by resolution status
		const status = q.resolutionStatus || 'open';
		switch (status) {
			case 'resolved':
				stats.resolved++;
				break;
			case 'partially-resolved':
				stats.partiallyResolved++;
				break;
			case 'superseded':
				stats.superseded++;
				break;
			default:
				stats.open++;
		}

		// Count by source (only for resolved questions)
		if (q.resolutionSource && status !== 'open') {
			stats.bySource[q.resolutionSource]++;
		}

		// Count by phase
		const phase = q.sourcePhaseId;
		if (stats.byPhase[phase]) {
			stats.byPhase[phase].total++;
			if (status === 'resolved' || status === 'partially-resolved') {
				stats.byPhase[phase].resolved++;
			} else {
				stats.byPhase[phase].open++;
			}
		}
	}

	return stats;
}

/**
 * Filter questions by resolution status
 * @param questions Array of research questions
 * @param status Resolution status to filter by
 */
export function filterByResolutionStatus(
	questions: ResearchQuestion[],
	status: ResolutionStatus
): ResearchQuestion[] {
	if (status === 'open') {
		return questions.filter((q) => !q.resolutionStatus || q.resolutionStatus === 'open');
	}
	return questions.filter((q) => q.resolutionStatus === status);
}

/**
 * Filter questions by resolution source
 * @param questions Array of research questions
 * @param source Resolution source to filter by
 */
export function filterByResolutionSource(
	questions: ResearchQuestion[],
	source: ResolutionSourceType
): ResearchQuestion[] {
	return questions.filter((q) => q.resolutionSource === source);
}

/**
 * Get questions resolved within a date range
 * @param questions Array of research questions
 * @param startDate Start date (inclusive)
 * @param endDate End date (inclusive)
 */
export function getQuestionsResolvedInRange(
	questions: ResearchQuestion[],
	startDate: string,
	endDate: string
): ResearchQuestion[] {
	return questions.filter((q) => {
		if (!q.resolutionDate) return false;
		return q.resolutionDate >= startDate && q.resolutionDate <= endDate;
	});
}

/**
 * Get all implications from resolved questions
 * @param questions Array of research questions
 */
export function getAllImplications(questions: ResearchQuestion[]): Implication[] {
	const implications: Implication[] = [];

	for (const q of questions) {
		if (q.implications && q.implications.length > 0) {
			for (const impl of q.implications) {
				implications.push({
					questionId: q.id,
					questionTitle: q.title,
					questionSlug: q.slug,
					implication: impl,
					affectedBOMItems: q.relatedBOMItems.map(String),
					affectedQuestions: q.relatedQuestionIds
				});
			}
		}
	}

	return implications;
}
