/**
 * Questions Service
 *
 * Provides lookup, filtering, and aggregation functions for research questions.
 * Works with both synchronous data and async fetched data.
 */

import type {
	ResearchQuestion,
	ResearchQuestionId,
	PhaseId,
	BOMItemId,
	QuestionType,
	ResearchQuestionStatus,
	Priority
} from '$lib/types/entities';

/**
 * Filter criteria for questions
 */
export interface QuestionFilters {
	phaseId?: PhaseId;
	questionType?: QuestionType;
	status?: ResearchQuestionStatus;
	priority?: Priority;
	bomItemId?: BOMItemId;
	bomItemSlug?: string;
	tags?: string[];
	search?: string;
}

/**
 * Question statistics
 */
export interface QuestionStats {
	total: number;
	byStatus: Record<ResearchQuestionStatus, number>;
	byType: Record<QuestionType, number>;
	byPriority: Record<Priority, number>;
	byPhase: Record<string, number>;
}

/**
 * Filter questions with multiple criteria
 * Works on an array of questions passed in (from fetcher)
 */
export function filterQuestions(
	questions: ResearchQuestion[],
	filters: QuestionFilters
): ResearchQuestion[] {
	let results = questions;

	if (filters.phaseId) {
		results = results.filter((q) => q.sourcePhaseId === filters.phaseId);
	}

	if (filters.questionType) {
		results = results.filter((q) => q.questionType === filters.questionType);
	}

	if (filters.status) {
		results = results.filter((q) => q.status === filters.status);
	}

	if (filters.priority) {
		results = results.filter((q) => q.priority === filters.priority);
	}

	if (filters.bomItemId) {
		results = results.filter(
			(q) =>
				q.sourceBOMItemId === filters.bomItemId ||
				q.relatedBOMItems.includes(filters.bomItemId!)
		);
	}

	if (filters.bomItemSlug) {
		results = results.filter((q) => q.sourceBOMItemSlug === filters.bomItemSlug);
	}

	if (filters.tags && filters.tags.length > 0) {
		results = results.filter((q) => filters.tags!.some((tag) => q.tags.includes(tag)));
	}

	if (filters.search) {
		const searchLower = filters.search.toLowerCase();
		results = results.filter(
			(q) =>
				q.title.toLowerCase().includes(searchLower) ||
				q.description.toLowerCase().includes(searchLower) ||
				q.tags.some((tag) => tag.toLowerCase().includes(searchLower))
		);
	}

	return results;
}

/**
 * Compute question statistics from a list of questions
 */
export function computeQuestionStats(questions: ResearchQuestion[]): QuestionStats {
	const stats: QuestionStats = {
		total: questions.length,
		byStatus: {
			open: 0,
			investigating: 0,
			answered: 0,
			deferred: 0
		},
		byType: {
			'meta-research': 0,
			experimentation: 0,
			simulation: 0,
			'engineering-decision': 0,
			discussion: 0,
			analysis: 0
		},
		byPriority: {
			critical: 0,
			high: 0,
			medium: 0,
			low: 0
		},
		byPhase: {
			'phase-0': 0,
			'phase-1': 0,
			'phase-2': 0,
			'phase-3a': 0,
			'phase-3b': 0
		}
	};

	for (const question of questions) {
		stats.byStatus[question.status]++;
		stats.byType[question.questionType]++;
		stats.byPriority[question.priority]++;
		stats.byPhase[question.sourcePhaseId]++;
	}

	return stats;
}

/**
 * Get all unique tags from a list of questions
 */
export function extractAllTags(questions: ResearchQuestion[]): string[] {
	const tagSet = new Set<string>();
	for (const question of questions) {
		for (const tag of question.tags) {
			tagSet.add(tag);
		}
	}
	return Array.from(tagSet).sort();
}

/**
 * Get questions by tag from a list
 */
export function filterQuestionsByTag(questions: ResearchQuestion[], tag: string): ResearchQuestion[] {
	return questions.filter((q) => q.tags.includes(tag));
}

/**
 * Get critical questions from a list
 */
export function filterCriticalQuestions(questions: ResearchQuestion[]): ResearchQuestion[] {
	return questions.filter((q) => q.priority === 'critical');
}

/**
 * Get open questions from a list
 */
export function filterOpenQuestions(questions: ResearchQuestion[]): ResearchQuestion[] {
	return questions.filter((q) => q.status === 'open');
}

/**
 * Get questions for a specific phase from a list
 */
export function filterQuestionsByPhase(
	questions: ResearchQuestion[],
	phaseId: PhaseId
): ResearchQuestion[] {
	return questions.filter((q) => q.sourcePhaseId === phaseId);
}

/**
 * Get questions for a specific BOM item from a list
 */
export function filterQuestionsByBOMItem(
	questions: ResearchQuestion[],
	bomItemId: BOMItemId
): ResearchQuestion[] {
	return questions.filter(
		(q) => q.sourceBOMItemId === bomItemId || q.relatedBOMItems.includes(bomItemId)
	);
}

/**
 * Get questions for a specific BOM item slug from a list
 */
export function filterQuestionsByBOMItemSlug(
	questions: ResearchQuestion[],
	slug: string
): ResearchQuestion[] {
	return questions.filter((q) => q.sourceBOMItemSlug === slug);
}

/**
 * Get question by slug from a list
 */
export function findQuestionBySlug(
	questions: ResearchQuestion[],
	slug: string
): ResearchQuestion | undefined {
	return questions.find((q) => q.slug === slug);
}

/**
 * Get question by ID from a list
 */
export function findQuestionById(
	questions: ResearchQuestion[],
	id: ResearchQuestionId
): ResearchQuestion | undefined {
	return questions.find((q) => q.id === id);
}
