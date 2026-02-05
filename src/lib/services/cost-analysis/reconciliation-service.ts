/**
 * Reconciliation Service
 *
 * Provides functions for comparing and reconciling cost estimates across LLM models.
 */

import type {
	ModelCostComparison,
	ModelCostBreakdown,
	Discrepancy,
	ReconciliationReport,
	ReconciliationSummary
} from '$lib/types/cost-analysis';
import { getAllBOMItemsForPhase, getBOMItemBySlug, LLM_MODELS, type BOMItemMeta } from '$lib/services/bom';
import { fetchBOMSpec } from '$lib/services/bom';
import { extractCostFromSpec, extractCostCategories, parseCostString } from './cost-parser';

/**
 * Compare costs across all models for a single BOM item
 * @param bomItemSlug - The BOM item slug
 * @param phaseId - The phase ID
 * @returns Cost comparison across models
 */
export async function compareCostsAcrossModels(
	bomItemSlug: string,
	phaseId: string
): Promise<ModelCostComparison | null> {
	const itemMeta = getBOMItemBySlug(bomItemSlug, phaseId);
	if (!itemMeta) return null;

	const modelIds = Object.keys(LLM_MODELS);
	const modelBreakdowns: ModelCostBreakdown[] = [];

	for (const modelId of modelIds) {
		const spec = await fetchBOMSpec(phaseId, bomItemSlug, modelId);
		if (!spec) continue;

		const extracted = extractCostFromSpec(spec.content);
		const categories = extractCostCategories(spec.content);

		modelBreakdowns.push({
			modelId,
			modelName: spec.modelName,
			total: extracted.total || 0,
			items: extracted.items,
			developmentCost: categories.development,
			productionCost: categories.production,
			operationsCost: categories.operations,
			perUnitCost: categories.perUnit
		});
	}

	if (modelBreakdowns.length === 0) {
		return null;
	}

	const totals = modelBreakdowns.map((m) => m.total).filter((t) => t > 0);
	const minCost = totals.length > 0 ? Math.min(...totals) : 0;
	const maxCost = totals.length > 0 ? Math.max(...totals) : 0;
	const averageCost = totals.length > 0 ? totals.reduce((a, b) => a + b, 0) / totals.length : 0;
	const rangePercent = averageCost > 0 ? ((maxCost - minCost) / averageCost) * 100 : 0;

	// Get baseline from bom-data
	const baselineCost = itemMeta.cost ? parseCostString(itemMeta.cost) : undefined;

	return {
		bomItem: {
			bomId: itemMeta.bomId,
			slug: itemMeta.slug,
			name: itemMeta.name
		},
		phaseId,
		models: modelBreakdowns,
		baselineCost: isNaN(baselineCost || NaN) ? undefined : baselineCost,
		averageCost,
		minCost,
		maxCost,
		rangePercent
	};
}

/**
 * Find discrepancies between models that exceed a threshold
 * @param comparison - The model cost comparison
 * @param threshold - Percentage threshold for discrepancy (default 50%)
 * @returns Array of discrepancies
 */
export function findDiscrepancies(
	comparison: ModelCostComparison,
	threshold: number = 50
): Discrepancy[] {
	const discrepancies: Discrepancy[] = [];
	const models = comparison.models.filter((m) => m.total > 0);

	// Compare each pair of models
	for (let i = 0; i < models.length; i++) {
		for (let j = i + 1; j < models.length; j++) {
			const modelA = models[i];
			const modelB = models[j];

			// Compare totals
			const discrepancy = createDiscrepancy(
				comparison.bomItem,
				comparison.phaseId,
				'Total Cost',
				modelA,
				modelB,
				modelA.total,
				modelB.total
			);

			if (discrepancy && discrepancy.percentDiff >= threshold) {
				discrepancies.push(discrepancy);
			}

			// Compare development costs if available
			if (modelA.developmentCost && modelB.developmentCost) {
				const devDiscrepancy = createDiscrepancy(
					comparison.bomItem,
					comparison.phaseId,
					'Development Cost',
					modelA,
					modelB,
					modelA.developmentCost,
					modelB.developmentCost
				);
				if (devDiscrepancy && devDiscrepancy.percentDiff >= threshold) {
					discrepancies.push(devDiscrepancy);
				}
			}

			// Compare production costs if available
			if (modelA.productionCost && modelB.productionCost) {
				const prodDiscrepancy = createDiscrepancy(
					comparison.bomItem,
					comparison.phaseId,
					'Production Cost',
					modelA,
					modelB,
					modelA.productionCost,
					modelB.productionCost
				);
				if (prodDiscrepancy && prodDiscrepancy.percentDiff >= threshold) {
					discrepancies.push(prodDiscrepancy);
				}
			}

			// Compare per-unit costs if available
			if (modelA.perUnitCost && modelB.perUnitCost) {
				const unitDiscrepancy = createDiscrepancy(
					comparison.bomItem,
					comparison.phaseId,
					'Per-Unit Cost',
					modelA,
					modelB,
					modelA.perUnitCost,
					modelB.perUnitCost
				);
				if (unitDiscrepancy && unitDiscrepancy.percentDiff >= threshold) {
					discrepancies.push(unitDiscrepancy);
				}
			}
		}
	}

	return discrepancies;
}

/**
 * Create a discrepancy object from two cost values
 */
