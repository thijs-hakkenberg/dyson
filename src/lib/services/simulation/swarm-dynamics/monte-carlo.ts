/**
 * Swarm Dynamics Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs to determine swarm dynamics
 * statistics with confidence intervals. Addresses research questions:
 * - rq-1-2: Station-keeping requirements
 * - rq-1-6: Collision probability
 * - rq-1-37: Propulsion authority
 */

import {
	SeededRandom,
	calculateStats,
	confidenceInterval,
	AsyncRunner,
	CONSTANTS,
	type Stats
} from '$lib/services/simulation-core';
import { calculateSRP, effectiveSRPDeltaV } from './solar-pressure';
import {
	calculateSwarmPerturbations,
	calculateRequiredDeltaV,
	calculateVelocityUncertainty,
	calculatePropellantLifetime,
	getPropulsionCharacteristics
} from './orbital-perturbations';
import {
	calculateCollisionStats,
	simulateCloseApproaches,
	calculateCollisionLifetime,
	effectiveCollisionProbability
} from './collision-model';
import type {
	SwarmDynamicsConfig,
	SwarmDynamicsResult,
	SwarmDynamicsSimulationOutput,
	SwarmDynamicsComparisonResult,
	SwarmDynamicsProgress,
	SwarmDynamicsRunResult,
	YearlyStats,
	PropulsionType
} from './types';

/**
 * Default swarm dynamics configuration
 */
export const DEFAULT_SWARM_DYNAMICS_CONFIG: SwarmDynamicsConfig = {
	orbitalDistanceAU: 0.5,
	collectorAreaM2: 10000,
	collectorMassKg: 500,
	swarmSize: 1000,
	interUnitSpacingM: 1000,
	propulsionType: 'hybrid',
	simulationYears: 10,
	reflectivity: 0.9,
	seed: undefined
};

/**
 * Run a single simulation iteration
 */
