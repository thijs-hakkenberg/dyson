/**
 * Self-Replication Closure Threshold Simulation Types
 *
 * Types for modeling self-replicating manufacturing foundries with
 * exponential growth, closure ratio degradation, and vitamin supply constraints.
 *
 * Addresses research question:
 * - RQ-3a-2: Self-replication closure threshold
 */

/**
 * Configuration for self-replication simulation
 */
export interface ReplicationConfig {
	/** Closure ratio - fraction of foundry mass that can be self-produced (0.80-0.99) */
	closureRatio: number;
	/** Time per replication cycle in months (6-24) */
	cycleTimeMonths: number;
	/** Initial number of foundries (1-10) */
	initialFoundries: number;
	/** Target number of foundries (100-100000) */
	targetFoundries: number;
	/** Mass of each foundry in kg (1000-100000) */
	foundryMassKg: number;
	/** Vitamin (non-self-producible) supply rate in kg/month (100-1000000) */
	vitaminSupplyRate: number;
	/** Degradation rate of effective closure per generation (0-0.05) */
	degradationRate: number;
	/** Number of Monte Carlo iterations */
	iterations: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Data for a single replication cycle
 */
export interface CycleData {
	/** Generation number (0-indexed) */
	generation: number;
	/** Time elapsed in months */
	timeMonths: number;
	/** Total foundry count at end of this cycle */
	foundryCount: number;
	/** New foundries produced this cycle */
	newFoundries: number;
	/** Vitamin mass needed for new foundries (kg) */
	vitaminNeeded: number;
	/** Vitamin mass actually consumed (kg) */
	vitaminConsumed: number;
	/** Effective closure ratio after degradation */
	effectiveClosure: number;
	/** Cumulative vitamin mass imported (kg) */
	cumulativeVitaminMass: number;
}

/**
 * Result of a single replication simulation run
 */
export interface ReplicationRunResult {
	/** Per-cycle data */
	cycles: CycleData[];
	/** Final foundry count */
	finalFoundryCount: number;
	/** Total vitamin mass imported (kg) */
	totalVitaminMass: number;
	/** Time to reach target in months, or null if not reached */
	timeToTarget: number | null;
	/** Peak growth rate (foundries per cycle) */
	peakGrowthRate: number;
	/** Generation at which growth plateaus (effective closure < threshold) */
	generationAtPlateau: number | null;
}

/**
 * Aggregated Monte Carlo result
 */
export interface ReplicationResult {
	/** Mean growth curve (averaged across runs) */
	meanGrowthCurve: { timeMonths: number; foundryCount: number; vitaminMass: number }[];
	/** 5th percentile growth curve */
	lowerGrowthCurve: { timeMonths: number; foundryCount: number }[];
	/** 95th percentile growth curve */
	upperGrowthCurve: { timeMonths: number; foundryCount: number }[];
	/** Probability of reaching target (0-1) */
	probabilityOfTarget: number;
	/** Time to target statistics */
	timeToTargetStats: {
		mean: number | null;
		median: number | null;
		min: number | null;
		max: number | null;
	};
	/** Final foundry count statistics */
	finalCountStats: {
		mean: number;
		stdDev: number;
		min: number;
		max: number;
	};
	/** Total vitamin mass statistics */
	totalVitaminStats: {
		mean: number;
		stdDev: number;
	};
	/** Peak growth rate statistics */
	peakGrowthStats: {
		mean: number;
		max: number;
	};
	/** Generation at plateau statistics */
	plateauStats: {
		mean: number | null;
		min: number | null;
		max: number | null;
	};
}

/**
 * Full simulation output wrapper
 */
export interface ReplicationOutput {
	/** Configuration used */
	config: ReplicationConfig;
	/** Aggregated results */
	result: ReplicationResult;
	/** Execution time in milliseconds */
	executionTimeMs: number;
}

/**
 * Comparison result for multiple closure ratios
 */
export interface ReplicationComparisonResult {
	/** Configs compared */
	configs: ReplicationConfig[];
	/** Results for each config */
	results: ReplicationResult[];
	/** Labels for each config (e.g., "96%") */
	labels: string[];
	/** Analysis summary */
	analysis: {
		fastestToTarget: string | null;
		lowestVitaminCost: string | null;
		recommendation: string;
	};
}

/**
 * Progress callback for Monte Carlo simulation
 */
export interface ReplicationProgress {
	/** Current run number */
	currentRun: number;
	/** Total runs to complete */
	totalRuns: number;
	/** Percentage complete */
	percentComplete: number;
}
