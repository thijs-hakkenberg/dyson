/**
 * Capture Monte Carlo Simulation
 *
 * Monte Carlo simulation for payload capture system options modeling
 * mass driver projectiles from asteroids/Moon in the Dyson swarm construction.
 *
 * Addresses research questions:
 * - RQ-1-25: Payload capture mechanisms for mass driver projectiles
 * - RQ-1-29: Impact forces and structural requirements for capture systems
 *
 * @example
 * ```typescript
 * import {
 *   runCaptureMonteCarlo,
 *   DEFAULT_CAPTURE_CONFIG
 * } from '$lib/services/simulation/capture';
 *
 * const result = await runCaptureMonteCarlo({
 *   ...DEFAULT_CAPTURE_CONFIG,
 *   payloadMassKg: 200,
 *   arrivalVelocityMs: 150,
 *   captureMethod: 'magnetic'
 * }, 100);
 *
 * console.log(`Success rate: ${result.result.stats.successRate}%`);
 * console.log(`Mean energy absorbed: ${result.result.stats.meanEnergyAbsorbedJ} J`);
 * console.log(`Peak stress: ${result.result.stats.meanPeakStress * 100}%`);
 * ```
 */

// Type exports
export type {
	CaptureMethod,
	CaptureFailureMode,
	CaptureConfig,
	CaptureAttemptResult,
	CaptureFailureInfo,
	CaptureRunResult,
	CaptureStats,
	CaptureResult,
	CaptureOutput,
	MethodComparisonResult,
	CaptureProgress,
	MethodCharacteristics,
	CaptureEnvelope
} from './types';

// Capture model exports
export {
	METHOD_CHARACTERISTICS,
	modelImpactForces,
	calculateEnergyRequirement,
	calculateCaptureEnvelope,
	calculateCaptureSuccess,
	modelFailureModes,
	selectFailureMode,
	simulateCaptureAttempt,
	evaluateCaptureMethod,
	calculateCaptureWindow
} from './capture-model';

// Monte Carlo exports
export {
	DEFAULT_CAPTURE_CONFIG,
	runSingleCapture,
	runCaptureMonteCarlo,
	runCaptureMethodComparison,
	generateMethodComparisonConfigs,
	generateMassComparisonConfigs,
	generateVelocityComparisonConfigs,
	generateAccuracyComparisonConfigs
} from './monte-carlo';
