/**
 * Depot Logistics Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs to determine depot logistics
 * performance statistics with confidence intervals.
 * Addresses research question rq-2-7: optimal depot spacing and logistics architecture.
 */

import {
	calculateStats,
	confidenceInterval,
	AsyncRunner
} from '$lib/services/simulation-core';
import { DepotLogisticsSimulator } from './discrete-event-sim';
import type {
	DepotLogisticsConfig,
	DepotLogisticsResult,
	DepotLogisticsSimulationOutput,
	DepotLogisticsComparisonResult,
	DepotLogisticsProgress,
	DepotLogisticsRunResult
} from './types';

/**
 * Default depot logistics configuration
 */
export const DEFAULT_DEPOT_LOGISTICS_CONFIG: DepotLogisticsConfig = {
	depotSpacingKm: 200_000, // 200,000 km between depots
	inspectorCount: 10_000, // 10,000 inspector drones
	servicerCount: 1_000, // 1,000 servicer drones
	swarmSizeMillions: 5, // 5 million collectors
	failureRatePerYear: 0.02, // 2% annual failure rate
	inspectorRangeKm: 300_000, // 300,000 km patrol range
	servicerRangeKm: 400_000, // 400,000 km service range
	propellantBudgetKg: 20, // 20 kg propellant budget
	ispSeconds: 2000, // 2000 s Isp (Hall thruster)
	simulationDays: 365 // 1 year simulation
};

/**
 * Run Monte Carlo simulation for depot logistics
 */
export async function runDepotLogisticsMonteCarlo(
	config: DepotLogisticsConfig,
	runs: number = 50,
	onProgress?: (progress: DepotLogisticsProgress) => void
): Promise<DepotLogisticsSimulationOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: DepotLogisticsRunResult[] = [];

	await runner.run(
		runs,
		async (i) => {
			const seed = (config.seed ?? Date.now()) + i;
			const sim = new DepotLogisticsSimulator({ ...config, seed });
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
		result: aggregateResults(results),
		runs,
		executionTimeMs: Date.now() - startTime
	};
}

/**
 * Aggregate results from multiple simulation runs
 */
function aggregateResults(results: DepotLogisticsRunResult[]): DepotLogisticsResult {
	const mttrs = results.map((r) => r.meanTimeToRepairDays);
	const propellants = results.map((r) => r.totalPropellantKgPerYear);
	const utilizations = results.map((r) => r.fleetUtilizationPercent);
	const costs = results.map((r) => r.costPerServiceMission);
	const unserviced = results.map((r) => r.failuresUnserviced);

	const mttrStats = calculateStats(mttrs);
	const propellantStats = calculateStats(propellants);
	const utilizationStats = calculateStats(utilizations);
	const costStats = calculateStats(costs.filter((c) => isFinite(c) && c > 0));
	const ci = confidenceInterval(mttrs);

	// Depot count should be consistent across runs
	const depotCount = results.length > 0 ? results[0].depotCountRequired : 0;

	return {
		meanTimeToRepairDays: mttrStats.mean,
		mttrStdDev: mttrStats.stdDev,
		depotCountRequired: depotCount,
		totalPropellantKgPerYear: propellantStats.mean,
		propellantStdDev: propellantStats.stdDev,
		fleetUtilizationPercent: utilizationStats.mean,
		utilizationStdDev: utilizationStats.stdDev,
		costPerServiceMission: costStats.mean,
		costStdDev: costStats.stdDev,
		avgFailuresUnserviced: unserviced.reduce((a, b) => a + b, 0) / unserviced.length,
		confidenceInterval95: {
			mttrLower: ci.lower,
			mttrUpper: ci.upper
		}
	};
}

/**
 * Run comparison between different depot spacing configurations
 */
