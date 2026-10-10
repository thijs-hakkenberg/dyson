import { describe, expect, it } from 'vitest';
import {
	integrateSunOrbit,
	gcDirection,
	skyRotation,
	skyRotationForYear,
	skyMatrix,
	thrustDirectionGal,
	R0_PC,
	V0_KMS,
	KMS_TO_PC_PER_MYR
} from '../galactic';

const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

describe('galactic orbit', () => {
	it('one galactic year ≈ 2π R0 / V0; the orbit stays near R0 and sweeps ~360°', () => {
		const period = (2 * Math.PI * R0_PC) / (V0_KMS * KMS_TO_PC_PER_MYR);
		expect(period).toBeGreaterThan(200);
		expect(period).toBeLessThan(240);
		const o = integrateSunOrbit(period, 0, 0.05, 1);
		let swept = 0;
		for (let i = 1; i < o.length; i++) {
			const a0 = Math.atan2(o[i - 1].pos[1], o[i - 1].pos[0]);
			const a1 = Math.atan2(o[i].pos[1], o[i].pos[0]);
			let d = a1 - a0;
			if (d > Math.PI) d -= 2 * Math.PI;
			if (d < -Math.PI) d += 2 * Math.PI;
			swept += d;
			const R = Math.hypot(o[i].pos[0], o[i].pos[1]);
			expect(Math.abs(R - R0_PC)).toBeLessThan(1500);
		}
		expect(Math.abs(swept) / (2 * Math.PI)).toBeGreaterThan(0.85);
		expect(Math.abs(swept) / (2 * Math.PI)).toBeLessThan(1.15);
	});

	it('the engine changes the path measurably over 100 Myr', () => {
		const a = 1.7e-12;
		const on = integrateSunOrbit(100, a).at(-1)!;
		const off = integrateSunOrbit(100, 0).at(-1)!;
		const sep = dist(on.pos, off.pos);
		expect(sep).toBeGreaterThan(50);
		expect(sep).toBeLessThan(5000);
	});

	it('thrust axis (ecliptic north) points to b ≈ +29.8° in galactic coordinates', () => {
		const d = thrustDirectionGal();
		expect((Math.asin(d[2]) * 180) / Math.PI).toBeCloseTo(29.8, 0);
	});

	it('today the Galactic Centre is at l = 0; sky rotation is tiny within the timeline', () => {
		const g = gcDirection([-R0_PC, 0, 20.8]);
		expect(g.l).toBeCloseTo(0, 9);
		expect(skyRotation([-R0_PC, 0, 20.8]).dl).toBeCloseTo(0, 12);
		const r = skyRotationForYear(2800);
		const arcsec = (r.dl * 180 * 3600) / Math.PI;
		expect(arcsec).toBeGreaterThan(1);
		expect(arcsec).toBeLessThan(10);
	});

	it('sky matrix is a proper rotation', () => {
		const m = skyMatrix(0.7, 0.2);
		const det =
			m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
			m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
			m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
		expect(det).toBeCloseTo(1, 9);
	});
});
