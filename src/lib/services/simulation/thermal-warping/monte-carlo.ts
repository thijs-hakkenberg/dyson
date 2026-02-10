/**
 * Thermal Warping Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs with stochastic material property
 * variation to determine warping statistics with confidence intervals.
 * Addresses research question:
 * - RQ-2-4: Thermal warping effects on large membranes
 */

import {
	SeededRandom,
	AsyncRunner,
	calculateStats
} from '$lib/services/simulation-core';
import {
	calculateEquilibriumTemp,
	calculateThermalGradient,
	calculateThickness,
	calculateCurvature,
	calculateMaxDeflection,
	calculateCriticalTension,
	calculateEffectiveDeflection,
	checkTolerances,
	KAPTON_E,
	KAPTON_NU
} from './warping-model';
import type {
	WarpingConfig,
	WarpingResult,
	WarpingOutput,
	WarpingComparisonResult,
	WarpingProgress,
	WarpingRunResult,
	WarpingSweepPoint,
	WarpingAreaStats
} from './types';

/**
 * Default configuration for thermal warping simulation
 */
export const DEFAULT_WARPING_CONFIG: WarpingConfig = {
	membraneArea: 100000,
	orbitalDistance: 0.5,
	cte: 20e-6,
	tension: 1.0,
	absorptivity: 0.85,
	emissivity: 0.85,
	pvEfficiency: 0.25,
	arealDensity: 25,
	iterations: 200,
	seed: undefined
};

/**
 * Log-spaced area values for sweep from 5,000 to 1,000,000 m²
 */
const AREA_STEPS = 20;

function generateAreaSweep(): number[] {
	const logMin = Math.log10(5000);
	const logMax = Math.log10(1000000);
	const areas: number[] = [];
	for (let i = 0; i < AREA_STEPS; i++) {
		const logVal = logMin + (logMax - logMin) * (i / (AREA_STEPS - 1));
		areas.push(Math.pow(10, logVal));
	}
	return areas;
}

/**
 * Run a single simulation iteration with stochastic material variation
 *
 * Applies random variation to:
 * - CTE: +/-10%
 * - Emissivity: +/-5%
 * - Tension: +/-15% (manufacturing/deployment uncertainty)
 */
function runSingleWarpingRun(
	config: WarpingConfig,
	runId: number,
	rng: SeededRandom,
	areas: number[]
): WarpingRunResult {
	// Stochastic variation in material properties
	const cteVariation = rng.nextGaussian(1.0, 0.10);
	const emissivityVariation = rng.nextGaussian(1.0, 0.05);
	const tensionVariation = rng.nextGaussian(1.0, 0.15);

	const effectiveCte = config.cte * Math.max(0.7, Math.min(1.3, cteVariation));
	const effectiveEmissivity = Math.max(0.3, Math.min(0.99,
		config.emissivity * Math.max(0.85, Math.min(1.15, emissivityVariation))
	));
	const effectiveTension = Math.max(0.01,
		config.tension * Math.max(0.55, Math.min(1.45, tensionVariation))
	);

	const sweepPoints: WarpingSweepPoint[] = areas.map((area) => {
		const tEq = calculateEquilibriumTemp(
			config.orbitalDistance,
			config.absorptivity,
			effectiveEmissivity,
			config.pvEfficiency
		);

		const dT = calculateThermalGradient(
			config.orbitalDistance,
			config.absorptivity,
			effectiveEmissivity,
			config.pvEfficiency,
			config.arealDensity
		);

		const thickness = calculateThickness(config.arealDensity);
		const kappa = calculateCurvature(effectiveCte, dT, thickness);
		const wMax = calculateMaxDeflection(kappa, area);
		const tCritical = calculateCriticalTension(kappa, KAPTON_E, thickness, KAPTON_NU);
		const wEffective = calculateEffectiveDeflection(wMax, effectiveTension, tCritical);
		const tolerances = checkTolerances(wEffective);

		return {
			area,
			equilibriumTemp: tEq,
			thermalGradient: dT,
			curvature: kappa,
			maxDeflection: wMax,
			effectiveDeflection: wEffective,
			tensionRatio: tCritical > 0 ? effectiveTension / tCritical : Infinity,
			phasedArrayOK: tolerances.phasedArrayOK,
			structuralOK: tolerances.structuralOK
		};
	});

	return { runId, sweepPoints };
}

