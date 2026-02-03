/**
 * Orbital Location Trade Monte Carlo Simulation
 *
 * Multi-objective Monte Carlo analysis for optimal orbital depot location.
 * Addresses research questions rq-1-19 and rq-1-36.
 */

import {
	SeededRandom,
	AsyncRunner,
	calculateStats,
	confidenceInterval
} from '$lib/services/simulation-core';
import type {
	OrbitalLocation,
	OrbitalTradeConfig,
	OrbitalTradeRunResult,
	OrbitalTradeSimulationOutput,
	OrbitalTradeProgress,
	LocationScore,
	LocationStats,
	LocationMetrics,
	DeltaVMatrixEntry,
	ParetoAnalysis
} from './types';
import {
	ORBITAL_LOCATIONS,
	calculateTransferDeltaV,
	calculateTransferTime,
	calculateDeltaVToFeedstock,
	calculateStationKeepingDeltaV,
	generateDeltaVMatrix
} from './delta-v-calculator';
import {
	calculateThermalFeasibilityScore,
	calculateSolarPowerScore,
	calculateThermalMetrics
} from './thermal-model';
import {
	calculateCommLatencyScore,
	calculateRoundTripDelayMinutes
} from './comm-latency';

/**
 * Default configuration for orbital trade simulation
 */
export const DEFAULT_ORBITAL_TRADE_CONFIG: OrbitalTradeConfig = {
	candidateLocations: [
		'nrho',
		'sun_earth_l1',
		'sun_earth_l4',
		'sun_earth_l5',
		'helio_1au',
		'helio_0p7au',
		'helio_0p5au',
		'sun_mercury_l1'
	],
	feedstockSource: 'earth',
	thermalBudgetMW: 2.5,
	deltaVBudgetKms: 8.0,
	fleetSize: 25,
	objectiveWeights: {
		cost: 0.4,
		risk: 0.3,
		capability: 0.3
	}
};

/**
 * Calculate delta-V cost score for a location
 * Lower delta-V = higher score
 */
function calculateDeltaVScore(
	location: OrbitalLocation,
	config: OrbitalTradeConfig,
	rng: SeededRandom
): number {
	const data = ORBITAL_LOCATIONS[location];

	// Base delta-V from Earth
	let totalDeltaV = data.deltaVFromEarth;

	// Add delta-V to feedstock with some uncertainty
	const deltaVToFeedstock = calculateDeltaVToFeedstock(location, config.feedstockSource);
	totalDeltaV += deltaVToFeedstock * (1 + rng.nextGaussian(0, 0.1)); // 10% uncertainty

	// Add station-keeping
	const stationKeeping = calculateStationKeepingDeltaV(location) / 1000; // Convert to km/s
	totalDeltaV += stationKeeping;

	// Normalize against budget
	const normalizedDeltaV = totalDeltaV / config.deltaVBudgetKms;

	// Score: 1.0 if under budget, decreases exponentially if over
	if (normalizedDeltaV <= 1.0) {
		return 1.0 - 0.3 * normalizedDeltaV; // Linear decrease within budget
	} else {
		return 0.7 * Math.exp(-(normalizedDeltaV - 1.0)); // Exponential drop over budget
	}
}

/**
 * Calculate stability/risk score for a location
 * Higher stability = higher score
 */
function calculateStabilityScore(
	location: OrbitalLocation,
	rng: SeededRandom
): number {
	const data = ORBITAL_LOCATIONS[location];

	// Base score by stability class
	let baseScore: number;
	switch (data.stabilityClass) {
		case 'dynamically_stable':
			baseScore = 1.0;
			break;
		case 'quasi_stable':
			baseScore = 0.75;
			break;
		case 'unstable':
			baseScore = 0.5;
			break;
		default:
			baseScore = 0.5;
	}

	// Add small random variation for Monte Carlo
	const variation = rng.nextGaussian(0, 0.05);
	return Math.max(0, Math.min(1, baseScore + variation));
}

/**
 * Calculate feedstock accessibility score
 */
