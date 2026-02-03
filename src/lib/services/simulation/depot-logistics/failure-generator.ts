/**
 * Failure Generator
 *
 * Stochastic failure injection for Dyson swarm collectors using
 * Poisson process for failure events with spatial distribution.
 */

import { SeededRandom } from '$lib/services/simulation-core';
import type { CollectorFailure } from './types';

/**
 * Failure generation parameters
 */
export interface FailureGeneratorParams {
	/** Total number of collectors in millions */
	swarmSizeMillions: number;
	/** Annual failure rate per collector (0.01-0.05) */
	failureRatePerYear: number;
	/** Simulation duration in hours */
	simulationDurationHours: number;
	/** Swarm inner radius in km (roughly 0.95 AU) */
	swarmInnerRadiusKm: number;
	/** Swarm outer radius in km (roughly 1.05 AU) */
	swarmOuterRadiusKm: number;
}

/**
 * Default swarm parameters
 * Dyson swarm at ~1 AU from the Sun
 */
export const DEFAULT_SWARM_PARAMS = {
	// Inner edge at 0.95 AU
	swarmInnerRadiusKm: 0.95 * 149_597_871, // ~142 million km
	// Outer edge at 1.05 AU
	swarmOuterRadiusKm: 1.05 * 149_597_871 // ~157 million km
};

/**
 * Generate collector failures using Poisson process
 *
 * Failures are generated as a Poisson process where:
 * - Rate (lambda) = swarmSize * failureRate / hoursPerYear
 * - Inter-arrival times are exponentially distributed
 */
export function generateFailures(
	params: FailureGeneratorParams,
	rng: SeededRandom
): CollectorFailure[] {
	const {
		swarmSizeMillions,
		failureRatePerYear,
		simulationDurationHours,
		swarmInnerRadiusKm,
		swarmOuterRadiusKm
	} = params;

	const hoursPerYear = 365 * 24;
	const swarmSize = swarmSizeMillions * 1_000_000;

	// Failure rate per hour for entire swarm
	// lambda = N * failure_rate_per_unit_per_year / hours_per_year
	const lambdaPerHour = (swarmSize * failureRatePerYear) / hoursPerYear;

	const failures: CollectorFailure[] = [];
	let currentTime = 0;
	let failureId = 0;

	// Generate failures using Poisson process
	while (currentTime < simulationDurationHours) {
		// Time to next failure (exponential distribution)
		const interArrivalTime = rng.nextExponential(lambdaPerHour);
		currentTime += interArrivalTime;

		if (currentTime >= simulationDurationHours) break;

		// Generate spatial position (uniform distribution in annular region)
		const position = generateSpatialPosition(
			swarmInnerRadiusKm,
			swarmOuterRadiusKm,
			rng
		);

		// Assign priority based on random distribution
		// 10% critical, 60% standard, 30% low
		const priority = assignPriority(rng);

		failures.push({
			id: `failure-${failureId++}`,
			positionKm: position.radiusKm,
			angleDegs: position.angleDegs,
			detectedAtHours: currentTime,
			priority
		});
	}

	return failures;
}

/**
 * Generate spatial position within swarm annular region
 * Uses uniform distribution in area (not radius) for proper density
 */
function generateSpatialPosition(
	innerRadiusKm: number,
	outerRadiusKm: number,
	rng: SeededRandom
): { radiusKm: number; angleDegs: number } {
	// For uniform distribution in annular region, we need to sample
	// r^2 uniformly between r_inner^2 and r_outer^2
	const r2Inner = innerRadiusKm * innerRadiusKm;
	const r2Outer = outerRadiusKm * outerRadiusKm;
	const r2 = r2Inner + rng.next() * (r2Outer - r2Inner);
	const radiusKm = Math.sqrt(r2);

	// Angular position is uniform [0, 360)
	const angleDegs = rng.next() * 360;

	return { radiusKm, angleDegs };
}

/**
 * Assign priority level to failure
 * Priority affects service ordering and response urgency
 */
function assignPriority(rng: SeededRandom): number {
	const roll = rng.next();
	if (roll < 0.1) return 1; // 10% critical
	if (roll < 0.7) return 2; // 60% standard
	return 3; // 30% low
}

/**
 * Calculate expected failures per day
 */
export function expectedFailuresPerDay(
	swarmSizeMillions: number,
	failureRatePerYear: number
): number {
	const swarmSize = swarmSizeMillions * 1_000_000;
	return (swarmSize * failureRatePerYear) / 365;
}

/**
 * Calculate expected failures for simulation duration
 */
export function expectedTotalFailures(
	swarmSizeMillions: number,
	failureRatePerYear: number,
	simulationDays: number
): number {
	return expectedFailuresPerDay(swarmSizeMillions, failureRatePerYear) * simulationDays;
}

/**
 * Sort failures by priority and time
 * Critical failures first, then by detection time
 */
export function sortFailuresByPriority(failures: CollectorFailure[]): CollectorFailure[] {
	return [...failures].sort((a, b) => {
		// First sort by priority (lower is more urgent)
		if (a.priority !== b.priority) {
			return a.priority - b.priority;
		}
		// Then by detection time
		return a.detectedAtHours - b.detectedAtHours;
	});
}
