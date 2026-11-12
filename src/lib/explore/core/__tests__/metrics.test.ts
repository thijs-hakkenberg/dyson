import { describe, expect, it } from 'vitest';
import { PHASES } from '$lib/services/content';
import { ITEM_METRICS, telemetryAt, formatPower, formatRate } from '../metrics';
import { TIMELINE } from '../timeline';

const allBomIds = PHASES.flatMap((p) => p.bom.map((b) => b.id));
const end = Math.max(...TIMELINE.map((w) => w.end)) + 1;

describe('metrics', () => {
	it('covers every BOM item exactly once', () => {
		expect(ITEM_METRICS.map((m) => m.bomId).sort()).toEqual([...allBomIds].sort());
	});

	it('ranges are ordered and positive', () => {
		for (const m of ITEM_METRICS) {
			for (const r of [m.genW, m.useW, m.throughput?.perHour]) {
				if (!r) continue;
				expect(r.min).toBeGreaterThan(0);
				expect(r.min).toBeLessThanOrEqual(r.base);
				expect(r.base).toBeLessThanOrEqual(r.max);
			}
		}
	});

	it('nothing is deployed or spent before Phase 0', () => {
		const t = telemetryAt(2026);
		expect(t.cost.base).toBe(0);
		expect(t.genW.base).toBe(0);
		expect(t.groups).toHaveLength(0);
	});

	it('spend reaches the full BOM total when everything is built', () => {
		const t = telemetryAt(end);
		const total = PHASES.flatMap((p) => p.bom).reduce((s, b) => s + b.totalCost, 0);
		expect(t.cost.base).toBeCloseTo(total, -3);
		expect(t.costTotal).toBe(total);
	});

	it('spend and output never decrease over time', () => {
		let prevCost = 0;
		let prevGen = 0;
		for (let y = 2026; y <= end; y += 2) {
			const t = telemetryAt(y);
			expect(t.cost.base).toBeGreaterThanOrEqual(prevCost - 1e-3);
			expect(t.genW.base).toBeGreaterThanOrEqual(prevGen * (1 - 1e-9));
			prevCost = t.cost.base;
			prevGen = t.genW.base;
		}
	});

	it('Phase 0 complete delivers its site array plus the self-powered vehicles', () => {
		const p0 = TIMELINE.find((w) => w.id === 'phase-0')!;
		const p1 = TIMELINE.find((w) => w.id === 'phase-1')!;
		const t = telemetryAt((p0.end + p1.start) / 2);
		const phase0 = PHASES.find((p) => p.id === 'phase-0')!.bom;
		const expected = phase0.reduce((s, b) => s + (ITEM_METRICS.find((m) => m.bomId === b.id)?.genW?.base ?? 0) * b.quantity, 0);
		expect(t.genW.base).toBeCloseTo(expected, -3);
		// the site array alone: ~4 MW BOL (consensus interim value)
		expect(phase0.find((b) => b.id === 'bom-0-5')!.quantity).toBe(4);
	});

	it('build rate is positive mid-phase and zero once complete', () => {
		const p2 = TIMELINE.find((w) => w.id === 'phase-2')!;
		const mid = telemetryAt((p2.start + p2.end) / 2);
		const gen = mid.groups.find((g) => g.group === 'Power generation')!;
		expect(gen.buildPerHour).toBeGreaterThan(0);
		const done = telemetryAt(end);
		expect(done.groups.every((g) => g.buildPerHour === 0)).toBe(true);
	});

	it('non-countable quantities (m², MW capacity) are not counted as units', () => {
		const t = telemetryAt(end);
		const ids = t.groups.flatMap((g) => g.items.map((i) => i.bomId));
		expect(ids).not.toContain('bom-0-5');
		expect(ids).not.toContain('bom-3a-3');
		expect(ids).not.toContain('bom-3b-1');
	});

	it('formats power and rates', () => {
		expect(formatPower(100e6)).toBe('100 MW');
		expect(formatPower(1.3e12)).toBe('1.30 TW');
		expect(formatPower(0)).toBe('0 W');
		expect(formatRate(5.7)).toBe('5.7');
		expect(formatRate(12345)).toBe('12.3k');
	});
});

describe('formatPerHour', () => {
	it('picks the smallest period with a value ≥ 1', async () => {
		const { formatPerHour } = await import('../metrics');
		expect(formatPerHour(70)).toBe('70 /h');
		expect(formatPerHour(0.2)).toBe('4.8 /d');
		expect(formatPerHour(20 / 8766)).toBe('20 /yr');
		expect(formatPerHour(0)).toBe('—');
	});
});

describe('compute and thrust', () => {
	it('full Matrioshka compute is 10¹² tiles × 25–60 PFLOPS', () => {
		const t = telemetryAt(end);
		expect(t.flops.min).toBeCloseTo(1e12 * 25e15, -25);
		expect(t.flops.max).toBeCloseTo(1e12 * 60e15, -25);
	});

	it('full stellar engine thrust matches consensus (mirror ~3×10¹⁷ N + jet ~3×10¹⁸ N)', () => {
		const t = telemetryAt(end);
		expect(t.thrust.base).toBeGreaterThan(3e18);
		expect(t.thrust.base).toBeLessThan(4e18);
		// a = F / M☉ ≈ 1.7×10⁻¹² m/s²
		expect(t.solarAccel).toBeGreaterThan(1e-12);
		expect(t.solarAccel).toBeLessThan(3e-12);
	});

	it('Sun motion starts at zero and accumulates monotonically', async () => {
		const { sunMotion } = await import('../metrics');
		const p3b = TIMELINE.find((w) => w.id === 'phase-3b')!;
		expect(sunMotion(p3b.start - 1)).toEqual({ dv: 0, dx: 0 });
		const a = sunMotion(p3b.end);
		const b = sunMotion(p3b.end + 100);
		expect(b.dv).toBeGreaterThan(a.dv);
		expect(b.dx).toBeGreaterThan(a.dx);
		// After the build-out, Δv grows at ~a × 100 yr
		const expected = (3.3e18 / 1.98892e30) * 100 * 365.25 * 86400;
		expect((b.dv - a.dv) / expected).toBeGreaterThan(0.9);
		expect((b.dv - a.dv) / expected).toBeLessThan(1.1);
	});

	it('formats science units', async () => {
		const { formatSci, formatFlops, formatDisplacement } = await import('../metrics');
		expect(formatSci(3.2e18)).toBe('3.2×10¹⁸');
		expect(formatSci(1.7e-12)).toBe('1.7×10⁻¹²');
		expect(formatFlops(3.9e28)).toBe('39.0 RFLOPS');
		expect(formatDisplacement(1.5e11)).toBe('1.00 AU');
	});
});
