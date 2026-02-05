/**
 * Electrical Fault Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs to determine electrical fault
 * statistics with confidence intervals. Addresses research questions:
 * - RQ-1-4: High-voltage system design in plasma environment
 * - RQ-1-8: Insulation and fault protection requirements
 * - RQ-2-1: Power distribution architecture at scale
 */

import {
	SeededRandom,
	calculateStats,
	confidenceInterval,
	AsyncRunner
} from '$lib/services/simulation-core';
import {
	calculatePlasmaDensity,
	calculatePaschenBreakdownVoltage,
	calculateArcInitiationProbability,
	calculateDebyeLength,
	calculateElectronTemperature,
	calculateAnnualArcProbability
} from './paschen-model';
import {
	calculateBreakdownVoltage,
	calculateFaultPropagationProbability,
	calculateMassPerMW,
	calculateReliability,
	calculateRequiredIsolationTime
} from './insulation-model';
import type {
	ElectricalFaultConfig,
	ElectricalFaultResult,
	ElectricalFaultSimulationOutput,
	ElectricalFaultComparisonResult,
	ElectricalFaultRunResult,
	ElectricalFaultProgress,
	YearlyFaultStats,
	InsulationMaterial,
	FaultPropagationRisk
} from './types';

/**
 * Default electrical fault simulation configuration
 */
export const DEFAULT_ELECTRICAL_FAULT_CONFIG: ElectricalFaultConfig = {
	voltageLevel: 1000, // 1 kV DC
	orbitalDistance: 0.5, // 0.5 AU (between Mercury and Venus)
	insulationMaterial: 'kapton',
	insulationThickness: 1.0, // 1 mm
	detectionResponseTime: 10, // 10 ms detection
	isolationResponseTime: 50, // 50 ms isolation
	systemTopology: 'hybrid',
	totalPowerCapacity: 100, // 100 MW
	iterations: 100,
	seed: undefined
};

/**
 * Run a single simulation iteration
 */
