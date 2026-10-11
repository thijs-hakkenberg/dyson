import { describe, expect, it } from 'vitest';
import { hardwareDistance, hardwareMinDistance, nearFieldModel, nearFieldResolved, sizeAU } from '../nearfield';
import { getEntity } from '../registry';
import { ELEMENT_MODELS } from '../models';
import { AU_M, kmToAU } from '../units';

describe('near field', () => {
	it('offers models only for point-anchored items', () => {
		expect(nearFieldModel('bom-1-4')?.bomId).toBe('bom-1-4'); // L1
		expect(nearFieldModel('bom-1-5')?.bomId).toBe('bom-1-5'); // lunar surface
		expect(nearFieldModel('bom-1-1')).toBeNull(); // band → focuses the Sun
		expect(nearFieldModel('bom-3a-1')).toBeNull(); // shells
		expect(nearFieldModel('bom-0-7')).toBeNull(); // non-physical
		expect(nearFieldModel('earth')).toBeNull();
		expect(nearFieldModel(null)).toBeNull();
	});

	it('every point-anchored physical item has a near-field model', () => {
		for (const m of ELEMENT_MODELS) {
			const kind = getEntity(m.bomId)?.placement?.anchor?.kind;
			if (kind && !['band', 'shells'].includes(kind)) expect(nearFieldModel(m.bomId), m.bomId).not.toBeNull();
		}
	});

	it('works in true scale', () => {
		const m = nearFieldModel('bom-1-4')!;
		expect(sizeAU(m) * AU_M).toBeCloseTo(m.params.size, 6);
		expect(hardwareMinDistance(m)).toBeLessThan(hardwareDistance(m));
		expect(nearFieldResolved(m, hardwareDistance(m))).toBe(true);
		expect(nearFieldResolved(m, getEntity('bom-1-4')!.focusDistance)).toBe(false);
	});

	it('puts surface hardware on the ground, not at the body centre', () => {
		const e = getEntity('bom-1-5')!;
		const moon = getEntity('moon')!;
		const p = e.position(2060);
		const c = moon.position(2060);
		const d = Math.hypot(p[0] - c[0], p[1] - c[1], p[2] - c[2]);
		expect(d).toBeCloseTo(kmToAU(1737.4), 12);
		expect(p[1] - c[1]).toBeGreaterThan(0); // north pole
	});
});
