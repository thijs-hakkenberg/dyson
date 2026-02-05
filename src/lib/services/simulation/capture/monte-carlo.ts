/**
 * Capture Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs to determine capture system
 * reliability statistics with confidence intervals. Addresses research questions:
 * - RQ-1-25: Payload capture mechanisms for mass driver projectiles
 * - RQ-1-29: Impact forces and structural requirements for capture systems
 */

import {
	SeededRandom,
	AsyncRunner,
	calculateStats,
	confidenceInterval,
	percentile
} from '$lib/services/simulation-core';
import {
	simulateCaptureAttempt,
	modelFailureModes,
	modelImpactForces,
	calculateCaptureWindow,
	METHOD_CHARACTERISTICS
} from './capture-model';
import type {
	CaptureConfig,
	CaptureResult,
	CaptureOutput,
	MethodComparisonResult,
	CaptureProgress,
	CaptureRunResult,
	CaptureStats,
	CaptureFailureMode,
	CaptureFailureInfo,
	CaptureMethod
} from './types';

/**
 * Default configuration for capture simulation
 */
export const DEFAULT_CAPTURE_CONFIG: CaptureConfig = {
	payloadMassKg: 100,
	arrivalVelocityMs: 100,
	captureMethod: 'magnetic',
	targetAccuracyM: 1.0,
	approachAngleVarianceDeg: 3,
	timingAccuracyMs: 10,
	structuralRating: 3,
	operatingTemperature: 20,
	redundantSystems: true,
	iterations: 100,
	seed: undefined
};

/**
 * Run a single capture simulation
 */
export function runSingleCapture(
	config: CaptureConfig,
	runId: number,
	seed: number
): CaptureRunResult {
	const rng = new SeededRandom(seed);

	// Calculate physics parameters
	const impactForces = modelImpactForces(config.payloadMassKg, config.arrivalVelocityMs);
	const captureWindowS = calculateCaptureWindow(config.captureMethod, config.arrivalVelocityMs);

	// Simulate capture attempt
	const attemptResult = simulateCaptureAttempt(config, rng);

	return {
		runId,
		config,
		success: attemptResult.success,
		attemptResult,
		kineticEnergyJ: impactForces.kineticEnergyJ,
		requiredDecelerationG: impactForces.requiredDecelerationG,
		captureWindowS
	};
}

/**
 * Aggregate results from multiple simulation runs
 */
