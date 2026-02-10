/**
 * ML Trajectory Deployment Optimization Types
 *
 * Types for modeling deployment strategies using neural network
 * trajectory estimation. Addresses research question:
 * - RQ-1-43: ML trajectory deployment optimization
 */

/**
 * Assembly node location for unit staging
 */
export type AssemblyNode = 'L1' | 'L4';

/**
 * Deployment strategy for sequencing unit placement
 */
export type DeploymentStrategy = 'sequential' | 'batch' | 'greedy' | 'nn-guided';

/**
 * Configuration for deployment optimization simulation
 */
export interface DeploymentOptConfig {
	/** Number of collector units to deploy (100-5000) */
	unitCount: number;
	/** Number of tug vehicles available (5-50) */
	tugCount: number;
	/** Assembly/staging location */
	assemblyNode: AssemblyNode;
	/** Total propellant budget in km/s */
	propellantBudget: number;
	/** Minimum angular spacing between units in degrees */
	minSpacing: number;
	/** Strategies to evaluate */
	strategies: DeploymentStrategy[];
	/** Number of Monte Carlo iterations */
	iterations: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Neural network layer weights
 */
export interface NNLayer {
	weights: number[][];
	biases: number[];
}

/**
 * Neural network weight data loaded from JSON
 */
export interface NNWeights {
	layers: NNLayer[];
	inputNorm: {
		min: number[];
		max: number[];
	};
	outputNorm: {
		min: number;
		max: number;
	};
}

/**
 * Position of a deployment slot in the target orbit
 */
export interface SlotPosition {
	index: number;
	orbitalRadius: number;
	angle: number;
}

/**
 * Single deployment action by a tug
 */
export interface DeploymentStep {
	tugId: number;
	unitId: number;
	slotIndex: number;
	deltaV: number;
	travelDays: number;
	propellantUsed: number;
}

/**
 * Result of running a single strategy
 */
export interface StrategyResult {
	strategy: DeploymentStrategy;
	steps: DeploymentStep[];
	totalDeltaV: number;
	totalDays: number;
	propellantUsed: number;
	completionRate: number;
	deploymentTimeline: { day: number; unitsDeployed: number }[];
}

/**
 * Result of a single Monte Carlo run (all strategies)
 */
export interface DeploymentOptRunResult {
	strategyResults: StrategyResult[];
	bestStrategy: DeploymentStrategy;
}

/**
 * Aggregated statistics for one strategy across MC runs
 */
export interface StrategyStats {
	strategy: DeploymentStrategy;
	totalDeltaV: { mean: number; stdDev: number; ci95Lower: number; ci95Upper: number };
	totalDays: { mean: number; stdDev: number; ci95Lower: number; ci95Upper: number };
	propellantUsed: { mean: number; stdDev: number; ci95Lower: number; ci95Upper: number };
	completionRate: { mean: number; stdDev: number; ci95Lower: number; ci95Upper: number };
	avgTimeline: { day: number; unitsDeployed: number }[];
}

/**
 * Aggregated Monte Carlo results
 */
export interface DeploymentOptResult {
	strategyStats: StrategyStats[];
	bestStrategy: DeploymentStrategy;
	winCounts: Record<DeploymentStrategy, number>;
}

/**
 * Full simulation output wrapper
 */
export interface DeploymentOptOutput {
	config: DeploymentOptConfig;
	result: DeploymentOptResult;
	nnAvailable: boolean;
	executionTimeMs: number;
}

/**
 * Progress callback info
 */
export interface DeploymentOptProgress {
	currentRun: number;
	totalRuns: number;
	percentComplete: number;
	currentStrategy?: DeploymentStrategy;
}
