/**
 * Discussion System Types
 *
 * Types for multi-model LLM discussions where Claude, Gemini, and GPT
 * collaboratively respond to research questions, vote on responses,
 * and iterate until consensus or termination.
 */

import type { ResearchQuestionId, QuestionSlug, PhaseId } from './entities';

// Model identifiers for discussions
export type DiscussionModelId = 'claude-opus-4-6' | 'gemini-3-pro' | 'gpt-5-2';

export const DISCUSSION_MODELS: DiscussionModelId[] = ['claude-opus-4-6', 'gemini-3-pro', 'gpt-5-2'];

export const MODEL_DISPLAY_NAMES: Record<DiscussionModelId, string> = {
	'claude-opus-4-6': 'Claude Opus 4.6',
	'gemini-3-pro': 'Gemini 3 Pro',
	'gpt-5-2': 'GPT-5.2'
};

// Vote types
export type VoteValue = 'APPROVE' | 'NEUTRAL' | 'REJECT';
export type TerminationVote = 'CONCLUDE' | 'CONTINUE';

// Termination reasons
export type TerminationReason =
	| 'unanimous-conclude' // All 3 models voted to conclude
	| 'consecutive-conclude' // 2+ models voted conclude for N consecutive rounds
	| 'max-rounds' // Hit maxRounds limit
	| 'convergence' // Same model won 3 rounds with high scores
	| 'forced'; // Manually forced with --conclude flag

/**
 * Configuration for a discussion session
 */
export interface DiscussionConfig {
	maxRounds: number; // Hard stop on discussion length (default: 5)
	maxResponseWords: number; // Per-response word limit (default: 2000)
	allowSelfVoting: boolean; // Models can vote on own responses (default: true)
	selfVoteWeight: number; // Self-votes count this fraction (default: 0.5)
	unanimousTermination: boolean; // Require all 3 to agree to conclude (default: true)
	consecutiveConcludeRounds: number; // Alt: 2+ models vote conclude for N rounds (default: 2)
}

export const DEFAULT_DISCUSSION_CONFIG: DiscussionConfig = {
	maxRounds: 5,
	maxResponseWords: 2000,
	allowSelfVoting: true,
	selfVoteWeight: 0.5,
	unanimousTermination: true,
	consecutiveConcludeRounds: 2
};

/**
 * A single model's response in a discussion round
 */
export interface DiscussionResponse {
	modelId: DiscussionModelId;
	content: string;
	wordCount: number;
	generatedAt: string; // ISO date string
}

/**
 * A vote from one model on another's response
 */
export interface DiscussionVote {
	voterId: DiscussionModelId; // Model casting the vote
	targetId: DiscussionModelId; // Model whose response is being voted on
	vote: VoteValue;
	reasoning?: string; // Optional brief explanation
}

/**
 * Voting results for a single response
 */
export interface ResponseVoteResults {
	targetId: DiscussionModelId;
	votes: DiscussionVote[];
	rawScore: number; // Sum of vote scores (APPROVE=2, NEUTRAL=1, REJECT=0)
	weightedScore: number; // After applying self-vote weight
	approveCount: number;
	rejectCount: number;
}

/**
 * Termination vote from a model
 */
export interface TerminationVoteEntry {
	modelId: DiscussionModelId;
	vote: TerminationVote;
	reasoning?: string;
}

/**
 * A single round in a discussion
 */
export interface DiscussionRound {
	roundNumber: number;
	responses: DiscussionResponse[];
	votes: ResponseVoteResults[];
	winnerId: DiscussionModelId;
	winnerScore: number;
	terminationVotes: TerminationVoteEntry[];
	shouldTerminate: boolean;
	terminationReason?: TerminationReason;
	completedAt: string; // ISO date string
}

/**
 * Final conclusion of a discussion
 */
export interface DiscussionConclusion {
	summary: string; // Synthesized conclusion from all rounds
	keyPoints: string[]; // Main points of agreement
	unresolvedQuestions: string[]; // Questions that remain open
	recommendedActions: string[]; // Suggested next steps
	generatedBy: DiscussionModelId; // Model that generated the conclusion
	generatedAt: string; // ISO date string
}

/**
 * Thread-level statistics
 */
export interface DiscussionStats {
	totalRounds: number;
	roundWinners: Record<DiscussionModelId, number>; // Count of rounds won by each model
	totalVotes: number;
	approvalRate: number; // Percentage of APPROVE votes
	averageResponseWords: number;
}

/**
 * Full discussion thread metadata
 */
export interface DiscussionThread {
	questionId: ResearchQuestionId;
	questionSlug: QuestionSlug;
	questionTitle: string;
	phaseId: PhaseId;

	// Configuration used for this discussion
	config: DiscussionConfig;

	// Thread state
	status: 'active' | 'concluded';
	startedAt: string; // ISO date string
	concludedAt?: string; // ISO date string

	// Rounds data
	rounds: DiscussionRound[];
	currentRound: number;

	// Conclusion (only if status === 'concluded')
	conclusion?: DiscussionConclusion;

	// Computed stats
	stats: DiscussionStats;

	// Termination info
	terminationReason?: TerminationReason;
}

/**
 * Lightweight thread reference for listings
 */