function aggregateResults(
	results: CaptureRunResult[],
	config: CaptureConfig
): CaptureResult {
	const successfulRuns = results.filter((r) => r.success);
	const failedRuns = results.filter((r) => !r.success);

	// Success rate
	const successRate = (successfulRuns.length / results.length) * 100;

	// Calculate success rate std dev using binomial distribution approximation
	const p = successRate / 100;
	const n = results.length;
	const successRateStdDev = Math.sqrt(p * (1 - p) / n) * 100;

	// Energy statistics
	const energyAbsorbed = results.map((r) => r.attemptResult.energyAbsorbedJ);
	const energyStats = calculateStats(energyAbsorbed);

	// Stress statistics
	const peakStresses = results.map((r) => r.attemptResult.peakStressFraction);
	const stressStats = calculateStats(peakStresses);

	// Capture time statistics
	const captureTimes = results.map((r) => r.attemptResult.captureTimeS);
	const timeStats = calculateStats(captureTimes);

	// Backup system usage
	const backupUsages = results.filter((r) => r.attemptResult.usedBackupSystem);
	const backupSystemUsageRate = (backupUsages.length / results.length) * 100;

	// Failure mode breakdown
	const failureModeBreakdown: Record<CaptureFailureMode, number> = {
		miss: 0,
		overspeed: 0,
		structural: 0,
		timing: 0,
		mechanism: 0,
		angle: 0,
		overload: 0
	};

	for (const run of failedRuns) {
		if (run.attemptResult.failureMode) {
			failureModeBreakdown[run.attemptResult.failureMode]++;
		}
	}

	// Categorize failures
	const failuresByCategory = {
		targeting: failureModeBreakdown.miss + failureModeBreakdown.angle,
		velocity: failureModeBreakdown.overspeed + failureModeBreakdown.timing,
		structural: failureModeBreakdown.structural + failureModeBreakdown.overload,
		mechanical: failureModeBreakdown.mechanism
	};

	const stats: CaptureStats = {
		successRate,
		successRateStdDev,
		meanEnergyAbsorbedJ: energyStats.mean,
		energyAbsorbedStdDev: energyStats.stdDev,
		meanPeakStress: stressStats.mean,
		maxPeakStress: stressStats.max,
		meanCaptureTimeS: timeStats.mean,
		captureTime95Percentile: percentile(captureTimes, 95),
		backupSystemUsageRate,
		failureModeBreakdown,
		failuresByCategory
	};

	// Confidence interval for success rate
	const successBinary = results.map((r) => (r.success ? 100 : 0));
	const ci = confidenceInterval(successBinary);

	// Energy distribution
	const sortedEnergies = [...energyAbsorbed].sort((a, b) => a - b);
	const energyDistribution = sortedEnergies.map((energy, i) => ({
		energy,
		cumulativeProbability: ((i + 1) / sortedEnergies.length) * 100
	}));

	// Stress distribution (histogram)
	const stressBins = 10;
	const stressMax = Math.max(...peakStresses);
	const stressMin = Math.min(...peakStresses);
	const stressBinWidth = (stressMax - stressMin) / stressBins || 0.1;

	const stressHistogram: Record<number, number> = {};
	for (let i = 0; i < stressBins; i++) {
		stressHistogram[i] = 0;
	}
	for (const stress of peakStresses) {
		const bin = Math.min(stressBins - 1, Math.floor((stress - stressMin) / stressBinWidth));
		stressHistogram[bin]++;
	}

	const stressDistribution = Object.entries(stressHistogram).map(([bin, count]) => ({
		stress: stressMin + parseInt(bin) * stressBinWidth + stressBinWidth / 2,
		frequency: count
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
		energyDistribution,
		stressDistribution,
		failureModeProbabilities,
		reliabilityGrade,
		recommendation
	};
}

/**
 * Generate recommendation based on simulation results
 */
function generateRecommendation(
	config: CaptureConfig,
	stats: CaptureStats,
	failureModes: CaptureFailureInfo[]
): string {
	const methodLabel = config.captureMethod.charAt(0).toUpperCase() + config.captureMethod.slice(1);
	const parts: string[] = [];

	parts.push(
		`${methodLabel} capture achieves ${stats.successRate.toFixed(1)}% success rate ` +
		`for ${config.payloadMassKg} kg payload at ${config.arrivalVelocityMs} m/s.`
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
				if (failureInfo.mitigations.length > 0) {
					parts.push(`Consider: ${failureInfo.mitigations[0]}.`);
				}
			}
		}
	}

	if (stats.maxPeakStress > 0.9) {
		parts.push(`Peak stress (${(stats.maxPeakStress * 100).toFixed(0)}% capacity) approaching limits.`);
	}

	if (stats.backupSystemUsageRate > 20) {
		parts.push(`Backup systems engaged ${stats.backupSystemUsageRate.toFixed(0)}% of captures.`);
	}

	const chars = METHOD_CHARACTERISTICS[config.captureMethod];
	if (config.arrivalVelocityMs > chars.maxVelocityMs * 0.8) {
		parts.push(`Velocity is ${((config.arrivalVelocityMs / chars.maxVelocityMs) * 100).toFixed(0)}% of method limit.`);
	}

	return parts.join(' ');
}

/**
 * Run Monte Carlo simulation for capture system
 *
 * @param config - Simulation configuration
 * @param runs - Number of Monte Carlo iterations (default: 100)
 * @param onProgress - Optional progress callback
 * @returns Simulation output with aggregated results
 */