function calculateFeedstockAccessScore(
	location: OrbitalLocation,
	config: OrbitalTradeConfig,
	rng: SeededRandom
): number {
	const deltaV = calculateDeltaVToFeedstock(location, config.feedstockSource);

	// Add uncertainty
	const actualDeltaV = deltaV * (1 + rng.nextGaussian(0, 0.15));

	// Score based on delta-V: lower is better
	// Use inverse exponential
	return Math.exp(-actualDeltaV / 5);
}

/**
 * Calculate all metrics for a location
 */
function calculateLocationMetrics(
	location: OrbitalLocation,
	config: OrbitalTradeConfig
): LocationMetrics {
	const data = ORBITAL_LOCATIONS[location];
	const thermalMetrics = calculateThermalMetrics(location, config.thermalBudgetMW);

	return {
		radiatorAreaM2: thermalMetrics.radiatorAreaM2,
		solarFluxWm2: thermalMetrics.solarFluxWm2,
		roundTripLatencyMin: calculateRoundTripDelayMinutes(location),
		deltaVToFeedstock: calculateDeltaVToFeedstock(location, config.feedstockSource),
		deltaVFromFeedstock: calculateDeltaVToFeedstock(location, config.feedstockSource), // Symmetric for now
		stationKeepingDeltaV: calculateStationKeepingDeltaV(location),
		transferTimeFromEarthDays: calculateTransferTime('helio_1au', location)
	};
}

/**
 * Score a single location
 */
function scoreLocation(
	location: OrbitalLocation,
	config: OrbitalTradeConfig,
	rng: SeededRandom
): LocationScore {
	// Calculate individual scores
	const deltaVCost = calculateDeltaVScore(location, config, rng);
	const thermalFeasibility = calculateThermalFeasibilityScore(location, config.thermalBudgetMW);
	const commLatencyScore = calculateCommLatencyScore(location);
	const solarPowerScore = calculateSolarPowerScore(location);
	const stabilityScore = calculateStabilityScore(location, rng);
	const feedstockAccessScore = calculateFeedstockAccessScore(location, config, rng);

	// Calculate weighted overall score
	// Cost objective: delta-V cost + feedstock access
	const costScore = 0.6 * deltaVCost + 0.4 * feedstockAccessScore;

	// Risk objective: stability + thermal feasibility
	const riskScore = 0.5 * stabilityScore + 0.5 * thermalFeasibility;

	// Capability objective: solar power + comm latency
	const capabilityScore = 0.4 * solarPowerScore + 0.3 * commLatencyScore + 0.3 * thermalFeasibility;

	// Combined weighted score
	const overallScore =
		config.objectiveWeights.cost * costScore +
		config.objectiveWeights.risk * riskScore +
		config.objectiveWeights.capability * capabilityScore;

	return {
		location,
		deltaVCost,
		thermalFeasibility,
		commLatencyScore,
		solarPowerScore,
		stabilityScore,
		feedstockAccessScore,
		overallScore,
		isParetoOptimal: false, // Set later
		metrics: calculateLocationMetrics(location, config)
	};
}

/**
 * Identify Pareto-optimal solutions
 * A solution is Pareto-optimal if no other solution dominates it in all objectives
 */
function identifyParetoFrontier(scores: LocationScore[]): OrbitalLocation[] {
	const paretoOptimal: OrbitalLocation[] = [];

	for (const candidate of scores) {
		let isDominated = false;

		for (const other of scores) {
			if (other.location === candidate.location) continue;

			// Check if other dominates candidate
			// (better or equal in all objectives, strictly better in at least one)
			const otherBetterCost = other.deltaVCost >= candidate.deltaVCost;
			const otherBetterRisk = other.stabilityScore >= candidate.stabilityScore;
			const otherBetterCapability =
				other.solarPowerScore * 0.5 + other.commLatencyScore * 0.5 >=
				candidate.solarPowerScore * 0.5 + candidate.commLatencyScore * 0.5;
			const otherBetterThermal = other.thermalFeasibility >= candidate.thermalFeasibility;

			const otherStrictlyBetter =
				other.deltaVCost > candidate.deltaVCost ||
				other.stabilityScore > candidate.stabilityScore ||
				other.solarPowerScore > candidate.solarPowerScore ||
				other.thermalFeasibility > candidate.thermalFeasibility;

			if (otherBetterCost && otherBetterRisk && otherBetterCapability && otherBetterThermal && otherStrictlyBetter) {
				isDominated = true;
				break;
			}
		}

		if (!isDominated) {
			paretoOptimal.push(candidate.location);
		}
	}

	return paretoOptimal;
}

