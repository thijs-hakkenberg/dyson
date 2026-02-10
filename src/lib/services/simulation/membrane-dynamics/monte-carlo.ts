/**
 * Membrane Dynamics Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs with stochastic manufacturing
 * variations to determine stability statistics and flutter boundaries.
 * Addresses research question:
 * - RQ-1-7: Large-scale membrane deployment dynamics
 */

import { SeededRandom, AsyncRunner } from '$lib/services/simulation-core';
import {
	analyzeMembranePoint,
	analyzeWithGrid,
	findFlutterBoundaryTension,
	loadModalGrid
} from './membrane-model';
import type {
	MembraneConfig,
	MembraneResult,
	MembraneOutput,
	MembraneComparisonResult,
	MembraneProgress,
	MembraneRunResult,
	MembraneSweepPoint,
	ModalGridData
} from './types';

/**
 * Default configuration for membrane dynamics simulation
 */
export const DEFAULT_MEMBRANE_CONFIG: MembraneConfig = {
	diameter: 500,
	arealDensity: 42,
	tension: 1.0,
	spinRate: 0.1,
	boomStiffness: 1e5,
	dampingRatio: 0.03,
	orbitalDistance: 0.5,
	iterations: 100,
	seed: undefined
};

/**
 * Run a single membrane simulation with stochastic variations
 *
 * Manufacturing tolerances: +/-5% on tension, +/-3% on areal density
 */
export function runSingleMembraneRun(
	config: MembraneConfig,
	rng: SeededRandom,
	grid?: ModalGridData | null
): MembraneRunResult {
	// Apply manufacturing variation
	const tensionVariation = rng.nextGaussian(1.0, 0.05); // 5% CoV
	const densityVariation = rng.nextGaussian(1.0, 0.03); // 3% CoV

	const perturbedTension = config.tension * Math.max(0.8, tensionVariation);
	const perturbedDensity = config.arealDensity * Math.max(0.85, densityVariation);

	const perturbedConfig = {
		...config,
		tension: perturbedTension,
		arealDensity: perturbedDensity
	};

	const { result: modal } = analyzeWithGrid(grid ?? null, perturbedConfig);

	return {
		runId: 0,
		config: perturbedConfig,
		modal,
		perturbedTension,
		perturbedDensity
	};
}

/**
 * Perform a diameter sweep to find stability boundaries
 */
function runDiameterSweep(
	baseConfig: MembraneConfig,
	grid: ModalGridData | null
): MembraneSweepPoint[] {
	const diameters = [100, 150, 200, 250, 300, 400, 500, 600, 750, 1000];
	const points: MembraneSweepPoint[] = [];

	for (const diameter of diameters) {
		const testConfig = { ...baseConfig, diameter };
		const { result } = analyzeWithGrid(grid, testConfig);
		const boundaryTension = findFlutterBoundaryTension(testConfig);

		points.push({
			diameter,
			stability: result.stability,
			flutterMargin: result.flutterMargin,
			lowestFrequency: result.naturalFrequencies[0],
			flutterBoundaryTension: boundaryTension
		});
	}

	return points;
}

/**
 * Run Monte Carlo simulation for membrane dynamics
 */
