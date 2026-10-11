// @vitest-environment node
import { describe, expect, it } from 'vitest';
import yaml from 'js-yaml';
import { KNOWN_MODELS, modelFamily, modelName } from '../models';
import { MODEL_DISPLAY_NAMES, computeDiscussionStats } from '$lib/types/discussion';
// The scripts' registry must agree with the site's
import { MODELS as SCRIPT_MODELS, PANELS, nameFor, familyOf, resolvePanel } from '../../../../scripts/lib/llm.js';

const MODELS = SCRIPT_MODELS as Record<string, { name: string; family: string; transport: string }>;
const FINDINGS = Object.values(
	import.meta.glob('/reconciliation/phase-0/findings.yaml', { query: '?raw', import: 'default', eager: true })
)[0] as string;

describe('model registry', () => {
	it('names and families for known and future models', () => {
		expect(modelName('gpt-5-5-pro')).toBe('GPT-5.5 Pro');
		expect(modelName('claude-opus-5-5')).toBe('Claude Opus 5.5');
		expect(modelName('gemini-3-5-pro')).toBe('Gemini 3.5 Pro');
		expect(modelFamily('claude-sonnet-5-5')).toBe('claude');
		expect(MODEL_DISPLAY_NAMES['gpt-6']).toBe('GPT-6');
	});

	it('site and scripts list the same models with the same names', () => {
		for (const [k, m] of Object.entries(MODELS)) {
			expect(KNOWN_MODELS[k]?.name, k).toBe(m.name);
			expect(KNOWN_MODELS[k]?.family, k).toBe(m.family);
		}
		for (const k of ['claude-opus-5-5', 'gpt-5-6-pro', 'gemini-4-pro']) {
			expect(nameFor(k)).toBe(modelName(k));
			expect(familyOf(k)).toBe(modelFamily(k));
		}
	});

	it('panels resolve, and unknown endpoints register with a sensible transport', async () => {
		expect(await resolvePanel({})).toEqual(PANELS.feb);
		expect(await resolvePanel({ panel: 'may' })).toEqual(PANELS.may);
		const [a, b] = await resolvePanel({ models: 'databricks-claude-opus-5-5,gpt-6-pro' });
		expect(MODELS[a].transport).toBe('gateway-chat');
		expect(MODELS[b].transport).toBe('gateway-responses');
	});

	it('discussion stats count winners from any panel', () => {
		const stats = computeDiscussionStats([{ winnerId: 'claude-opus-4-7', votes: [], responses: [] } as never]);
		expect(stats.roundWinners['claude-opus-4-7']).toBe(1);
	});
});

describe('phase 0 findings', () => {
	const F = yaml.load(FINDINGS) as {
		items: Record<string, string>;
		findings: { id: string; kind: string; severity: string; items: string[]; question: string }[];
	};
	it('are well-formed and reference real items', () => {
		const ids = new Set(F.findings.map((f) => f.id));
		expect(ids.size).toBe(F.findings.length);
		for (const f of F.findings) {
			expect(['closure', 'gap', 'stale', 'contradiction', 'plausibility']).toContain(f.kind);
			expect(['blocking', 'major', 'minor']).toContain(f.severity);
			expect(f.question.length).toBeGreaterThan(20);
			for (const i of f.items) expect(i === 'phase' || i in F.items, `${f.id}: ${i}`).toBe(true);
		}
	});
});
