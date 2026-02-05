/**
 * Deployment Reliability Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs to determine deployment reliability
 * statistics with confidence intervals. Addresses research questions:
 * - RQ-1-5: Deployment mechanisms for collector sails
 * - RQ-1-7: Thermal effects on deployment
 * - RQ-2-5: Scaling deployment to thousands of units
 */

import {
	SeededRandom,
	AsyncRunner,
	calculateStats,
	confidenceInterval,
	percentile
} from '$lib/services/simulation-core';
import {
	simulateDeploymentAttempt,
	modelFailureModes,
	calculateDeploymentTime,
	calculateBaseSuccessProbability,
	MECHANISM_COEFFICIENTS
} from './deployment-model';
import type {
	DeploymentConfig,
	DeploymentResult,
	DeploymentOutput,
	DeploymentComparisonResult,
	DeploymentProgress,
	DeploymentRunResult,
	DeploymentStats,
	FailureMode,
	FailureModeInfo,
	DeploymentMechanism
} from './types';

/**
 * Default configuration for deployment reliability simulation
 */
export const DEFAULT_DEPLOYMENT_CONFIG: DeploymentConfig = {
	membraneArea: 1000,
	deploymentMechanism: 'hybrid',
	minTemperature: -50,
	maxTemperature: 100,
	deploymentSpeed: 'medium',
	maxAttempts: 3,
	membraneThickness: 5,
	orbitalDistance: 0.5,
	thermalPreconditioning: true,
	iterations: 100,
	seed: undefined
};

/**
 * Run a single deployment simulation (potentially with multiple attempts)
 */
function runSingleDeployment(
	config: DeploymentConfig,
	runId: number,
	seed: number
): DeploymentRunResult {
	const rng = new SeededRandom(seed);
	const attemptResults = [];
	let totalTime = 0;
	let success = false;
	let attemptsNeeded = 0;
	let finalAreaFraction = 0;
	let finalFailureMode: FailureMode | undefined;

	for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
		const result = simulateDeploymentAttempt(config, rng);
		attemptResults.push(result);
		totalTime += result.attemptTimeMinutes;

		if (result.success) {
			success = true;
			attemptsNeeded = attempt;
			finalAreaFraction = result.deployedAreaFraction;
			break;
		} else {
			finalFailureMode = result.failureMode;
			finalAreaFraction = result.deployedAreaFraction;

			// Add retry delay between attempts
			if (attempt < config.maxAttempts) {
				totalTime += 5; // 5 minute reset between attempts
			}
		}
	}

	if (!success) {
		attemptsNeeded = config.maxAttempts;
	}

	return {
		runId,
		config,
		success,
		attemptsNeeded,
		attemptResults,
		totalTimeMinutes: totalTime,
		finalDeployedAreaFraction: finalAreaFraction,
		failureMode: success ? undefined : finalFailureMode
	};
}

/**
 * Aggregate results from multiple simulation runs
 */
function aggregateResults(
	results: DeploymentRunResult[],
	config: DeploymentConfig
): DeploymentResult {
	const successfulRuns = results.filter((r) => r.success);
	const failedRuns = results.filter((r) => !r.success);

	// Success rate
	const successRate = (successfulRuns.length / results.length) * 100;

	// Calculate success rate std dev using binomial distribution approximation
	const p = successRate / 100;
	const n = results.length;
	const successRateStdDev = Math.sqrt(p * (1 - p) / n) * 100;

	// Deployment times (all runs)
	const allTimes = results.map((r) => r.totalTimeMinutes);
	const timeStats = calculateStats(allTimes);

	// Attempts needed (successful runs only)
	const attemptsNeeded = successfulRuns.map((r) => r.attemptsNeeded);
	const meanAttempts = attemptsNeeded.length > 0
		? attemptsNeeded.reduce((a, b) => a + b, 0) / attemptsNeeded.length
		: 0;

	// Area fraction
	const areaFractions = results.map((r) => r.finalDeployedAreaFraction);
	const meanAreaFraction = areaFractions.reduce((a, b) => a + b, 0) / areaFractions.length;

	// Failure mode breakdown
	const failureModeBreakdown: Record<FailureMode, number> = {
		stuck: 0,
		tear: 0,
		misalignment: 0,
		'thermal-warp': 0,
		partial: 0,
		oscillation: 0
	};

	for (const run of failedRuns) {
		if (run.failureMode) {
			failureModeBreakdown[run.failureMode]++;
		}
	}

	// Categorize failures
	const failuresByCategory = {
		mechanical: failureModeBreakdown.stuck + failureModeBreakdown.partial,
		thermal: failureModeBreakdown['thermal-warp'],
		structural: failureModeBreakdown.tear + failureModeBreakdown.misalignment + failureModeBreakdown.oscillation
	};

	const stats: DeploymentStats = {
		successRate,
		successRateStdDev,
		meanDeploymentTime: timeStats.mean,
		deploymentTimeStdDev: timeStats.stdDev,
		deploymentTime95Percentile: percentile(allTimes, 95),
		meanAttemptsNeeded: meanAttempts,
		meanDeployedAreaFraction: meanAreaFraction,
		failureModeBreakdown,
		failuresByCategory
	};

	// Confidence interval for success rate
	const successBinary = results.map((r) => (r.success ? 100 : 0));
	const ci = confidenceInterval(successBinary);

	// Time distribution
	const sortedTimes = [...allTimes].sort((a, b) => a - b);
	const timeDistribution = sortedTimes.map((time, i) => ({
		time,
		cumulativeProbability: ((i + 1) / sortedTimes.length) * 100
	}));

	// Get failure mode probabilities from model
	const failureModeProbabilities = modelFailureModes(config);

	// Reliability grade
	let reliabilityGrade: 'A' | 'B' | 'C' | 'D' | 'F';
	if (successRate >= 95) {
		reliabilityGrade = 'A';
	} else if (successRate >= 85) {
		reliabilityGrade = 'B';
	} else if (successRate >= 70) {
		reliabilityGrade = 'C';
	} else if (successRate >= 50) {
		reliabilityGrade = 'D';
	} else {
		reliabilityGrade = 'F';
	}

	// Generate recommendation
	const recommendation = generateRecommendation(config, stats, failureModeProbabilities);

	return {
		stats,
		confidenceInterval95: {
			lower: ci.lower,
			upper: ci.upper
		},
		timeDistribution,
		failureModeProbabilities,
		reliabilityGrade,
		recommendation
	};
}

