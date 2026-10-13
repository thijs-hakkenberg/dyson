// @vitest-environment node
import { describe, expect, it } from 'vitest';
import yaml from 'js-yaml';
import { TRL_ASSESSMENTS } from '$lib/services/trl-assessment';
import { buildBaseline, bullets, lastYaml } from '../../../../scripts/run-trl-assessment.js';

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

	it('every rating rule is a string (an unquoted "x: y" parses as a mapping → [object Object])', () => {
		const rules = (yaml.load(BRIEF) as { rating_rules: unknown[] }).rating_rules;
		for (const r of rules) expect(typeof r, JSON.stringify(r)).toBe('string');
	});

	it('bullets() refuses anything that would render as [object Object]', () => {
		expect(bullets(['a', 'b'])).toBe('- a\n- b');
		expect(() => bullets(['a', { 'Relevant environment': 'vacuum' }])).toThrow(/not a string/);
	});

	it('lastYaml repairs the plain scalars models leave unquoted', () => {
		const block = (y: string) => 'text\n```yaml\n' + y + '\n```\n';
		const y = lastYaml(
			block(
				[
					'technologies:',
					'  - id: T10',
					'    required: >=90 days unattended (GPT gate, Claude: 30)',
					'    technology: No-melt refining (Gemini: carbonyl or H2)',
					'    note: >-',
					'      folded text stays folded',
					'    rqs: [rq-0-1]',
					"    reason: 'already: quoted'"
				].join('\n')
			)
		) as { technologies: Record<string, unknown>[] };
		expect(y.technologies[0]).toEqual({
			id: 'T10',
			required: '>=90 days unattended (GPT gate, Claude: 30)',
			technology: 'No-melt refining (Gemini: carbonyl or H2)',
			note: 'folded text stays folded',
			rqs: ['rq-0-1'],
			reason: 'already: quoted'
		});
		expect(lastYaml(block('a: [unclosed'))).toBeNull();
	});

	it('defines all nine TRL levels and unique candidate ids', () => {
		expect(Object.keys(B.trl_scale.levels)).toHaveLength(9);
		expect(new Set(B.candidates.map((c) => c.id)).size).toBe(B.candidates.length);
	});

	it('baseline groups by the assessed technology, not the id each model invents', () => {
		const r = (model: string, selfId: string, min: number, max: number) => ({
			id: 'T01',
			technology: 'MW-class SEP thruster and PPU cluster',
			model,
			y: { id: selfId, technology: 'x', current_trl: { min, max }, ad2: 6, risk_if_fail: 'project-ending', target_trl: { kdp_0b: 6 } }
		});
		const b = buildBaseline([r('claude', 'solar-electric-propulsion', 2, 4), r('gemini', 't01-mw-sep-cluster', 2, 3), r('gpt', 'T01', 5, 6)]);
		expect(b.technologies).toHaveLength(1);
		const t = b.technologies[0] as { id: string; technology: string; ratings: Record<string, { model_id?: string }>; panel: { agreement: string } };
		expect(t.id).toBe('T01');
		expect(t.technology).toBe('MW-class SEP thruster and PPU cluster');
		expect(Object.keys(t.ratings)).toEqual(['claude', 'gemini', 'gpt']);
		expect(t.ratings.claude.model_id).toBe('solar-electric-propulsion');
		expect(t.ratings.gpt.model_id).toBeUndefined();
		expect(t.panel.agreement).toBe('diverge');
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
