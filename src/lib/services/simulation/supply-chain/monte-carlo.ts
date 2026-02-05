/**
 * Supply Chain Monte Carlo Simulation
 *
 * Orchestrates Monte Carlo runs to analyze xenon supply chain constraints
 * for Project Dyson Phase 1 deployment.
 *
 * Addresses research questions:
 * - RQ-1-3: Critical material supply chains
 * - RQ-0-20: Xenon propellant sourcing at scale
 */

import {
	AsyncRunner,
	calculateStats,
	confidenceInterval
} from '$lib/services/simulation-core';

import { runSingleSimulation } from './supply-model';

import type {
	SupplyChainConfig,
	SupplyChainRunResult,
	SupplyChainStats,
	SupplyChainOutput,
	SupplyChainProgress,
	SupplyChainScenario,
	SupplyChainScenarioResult,
	SupplyChainComparisonResult
} from './types';

/**
 * Default configuration for supply chain simulation
 *
 * Based on Project Dyson Phase 1 xenon requirements and global market data
 */
export const DEFAULT_SUPPLY_CHAIN_CONFIG: SupplyChainConfig = {
	// Global xenon production: ~70 tonnes/year
	xenonProductionRate: 70,

	// Phase 1 xenon demand: ~150 tonnes
	xenonDemandPhase1: 150,

	// Alternative propellant availability
	kryptonAvailability: 200, // ~200 tonnes/year global
	argonAvailability: 500, // ~500 tonnes/year (as pure propellant grade)

	// Rare earth materials (for solar panels, etc.)
	rareEarthProduction: {
		tellurium: 500,
		indium: 800,
		gallium: 300
	},

	// Learning curve: 15% demand reduction per doubling of experience
	learningCurveEffect: 0.15,

	// Stockpiling strategy: 5 years before deployment
	stockpilingYears: 5,

	// Monte Carlo iterations
	iterations: 100,

	// Production growth: 3% per year (historical average for specialty gases)
	productionGrowthRate: 0.03,

	// Demand uncertainty: +/- 25%
	demandUncertaintyRange: 0.25,

	// Price elasticity: moderate (0.3)
	priceElasticity: 0.3,

	// Project allocation: 30% of global production
	projectAllocationFraction: 0.3,

	seed: 12345
};

/**
 * Aggregate results from multiple Monte Carlo runs
 *
 * @param results Array of simulation run results
 * @returns Aggregated statistics
 */
function aggregateResults(results: SupplyChainRunResult[]): SupplyChainStats {
	// Extract constraint years (only from runs with constraints)
	const constraintYears = results
		.filter((r) => r.constraintYear !== null)
		.map((r) => r.constraintYear as number);

	// Extract stockpile requirements
	const stockpileRequired = results.map((r) => r.stockpileRequired);

	// Extract years to accumulate
	const yearsToAccumulate = results.map((r) => r.yearsToAccumulate);

	// Extract cost impacts
	const costImpacts = results.map((r) => r.totalCostImpact);

	// Calculate constraint statistics
	const constraintStats =
		constraintYears.length > 0
			? calculateStats(constraintYears)
			: { mean: NaN, stdDev: NaN, min: NaN, max: NaN, percentile5: NaN, percentile95: NaN };

	// Calculate stockpile statistics
	const stockpileStats = calculateStats(stockpileRequired);
	const yearsStats = calculateStats(yearsToAccumulate);
	const costStats = calculateStats(costImpacts);

	// Calculate confidence interval for stockpile
	const stockpileCI = confidenceInterval(stockpileRequired, 0.95);

	// Calculate alternative propellant viability percentages
	const kryptonViableCount = results.filter(
		(r) => r.alternativePropellantViability.krypton.viable
	).length;
	const argonViableCount = results.filter(
		(r) => r.alternativePropellantViability.argon.viable
	).length;

	// Calculate demand met percentage
	const demandMetCount = results.filter((r) => r.demandMet).length;

	// Calculate cost sensitivity (% cost increase per supply constraint)
	const averageCostImpact = costStats.mean;
	const baseCost = 150 * 3000 * 1000; // 150 tonnes * $3000/kg * 1000 kg/tonne
	const costSensitivity = averageCostImpact / baseCost;

	// Generate strategy recommendation
	const preliminaryStats: SupplyChainStats = {
		constraintYearMean: constraintStats.mean,
		constraintYearStdDev: constraintStats.stdDev,
		constraintOccurrencePercent: (constraintYears.length / results.length) * 100,
		stockpileRequiredMean: stockpileStats.mean,
		stockpileRequiredStdDev: stockpileStats.stdDev,
		costSensitivity,
		kryptonViabilityPercent: (kryptonViableCount / results.length) * 100,
		argonViabilityPercent: (argonViableCount / results.length) * 100,
		yearsToAccumulateMean: yearsStats.mean,
		demandMetPercent: (demandMetCount / results.length) * 100,
		stockpileCI95: {
			lower: stockpileCI.lower,
			upper: stockpileCI.upper
		},
		recommendedStrategy: ''
	};

	const recommendedStrategy = generateStrategyRecommendation(preliminaryStats);

	return {
		...preliminaryStats,
		recommendedStrategy
	};
}