function runSingleSimulation(
	config: ElectricalFaultConfig,
	runId: number,
	seed: number
): ElectricalFaultRunResult {
	const rng = new SeededRandom(seed);
	const hoursPerYear = 8760;
	const missionYears = 10;

	// Calculate plasma environment with stochastic variation
	const baseDensity = calculatePlasmaDensity(config.orbitalDistance);
	const electronTemp = calculateElectronTemperature(config.orbitalDistance);
	const debyeLength = calculateDebyeLength(baseDensity, electronTemp);

	// Add stochastic variation to plasma density (solar wind variability)
	// Solar wind density can vary by factor of 2-3
	const densityVariation = rng.nextGaussian(1.0, 0.3);
	const effectiveDensity = baseDensity * Math.max(0.3, Math.min(3.0, densityVariation));

	// Calculate Paschen breakdown with stochastic gap distance
	// Gap can vary due to manufacturing tolerances and thermal effects
	const baseGap = 0.01; // 1 cm nominal gap
	const gapVariation = rng.nextGaussian(baseGap, 0.002);
	const gapDistance = Math.max(0.001, gapVariation);
	const paschenBreakdown = calculatePaschenBreakdownVoltage(effectiveDensity, gapDistance);

	// Calculate insulation breakdown with aging variation
	const ageVariation = rng.nextRange(0, 5); // Random aging up to 5 years
	const insulationBreakdown = calculateBreakdownVoltage(
		config.insulationMaterial,
		config.insulationThickness,
		ageVariation,
		config.orbitalDistance
	);

	// Effective breakdown is the minimum (weakest link)
	const effectiveBreakdown = Math.min(paschenBreakdown, insulationBreakdown);

	// Calculate practical arc probability
	// In real space systems, arcing is dominated by:
	// 1. Surface contamination and defects
	// 2. Plasma-induced charging
	// 3. Transient overvoltages (switching, lightning)
	// 4. Partial discharge in micro-voids
	//
	// Reference arc rate model based on ISS solar array data and ESD studies:
	// Base rate ~1e-6 arcs/m^2/year at 100V (very rare events)
	// Rate scales as V^1.5 (empirical from space systems)
	const baseArcRatePerYear = 1e-6; // per m^2 at 100V reference (rare events)
	const voltageExponent = 1.5;
	const referenceVoltage = 100;

	// Plasma density effect (higher density = more charging = more arcs)
	// Use log scaling to prevent extreme values
	const densityRatio = effectiveDensity / calculatePlasmaDensity(1.0);
	const plasmaDensityFactor = 1 + Math.log10(Math.max(1, densityRatio));

	// Insulation quality factor (better insulation = fewer arcs)
	// Thicker insulation provides better protection
	const insulationFactor = 1.0 / (1 + config.insulationThickness);

	// Material radiation resistance affects arc rate
	// Lower values = better (fewer arcs)
	const materialProps = {
		kapton: 0.8,
		polyimide: 0.85,
		teflon: 1.0,
		ceramic: 0.6
	};
	const materialFactor = materialProps[config.insulationMaterial];

	// Calculate arc rate per MW of power capacity
	// Higher voltage = fewer conductors per MW = less exposed surface
	const areaPerMW = 10 * Math.sqrt(1000 / config.voltageLevel); // m^2/MW

	// Stochastic variation in arc rate
	const stochasticFactor = rng.nextGaussian(1.0, 0.3);

	// Annual arc probability calculation
	const voltageScaling = Math.pow(config.voltageLevel / referenceVoltage, voltageExponent);
	const arcRatePerMWPerYear =
		baseArcRatePerYear *
		voltageScaling *
		areaPerMW *
		plasmaDensityFactor *
		insulationFactor *
		materialFactor *
		Math.max(0.3, stochasticFactor);

	// System-level arc probability (convert rate to probability)
	const systemArcRate = arcRatePerMWPerYear * config.totalPowerCapacity;
	const annualArcProb = 1 - Math.exp(-systemArcRate);

	// Calculate fault propagation probability with response time variation
	const detectionVar = config.detectionResponseTime * rng.nextGaussian(1.0, 0.1);
	const isolationVar = config.isolationResponseTime * rng.nextGaussian(1.0, 0.1);
	const propagationProb = calculateFaultPropagationProbability(
		config.systemTopology,
		Math.max(1, detectionVar),
		Math.max(1, isolationVar)
	);

	// Simulate year-by-year fault events
	const yearlyStats: YearlyFaultStats[] = [];
	let totalArcEvents = 0;
	let totalCascadeFaults = 0;

	for (let year = 1; year <= missionYears; year++) {
		// Arc events this year (Poisson process)
		// Rate scales with power capacity (more conductors = more opportunities)
		const arcRate = Math.max(0.01, annualArcProb * config.totalPowerCapacity / 10);

		// Sample from Poisson distribution (approximate with exponential)
		const arcEvents = Math.floor(rng.nextExponential(1 / arcRate));

		// Cascade faults from propagation
		let cascadeFaults = 0;
		for (let i = 0; i < arcEvents; i++) {
			if (rng.next() < propagationProb) {
				cascadeFaults++;
			}
		}

		totalArcEvents += arcEvents;
		totalCascadeFaults += cascadeFaults;

		// System availability based on downtime
		// Arc events: ~0.1 hours downtime each
		// Cascade faults: ~2 hours downtime each
		const downtime = arcEvents * 0.1 + cascadeFaults * 2;
		const availability = Math.max(0, 1 - downtime / hoursPerYear);

		yearlyStats.push({
			year,
			arcEvents,
			faultsIsolated: arcEvents - cascadeFaults,
			cascadeFaults,
			systemAvailability: availability
		});
	}

	// Calculate mean time between faults (MTBF)
	const mtbf =
		totalArcEvents > 0 ? (missionYears * hoursPerYear) / totalArcEvents : missionYears * hoursPerYear;

	// Determine fault propagation risk level
	const riskLevel: FaultPropagationRisk =
		propagationProb < 0.1 ? 'low' : propagationProb < 0.3 ? 'medium' : 'high';

	return {
		runId,
		config,
		arcProbabilityPerYear: annualArcProb,
		meanTimeBetweenFaults: mtbf,
		faultPropagationRisk: riskLevel,
		insulationBreakdownVoltage: insulationBreakdown,
		plasmaDensity: effectiveDensity,
		paschenBreakdownVoltage: paschenBreakdown,
		totalArcEvents,
		totalCascadeFaults,
		yearlyStats
	};
}

/**
 * Aggregate results from multiple simulation runs
 */
