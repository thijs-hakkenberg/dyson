/**
 * ISRU Economics Monte Carlo Simulation
 *
 * Orchestrates Monte Carlo runs to determine ISRU vs Earth manufacturing
 * crossover point with confidence intervals.
 *
 * Addresses research question rq-1-12: At what scale does in-space
 * manufacturing become more economical than Earth manufacturing + launch?
 */

import {
	SeededRandom,
	calculateStats,
	confidenceInterval,
	AsyncRunner,
	type Stats
} from '$lib/services/simulation-core';

import {
	sampleParameters,
	calculateEarthTrajectoryWithUncertainty,
	calculateISRUTrajectoryWithUncertainty,
	findCrossoverPointDetailed
} from './cost-model';

import type {
	ISRUEconomicsConfig,
	ISRUEconomicsRunResult,
	ISRUEconomicsStats,
	ISRUEconomicsOutput,
	ISRUEconomicsComparisonResult,
	ISRUScenarioComparison,
	ISRUEconomicsProgress,
	SensitivityAnalysis,
	SensitivityResult
} from './types';

/**
 * Default configuration for ISRU economics simulation
 *
 * Based on Project Dyson Phase 1 collector unit parameters
 */
export const DEFAULT_ISRU_ECONOMICS_CONFIG: ISRUEconomicsConfig = {
	// Launch costs: $500-2000/kg range (2026-2030 projections)
	launchCostPerKgLow: 500,
	launchCostPerKgHigh: 2000,

	// ISRU capital cost: $10B-100B for seed factory
	isruCapitalCostBLow: 10,
	isruCapitalCostBHigh: 100,

	// Production parameters
	earthProductionRatePerYear: 100, // 100 units/year Earth capacity
	isruRampUpYears: 5, // 5 years to full ISRU production
	isruMaxProductionRate: 500, // 500 units/year at full capacity

	// Unit parameters (collector units)
	unitMassKg: 10000, // 10 tonnes per unit
	targetDeploymentUnits: 10000, // 10,000 unit swarm

	// Learning curves
	learningRateEarth: 0.85, // 15% cost reduction per doubling
	learningRateISRU: 0.90, // 10% cost reduction per doubling (less mature)

	// Cost parameters
	firstUnitManufacturingCost: 50_000_000, // $50M first unit
	isruOperationalCostPerUnit: 5_000_000, // $5M operational cost per unit

	seed: 12345
};

/**
 * Run a single ISRU economics simulation
 */
function runSingleSimulation(
	config: ISRUEconomicsConfig,
	runId: number,
	seed: number
): ISRUEconomicsRunResult {
	const rng = new SeededRandom(seed);

	// Sample parameters with uncertainty
	const sampledParams = sampleParameters(config, rng);

	// Calculate trajectories
	const earthTrajectory = calculateEarthTrajectoryWithUncertainty(config, sampledParams);
	const isruTrajectory = calculateISRUTrajectoryWithUncertainty(config, sampledParams);

	// Find crossover point
	const crossover = findCrossoverPointDetailed(earthTrajectory, isruTrajectory);

	// Get final costs
	const totalEarthCost =
		earthTrajectory.length > 0 ? earthTrajectory[earthTrajectory.length - 1].cumulativeCost : 0;

	const totalISRUCost =
		isruTrajectory.length > 0 ? isruTrajectory[isruTrajectory.length - 1].cumulativeCost : 0;

	// Calculate savings
	const costSavingsAtTarget = totalEarthCost - totalISRUCost;
	const costSavingsPercentage = totalEarthCost > 0 ? (costSavingsAtTarget / totalEarthCost) * 100 : 0;

	return {
		runId,
		config,
		sampledParams,
		crossoverUnitCount: crossover?.unitCount ?? null,
		crossoverYear: crossover?.year ?? null,
		totalEarthCost,
		totalISRUCost,
		earthTrajectory,
		isruTrajectory,
		yearsToCompletion: {
			earth: earthTrajectory.length > 0 ? earthTrajectory[earthTrajectory.length - 1].year : 0,
			isru: isruTrajectory.length > 0 ? isruTrajectory[isruTrajectory.length - 1].year : 0
		},
		costSavingsAtTarget,
		costSavingsPercentage
	};
}

/**
 * Aggregate results from multiple Monte Carlo runs
 */