export interface DiscussionThreadSummary {
	questionId: ResearchQuestionId;
	questionSlug: QuestionSlug;
	questionTitle: string;
	phaseId: PhaseId;
	status: 'active' | 'concluded';
	roundCount: number;
	lastUpdated: string;
	terminationReason?: TerminationReason;
}

/**
 * Vote scoring constants
 */
export const VOTE_SCORES: Record<VoteValue, number> = {
	APPROVE: 2,
	NEUTRAL: 1,
	REJECT: 0
};

/**
 * Calculate weighted score for a vote
 */
export function calculateVoteScore(
	vote: DiscussionVote,
	config: DiscussionConfig = DEFAULT_DISCUSSION_CONFIG
): number {
	const baseScore = VOTE_SCORES[vote.vote];
	const isSelfVote = vote.voterId === vote.targetId;

	if (isSelfVote && config.allowSelfVoting) {
		return baseScore * config.selfVoteWeight;
	} else if (isSelfVote && !config.allowSelfVoting) {
		return 0;
	}

	return baseScore;
}

/**
 * Calculate total weighted score for a response
 */
export function calculateResponseScore(
	votes: DiscussionVote[],
	targetId: DiscussionModelId,
	config: DiscussionConfig = DEFAULT_DISCUSSION_CONFIG
): ResponseVoteResults {
	const targetVotes = votes.filter((v) => v.targetId === targetId);

	let rawScore = 0;
	let weightedScore = 0;
	let approveCount = 0;
	let rejectCount = 0;

	for (const vote of targetVotes) {
		rawScore += VOTE_SCORES[vote.vote];
		weightedScore += calculateVoteScore(vote, config);

		if (vote.vote === 'APPROVE') approveCount++;
		if (vote.vote === 'REJECT') rejectCount++;
	}

	return {
		targetId,
		votes: targetVotes,
		rawScore,
		weightedScore,
		approveCount,
		rejectCount
	};
}

/**
 * Determine winner from vote results with tie-breaking
 * Tie-breaker: most APPROVE votes from others
 */
export function determineWinner(voteResults: ResponseVoteResults[]): DiscussionModelId {
	const sorted = [...voteResults].sort((a, b) => {
		// Primary: highest weighted score
		if (b.weightedScore !== a.weightedScore) {
			return b.weightedScore - a.weightedScore;
		}
		// Tie-breaker: most approve votes
		return b.approveCount - a.approveCount;
	});

	return sorted[0].targetId;
}

/**
 * Check if discussion should terminate based on termination votes
 */
export function checkTermination(
	currentRound: DiscussionRound,
	previousRounds: DiscussionRound[],
	config: DiscussionConfig = DEFAULT_DISCUSSION_CONFIG
): { shouldTerminate: boolean; reason?: TerminationReason } {
	const concludeVotes = currentRound.terminationVotes.filter((v) => v.vote === 'CONCLUDE');
	const concludeCount = concludeVotes.length;

	// Check unanimous termination
	if (config.unanimousTermination && concludeCount === 3) {
		return { shouldTerminate: true, reason: 'unanimous-conclude' };
	}

	// Check consecutive conclude (2+ models for N consecutive rounds)
	if (concludeCount >= 2) {
		const recentRounds = [...previousRounds.slice(-config.consecutiveConcludeRounds + 1), currentRound];

		if (recentRounds.length >= config.consecutiveConcludeRounds) {
			const allHaveMajority = recentRounds.every(
				(r) => r.terminationVotes.filter((v) => v.vote === 'CONCLUDE').length >= 2
			);

			if (allHaveMajority) {
				return { shouldTerminate: true, reason: 'consecutive-conclude' };
			}
		}
	}

	// Check max rounds
	if (currentRound.roundNumber >= config.maxRounds) {
		return { shouldTerminate: true, reason: 'max-rounds' };
	}

	// Check convergence (same model wins 3+ rounds with high scores)
	if (previousRounds.length >= 2) {
		const lastThreeWinners = [...previousRounds.slice(-2), currentRound].map((r) => r.winnerId);
		const allSameWinner = lastThreeWinners.every((w) => w === currentRound.winnerId);
		const highScore = currentRound.winnerScore >= 5; // At least 5 weighted score

		if (allSameWinner && highScore) {
			return { shouldTerminate: true, reason: 'convergence' };
		}
	}

	return { shouldTerminate: false };
}

/**
 * Compute discussion statistics
 */
export function computeDiscussionStats(rounds: DiscussionRound[]): DiscussionStats {
	const roundWinners: Record<DiscussionModelId, number> = {
		'claude-opus-4-6': 0,
		'gemini-3-pro': 0,
		'gpt-5-2': 0
	};

	let totalVotes = 0;
	let approveVotes = 0;
	let totalWords = 0;
	let responseCount = 0;

	for (const round of rounds) {
		roundWinners[round.winnerId]++;

		for (const voteResult of round.votes) {
			for (const vote of voteResult.votes) {
				totalVotes++;
				if (vote.vote === 'APPROVE') approveVotes++;
			}
		}

		for (const response of round.responses) {
			totalWords += response.wordCount;
			responseCount++;
		}
	}

	return {
		totalRounds: rounds.length,
		roundWinners,
		totalVotes,
		approvalRate: totalVotes > 0 ? (approveVotes / totalVotes) * 100 : 0,
		averageResponseWords: responseCount > 0 ? Math.round(totalWords / responseCount) : 0
	};
}
