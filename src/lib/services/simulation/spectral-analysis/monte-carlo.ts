/**
 * Spectral Analysis Monte Carlo Simulation
 *
 * Compares on-board vs ground spectral unmixing approaches
 * through throughput and latency analysis.
 */

import { SeededRandom, calculateStats, confidenceInterval, AsyncRunner } from '$lib/services/simulation-core';
import { calculateRawDataSize, calculateProcessedDataSize } from './data-volume';
import { canDownlinkInWindow, calculateBandwidthUtilization } from './bandwidth-model';
import { calculateTotalDecisionLatency, canDecideInWindow } from './latency-model';
import type {
	SpectralConfig,
	SpectralResult,
	SpectralSimulationOutput,
	SpectralComparisonResult,
	SpectralProgress,
	SpectralRunResult,
	SpectralYearlyStats,
	Encounter,
	ProcessingLocation
} from './types';

/**
 * Default spectral configuration
 */
export const DEFAULT_SPECTRAL_CONFIG: SpectralConfig = {
	processingLocation: 'onboard',
	satelliteCount: 50,
	bandwidthMbps: 10,
	missionDurationYears: 7,
	encounterRatePerYear: 20
};

/**
 * Run a single simulation iteration
 */
function runSingleSimulation(config: SpectralConfig, runId: number, seed: number): SpectralRunResult {
	const rng = new SeededRandom(seed);
	const hoursPerYear = 365 * 24;
	const missionHours = config.missionDurationYears * hoursPerYear;

	// Generate encounters for all satellites
	const encounters: Encounter[] = [];
	let encounterId = 0;

	for (let satIdx = 0; satIdx < config.satelliteCount; satIdx++) {
		const satelliteId = `sat-${satIdx + 1}`;

		// Generate encounters using Poisson process
		let currentTime = 0;
		while (currentTime < missionHours) {
			// Exponential inter-arrival time
			const interArrival = rng.nextExponential(config.encounterRatePerYear / hoursPerYear);
			currentTime += interArrival;

			if (currentTime >= missionHours) break;

			// Generate encounter properties
			const windowHours = rng.nextRange(2, 12); // 2-12 hour observation window
			const rawDataSize = calculateRawDataSize(windowHours);
			const processedDataSize = calculateProcessedDataSize(windowHours);
			const priority = rng.next(); // Random priority

			encounters.push({
				id: `enc-${++encounterId}`,
				satelliteId,
				time: currentTime,
				windowHours,
				rawDataSizeMb: rawDataSize,
				processedDataSizeMb: processedDataSize,
				priority,
				surveyed: false
			});
		}
	}

	// Sort encounters by time
	encounters.sort((a, b) => a.time - b.time);

	// Process encounters based on configuration
	let totalDataDownlinked = 0;
	const latencies: number[] = [];
	let missedByBandwidth = 0;
	let missedByLatency = 0;
	let missedByWindow = 0;

	for (const encounter of encounters) {
		// Determine data size based on processing location
		const dataToDownlink =
			config.processingLocation === 'onboard'
				? encounter.processedDataSizeMb
				: encounter.rawDataSizeMb;

		// Check bandwidth constraint
		const canDownlink = canDownlinkInWindow(
			dataToDownlink,
			config.bandwidthMbps,
			encounter.windowHours
		);

		if (!canDownlink) {
			encounter.missedReason = 'bandwidth';
			missedByBandwidth++;
			continue;
		}

		// Check latency constraint
		const latency = calculateTotalDecisionLatency(
			config.processingLocation,
			encounter.rawDataSizeMb,
			config.bandwidthMbps,
			0.1 // Typical NEA distance
		);

		if (latency > encounter.windowHours) {
			encounter.missedReason = 'latency';
			missedByLatency++;
			continue;
		}

		// Success - mark as surveyed
		encounter.surveyed = true;
		totalDataDownlinked += dataToDownlink;
		latencies.push(latency);
	}

	// Calculate yearly statistics
	const yearlyStats: SpectralYearlyStats[] = [];
	for (let year = 1; year <= config.missionDurationYears; year++) {
		const yearStart = (year - 1) * hoursPerYear;
		const yearEnd = year * hoursPerYear;
		const yearEncounters = encounters.filter((e) => e.time >= yearStart && e.time < yearEnd);
		const surveyed = yearEncounters.filter((e) => e.surveyed).length;

		yearlyStats.push({
			year,
			encounters: yearEncounters.length,
			surveyed,
			missed: yearEncounters.length - surveyed,
			bandwidthUtilization: calculateBandwidthUtilization(
				totalDataDownlinked / config.missionDurationYears,
				config.bandwidthMbps,
				hoursPerYear
			),
			avgDecisionLatencyHours:
				latencies.length > 0 ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0
		});
	}

	const surveyed = encounters.filter((e) => e.surveyed).length;
	const missed = encounters.length - surveyed;

	return {
		runId,
		config,
		totalEncounters: encounters.length,
		targetsSurveyed: surveyed,
		missedOpportunities: missed,
		missedByBandwidth,
		missedByLatency,
		missedByWindow,
		bandwidthUtilization: calculateBandwidthUtilization(
			totalDataDownlinked,
			config.bandwidthMbps * config.satelliteCount, // Total constellation bandwidth
			missionHours
		),
		avgDecisionLatencyHours:
			latencies.length > 0 ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0,
		dataDownlinkedMb: totalDataDownlinked,
		yearlyStats
	};
}

/**
 * Aggregate results from multiple runs
 */
