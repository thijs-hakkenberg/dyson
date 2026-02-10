/**
 * Thermodynamic Cascade Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs with stochastic variation
 * to determine cascade efficiency statistics with confidence intervals.
 *
 * Stochastic parameters per run:
 * - TPV efficiency: +/-15% variation
 * - Spectral selectivity: +/-5% variation
 * - Inter-shell thermal leakage: +/-10% variation on waste heat transfer
 *
 * Addresses research question:
 * - RQ-3a-1: Thermodynamic cascade efficiency limits
 */

import {
	SeededRandom,
	AsyncRunner,
	calculateStats,
	confidenceInterval
} from '$lib/services/simulation-core';
import {
	calculateShellTemperatures,
	calculateCarnotEfficiency,
	calculateRadiatorArea,
	L_SUN
} from './cascade-model';
import type {
	CascadeConfig,
	CascadeRunResult,
	CascadeResult,
	CascadeOutput,
	CascadeComparisonResult,
	CascadeProgress,
	ShellData
} from './types';

/**
 * Default configuration for cascade simulation
 */
export const DEFAULT_CASCADE_CONFIG: CascadeConfig = {
	shellCount: 4,
	innerTemp: 1200,
	outerTemp: 40,
	tpvEfficiency: 0.35,
	spectralSelectivity: 0.90,
	solarInputPower: L_SUN,
	minUsefulPower: 1e18,
	iterations: 100,
	seed: undefined
};

/**
 * Run a single cascade simulation with stochastic variation
 */
export function runSingleCascadeRun(config: CascadeConfig, rng: SeededRandom): CascadeRunResult {
	const temperatures = calculateShellTemperatures(
		config.shellCount,
		config.innerTemp,
		config.outerTemp
	);

	const shells: ShellData[] = [];
	let currentPowerIn = config.solarInputPower;
	let totalExtracted = 0;
	let totalRadiatorArea = 0;
	let viableShellCount = 0;

	const stageCount = temperatures.length - 1;

	for (let i = 0; i < stageCount; i++) {
		const tHot = temperatures[i];
		const tCold = temperatures[i + 1];

		const carnotEff = calculateCarnotEfficiency(tHot, tCold);

		// Stochastic variation on TPV efficiency (+/-15%)
		const tpvVariation = rng.nextGaussian(1.0, 0.15);
		const effectiveTpvEff = config.tpvEfficiency * Math.max(0.5, Math.min(1.5, tpvVariation));

		// Stochastic variation on spectral selectivity (+/-5%)
		const spectralVariation = rng.nextGaussian(1.0, 0.05);
		const effectiveSpectral =
			config.spectralSelectivity * Math.max(0.7, Math.min(1.0, spectralVariation));

		const actualEff = carnotEff * effectiveTpvEff * effectiveSpectral;
		const powerExtracted = currentPowerIn * actualEff;
		const basePowerWaste = currentPowerIn - powerExtracted;

		// Stochastic inter-shell thermal leakage (+/-10%)
		const leakageVariation = rng.nextGaussian(1.0, 0.10);
		const powerWaste = basePowerWaste * Math.max(0.8, Math.min(1.2, leakageVariation));

		const radiatorArea = calculateRadiatorArea(powerWaste, tCold);
		const isViable = powerExtracted >= config.minUsefulPower;

		if (isViable) {
			viableShellCount++;
		}

		shells.push({
			index: i,
			tempHot: tHot,
			tempCold: tCold,
			carnotEfficiency: carnotEff,
			actualEfficiency: actualEff,
			powerIn: currentPowerIn,
			powerExtracted,
			powerWaste,
			radiatorArea,
			isViable
		});

		totalExtracted += powerExtracted;
		totalRadiatorArea += radiatorArea;
		currentPowerIn = powerWaste;
	}

	return {
		shells,
		totalExtracted,
		totalEfficiency: totalExtracted / config.solarInputPower,
		viableShellCount,
		totalRadiatorArea
	};
}

/**
 * Aggregate multiple run results into statistical summary
 */
