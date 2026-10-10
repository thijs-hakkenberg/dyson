import { describe, expect, it } from 'vitest';
import { SCENE_TO_GAL, EQ_TO_GAL, apply, galacticLB, panoramaUV } from '../sky';
import { eclipticToScene } from '../units';

const d2r = Math.PI / 180;
const radec = (ra: number, dec: number): [number, number, number] => [
	Math.cos(dec * d2r) * Math.cos(ra * d2r),
	Math.cos(dec * d2r) * Math.sin(ra * d2r),
	Math.sin(dec * d2r)
];
/** Equatorial → ecliptic → scene, independent of the matrix under test. */
function eqToScene(v: [number, number, number]) {
	const e = 23.4392911 * d2r;
	const x = v[0];
	const y = v[1] * Math.cos(e) + v[2] * Math.sin(e);
	const z = -v[1] * Math.sin(e) + v[2] * Math.cos(e);
	return eclipticToScene(x, y, z);
}

describe('sky frame', () => {
	it('Sgr A* (RA 266.417°, Dec −29.008°) is near the galactic centre', () => {
		const [l, b] = galacticLB(apply(EQ_TO_GAL, radec(266.41683, -29.00781)));
		expect(Math.min(l, 360 - l)).toBeLessThan(0.1);
		expect(Math.abs(b)).toBeLessThan(0.1);
	});

	it('scene → galactic agrees with the step-by-step conversion', () => {
		// North galactic pole: RA 192.85948°, Dec 27.12825°
		const [, b] = galacticLB(apply(SCENE_TO_GAL, eqToScene(radec(192.85948, 27.12825))));
		expect(b).toBeGreaterThan(89.9);
		// LMC: RA 80.894°, Dec −69.756° → l ≈ 280.5°, b ≈ −32.9°
		const [l2, b2] = galacticLB(apply(SCENE_TO_GAL, eqToScene(radec(80.894, -69.756))));
		expect(l2).toBeCloseTo(280.5, 0);
		expect(b2).toBeCloseTo(-32.9, 0);
	});

	it('panorama UV: centre at l=0, LMC lower right', () => {
		expect(panoramaUV(0, 0)).toEqual([0.5, 0.5]);
		const [u, v] = panoramaUV(280.5, -32.9);
		expect(u).toBeGreaterThan(0.7);
		expect(v).toBeLessThan(0.5);
	});
});
