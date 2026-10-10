/**
 * Point-cloud layers. At true scale, individual collectors are far below a
 * pixel, so swarms render as markers with a fixed screen size and a stated
 * sampling ratio (1 marker = N units). Scene and HUD share these specs so the
 * ratio shown is exactly what is drawn.
 */

import { getEntity } from './registry';
import { itemProgress } from './progress';
import type { Anchor } from './placements';

export interface CloudSpec {
	bomId: string;
	/** Maximum markers rendered */
	cap: number;
	seed: number;
	size: number;
	opacity: number;
}

export const CLOUDS: CloudSpec[] = [
	{ bomId: 'bom-1-1', cap: 1000, seed: 11, size: 2.2, opacity: 0.9 },
	{ bomId: 'bom-2-1', cap: 20000, seed: 21, size: 1.6, opacity: 0.7 },
	{ bomId: 'bom-3a-4', cap: 1000, seed: 34, size: 2, opacity: 0.8 },
	{ bomId: 'bom-3b-3', cap: 3000, seed: 33, size: 1.2, opacity: 0.45 },
	{ bomId: 'bom-3b-4', cap: 1000, seed: 34, size: 1.8, opacity: 0.8 }
];

export function cloudBand(spec: CloudSpec): Extract<Anchor, { kind: 'band' }> {
	const a = getEntity(spec.bomId)?.placement?.anchor;
	if (!a || a.kind !== 'band') throw new Error(`Cloud ${spec.bomId} needs a band anchor`);
	return a;
}

export function cloudCounts(spec: CloudSpec, year: number) {
	const e = getEntity(spec.bomId)!;
	const represented = (e.bom?.quantity ?? 0) * itemProgress(spec.bomId, e.phaseId!, year);
	const rendered = Math.round(Math.min(spec.cap, represented));
	return {
		represented,
		rendered,
		ratio: rendered > 0 ? represented / rendered : 0,
		unit: e.bom?.unit ?? ''
	};
}
