/**
 * Deployment Optimization Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs to compare deployment strategies
 * with confidence intervals. Loads NN weights for trajectory estimation.
 *
 * Addresses research question:
 * - RQ-1-43: ML trajectory deployment optimization
 */

import {
	SeededRandom,
	AsyncRunner,
	calculateStats,
	confidenceInterval
} from '$lib/services/simulation-core';
import { loadNNWeights, getCachedWeights } from './nn-inference';
import { generateSlotPositions, runAllStrategies } from './deployment-model';
import type {
	DeploymentOptConfig,
	DeploymentOptOutput,
	DeploymentOptProgress,
	DeploymentOptResult,
	DeploymentOptRunResult,
	DeploymentStrategy,
	NNWeights,
	StrategyResult,
	StrategyStats
} from './types';

/**
 * Default configuration for deployment optimization simulation
 */
export const DEFAULT_DEPLOYMENT_OPT_CONFIG: DeploymentOptConfig = {
	unitCount: 500,
	tugCount: 20,
	assemblyNode: 'L1',
	propellantBudget: 50,
	minSpacing: 0.5,
	strategies: ['sequential', 'batch', 'greedy', 'nn-guided'],
	iterations: 50,
	seed: undefined
};

/**
 * Run a single Monte Carlo iteration
 */
function runSingleRun(
	config: DeploymentOptConfig,
	rng: SeededRandom,
	nnWeights: NNWeights | null
): DeploymentOptRunResult {
	const slots = generateSlotPositions(config.unitCount);
	const strategyResults = runAllStrategies(config, slots, rng, nnWeights);

	// Find best strategy by lowest total delta-V with high completion rate
	let bestStrategy = strategyResults[0].strategy;
	let bestScore = Infinity;
	for (const result of strategyResults) {
		// Penalize low completion rates heavily
		const penalty = result.completionRate < 0.95 ? 1e6 * (1 - result.completionRate) : 0;
		const score = result.totalDeltaV + penalty;
		if (score < bestScore) {
			bestScore = score;
			bestStrategy = result.strategy;
		}
	}

	return { strategyResults, bestStrategy };
}

/**
 * Aggregate strategy results across Monte Carlo runs
 */
function aggregateStrategyResults(
	allRuns: DeploymentOptRunResult[],
	strategies: DeploymentStrategy[]
): StrategyStats[] {
	return strategies.map((strategy) => {
		const runs = allRuns
			.map((run) => run.strategyResults.find((sr) => sr.strategy === strategy))
			.filter((sr): sr is StrategyResult => sr !== undefined);

		const deltaVs = runs.map((r) => r.totalDeltaV / 1000); // Convert to km/s
		const days = runs.map((r) => r.totalDays);
		const propellants = runs.map((r) => r.propellantUsed);
		const completions = runs.map((r) => r.completionRate * 100);

		const dvStats = calculateStats(deltaVs);
		const dvCI = confidenceInterval(deltaVs);
		const dayStats = calculateStats(days);
		const dayCI = confidenceInterval(days);
		const propStats = calculateStats(propellants);
		const propCI = confidenceInterval(propellants);
		const compStats = calculateStats(completions);
		const compCI = confidenceInterval(completions);

		// Average timeline: sample at regular intervals
		const avgTimeline = buildAverageTimeline(runs);

		return {
			strategy,
			totalDeltaV: {
				mean: dvStats.mean,
				stdDev: dvStats.stdDev,
				ci95Lower: dvCI.lower,
				ci95Upper: dvCI.upper
			},
			totalDays: {
				mean: dayStats.mean,
				stdDev: dayStats.stdDev,
				ci95Lower: dayCI.lower,
				ci95Upper: dayCI.upper
			},
			propellantUsed: {
				mean: propStats.mean,
				stdDev: propStats.stdDev,
				ci95Lower: propCI.lower,
				ci95Upper: propCI.upper
			},
			completionRate: {
				mean: compStats.mean,
				stdDev: compStats.stdDev,
				ci95Lower: compCI.lower,
				ci95Upper: compCI.upper
			},
			avgTimeline
		};
	});
}

