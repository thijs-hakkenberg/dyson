import { describe, expect, it } from 'vitest';
import { END_YEAR, PRICES, energyTable, powerBalance, roiAt } from '../economics';
import { L_SUN_W } from '../metrics';
import { advancePlayback, deepTime, DEEP_MAX_MYR } from '../deeptime.svelte';
import { explorer, MAX_YEAR } from '../state.svelte';

describe('economics', () => {
	it('integrates spend and energy monotonically (gross)', () => {
		const T = energyTable();
		for (let i = 1; i < T.length; i++) {
			expect(T[i].spend).toBeGreaterThanOrEqual(T[i - 1].spend - 1e-3);
			expect(T[i].grossJ).toBeGreaterThanOrEqual(T[i - 1].grossJ);
		}
	});

	it('scales value linearly with price', () => {
		const a = roiAt(2100, PRICES[0].usdPerKWh);
		const b = roiAt(2100, PRICES[2].usdPerKWh);
		expect(b.grossValue / a.grossValue).toBeCloseTo(PRICES[2].usdPerKWh / PRICES[0].usdPerKWh, 6);
		expect(a.paybackYear === null || b.paybackYear! <= a.paybackYear).toBe(true);
	});

	it('shows the Phase 3 deficit and the unsaturated swarm (CI-24, CI-25)', () => {
		const pb = powerBalance(END_YEAR);
		expect(pb.netW).toBeLessThan(0);
		expect(pb.topLoads[0].bomId).toBe('bom-3b-5');
		expect(pb.deficitFrom).not.toBeNull();
		expect(pb.saturation).toBeLessThan(1e-9);
		expect(pb.saturation).toBeCloseTo(pb.genW / L_SUN_W, 20);
		expect(roiAt(END_YEAR, 0.05).netValue).toBeLessThan(0);
	});
});

describe('deep-time playback', () => {
	it('runs on past the build-out, then stops at the end of deep time', () => {
		explorer.setYear(MAX_YEAR - 0.01);
		deepTime.myr = 0;
		explorer.playing = true;
		explorer.speedIndex = 5;
		advancePlayback(1);
		expect(explorer.year).toBe(MAX_YEAR);
		expect(deepTime.myr).toBe(0);
		advancePlayback(2);
		expect(deepTime.myr).toBeGreaterThan(0);
		advancePlayback(1e6);
		expect(deepTime.myr).toBe(DEEP_MAX_MYR);
		expect(explorer.playing).toBe(false);
		deepTime.myr = 0;
	});
});

describe('plasma loop', async () => {
	const { plasmaFlowAt, PLASMA } = await import('../plasma');
	const { getEntity } = await import('../registry');
	it('conserves mass and pushes with helium only (CI-26)', () => {
		const f = plasmaFlowAt(3000);
		expect(f.fraction).toBe(1);
		expect(f.heKgS + f.hKgS).toBeLessThanOrEqual(f.liftKgS);
		expect(f.thrustN).toBeCloseTo(PLASMA.heKgS * PLASMA.vHe, -10);
		expect(f.thrustN).toBeLessThan(3e18);
		expect(plasmaFlowAt(2100).fraction).toBe(0);
	});
	it('puts the engine on the trailing side, opposite the Shkadov mirror', () => {
		const jet = getEntity('bom-3b-2')!.position(2500);
		const mirror = getEntity('bom-3b-1')!.position(2500);
		expect(jet[1]).toBeLessThan(0);
		expect(mirror[1]).toBeGreaterThan(0);
	});
});
