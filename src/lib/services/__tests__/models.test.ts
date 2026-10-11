// @vitest-environment node
import { describe, expect, it } from 'vitest';
import yaml from 'js-yaml';
import { KNOWN_MODELS, modelFamily, modelName } from '../models';
import { MODEL_DISPLAY_NAMES, computeDiscussionStats } from '$lib/types/discussion';
// The scripts' registry must agree with the site's
import { MODELS as SCRIPT_MODELS, PANELS, nameFor, familyOf, resolvePanel, queryModel } from '../../../../scripts/lib/llm.js';

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

	it('oct panel is the 2026-10 dev-workspace generation', async () => {
		expect(await resolvePanel({ panel: 'oct' })).toEqual(['claude-opus-5-5', 'gemini-3-8-flash', 'gpt-6-1-sol']);
		expect(MODELS['claude-opus-5-5'].name).toBe('Claude Opus 5.5');
		expect(MODELS['gemini-3-8-flash'].transport).toBe('gateway-chat');
		expect(MODELS['gpt-6-1-sol']).toMatchObject({ name: 'GPT-6.1 Sol', family: 'gpt', transport: 'gateway-responses' });
	});

	it('latest falls back to a lower tier when a family has no flagship endpoint', async () => {
		const names = ['databricks-claude-opus-5-5', 'databricks-claude-sonnet-5-5', 'databricks-gemini-3-7-flash', 'databricks-gemini-3-8-flash', 'databricks-gemini-3-1-flash-lite', 'databricks-gpt-6-sol', 'databricks-gpt-6-1-sol', 'databricks-gpt-oss-120b'];
		const realFetch = globalThis.fetch;
		const realToken = process.env.DATABRICKS_TOKEN;
		process.env.DATABRICKS_TOKEN = 'test';
		globalThis.fetch = (async () => ({ ok: true, json: async () => ({ endpoints: names.map((name) => ({ name, state: { ready: 'READY' } })) }) })) as never;
		try {
			expect(await resolvePanel({ panel: 'latest' })).toEqual(['claude-opus-5-5', 'gemini-3-8-flash', 'gpt-6-1-sol']);
		} finally {
			globalThis.fetch = realFetch;
			if (realToken === undefined) delete process.env.DATABRICKS_TOKEN;
			else process.env.DATABRICKS_TOKEN = realToken;
		}
	});

	it('queryModel retries capacity errors and dropped connections, but not other failures', async () => {
		const realFetch = globalThis.fetch;
		const realToken = process.env.DATABRICKS_TOKEN;
		process.env.DATABRICKS_TOKEN = 'test';
		const ok = { ok: true, status: 200, json: async () => ({ choices: [{ message: { content: 'ok' } }] }) };
		const status = (s: number) => ({ ok: false, status: s, text: async () => `{"error_code":"E${s}"}` });
		const script = (steps: unknown[]) => {
			let i = 0;
			globalThis.fetch = (async () => {
				const s = steps[i++];
				if (s instanceof Error) throw s;
				return s;
			}) as never;
			return () => i;
		};
		try {
			let calls = script([status(503), new TypeError('fetch failed'), status(429), ok]);
			expect((await queryModel('claude-opus-5-5', { prompt: 'x', backoffMs: 1 })).text).toBe('ok');
			expect(calls()).toBe(4);

			calls = script([status(400), ok]);
			await expect(queryModel('claude-opus-5-5', { prompt: 'x', backoffMs: 1 })).rejects.toThrow(/400/);
			expect(calls()).toBe(1);

			calls = script([status(503), status(503), status(503)]);
			await expect(queryModel('claude-opus-5-5', { prompt: 'x', backoffMs: 1, retries: 2 })).rejects.toThrow(/503/);
			expect(calls()).toBe(3);
		} finally {
			globalThis.fetch = realFetch;
			if (realToken === undefined) delete process.env.DATABRICKS_TOKEN;
			else process.env.DATABRICKS_TOKEN = realToken;
		}
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