function aggregateResults(results: ISRUEconomicsRunResult[]): ISRUEconomicsStats {
	// Extract metrics from results
	const crossoverCounts = results
		.filter((r) => r.crossoverUnitCount !== null)
		.map((r) => r.crossoverUnitCount as number);

	const crossoverYears = results
		.filter((r) => r.crossoverYear !== null)
		.map((r) => r.crossoverYear as number);

	const earthCosts = results.map((r) => r.totalEarthCost);
	const isruCosts = results.map((r) => r.totalISRUCost);
	const savings = results.map((r) => r.costSavingsAtTarget);
	const savingsPercent = results.map((r) => r.costSavingsPercentage);

	// Calculate statistics
	const crossoverStats =
		crossoverCounts.length > 0
			? calculateStats(crossoverCounts)
			: { mean: NaN, stdDev: NaN, min: NaN, max: NaN, percentile5: NaN, percentile95: NaN };

	const crossoverYearStats =
		crossoverYears.length > 0
			? calculateStats(crossoverYears)
			: { mean: NaN, stdDev: NaN, min: NaN, max: NaN, percentile5: NaN, percentile95: NaN };

	const earthCostStats = calculateStats(earthCosts);
	const isruCostStats = calculateStats(isruCosts);
	const savingsStats = calculateStats(savings);
	const savingsPercentStats = calculateStats(savingsPercent);

	// Calculate confidence intervals
	const crossoverCI =
		crossoverCounts.length > 0
			? confidenceInterval(crossoverCounts, 0.95)
			: { lower: NaN, upper: NaN, mean: NaN, confidenceLevel: 0.95 };

	const savingsCI =
		savings.length > 0
			? confidenceInterval(savings, 0.95)
			: { lower: NaN, upper: NaN, mean: NaN, confidenceLevel: 0.95 };

	return {
		crossoverUnitCountMean: crossoverStats.mean,
		crossoverUnitCountStdDev: crossoverStats.stdDev,
		crossoverOccurrencePercent: (crossoverCounts.length / results.length) * 100,
		crossoverYearMean: crossoverYearStats.mean,
		totalEarthCostMean: earthCostStats.mean,
		totalISRUCostMean: isruCostStats.mean,
		costSavingsMean: savingsStats.mean,
		costSavingsStdDev: savingsStats.stdDev,
		costSavingsPercentMean: savingsPercentStats.mean,
		crossoverCI95: {
			lower: crossoverCI.lower,
			upper: crossoverCI.upper
		},
		savingsCI95: {
			lower: savingsCI.lower,
			upper: savingsCI.upper
		}
	};
}

/**
 * Run Monte Carlo simulation for ISRU economics
 *
 * @param config Simulation configuration
 * @param runs Number of Monte Carlo iterations
 * @param onProgress Progress callback
 * @param includeRunResults Whether to include individual run results (for detailed analysis)
 * @returns Simulation output with statistics
 */
export async function runISRUEconomicsMonteCarlo(
	config: ISRUEconomicsConfig,
	runs: number = 100,
	onProgress?: (progress: ISRUEconomicsProgress) => void,
	includeRunResults: boolean = false
): Promise<ISRUEconomicsOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: ISRUEconomicsRunResult[] = [];

	await runner.run(
		runs,
		async (i) => {
			const seed = (config.seed ?? Date.now()) + i;
			const result = runSingleSimulation(config, i, seed);
			results.push(result);
			return result;
		},
		(progress) => {
			if (onProgress) {
				onProgress({
					currentRun: progress.currentIteration,
					totalRuns: runs,
					percentComplete: progress.percentComplete
				});
			}
		}
	);

	const output: ISRUEconomicsOutput = {
		config,
		runs,
		stats: aggregateResults(results),
		executionTimeMs: Date.now() - startTime
	};

	if (includeRunResults) {
		output.runResults = results;
	}

	return output;
}

/**
 * Run comparison between multiple ISRU scenarios
 *
 * @param scenarios Array of scenario configurations with names
 * @param runsPerScenario Monte Carlo runs per scenario
 * @param onProgress Progress callback
 * @returns Comparison results with analysis
 */