/**
 * Generate recommendation based on simulation results
 */
function generateRecommendation(
	config: DeploymentConfig,
	stats: DeploymentStats,
	failureModes: FailureModeInfo[]
): string {
	const mechLabel = config.deploymentMechanism.replace('-', ' ');
	const parts: string[] = [];

	parts.push(
		`${mechLabel.charAt(0).toUpperCase() + mechLabel.slice(1)} mechanism achieves ` +
		`${stats.successRate.toFixed(1)}% success rate for ${config.membraneArea} m^2 membrane.`
	);

	if (stats.successRate < 85) {
		// Find dominant failure mode
		const maxFailure = Object.entries(stats.failureModeBreakdown)
			.filter(([, count]) => count > 0)
			.sort(([, a], [, b]) => b - a)[0];

		if (maxFailure) {
			const failureInfo = failureModes.find((fm) => fm.mode === maxFailure[0]);
			if (failureInfo) {
				parts.push(`Primary failure mode: ${failureInfo.description.toLowerCase()}.`);
			}
		}
	}

	if (stats.meanDeploymentTime > 60) {
		parts.push(`Deployment time (${stats.meanDeploymentTime.toFixed(0)} min) may impact operations.`);
	}

	if (stats.meanAttemptsNeeded > 1.5) {
		parts.push(`Average ${stats.meanAttemptsNeeded.toFixed(1)} attempts needed suggests reliability concerns.`);
	}

	return parts.join(' ');
}

/**
 * Run Monte Carlo simulation for deployment reliability
 *
 * @param config - Simulation configuration
 * @param runs - Number of Monte Carlo iterations (default: 100)
 * @param onProgress - Optional progress callback
 * @returns Simulation output with aggregated results
 */
export async function runDeploymentMonteCarlo(
	config: DeploymentConfig,
	runs: number = 100,
	onProgress?: (progress: DeploymentProgress) => void
): Promise<DeploymentOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: DeploymentRunResult[] = [];

	await runner.run(
		runs,
		async (i) => {
			const seed = (config.seed ?? Date.now()) + i;
			const result = runSingleDeployment(config, i, seed);
			results.push(result);
			return result;
		},
		(progress) => {
			if (onProgress) {
				onProgress({
					currentRun: progress.currentIteration,
					totalRuns: runs,
					percentComplete: progress.percentComplete,
					mechanism: config.deploymentMechanism
				});
			}
		}
	);

	return {
		config,
		result: aggregateResults(results, config),
		runs,
		executionTimeMs: Date.now() - startTime
	};
}

/**
 * Run comparison simulation across multiple configurations
 *
 * @param configs - Array of configurations to compare
 * @param runsPerConfig - Monte Carlo runs per configuration
 * @param onProgress - Optional progress callback
 * @returns Comparison results with analysis
 */