function aggregateResults(
	runs: ElectricalFaultRunResult[],
	config: ElectricalFaultConfig
): ElectricalFaultResult {
	// Extract metrics for statistical analysis
	const arcProbs = runs.map((r) => r.arcProbabilityPerYear);
	const mtbfs = runs.map((r) => r.meanTimeBetweenFaults);
	const propagationProbs = runs.map((r) =>
		r.faultPropagationRisk === 'low' ? 0.05 : r.faultPropagationRisk === 'medium' ? 0.15 : 0.35
	);

	// Calculate statistics
	const arcStats = calculateStats(arcProbs);
	const mtbfStats = calculateStats(mtbfs);
	const arcCI = confidenceInterval(arcProbs);

	// Average propagation probability for risk assessment
	const avgPropagation = propagationProbs.reduce((a, b) => a + b, 0) / propagationProbs.length;

	// Calculate recommended voltage by orbital distance
	const orbits = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
	const recommendedVoltageByOrbit = orbits.map((au) => {
		const density = calculatePlasmaDensity(au);
		const paschenV = calculatePaschenBreakdownVoltage(density, 0.01);
		const insulationV = calculateBreakdownVoltage(
			config.insulationMaterial,
			config.insulationThickness,
			0,
			au
		);
		// Use 50% safety margin for recommended max voltage
		const maxSafe = Math.min(paschenV, insulationV) * 0.5;
		return { au, maxVoltage: Math.min(10000, Math.max(600, maxSafe)) };
	});

	// Calculate insulation material mass/reliability tradeoff
	const materials: InsulationMaterial[] = ['kapton', 'polyimide', 'teflon', 'ceramic'];
	const insulationMassTradeoff = materials.map((mat) => ({
		material: mat,
		massPerMW: calculateMassPerMW(mat, config.insulationThickness, config.voltageLevel),
		reliability: calculateReliability(
			mat,
			config.insulationThickness,
			config.voltageLevel,
			config.orbitalDistance,
			10
		)
	}));

	// Calculate required isolation time for current risk level
	const currentRiskLevel: 'low' | 'medium' | 'high' =
		avgPropagation < 0.1 ? 'low' : avgPropagation < 0.3 ? 'medium' : 'high';
	const requiredIsolationTime = calculateRequiredIsolationTime(
		config.systemTopology,
		currentRiskLevel,
		config.detectionResponseTime
	);

	return {
		arcProbabilityPerYear: arcStats.mean,
		arcProbabilityStdDev: arcStats.stdDev,
		meanTimeBetweenFaults: mtbfStats.mean,
		mtbfStdDev: mtbfStats.stdDev,
		faultPropagationRisk:
			avgPropagation < 0.1 ? 'low' : avgPropagation < 0.3 ? 'medium' : 'high',
		requiredIsolationTime,
		recommendedVoltageByOrbit,
		insulationMassTradeoff,
		confidenceInterval95: {
			arcProbLower: arcCI.lower,
			arcProbUpper: arcCI.upper
		}
	};
}

/**
 * Run Monte Carlo simulation for electrical fault analysis
 *
 * @param config - Simulation configuration
 * @param runs - Number of Monte Carlo runs (default 100)
 * @param onProgress - Optional progress callback
 * @returns Simulation output with aggregated results
 */
export async function runElectricalFaultMonteCarlo(
	config: ElectricalFaultConfig,
	runs: number = 100,
	onProgress?: (progress: ElectricalFaultProgress) => void
): Promise<ElectricalFaultSimulationOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: ElectricalFaultRunResult[] = [];

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
					currentMaterial: config.insulationMaterial
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
 * Run comparison between different configurations
 *
 * @param configs - Array of configurations to compare
 * @param runsPerConfig - Number of runs per configuration
 * @param onProgress - Optional progress callback
 * @returns Comparison results
 */
