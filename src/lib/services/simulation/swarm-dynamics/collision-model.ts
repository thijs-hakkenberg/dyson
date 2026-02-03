/**
 * Collision Model
 *
 * Calculates collision probabilities and safe spacing requirements
 * for Dyson swarm elements using gas kinetics and Monte Carlo approaches.
 */

import {
	annualCollisionProbability,
	minimumSafeSpacing,
	collisionProbabilityGasModel,
	CONSTANTS
} from '$lib/services/simulation-core';
import { SeededRandom } from '$lib/services/simulation-core';

/**
 * Collision statistics result
 */
export interface CollisionStats {
	/** Collision probability per unit per year */
	collisionProbPerUnitYear: number;
	/** Expected collisions per year in swarm */
	expectedCollisionsPerYear: number;
	/** Safe spacing for 1e-6 collision probability (m) */
	safeSpacingForOneMicron: number;
	/** Safe spacing for 1e-9 collision probability (m) */
	safeSpacingForOneNano: number;
	/** Mean free path in swarm (m) */
	meanFreePath: number;
	/** Collision cross-section (m^2) */
	collisionCrossSection: number;
}

/**
 * Calculate collision statistics for a swarm configuration
 * @param swarmSize Number of units in swarm
 * @param spacingM Average inter-unit spacing in meters
 * @param collectorAreaM2 Collector surface area in m^2
 * @param velocityUncertaintyMs Velocity uncertainty in m/s
 * @returns Collision statistics
 */
export function calculateCollisionStats(
	swarmSize: number,
	spacingM: number,
	collectorAreaM2: number,
	velocityUncertaintyMs: number
): CollisionStats {
	// Effective element size (diameter of equivalent circle)
	const elementSizeM = 2 * Math.sqrt(collectorAreaM2 / Math.PI);

	// Collision cross-section (both elements contribute)
	const collisionCrossSection = Math.PI * elementSizeM * elementSizeM;

	// Calculate collision probability using spatial-index utility
	const collisionProbPerUnitYear = annualCollisionProbability(
		spacingM,
		elementSizeM,
		velocityUncertaintyMs
	);

	// Expected collisions in swarm per year
	// Each collision involves 2 units, so divide by 2
	const expectedCollisionsPerYear = (swarmSize * collisionProbPerUnitYear) / 2;

	// Safe spacings for target probabilities
	const safeSpacingForOneMicron = minimumSafeSpacing(1e-6, elementSizeM, velocityUncertaintyMs);
	const safeSpacingForOneNano = minimumSafeSpacing(1e-9, elementSizeM, velocityUncertaintyMs);

	// Mean free path calculation
	// mfp = 1 / (n * sigma * sqrt(2))
	const volumePerElement = spacingM * spacingM * spacingM;
	const numberDensity = 1 / volumePerElement;
	const meanFreePath = 1 / (numberDensity * collisionCrossSection * Math.SQRT2);

	return {
		collisionProbPerUnitYear,
		expectedCollisionsPerYear,
		safeSpacingForOneMicron,
		safeSpacingForOneNano,
		meanFreePath,
		collisionCrossSection
	};
}

/**
 * Close approach event
 */
export interface CloseApproachEvent {
	/** Simulation time in hours */
	timeHours: number;
	/** Minimum separation distance in meters */
	minSeparationM: number;
	/** Relative velocity at closest approach in m/s */
	relativeVelocityMs: number;
	/** Did this result in a collision? */
	collision: boolean;
	/** Delta-V required for avoidance maneuver (m/s) */
	avoidanceDeltaVMs: number;
}

/**
 * Simulate close approach events using Monte Carlo
 * @param swarmSize Number of units in swarm
 * @param spacingM Average inter-unit spacing in meters
 * @param collectorAreaM2 Collector surface area in m^2
 * @param velocityUncertaintyMs Velocity uncertainty in m/s
 * @param simulationHours Duration to simulate in hours
 * @param rng Seeded random number generator
 * @returns Array of close approach events
 */
