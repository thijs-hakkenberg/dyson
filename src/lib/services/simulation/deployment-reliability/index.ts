/**
 * Deployment Reliability Simulation
 *
 * Monte Carlo simulation for membrane/sail deployment success rates
 * at scale for the Dyson swarm.
 *
 * Addresses research questions:
 * - RQ-1-5: Deployment mechanisms for collector sails
 * - RQ-1-7: Thermal effects on deployment
 * - RQ-2-5: Scaling deployment to thousands of units
 *
 * @example
 * ```typescript
 * import {
 *   runDeploymentMonteCarlo,
 *   DEFAULT_DEPLOYMENT_CONFIG
 * } from '$lib/services/simulation/deployment-reliability';
 *
 * const result = await runDeploymentMonteCarlo({
 *   ...DEFAULT_DEPLOYMENT_CONFIG,
 *   membraneArea: 5000,
 *   deploymentMechanism: 'centrifugal'
 * }, 100);
 *
 * console.log(`Success rate: ${result.result.stats.successRate}%`);
 * console.log(`Mean deployment time: ${result.result.stats.meanDeploymentTime} min`);
 * ```
 */

// Type exports
export type {
	DeploymentMechanism,
	DeploymentSpeed,
	FailureMode,
	DeploymentConfig,
	DeploymentAttemptResult,
	FailureModeInfo,
	DeploymentRunResult,
	DeploymentStats,
	DeploymentResult,
	DeploymentOutput,
	DeploymentComparisonResult,
	DeploymentProgress
} from './types';

// Deployment model exports
export {
	MECHANISM_COEFFICIENTS,
	SPEED_COEFFICIENTS,
	areaScalingFactor,
	temperatureStressFactor,
	thicknessFactors,
	calculateBaseSuccessProbability,
	modelFailureModes,
	calculateDeploymentTime,
	selectFailureMode,
	simulateDeploymentAttempt,
	calculateSuccessWithRetries
} from './deployment-model';

// Monte Carlo exports
export {
	DEFAULT_DEPLOYMENT_CONFIG,
	runDeploymentMonteCarlo,
	runDeploymentComparison,
	generateMechanismComparisonConfigs,
	generateAreaComparisonConfigs,
	generateSpeedComparisonConfigs,
	generateTemperatureComparisonConfigs
} from './monte-carlo';