function createDiscrepancy(
	bomItem: ModelCostComparison['bomItem'],
	phaseId: string,
	topic: string,
	modelA: ModelCostBreakdown,
	modelB: ModelCostBreakdown,
	costA: number,
	costB: number
): Discrepancy | null {
	if (costA <= 0 || costB <= 0) return null;

	const difference = Math.abs(costA - costB);
	const lowerCost = Math.min(costA, costB);
	const higherCost = Math.max(costA, costB);
	const percentDiff = (difference / lowerCost) * 100;
	const ratio = higherCost / lowerCost;

	// Determine severity
	let severity: Discrepancy['severity'];
	if (ratio >= 10) {
		severity = 'critical';
	} else if (percentDiff >= 100) {
		severity = 'major';
	} else if (percentDiff >= 50) {
		severity = 'moderate';
	} else {
		severity = 'minor';
	}

	return {
		bomItem,
		phaseId,
		topic,
		modelA: {
			modelId: modelA.modelId,
			modelName: modelA.modelName,
			cost: costA
		},
		modelB: {
			modelId: modelB.modelId,
			modelName: modelB.modelName,
			cost: costB
		},
		difference,
		percentDiff,
		ratio,
		severity
	};
}

/**
 * Generate a complete reconciliation report for a phase
 * @param phaseId - The phase ID (or 'all' for all phases)
 * @returns Complete reconciliation report
 */
export async function generateReconciliationReport(
	phaseId: string
): Promise<ReconciliationReport> {
	const comparisons: ModelCostComparison[] = [];
	const allDiscrepancies: Discrepancy[] = [];

	// Get phases to analyze
	const phasesToAnalyze = phaseId === 'all' ? ['phase-0', 'phase-1', 'phase-2'] : [phaseId];

	for (const phase of phasesToAnalyze) {
		const items = getAllBOMItemsForPhase(phase);

		for (const item of items) {
			const comparison = await compareCostsAcrossModels(item.slug, phase);
			if (comparison) {
				comparisons.push(comparison);
				const discrepancies = findDiscrepancies(comparison);
				allDiscrepancies.push(...discrepancies);
			}
		}
	}

	// Calculate summary statistics
	const summary = calculateSummary(comparisons, allDiscrepancies);

	return {
		phaseId,
		generatedAt: new Date().toISOString(),
		comparisons,
		discrepancies: allDiscrepancies,
		summary
	};
}

/**
 * Get all discrepancies with order of magnitude differences (>10x)
 * @returns Array of critical discrepancies
 */
export async function getOrderOfMagnitudeDiscrepancies(): Promise<Discrepancy[]> {
	const report = await generateReconciliationReport('all');
	return report.discrepancies.filter((d) => d.ratio >= 10);
}

/**
 * Calculate summary statistics for a reconciliation report
 */
function calculateSummary(
	comparisons: ModelCostComparison[],
	discrepancies: Discrepancy[]
): ReconciliationSummary {
	const totalItems = comparisons.length;
	const itemsWithFullData = comparisons.filter(
		(c) => c.models.length === Object.keys(LLM_MODELS).length
	).length;
	const itemsWithDiscrepancies = new Set(discrepancies.map((d) => d.bomItem.bomId)).size;

	const criticalDiscrepancies = discrepancies.filter((d) => d.severity === 'critical').length;
	const majorDiscrepancies = discrepancies.filter((d) => d.severity === 'major').length;
	const moderateDiscrepancies = discrepancies.filter((d) => d.severity === 'moderate').length;
	const minorDiscrepancies = discrepancies.filter((d) => d.severity === 'minor').length;

	// Calculate average variance
	const variances = comparisons
		.filter((c) => c.averageCost > 0)
		.map((c) => c.rangePercent);
	const averageVariance =
		variances.length > 0 ? variances.reduce((a, b) => a + b, 0) / variances.length : 0;

	// Calculate total cost range
	const allTotals = comparisons.flatMap((c) => c.models.map((m) => m.total)).filter((t) => t > 0);
	const totalMin = allTotals.length > 0 ? Math.min(...allTotals) : 0;
	const totalMax = allTotals.length > 0 ? Math.max(...allTotals) : 0;
	const totalAverage =
		allTotals.length > 0 ? allTotals.reduce((a, b) => a + b, 0) / allTotals.length : 0;

	return {
		totalItems,
		itemsWithFullData,
		itemsWithDiscrepancies,
		criticalDiscrepancies,
		majorDiscrepancies,
		moderateDiscrepancies,
		minorDiscrepancies,
		averageVariance,
		totalCostRange: {
			min: totalMin,
			max: totalMax,
			average: totalAverage
		}
	};
}

/**
 * Get discrepancies filtered by severity
 * @param report - The reconciliation report
 * @param severity - The severity level to filter by
 * @returns Filtered discrepancies
 */
export function getDiscrepanciesBySeverity(
	report: ReconciliationReport,
	severity: Discrepancy['severity']
): Discrepancy[] {
	return report.discrepancies.filter((d) => d.severity === severity);
}

/**
 * Get discrepancies for a specific BOM item
 * @param report - The reconciliation report
 * @param bomId - The BOM item ID
 * @returns Discrepancies for the specified item
 */
export function getDiscrepanciesForItem(
	report: ReconciliationReport,
	bomId: string
): Discrepancy[] {
	return report.discrepancies.filter((d) => d.bomItem.bomId === bomId);
}

/**
 * Get cost comparison for a specific BOM item
 * @param report - The reconciliation report
 * @param bomId - The BOM item ID
 * @returns The cost comparison for the item, or undefined
 */
export function getComparisonForItem(
	report: ReconciliationReport,
	bomId: string
): ModelCostComparison | undefined {
	return report.comparisons.find((c) => c.bomItem.bomId === bomId);
}
