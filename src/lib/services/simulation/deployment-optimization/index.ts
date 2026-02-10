/**
 * ML Trajectory Deployment Optimization Simulation
 *
 * Compares deployment strategies (sequential, batch, greedy, NN-guided)
 * for distributing collector units from an assembly node to orbital slots.
 * Uses a trained neural network for rapid trajectory cost estimation.
 *
 * Addresses research question:
 * - RQ-1-43: ML trajectory deployment optimization
 *
 * @example
 * ```typescript
 * import {
 *   runDeploymentOptMonteCarlo,
 *   DEFAULT_DEPLOYMENT_OPT_CONFIG
 * } from '$lib/services/simulation/deployment-optimization';
 *
 * const result = await runDeploymentOptMonteCarlo({
 *   ...DEFAULT_DEPLOYMENT_OPT_CONFIG,
 *   unitCount: 1000,
 *   strategies: ['sequential', 'greedy', 'nn-guided']
 * });
 *
 * console.log(`Best strategy: ${result.result.bestStrategy}`);
 * ```
 */

// Type exports
export type {
	AssemblyNode,
	DeploymentStrategy,
	DeploymentOptConfig,
	NNLayer,
	NNWeights,
	SlotPosition,
	DeploymentStep,
	StrategyResult,
	DeploymentOptRunResult,
	StrategyStats,
	DeploymentOptResult,
	DeploymentOptOutput,
	DeploymentOptProgress
} from './types';

// NN inference exports
export {
	loadNNWeights,
	isNNAvailable,
	getCachedWeights,
	estimateDeltaV
} from './nn-inference';

// Deployment model exports
export {
	generateSlotPositions,
	calculateTransferCost,
	simulateSequentialDeployment,
	simulateBatchDeployment,
	simulateGreedyDeployment,
	simulateNNGuidedDeployment,
	runAllStrategies
} from './deployment-model';

// Monte Carlo exports
export {
	DEFAULT_DEPLOYMENT_OPT_CONFIG,
	runDeploymentOptMonteCarlo,
	runDeploymentScalingAnalysis
} from './monte-carlo';
