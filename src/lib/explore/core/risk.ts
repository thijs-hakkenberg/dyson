/**
 * Risk & validation lens.
 *
 * Risk score (0–1) per BOM item is a transparent heuristic, shown with its
 * components so nobody mistakes it for an assessment:
 *   technology  0.6 × max over linked TRL assessments of
 *                     severity(riskIfFail) × (target − current) / target
 *   cost        0.25 × cost-confidence penalty (low 1, medium 0.5, high 0.2)
 *   spread      0.15 × min(1, log10(costMax / costMin))
 * Items without a TRL assessment are "unassessed" (technology term unknown),
 * not "safe".
 *
 * Validation beacons come from src/content/validations (claims with status
 * and per-entry confidence).
 */

import type { BOMItem } from '$lib/types';
import { getAssessmentsForBOM, type TRLAssessment } from '$lib/services/trl-assessment';
import type { ValidatedClaim } from '$lib/types/validation';

export const SEVERITY: Record<TRLAssessment['riskIfFail'], number> = {
	'project-ending': 1,
	'architecture-change': 0.75,
	'schedule-delay': 0.5,
	'cost-increase': 0.3
};

const CONFIDENCE_PENALTY: Record<string, number> = { low: 1, medium: 0.5, high: 0.2 };
export const W = { technology: 0.6, cost: 0.25, spread: 0.15 };

export interface RiskBreakdown {
	bomId: string;
	score: number;
	technology: number | null;
	cost: number;
	spread: number;
	/** Technology driving the technology term */
	driver?: TRLAssessment;
	assessed: boolean;
}

export function riskFor(bom: BOMItem, trls: TRLAssessment[] = getAssessmentsForBOM(bom.id)): RiskBreakdown {
	let technology: number | null = null;
	let driver: TRLAssessment | undefined;
	for (const t of trls) {
		const gap = Math.max(0, t.targetTRL - t.currentTRL) / Math.max(1, t.targetTRL);
		const v = SEVERITY[t.riskIfFail] * gap;
		if (technology === null || v > technology) {
			technology = v;
			driver = t;
		}
	}
	const cost = CONFIDENCE_PENALTY[bom.costConfidence ?? ''] ?? 0.6;
	const spread =
		bom.costMin && bom.costMax && bom.costMin > 0
			? Math.min(1, Math.max(0, Math.log10(bom.costMax / bom.costMin)))
			: 0.5;
	const score = W.technology * (technology ?? 0) + W.cost * cost + W.spread * spread;
	return { bomId: bom.id, score, technology, cost, spread, driver, assessed: technology !== null };
}

/** Green → amber → red for a 0–1 score. */
export function riskColor(score: number): string {
	const s = Math.max(0, Math.min(1, score));
	const hue = 140 - 140 * Math.min(1, s / 0.7);
	return `hsl(${hue.toFixed(0)}, 80%, 55%)`;
}

export const VALIDATION_COLORS: Record<string, string> = {
	validated: '#34d399',
	'partially-validated': '#fbbf24',
	unvalidated: '#94a3b8',
	refuted: '#f87171',
	outdated: '#64748b'
};

/** Confidence of a claim = latest entry's confidence (0–100), or 0. */
export function claimConfidence(c: ValidatedClaim): number {
	const entries = [...(c.validations ?? [])].sort((a, b) => String(a.date).localeCompare(String(b.date)));
	return entries.at(-1)?.confidence ?? 0;
}
