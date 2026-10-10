import { describe, it, expect } from 'vitest';
import {
	planetPositionEcliptic,
	planetElements,
	solveKepler,
	lagrangePosition,
	moonPosition,
	planetPosition,
	PLANET_IDS
} from '../ephemeris';
import { JD_J2000, yearToJD, blackbodyRGB, formatDistance } from '../units';
import {
	parseDuration,
	buildTimeline,
	deploymentFraction,
	buildAxis,
	yearToAxis,
	axisToYear,
	TIMELINE,
	ASSUMED_PHASE0_START
} from '../timeline';
import { PLACEMENTS, cascadeTemperature } from '../placements';
import { PHASES } from '$lib/services/content';

const deg = (rad: number) => ((rad * 180) / Math.PI + 360) % 360;
const norm = (v: number[]) => Math.hypot(...v);

describe('ephemeris', () => {
	it('solves Kepler equation', () => {
		for (const e of [0, 0.1, 0.5, 0.9]) {
			for (const M of [0.1, 1, 2, 3]) {
				const E = solveKepler(M, e);
				expect(E - e * Math.sin(E)).toBeCloseTo(M, 10);
			}
		}
	});

	it('places Earth at heliocentric longitude ~100.5° at J2000', () => {
		const [x, y] = planetPositionEcliptic('earth', JD_J2000);
		expect(deg(Math.atan2(y, x))).toBeCloseTo(100.4, 0);
	});

	it('keeps Earth between perihelion and aphelion', () => {
		for (let k = 0; k < 24; k++) {
			const r = norm(planetPositionEcliptic('earth', JD_J2000 + k * 15.2));
			expect(r).toBeGreaterThan(0.982);
			expect(r).toBeLessThan(1.018);
		}
	});

	it('places Jupiter near longitude ~36° at J2000', () => {
		const [x, y] = planetPositionEcliptic('jupiter', JD_J2000);
		expect(Math.abs(deg(Math.atan2(y, x)) - 36.3)).toBeLessThan(1.5);
	});

	it('returns to the same position after one Mars sidereal period', () => {
		const p0 = planetPositionEcliptic('mars', JD_J2000);
		const p1 = planetPositionEcliptic('mars', JD_J2000 + 686.98);
		expect(norm(p0.map((v, i) => v - p1[i]))).toBeLessThan(0.01);
	});

	it('produces sensible semi-major axes for all planets through year 2800', () => {
		const expected = [0.387, 0.723, 1.0, 1.524, 5.2, 9.55, 19.2, 30.1];
		PLANET_IDS.forEach((id, k) => {
			expect(planetElements(id, yearToJD(2800)).a).toBeCloseTo(expected[k], 1);
		});
	});

	it('maps ecliptic north to scene +Y', () => {
		const [, ey, ez] = planetPositionEcliptic('mercury', JD_J2000);
		const [, sy, sz] = planetPosition('mercury', 2000);
		expect(sy).toBeCloseTo(ez, 6);
		expect(sz).toBeCloseTo(-ey, 6);
	});

	it('puts Sun–Earth L1 ~0.01 AU sunward of Earth and L4 60° ahead', () => {
		const e = planetPosition('earth', 2030);
		const l1 = lagrangePosition('earth', 'L1', 2030);
		expect(norm(e) - norm(l1)).toBeCloseTo(0.01, 2);
		const l4 = lagrangePosition('earth', 'L4', 2030);
		const cos = (e[0] * l4[0] + e[2] * l4[2]) / (Math.hypot(e[0], e[2]) * Math.hypot(l4[0], l4[2]));
		expect(Math.acos(cos) * (180 / Math.PI)).toBeCloseTo(60, 0);
	});

	it('keeps the Moon ~384,400 km from Earth', () => {
		const e = planetPosition('earth', 2031.3);
		const m = moonPosition(2031.3);
		const km = norm(m.map((v, i) => v - e[i])) * 1.495978707e8;
		expect(km).toBeCloseTo(384_400, -2);
	});
});

describe('units', () => {
	it('gives a hot blackbody a blue-white tint and a cool one red', () => {
		const [r1, , b1] = blackbodyRGB(10000);
		expect(b1).toBeGreaterThan(0.9);
		expect(r1).toBeLessThan(1);
		const [r2, , b2] = blackbodyRGB(1500);
		expect(r2).toBe(1);
		expect(b2).toBeLessThan(0.2);
	});

	it('formats distances in natural units', () => {
		expect(formatDistance(1)).toBe('1.00 AU');
		expect(formatDistance(384400 / 1.495978707e8)).toBe('384,000 km');
		expect(formatDistance(0.05)).toBe('7.48 M km');
	});
});