export async function runISRUEconomicsComparison(
	scenarios: Array<{ name: string; config: ISRUEconomicsConfig }>,
	runsPerScenario: number = 100,
	onProgress?: (progress: ISRUEconomicsProgress) => void
): Promise<ISRUEconomicsComparisonResult> {
	const results: ISRUScenarioComparison[] = [];
	const totalRuns = scenarios.length * runsPerScenario;
	let completedRuns = 0;

	for (const scenario of scenarios) {
		const output = await runISRUEconomicsMonteCarlo(
			scenario.config,
			runsPerScenario,
			(progress) => {
				if (onProgress) {
					onProgress({
						currentRun: completedRuns + progress.currentRun,
						totalRuns,
						percentComplete: ((completedRuns + progress.currentRun) / totalRuns) * 100,
						scenarioName: scenario.name
					});
				}
			}
		);

		results.push({
			name: scenario.name,
			config: scenario.config,
			output
		});

		completedRuns += runsPerScenario;
	}

	return {
		scenarios: results,
		analysis: analyzeComparison(results)
	};
}

/**
 * Analyze comparison results across scenarios
 */
function analyzeComparison(scenarios: ISRUScenarioComparison[]): ISRUEconomicsComparisonResult['analysis'] {
	// Find scenario with earliest crossover (lowest mean crossover unit count)
	let earliestCrossover = scenarios[0];
	let highestSavings = scenarios[0];
	let lowestRisk = scenarios[0];

	for (const scenario of scenarios) {
		// Earliest crossover
		if (
			!isNaN(scenario.output.stats.crossoverUnitCountMean) &&
			(isNaN(earliestCrossover.output.stats.crossoverUnitCountMean) ||
				scenario.output.stats.crossoverUnitCountMean <
					earliestCrossover.output.stats.crossoverUnitCountMean)
		) {
			earliestCrossover = scenario;
		}

		// Highest savings
		if (scenario.output.stats.costSavingsMean > highestSavings.output.stats.costSavingsMean) {
			highestSavings = scenario;
		}

		// Lowest risk (highest crossover occurrence)
		if (
			scenario.output.stats.crossoverOccurrencePercent >
			lowestRisk.output.stats.crossoverOccurrencePercent
		) {
			lowestRisk = scenario;
		}
	}

	// Generate recommendations
	const recommendations: string[] = [];

	if (earliestCrossover.output.stats.crossoverOccurrencePercent > 90) {
		recommendations.push(
			`${earliestCrossover.name} achieves crossover reliably (${earliestCrossover.output.stats.crossoverOccurrencePercent.toFixed(0)}% of runs) at ~${formatNumber(earliestCrossover.output.stats.crossoverUnitCountMean)} units.`
		);
	}

	if (highestSavings.output.stats.costSavingsMean > 0) {
		recommendations.push(
			`${highestSavings.name} provides maximum cost savings of $${formatCost(highestSavings.output.stats.costSavingsMean)} (${highestSavings.output.stats.costSavingsPercentMean.toFixed(1)}%).`
		);
	}

	if (lowestRisk !== highestSavings) {
		recommendations.push(
			`For risk-averse planning, ${lowestRisk.name} offers the most reliable crossover.`
		);
	}

	// Add general recommendation
	const allCrossoverBelow50Percent = scenarios.every(
		(s) => s.output.stats.crossoverOccurrencePercent < 50
	);
	if (allCrossoverBelow50Percent) {
		recommendations.push(
			'ISRU crossover is uncertain in most scenarios. Consider increasing target deployment or reducing ISRU capital costs.'
		);
	}

	return {
		earliestCrossoverScenario: earliestCrossover.name,
		highestSavingsScenario: highestSavings.name,
		lowestRiskScenario: lowestRisk.name,
		recommendations
	};
}

/**
 * Run sensitivity analysis on key parameters
 *
 * @param baseConfig Base configuration
 * @param runs Monte Carlo runs per parameter value
 * @returns Sensitivity analysis results
 */
