// @vitest-environment node
import { describe, expect, it } from 'vitest';
import yaml from 'js-yaml';
import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { PHASE_0_BOM, PHASE_0_TOTALS, moneyRange, phase0BomItems } from '../phase-0-bom';
import { PHASE_0_BOM_ITEMS, BOM_ITEM_SLUGS } from '../bom/bom-data';
import { PHASES } from '../content';

const STRUCTURE = Object.values(
	import.meta.glob('/reconciliation/phase-0/bom-structure.yaml', { query: '?raw', import: 'default', eager: true })
)[0] as string;

describe('Phase 0 BOM (regenerated consensus)', () => {
	const structure = yaml.load(STRUCTURE) as { items: { bomId: string; slug: string }[] };

	it('the generated BOM data is up to date with the reconciliation files', () => {
		const r = spawnSync(process.execPath, ['scripts/build-bom-data.js', '--check'], { encoding: 'utf8' });
		expect(r.stderr).toBe('');
		expect(r.status).toBe(0);
	});

	it('follows the accepted structure, in order, with stable ids and slugs', () => {
		expect(PHASE_0_BOM.items.map((i) => [i.bomId, i.slug])).toEqual(structure.items.map((s) => [s.bomId, s.slug]));
		for (const s of structure.items) expect(BOM_ITEM_SLUGS[s.bomId]).toBe(s.slug);
	});

	it('every item has the regenerated spec folder the site fetches', () => {
		for (const i of PHASE_0_BOM.items) {
			for (const f of ['consensus.md', 'divergent-views.yaml', 'claude-opus-5-5.md', 'gemini-3-1-pro.md', 'gpt-6-1-sol.md']) {
				expect(existsSync(`static/content/bom-specs/phase-0/${i.slug}/${f}`), `${i.slug}/${f}`).toBe(true);
			}
		}
	});

	it('envelopes are ordered and totals are sums of ends, never averages', () => {
		for (const i of PHASE_0_BOM.items) {
			for (const e of [i.a, i.b, i.total]) {
				expect(e.min, i.bomId).toBeLessThanOrEqual(e.point);
				expect(e.point, i.bomId).toBeLessThanOrEqual(e.max);
			}
		}
		const base = PHASE_0_BOM.items.filter((i) => i.bomId !== 'bom-0-17');
		const sum = (k: 'a' | 'b', end: 'min' | 'max') => base.reduce((s, i) => s + i[k][end], 0);
		expect(PHASE_0_BOM.totals.base.a.min).toBeCloseTo(sum('a', 'min'));
		expect(PHASE_0_BOM.totals.base.b.max).toBeCloseTo(sum('b', 'max'));
		// contingency: low rate on the low base, high rate on the high base
		const c = PHASE_0_BOM.items.find((i) => i.bomId === 'bom-0-17')!;
		expect(c.a.min).toBeCloseTo(sum('a', 'min') * c.a.rate![0]);
		expect(c.b.max).toBeCloseTo(sum('b', 'max') * c.b.rate![1]);
		expect(PHASE_0_TOTALS.all.max).toBeCloseTo(PHASE_0_TOTALS.a.max + PHASE_0_TOTALS.b.max);
	});

	it('a conditional item is zero at the low end and keeps its if-flown range', () => {
		const water = PHASE_0_BOM.items.find((i) => i.bomId === 'bom-0-6')!;
		expect(water.b.min).toBe(0);
		expect(water.b.ifExercised).toEqual({ min: 120e6, max: 315e6 });
	});

	it('content.ts and bom-data.ts carry the same items as the generated data', () => {
		const p0 = PHASES.find((p) => p.id === 'phase-0')!;
		expect(p0.bom).toEqual(phase0BomItems());
		expect(p0.totalCost).toBe(PHASE_0_TOTALS.all.point);
		expect(PHASE_0_BOM_ITEMS.map((m) => m.bomId)).toEqual(p0.bom.map((b) => b.id));
		for (const b of p0.bom) {
			expect(b.costMin!, b.id).toBeLessThanOrEqual(b.totalCost);
			expect(b.totalCost, b.id).toBeLessThanOrEqual(b.costMax!);
		}
	});

	it('formats ranges compactly', () => {
		expect(moneyRange({ min: 0.5e9, max: 0.9e9 })).toBe('$500M–$900M');
		expect(moneyRange({ min: 3e9, max: 16e9 })).toBe('$3B–$16B');
		expect(moneyRange({ min: 8.76e9, max: 18.41e9 })).toBe('$8.8B–$18B');
	});
});