function runSingleSimulation(
	config: SwarmDynamicsConfig,
	runId: number,
	seed: number
): SwarmDynamicsRunResult {
	const rng = new SeededRandom(seed);
	const hoursPerYear = 365.25 * 24;

	// Calculate SRP parameters
	const srp = calculateSRP(
		config.collectorAreaM2,
		config.collectorMassKg,
		config.orbitalDistanceAU,
		config.reflectivity
	);

	// Calculate effective SRP delta-V (with duty cycle and efficiency)
	// Add random variation for each run
	const dutyCycleVariation = rng.nextGaussian(0.5, 0.05);
	const efficiencyVariation = rng.nextGaussian(0.7, 0.05);
	const srpDeltaVPerYear = effectiveSRPDeltaV(
		config.collectorAreaM2,
		config.collectorMassKg,
		config.orbitalDistanceAU,
		config.reflectivity,
		Math.max(0.1, Math.min(0.9, dutyCycleVariation)),
		Math.max(0.3, Math.min(0.9, efficiencyVariation))
	);

	// Calculate perturbations with variation
	const srpVariability = rng.nextGaussian(0.01, 0.002);
	const perturbations = calculateSwarmPerturbations(
		config.orbitalDistanceAU,
		config.interUnitSpacingM,
		config.collectorMassKg,
		srp.accelerationMs2,
		Math.max(0.001, srpVariability)
	);

	// Calculate required delta-V with margin variation
	const controlMargin = rng.nextGaussian(1.5, 0.2);
	const requiredDeltaVPerYear = calculateRequiredDeltaV(
		perturbations,
		Math.max(1.1, controlMargin)
	);

	// SRP control authority ratio
	const srpControlAuthority = srpDeltaVPerYear / requiredDeltaVPerYear;

	// Calculate velocity uncertainty
	const controlBandwidth = rng.nextGaussian(0.001, 0.0002);
	const velocityUncertaintyMs = calculateVelocityUncertainty(
		config.propulsionType,
		perturbations,
		Math.max(0.0001, controlBandwidth)
	);

	// Calculate collision statistics
	const collisionStats = calculateCollisionStats(
		config.swarmSize,
		config.interUnitSpacingM,
		config.collectorAreaM2,
		velocityUncertaintyMs
	);

	// Calculate effective collision probability with avoidance
	const avoidanceSuccessRate = config.propulsionType === 'srp_only' ? 0.5 : 0.9;
	const detectionLeadTime = 24; // hours
	const maneuverCapability = srpDeltaVPerYear / hoursPerYear; // m/s available per hour
	const requiredAvoidanceDeltaV = 0.01; // typical avoidance maneuver m/s

	const effectiveCollisionProb = effectiveCollisionProbability(
		collisionStats.collisionProbPerUnitYear,
		avoidanceSuccessRate,
		detectionLeadTime,
		maneuverCapability,
		requiredAvoidanceDeltaV
	);

	// Calculate mission lifetimes
	const propellantLifetime = calculatePropellantLifetime(
		config.propulsionType,
		config.collectorMassKg,
		requiredDeltaVPerYear,
		config.simulationYears
	);

	const collisionLifetime = calculateCollisionLifetime(
		config.swarmSize,
		effectiveCollisionProb,
		0.5 // 50% operational threshold
	);

	const missionLifetimeYears = Math.min(
		propellantLifetime,
		collisionLifetime,
		config.simulationYears
	);

	// Simulate year-by-year dynamics
	const yearlyStats: YearlyStats[] = [];
	let operationalUnits = config.swarmSize;
	let cumulativeCollisions = 0;
	let totalCloseApproaches = 0;
	let propellantRemaining = 1.0;

	const propProps = getPropulsionCharacteristics(config.propulsionType, config.simulationYears);
	const annualPropellantConsumption = propProps.isPropellantLimited
		? propProps.propellantFraction / config.simulationYears
		: 0;

	for (let year = 1; year <= config.simulationYears; year++) {
		// Simulate close approaches for this year
		const yearEvents = simulateCloseApproaches(
			operationalUnits,
			config.interUnitSpacingM,
			config.collectorAreaM2,
			velocityUncertaintyMs,
			hoursPerYear,
			rng
		);

		const yearCollisions = yearEvents.filter((e) => e.collision).length;
		const yearCloseApproaches = yearEvents.length - yearCollisions;

		cumulativeCollisions += yearCollisions;
		totalCloseApproaches += yearCloseApproaches;

		// Units lost to collisions (2 per collision)
		operationalUnits = Math.max(0, operationalUnits - yearCollisions * 2);

		// Propellant consumption
		propellantRemaining = Math.max(0, propellantRemaining - annualPropellantConsumption);

		// Position error (accumulates with reduced control)
		const controlDegradation = propProps.isPropellantLimited
			? propellantRemaining
			: (srpControlAuthority > 1 ? 1 : srpControlAuthority);
		const avgPositionErrorM = (config.interUnitSpacingM * 0.01) / controlDegradation;

		yearlyStats.push({
			year,
			operationalUnits,
			cumulativeCollisions,
			closeApproachEvents: yearCloseApproaches,
			deltaVConsumedMs: requiredDeltaVPerYear,
			propellantRemainingFraction: propellantRemaining,
			avgPositionErrorM
		});

		// Stop if swarm is non-operational
		if (operationalUnits <= config.swarmSize * 0.1) break;
	}

	return {
		runId,
		config,
		srpDeltaVPerYear,
		requiredDeltaVPerYear,
		srpControlAuthority,
		collisionProbPerUnitYear: effectiveCollisionProb,
		safeSpacingM: collisionStats.safeSpacingForOneMicron,
		missionLifetimeYears,
		velocityUncertaintyMs,
		totalCollisions: cumulativeCollisions,
		totalCloseApproaches,
		yearlyStats
	};
}