function aggregateResults(runs: CascadeRunResult[], config: CascadeConfig): CascadeResult {
	const efficiencies = runs.map((r) => r.totalEfficiency);
	const totalExtracted = runs.map((r) => r.totalExtracted);
	const viableCounts = runs.map((r) => r.viableShellCount);
	const radiatorAreas = runs.map((r) => r.totalRadiatorArea);

	const effStats = calculateStats(efficiencies);
	const extractedStats = calculateStats(totalExtracted);
	const viableStats = calculateStats(viableCounts);
	const radiatorStats = calculateStats(radiatorAreas);

	const ci = confidenceInterval(efficiencies);

	// Shell-by-shell breakdown (average across runs)
	const stageCount = config.shellCount - 1;
	const shellBreakdown: ShellData[] = [];
	const shellEfficiencyStats: CascadeResult['shellEfficiencyStats'] = [];

	for (let i = 0; i < stageCount; i++) {
		const shellRuns = runs.map((r) => r.shells[i]).filter(Boolean);
		if (shellRuns.length === 0) continue;

		const shellEffs = shellRuns.map((s) => s.actualEfficiency);
		const shellExtracted = shellRuns.map((s) => s.powerExtracted);
		const shellWaste = shellRuns.map((s) => s.powerWaste);
		const shellRadiator = shellRuns.map((s) => s.radiatorArea);

		const effMean = calculateStats(shellEffs);
		const extractedMean = calculateStats(shellExtracted);
		const wasteMean = calculateStats(shellWaste);
		const radiatorMean = calculateStats(shellRadiator);

		shellBreakdown.push({
			index: i,
			tempHot: shellRuns[0].tempHot,
			tempCold: shellRuns[0].tempCold,
			carnotEfficiency: shellRuns[0].carnotEfficiency,
			actualEfficiency: effMean.mean,
			powerIn: calculateStats(shellRuns.map((s) => s.powerIn)).mean,
			powerExtracted: extractedMean.mean,
			powerWaste: wasteMean.mean,
			radiatorArea: radiatorMean.mean,
			isViable: extractedMean.mean >= config.minUsefulPower
		});

		shellEfficiencyStats.push({
			index: i,
			meanEfficiency: effMean.mean,
			meanPowerExtracted: extractedMean.mean,
			meanPowerWaste: wasteMean.mean,
			meanRadiatorArea: radiatorMean.mean
		});
	}

	return {
		meanEfficiency: effStats.mean,
		efficiencyStdDev: effStats.stdDev,
		efficiencyCI: { lower: ci.lower, upper: ci.upper },
		meanTotalExtracted: extractedStats.mean,
		meanViableShellCount: viableStats.mean,
		meanTotalRadiatorArea: radiatorStats.mean,
		shellBreakdown,
		shellEfficiencyStats
	};
}

/**
 * Run Monte Carlo simulation for thermodynamic cascade
 */
export async function runCascadeMonteCarlo(
	config: CascadeConfig,
	onProgress?: (progress: CascadeProgress) => void
): Promise<CascadeOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: CascadeRunResult[] = [];
	const runs = config.iterations;

	await runner.run(
		runs,
		async (i) => {
			const seed = (config.seed ?? Date.now()) + i;
			const rng = new SeededRandom(seed);
			const result = runSingleCascadeRun(config, rng);
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
		result: aggregateResults(results, config),
		runs,
		executionTimeMs: Date.now() - startTime
	};
}

/**
 * Run comparison across multiple cascade configurations
 */
export async function runCascadeComparison(
	configs: CascadeConfig[],
	labels: string[],
	onProgress?: (progress: CascadeProgress) => void
): Promise<CascadeComparisonResult> {
	const results: CascadeResult[] = [];
	const totalRuns = configs.reduce((sum, c) => sum + c.iterations, 0);
	let completedRuns = 0;

	for (let i = 0; i < configs.length; i++) {
		const output = await runCascadeMonteCarlo(configs[i], (p) => {
			if (onProgress) {
				onProgress({
					currentRun: completedRuns + p.currentRun,
					totalRuns,
					percentComplete: ((completedRuns + p.currentRun) / totalRuns) * 100
				});
			}
		});
		results.push(output.result);
		completedRuns += configs[i].iterations;
	}

	// Find best efficiency
	let bestIdx = 0;
	let bestEff = 0;
	for (let i = 0; i < results.length; i++) {
		if (results[i].meanEfficiency > bestEff) {
			bestEff = results[i].meanEfficiency;
			bestIdx = i;
		}
	}

	return {
		configs,
		results,
		labels,
		bestEfficiencyIndex: bestIdx,
		analysis: {
			bestEfficiency: bestEff,
			bestShellCount: configs[bestIdx].shellCount,
			recommendation:
				`${configs[bestIdx].shellCount - 1}-stage cascade achieves ${(bestEff * 100).toFixed(1)}% ` +
				`total efficiency with ${results[bestIdx].meanViableShellCount.toFixed(1)} viable shells. ` +
				`${labels[bestIdx]} configuration is optimal for this parameter set.`
		}
	};
}

/**
 * Generate configs comparing different shell counts (2-7)
 */
export function generateShellCountConfigs(base: CascadeConfig): {
	configs: CascadeConfig[];
	labels: string[];
} {
	const shellCounts = [2, 3, 4, 5, 6, 7];
	const configs = shellCounts.map((count) => ({ ...base, shellCount: count }));
	const labels = shellCounts.map((count) => `${count} shells`);
	return { configs, labels };
}

/**
 * Generate configs comparing different TPV efficiencies
 */
export function generateTPVEfficiencyConfigs(base: CascadeConfig): {
	configs: CascadeConfig[];
	labels: string[];
} {
	const efficiencies = [0.2, 0.3, 0.35, 0.4, 0.5];
	const configs = efficiencies.map((eff) => ({ ...base, tpvEfficiency: eff }));
	const labels = efficiencies.map((eff) => `${(eff * 100).toFixed(0)}% TPV`);
	return { configs, labels };
}