export function simulateCloseApproaches(
	swarmSize: number,
	spacingM: number,
	collectorAreaM2: number,
	velocityUncertaintyMs: number,
	simulationHours: number,
	rng: SeededRandom
): CloseApproachEvent[] {
	const events: CloseApproachEvent[] = [];

	// Effective element size
	const elementSizeM = 2 * Math.sqrt(collectorAreaM2 / Math.PI);
	const collisionRadius = elementSizeM; // Both elements contribute

	// Close approach threshold (10x collision radius)
	const closeApproachThreshold = collisionRadius * 10;

	// Calculate encounter rate using gas kinetics
	const volumeM3 = swarmSize * spacingM * spacingM * spacingM;
	const crossSectionM2 = Math.PI * closeApproachThreshold * closeApproachThreshold;

	// Use gas model for encounter rate
	const encountersPerHour = collisionProbabilityGasModel(
		swarmSize,
		volumeM3,
		crossSectionM2,
		velocityUncertaintyMs,
		3600 // 1 hour in seconds
	);

	// Generate Poisson-distributed encounters
	let currentTime = 0;
	const hoursBetweenEncounters = encountersPerHour > 0 ? 1 / encountersPerHour : Infinity;

	while (currentTime < simulationHours) {
		// Exponential inter-arrival time
		const interArrival = rng.nextExponential(1 / hoursBetweenEncounters);
		currentTime += interArrival;

		if (currentTime >= simulationHours) break;

		// Generate close approach characteristics
		// Minimum separation follows a distribution peaked near the threshold
		const separationRatio = rng.next(); // 0 to 1
		const minSeparationM = collisionRadius + separationRatio * (closeApproachThreshold - collisionRadius);

		// Relative velocity is Gaussian around the uncertainty
		const relativeVelocityMs = Math.abs(rng.nextGaussian(velocityUncertaintyMs, velocityUncertaintyMs * 0.3));

		// Determine if collision occurred
		const collision = minSeparationM < collisionRadius;

		// Calculate avoidance delta-V requirement
		// Simplified: dV needed to change trajectory by collision radius over approach time
		const approachTime = closeApproachThreshold / relativeVelocityMs; // seconds
		const avoidanceDeltaVMs = collision ? 0 : (2 * collisionRadius) / approachTime;

		events.push({
			timeHours: currentTime,
			minSeparationM,
			relativeVelocityMs,
			collision,
			avoidanceDeltaVMs
		});
	}

	return events;
}

/**
 * Calculate collision probability considering avoidance capability
 * @param baseCollisionProb Base collision probability per unit per year
 * @param avoidanceSuccessRate Success rate of avoidance maneuvers (0-1)
 * @param detectionLeadTimeHours Hours of warning before potential collision
 * @param maneuverCapabilityMs Delta-V available for avoidance (m/s)
 * @param requiredDeltaVMs Typical delta-V needed for avoidance (m/s)
 * @returns Effective collision probability per unit per year
 */
export function effectiveCollisionProbability(
	baseCollisionProb: number,
	avoidanceSuccessRate: number,
	detectionLeadTimeHours: number,
	maneuverCapabilityMs: number,
	requiredDeltaVMs: number
): number {
	// Factor 1: Detection capability (can we see it coming?)
	// Assume 90% detection for >24h lead time, scaling down for shorter times
	const detectionFactor = Math.min(1, detectionLeadTimeHours / 24) * 0.9 + 0.1;

	// Factor 2: Maneuver capability (can we dodge?)
	const maneuverFactor = maneuverCapabilityMs >= requiredDeltaVMs ? 1 : maneuverCapabilityMs / requiredDeltaVMs;

	// Effective avoidance probability
	const effectiveAvoidance = detectionFactor * maneuverFactor * avoidanceSuccessRate;

	// Residual collision probability
	return baseCollisionProb * (1 - effectiveAvoidance);
}

/**
 * Estimate debris cascade risk (Kessler syndrome analog)
 * @param swarmSize Number of units in swarm
 * @param collisionProbPerYear Expected collisions per year
 * @param debrisMultiplier Debris fragments per collision
 * @param simulationYears Years to simulate cascade
 * @returns Final estimated swarm population
 */
export function estimateDebrisCascade(
	swarmSize: number,
	collisionProbPerYear: number,
	debrisMultiplier: number = 100,
	simulationYears: number = 50
): number {
	let currentPopulation = swarmSize;
	let debrisCount = 0;

	for (let year = 0; year < simulationYears; year++) {
		// Collisions this year (between active units)
		const unitCollisions = (currentPopulation * collisionProbPerYear) / 2;

		// Collisions with debris
		const debrisCollisionRate = debrisCount > 0
			? (currentPopulation * debrisCount * 1e-12) // Very low cross-section for debris
			: 0;

		const totalCollisions = unitCollisions + debrisCollisionRate;

		// Units lost (2 per collision)
		const unitsLost = Math.min(currentPopulation, Math.round(totalCollisions * 2));
		currentPopulation -= unitsLost;

		// Debris generated
		debrisCount += totalCollisions * debrisMultiplier;

		// Debris decay (drag, radiation pressure, solar wind)
		debrisCount *= 0.95; // 5% decay per year

		if (currentPopulation <= 0) break;
	}

	return currentPopulation;
}

/**
 * Calculate swarm operational lifetime based on collision attrition
 * @param initialSwarmSize Initial number of units
 * @param collisionProbPerUnitYear Collision probability per unit per year
 * @param minOperationalFraction Minimum fraction to remain operational
 * @returns Operational lifetime in years
 */
export function calculateCollisionLifetime(
	initialSwarmSize: number,
	collisionProbPerUnitYear: number,
	minOperationalFraction: number = 0.5
): number {
	// Expected units lost per year: N * p / 2 (each collision removes 2 units)
	// dN/dt = -N * p / 2
	// N(t) = N0 * exp(-p*t/2)
	// For N(t) = minFraction * N0:
	// t = -2 * ln(minFraction) / p

	if (collisionProbPerUnitYear <= 0) return Infinity;

	const lifetime = (-2 * Math.log(minOperationalFraction)) / collisionProbPerUnitYear;
	return lifetime;
}