/**
 * Aggregate results from multiple simulation runs
 */
function aggregateResults(results: SwarmDynamicsRunResult[]): SwarmDynamicsResult {
	const srpDeltaVs = results.map((r) => r.srpDeltaVPerYear);
	const requiredDeltaVs = results.map((r) => r.requiredDeltaVPerYear);
	const controlAuthorities = results.map((r) => r.srpControlAuthority);
	const collisionProbs = results.map((r) => r.collisionProbPerUnitYear);
	const safeSpacings = results.map((r) => r.safeSpacingM);
	const lifetimes = results.map((r) => r.missionLifetimeYears);
	const velocityUncertainties = results.map((r) => r.velocityUncertaintyMs);
	const totalCollisions = results.map((r) => r.totalCollisions);

	const controlAuthorityStats = calculateStats(controlAuthorities);
	const collisionProbStats = calculateStats(collisionProbs);
	const lifetimeStats = calculateStats(lifetimes);
	const collisionCI = confidenceInterval(collisionProbs);

	// Count runs with sufficient SRP authority
	const srpSufficientCount = controlAuthorities.filter((ca) => ca >= 1).length;

	return {
		srpDeltaVPerYear: srpDeltaVs.reduce((a, b) => a + b, 0) / srpDeltaVs.length,
		requiredDeltaVPerYear: requiredDeltaVs.reduce((a, b) => a + b, 0) / requiredDeltaVs.length,
		srpControlAuthority: controlAuthorityStats.mean,
		srpControlAuthorityStdDev: controlAuthorityStats.stdDev,
		collisionProbPerUnitYear: collisionProbStats.mean,
		collisionProbStdDev: collisionProbStats.stdDev,
		safeSpacingM: safeSpacings.reduce((a, b) => a + b, 0) / safeSpacings.length,
		missionLifetimeYears: lifetimeStats.mean,
		missionLifetimeStdDev: lifetimeStats.stdDev,
		velocityUncertaintyMs: velocityUncertainties.reduce((a, b) => a + b, 0) / velocityUncertainties.length,
		srpSufficientPct: (srpSufficientCount / results.length) * 100,
		totalCollisions: totalCollisions.reduce((a, b) => a + b, 0) / totalCollisions.length,
		confidenceInterval95: {
			collisionProbLower: collisionCI.lower,
			collisionProbUpper: collisionCI.upper
		}
	};
}

/**
 * Run Monte Carlo simulation for swarm dynamics
 */
export async function runSwarmDynamicsMonteCarlo(
	config: SwarmDynamicsConfig,
	runs: number = 100,
	onProgress?: (progress: SwarmDynamicsProgress) => void
): Promise<SwarmDynamicsSimulationOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: SwarmDynamicsRunResult[] = [];

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
					propulsionType: config.propulsionType
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
 * Run comparison between different swarm configurations
 */
