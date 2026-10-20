import { describe, expect, it } from 'vitest';
import { layoutTunnel, monthToZ, yearToPhase0Month } from '../gates';
import { DECISION_GATES } from '$lib/services/decision-gates';
import { TRL_ASSESSMENTS } from '$lib/services/trl-assessment';
import { ASSUMED_PHASE0_START } from '../timeline';

describe('gate tunnel', () => {
	const L = layoutTunnel(2026.8);

	it('places every gate and technology', () => {
		expect(L.gates).toHaveLength(DECISION_GATES.length);
		expect(L.techs).toHaveLength(TRL_ASSESSMENTS.length);
		const months = L.gates.map((g) => g.gate.decisionMonth);
		expect(months).toEqual([...months].sort((a, b) => a - b));
	});

	it('maps time to −z and today relative to the assumed P0 start', () => {
		expect(monthToZ(24)).toBeLessThan(monthToZ(12));
		expect(yearToPhase0Month(ASSUMED_PHASE0_START + 1)).toBe(12);
		expect(L.todayMonth).toBeCloseTo((2026.8 - ASSUMED_PHASE0_START) * 12, 6);
	});

	it('flags a technology as late when it reaches target TRL after the gate decides', () => {
		const gate = { ...DECISION_GATES[0], decisionMonth: 12, decisionMonthMax: 12, relatedTRLIds: ['x'] };
		const trl = { ...TRL_ASSESSMENTS[0], id: 'x', yearsToTarget: 10 };
		const l = layoutTunnel(ASSUMED_PHASE0_START, [gate], [trl]);
		expect(l.gates[0].late).toEqual(['x']);
		const early = layoutTunnel(ASSUMED_PHASE0_START, [gate], [{ ...trl, yearsToTarget: 0.5 }]);
		expect(early.gates[0].late).toEqual([]);
		expect(early.links[0].late).toBe(false);
	});

	it('within a decision window a technology is at risk; after it, late', () => {
		const gate = { ...DECISION_GATES[0], decisionMonth: 12, decisionMonthMax: 60, relatedTRLIds: ['x'] };
		const trl = { ...TRL_ASSESSMENTS[0], id: 'x', yearsToTarget: 3 };
		const inside = layoutTunnel(ASSUMED_PHASE0_START, [gate], [trl]);
		expect(inside.gates[0].atRisk).toEqual(['x']);
		expect(inside.gates[0].late).toEqual([]);
		const after = layoutTunnel(ASSUMED_PHASE0_START, [gate], [{ ...trl, yearsToTarget: 6 }]);
		expect(after.gates[0].late).toEqual(['x']);
		expect(after.gates[0].zMax).toBeLessThan(after.gates[0].z);
	});

	it('tunnel spans from today (or P0 start) to beyond the last arrival', () => {
		expect(L.startMonth).toBeLessThanOrEqual(0);
		for (const t of L.techs) expect(L.endMonth).toBeGreaterThan(t.arrivalMax);
	});
});