/**
 * Build average deployment timeline across runs
 */
function buildAverageTimeline(
	runs: StrategyResult[]
): { day: number; unitsDeployed: number }[] {
	if (runs.length === 0) return [];

	// Find max day across all runs
	const maxDay = Math.max(...runs.map((r) =>
		r.deploymentTimeline.length > 0
			? r.deploymentTimeline[r.deploymentTimeline.length - 1].day
			: 0
	));

	if (maxDay === 0) return [];

	// Sample at 50 evenly spaced points
	const numSamples = 50;
	const timeline: { day: number; unitsDeployed: number }[] = [];

	for (let i = 0; i <= numSamples; i++) {
		const day = (i / numSamples) * maxDay;
		let totalUnits = 0;

		for (const run of runs) {
			// Find units deployed at this day
			let deployed = 0;
			for (const point of run.deploymentTimeline) {
				if (point.day <= day) {
					deployed = point.unitsDeployed;
				} else {
					break;
				}
			}
			totalUnits += deployed;
		}

		timeline.push({
			day: Math.round(day),
			unitsDeployed: Math.round(totalUnits / runs.length)
		});
	}

	return timeline;
}

/**
 * Run Monte Carlo deployment optimization simulation
 */
export async function runDeploymentOptMonteCarlo(
	config: DeploymentOptConfig,
	onProgress?: (progress: DeploymentOptProgress) => void
): Promise<DeploymentOptOutput> {
	const startTime = Date.now();

	// Try to load NN weights
	const nnWeights = await loadNNWeights();
	const runner = new AsyncRunner();
	const allRuns: DeploymentOptRunResult[] = [];

	await runner.run(
		config.iterations,
		async (i) => {
			const seed = (config.seed ?? Date.now()) + i * 7919;
			const rng = new SeededRandom(seed);
			const result = runSingleRun(config, rng, nnWeights);
			allRuns.push(result);
			return result;
		},
		(progress) => {
			if (onProgress) {
				onProgress({
					currentRun: progress.currentIteration,
					totalRuns: config.iterations,
					percentComplete: progress.percentComplete
				});
			}
		}
	);

	// Aggregate results
	const strategyStats = aggregateStrategyResults(allRuns, config.strategies);

	// Count wins
	const winCounts: Record<DeploymentStrategy, number> = {
		sequential: 0,
		batch: 0,
		greedy: 0,
		'nn-guided': 0
	};
	for (const run of allRuns) {
		winCounts[run.bestStrategy]++;
	}

	// Determine overall best
	let bestStrategy = config.strategies[0];
	let bestWins = 0;
	for (const strategy of config.strategies) {
		if (winCounts[strategy] > bestWins) {
			bestWins = winCounts[strategy];
			bestStrategy = strategy;
		}
	}

	const result: DeploymentOptResult = {
		strategyStats,
		bestStrategy,
		winCounts
	};

	return {
		config,
		result,
		nnAvailable: nnWeights !== null,
		executionTimeMs: Date.now() - startTime
	};
}

/**
 * Run scaling analysis: sweep unit counts and compare strategies
 */
export async function runDeploymentScalingAnalysis(
	baseConfig: DeploymentOptConfig,
	unitCounts: number[],
	onProgress?: (progress: DeploymentOptProgress) => void
): Promise<DeploymentOptOutput[]> {
	const results: DeploymentOptOutput[] = [];
	const totalRuns = unitCounts.length * baseConfig.iterations;
	let completedRuns = 0;

	for (const unitCount of unitCounts) {
		const config = { ...baseConfig, unitCount, iterations: Math.min(baseConfig.iterations, 20) };
		const output = await runDeploymentOptMonteCarlo(config, (p) => {
			if (onProgress) {
				onProgress({
					currentRun: completedRuns + p.currentRun,
					totalRuns,
					percentComplete: ((completedRuns + p.currentRun) / totalRuns) * 100
				});
			}
		});
		results.push(output);
		completedRuns += config.iterations;
	}

	return results;
}
