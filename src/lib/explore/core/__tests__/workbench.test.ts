import { describe, expect, it } from 'vitest';
import { fibonacciSphere, layoutWorkbench, modelFamily, type WorkbenchData } from '../workbench';
import type { BOMItemSpec } from '$lib/types';

const spec: BOMItemSpec = {
	bomId: 'bom-1-1',
	phaseId: 'phase-1',
	itemSlug: 'collector-units',
	itemName: 'Collector',
	specs: [
		{ modelId: 'claude-opus-4-6', modelName: 'Claude Opus 4.6', content: '# c', generatedDate: '2026-01-01' },
		{ modelId: 'gemini-3-pro', modelName: 'Gemini 3 Pro', content: '# g', generatedDate: '2026-01-01' },
		{ modelId: 'gpt-5-2', modelName: 'GPT-5.2', content: '# o', generatedDate: '2026-01-01' }
	],
	consensus: {
		keySpecs: ['a', 'b', 'c'],
		divergentViews: [],
		openQuestions: ['q1', 'q2'],
		recommendedApproach: 'do it'
	},
	divergentViewsData: {
		bomId: 'bom-1-1',
		itemSlug: 'collector-units',
		generated: '2026-01-01',
		topics: [
			{
				id: 'orbit',
				topic: 'Orbital distance',
				priority: 'low',
				positions: [
					{ statement: '0.5 AU', models: ['Claude'] },
					{ statement: '0.3 AU', models: ['Gemini'] },
					{ statement: '1.0 AU', models: ['GPT'] }
				]
			},
			{
				id: 'size',
				topic: 'Unit size',
				priority: 'critical',
				positions: [
					{ statement: 'big', models: ['Claude', 'Gemini'] },
					{ statement: 'small', models: ['GPT'] }
				]
			}
		]
	}
};

const data: WorkbenchData = {
	bomId: 'bom-1-1',
	phaseId: 'phase-1',
	slug: 'collector-units',
	name: 'Collector',
	spec,
	trl: [],
	questions: [],
	blueprintUrl: null
};

const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

describe('workbench layout', () => {
	const L = layoutWorkbench(data);

	it('one satellite per model spec, mapped to model families', () => {
		expect(L.satellites.map((s) => s.family)).toEqual(['Claude', 'Gemini', 'GPT']);
		expect(modelFamily('claude-opus-4-5')).toBe('Claude');
	});

	it('critical forks come first and have longer stems than low ones', () => {
		expect(L.forks[0].priority).toBe('critical');
		const len = (f: (typeof L.forks)[number]) => Math.hypot(...f.stem);
		expect(len(L.forks[0])).toBeGreaterThan(len(L.forks[1]));
	});

	it('each position branch leans toward the satellite of the model holding it', () => {
		const orbit = L.forks.find((f) => f.id === 'orbit')!;
		for (const p of orbit.positions) {
			const own = L.satellites.find((s) => s.family === p.models[0])!;
			const others = L.satellites.filter((s) => s.family !== p.models[0]);
			for (const o of others) {
				// Closer to its own model than the stem point is, relative to others
				expect(dist(p.pos, own.pos) - dist(orbit.stem, own.pos)).toBeLessThan(
					dist(p.pos, o.pos) - dist(orbit.stem, o.pos)
				);
			}
		}
	});

	it('places key specs, open questions; prose fallback when no YAML', () => {
		expect(L.specs).toHaveLength(3);
		expect(L.open).toHaveLength(2);
		const prose = layoutWorkbench({
			...data,
			spec: {
				...spec,
				divergentViewsData: null,
				consensus: { ...spec.consensus, divergentViews: ['**Material**: Claude says X, GPT says Y'] }
			}
		});
		expect(prose.forks).toHaveLength(1);
		expect(prose.forks[0].topic.topic).toBe('Material');
	});

	it('fibonacci sphere points are unit length', () => {
		for (const p of fibonacciSphere(7)) expect(Math.hypot(...p)).toBeCloseTo(1, 9);
	});
});