/**
 * Run Monte Carlo simulation for supply chain analysis
 *
 * @param config Simulation configuration
 * @param runs Number of Monte Carlo iterations
 * @param onProgress Progress callback
 * @param includeRunResults Whether to include individual run results
 * @returns Simulation output with statistics
 */
export async function runSupplyChainMonteCarlo(
	config: SupplyChainConfig,
	runs: number = 100,
	onProgress?: (progress: SupplyChainProgress) => void,
	includeRunResults: boolean = false
): Promise<SupplyChainOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: SupplyChainRunResult[] = [];

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

	const output: SupplyChainOutput = {
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
 * Run comparison between multiple supply chain scenarios
 *
 * @param scenarios Array of scenario configurations
 * @param runsPerScenario Monte Carlo runs per scenario
 * @param onProgress Progress callback
 * @returns Comparison results with analysis
 */
export async function runSupplyChainComparison(
	scenarios: SupplyChainScenario[],
	runsPerScenario: number = 100,
	onProgress?: (progress: SupplyChainProgress) => void
): Promise<SupplyChainComparisonResult> {
	const results: SupplyChainScenarioResult[] = [];
	const totalRuns = scenarios.length * runsPerScenario;
	let completedRuns = 0;

	for (const scenario of scenarios) {
		const output = await runSupplyChainMonteCarlo(
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
function analyzeComparison(
	scenarios: SupplyChainScenarioResult[]
): SupplyChainComparisonResult['analysis'] {
	let lowestRisk = scenarios[0];
	let fastestAccumulation = scenarios[0];
	let lowestCost = scenarios[0];

	for (const scenario of scenarios) {
		// Lowest risk = lowest constraint occurrence
		if (
			scenario.output.stats.constraintOccurrencePercent <
			lowestRisk.output.stats.constraintOccurrencePercent
		) {
			lowestRisk = scenario;
		}

		// Fastest accumulation = lowest years to accumulate
		if (
			scenario.output.stats.yearsToAccumulateMean <
			fastestAccumulation.output.stats.yearsToAccumulateMean
		) {
			fastestAccumulation = scenario;
		}

		// Lowest cost = lowest cost sensitivity
		if (scenario.output.stats.costSensitivity < lowestCost.output.stats.costSensitivity) {
			lowestCost = scenario;
		}
	}

	// Generate recommendations
	const recommendations: string[] = [];

	if (lowestRisk.output.stats.constraintOccurrencePercent < 30) {
		recommendations.push(
			`${lowestRisk.name} provides lowest supply constraint risk (${lowestRisk.output.stats.constraintOccurrencePercent.toFixed(0)}% occurrence).`
		);
	}

	if (lowestRisk.output.stats.demandMetPercent > 80) {
		recommendations.push(
			`${lowestRisk.name} meets Phase 1 demand in ${lowestRisk.output.stats.demandMetPercent.toFixed(0)}% of scenarios.`
		);
	}

	if (lowestRisk.output.stats.kryptonViabilityPercent > 70) {
		recommendations.push(
			`Krypton is a viable backup in ${lowestRisk.output.stats.kryptonViabilityPercent.toFixed(0)}% of scenarios - consider qualifying krypton Hall thrusters.`
		);
	}

	// Check if all scenarios have high constraint risk
	const allHighRisk = scenarios.every(
		(s) => s.output.stats.constraintOccurrencePercent > 50
	);
	if (allHighRisk) {
		recommendations.push(
			'All scenarios show significant supply constraint risk. Consider longer stockpiling periods or propellant alternatives.'
		);
	}

	// Add general strategy recommendation
	const avgStockpile = scenarios.reduce(
		(sum, s) => sum + s.output.stats.stockpileRequiredMean,
		0
	) / scenarios.length;

	if (avgStockpile > 50) {
		recommendations.push(
			`Average stockpile requirement of ${avgStockpile.toFixed(0)} tonnes suggests multi-year strategic reserve is essential.`
		);
	}

	return {
		lowestRiskScenario: lowestRisk.name,
		fastestAccumulationScenario: fastestAccumulation.name,
		lowestCostScenario: lowestCost.name,
		recommendations
	};
}

/**
 * Generate stockpiling strategy scenarios for comparison
 *
 * @param baseConfig Base configuration
 * @returns Array of scenarios with different stockpiling strategies
 */
export function generateStockpilingScenarios(
	baseConfig: SupplyChainConfig
): SupplyChainScenario[] {
	return [
		{
			name: 'Minimal Stockpile (3 years)',
			config: {
				...baseConfig,
				stockpilingYears: 3,
				projectAllocationFraction: 0.25
			}
		},
		{
			name: 'Baseline (5 years)',
			config: baseConfig
		},
		{
			name: 'Extended Stockpile (7 years)',
			config: {
				...baseConfig,
				stockpilingYears: 7,
				projectAllocationFraction: 0.35
			}
		},
		{
			name: 'Aggressive Stockpile (10 years)',
			config: {
				...baseConfig,
				stockpilingYears: 10,
				projectAllocationFraction: 0.4
			}
		},
		{
			name: 'High Growth Scenario',
			config: {
				...baseConfig,
				productionGrowthRate: 0.05, // 5% growth
				stockpilingYears: 5
			}
		},
		{
			name: 'Low Demand Scenario',
			config: {
				...baseConfig,
				xenonDemandPhase1: 100, // Reduced demand through efficiency
				learningCurveEffect: 0.25 // Aggressive learning curve
			}
		}
	];
}

/**
 * Generate strategy recommendation based on statistics
 *
 * @param stats Simulation statistics
 * @returns Strategy recommendation string
 */
export function generateStrategyRecommendation(stats: SupplyChainStats): string {
	const recommendations: string[] = [];

	// Evaluate constraint risk
	if (stats.constraintOccurrencePercent > 70) {
		recommendations.push('Begin strategic stockpiling immediately');
	} else if (stats.constraintOccurrencePercent > 40) {
		recommendations.push('Implement moderate stockpiling strategy');
	}

	// Evaluate krypton alternative
	if (stats.kryptonViabilityPercent > 70) {
		recommendations.push('Qualify krypton Hall thrusters as backup propulsion option');
	} else if (stats.kryptonViabilityPercent > 50) {
		recommendations.push('Consider krypton qualification as risk mitigation');
	}

	// Evaluate demand reduction potential
	if (stats.costSensitivity > 0.2) {
		recommendations.push('Invest in propulsion efficiency R&D to reduce xenon demand');
	}

	// Evaluate stockpile requirement
	if (stats.stockpileRequiredMean > 30) {
		recommendations.push(
			`Build strategic reserve of ${stats.stockpileRequiredMean.toFixed(0)}-${stats.stockpileCI95.upper.toFixed(0)} tonnes`
		);
	}

	// Evaluate demand met rate
	if (stats.demandMetPercent < 70) {
		recommendations.push('Current supply chain cannot reliably meet Phase 1 demand');
		if (stats.argonViabilityPercent > 40) {
			recommendations.push('Argon propulsion may be needed as secondary system');
		}
	}

	// Combine into single recommendation
	if (recommendations.length === 0) {
		return 'Current supply chain configuration appears adequate for Phase 1 requirements.';
	}

	return recommendations.join('. ') + '.';
}

/**
 * Format number for display
 */
export function formatNumber(value: number): string {
	if (isNaN(value)) return 'N/A';
	if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
	if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
	return value.toFixed(0);
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
	if (isNaN(value)) return 'N/A';
	if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
	if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
	if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`;
	return `$${value.toFixed(0)}`;
}