export async function runMembraneMonteCarlo(
	config: MembraneConfig,
	onProgress?: (progress: MembraneProgress) => void
): Promise<MembraneOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const runs = config.iterations;

	// Attempt to load pre-computed grid
	const grid = await loadModalGrid();
	const usedPrecomputed = grid !== null;

	const results: MembraneRunResult[] = [];

	await runner.run(
		runs,
		async (i) => {
			const seed = (config.seed ?? Date.now()) + i;
			const rng = new SeededRandom(seed);
			const result = runSingleMembraneRun(config, rng, grid);
			result.runId = i;
			results.push(result);
			return result;
		},
		(progress) => {
			if (onProgress) {
				onProgress({
					currentRun: progress.currentIteration,
					totalRuns: runs,
					percentComplete: progress.percentComplete * 0.8, // Reserve 20% for sweep
					phase: 'Monte Carlo runs'
				});
			}
		}
	);

	// Run diameter sweep
	if (onProgress) {
		onProgress({
			currentRun: runs,
			totalRuns: runs,
			percentComplete: 85,
			phase: 'Diameter sweep'
		});
	}

	const sweepPoints = runDiameterSweep(config, grid);

	// Aggregate results
	const stableCount = results.filter((r) => r.modal.stability === 'stable').length;
	const marginalCount = results.filter((r) => r.modal.stability === 'marginal').length;
	const flutterCount = results.filter((r) => r.modal.stability === 'flutter').length;

	const flutterMargins = results.map((r) => r.modal.flutterMargin);
	const meanFM = flutterMargins.reduce((a, b) => a + b, 0) / flutterMargins.length;
	const variance =
		flutterMargins.reduce((a, b) => a + (b - meanFM) * (b - meanFM), 0) /
		flutterMargins.length;
	const stdDevFM = Math.sqrt(variance);

	const frequencies = results.map((r) => r.modal.naturalFrequencies[0]);
	const meanFreq = frequencies.reduce((a, b) => a + b, 0) / frequencies.length;

	// Get nominal modal result
	const { result: modalResult } = analyzeWithGrid(grid, config);

	if (onProgress) {
		onProgress({
			currentRun: runs,
			totalRuns: runs,
			percentComplete: 100,
			phase: 'Complete'
		});
	}

	return {
		config,
		result: {
			sweepPoints,
			modalResult,
			stableFraction: stableCount / runs,
			marginalFraction: marginalCount / runs,
			flutterFraction: flutterCount / runs,
			meanFlutterMargin: meanFM,
			stdDevFlutterMargin: stdDevFM,
			meanLowestFrequency: meanFreq
		},
		runs,
		executionTimeMs: Date.now() - startTime,
		usedPrecomputed: usedPrecomputed
	};
}

/**
 * Run comparison across multiple configurations
 */
export async function runMembraneComparison(
	configs: MembraneConfig[],
	onProgress?: (progress: MembraneProgress) => void
): Promise<MembraneComparisonResult> {
	const results: MembraneResult[] = [];
	const totalRuns = configs.length * (configs[0]?.iterations ?? 100);
	let completedRuns = 0;

	for (const config of configs) {
		const output = await runMembraneMonteCarlo(config, (progress) => {
			if (onProgress) {
				const overallProgress =
					((completedRuns + progress.currentRun) / totalRuns) * 100;
				onProgress({
					currentRun: completedRuns + progress.currentRun,
					totalRuns,
					percentComplete: overallProgress,
					phase: progress.phase
				});
			}
		});
		results.push(output.result);
		completedRuns += config.iterations;
	}

	// Find best configuration
	let bestIdx = 0;
	let bestMargin = -Infinity;
	for (let i = 0; i < results.length; i++) {
		if (results[i].meanFlutterMargin > bestMargin) {
			bestMargin = results[i].meanFlutterMargin;
			bestIdx = i;
		}
	}

	const bestConfig = configs[bestIdx];
	const bestResult = results[bestIdx];

	return {
		configs,
		results,
		analysis: {
			bestFlutterMargin: bestResult.meanFlutterMargin,
			bestDiameterForStability: bestConfig.diameter,
			recommendation:
				`Optimal configuration: ${bestConfig.diameter}m diameter at ` +
				`${bestConfig.tension} N/m tension with ${bestConfig.spinRate} RPM spin. ` +
				`Flutter margin: ${bestResult.meanFlutterMargin.toFixed(1)}x. ` +
				`Stability probability: ${(bestResult.stableFraction * 100).toFixed(0)}%.`
		}
	};
}

/**
 * Generate tension sweep configs for comparison
 */
export function generateTensionConfigs(base: MembraneConfig): MembraneConfig[] {
	const tensions = [0.1, 0.3, 0.5, 1.0, 2.0, 3.0, 5.0, 10.0];
	return tensions.map((t) => ({ ...base, tension: t }));
}

/**
 * Generate spin rate sweep configs for comparison
 */
export function generateSpinConfigs(base: MembraneConfig): MembraneConfig[] {
	const spins = [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5];
	return spins.map((s) => ({ ...base, spinRate: s }));
}
