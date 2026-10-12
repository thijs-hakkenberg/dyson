// @vitest-environment node
import { describe, expect, it } from 'vitest';
import yaml from 'js-yaml';
import { TRL_ASSESSMENTS } from '$lib/services/trl-assessment';
import { buildBaseline } from '../../../../scripts/run-trl-assessment.js';

const BRIEF = Object.values(
	import.meta.glob('/reconciliation/phase-0/trl/brief.yaml', { query: '?raw', import: 'default', eager: true })
)[0] as string;

describe('TRL work package', () => {
	const B = yaml.load(BRIEF) as {
		candidates: { id: string; legacy: string | null; rqs: string[] }[];
		deferred: { legacy: string }[];
		trl_scale: { levels: Record<string, unknown> };
	};

	it('accounts for every March 2026 TRL row (replaced, split or deferred)', () => {
		const covered = new Set([
			...B.candidates.map((c) => c.legacy?.replace(/\s*\(.*\)$/, '')).filter(Boolean),
			...B.deferred.map((d) => d.legacy)
		]);
		for (const a of TRL_ASSESSMENTS) expect(covered, a.id).toContain(a.id);
	});

	it('defines all nine TRL levels and unique candidate ids', () => {
		expect(Object.keys(B.trl_scale.levels)).toHaveLength(9);
		expect(new Set(B.candidates.map((c) => c.id)).size).toBe(B.candidates.length);
	});

	it('baseline keeps every model and flags divergence without averaging', () => {
		const t = (model: string, min: number, max: number, risk: string) => ({
			model,
			y: { id: 'T01', technology: 'x', current_trl: { min, max }, ad2: 5, risk_if_fail: risk, target_trl: { kdp_0b: 6 } }
		});
		const b = buildBaseline([t('a', 2, 3, 'schedule-delay'), t('b', 5, 6, 'project-ending')]);
		const p = (b.technologies[0] as { panel: { current_trl: { min: number; max: number }; agreement: string; risk_if_fail: string } }).panel;
		expect(p.current_trl).toMatchObject({ min: 2, max: 6 });
		expect(p.agreement).toBe('diverge');
		expect(p.risk_if_fail).toBe('project-ending');
	});
});
