import { describe, expect, it } from 'vitest';
import { riskFor, riskColor, claimConfidence, SEVERITY } from '../risk';
import type { BOMItem } from '$lib/types';
import type { TRLAssessment } from '$lib/services/trl-assessment';
import type { ValidatedClaim } from '$lib/types/validation';

const bom = (o: Partial<BOMItem> = {}): BOMItem =>
	({
		id: 'x',
		name: 'x',
		description: '',
		quantity: 1,
		unit: 'u',
		unitCost: 1,
		totalCost: 1,
		category: 'c',
		...o
	}) as BOMItem;
const trl = (o: Partial<TRLAssessment>): TRLAssessment =>
	({
		id: 't',
		technology: 't',
		currentTRL: 3,
		targetTRL: 7,
		riskIfFail: 'project-ending',
		relatedBOMIds: [],
		relatedQuestionIds: [],
		experimentsNeeded: [],
		...o
	}) as TRLAssessment;

describe('risk heuristic', () => {
	it('unassessed items have no technology term and are flagged', () => {
		const r = riskFor(bom(), []);
		expect(r.assessed).toBe(false);
		expect(r.technology).toBeNull();
	});

	it('severity × TRL gap drives the technology term; worst technology wins', () => {
		const r = riskFor(bom(), [trl({ id: 'a', riskIfFail: 'cost-increase' }), trl({ id: 'b' })]);
		expect(r.driver?.id).toBe('b');
		expect(r.technology).toBeCloseTo(SEVERITY['project-ending'] * (4 / 7), 6);
	});

	it('AD² raises the technology term for an equally immature but harder technology', () => {
		const easy = riskFor(bom(), [trl({ ad2: { min: 2, max: 2 } })]);
		const hard = riskFor(bom(), [trl({ ad2: { min: 8, max: 8 } })]);
		expect(hard.technology!).toBeGreaterThan(easy.technology!);
		expect(hard.technology).toBeCloseTo(0.7 * (4 / 7) + 0.3 * (7 / 8), 6);
	});

	it('high confidence and tight ranges score lower than low confidence and wide ranges', () => {
		const tight = riskFor(bom({ costConfidence: 'high', costMin: 90, costMax: 110 }), []);
		const wide = riskFor(bom({ costConfidence: 'low', costMin: 10, costMax: 1000 }), []);
		expect(wide.score).toBeGreaterThan(tight.score);
		expect(wide.score).toBeLessThanOrEqual(1);
	});

	it('colour ramps from green to red; confidence from the latest entry', () => {
		expect(riskColor(0)).toContain('140');
		expect(riskColor(1)).toContain('hsl(0,');
		const c = {
			validations: [
				{ date: '2026-01-01', confidence: 50 },
				{ date: '2026-02-01', confidence: 80 }
			]
		} as unknown as ValidatedClaim;
		expect(claimConfidence(c)).toBe(80);
	});
});