/**
 * Run a single Monte Carlo iteration
 */
function runSingleIteration(
	runId: number,
	config: OrbitalTradeConfig,
	rng: SeededRandom
): OrbitalTradeRunResult {
	// Score all candidate locations
	const locationScores = config.candidateLocations.map((loc) =>
		scoreLocation(loc, config, rng)
	);

	// Identify Pareto frontier
	const paretoFrontier = identifyParetoFrontier(locationScores);

	// Mark Pareto-optimal locations
	for (const score of locationScores) {
		score.isParetoOptimal = paretoFrontier.includes(score.location);
	}

	// Find optimal by each objective
	const sortedByCost = [...locationScores].sort((a, b) => b.deltaVCost - a.deltaVCost);
	const sortedByRisk = [...locationScores].sort((a, b) => b.stabilityScore - a.stabilityScore);
	const sortedByCapability = [...locationScores].sort(
		(a, b) =>
			b.solarPowerScore * 0.5 + b.commLatencyScore * 0.5 -
			(a.solarPowerScore * 0.5 + a.commLatencyScore * 0.5)
	);

	// Overall recommendation: highest weighted score among Pareto-optimal
	const paretoScores = locationScores.filter((s) => s.isParetoOptimal);
	const recommendation = paretoScores.length > 0
		? paretoScores.sort((a, b) => b.overallScore - a.overallScore)[0].location
		: locationScores.sort((a, b) => b.overallScore - a.overallScore)[0].location;

	return {
		runId,
		config,
		locationScores,
		paretoFrontier,
		optimalForCost: sortedByCost[0].location,
		optimalForCapability: sortedByCapability[0].location,
		optimalForRisk: sortedByRisk[0].location,
		recommendation
	};
}

/**
 * Aggregate results from multiple Monte Carlo runs
 */
function aggregateResults(
	runs: OrbitalTradeRunResult[],
	config: OrbitalTradeConfig
): {
	locationStats: LocationStats[];
	recommendation: OrbitalLocation;
	robustParetoFrontier: OrbitalLocation[];
} {
	const locationStats: LocationStats[] = [];

	for (const location of config.candidateLocations) {
		// Collect scores for this location across all runs
		const scores = runs.map((run) => {
			const score = run.locationScores.find((s) => s.location === location);
			return score?.overallScore ?? 0;
		});

		// Calculate Pareto frequency
		const paretoCount = runs.filter((run) =>
			run.paretoFrontier.includes(location)
		).length;

		// Calculate recommendation frequency
		const recommendCount = runs.filter(
			(run) => run.recommendation === location
		).length;

		const stats = calculateStats(scores);
		const ci = confidenceInterval(scores);

		locationStats.push({
			location,
			meanScore: stats.mean,
			stdDevScore: stats.stdDev,
			paretoFrequency: paretoCount / runs.length,
			recommendationFrequency: recommendCount / runs.length,
			confidenceInterval95: {
				lower: ci.lower,
				upper: ci.upper
			}
		});
	}

	// Sort by recommendation frequency, then mean score
	locationStats.sort((a, b) => {
		if (Math.abs(a.recommendationFrequency - b.recommendationFrequency) > 0.05) {
			return b.recommendationFrequency - a.recommendationFrequency;
		}
		return b.meanScore - a.meanScore;
	});

	// Most frequently recommended location
	const recommendation = locationStats[0].location;

	// Robust Pareto frontier: locations on frontier > 50% of runs
	const robustParetoFrontier = locationStats
		.filter((s) => s.paretoFrequency > 0.5)
		.map((s) => s.location);

	return { locationStats, recommendation, robustParetoFrontier };
}

/**
 * Run Monte Carlo simulation for orbital location trade analysis
 */
