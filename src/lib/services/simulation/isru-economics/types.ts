/**
 * ISRU Economics Simulation Types
 *
 * Types for comparing in-space (ISRU) vs Earth-based manufacturing
 * economics for Project Dyson Phase 1 deployment.
 *
 * Addresses research question rq-1-12: At what scale does in-space
 * manufacturing become more economical than Earth manufacturing + launch?
 */

import type { EarthManufacturingYear, ISRUProductionYear } from '$lib/services/simulation-core';

/**
 * Configuration for ISRU economics simulation
 */
export interface ISRUEconomicsConfig {
	/** Launch cost per kg to destination - lower bound ($/kg) */
	launchCostPerKgLow: number;
	/** Launch cost per kg to destination - upper bound ($/kg) */
	launchCostPerKgHigh: number;
	/** ISRU capital cost (seed factory) - lower bound ($B) */
	isruCapitalCostBLow: number;
	/** ISRU capital cost (seed factory) - upper bound ($B) */
	isruCapitalCostBHigh: number;
	/** Earth production rate (units per year) */
	earthProductionRatePerYear: number;
	/** ISRU ramp-up time to full production (years) */
	isruRampUpYears: number;
	/** Mass per unit (kg) */
	unitMassKg: number;
	/** Target deployment: total units to produce */
	targetDeploymentUnits: number;
	/** Learning rate for Earth manufacturing (0.80-0.95) */
	learningRateEarth: number;
	/** Learning rate for ISRU operations (0.80-0.95) */
	learningRateISRU: number;
	/** First unit manufacturing cost on Earth ($) */
	firstUnitManufacturingCost: number;
	/** ISRU maximum production rate at full capacity (units/year) */
	isruMaxProductionRate: number;
	/** ISRU operational cost per unit at first unit ($) */
	isruOperationalCostPerUnit: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Sampled parameters for a single Monte Carlo run
 * (resolved from config ranges)
 */
export interface SampledParameters {
	launchCostPerKg: number;
	isruCapitalCostDollars: number;
	learningRateEarth: number;
	learningRateISRU: number;
}

/**
 * Single simulation run result
 */
export interface ISRUEconomicsRunResult {
	/** Run identifier */
	runId: number;
	/** Configuration used */
	config: ISRUEconomicsConfig;
	/** Sampled parameters for this run */
	sampledParams: SampledParameters;
	/** Unit count at crossover (null if ISRU never cheaper) */
	crossoverUnitCount: number | null;
	/** Year at crossover (null if ISRU never cheaper) */
	crossoverYear: number | null;
	/** Total Earth manufacturing + launch cost at target */
	totalEarthCost: number;
	/** Total ISRU cost at target */
	totalISRUCost: number;
	/** Earth manufacturing trajectory */
	earthTrajectory: EarthManufacturingYear[];
	/** ISRU production trajectory */
	isruTrajectory: ISRUProductionYear[];
	/** Years to complete target deployment */
	yearsToCompletion: {
		earth: number;
		isru: number;
	};
	/** Cost savings at target (positive = ISRU cheaper) */
	costSavingsAtTarget: number;
	/** Cost savings percentage at target */
	costSavingsPercentage: number;
}

/**
 * Aggregated statistics across Monte Carlo runs
 */
export interface ISRUEconomicsStats {
	/** Mean crossover unit count */
	crossoverUnitCountMean: number;
	/** Std dev of crossover unit count */
	crossoverUnitCountStdDev: number;
	/** Percentage of runs where crossover occurred */
	crossoverOccurrencePercent: number;
	/** Mean crossover year */
	crossoverYearMean: number;
	/** Mean total Earth cost */
	totalEarthCostMean: number;
	/** Mean total ISRU cost */
	totalISRUCostMean: number;
	/** Mean cost savings at target */
	costSavingsMean: number;
	/** Std dev of cost savings */
	costSavingsStdDev: number;
	/** Mean cost savings percentage */
	costSavingsPercentMean: number;
	/** Confidence interval for crossover unit count */
	crossoverCI95: {
		lower: number;
		upper: number;
	};
	/** Confidence interval for cost savings */
	savingsCI95: {
		lower: number;
		upper: number;
	};
}

/**
 * Monte Carlo simulation output
 */
export interface ISRUEconomicsOutput {
	/** Configuration used */
	config: ISRUEconomicsConfig;
	/** Number of Monte Carlo runs */
	runs: number;
	/** Aggregated statistics */
	stats: ISRUEconomicsStats;
	/** Individual run results (optional, for detailed analysis) */
	runResults?: ISRUEconomicsRunResult[];
	/** Execution time in milliseconds */
	executionTimeMs: number;
}

/**
 * Comparison between scenarios
 */
export interface ISRUScenarioComparison {
	/** Scenario name */
	name: string;
	/** Configuration for this scenario */
	config: ISRUEconomicsConfig;
	/** Results for this scenario */
	output: ISRUEconomicsOutput;
}

/**
 * Result of comparing multiple scenarios
 */
export interface ISRUEconomicsComparisonResult {
	/** All scenarios compared */
	scenarios: ISRUScenarioComparison[];
	/** Analysis summary */
	analysis: {
		/** Scenario with earliest crossover */
		earliestCrossoverScenario: string;
		/** Scenario with highest cost savings */
		highestSavingsScenario: string;
		/** Scenario with lowest risk (highest crossover occurrence) */
		lowestRiskScenario: string;
		/** Recommendations based on analysis */
		recommendations: string[];
	};
}

/**
 * Progress callback for Monte Carlo
 */
export interface ISRUEconomicsProgress {
	/** Current run number */
	currentRun: number;
	/** Total runs */
	totalRuns: number;
	/** Percent complete */
	percentComplete: number;
	/** Current scenario name (for comparison runs) */
	scenarioName?: string;
}

/**
 * Sensitivity analysis result for a single parameter
 */
export interface SensitivityResult {
	/** Parameter name */
	parameter: string;
	/** Parameter values tested */
	values: number[];
	/** Crossover unit counts for each value */
	crossoverCounts: (number | null)[];
	/** Cost savings for each value */
	costSavings: number[];
	/** Elasticity (% change in crossover per % change in parameter) */
	elasticity: number;
}

/**
 * Complete sensitivity analysis results
 */
export interface SensitivityAnalysis {
	/** Results for each parameter */
	parameters: SensitivityResult[];
	/** Most sensitive parameter */
	mostSensitiveParameter: string;
	/** Least sensitive parameter */
	leastSensitiveParameter: string;
}
