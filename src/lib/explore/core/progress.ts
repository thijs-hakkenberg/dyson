/**
 * Per-item deployment progress. Items within a phase ramp up over a
 * sub-window of the phase (e.g. prospecting precedes mining). Sub-windows are
 * an ordering assumption for visualisation, not a schedule.
 */

import { TIMELINE, deploymentFraction, phaseWindow } from './timeline';

/** Sub-window [from, to] as fractions of the phase window. */
const STAGES: Record<string, [number, number]> = {
	'bom-0-1': [0, 0.35], // prospecting first
	'bom-0-12': [0.1, 0.45], // 0A pathfinder before KDP-0B
	'bom-0-3': [0.15, 0.6],
	'bom-0-2': [0.3, 0.8],
	'bom-0-6': [0.35, 0.85],
	'bom-0-4': [0.4, 1],
	'bom-0-13': [0.45, 0.8], // receiving node before the first product arrives
	'bom-1-4': [0, 0.3], // assembly node before collectors
	'bom-1-5': [0.05, 0.45],
	'bom-1-1': [0.2, 1]
};

export function itemProgress(bomId: string, phaseId: string, year: number): number {
	const stage = STAGES[bomId];
	if (!stage) return deploymentFraction(phaseId, year);
	const w = phaseWindow(phaseId);
	if (!w) return 0;
	const span = w.end - w.start;
	const s = w.start + stage[0] * span;
	const e = w.start + stage[1] * span;
	if (year <= s) return 0;
	if (year >= e) return 1;
	const x = (year - s) / (e - s);
	return x * x * (3 - 2 * x); // smoothstep
}

/** Progress of shell layer k of n within Phase 3a: inner layers first. */
export function shellProgress(k: number, n: number, year: number): number {
	const w = phaseWindow('phase-3a');
	if (!w) return 0;
	const span = w.end - w.start;
	const s = w.start + span * (0.05 + (0.5 * k) / Math.max(1, n - 1));
	const e = s + span * 0.45;
	if (year <= s) return 0;
	if (year >= e) return 1;
	const x = (year - s) / (e - s);
	return x * x * (3 - 2 * x);
}

export function phaseStarted(phaseId: string, year: number): boolean {
	const w = phaseWindow(phaseId);
	return !!w && year >= w.start;
}

/** A phase is "in focus" while it is being built, or when one of its items is selected. */
export function phaseInFocus(phaseId: string, year: number, selectedPhaseId?: string): boolean {
	const w = phaseWindow(phaseId);
	if (!w) return false;
	return selectedPhaseId === phaseId || (year >= w.start && year < w.end);
}

/** Opacity factor for superseded phases once a later phase is under way. */
export const SUPERSEDED_OPACITY = 0.18;

/**
 * Emphasis (0..1) for a phase layer: full while it is the construction
 * frontier, easing down to SUPERSEDED_OPACITY over the first 15% of the next
 * phase to start. Parallel phases (equal start) don't fade each other, and a
 * phase containing the selected item always stays at full strength.
 */
export function phaseEmphasis(phaseId: string, year: number, selectedPhaseId?: string): number {
	if (selectedPhaseId === phaseId) return 1;
	const w = phaseWindow(phaseId);
	if (!w || year < w.start) return 1;
	let k = 0;
	for (const t of TIMELINE) {
		if (t.start <= w.start || year < t.start) continue;
		const x = Math.min(1, (year - t.start) / (0.15 * (t.end - t.start)));
		k = Math.max(k, x * x * (3 - 2 * x));
	}
	return 1 - (1 - SUPERSEDED_OPACITY) * k;
}
