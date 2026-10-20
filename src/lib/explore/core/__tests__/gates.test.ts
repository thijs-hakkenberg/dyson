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

	it('times a link against the TRL the gate requires, not the target', () => {
		const trl = { ...TRL_ASSESSMENTS[0], id: 'x', currentTRL: 2, targetTRL: 6, yearsToTarget: 8, yearsToTargetMax: 8 };
		const crit = (trlRequired: number | null) => [{ id: 'c', description: '', metric: '', met: false, technologies: ['x'], trlRequired }];
		const gate = { ...DECISION_GATES[0], decisionMonth: 0, decisionMonthMax: 60, relatedTRLIds: ['x'] };
		// TRL 4 is halfway from 2 to 6: 4 years → month 48, inside a 0–60 window
		const half = layoutTunnel(ASSUMED_PHASE0_START, [{ ...gate, criteria: crit(4) }], [trl]);
		expect(half.links[0].requiredTRL).toBe(4);
		expect(half.links[0].arrivesAt).toBeCloseTo(48, 6);
		expect(half.gates[0].late).toEqual([]);
		// Evidence-register criteria name the technology without a TRL: untimed, never late
		const none = layoutTunnel(ASSUMED_PHASE0_START, [{ ...gate, decisionMonthMax: 3, criteria: crit(null) }], [trl]);
		expect(none.links[0].requiredTRL).toBeNull();
		expect(none.gates[0].late).toEqual([]);
	});

	it('KDP-0A requires no TRL, so nothing is late for it', () => {
		const kdp0a = L.gates.find((g) => g.gate.id === 'kdp-0a')!;
		expect(kdp0a.late).toEqual([]);
	});
});