export async function runDeploymentComparison(
	configs: DeploymentConfig[],
	runsPerConfig: number = 100,
	onProgress?: (progress: DeploymentProgress) => void
): Promise<DeploymentComparisonResult> {
	const results: DeploymentResult[] = [];
	const totalRuns = configs.length * runsPerConfig;
	let completedRuns = 0;

	for (const config of configs) {
		const output = await runDeploymentMonteCarlo(config, runsPerConfig, (progress) => {
			if (onProgress) {
				const overallProgress = ((completedRuns + progress.currentRun) / totalRuns) * 100;
				onProgress({
					currentRun: completedRuns + progress.currentRun,
					totalRuns,
					percentComplete: overallProgress,
					mechanism: config.deploymentMechanism
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
 *
 * Uses weighted scoring: 70% success rate, 30% deployment time (inverted)
 */
function findOptimalConfig(results: DeploymentResult[]): number {
	let bestIndex = 0;
	let bestScore = -Infinity;

	// Find max time for normalization
	const maxTime = Math.max(...results.map((r) => r.stats.meanDeploymentTime));

	for (let i = 0; i < results.length; i++) {
		// Success rate score (0-100 -> 0-1)
		const successScore = results[i].stats.successRate / 100;
		// Time score (inverted, lower is better)
		const timeScore = 1 - results[i].stats.meanDeploymentTime / (maxTime || 1);

		const score = successScore * 0.7 + timeScore * 0.3;

		if (score > bestScore) {
			bestScore = score;
			bestIndex = i;
		}
	}

	return bestIndex;
}

/**
 * Generate analysis summary for comparison results
 */
function analyzeComparison(
	configs: DeploymentConfig[],
	results: DeploymentResult[]
): DeploymentComparisonResult['analysis'] {
	const bestSuccessIdx = results.reduce(
		(best, r, i) => (r.stats.successRate > results[best].stats.successRate ? i : best),
		0
	);
	const bestTimeIdx = results.reduce(
		(best, r, i) => (r.stats.meanDeploymentTime < results[best].stats.meanDeploymentTime ? i : best),
		0
	);

	const optimalIdx = findOptimalConfig(results);
	const optimalConfig = configs[optimalIdx];
	const optimalResult = results[optimalIdx];

	const mechLabel = optimalConfig.deploymentMechanism.replace('-', ' ');

	const recommendation =
		`${mechLabel.charAt(0).toUpperCase() + mechLabel.slice(1)} mechanism recommended ` +
		`for ${optimalConfig.membraneArea} m^2 membranes. ` +
		`Achieves ${optimalResult.stats.successRate.toFixed(1)}% success rate ` +
		`with ${optimalResult.stats.meanDeploymentTime.toFixed(0)} min deployment time. ` +
		`Reliability grade: ${optimalResult.reliabilityGrade}.`;

	return {
		bestSuccessRate: results[bestSuccessIdx].stats.successRate,
		bestDeploymentTime: results[bestTimeIdx].stats.meanDeploymentTime,
		recommendation
	};
}

/**
 * Generate comparison configs for all deployment mechanisms
 */
export function generateMechanismComparisonConfigs(
	baseConfig: Omit<DeploymentConfig, 'deploymentMechanism'> & {
		deploymentMechanism?: DeploymentMechanism;
	}
): DeploymentConfig[] {
	const mechanisms: DeploymentMechanism[] = [
		'inflatable',
		'motor-driven',
		'centrifugal',
		'shape-memory',
		'hybrid'
	];

	return mechanisms.map((mech) => ({
		...baseConfig,
		deploymentMechanism: mech
	}));
}

/**
 * Generate comparison configs for different membrane areas
 */
export function generateAreaComparisonConfigs(
	baseConfig: Omit<DeploymentConfig, 'membraneArea'> & {
		membraneArea?: number;
	}
): DeploymentConfig[] {
	const areas = [100, 250, 500, 1000, 2000, 5000, 10000];

	return areas.map((area) => ({
		...baseConfig,
		membraneArea: area
	}));
}

/**
 * Generate comparison configs for different deployment speeds
 */
export function generateSpeedComparisonConfigs(
	baseConfig: Omit<DeploymentConfig, 'deploymentSpeed'> & {
		deploymentSpeed?: 'slow' | 'medium' | 'fast';
	}
): DeploymentConfig[] {
	const speeds: Array<'slow' | 'medium' | 'fast'> = ['slow', 'medium', 'fast'];

	return speeds.map((speed) => ({
		...baseConfig,
		deploymentSpeed: speed
	}));
}

/**
 * Generate comparison configs for different temperature ranges
 */
export function generateTemperatureComparisonConfigs(
	baseConfig: Omit<DeploymentConfig, 'minTemperature' | 'maxTemperature'> & {
		minTemperature?: number;
		maxTemperature?: number;
	}
): DeploymentConfig[] {
	const tempRanges = [
		{ min: -50, max: 50, label: 'Moderate' },
		{ min: -100, max: 100, label: 'Wide' },
		{ min: -150, max: 150, label: 'Extreme' },
		{ min: 0, max: 80, label: 'Warm only' },
		{ min: -80, max: 20, label: 'Cold only' }
	];

	return tempRanges.map((range) => ({
		...baseConfig,
		minTemperature: range.min,
		maxTemperature: range.max
	}));
}
