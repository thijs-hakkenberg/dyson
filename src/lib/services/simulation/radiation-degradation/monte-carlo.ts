/**
 * Radiation Degradation Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs to determine degradation statistics
 * with confidence intervals. Addresses research questions:
 * - RQ-1-1: PV technology selection for radiation environment
 * - RQ-0-25: Thin-film viability in Phase 0 demonstrator
 * - RQ-2-2: PV degradation in Phase 2 swarm expansion
 */

import {
	SeededRandom,
	AsyncRunner,
	calculateStats,
	confidenceInterval
} from '$lib/services/simulation-core';
import {
	simulateDegradationCurve,
	findHalfLifeYear,
	TECHNOLOGY_COEFFICIENTS,
	shieldingFactor
} from './degradation-model';
import type {
	RadiationDegradationConfig,
	RadiationDegradationResult,
	RadiationDegradationOutput,
	RadiationDegradationComparisonResult,
	RadiationDegradationProgress,
	RadiationDegradationRunResult,
	PowerCurvePoint,
	ReplacementEvent,
	PVTechnology
} from './types';

/**
 * Default configuration for radiation degradation simulation
 */
export const DEFAULT_RADIATION_CONFIG: RadiationDegradationConfig = {
	orbitalDistance: 0.5,
	pvTechnology: 'cdte',
	shieldingMass: 5,
	missionDuration: 15,
	initialEfficiency: 22,
	solarProtonEventRate: 10,
	temperatureCycling: true,
	iterations: 100,
	seed: undefined
};

/**
 * Run a single simulation iteration
 */
function runSingleSimulation(
	config: RadiationDegradationConfig,
	runId: number,
	seed: number
): RadiationDegradationRunResult {
	const rng = new SeededRandom(seed);
	const curve = simulateDegradationCurve(config, rng);
	const halfLife = findHalfLifeYear(curve, config.initialEfficiency);

	// Calculate derived metrics
	const endOfLifeEfficiency = curve[curve.length - 1].efficiency;
	const totalDegradation = config.initialEfficiency - endOfLifeEfficiency;
	const degradationRatePerYear = totalDegradation / config.missionDuration;

	// Calculate SPE damage estimate (rough approximation)
	const totalSPEDamage = config.solarProtonEventRate * config.missionDuration * 0.5;

	// Thermal fatigue factor
	const thermalFatigueFactor = config.temperatureCycling ? 1.2 : 1.0;

	return {
		runId,
		config,
		powerCurve: curve,
		endOfLifeEfficiency,
		halfLifeYear: halfLife,
		totalSPEDamage,
		thermalFatigueFactor,
		degradationRatePerYear
	};
}

/**
 * Aggregate results from multiple simulation runs
 */
