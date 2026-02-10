/**
 * Thermal Warping Simulation
 *
 * Monte Carlo simulation for thermal warping effects on large thin-film
 * membranes in the solar environment (0.3-1.0 AU).
 *
 * Addresses research question:
 * - RQ-2-4: Thermal warping effects on large membranes
 *
 * @example
 * ```typescript
 * import {
 *   runWarpingMonteCarlo,
 *   DEFAULT_WARPING_CONFIG
 * } from '$lib/services/simulation/thermal-warping';
 *
 * const result = await runWarpingMonteCarlo({
 *   ...DEFAULT_WARPING_CONFIG,
 *   orbitalDistance: 0.5,
 *   tension: 2.0
 * });
 *
 * console.log(`Mean deflection: ${result.result.configuredAreaStats.meanDeflection} m`);
 * ```
 */

// Type exports
export type {
	WarpingConfig,
	WarpingSweepPoint,
	WarpingRunResult,
	WarpingAreaStats,
	WarpingResult,
	WarpingOutput,
	WarpingComparisonResult,
	WarpingProgress
} from './types';

// Model exports
export {
	SIGMA_SB,
	KAPTON_DENSITY,
	KAPTON_E,
	KAPTON_NU,
	PHASED_ARRAY_TOLERANCE,
	STRUCTURAL_TOLERANCE,
	calculateEquilibriumTemp,
	calculateThermalGradient,
	calculateThickness,
	calculateCurvature,
	calculateMaxDeflection,
	calculateCriticalTension,
	calculateEffectiveDeflection,
	checkTolerances,
	calculateSweepPoint
} from './warping-model';

// Monte Carlo exports
export {
	DEFAULT_WARPING_CONFIG,
	runWarpingMonteCarlo,
	runWarpingComparison,
	generateDistanceConfigs,
	generateTensionConfigs
} from './monte-carlo';
