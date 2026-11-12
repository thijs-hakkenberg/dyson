/**
 * Phase 0 BOM after the October 2026 re-assessment, built by scripts/build-bom-data.js from
 * reconciliation/phase-0/bom-structure.yaml (owner decision) and bom-numbers.yaml (regenerated
 * consensus). content.ts and bom-data.ts both map from here, so they cannot drift apart.
 *
 * Every cost is an envelope; `point` is the consensus planning value, or the midpoint where the
 * consensus states none (`pointIsMidpoint`). 0A is committed, 0B is the gated option (D-01).
 */
import data from '$lib/data/phase-0-bom.json';
import type { BOMItem, CostConfidenceLevel } from '$lib/types';
import type { BOMItemMeta } from './bom/bom-data';

export interface CostEnvelope {
	min: number;
	max: number;
	point: number;
	pointIsMidpoint?: boolean;
	/** set when the item is flown only in some cases; min is then 0 */
	conditional?: string;
	ifExercised?: { min: number; max: number };
	derivation?: string;
	rate?: [number, number];
	ratePoint?: number;
	note?: string;
}

export interface Phase0BomItem {
	bomId: string;
	slug: string;
	name: string;
	category: string;
	subPhase: string;
	scope: string;
	quantity: { value: number; unit: string; range?: string; note?: string; per_unit?: boolean };
	unitCost?: { min: number; max: number };
	a: CostEnvelope;
	b: CostEnvelope;
	total: Pick<CostEnvelope, 'min' | 'max' | 'point'>;
	costConfidence: CostConfidenceLevel;
	source: string;
}

type Totals = Record<'a' | 'b' | 'all', Pick<CostEnvelope, 'min' | 'max' | 'point'>>;

export const PHASE_0_BOM = data as unknown as {
	structureDecided: string;
	consensusGenerated: string;
	panel: string[];
	sources: { structure: string; numbers: string };
	items: Phase0BomItem[];
	totals: { base: Totals; contingency: Record<'a' | 'b', CostEnvelope>; withContingency: Totals };
	removed: string[];
	notAdopted: { item: string; reason: string }[];
};

export const PHASE_0_TOTALS = PHASE_0_BOM.totals.withContingency;

function money(x: number): string {
	if (x === 0) return '$0';
	if (x >= 1e9) return `$${+(x / 1e9).toFixed(x >= 1e10 ? 0 : 1)}B`;
	return `$${+(x / 1e6).toFixed(x >= 1e8 ? 0 : 1)}M`;
}

export function moneyRange({ min, max }: { min: number; max: number }): string {
	return min === max ? money(min) : `${money(min)}–${money(max)}`;
}

function quantityLabel(i: Phase0BomItem): { quantity: number; unit: string } {
	const q = i.quantity;
	const range = q.range ? ` (${q.range})` : '';
	if (q.per_unit === false) return { quantity: 1, unit: `lot — ${q.value.toLocaleString('en-US')} ${q.unit}${range}` };
	return { quantity: q.value, unit: `${q.unit}${range}` };
}

export function costBasis(i: Phase0BomItem): string {
	const a = `0A ${moneyRange(i.a)} committed`;
	const b = i.b.max === 0 ? '0B none' : `0B ${moneyRange(i.b)} gated${i.b.conditional ? ` (${i.b.conditional})` : ''}`;
	const mid = i.a.pointIsMidpoint || i.b.pointIsMidpoint ? ' Expected value uses the range midpoint where the consensus gives no planning point.' : '';
	return `${a} · ${b}. Regenerated consensus ${PHASE_0_BOM.consensusGenerated}: ${i.source}.${mid}`;
}

/** Phase 0 rows for content.ts (PHASES[0].bom) */
export function phase0BomItems(): BOMItem[] {
	return PHASE_0_BOM.items.map((i) => {
		const { quantity, unit } = quantityLabel(i);
		return {
			id: i.bomId,
			name: i.name,
			description: i.scope,
			quantity,
			unit,
			unitCost: i.unitCost ? (i.unitCost.min + i.unitCost.max) / 2 : i.total.point / quantity,
			totalCost: i.total.point,
			category: i.category,
			notes: i.quantity.note,
			slug: i.slug,
			costMin: i.total.min,
			costMax: i.total.max,
			costConfidence: i.costConfidence,
			costBasis: costBasis(i)
		};
	});
}

/** Phase 0 rows for bom-data.ts (string-formatted metadata) */
export function phase0BomMeta(): BOMItemMeta[] {
	return PHASE_0_BOM.items.map((i) => {
		const { quantity, unit } = quantityLabel(i);
		return {
			bomId: i.bomId,
			slug: i.slug,
			name: i.name,
			quantity: `${quantity.toLocaleString('en-US')} ${unit}`,
			cost: money(i.total.point),
			category: i.category,
			costMin: money(i.total.min),
			costMax: money(i.total.max),
			costConfidence: i.costConfidence,
			costBasis: costBasis(i)
		};
	});
}
