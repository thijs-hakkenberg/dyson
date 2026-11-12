// @vitest-environment node
import { describe, expect, it } from 'vitest';
import yaml from 'js-yaml';
import { divergentViewsYaml, parseDivergentViews } from '../../../../scripts/lib/divergent-views.js';

const CONSENSUS = Object.entries(
	import.meta.glob('/static/content/bom-specs/phase-0/*/consensus.md', { query: '?raw', import: 'default', eager: true })
) as [string, string][];
const YAMLS = Object.entries(
	import.meta.glob('/static/content/bom-specs/phase-0/*/divergent-views.yaml', { query: '?raw', import: 'default', eager: true })
) as [string, string][];

describe('parseDivergentViews', () => {
	it('keeps statements whole across decimal points', () => {
		const md = `## Divergent Views

- **0B cost**: Claude recommends a $9.3B P50 at C3 −0.7. It covers propellant. Gemini prefers $2.5–5.4B. GPT suggests $7.3B.
  - **These totals are not like-for-like.**

## Open Questions
`;
		const [t] = parseDivergentViews(md);
		expect(t.topic).toBe('0B cost');
		expect(t.positions.map((p) => p.models)).toEqual([['Claude'], ['Gemini'], ['GPT']]);
		expect(t.positions[0].statement).toBe('Claude recommends a $9.3B P50 at C3 −0.7. It covers propellant.');
	});

	it('reads the nested and heading-only forms, and continues deeper lines', () => {
		const md = `## Divergent Views

- **Fleet size.**
  - Claude recommends 6 scouts.
    - Range 4–8.
  - Claude and GPT reject impactors.
  - All three agree on rendezvous.
- **Power:**
  - Gemini prefers 3.5 kW.
`;
		const topics = parseDivergentViews(md);
		expect(topics.map((t) => t.id)).toEqual(['fleet-size', 'power']);
		expect(topics[0].positions).toEqual([
			{ statement: 'Claude recommends 6 scouts. Range 4–8.', models: ['Claude'] },
			{ statement: 'Claude and GPT reject impactors.', models: ['Claude', 'GPT'] }
		]);
	});

	it('round-trips through YAML', () => {
		const topics = [{ id: 'a', topic: 'A "q"', positions: [{ statement: 'x: "y" \\ z', models: ['GPT'] }] }];
		const doc = yaml.load(divergentViewsYaml({ bomId: 'bom-0-1', itemSlug: 's', generated: '2026-10-20', topics })) as {
			topics: typeof topics;
		};
		expect(doc.topics).toEqual(topics);
	});
});

describe('Phase 0 divergent views (regenerated 2026-10-20)', () => {
	it('every consensus parses with all three models represented', () => {
		expect(CONSENSUS.length).toBe(17);
		for (const [file, md] of CONSENSUS) {
			const models = new Set(parseDivergentViews(md).flatMap((t) => t.positions.flatMap((p) => p.models)));
			expect([file, [...models].sort()]).toEqual([file, ['Claude', 'GPT', 'Gemini']]);
		}
	});

	it('the committed YAML matches its consensus (run --divergent-only after a regeneration)', () => {
		expect(YAMLS.length).toBe(17);
		for (const [file, raw] of YAMLS) {
			const md = CONSENSUS.find(([f]) => f === file.replace('divergent-views.yaml', 'consensus.md'))?.[1];
			const doc = yaml.load(raw) as { generated: string; topics: unknown[] };
			expect([file, doc.topics]).toEqual([file, parseDivergentViews(md ?? '')]);
		}
	});
});