/**
 * Aggregate results from multiple runs into per-area statistics
 */
function aggregateResults(
	runs: WarpingRunResult[],
	areas: number[],
	configuredArea: number
): WarpingResult {
	const areaStats: WarpingAreaStats[] = areas.map((area, areaIdx) => {
		const deflections = runs.map((r) => r.sweepPoints[areaIdx].effectiveDeflection);
		const temps = runs.map((r) => r.sweepPoints[areaIdx].equilibriumTemp);
		const gradients = runs.map((r) => r.sweepPoints[areaIdx].thermalGradient);
		const curvatures = runs.map((r) => r.sweepPoints[areaIdx].curvature);
		const tensionRatios = runs.map((r) => r.sweepPoints[areaIdx].tensionRatio);
		const phasedArrayPasses = runs.filter((r) => r.sweepPoints[areaIdx].phasedArrayOK).length;
		const structuralPasses = runs.filter((r) => r.sweepPoints[areaIdx].structuralOK).length;

		const deflectionStats = calculateStats(deflections);
		const tempStats = calculateStats(temps);
		const gradientStats = calculateStats(gradients);
		const curvatureStats = calculateStats(curvatures);
		const tensionStats = calculateStats(tensionRatios);

		return {
			area,
			meanDeflection: deflectionStats.mean,
			stdDevDeflection: deflectionStats.stdDev,
			p5Deflection: deflectionStats.percentile5,
			p95Deflection: deflectionStats.percentile95,
			meanTemp: tempStats.mean,
			meanGradient: gradientStats.mean,
			meanCurvature: curvatureStats.mean,
			meanTensionRatio: tensionStats.mean,
			phasedArrayPassRate: phasedArrayPasses / runs.length,
			structuralPassRate: structuralPasses / runs.length
		};
	});

	// Find closest area to configured area for summary stats
	let closestIdx = 0;
	let closestDist = Infinity;
	for (let i = 0; i < areas.length; i++) {
		const dist = Math.abs(Math.log10(areas[i]) - Math.log10(configuredArea));
		if (dist < closestDist) {
			closestDist = dist;
			closestIdx = i;
		}
	}

	return {
		areaStats,
		configuredAreaStats: areaStats[closestIdx]
	};
}

/**
 * Run Monte Carlo simulation for thermal warping
 */
export async function runWarpingMonteCarlo(
	config: WarpingConfig,
	onProgress?: (progress: WarpingProgress) => void
): Promise<WarpingOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const areas = generateAreaSweep();
	const results: WarpingRunResult[] = [];

	await runner.run(
		config.iterations,
		async (i) => {
			const seed = (config.seed ?? Date.now()) + i;
			const rng = new SeededRandom(seed);
			const result = runSingleWarpingRun(config, i, rng, areas);
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
		result: aggregateResults(results, areas, config.membraneArea),
		runs: config.iterations,
		executionTimeMs: Date.now() - startTime
	};
}

/**
 * Run comparison simulation across multiple configurations
 */
export async function runWarpingComparison(
	configs: WarpingConfig[],
	labels: string[],
	onProgress?: (progress: WarpingProgress) => void
): Promise<WarpingComparisonResult> {
	const results: WarpingResult[] = [];
	const totalRuns = configs.reduce((sum, c) => sum + c.iterations, 0);
	let completedRuns = 0;

	for (const config of configs) {
		const output = await runWarpingMonteCarlo(config, (progress) => {
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

	return { configs, results, labels };
}

/**
 * Generate configs for comparing different orbital distances
 */
export function generateDistanceConfigs(
	base: WarpingConfig
): { configs: WarpingConfig[]; labels: string[] } {
	const distances = [0.3, 0.5, 0.7, 1.0];
	return {
		configs: distances.map((d) => ({ ...base, orbitalDistance: d, iterations: 100 })),
		labels: distances.map((d) => `${d} AU`)
	};
}

/**
 * Generate configs for comparing different tension values
 */
export function generateTensionConfigs(
	base: WarpingConfig
): { configs: WarpingConfig[]; labels: string[] } {
	const tensions = [0.1, 0.5, 1.0, 5.0, 10.0];
	return {
		configs: tensions.map((t) => ({ ...base, tension: t, iterations: 100 })),
		labels: tensions.map((t) => `${t} N/m`)
	};
}