export async function runSwarmDynamicsComparison(
	configs: SwarmDynamicsConfig[],
	runsPerConfig: number = 100,
	onProgress?: (progress: SwarmDynamicsProgress) => void
): Promise<SwarmDynamicsComparisonResult> {
	const results: SwarmDynamicsResult[] = [];
	const totalRuns = configs.length * runsPerConfig;
	let completedRuns = 0;

	for (const config of configs) {
		const output = await runSwarmDynamicsMonteCarlo(config, runsPerConfig, (progress) => {
			if (onProgress) {
				const overallProgress = ((completedRuns + progress.currentRun) / totalRuns) * 100;
				onProgress({
					currentRun: completedRuns + progress.currentRun,
					totalRuns,
					percentComplete: overallProgress,
					propulsionType: config.propulsionType
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
 * Optimizes for low collision probability with good control authority
 */
function findOptimalConfig(results: SwarmDynamicsResult[]): number {
	let bestIndex = 0;
	let bestScore = -Infinity;

	for (let i = 0; i < results.length; i++) {
		// Score combines multiple factors
		// Low collision probability is critical
		const collisionScore = 1 / (results[i].collisionProbPerUnitYear + 1e-12);

		// Control authority should be >1
		const authorityScore = Math.min(results[i].srpControlAuthority, 2);

		// Longer lifetime is better
		const lifetimeScore = results[i].missionLifetimeYears / 10;

		// Weighted combination
		const score = collisionScore * 0.5 + authorityScore * 0.3 + lifetimeScore * 0.2;

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
	configs: SwarmDynamicsConfig[],
	results: SwarmDynamicsResult[]
): SwarmDynamicsComparisonResult['analysis'] {
	const bestCollisionIdx = results.reduce(
		(best, r, i) => (r.collisionProbPerUnitYear < results[best].collisionProbPerUnitYear ? i : best),
		0
	);

	const bestAuthorityIdx = results.reduce(
		(best, r, i) => (r.srpControlAuthority > results[best].srpControlAuthority ? i : best),
		0
	);

	const bestLifetimeIdx = results.reduce(
		(best, r, i) => (r.missionLifetimeYears > results[best].missionLifetimeYears ? i : best),
		0
	);

	const optimalIdx = findOptimalConfig(results);
	const optimalConfig = configs[optimalIdx];
	const optimalResult = results[optimalIdx];

	let recommendation: string;

	if (optimalResult.srpControlAuthority >= 1) {
		recommendation =
			`Configuration with ${optimalConfig.interUnitSpacingM}m spacing and ${optimalConfig.propulsionType} propulsion is recommended. ` +
			`SRP provides ${(optimalResult.srpControlAuthority * 100).toFixed(0)}% of required control authority. ` +
			`Collision probability is ${optimalResult.collisionProbPerUnitYear.toExponential(2)} per unit-year ` +
			`with expected mission lifetime of ${optimalResult.missionLifetimeYears.toFixed(1)} years.`;
	} else {
		recommendation =
			`SRP-only control is insufficient (${(optimalResult.srpControlAuthority * 100).toFixed(0)}% of required). ` +
			`Recommend ${optimalConfig.propulsionType} propulsion with ${optimalConfig.interUnitSpacingM}m spacing. ` +
			`Increase collector area-to-mass ratio or spacing to improve SRP authority.`;
	}

	return {
		bestCollisionProb: results[bestCollisionIdx].collisionProbPerUnitYear,
		bestControlAuthority: results[bestAuthorityIdx].srpControlAuthority,
		bestLifetime: results[bestLifetimeIdx].missionLifetimeYears,
		recommendation
	};
}

/**
 * Generate comparison configurations for spacing analysis
 */
export function generateSpacingComparisonConfigs(
	baseConfig: Omit<SwarmDynamicsConfig, 'interUnitSpacingM'>
): SwarmDynamicsConfig[] {
	const spacings = [100, 250, 500, 1000, 2500, 5000, 10000];

	return spacings.map((spacing) => ({
		...baseConfig,
		interUnitSpacingM: spacing
	}));
}

/**
 * Generate comparison configurations for propulsion type analysis
 */
export function generatePropulsionComparisonConfigs(
	baseConfig: Omit<SwarmDynamicsConfig, 'propulsionType'>
): SwarmDynamicsConfig[] {
	const propulsionTypes: PropulsionType[] = ['srp_only', 'ion', 'cold_gas', 'hybrid'];

	return propulsionTypes.map((propType) => ({
		...baseConfig,
		propulsionType: propType
	}));
}

/**
 * Generate comparison configurations for orbital distance analysis
 */
export function generateOrbitalDistanceComparisonConfigs(
	baseConfig: Omit<SwarmDynamicsConfig, 'orbitalDistanceAU'>
): SwarmDynamicsConfig[] {
	const distances = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

	return distances.map((distance) => ({
		...baseConfig,
		orbitalDistanceAU: distance
	}));
}