export async function runOrbitalTradeMonteCarlo(
	config: OrbitalTradeConfig = DEFAULT_ORBITAL_TRADE_CONFIG,
	runs: number = 100,
	onProgress?: (progress: OrbitalTradeProgress) => void
): Promise<OrbitalTradeSimulationOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: OrbitalTradeRunResult[] = [];

	const baseSeed = config.seed ?? Date.now();

	await runner.run(
		runs,
		async (i) => {
			const rng = new SeededRandom(baseSeed + i);
			const result = runSingleIteration(i, config, rng);
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

	// Aggregate results
	const { locationStats, recommendation, robustParetoFrontier } = aggregateResults(
		results,
		config
	);

	// Generate delta-V matrix
	const deltaVMatrix = generateDeltaVMatrix(config.candidateLocations);

	return {
		config,
		locationStats,
		recommendation,
		robustParetoFrontier,
		deltaVMatrix,
		runs,
		executionTimeMs: Date.now() - startTime
	};
}

/**
 * Perform Pareto analysis on simulation results
 */
export function performParetoAnalysis(
	output: OrbitalTradeSimulationOutput
): ParetoAnalysis {
	// Get a representative run result by creating scores from stats
	const scores: LocationScore[] = output.locationStats.map((stat) => {
		const location = stat.location;
		const data = ORBITAL_LOCATIONS[location];

		return {
			location,
			deltaVCost: 1 - data.deltaVFromEarth / 12, // Normalize
			thermalFeasibility: calculateThermalFeasibilityScore(location, output.config.thermalBudgetMW),
			commLatencyScore: calculateCommLatencyScore(location),
			solarPowerScore: calculateSolarPowerScore(location),
			stabilityScore: data.stabilityClass === 'dynamically_stable' ? 1.0 :
				data.stabilityClass === 'quasi_stable' ? 0.75 : 0.5,
			feedstockAccessScore: 0.5, // Placeholder
			overallScore: stat.meanScore,
			isParetoOptimal: stat.paretoFrequency > 0.5,
			metrics: calculateLocationMetrics(location, output.config)
		};
	});

	const paretoFrontier = scores.filter((s) => s.isParetoOptimal);
	const dominated = scores.filter((s) => !s.isParetoOptimal);

	// Calculate utopia and nadir points
	const utopiaPoint = {
		cost: Math.max(...scores.map((s) => s.deltaVCost)),
		risk: Math.max(...scores.map((s) => s.stabilityScore)),
		capability: Math.max(...scores.map((s) => s.solarPowerScore))
	};

	const nadirPoint = {
		cost: Math.min(...scores.map((s) => s.deltaVCost)),
		risk: Math.min(...scores.map((s) => s.stabilityScore)),
		capability: Math.min(...scores.map((s) => s.solarPowerScore))
	};

	return {
		paretoFrontier,
		dominated,
		utopiaPoint,
		nadirPoint
	};
}

/**
 * Generate configurations for sensitivity analysis
 */
export function generateSensitivityConfigs(
	baseConfig: OrbitalTradeConfig
): OrbitalTradeConfig[] {
	const configs: OrbitalTradeConfig[] = [];

	// Vary feedstock source
	const feedstockSources: Array<'earth' | 'nea' | 'mercury'> = ['earth', 'nea', 'mercury'];
	for (const source of feedstockSources) {
		configs.push({ ...baseConfig, feedstockSource: source });
	}

	// Vary thermal budget
	const thermalBudgets = [1.5, 2.5, 3.5, 5.0];
	for (const budget of thermalBudgets) {
		configs.push({ ...baseConfig, thermalBudgetMW: budget });
	}

	// Vary delta-V budget
	const deltaVBudgets = [4, 6, 8, 10, 12];
	for (const budget of deltaVBudgets) {
		configs.push({ ...baseConfig, deltaVBudgetKms: budget });
	}

	// Vary objective weights
	const weightSets = [
		{ cost: 0.6, risk: 0.2, capability: 0.2 }, // Cost-focused
		{ cost: 0.2, risk: 0.6, capability: 0.2 }, // Risk-focused
		{ cost: 0.2, risk: 0.2, capability: 0.6 }, // Capability-focused
		{ cost: 0.33, risk: 0.33, capability: 0.34 } // Balanced
	];
	for (const weights of weightSets) {
		configs.push({ ...baseConfig, objectiveWeights: weights });
	}

	return configs;
}
