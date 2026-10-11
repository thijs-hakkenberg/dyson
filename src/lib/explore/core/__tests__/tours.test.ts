import { describe, expect, it } from 'vitest';
import { TOURS } from '../tours';
import { getEntity } from '../registry';
import { elementModel } from '../models';
import { LAYER_KEYS, MAX_YEAR, TODAY_YEAR } from '../state.svelte';

const DV = import.meta.glob('/static/content/bom-specs/**/divergent-views.yaml', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

/** Fork ids available for a BOM item's workbench (from its divergent-views.yaml). */
function forkIds(bomId: string): string[] {
	const e = getEntity(bomId)!;
	const yaml = DV[`/static/content/bom-specs/${e.phaseId}/${e.bom!.slug}/divergent-views.yaml`] ?? '';
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

describe('model-view steps', () => {
	it('only show items that have a 3D model', () => {
		for (const t of TOURS) {
			let wb: string | null = null;
			for (const s of t.steps) {
				if (s.workbench !== undefined) wb = s.workbench;
				if (s.wbView === 'model') expect(elementModel(wb), `${t.id}: ${s.title}`).not.toBeNull();
			}
		}
	});

	it('opens with the interface tour, which visits every lens and spotlights the HUD', () => {
		const ui = TOURS[0];
		expect(ui.id).toBe('interface');
		expect(ui.ui).toBe(true);
		const lenses = new Set(ui.steps.map((s) => s.lens).filter(Boolean));
		for (const l of ['physical', 'network', 'logistics', 'knowledge', 'gates', 'consensus', 'risk']) expect(lenses).toContain(l);
		expect(ui.steps.filter((s) => s.spot).length).toBeGreaterThanOrEqual(10);
		// Only the interface tour keeps the full HUD up
		expect(TOURS.filter((t) => t.ui).map((t) => t.id)).toEqual(['interface']);
	});

	it('the interface tour opens the Layers panel and names every layer key', () => {
		const ui = TOURS[0];
		const layerSteps = ui.steps.filter((s) => s.spot === '.layers');
		expect(layerSteps.length).toBeGreaterThan(0);
		expect(layerSteps.every((s) => s.layersOpen)).toBe(true);
		const text = layerSteps.map((s) => s.body).join(' ');
		for (const k of Object.values(LAYER_KEYS)) expect(text).toContain(/\d/.test(k) ? '1–5' : `**${k}**`);
	});
});

describe('layer shortcuts', () => {
	// Keys already bound in ExploreApp's handler
	const TAKEN = [' ', '/', '?', 'C', 'R', 'L', 'N', 'G', 'K', 'W', 'M', 'Z', 'H', 'F', '[', ']', '0'];
	it('are unique and do not collide with other shortcuts', () => {
		const keys = Object.values(LAYER_KEYS);
		expect(new Set(keys).size).toBe(keys.length);
		for (const k of keys) expect(TAKEN).not.toContain(k);
	});
});
