/**
 * Self-Replication Closure Threshold Simulation
 *
 * Monte Carlo simulation for self-replicating manufacturing foundries
 * modeling exponential growth with closure ratio degradation and
 * vitamin supply constraints.
 *
 * Addresses research question:
 * - RQ-3a-2: Self-replication closure threshold
 *
 * @example
 * ```typescript
 * import {
 *   runReplicationMonteCarlo,
 *   DEFAULT_REPLICATION_CONFIG
 * } from '$lib/services/simulation/self-replication';
 *
 * const output = await runReplicationMonteCarlo({
 *   ...DEFAULT_REPLICATION_CONFIG,
 *   closureRatio: 0.96,
 *   degradationRate: 0.01
 * });
 *
 * console.log(`Target probability: ${(output.result.probabilityOfTarget * 100).toFixed(1)}%`);
 * ```
 */

// Type exports
export type {
	ReplicationConfig,
	CycleData,
	ReplicationRunResult,
	ReplicationResult,
	ReplicationOutput,
	ReplicationComparisonResult,
	ReplicationProgress
} from './types';

// Model exports
export {
	calculateEffectiveClosure,
	calculateVitaminNeeded,
	simulateGeneration,
	calculateDoublingTime,
	estimateVitaminBudget,
	simulateReplication
} from './replication-model';

// Monte Carlo exports
export {
	DEFAULT_REPLICATION_CONFIG,
	runSingleReplicationRun,
	runReplicationMonteCarlo,
	runReplicationComparison,
	generateClosureConfigs,
	generateDegradationConfigs
} from './monte-carlo';