export async function runCaptureMonteCarlo(
	config: CaptureConfig,
	runs: number = 100,
	onProgress?: (progress: CaptureProgress) => void
): Promise<CaptureOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: CaptureRunResult[] = [];

	await runner.run(
		runs,
		async (i) => {
			const seed = (config.seed ?? Date.now()) + i;
			const result = runSingleCapture(config, i, seed);
			results.push(result);
			return result;
		},
		(progress) => {
			if (onProgress) {
				onProgress({
					currentRun: progress.currentIteration,
					totalRuns: runs,
					percentComplete: progress.percentComplete,
					method: config.captureMethod
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
 * Run comparison simulation across multiple capture methods
 *
 * @param methods - Array of capture methods to compare
 * @param baseConfig - Base configuration (method will be overridden)
 * @param runsPerMethod - Monte Carlo runs per method
 * @param onProgress - Optional progress callback
 * @returns Comparison results with analysis
 */
export async function runCaptureMethodComparison(
	methods: CaptureMethod[],
	baseConfig: Omit<CaptureConfig, 'captureMethod'>,
	runsPerMethod: number = 100,
	onProgress?: (progress: CaptureProgress) => void
): Promise<MethodComparisonResult> {
	const configs: CaptureConfig[] = methods.map((method) => ({
		...baseConfig,
		captureMethod: method
	}));

	const results: CaptureResult[] = [];
	const totalRuns = methods.length * runsPerMethod;
	let completedRuns = 0;

	for (let i = 0; i < configs.length; i++) {
		const config = configs[i];
		const output = await runCaptureMonteCarlo(config, runsPerMethod, (progress) => {
			if (onProgress) {
				const overallProgress = ((completedRuns + progress.currentRun) / totalRuns) * 100;
				onProgress({
					currentRun: completedRuns + progress.currentRun,
					totalRuns,
					percentComplete: overallProgress,
					method: config.captureMethod
				});
			}
		});
		results.push(output.result);
		completedRuns += runsPerMethod;
	}

	return {
		methods,
		configs,
		results,
		optimalMethodIndex: findOptimalMethod(methods, results),
		analysis: analyzeComparison(methods, results)
	};
}

/**
 * Find the optimal method index
 *
 * Uses weighted scoring: 60% success rate, 25% low stress, 15% efficiency
 */
function findOptimalMethod(methods: CaptureMethod[], results: CaptureResult[]): number {
	let bestIndex = 0;
	let bestScore = -Infinity;

	// Find max values for normalization
	const maxStress = Math.max(...results.map((r) => r.stats.meanPeakStress));
	const maxEnergy = Math.max(...results.map((r) => r.stats.meanEnergyAbsorbedJ));

	for (let i = 0; i < results.length; i++) {
		// Success rate score (0-100 -> 0-1)
		const successScore = results[i].stats.successRate / 100;

		// Stress score (inverted, lower is better)
		const stressScore = 1 - results[i].stats.meanPeakStress / (maxStress || 1);

		// Energy efficiency score (based on method characteristics)
		const chars = METHOD_CHARACTERISTICS[methods[i]];
		const efficiencyScore = chars.energyEfficiency;

		const score = successScore * 0.6 + stressScore * 0.25 + efficiencyScore * 0.15;

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
	methods: CaptureMethod[],
	results: CaptureResult[]
): MethodComparisonResult['analysis'] {
	// Best success rate
	const bestSuccessIdx = results.reduce(
		(best, r, i) => (r.stats.successRate > results[best].stats.successRate ? i : best),
		0
	);

	// Most energy efficient (lowest energy for same task)
	const energyEfficiencies = methods.map((m, i) => ({
		method: m,
		efficiency: METHOD_CHARACTERISTICS[m].energyEfficiency,
		actualEnergy: results[i].stats.meanEnergyAbsorbedJ
	}));
	const mostEnergyEfficient = energyEfficiencies.reduce(
		(best, curr) => (curr.efficiency > best.efficiency ? curr : best),
		energyEfficiencies[0]
	).method;

	// Lowest structural stress
	const lowestStressIdx = results.reduce(
		(best, r, i) => (r.stats.meanPeakStress < results[best].stats.meanPeakStress ? i : best),
		0
	);

	const optimalIdx = findOptimalMethod(methods, results);
	const optimalMethod = methods[optimalIdx];
	const optimalResult = results[optimalIdx];

	const recommendation =
		`${optimalMethod.charAt(0).toUpperCase() + optimalMethod.slice(1)} capture is recommended. ` +
		`Achieves ${optimalResult.stats.successRate.toFixed(1)}% success rate ` +
		`with ${(optimalResult.stats.meanPeakStress * 100).toFixed(0)}% peak structural stress. ` +
		`Reliability grade: ${optimalResult.reliabilityGrade}.`;

	return {
		bestSuccessRate: results[bestSuccessIdx].stats.successRate,
		mostEnergyEfficient,
		lowestStressMethod: methods[lowestStressIdx],
		recommendation
	};
}

/**
 * Generate comparison configs for all capture methods
 */
export function generateMethodComparisonConfigs(
	baseConfig: Omit<CaptureConfig, 'captureMethod'>
): CaptureConfig[] {
	const methods: CaptureMethod[] = ['magnetic', 'mechanical', 'net', 'foam', 'tether'];

	return methods.map((method) => ({
		...baseConfig,
		captureMethod: method
	}));
}

/**
 * Generate comparison configs for different payload masses
 */
export function generateMassComparisonConfigs(
	baseConfig: Omit<CaptureConfig, 'payloadMassKg'>
): CaptureConfig[] {
	const masses = [10, 25, 50, 100, 200, 500, 1000];

	return masses.map((mass) => ({
		...baseConfig,
		payloadMassKg: mass
	}));
}

/**
 * Generate comparison configs for different velocities
 */
export function generateVelocityComparisonConfigs(
	baseConfig: Omit<CaptureConfig, 'arrivalVelocityMs'>
): CaptureConfig[] {
	const velocities = [10, 25, 50, 100, 150, 200, 300, 400, 500];

	return velocities.map((velocity) => ({
		...baseConfig,
		arrivalVelocityMs: velocity
	}));
}

/**
 * Generate comparison configs for different accuracy levels
 */
export function generateAccuracyComparisonConfigs(
	baseConfig: Omit<CaptureConfig, 'targetAccuracyM' | 'approachAngleVarianceDeg'>
): CaptureConfig[] {
	const accuracyLevels = [
		{ position: 0.1, angle: 1, label: 'Excellent' },
		{ position: 0.5, angle: 2, label: 'Good' },
		{ position: 1.0, angle: 3, label: 'Moderate' },
		{ position: 2.0, angle: 5, label: 'Fair' },
		{ position: 5.0, angle: 10, label: 'Poor' }
	];

	return accuracyLevels.map((level) => ({
		...baseConfig,
		targetAccuracyM: level.position,
		approachAngleVarianceDeg: level.angle
	}));
}
