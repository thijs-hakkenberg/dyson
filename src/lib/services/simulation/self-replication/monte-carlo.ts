/**
 * Self-Replication Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs with stochastic variation
 * to determine growth statistics with confidence intervals.
 *
 * Addresses research question:
 * - RQ-3a-2: Self-replication closure threshold
 */

import {
	SeededRandom,
	AsyncRunner,
	calculateStats,
	confidenceInterval
} from '$lib/services/simulation-core';
import { simulateReplication } from './replication-model';
import type {
	ReplicationConfig,
	ReplicationResult,
	ReplicationOutput,
	ReplicationComparisonResult,
	ReplicationProgress,
	ReplicationRunResult
} from './types';

/**
 * Default configuration for self-replication simulation
 */
export const DEFAULT_REPLICATION_CONFIG: ReplicationConfig = {
	closureRatio: 0.96,
	cycleTimeMonths: 12,
	initialFoundries: 2,
	targetFoundries: 10000,
	foundryMassKg: 50000,
	vitaminSupplyRate: 500000,
	degradationRate: 0.01,
	iterations: 200,
	seed: undefined
};

/**
 * Run a single replication simulation with stochastic variation
 *
 * Applies random perturbations to key parameters:
 * - Closure ratio: +/-2%
 * - Cycle time: +/-20%
 * - Degradation rate: +/-50%
 * - Vitamin supply: +/-10%
 */
export function runSingleReplicationRun(
	config: ReplicationConfig,
	rng: SeededRandom
): ReplicationRunResult {
	// Apply stochastic variation
	const variedConfig: ReplicationConfig = {
		...config,
		closureRatio: config.closureRatio * rng.nextGaussian(1.0, 0.02),
		cycleTimeMonths: Math.max(1, config.cycleTimeMonths * rng.nextGaussian(1.0, 0.20)),
		degradationRate: Math.max(0, config.degradationRate * rng.nextGaussian(1.0, 0.50)),
		vitaminSupplyRate: Math.max(1, config.vitaminSupplyRate * rng.nextGaussian(1.0, 0.10))
	};

	// Clamp closure ratio to valid range
	variedConfig.closureRatio = Math.max(0.01, Math.min(0.999, variedConfig.closureRatio));

	return simulateReplication(variedConfig);
}

/**
 * Aggregate multiple run results into statistics
 */
function aggregateResults(
	runs: ReplicationRunResult[],
	config: ReplicationConfig
): ReplicationResult {
	// Time-to-target statistics
	const timesToTarget = runs
		.map((r) => r.timeToTarget)
		.filter((t): t is number => t !== null);

	const reachedTarget = timesToTarget.length;
	const probabilityOfTarget = reachedTarget / runs.length;

	let timeToTargetStats: ReplicationResult['timeToTargetStats'];
	if (timesToTarget.length > 0) {
		const sorted = [...timesToTarget].sort((a, b) => a - b);
		const ttStats = calculateStats(timesToTarget);
		timeToTargetStats = {
			mean: ttStats.mean,
			median: sorted[Math.floor(sorted.length / 2)],
			min: ttStats.min,
			max: ttStats.max
		};
	} else {
		timeToTargetStats = { mean: null, median: null, min: null, max: null };
	}

	// Final count statistics
	const finalCounts = runs.map((r) => r.finalFoundryCount);
	const countStats = calculateStats(finalCounts);

	// Vitamin mass statistics
	const vitaminMasses = runs.map((r) => r.totalVitaminMass);
	const vitaminStats = calculateStats(vitaminMasses);

	// Peak growth rate
	const peakRates = runs.map((r) => r.peakGrowthRate);
	const peakStats = calculateStats(peakRates);

	// Plateau generation
	const plateauGens = runs
		.map((r) => r.generationAtPlateau)
		.filter((g): g is number => g !== null);

	let plateauStats: ReplicationResult['plateauStats'];
	if (plateauGens.length > 0) {
		const pStats = calculateStats(plateauGens);
		plateauStats = { mean: pStats.mean, min: pStats.min, max: pStats.max };
	} else {
		plateauStats = { mean: null, min: null, max: null };
	}

	// Build mean growth curve by sampling time points
	// Find the maximum number of cycles across all runs
	const maxCycles = Math.max(...runs.map((r) => r.cycles.length));

	// Use the first run's time points as the reference
	const refRun = runs[0];
	const meanGrowthCurve: ReplicationResult['meanGrowthCurve'] = [];
	const lowerGrowthCurve: ReplicationResult['lowerGrowthCurve'] = [];
	const upperGrowthCurve: ReplicationResult['upperGrowthCurve'] = [];

	for (let i = 0; i < refRun.cycles.length; i++) {
		const timeMonths = refRun.cycles[i].timeMonths;

		// Collect foundry counts at this cycle index across all runs
		const counts: number[] = [];
		const vitamins: number[] = [];
		for (const run of runs) {
			if (i < run.cycles.length) {
				counts.push(run.cycles[i].foundryCount);
				vitamins.push(run.cycles[i].cumulativeVitaminMass);
			} else {
				// Run ended early - use final values
				const last = run.cycles[run.cycles.length - 1];
				counts.push(last.foundryCount);
				vitamins.push(last.cumulativeVitaminMass);
			}
		}

		const countStatsAtTime = calculateStats(counts);
		const vitaminStatsAtTime = calculateStats(vitamins);

		meanGrowthCurve.push({
			timeMonths,
			foundryCount: countStatsAtTime.mean,
			vitaminMass: vitaminStatsAtTime.mean
		});

		lowerGrowthCurve.push({
			timeMonths,
			foundryCount: countStatsAtTime.percentile5
		});

		upperGrowthCurve.push({
			timeMonths,
			foundryCount: countStatsAtTime.percentile95
		});
	}

	return {
		meanGrowthCurve,
		lowerGrowthCurve,
		upperGrowthCurve,
		probabilityOfTarget,
		timeToTargetStats,
		finalCountStats: {
			mean: countStats.mean,
			stdDev: countStats.stdDev,
			min: countStats.min,
			max: countStats.max
		},
		totalVitaminStats: {
			mean: vitaminStats.mean,
			stdDev: vitaminStats.stdDev
		},
		peakGrowthStats: {
			mean: peakStats.mean,
			max: peakStats.max
		},
		plateauStats
	};
}

