import { describe, expect, it } from 'vitest';
import { chainsAt, formatTonnesPerYear } from '../logistics';
import { phaseWindow } from '../timeline';

const at = (id: string, f: number) => {
	const w = phaseWindow(id)!;
	return w.start + (w.end - w.start) * f;
};

describe('logistics chains', () => {
	it('nothing flows before Phase 0', () => {
		expect(chainsAt(2026).every((c) => !c.active && c.flow === 0)).toBe(true);
	});

	it('product chain: flow is the minimum stage capacity, and the plant at the NEA limits it once built', () => {
		const c = chainsAt(at('phase-1', 0.5)).find((x) => x.chain.id === 'ore')!;
		expect(c.active).toBe(true);
		const caps = c.chain.stages.map((s) => s.capacity);
		expect(c.flow).toBe(Math.min(...caps));
		// Robots mine ~100s of kt/yr of regolith; the plant ships 0.6–2.5 kt/yr of product (round 2, midpoint)
		expect(c.bottleneck?.id).toBe('plant');
		expect(c.flow).toBeCloseTo(1_550, -2);
	});

	it('stellar fuel reaches the 1e12 kg/s consensus target at full build-out', () => {
		const end = Math.max(at('phase-3b', 1), at('phase-3a', 1)) + 1;
		const c = chainsAt(end).find((x) => x.chain.id === 'stellar')!;
		expect(c.flow).toBeCloseTo((1e12 * 3.15576e7) / 1000, -10);
	});

	it('formats tonnes per year', () => {
		expect(formatTonnesPerYear(50_000)).toBe('50.0 kt/yr');
		expect(formatTonnesPerYear(3.16e16)).toBe('31.6 Pt/yr');
		expect(formatTonnesPerYear(Infinity)).toBe('∞');
	});
});
