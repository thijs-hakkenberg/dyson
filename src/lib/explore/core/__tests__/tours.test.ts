import { describe, expect, it } from 'vitest';
import { TOURS } from '../tours';
import { getEntity } from '../registry';
import { MAX_YEAR, TODAY_YEAR } from '../state.svelte';
import { readFileSync } from 'node:fs';

/** Fork ids available for a BOM item's workbench (from its divergent-views.yaml). */
function forkIds(bomId: string): string[] {
	const e = getEntity(bomId)!;
	const yaml = readFileSync(`static/content/bom-specs/${e.phaseId}/${e.bom!.slug}/divergent-views.yaml`, 'utf8');
	return [...yaml.matchAll(/^\s*- id: "([^"]+)"/gm)].map((m) => m[1]);
}

describe('tours', () => {
	it('have unique ids and non-empty steps', () => {
		expect(new Set(TOURS.map((t) => t.id)).size).toBe(TOURS.length);
		for (const t of TOURS) expect(t.steps.length).toBeGreaterThan(3);
	});

	for (const t of TOURS) {
		it(`${t.id}: every referenced entity, year and fork exists`, () => {
			let workbench: string | null = null;
			for (const s of t.steps) {
				if (s.focus) expect(getEntity(s.focus), s.focus).toBeTruthy();
				if (s.select) expect(getEntity(s.select), s.select).toBeTruthy();
				if (s.workbench !== undefined) workbench = s.workbench;
				if (s.workbench) expect(getEntity(s.workbench)?.kind).toBe('bom');
				if (s.wbSelection) {
					expect(workbench, 'wbSelection needs an open workbench').toBeTruthy();
					expect(forkIds(workbench!)).toContain(s.wbSelection);
				}
				const y = typeof s.year === 'number' ? s.year : s.year?.to;
				if (y !== undefined) {
					expect(y).toBeGreaterThanOrEqual(TODAY_YEAR - 1e-6);
					expect(y).toBeLessThanOrEqual(MAX_YEAR);
				}
				expect(s.duration).toBeGreaterThan(3);
				if (typeof s.year === 'object') expect(s.year.over).toBeLessThan(s.duration);
			}
		});
	}
});
