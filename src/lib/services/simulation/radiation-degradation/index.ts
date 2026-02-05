/**
 * Radiation Degradation Simulation
 *
 * Monte Carlo simulation for thin-film PV degradation modeling in
 * the near-Sun environment (0.3-1.0 AU).
 *
 * Addresses research questions:
 * - RQ-1-1: PV technology selection for radiation environment
 * - RQ-0-25: Thin-film viability in Phase 0 demonstrator
 * - RQ-2-2: PV degradation in Phase 2 swarm expansion
 *
 * @example
 * ```typescript
 * import {
 *   runRadiationDegradationMonteCarlo,
 *   DEFAULT_RADIATION_CONFIG
 * } from '$lib/services/simulation/radiation-degradation';
 *
 * const result = await runRadiationDegradationMonteCarlo({
 *   ...DEFAULT_RADIATION_CONFIG,
 *   orbitalDistance: 0.5,
 *   pvTechnology: 'cdte'
 * }, 100);
 *
 * console.log(`End-of-life efficiency: ${result.result.endOfLifeEfficiency}%`);
 * console.log(`Half-life: ${result.result.halfLifeYear} years`);
 * ```
 */

// Type exports
export type {
	PVTechnology,
	RadiationDegradationConfig,
	RadiationDegradationResult,
	RadiationDegradationOutput,
	RadiationDegradationComparisonResult,
	RadiationDegradationProgress,
	RadiationDegradationRunResult,
	PowerCurvePoint,
	ReplacementEvent,
	ShieldingTradeoff
} from './types';

// Degradation model exports
export {
	TECHNOLOGY_COEFFICIENTS,
	solarFluxAtDistance,
	radiationIntensityFactor,
	shieldingFactor,
	calculateAnnualDegradation,
	simulateDegradationCurve,
	findHalfLifeYear
} from './degradation-model';

// Monte Carlo exports
export {
	DEFAULT_RADIATION_CONFIG,
	runRadiationDegradationMonteCarlo,
	runRadiationDegradationComparison,
	generateTechnologyComparisonConfigs,
	generateOrbitalDistanceComparisonConfigs,
	generateShieldingComparisonConfigs
} from './monte-carlo';
