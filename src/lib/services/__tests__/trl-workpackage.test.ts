// @vitest-environment node
import { describe, expect, it } from 'vitest';
import yaml from 'js-yaml';
import { spawnSync } from 'child_process';
import { TRL_ASSESSMENTS, LEGACY_TRL_ASSESSMENTS } from '$lib/services/trl-assessment';
import { DECISION_GATES, RETIRED_GATES, GATE_RULINGS, PHASE_0_DECISIONS } from '$lib/services/decision-gates';
import { buildBaseline, bullets, lastYaml, applyRulings } from '../../../../scripts/run-trl-assessment.js';

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
		for (const a of LEGACY_TRL_ASSESSMENTS) {
			expect(covered, a.id).toContain(a.id);
			// …and the site records what became of it
			expect(a.supersededBy.length > 0 || (a.deferredTo && a.retiredReason), a.id).toBeTruthy();
			for (const id of a.supersededBy) expect(TRL_ASSESSMENTS.map((t) => t.id), a.id).toContain(id);
		}
	});

	it('current assessments come from the baseline and keep every model rating', () => {
		expect(TRL_ASSESSMENTS).toHaveLength(26);
		for (const a of TRL_ASSESSMENTS) {
			expect(a.panelRatings?.length, a.id).toBe(3);
			const lows = a.panelRatings!.map((r) => r.currentTRL.min);
			const highs = a.panelRatings!.map((r) => r.currentTRL.max);
			// Headline is the envelope, never an average (an owner ruling may set it instead)
			if (a.agreement !== 'ruled') {
				expect(a.currentTRL, a.id).toBe(Math.min(...lows));
				expect(a.currentTRLMax ?? a.currentTRL, a.id).toBe(Math.max(...highs));
			}
			expect(a.source, a.id).toMatch(/synthesis\/T\d\d\.md$/);
		}
		expect(TRL_ASSESSMENTS.find((a) => a.id === 'T26')?.ownerRuling?.source).toMatch(/^rq-0-64\b/);
	});

	it('every March 2026 gate is retired with a reason and live replacements', () => {
		expect(RETIRED_GATES.map((g) => g.id)).toEqual(['gate-1', 'gate-2', 'gate-3', 'gate-4', 'gate-5']);
		const live = DECISION_GATES.map((g) => g.id);
		for (const g of RETIRED_GATES) {
			expect(g.retiredReason.length, g.id).toBeGreaterThan(20);
			for (const r of g.replacedBy) expect(live, g.id).toContain(r);
		}
	});

	it('criterion status points at real rulings, decisions and questions', () => {
		const rulings = new Set(GATE_RULINGS.map((r) => r.id));
		const decisions = new Set(PHASE_0_DECISIONS.map((d) => d.id));
		const ok = (id: string) => rulings.has(id) || decisions.has(id) || /^rq-0-\d+$/.test(id);
		const statuses = [
			...DECISION_GATES.flatMap((g) => [g.rulingStatus, ...g.criteria.map((c) => c.rulingStatus)]),
			...TRL_ASSESSMENTS.map((a) => a.rulingStatus)
		].filter(Boolean);
		expect(statuses.length).toBeGreaterThan(20);
		for (const s of statuses) {
			for (const id of [...(s!.decided ?? []), ...(s!.interim ?? [])]) expect(ok(id), id).toBe(true);
			for (const p of s!.pending ?? []) for (const id of [p.question, ...p.evidence]) expect(id).toMatch(/^rq-0-(6[5-9]|7\d|8[0-3])$/);
		}
	});

	it('the generated readiness data is up to date with the reconciliation files', () => {
		const r = spawnSync(process.execPath, ['scripts/build-readiness-data.js', '--check'], { encoding: 'utf8' });
		expect(r.stderr).toBe('');
		expect(r.status).toBe(0);
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
		const q = lastYaml(block('topics:\n  - statement: "Integrated article" is underspecified; see ISO\n    note: "fully quoted"')) as { topics: Record<string, string>[] };
		expect(q.topics[0]).toEqual({ statement: '"Integrated article" is underspecified; see ISO', note: 'fully quoted' });
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

	it('an owner ruling sets the headline but keeps every model rating and the panel summary it replaces', () => {
		const r = (model: string, min: number, max: number) => ({
			id: 'T26',
			technology: 'comms',
			model,
			y: { current_trl: { min, max }, ad2: 3, risk_if_fail: 'cost-increase', target_trl: { kdp_0b: 6 } }
		});
		const b = buildBaseline([r('claude', 5, 7), r('gpt', 3, 4)]);
		const ruled = applyRulings(b, [
			{
				id: 'T26',
				decided: '2026-10-17',
				source: 'rq-0-64',
				assessed_object: 'integrated service',
				headline: { current_trl: { min: 3, max: 3 }, conditional_trl: 4, ad2: 4, risk_if_fail: 'architecture-change' },
				sub_ratings: [{ element: 'RF links', trl: 9, by: 'gpt' }]
			},
			{ id: 'T99', decided: '2026-10-17', source: 'x', headline: {} }
		]);
		const t = ruled.technologies[0] as Record<string, any>;
		expect(t.panel).toMatchObject({ current_trl: { min: 3, max: 3 }, conditional_trl: 4, ad2: { min: 4, max: 4 }, risk_if_fail: 'architecture-change', agreement: 'ruled', target_trl: 6 });
		expect(t.panel_before_ruling.current_trl).toMatchObject({ min: 3, max: 7 });
		expect(t.panel_before_ruling.agreement).toBe('diverge');
		expect(Object.keys(t.ratings)).toEqual(['claude', 'gpt']);
		expect(t.owner_ruling).toMatchObject({ source: 'rq-0-64', assessed_object: 'integrated service' });
		expect(t.sub_ratings).toHaveLength(1);
		expect(ruled.unmatched_rulings).toEqual(['T99']);
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
