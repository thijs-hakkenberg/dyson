/**
 * Projected construction timeline, derived from the phase definitions in
 * content.ts (estimatedDuration + dependencies). Nothing here is a schedule
 * commitment: the HUD labels the start year as an assumption and shows the
 * optimistic/pessimistic envelope implied by the duration ranges.
 */

import { PHASES } from '$lib/services/content';
import type { Phase } from '$lib/types';

/** Assumed start of Phase 0 hardware activity. Labelled as such in the HUD. */
export const ASSUMED_PHASE0_START = 2030;

export interface PhaseWindow {
	id: string;
	label: string;
	title: string;
	/** Duration range in years, parsed from estimatedDuration */
	durationMin: number;
	durationMax: number;
	/** Nominal window (durations at range midpoint) */
	start: number;
	end: number;
	/** Envelope: earliest start/end (all minima) and latest (all maxima) */
	startMin: number;
	startMax: number;
	endMin: number;
	endMax: number;
	parallelWith: string[];
}

export function parseDuration(s: string): [number, number] {
	const m = s.match(/(\d+(?:\.\d+)?)\s*(?:-|–|to)\s*(\d+(?:\.\d+)?)/);
	if (m) return [Number(m[1]), Number(m[2])];
	const single = s.match(/(\d+(?:\.\d+)?)/);
	if (single) return [Number(single[1]), Number(single[1])];
	throw new Error(`Unparseable duration: "${s}"`);
}

export function phaseLabel(p: Phase): string {
	return `P${p.number}${p.suffix ?? ''}`;
}

export function buildTimeline(phases: Phase[] = PHASES, start = ASSUMED_PHASE0_START): PhaseWindow[] {
	const byId = new Map<string, PhaseWindow>();
	const pending = [...phases];
	while (pending.length) {
		const idx = pending.findIndex((p) => p.dependencies.every((d) => byId.has(d)));
		if (idx < 0) throw new Error('Cyclic or missing phase dependency');
		const p = pending.splice(idx, 1)[0];
		const [dMin, dMax] = parseDuration(p.estimatedDuration);
		const deps = p.dependencies.map((d) => byId.get(d)!);
		const s = deps.length ? Math.max(...deps.map((d) => d.end)) : start;
		const sMin = deps.length ? Math.max(...deps.map((d) => d.endMin)) : start;
		const sMax = deps.length ? Math.max(...deps.map((d) => d.endMax)) : start;
		byId.set(p.id, {
			id: p.id,
			label: phaseLabel(p),
			title: p.title,
			durationMin: dMin,
			durationMax: dMax,
			start: s,
			end: s + (dMin + dMax) / 2,
			startMin: sMin,
			startMax: sMax,
			endMin: sMin + dMin,
			endMax: sMax + dMax,
			parallelWith: p.parallelWith ?? []
		});
	}
	return phases.map((p) => byId.get(p.id)!);
}

export const TIMELINE = buildTimeline();

export function phaseWindow(id: string): PhaseWindow | undefined {
	return TIMELINE.find((w) => w.id === id);
}

/**
 * Deployment fraction (0..1) of a phase at a given year, nominal window.
 * Modelled as a logistic S-curve — the growth shape expected from
 * bootstrapped/self-replicating manufacturing. Labelled as an assumption.
 */
export function deploymentFraction(id: string, year: number, steepness = 10): number {
	const w = phaseWindow(id);
	if (!w) return 0;
	if (year <= w.start) return 0;
	if (year >= w.end) return 1;
	const x = (year - w.start) / (w.end - w.start);
	const f = (u: number) => 1 / (1 + Math.exp(-steepness * (u - 0.5)));
	return (f(x) - f(0)) / (f(1) - f(0));
}

/** Phases whose nominal window has started at a given year. */
export function activePhases(year: number): PhaseWindow[] {
	return TIMELINE.filter((w) => year >= w.start);
}

// ---------------------------------------------------------------------------
// Scrubber axis. The timeline spans ~1 millennium but the near-term phases
// are short, so the axis is piecewise-linear between phase boundaries with
// fixed visual weights. Tick labels always show true years.
// ---------------------------------------------------------------------------

export interface AxisSegment {
	from: number;
	to: number;
	weight: number;
}

export function buildAxis(today: number, timeline: PhaseWindow[] = TIMELINE): AxisSegment[] {
	const get = (id: string) => timeline.find((w) => w.id === id)!;
	const end3 = Math.max(...timeline.filter((w) => w.id.startsWith('phase-3')).map((w) => w.end));
	const anchors = [
		Math.min(today, get('phase-0').start),
		get('phase-0').start,
		get('phase-0').end,
		get('phase-1').end,
		get('phase-2').end,
		get('phase-3b').end,
		end3
	];
	const weights = [0.05, 0.17, 0.2, 0.22, 0.18, 0.18];
	const segs: AxisSegment[] = [];
	for (let k = 0; k < weights.length; k++) {
		if (anchors[k + 1] > anchors[k]) segs.push({ from: anchors[k], to: anchors[k + 1], weight: weights[k] });
	}
	const total = segs.reduce((s, x) => s + x.weight, 0);
	segs.forEach((s) => (s.weight /= total));
	return segs;
}

export function yearToAxis(year: number, axis: AxisSegment[]): number {
	let acc = 0;
	for (const s of axis) {
		if (year <= s.to) return acc + (Math.max(0, year - s.from) / (s.to - s.from)) * s.weight;
		acc += s.weight;
	}
	return 1;
}

export function axisToYear(u: number, axis: AxisSegment[]): number {
	let acc = 0;
	for (const s of axis) {
		if (u <= acc + s.weight) return s.from + ((u - acc) / s.weight) * (s.to - s.from);
		acc += s.weight;
	}
	return axis[axis.length - 1].to;
}