/**
 * Run Monte Carlo simulation for self-replication
 */
export async function runReplicationMonteCarlo(
	config: ReplicationConfig,
	onProgress?: (progress: ReplicationProgress) => void
): Promise<ReplicationOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: ReplicationRunResult[] = [];

	await runner.run(
		config.iterations,
		async (i) => {
			const seed = (config.seed ?? Date.now()) + i;
			const rng = new SeededRandom(seed);
			const result = runSingleReplicationRun(config, rng);
			results.push(result);
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

	return {
		config,
		result: aggregateResults(results, config),
		executionTimeMs: Date.now() - startTime
	};
}

/**
 * Run comparison simulation across multiple closure ratios
 */
export async function runReplicationComparison(
	configs: ReplicationConfig[],
	labels: string[],
	onProgress?: (progress: ReplicationProgress) => void
): Promise<ReplicationComparisonResult> {
	const results: ReplicationResult[] = [];
	const totalRuns = configs.reduce((sum, c) => sum + c.iterations, 0);
	let completedRuns = 0;

	for (let i = 0; i < configs.length; i++) {
		const config = configs[i];
		const output = await runReplicationMonteCarlo(config, (progress) => {
			if (onProgress) {
				const overallProgress = ((completedRuns + progress.currentRun) / totalRuns) * 100;
				onProgress({
					currentRun: completedRuns + progress.currentRun,
					totalRuns,
					percentComplete: overallProgress
				});
			}
		});
		results.push(output.result);
		completedRuns += config.iterations;
	}

	// Analyze comparison
	let fastestToTarget: string | null = null;
	let fastestTime = Infinity;
	let lowestVitaminCost: string | null = null;
	let lowestVitamin = Infinity;

	for (let i = 0; i < results.length; i++) {
		const r = results[i];
		if (r.timeToTargetStats.mean !== null && r.timeToTargetStats.mean < fastestTime) {
			fastestTime = r.timeToTargetStats.mean;
			fastestToTarget = labels[i];
		}
		if (r.totalVitaminStats.mean < lowestVitamin) {
			lowestVitamin = r.totalVitaminStats.mean;
			lowestVitaminCost = labels[i];
		}
	}

	const parts: string[] = [];
	if (fastestToTarget) {
		parts.push(`${fastestToTarget} closure reaches target fastest (${(fastestTime / 12).toFixed(1)} years).`);
	}
	if (lowestVitaminCost) {
		parts.push(`${lowestVitaminCost} closure requires least vitamin import (${(lowestVitamin / 1000).toFixed(0)} tonnes).`);
	}
	if (!fastestToTarget) {
		parts.push('No configuration reached the target within the simulation timeframe.');
	}

	return {
		configs,
		results,
		labels,
		analysis: {
			fastestToTarget,
			lowestVitaminCost,
			recommendation: parts.join(' ')
		}
	};
}

/**
 * Generate configs for comparing different closure ratios
 */
export function generateClosureConfigs(
	base: ReplicationConfig
): { configs: ReplicationConfig[]; labels: string[] } {
	const closures = [0.85, 0.90, 0.93, 0.96, 0.98, 0.99];
	const configs = closures.map((c) => ({
		...base,
		closureRatio: c,
		iterations: Math.min(base.iterations, 100) // Reduce per-config for speed
	}));
	const labels = closures.map((c) => `${(c * 100).toFixed(0)}%`);
	return { configs, labels };
}

/**
 * Generate configs for comparing different degradation rates
 */
export function generateDegradationConfigs(
	base: ReplicationConfig
): { configs: ReplicationConfig[]; labels: string[] } {
	const rates = [0, 0.005, 0.01, 0.02, 0.05];
	const configs = rates.map((r) => ({
		...base,
		degradationRate: r,
		iterations: Math.min(base.iterations, 100)
	}));
	const labels = rates.map((r) => `${(r * 100).toFixed(1)}%/gen`);
	return { configs, labels };
}