function aggregateResults(
	results: RadiationDegradationRunResult[],
	config: RadiationDegradationConfig
): RadiationDegradationResult {
	const endEfficiencies = results.map((r) => r.endOfLifeEfficiency);
	const halfLives = results.map((r) => r.halfLifeYear);

	const efficiencyStats = calculateStats(endEfficiencies);
	const halfLifeStats = calculateStats(halfLives);
	const efficiencyCI = confidenceInterval(endEfficiencies);

	// Calculate mean power curve and standard deviations
	const meanCurve: PowerCurvePoint[] = [];
	const stdDevs: number[] = [];

	for (let year = 0; year <= config.missionDuration; year++) {
		const yearEfficiencies = results.map((r) => r.powerCurve[year]?.efficiency ?? 0);
		const yearPowers = results.map((r) => r.powerCurve[year]?.power ?? 0);
		const stats = calculateStats(yearEfficiencies);

		meanCurve.push({
			year,
			efficiency: stats.mean,
			power: yearPowers.reduce((a, b) => a + b, 0) / yearPowers.length
		});
		stdDevs.push(stats.stdDev);
	}

	// Generate replacement schedule based on efficiency threshold (70% of initial)
	const replacementThreshold = config.initialEfficiency * 0.7;
	const replacementSchedule: ReplacementEvent[] = [];

	for (let i = 0; i < meanCurve.length; i++) {
		if (meanCurve[i].efficiency < replacementThreshold) {
			replacementSchedule.push({
				year: meanCurve[i].year,
				reason: `Efficiency dropped below ${replacementThreshold.toFixed(1)}% threshold (current: ${meanCurve[i].efficiency.toFixed(1)}%)`
			});
			break;
		}
	}

	// If no replacement needed during mission, note that
	if (replacementSchedule.length === 0 && meanCurve.length > 0) {
		const finalEfficiency = meanCurve[meanCurve.length - 1].efficiency;
		if (finalEfficiency >= replacementThreshold) {
			// No replacement needed
		}
	}

	// Calculate shielding tradeoff (doubling shielding mass)
	const currentShieldingFactor = shieldingFactor(config.shieldingMass);
	const doubleShieldingFactor = shieldingFactor(config.shieldingMass * 2);
	const lifetimeImprovement =
		(currentShieldingFactor - doubleShieldingFactor) / currentShieldingFactor;

	// Calculate survival probability (% of runs staying above replacement threshold)
	const survivingRuns = endEfficiencies.filter((e) => e > replacementThreshold).length;
	const survivalProbability = (survivingRuns / endEfficiencies.length) * 100;

	return {
		powerCurve: meanCurve,
		powerCurveStdDev: stdDevs,
		endOfLifeEfficiency: efficiencyStats.mean,
		endOfLifeEfficiencyStdDev: efficiencyStats.stdDev,
		halfLifeYear: halfLifeStats.mean,
		halfLifeYearStdDev: halfLifeStats.stdDev,
		replacementSchedule,
		shieldingTradeoff: {
			massPercentIncrease: 100, // Doubling = 100% increase
			lifetimePercentIncrease: lifetimeImprovement * 100
		},
		confidenceInterval95: {
			efficiencyLower: efficiencyCI.lower,
			efficiencyUpper: efficiencyCI.upper
		},
		survivalProbability
	};
}

/**
 * Run Monte Carlo simulation for radiation degradation
 *
 * @param config - Simulation configuration
 * @param runs - Number of Monte Carlo iterations (default: 100)
 * @param onProgress - Optional progress callback
 * @returns Simulation output with aggregated results
 */
export async function runRadiationDegradationMonteCarlo(
	config: RadiationDegradationConfig,
	runs: number = 100,
	onProgress?: (progress: RadiationDegradationProgress) => void
): Promise<RadiationDegradationOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: RadiationDegradationRunResult[] = [];

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
					pvTechnology: config.pvTechnology
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
export async function runRadiationDegradationComparison(
	configs: RadiationDegradationConfig[],
	runsPerConfig: number = 100,
	onProgress?: (progress: RadiationDegradationProgress) => void
): Promise<RadiationDegradationComparisonResult> {
	const results: RadiationDegradationResult[] = [];
	const totalRuns = configs.length * runsPerConfig;
	let completedRuns = 0;

	for (const config of configs) {
		const output = await runRadiationDegradationMonteCarlo(config, runsPerConfig, (progress) => {
			if (onProgress) {
				const overallProgress = ((completedRuns + progress.currentRun) / totalRuns) * 100;
				onProgress({
					currentRun: completedRuns + progress.currentRun,
					totalRuns,
					percentComplete: overallProgress,
					pvTechnology: config.pvTechnology
				});
			}
		});
		results.push(output.result);
		completedRuns += runsPerConfig;
	}

	return {
		configs,
		results,
		optimalTechnologyIndex: findOptimalTechnology(results),
		analysis: analyzeComparison(configs, results)
	};
}

/**
 * Find the optimal technology/configuration index
 *
 * Uses weighted scoring: 60% half-life, 40% end-of-life efficiency
 */