function aggregateResults(results: SpectralRunResult[]): SpectralResult {
	const surveyed = results.map((r) => r.targetsSurveyed);
	const missed = results.map((r) => r.missedOpportunities);
	const latencies = results.map((r) => r.avgDecisionLatencyHours);
	const utilizations = results.map((r) => r.bandwidthUtilization);

	const surveyedStats = calculateStats(surveyed);
	const latencyStats = calculateStats(latencies);
	const ci = confidenceInterval(surveyed);

	const totalEncounters = results.reduce((sum, r) => sum + r.totalEncounters, 0) / results.length;
	const avgSurveyed = surveyed.reduce((a, b) => a + b, 0) / surveyed.length;

	return {
		targetsSurveyed: surveyedStats.mean,
		targetsSurveyedStdDev: surveyedStats.stdDev,
		missedOpportunities: missed.reduce((a, b) => a + b, 0) / missed.length,
		missedByBandwidth: results.reduce((sum, r) => sum + r.missedByBandwidth, 0) / results.length,
		missedByLatency: results.reduce((sum, r) => sum + r.missedByLatency, 0) / results.length,
		missedByWindow: results.reduce((sum, r) => sum + r.missedByWindow, 0) / results.length,
		bandwidthUtilization: utilizations.reduce((a, b) => a + b, 0) / utilizations.length,
		avgDecisionLatencyHours: latencyStats.mean,
		avgDecisionLatencyStdDev: latencyStats.stdDev,
		surveyEfficiency: totalEncounters > 0 ? avgSurveyed / totalEncounters : 0,
		confidenceInterval95: {
			surveyedLower: ci.lower,
			surveyedUpper: ci.upper
		}
	};
}

/**
 * Run Monte Carlo simulation for spectral analysis
 */
export async function runSpectralMonteCarlo(
	config: SpectralConfig,
	runs: number = 100,
	onProgress?: (progress: SpectralProgress) => void
): Promise<SpectralSimulationOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: SpectralRunResult[] = [];

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
					percentComplete: progress.percentComplete,
					processingLocation: config.processingLocation
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
 * Run comparison between on-board and ground processing
 */
export async function runSpectralComparison(
	baseConfig: Omit<SpectralConfig, 'processingLocation'>,
	runsPerConfig: number = 100,
	onProgress?: (progress: SpectralProgress) => void
): Promise<SpectralComparisonResult> {
	const onboardConfig: SpectralConfig = { ...baseConfig, processingLocation: 'onboard' };
	const groundConfig: SpectralConfig = { ...baseConfig, processingLocation: 'ground' };

	const totalRuns = runsPerConfig * 2;
	let completedRuns = 0;

	const onboardOutput = await runSpectralMonteCarlo(onboardConfig, runsPerConfig, (p) => {
		if (onProgress) {
			onProgress({
				...p,
				currentRun: completedRuns + p.currentRun,
				totalRuns,
				percentComplete: ((completedRuns + p.currentRun) / totalRuns) * 100
			});
		}
	});
	completedRuns += runsPerConfig;

	const groundOutput = await runSpectralMonteCarlo(groundConfig, runsPerConfig, (p) => {
		if (onProgress) {
			onProgress({
				...p,
				currentRun: completedRuns + p.currentRun,
				totalRuns,
				percentComplete: ((completedRuns + p.currentRun) / totalRuns) * 100
			});
		}
	});

	return {
		onboardResult: onboardOutput.result,
		groundResult: groundOutput.result,
		onboardConfig,
		groundConfig,
		analysis: analyzeComparison(onboardOutput.result, groundOutput.result)
	};
}

/**
 * Analyze comparison between on-board and ground results
 */
function analyzeComparison(
	onboard: SpectralResult,
	ground: SpectralResult
): SpectralComparisonResult['analysis'] {
	const surveyedDiff = onboard.targetsSurveyed - ground.targetsSurveyed;
	const surveyedDiffPercent =
		ground.targetsSurveyed > 0 ? (surveyedDiff / ground.targetsSurveyed) * 100 : 0;
	const latencyDiff = ground.avgDecisionLatencyHours - onboard.avgDecisionLatencyHours;
	const bandwidthSavings =
		ground.bandwidthUtilization > 0
			? ((ground.bandwidthUtilization - onboard.bandwidthUtilization) /
					ground.bandwidthUtilization) *
				100
			: 0;

	let recommendation: string;
	if (surveyedDiff > 0 && bandwidthSavings > 50) {
		recommendation = `On-board processing is recommended: surveys ${Math.abs(surveyedDiff).toFixed(0)} more targets (+${Math.abs(surveyedDiffPercent).toFixed(1)}%) while saving ${bandwidthSavings.toFixed(0)}% bandwidth.`;
	} else if (surveyedDiff < 0) {
		recommendation = `Ground processing surveys ${Math.abs(surveyedDiff).toFixed(0)} more targets but requires ${Math.abs(bandwidthSavings).toFixed(0)}% more bandwidth.`;
	} else {
		recommendation = `On-board processing provides similar survey results with ${bandwidthSavings.toFixed(0)}% bandwidth savings and ${latencyDiff.toFixed(1)}h faster decisions.`;
	}

	return {
		surveyedDifference: surveyedDiff,
		surveyedDifferencePercent: surveyedDiffPercent,
		latencyDifferenceHours: latencyDiff,
		bandwidthSavingsPercent: Math.max(0, bandwidthSavings),
		recommendation
	};
}
