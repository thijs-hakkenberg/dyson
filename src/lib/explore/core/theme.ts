/** Shared colour language for the explorer (scene + HUD). */

import type { ModelName } from './placements';

export const PHASE_COLORS: Record<string, string> = {
	'phase-0': '#f0a830',
	'phase-1': '#22d3ee',
	'phase-2': '#2dd4bf',
	'phase-3a': '#a78bfa',
	'phase-3b': '#fb7185'
};

export const MODEL_COLORS: Record<ModelName, string> = {
	Claude: '#e07a50',
	Gemini: '#5b8def',
	GPT: '#19c37d'
};

export const PLANET_COLORS: Record<string, string> = {
	mercury: '#9c9590',
	venus: '#e6cf9c',
	earth: '#4f86c6',
	mars: '#c1440e',
	jupiter: '#d8b48a',
	saturn: '#e3d29b',
	uranus: '#9fd8e0',
	neptune: '#4b70dd',
	moon: '#bdbdbd'
};

export const NEA_TYPE_COLORS: Record<string, string> = {
	C: '#6b7a8f',
	S: '#b59a72',
	M: '#c9d1d9',
	X: '#9b8ab8'
};

export const HUD = {
	accent: '#7dd3fc',
	dim: '#5b6b80',
	ghost: '#94a3b8'
};

/**
 * Colour for a Matrioshka layer temperature. ≥1000 K uses true blackbody
 * colour; colder (infrared-emitting) layers use a labelled false-colour ramp
 * from red (1000 K) to deep blue (10 K) on a log-temperature scale.
 */
export function cascadeColor(tempK: number, blackbody: (t: number) => [number, number, number]): string {
	if (tempK >= 1000) {
		const [r, g, b] = blackbody(tempK);
		return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
	}
	const u = Math.max(0, Math.min(1, Math.log(1000 / tempK) / Math.log(100)));
	const hue = 12 + u * (235 - 12);
	return `hsl(${hue.toFixed(0)}, 85%, ${(58 - u * 8).toFixed(0)}%)`;
}

/** Divergent-view priority (matches the inspector tags). */
export const PRIORITY_COLORS: Record<string, string> = {
	critical: '#f87171',
	high: '#fb923c',
	medium: '#fbbf24',
	low: '#94a3b8'
};

/** Research question status: answered = solid, investigating = live, open = haze. */
export const RQ_STATUS_COLORS: Record<string, string> = {
	answered: '#34d399',
	investigating: '#fbbf24',
	open: '#64748b'
};