function findOptimalTechnology(results: RadiationDegradationResult[]): number {
	let bestIndex = 0;
	let bestScore = -Infinity;

	for (let i = 0; i < results.length; i++) {
		// Score: weighted combination of lifetime and end efficiency
		// Normalize half-life to ~0-25 year range
		const lifetimeScore = results[i].halfLifeYear / 25;
		// Normalize efficiency to 0-35% range
		const efficiencyScore = results[i].endOfLifeEfficiency / 35;

		const score = lifetimeScore * 0.6 + efficiencyScore * 0.4;

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
	configs: RadiationDegradationConfig[],
	results: RadiationDegradationResult[]
): RadiationDegradationComparisonResult['analysis'] {
	const bestLifetimeIdx = results.reduce(
		(best, r, i) => (r.halfLifeYear > results[best].halfLifeYear ? i : best),
		0
	);
	const bestEfficiencyIdx = results.reduce(
		(best, r, i) => (r.endOfLifeEfficiency > results[best].endOfLifeEfficiency ? i : best),
		0
	);

	const optimalIdx = findOptimalTechnology(results);
	const optimalConfig = configs[optimalIdx];
	const optimalResult = results[optimalIdx];

	const techName = optimalConfig.pvTechnology.toUpperCase().replace('-', ' ');

	const recommendation =
		`${techName} technology recommended at ${optimalConfig.orbitalDistance} AU ` +
		`with ${optimalConfig.shieldingMass} g/m^2 shielding. ` +
		`Expected half-life: ${optimalResult.halfLifeYear.toFixed(1)} years, ` +
		`end-of-life efficiency: ${optimalResult.endOfLifeEfficiency.toFixed(1)}%. ` +
		`Survival probability to end of mission: ${optimalResult.survivalProbability.toFixed(0)}%.`;

	return {
		bestLifetime: results[bestLifetimeIdx].halfLifeYear,
		bestEfficiency: results[bestEfficiencyIdx].endOfLifeEfficiency,
		recommendation
	};
}

/**
 * Generate comparison configs for all PV technologies
 *
 * Sets appropriate initial efficiency for each technology based on
 * their maximum achievable efficiency.
 */
export function generateTechnologyComparisonConfigs(
	baseConfig: Omit<RadiationDegradationConfig, 'pvTechnology' | 'initialEfficiency'> & {
		pvTechnology?: PVTechnology;
		initialEfficiency?: number;
	}
): RadiationDegradationConfig[] {
	const technologies: PVTechnology[] = ['perovskite', 'cdte', 'iii-v', 'silicon', 'hybrid'];

	return technologies.map((tech) => ({
		...baseConfig,
		pvTechnology: tech,
		initialEfficiency: TECHNOLOGY_COEFFICIENTS[tech].maxEfficiency
	}));
}

/**
 * Generate comparison configs for different orbital distances
 *
 * Tests distances from 0.3 AU (Mercury orbit) to 1.0 AU (Earth orbit)
 */
export function generateOrbitalDistanceComparisonConfigs(
	baseConfig: Omit<RadiationDegradationConfig, 'orbitalDistance'> & {
		orbitalDistance?: number;
	}
): RadiationDegradationConfig[] {
	const distances = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

	return distances.map((d) => ({
		...baseConfig,
		orbitalDistance: d
	}));
}

/**
 * Generate comparison configs for different shielding masses
 *
 * Tests shielding from minimal (1 g/m^2) to heavy (50 g/m^2)
 */
export function generateShieldingComparisonConfigs(
	baseConfig: Omit<RadiationDegradationConfig, 'shieldingMass'> & {
		shieldingMass?: number;
	}
): RadiationDegradationConfig[] {
	const shieldingMasses = [1, 2, 5, 10, 15, 20, 30, 50];

	return shieldingMasses.map((mass) => ({
		...baseConfig,
		shieldingMass: mass
	}));
}
