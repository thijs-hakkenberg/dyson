/**
 * Cost Analysis Types
 *
 * Type definitions for cost reconciliation analysis between different LLM models.
 */

/**
 * A single cost line item extracted from a spec document
 */
export interface CostLineItem {
	/** Description or name of the cost item */
	item: string;
	/** The cost value in dollars */
	cost: number;
	/** The unit (e.g., "per unit", "total", "M$", "B$") */
	unit: string;
	/** Source location in the document (e.g., section name) */
	source: string;
	/** The original string representation of the cost */
	originalString?: string;
}

/**
 * Cost breakdown by category from a model specification
 */
export interface ModelCostBreakdown {
	/** The model ID (e.g., "claude-opus-4-5") */
	modelId: string;
	/** The model display name */
	modelName: string;
	/** Total cost estimate from this model */
	total: number;
	/** Individual cost line items */
	items: CostLineItem[];
	/** Development costs subtotal (if available) */
	developmentCost?: number;
	/** Production costs subtotal (if available) */
	productionCost?: number;
	/** Operations costs subtotal (if available) */
	operationsCost?: number;
	/** Per-unit cost (if applicable) */
	perUnitCost?: number;
}

/**
 * Comparison of costs across multiple models for a single BOM item
 */
export interface ModelCostComparison {
	/** The BOM item being compared */
	bomItem: {
		bomId: string;
		slug: string;
		name: string;
	};
	/** The phase this item belongs to */
	phaseId: string;
	/** Cost breakdowns from each model */
	models: ModelCostBreakdown[];
	/** Consensus/baseline cost (from bom-data.ts) */
	baselineCost?: number;
	/** Average cost across all models */
	averageCost: number;
	/** Minimum cost estimate */
	minCost: number;
	/** Maximum cost estimate */
	maxCost: number;
	/** Cost range as a percentage of average */
	rangePercent: number;
}

/**
 * A discrepancy identified between model cost estimates
 */
export interface Discrepancy {
	/** The BOM item where discrepancy was found */
	bomItem: {
		bomId: string;
		slug: string;
		name: string;
	};
	/** The phase this item belongs to */
	phaseId: string;
	/** The specific topic/category of disagreement */
	topic: string;
	/** First model in comparison */
	modelA: {
		modelId: string;
		modelName: string;
		cost: number;
	};
	/** Second model in comparison */
	modelB: {
		modelId: string;
		modelName: string;
		cost: number;
	};
	/** Absolute difference in dollars */
	difference: number;
	/** Percentage difference (relative to lower value) */
	percentDiff: number;
	/** Ratio between higher and lower value */
	ratio: number;
	/** Severity level based on magnitude of discrepancy */
	severity: 'minor' | 'moderate' | 'major' | 'critical';
}

/**
 * Summary statistics for a reconciliation report
 */
export interface ReconciliationSummary {
	/** Total number of BOM items analyzed */
	totalItems: number;
	/** Number of items with complete data from all models */
	itemsWithFullData: number;
	/** Number of items with discrepancies above threshold */
	itemsWithDiscrepancies: number;
	/** Number of critical (order of magnitude) discrepancies */
	criticalDiscrepancies: number;
	/** Number of major discrepancies (>100% difference) */
	majorDiscrepancies: number;
	/** Number of moderate discrepancies (50-100% difference) */
	moderateDiscrepancies: number;
	/** Number of minor discrepancies (<50% difference) */
	minorDiscrepancies: number;
	/** Average cost variance across all items */
	averageVariance: number;
	/** Total cost range (max - min) across all items */
	totalCostRange: {
		min: number;
		max: number;
		average: number;
	};
}

/**
 * Complete reconciliation report for a phase or all phases
 */
export interface ReconciliationReport {
	/** The phase ID, or 'all' for cross-phase report */
	phaseId: string;
	/** When the report was generated */
	generatedAt: string;
	/** All model cost comparisons */
	comparisons: ModelCostComparison[];
	/** All identified discrepancies */
	discrepancies: Discrepancy[];
	/** Summary statistics */
	summary: ReconciliationSummary;
}

/**
 * Result of extracting costs from a spec document
 */
export interface ExtractedCosts {
	/** Individual line items found */
	items: CostLineItem[];
	/** Total cost if explicitly stated */
	total?: number;
	/** Whether extraction was successful */
	success: boolean;
	/** Any warnings or notes about extraction */
	warnings?: string[];
}
