/**
 * Discussion Service
 *
 * Provides query, filter, and aggregation functions for discussion threads.
 */

import type {
	DiscussionThread,
	DiscussionThreadSummary,
	DiscussionStats,
	DiscussionModelId,
	TerminationReason
} from '$lib/types/discussion';
import type { PhaseId, QuestionSlug } from '$lib/types/entities';
import {
	fetchAllDiscussions,
	fetchDiscussion,
	fetchDiscussionSummaries,
	fetchDiscussionsForPhase,
	hasDiscussion
} from './discussion-fetchers';

// Re-export fetchers for convenience
export {
	fetchDiscussion,
	fetchAllDiscussions,
	fetchDiscussionSummaries,
	fetchDiscussionsForPhase,
	hasDiscussion
};

/**
 * Filter criteria for discussions
 */
export interface DiscussionFilters {
	status?: 'active' | 'concluded';
	phaseId?: PhaseId;
	terminationReason?: TerminationReason;
	minRounds?: number;
	maxRounds?: number;
	search?: string;
}

/**
 * Aggregate statistics across all discussions
 */
export interface AggregateDiscussionStats {
	totalDiscussions: number;
	activeDiscussions: number;
	concludedDiscussions: number;
	totalRounds: number;
	averageRoundsPerDiscussion: number;
	byPhase: Record<PhaseId, number>;
	byTerminationReason: Record<TerminationReason, number>;
	modelWinRates: Record<DiscussionModelId, number>;
}

/**
 * Filter discussions by multiple criteria
 */
export function filterDiscussions(
	discussions: DiscussionThread[],
	filters: DiscussionFilters
): DiscussionThread[] {
	let results = discussions;

	if (filters.status) {
		results = results.filter((d) => d.status === filters.status);
	}

	if (filters.phaseId) {
		results = results.filter((d) => d.phaseId === filters.phaseId);
	}

	if (filters.terminationReason) {
		results = results.filter((d) => d.terminationReason === filters.terminationReason);
	}

	if (filters.minRounds !== undefined) {
		results = results.filter((d) => (d.rounds?.length || 0) >= filters.minRounds!);
	}

	if (filters.maxRounds !== undefined) {
		results = results.filter((d) => (d.rounds?.length || 0) <= filters.maxRounds!);
	}

	if (filters.search) {
		const searchLower = filters.search.toLowerCase();
		results = results.filter(
			(d) =>
				d.questionTitle.toLowerCase().includes(searchLower) ||
				d.questionSlug.includes(searchLower)
		);
	}

	return results;
}

/**
 * Compute aggregate statistics across all discussions
 */
export async function computeAggregateStats(): Promise<AggregateDiscussionStats> {
	const discussions = await fetchAllDiscussions();

	const stats: AggregateDiscussionStats = {
		totalDiscussions: discussions.length,
		activeDiscussions: 0,
		concludedDiscussions: 0,
		totalRounds: 0,
		averageRoundsPerDiscussion: 0,
		byPhase: {} as Record<PhaseId, number>,
		byTerminationReason: {} as Record<TerminationReason, number>,
		modelWinRates: {
			'claude-opus-4-6': 0,
			'gemini-3-pro': 0,
			'gpt-5-2': 0
		}
	};

	let totalModelWins = 0;

	for (const discussion of discussions) {
		// Status counts
		if (discussion.status === 'active') {
			stats.activeDiscussions++;
		} else {
			stats.concludedDiscussions++;
		}

		// Round counts
		const roundCount = discussion.rounds?.length || 0;
		stats.totalRounds += roundCount;

		// Phase counts
		if (discussion.phaseId) {
			stats.byPhase[discussion.phaseId] = (stats.byPhase[discussion.phaseId] || 0) + 1;
		}

		// Termination reason counts
		if (discussion.terminationReason) {
			stats.byTerminationReason[discussion.terminationReason] =
				(stats.byTerminationReason[discussion.terminationReason] || 0) + 1;
		}

		// Model win counts
		if (discussion.stats?.roundWinners) {
			for (const [modelId, wins] of Object.entries(discussion.stats.roundWinners)) {
				stats.modelWinRates[modelId as DiscussionModelId] += wins;
				totalModelWins += wins;
			}
		}
	}

	// Calculate averages
	stats.averageRoundsPerDiscussion =
		discussions.length > 0 ? stats.totalRounds / discussions.length : 0;

	// Convert win counts to rates
	if (totalModelWins > 0) {
		for (const modelId of Object.keys(stats.modelWinRates) as DiscussionModelId[]) {
			stats.modelWinRates[modelId] = (stats.modelWinRates[modelId] / totalModelWins) * 100;
		}
	}

	return stats;
}

/**
 * Get the most recent discussions
 */
export async function getRecentDiscussions(limit: number = 5): Promise<DiscussionThread[]> {
	const discussions = await fetchAllDiscussions();
	return discussions.slice(0, limit);
}

/**
 * Get active discussions that need continuation
 */
export async function getActiveDiscussions(): Promise<DiscussionThread[]> {
	const discussions = await fetchAllDiscussions();
	return discussions.filter((d) => d.status === 'active');
}

/**
 * Get discussions by termination reason
 */
export async function getDiscussionsByTermination(
	reason: TerminationReason
): Promise<DiscussionThread[]> {
	const discussions = await fetchAllDiscussions();
	return discussions.filter((d) => d.terminationReason === reason);
}

/**
 * Get the winning model across all discussions
 */
export async function getOverallWinningModel(): Promise<{
	modelId: DiscussionModelId;
	winRate: number;
} | null> {
	const stats = await computeAggregateStats();

	const entries = Object.entries(stats.modelWinRates) as [DiscussionModelId, number][];
	if (entries.length === 0) return null;

	const [topModel, topRate] = entries.reduce((best, current) =>
		current[1] > best[1] ? current : best
	);

	return { modelId: topModel, winRate: topRate };
}

/**
 * Check if a discussion exists and return its status
 */
export async function getDiscussionStatus(
	slug: QuestionSlug
): Promise<{ exists: boolean; status?: 'active' | 'concluded'; roundCount?: number }> {
	const exists = await hasDiscussion(slug);

	if (!exists) {
		return { exists: false };
	}

	const discussion = await fetchDiscussion(slug);

	return {
		exists: true,
		status: discussion?.status,
		roundCount: discussion?.rounds?.length || 0
	};
}

/**
 * Get discussions that reached consensus vs those that timed out
 */
export async function getDiscussionOutcomes(): Promise<{
	consensusReached: DiscussionThread[];
	timedOut: DiscussionThread[];
	stillActive: DiscussionThread[];
}> {
	const discussions = await fetchAllDiscussions();

	const consensusReasons: TerminationReason[] = ['unanimous-conclude', 'convergence'];
	const timeoutReasons: TerminationReason[] = ['max-rounds', 'consecutive-conclude'];

	return {
		consensusReached: discussions.filter(
			(d) => d.terminationReason && consensusReasons.includes(d.terminationReason)
		),
		timedOut: discussions.filter(
			(d) => d.terminationReason && timeoutReasons.includes(d.terminationReason)
		),
		stillActive: discussions.filter((d) => d.status === 'active')
	};
}