export async function runSensitivityAnalysis(
	baseConfig: ISRUEconomicsConfig,
	runs: number = 50
): Promise<SensitivityAnalysis> {
	const parameters: SensitivityResult[] = [];

	// Define parameter variations
	const parameterVariations: Array<{
		name: string;
		values: number[];
		applyFn: (config: ISRUEconomicsConfig, value: number) => ISRUEconomicsConfig;
	}> = [
		{
			name: 'launchCostPerKg',
			values: [500, 1000, 1500, 2000, 2500],
			applyFn: (config, value) => ({
				...config,
				launchCostPerKgLow: value * 0.9,
				launchCostPerKgHigh: value * 1.1
			})
		},
		{
			name: 'isruCapitalCostB',
			values: [10, 25, 50, 75, 100],
			applyFn: (config, value) => ({
				...config,
				isruCapitalCostBLow: value * 0.9,
				isruCapitalCostBHigh: value * 1.1
			})
		},
		{
			name: 'targetDeploymentUnits',
			values: [1000, 5000, 10000, 25000, 50000],
			applyFn: (config, value) => ({
				...config,
				targetDeploymentUnits: value
			})
		},
		{
			name: 'unitMassKg',
			values: [1000, 5000, 10000, 25000, 50000],
			applyFn: (config, value) => ({
				...config,
				unitMassKg: value
			})
		},
		{
			name: 'isruRampUpYears',
			values: [3, 5, 7, 10],
			applyFn: (config, value) => ({
				...config,
				isruRampUpYears: value
			})
		}
	];

	// Run sensitivity analysis for each parameter
	for (const param of parameterVariations) {
		const crossoverCounts: (number | null)[] = [];
		const costSavings: number[] = [];

		for (const value of param.values) {
			const modifiedConfig = param.applyFn(baseConfig, value);
			const output = await runISRUEconomicsMonteCarlo(modifiedConfig, runs);

			crossoverCounts.push(
				isNaN(output.stats.crossoverUnitCountMean) ? null : output.stats.crossoverUnitCountMean
			);
			costSavings.push(output.stats.costSavingsMean);
		}

		// Calculate elasticity (approximate)
		const validCrossovers = crossoverCounts.filter((c): c is number => c !== null);
		let elasticity = 0;
		if (validCrossovers.length >= 2) {
			const baseIdx = Math.floor(param.values.length / 2);
			const baseValue = param.values[baseIdx];
			const baseCrossover = crossoverCounts[baseIdx];

			if (baseCrossover !== null && baseIdx > 0) {
				const prevCrossover = crossoverCounts[baseIdx - 1];
				if (prevCrossover !== null) {
					const deltaParam = (param.values[baseIdx] - param.values[baseIdx - 1]) / baseValue;
					const deltaCrossover = (baseCrossover - prevCrossover) / baseCrossover;
					elasticity = deltaCrossover / deltaParam;
				}
			}
		}

		parameters.push({
			parameter: param.name,
			values: param.values,
			crossoverCounts,
			costSavings,
			elasticity: Math.abs(elasticity)
		});
	}

	// Find most and least sensitive parameters
	const sortedByElasticity = [...parameters].sort((a, b) => b.elasticity - a.elasticity);

	return {
		parameters,
		mostSensitiveParameter: sortedByElasticity[0]?.parameter ?? 'unknown',
		leastSensitiveParameter: sortedByElasticity[sortedByElasticity.length - 1]?.parameter ?? 'unknown'
	};
}

/**
 * Generate standard comparison scenarios for research question rq-1-12
 */
export function generateStandardScenarios(
	baseConfig: ISRUEconomicsConfig
): Array<{ name: string; config: ISRUEconomicsConfig }> {
	return [
		{
			name: 'Conservative',
			config: {
				...baseConfig,
				launchCostPerKgLow: 500,
				launchCostPerKgHigh: 1000,
				isruCapitalCostBLow: 75,
				isruCapitalCostBHigh: 100,
				isruRampUpYears: 10
			}
		},
		{
			name: 'Baseline',
			config: baseConfig
		},
		{
			name: 'Optimistic',
			config: {
				...baseConfig,
				launchCostPerKgLow: 1500,
				launchCostPerKgHigh: 2000,
				isruCapitalCostBLow: 10,
				isruCapitalCostBHigh: 25,
				isruRampUpYears: 3
			}
		},
		{
			name: 'High Volume',
			config: {
				...baseConfig,
				targetDeploymentUnits: 50000,
				isruMaxProductionRate: 2000
			}
		}
	];
}

/**
 * Format large numbers for display
 */
function formatNumber(value: number): string {
	if (isNaN(value)) return 'N/A';
	if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
	if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
	return value.toFixed(0);
}

/**
 * Format cost for display
 */
function formatCost(value: number): string {
	if (isNaN(value)) return 'N/A';
	if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(1)}T`;
	if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
	if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
	return value.toFixed(0);
}
