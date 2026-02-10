/**
 * Membrane Deployment Dynamics Simulation
 *
 * Structural stability and flutter boundary analysis for large-scale
 * thin-film membrane deployment in the near-Sun environment.
 *
 * Addresses research question:
 * - RQ-1-7: Large-scale membrane deployment dynamics
 *
 * @example
 * ```typescript
 * import {
 *   runMembraneMonteCarlo,
 *   DEFAULT_MEMBRANE_CONFIG
 * } from '$lib/services/simulation/membrane-dynamics';
 *
 * const result = await runMembraneMonteCarlo({
 *   ...DEFAULT_MEMBRANE_CONFIG,
 *   diameter: 500,
 *   tension: 1.0
 * });
 *
 * console.log(`Stability: ${result.result.modalResult.stability}`);
 * console.log(`Flutter margin: ${result.result.meanFlutterMargin.toFixed(1)}x`);
 * ```
 */

// Type exports
export type {
	StabilityClass,
	MembraneConfig,
	ModalResult,
	MembraneSweepPoint,
	MembraneRunResult,
	MembraneResult,
	MembraneOutput,
	MembraneComparisonResult,
	MembraneProgress,
	ModalGridData,
	ModalGridPoint
} from './types';

// Model exports
export {
	BESSEL_ZEROS,
	calculateNaturalFrequencies,
	calculateCentrifugalTension,
	calculateEffectiveTension,
	calculateSRPForce,
	calculateFlutterMargin,
	classifyStability,
	analyzeMembranePoint,
	findFlutterBoundaryTension,
	loadModalGrid,
	interpolateModalGrid,
	analyzeWithGrid
} from './membrane-model';

// Monte Carlo exports
export {
	DEFAULT_MEMBRANE_CONFIG,
	runSingleMembraneRun,
	runMembraneMonteCarlo,
	runMembraneComparison,
	generateTensionConfigs,
	generateSpinConfigs
} from './monte-carlo';