export async function runElectricalFaultComparison(
	configs: ElectricalFaultConfig[],
	runsPerConfig: number = 100,
	onProgress?: (progress: ElectricalFaultProgress) => void
): Promise<ElectricalFaultComparisonResult> {
	const results: ElectricalFaultResult[] = [];
	const totalRuns = configs.length * runsPerConfig;
	let completedRuns = 0;

	for (const config of configs) {
		const output = await runElectricalFaultMonteCarlo(config, runsPerConfig, (progress) => {
			if (onProgress) {
				const overallProgress = ((completedRuns + progress.currentRun) / totalRuns) * 100;
				onProgress({
					currentRun: completedRuns + progress.currentRun,
					totalRuns,
					percentComplete: overallProgress,
					currentMaterial: config.insulationMaterial
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
 * Optimizes for low arc probability and high MTBF
 */
function findOptimalConfig(results: ElectricalFaultResult[]): number {
	let bestIndex = 0;
	let bestScore = -Infinity;

	for (let i = 0; i < results.length; i++) {
		// Score: higher MTBF and lower arc probability are better
		const mtbfScore = Math.log10(Math.max(1, results[i].meanTimeBetweenFaults));
		const arcProbScore = -Math.log10(Math.max(1e-10, results[i].arcProbabilityPerYear));

		// Combined score (weight arc probability higher for safety)
		const score = mtbfScore * 0.4 + arcProbScore * 0.6;

		if (score > bestScore) {
			bestScore = score;
			bestIndex = i;
		}
	}

	return bestIndex;
}

/**
 * Analyze comparison results and generate recommendations
 */
function analyzeComparison(
	configs: ElectricalFaultConfig[],
	results: ElectricalFaultResult[]
): ElectricalFaultComparisonResult['analysis'] {
	const bestMTBFIdx = results.reduce(
		(best, r, i) => (r.meanTimeBetweenFaults > results[best].meanTimeBetweenFaults ? i : best),
		0
	);

	const lowestArcProbIdx = results.reduce(
		(best, r, i) => (r.arcProbabilityPerYear < results[best].arcProbabilityPerYear ? i : best),
		0
	);

	const optimalIdx = findOptimalConfig(results);
	const optimalConfig = configs[optimalIdx];
	const optimalResult = results[optimalIdx];

	let recommendation: string;

	if (optimalResult.arcProbabilityPerYear < 0.01) {
		recommendation =
			`Configuration with ${optimalConfig.voltageLevel}V at ${optimalConfig.orbitalDistance} AU using ${optimalConfig.insulationMaterial} insulation is recommended. ` +
			`Arc probability is ${(optimalResult.arcProbabilityPerYear * 100).toFixed(2)}% per year with MTBF of ${(optimalResult.meanTimeBetweenFaults / 8760).toFixed(1)} years. ` +
			`Fault propagation risk is ${optimalResult.faultPropagationRisk}.`;
	} else {
		recommendation =
			`Arc probability of ${(optimalResult.arcProbabilityPerYear * 100).toFixed(1)}% per year is elevated. ` +
			`Consider reducing voltage from ${optimalConfig.voltageLevel}V, increasing insulation thickness from ${optimalConfig.insulationThickness}mm, ` +
			`or operating at greater orbital distance. Current MTBF: ${(optimalResult.meanTimeBetweenFaults / 8760).toFixed(1)} years.`;
	}

	return {
		bestMTBF: results[bestMTBFIdx].meanTimeBetweenFaults,
		lowestArcProb: results[lowestArcProbIdx].arcProbabilityPerYear,
		bestIsolationTime: Math.min(...results.map((r) => r.requiredIsolationTime)),
		recommendation
	};
}

/**
 * Generate comparison configurations for voltage analysis
 */
export function generateVoltageComparisonConfigs(
	baseConfig: Omit<ElectricalFaultConfig, 'voltageLevel'> & { voltageLevel?: number }
): ElectricalFaultConfig[] {
	const voltages = [600, 1000, 1500, 2000, 3000, 5000, 7500, 10000];
	return voltages.map((v) => ({ ...DEFAULT_ELECTRICAL_FAULT_CONFIG, ...baseConfig, voltageLevel: v }));
}

/**
 * Generate comparison configurations for orbital distance analysis
 */
export function generateOrbitalComparisonConfigs(
	baseConfig: Omit<ElectricalFaultConfig, 'orbitalDistance'> & { orbitalDistance?: number }
): ElectricalFaultConfig[] {
	const distances = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
	return distances.map((d) => ({
		...DEFAULT_ELECTRICAL_FAULT_CONFIG,
		...baseConfig,
		orbitalDistance: d
	}));
}

/**
 * Generate comparison configurations for insulation material analysis
 */
export function generateMaterialComparisonConfigs(
	baseConfig: Omit<ElectricalFaultConfig, 'insulationMaterial'> & { insulationMaterial?: InsulationMaterial }
): ElectricalFaultConfig[] {
	const materials: InsulationMaterial[] = ['kapton', 'polyimide', 'teflon', 'ceramic'];
	return materials.map((m) => ({
		...DEFAULT_ELECTRICAL_FAULT_CONFIG,
		...baseConfig,
		insulationMaterial: m
	}));
}