describe('timeline', () => {
	it('parses duration ranges', () => {
		expect(parseDuration('10-15 years')).toEqual([10, 15]);
		expect(parseDuration('200–1000 years')).toEqual([200, 1000]);
		expect(parseDuration('about 5 years')).toEqual([5, 5]);
	});

	it('derives one window per phase, chained by dependencies', () => {
		expect(TIMELINE).toHaveLength(PHASES.length);
		const p0 = TIMELINE.find((w) => w.id === 'phase-0')!;
		const p1 = TIMELINE.find((w) => w.id === 'phase-1')!;
		expect(p0.start).toBe(ASSUMED_PHASE0_START);
		expect(p1.start).toBe(p0.end);
		expect(p1.startMin).toBe(p0.endMin);
		expect(p1.startMax).toBe(p0.endMax);
	});

	it('starts parallel phases 3a and 3b together', () => {
		const a = TIMELINE.find((w) => w.id === 'phase-3a')!;
		const b = TIMELINE.find((w) => w.id === 'phase-3b')!;
		expect(a.start).toBe(b.start);
	});

	it('rejects cyclic dependencies', () => {
		const cyc = PHASES.slice(0, 2).map((p, i) => ({
			...p,
			dependencies: [PHASES[1 - i].id]
		}));
		expect(() => buildTimeline(cyc)).toThrow();
	});

	it('ramps deployment monotonically from 0 to 1', () => {
		const w = TIMELINE.find((w) => w.id === 'phase-1')!;
		expect(deploymentFraction('phase-1', w.start - 1)).toBe(0);
		expect(deploymentFraction('phase-1', w.end + 1)).toBe(1);
		let prev = 0;
		for (let k = 1; k < 20; k++) {
			const f = deploymentFraction('phase-1', w.start + ((w.end - w.start) * k) / 20);
			expect(f).toBeGreaterThanOrEqual(prev);
			prev = f;
		}
	});

	it('round-trips years through the scrubber axis', () => {
		const axis = buildAxis(2026.8);
		expect(axis.reduce((s, a) => s + a.weight, 0)).toBeCloseTo(1, 10);
		for (const y of [2026.8, 2035, 2060, 2100, 2300, 2700]) {
			expect(axisToYear(yearToAxis(y, axis), axis)).toBeCloseTo(y, 6);
		}
	});
});

describe('placements', () => {
	const bomIds = new Set(PHASES.flatMap((p) => p.bom.map((b) => b.id)));
	const slugs = new Map(PHASES.flatMap((p) => p.bom.map((b) => [b.id, b.slug] as const)));

	it('covers every BOM item exactly once', () => {
		expect(new Set(PLACEMENTS.map((p) => p.bomId))).toEqual(bomIds);
		expect(PLACEMENTS).toHaveLength(bomIds.size);
	});

	it('uses the same slug as content.ts', () => {
		for (const p of PLACEMENTS) expect(p.slug).toBe(slugs.get(p.bomId));
	});

	it('only renders items that have an anchor', () => {
		for (const p of PLACEMENTS) if (p.visual !== 'none') expect(p.anchor).toBeDefined();
	});

	it('interpolates the thermal cascade between consensus endpoints', () => {
		expect(cascadeTemperature(0.5)).toBeCloseTo(1200, 6);
		expect(cascadeTemperature(25)).toBeCloseTo(20, 6);
		expect(cascadeTemperature(2.5)).toBeLessThan(cascadeTemperature(1));
	});
});

describe('phase emphasis', async () => {
	const { phaseEmphasis, SUPERSEDED_OPACITY } = await import('../progress');
	const { phaseWindow } = await import('../timeline');
	const p2 = phaseWindow('phase-2')!;
	const p3a = phaseWindow('phase-3a')!;

	it('keeps the frontier at full strength and fades superseded phases', () => {
		expect(phaseEmphasis('phase-1', (p2.start + p2.end) / 2)).toBeCloseTo(SUPERSEDED_OPACITY, 6);
		expect(phaseEmphasis('phase-2', (p2.start + p2.end) / 2)).toBe(1);
		expect(phaseEmphasis('phase-2', p3a.start + 0.5 * (p3a.end - p3a.start))).toBeCloseTo(SUPERSEDED_OPACITY, 6);
	});

	it('eases in, never fades parallel phases, and honours selection', () => {
		const early = phaseEmphasis('phase-2', p3a.start + 0.02 * (p3a.end - p3a.start));
		expect(early).toBeGreaterThan(SUPERSEDED_OPACITY);
		expect(early).toBeLessThan(1);
		const late = p3a.start + 0.6 * (p3a.end - p3a.start);
		expect(phaseEmphasis('phase-3a', late)).toBe(1);
		expect(phaseEmphasis('phase-3b', late)).toBe(1);
		expect(phaseEmphasis('phase-1', late, 'phase-1')).toBe(1);
	});
});
