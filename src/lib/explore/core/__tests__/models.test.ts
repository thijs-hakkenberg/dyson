import { describe, expect, it } from 'vitest';
import {
	ELEMENT_MODELS,
	GHOST_MAX_RATIO,
	GHOST_MIN_RATIO,
	NON_PHYSICAL,
	elementModel,
	formatLength,
	ghostLineup,
	niceLength
} from '../models';
import { ENTITIES } from '../registry';
import { buildElement, extent, ghostify } from '../../scene/models/build';
import { Mesh } from 'three';

const bomIds = ENTITIES.filter((e) => e.kind === 'bom').map((e) => e.id);

describe('element models', () => {
	it('every BOM item has a model or is marked non-physical', () => {
		for (const id of bomIds) expect(!!elementModel(id) || id in NON_PHYSICAL, id).toBe(true);
	});

	it('model ids are unique and refer to real BOM items', () => {
		const ids = ELEMENT_MODELS.map((m) => m.bomId);
		expect(new Set(ids).size).toBe(ids.length);
		for (const id of ids) expect(bomIds).toContain(id);
	});

	it('sizes are positive and finite; non-consensus sizes are flagged', () => {
		for (const m of ELEMENT_MODELS) {
			expect(Number.isFinite(m.params.size) && m.params.size > 0, m.bomId).toBe(true);
			for (const v of m.variants) expect(v.size > 0, `${m.bomId} ${v.label}`).toBe(true);
			if (m.sizeBasis === 'model') expect(m.source.length).toBeGreaterThan(0);
		}
	});

	it('geometric-mean sizes lie between the smallest and largest proposal', () => {
		for (const m of ELEMENT_MODELS.filter((x) => x.sizeBasis === 'geomean')) {
			const s = m.variants.map((v) => v.size);
			expect(m.params.size, m.bomId).toBeGreaterThanOrEqual(Math.min(...s) * 0.999);
			expect(m.params.size, m.bomId).toBeLessThanOrEqual(Math.max(...s) * 1.001);
		}
	});

	it('key consensus dimensions', () => {
		expect(elementModel('bom-0-3')!.params.size).toBeCloseTo(2 * Math.sqrt(750) + 10, 6);
		expect(elementModel('bom-0-4')!.params.size).toBeGreaterThan(65);
		const node = elementModel('bom-1-4')!;
		expect(node.variants.map((v) => v.size).sort((a, b) => a - b)).toEqual([18, 120, 340]);
	});

	it('ghost line-up keeps true ratios and flags clamping', () => {
		const m = elementModel('bom-3b-1')!; // 1,000 km vs 100 km vs 10 km
		const slots = ghostLineup(m, 6);
		const claude = slots.find((s) => s.variant.model === 'Claude')!;
		expect(claude.ratio).toBeCloseTo(10, 5);
		expect(claude.clamped).toBe('up');
		expect(claude.sceneSize).toBeCloseTo(6 * GHOST_MAX_RATIO);
		const gpt = slots.find((s) => s.variant.model === 'GPT')!;
		expect(gpt.ratio).toBeCloseTo(0.1, 5);
		expect(gpt.clamped).toBeNull();
		const tiny = ghostLineup(elementModel('bom-2-3')!, 6)[0]; // 100 t seed node vs 2,400 t node
		expect(tiny.clamped).toBe('down');
		expect(tiny.sceneSize).toBeCloseTo(6 * GHOST_MIN_RATIO);
	});

	it('scale-bar lengths and formatting', () => {
		expect(niceLength(73)).toBe(50);
		expect(niceLength(240)).toBe(200);
		expect(niceLength(0.13)).toBeCloseTo(0.1);
		expect(formatLength(50)).toBe('50 m');
		expect(formatLength(20000)).toBe('20 km');
		expect(formatLength(0.35)).toBe('35 cm');
	});
});

describe('procedural builder', () => {
	it.each(ELEMENT_MODELS.map((m) => [m.bomId, m] as const))('%s builds at its spec size', (_id, m) => {
		const g = buildElement(m);
		let meshes = 0;
		g.traverse((o) => {
			if (o instanceof Mesh) meshes++;
		});
		expect(meshes).toBeGreaterThan(3);
		const e = extent(g);
		// Drawn extent tracks the characteristic size (plumes/field lines may extend it)
		expect(e / m.params.size, m.bomId).toBeGreaterThan(0.5);
		expect(e / m.params.size, m.bomId).toBeLessThan(5);
	});

	it('ghosts scale linearly with the variant size', () => {
		const m = elementModel('bom-1-4')!;
		const a = extent(buildElement(m, { ...m.params, size: 18 }));
		const b = extent(buildElement(m, { ...m.params, size: 340 }));
		expect(b / a).toBeCloseTo(340 / 18, 0);
	});

	it('ghostify swaps every material for a translucent one', () => {
		const g = ghostify(buildElement(elementModel('bom-0-1')!), '#e07a50');
		g.traverse((o) => {
			if (o instanceof Mesh) expect((o.material as { transparent: boolean }).transparent).toBe(true);
		});
	});
});