export async function runDepotLogisticsComparison(
	configs: DepotLogisticsConfig[],
	runsPerConfig: number = 30,
	onProgress?: (progress: DepotLogisticsProgress) => void
): Promise<DepotLogisticsComparisonResult> {
	const results: DepotLogisticsResult[] = [];
	const totalRuns = configs.length * runsPerConfig;
	let completedRuns = 0;

	for (const config of configs) {
		const output = await runDepotLogisticsMonteCarlo(config, runsPerConfig, (progress) => {
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
 * Optimizes for low MTTR with reasonable cost efficiency
 */
function findOptimalConfig(results: DepotLogisticsResult[]): number {
	let bestIndex = 0;
	let bestScore = -Infinity;

	for (let i = 0; i < results.length; i++) {
		// Score combines MTTR (lower is better) and cost (lower is better)
		// Normalize both to similar scales
		const mttrScore = 10 / (results[i].meanTimeToRepairDays + 0.1); // Inverse of MTTR
		const costScore = 100000 / (results[i].costPerServiceMission + 1); // Inverse of cost
		const unservicedPenalty = results[i].avgFailuresUnserviced * 0.1;

		// Weight MTTR more heavily (70% MTTR, 20% cost, 10% unserviced penalty)
		const score = mttrScore * 0.7 + costScore * 0.2 - unservicedPenalty;

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
	configs: DepotLogisticsConfig[],
	results: DepotLogisticsResult[]
): DepotLogisticsComparisonResult['analysis'] {
	const bestMTTRIndex = results.reduce(
		(best, r, i) => (r.meanTimeToRepairDays < results[best].meanTimeToRepairDays ? i : best),
		0
	);

	const bestCostIndex = results.reduce(
		(best, r, i) => (r.costPerServiceMission < results[best].costPerServiceMission ? i : best),
		0
	);

	const optimalIndex = findOptimalConfig(results);
	const optimalConfig = configs[optimalIndex];

	let recommendation: string;
	if (bestMTTRIndex === bestCostIndex) {
		recommendation =
			`Depot spacing of ${(optimalConfig.depotSpacingKm / 1000).toFixed(0)}k km is optimal for both MTTR and cost. ` +
			`Achieves ${results[optimalIndex].meanTimeToRepairDays.toFixed(1)} day MTTR ` +
			`at $${(results[optimalIndex].costPerServiceMission / 1000).toFixed(0)}k per mission.`;
	} else {
		recommendation =
			`Trade-off detected: ${(configs[bestMTTRIndex].depotSpacingKm / 1000).toFixed(0)}k km spacing minimizes MTTR ` +
			`(${results[bestMTTRIndex].meanTimeToRepairDays.toFixed(1)} days), ` +
			`while ${(configs[bestCostIndex].depotSpacingKm / 1000).toFixed(0)}k km spacing minimizes cost ` +
			`($${(results[bestCostIndex].costPerServiceMission / 1000).toFixed(0)}k per mission). ` +
			`Recommended: ${(optimalConfig.depotSpacingKm / 1000).toFixed(0)}k km as balanced choice.`;
	}

	return {
		bestMTTR: results[bestMTTRIndex].meanTimeToRepairDays,
		bestCostEfficiency: results[bestCostIndex].costPerServiceMission,
		recommendation
	};
}

/**
 * Generate comparison configurations for depot spacing analysis
 * Tests various depot spacing values to address rq-2-7
 */
export function generateSpacingComparisonConfigs(
	baseConfig: Omit<DepotLogisticsConfig, 'depotSpacingKm'>
): DepotLogisticsConfig[] {
	// Test spacing from 50,000 km to 500,000 km
	const spacings = [
		50_000, // Dense: 50k km
		100_000, // 100k km
		150_000, // 150k km
		200_000, // 200k km (default)
		300_000, // 300k km
		400_000, // 400k km
		500_000 // Sparse: 500k km
	];

	return spacings.map((spacing) => ({
		...baseConfig,
		depotSpacingKm: spacing
	}));
}

/**
 * Generate comparison configurations for fleet size analysis
 */
export function generateFleetComparisonConfigs(
	baseConfig: Omit<DepotLogisticsConfig, 'inspectorCount' | 'servicerCount'>
): DepotLogisticsConfig[] {
	// Test various inspector/servicer ratios
	const fleetConfigs: Array<{ inspectors: number; servicers: number }> = [
		{ inspectors: 5_000, servicers: 500 },
		{ inspectors: 10_000, servicers: 1_000 },
		{ inspectors: 15_000, servicers: 1_500 },
		{ inspectors: 20_000, servicers: 2_000 },
		{ inspectors: 30_000, servicers: 3_000 },
		{ inspectors: 50_000, servicers: 5_000 }
	];

	return fleetConfigs.map((fc) => ({
		...baseConfig,
		inspectorCount: fc.inspectors,
		servicerCount: fc.servicers
	}));
}

/**
 * Quick single-run simulation for parameter exploration
 */
export function runQuickDepotSimulation(
	config: DepotLogisticsConfig
): DepotLogisticsRunResult {
	const sim = new DepotLogisticsSimulator(config);
	return sim.run();
}
