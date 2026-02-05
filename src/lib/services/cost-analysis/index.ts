/**
 * Cost Analysis Module
 *
 * Re-exports all cost analysis functionality for convenient imports.
 */

// Parser exports
export {
	parseCostString,
	extractCostFromSpec,
	normalizeCosts,
	extractCostCategories,
	formatCostAmount
} from './cost-parser';

// Reconciliation service exports
export {
	compareCostsAcrossModels,
	findDiscrepancies,
	generateReconciliationReport,
	getOrderOfMagnitudeDiscrepancies,
	getDiscrepanciesBySeverity,
	getDiscrepanciesForItem,
	getComparisonForItem
} from './reconciliation-service';
