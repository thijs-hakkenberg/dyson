/**
 * Fleet Logistics Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs to determine fleet performance
 * statistics with confidence intervals.
 */

import { calculateStats, confidenceInterval, AsyncRunner, type Stats } from '$lib/services/simulation-core';
import { DiscreteEventSimulator } from './discrete-event-sim';
import type {
	FleetConfig,
	FleetResult,
	FleetSimulationOutput,
	FleetComparisonResult,
	FleetProgress,
	FleetRunResult
} from './types';

/**
 * Default fleet configuration
 */
export const DEFAULT_FLEET_CONFIG: FleetConfig = {
	vehicleCount: 10,
	payloadCapacityKg: 200000,
	missionDurationYears: 15,
	annualFailureRate: 0.03,
	budgetDollars: 2_000_000_000
};

/**
 * Run Monte Carlo simulation for fleet logistics
 */
export async function runFleetMonteCarlo(
	config: FleetConfig,
	runs: number = 100,
	onProgress?: (progress: FleetProgress) => void
): Promise<FleetSimulationOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: FleetRunResult[] = [];

	await runner.run(
		runs,
		async (i) => {
			const seed = (config.seed ?? Date.now()) + i;
			const sim = new DiscreteEventSimulator({ ...config, seed });
			const result = sim.run();
			result.runId = i;
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

	return {
		config,
		result: aggregateResults(results, config.budgetDollars),
		runs,
		executionTimeMs: Date.now() - startTime
	};
}

/**
 * Aggregate results from multiple simulation runs
 */
function aggregateResults(results: FleetRunResult[], budgetDollars: number): FleetResult {
	const throughputs = results.map((r) => r.throughputKgPerYear);
	const queueDepths = results.map((r) => r.avgQueueDepthKg);
	const failures = results.map((r) => r.vehicleFailures);
	const costs = results.map((r) => r.costPerKgDelivered);
	const utilizations = results.map((r) => r.fleetUtilization);

	const throughputStats = calculateStats(throughputs);
	const costStats = calculateStats(costs.filter((c) => isFinite(c)));
	const ci = confidenceInterval(throughputs);

	return {
		throughputKgPerYear: throughputStats.mean,
		throughputStdDev: throughputStats.stdDev,
		avgQueueDepthKg: queueDepths.reduce((a, b) => a + b, 0) / queueDepths.length,
		vehicleFailures: failures.reduce((a, b) => a + b, 0) / failures.length,
		costPerKgDelivered: costStats.mean,
		costPerKgStdDev: costStats.stdDev,
		fleetUtilization: utilizations.reduce((a, b) => a + b, 0) / utilizations.length,
		confidenceInterval95: {
			throughputLower: ci.lower,
			throughputUpper: ci.upper
		}
	};
}

/**
 * Run comparison between multiple fleet configurations
 */
export async function runFleetComparison(
	configs: FleetConfig[],
	runsPerConfig: number = 100,
	onProgress?: (progress: FleetProgress) => void
): Promise<FleetComparisonResult> {
	const results: FleetResult[] = [];
	const totalRuns = configs.length * runsPerConfig;
	let completedRuns = 0;

	for (const config of configs) {
		const output = await runFleetMonteCarlo(config, runsPerConfig, (progress) => {
			if (onProgress) {
				const overallProgress =
					((completedRuns + progress.currentRun) / totalRuns) * 100;
				onProgress({
					currentRun: completedRuns + progress.currentRun,
					totalRuns,
					percentComplete: overallProgress
				});
			}
		});
		results.push(output.result);
		completedRuns += runsPerConfig;
	}

	return {
		configs,
		results,
		optimalConfigIndex: findOptimalConfig(results),
		analysis: analyzeComparison(configs, results)
	};
}

/**
 * Find the optimal configuration index
 * Optimizes for throughput with reasonable cost efficiency
 */
function findOptimalConfig(results: FleetResult[]): number {
	let bestIndex = 0;
	let bestScore = -Infinity;

	for (let i = 0; i < results.length; i++) {
		// Score combines throughput and cost efficiency
		// Normalize both to similar scales
		const throughputScore = results[i].throughputKgPerYear / 1_000_000; // millions of kg
		const costScore = 1 / (results[i].costPerKgDelivered / 1000); // inverse of $/kg in thousands

		// Weight throughput more heavily
		const score = throughputScore * 0.7 + costScore * 0.3;

		if (score > bestScore) {
			bestScore = score;
			bestIndex = i;
		}
	}

	return bestIndex;
}

/**
 * Analyze comparison results
 */
function analyzeComparison(
	configs: FleetConfig[],
	results: FleetResult[]
): FleetComparisonResult['analysis'] {
	const bestThroughputIndex = results.reduce(
		(best, r, i) => (r.throughputKgPerYear > results[best].throughputKgPerYear ? i : best),
		0
	);

	const bestCostIndex = results.reduce(
		(best, r, i) => (r.costPerKgDelivered < results[best].costPerKgDelivered ? i : best),
		0
	);

	const bestConfig = configs[findOptimalConfig(results)];
	const recommendation =
		bestThroughputIndex === bestCostIndex
			? `Configuration with ${bestConfig.vehicleCount} vehicles × ${(bestConfig.payloadCapacityKg / 1000).toFixed(0)}t capacity is optimal for both throughput and cost.`
			: `Trade-off detected: ${configs[bestThroughputIndex].vehicleCount}×${(configs[bestThroughputIndex].payloadCapacityKg / 1000).toFixed(0)}t maximizes throughput, ` +
				`while ${configs[bestCostIndex].vehicleCount}×${(configs[bestCostIndex].payloadCapacityKg / 1000).toFixed(0)}t minimizes cost per kg.`;

	return {
		bestThroughput: results[bestThroughputIndex].throughputKgPerYear,
		bestCostEfficiency: results[bestCostIndex].costPerKgDelivered,
		recommendation
	};
}

/**
 * Generate comparison configurations for the research question
 * (8×250k vs 20×100k with intermediate options)
 */
export function generateComparisonConfigs(
	baseConfig: Omit<FleetConfig, 'vehicleCount' | 'payloadCapacityKg'>
): FleetConfig[] {
	const configurations: Array<{ vehicles: number; capacityKg: number }> = [
		{ vehicles: 5, capacityKg: 300000 },
		{ vehicles: 8, capacityKg: 250000 },
		{ vehicles: 10, capacityKg: 200000 },
		{ vehicles: 15, capacityKg: 150000 },
		{ vehicles: 20, capacityKg: 100000 },
		{ vehicles: 25, capacityKg: 80000 }
	];

	return configurations.map((c) => ({
		...baseConfig,
		vehicleCount: c.vehicles,
		payloadCapacityKg: c.capacityKg
	}));
}
