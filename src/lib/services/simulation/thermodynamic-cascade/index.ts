/**
 * Thermodynamic Cascade Efficiency Simulation
 *
 * Monte Carlo simulation for energy flow through nested Matrioshka brain
 * shells to determine viable layer count and total system efficiency.
 *
 * Addresses research question:
 * - RQ-3a-1: Thermodynamic cascade efficiency limits
 *
 * @example
 * ```typescript
 * import {
 *   runCascadeMonteCarlo,
 *   DEFAULT_CASCADE_CONFIG
 * } from '$lib/services/simulation/thermodynamic-cascade';
 *
 * const result = await runCascadeMonteCarlo({
 *   ...DEFAULT_CASCADE_CONFIG,
 *   shellCount: 5,
 *   tpvEfficiency: 0.40
 * });
 *
 * console.log(`Efficiency: ${(result.result.meanEfficiency * 100).toFixed(1)}%`);
 * console.log(`Viable shells: ${result.result.meanViableShellCount}`);
 * ```
 */

// Type exports
export type {
	CascadeConfig,
	ShellData,
	CascadeRunResult,
	CascadeResult,
	CascadeOutput,
	CascadeComparisonResult,
	CascadeProgress
} from './types';

// Cascade model exports
export {
	SIGMA_SB,
	L_SUN,
	calculateShellTemperatures,
	calculateCarnotEfficiency,
	calculateShellExtraction,
	calculateRadiatorArea,
	simulateCascade
} from './cascade-model';

// Monte Carlo exports
export {
	DEFAULT_CASCADE_CONFIG,
	runSingleCascadeRun,
	runCascadeMonteCarlo,
	runCascadeComparison,
	generateShellCountConfigs,
	generateTPVEfficiencyConfigs
} from './monte-carlo';
