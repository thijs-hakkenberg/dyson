/**
 * Deliberation Chamber: replay a multi-model discussion in 3D.
 *
 * Models sit on a ring. Each round is a layer stacked upward; in a round a
 * model's response is a beam whose height scales with word count, votes are
 * arcs from voter to target (self-votes are loops), the round winner is
 * crowned, and termination votes mark whether a model wanted to conclude.
 * The conclusion condenses at the centre after the last round.
 */

import type { DiscussionModelId, DiscussionRound, DiscussionThread, VoteValue } from '$lib/types/discussion';
import { DISCUSSION_MODELS } from '$lib/types/discussion';
import type { ModelName } from '$lib/types/divergent-views';
import type { Vec3 } from './registry';
import { modelFamily } from '$lib/services/models';

export const SEAT_RADIUS = 6;
export const ROUND_HEIGHT = 2.4;

export const VOTE_COLORS: Record<VoteValue, string> = {
	APPROVE: '#34d399',
	NEUTRAL: '#fbbf24',
	REJECT: '#f87171'
};
const VOTE_SCORE: Record<VoteValue, number> = { APPROVE: 2, NEUTRAL: 1, REJECT: 0 };

export function familyOf(id: DiscussionModelId): ModelName {
	const f = modelFamily(id);
	return f === 'claude' ? 'Claude' : f === 'gemini' ? 'Gemini' : 'GPT';
}

/** Everyone who spoke in a thread, Claude → Gemini → GPT; the default panel if none yet. */
export function participants(thread: DiscussionThread | null | undefined): DiscussionModelId[] {
	const ids = [...new Set(thread?.rounds.flatMap((r) => r.responses.map((x) => x.modelId)) ?? [])];
	const order = { claude: 0, gemini: 1, gpt: 2, other: 3 };
	return ids.length ? ids.sort((a, b) => order[modelFamily(a)] - order[modelFamily(b)] || a.localeCompare(b)) : [...DISCUSSION_MODELS];
}

export function seatPosition(id: DiscussionModelId, round = 0, seats: DiscussionModelId[] = DISCUSSION_MODELS): Vec3 {
	const k = Math.max(0, seats.indexOf(id));
	const a = (k / seats.length) * Math.PI * 2 - Math.PI / 2;
	return [Math.cos(a) * SEAT_RADIUS, round * ROUND_HEIGHT, Math.sin(a) * SEAT_RADIUS];
}

export interface VoteArc {
	id: string;
	voter: DiscussionModelId;
	target: DiscussionModelId;
	vote: VoteValue;
	reasoning?: string;
	self: boolean;
}

/** Flatten a round's votes (grouped by target in the YAML) into arcs. */
export function roundVotes(round: DiscussionRound): VoteArc[] {
	const out: VoteArc[] = [];
	for (const r of round.votes ?? []) {
		for (const v of r.votes ?? []) {
			out.push({
				id: `${round.roundNumber}:${v.voterId}>${v.targetId}`,
				voter: v.voterId,
				target: v.targetId,
				vote: v.vote,
				reasoning: v.reasoning,
				self: v.voterId === v.targetId
			});
		}
	}
	return out;
}

/** Weighted score per target in a round, recomputed from votes (self-votes weighted). */
export function roundScores(round: DiscussionRound, selfWeight: number): Record<string, number> {
	const scores: Record<string, number> = {};
	for (const a of roundVotes(round)) {
		scores[a.target] = (scores[a.target] ?? 0) + VOTE_SCORE[a.vote] * (a.self ? selfWeight : 1);
	}
	return scores;
}

export interface ChamberSummary {
	slug: string;
	questionId: string;
	title: string;
	phaseId: string;
	rounds: number;
	status: string;
	winners: Partial<Record<DiscussionModelId, number>>;
	termination?: string;
}

export function summarise(t: DiscussionThread): ChamberSummary {
	const winners: Partial<Record<DiscussionModelId, number>> = {};
	for (const r of t.rounds ?? []) if (r.winnerId) winners[r.winnerId] = (winners[r.winnerId] ?? 0) + 1;
	return {
		slug: t.questionSlug,
		questionId: t.questionId,
		title: t.questionTitle,
		phaseId: t.phaseId,
		rounds: t.rounds?.length ?? 0,
		status: t.status,
		winners,
		termination: t.terminationReason
	};
}
