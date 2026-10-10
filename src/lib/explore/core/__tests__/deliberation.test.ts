import { describe, expect, it } from 'vitest';
import { familyOf, roundScores, roundVotes, seatPosition, summarise, SEAT_RADIUS, ROUND_HEIGHT } from '../deliberation';
import type { DiscussionRound, DiscussionThread } from '$lib/types/discussion';

const round = {
	roundNumber: 2,
	responses: [],
	votes: [
		{
			targetId: 'gpt-5-2',
			votes: [
				{ voterId: 'gpt-5-2', targetId: 'gpt-5-2', vote: 'APPROVE' },
				{ voterId: 'gemini-3-pro', targetId: 'gpt-5-2', vote: 'REJECT' }
			]
		},
		{ targetId: 'claude-opus-4-6', votes: [{ voterId: 'gpt-5-2', targetId: 'claude-opus-4-6', vote: 'NEUTRAL' }] }
	],
	winnerId: 'gpt-5-2',
	terminationVotes: []
} as unknown as DiscussionRound;

describe('deliberation chamber', () => {
	it('seats three models on the ring, rounds stack upward', () => {
		const p = seatPosition('gemini-3-pro', 0);
		expect(Math.hypot(p[0], p[2])).toBeCloseTo(SEAT_RADIUS, 9);
		expect(seatPosition('gemini-3-pro', 2)[1]).toBeCloseTo(2 * ROUND_HEIGHT, 9);
		expect(familyOf('claude-opus-4-6')).toBe('Claude');
	});

	it('flattens votes and flags self-votes', () => {
		const v = roundVotes(round);
		expect(v).toHaveLength(3);
		expect(v.filter((x) => x.self)).toHaveLength(1);
		expect(new Set(v.map((x) => x.id)).size).toBe(3);
	});

	it('scores with APPROVE 2 / NEUTRAL 1 / REJECT 0 and weighted self-votes', () => {
		const s = roundScores(round, 0.5);
		expect(s['gpt-5-2']).toBe(1); // self approve 2×0.5 + reject 0
		expect(s['claude-opus-4-6']).toBe(1);
	});

	it('summarises winners per model', () => {
		const t = {
			questionSlug: 's',
			questionId: 'rq-0-1',
			questionTitle: 'T',
			phaseId: 'phase-0',
			status: 'concluded',
			rounds: [round, round]
		} as unknown as DiscussionThread;
		expect(summarise(t).winners['gpt-5-2']).toBe(2);
	});
});
