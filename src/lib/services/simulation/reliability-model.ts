/**
 * Reliability Model
 *
 * Models satellite failure rates over the mission duration.
 * Uses exponential failure distribution with annual rate.
 */

import type { Satellite } from './simulation-types';

/**
 * Failure statistics for a simulation
 */
export interface FailureStats {
	totalFailures: number;
	failuresByYear: number[];
	survivingCount: number;
	survivalRate: number;
}

/**
 * Apply failure model to satellites for one year
 *
 * Uses Bernoulli trials with annual failure rate
 */
export function applyAnnualFailures(
	satellites: Satellite[],
	annualFailureRate: number,
	rng: () => number = Math.random
): { satellites: Satellite[]; failures: number } {
	let failures = 0;

	const updatedSatellites = satellites.map(sat => {
		if (sat.status === 'failed') {
			return sat; // Already failed
		}

		// Roll for failure
		if (rng() < annualFailureRate) {
			failures++;
			return {
				...sat,
				status: 'failed' as const
			};
		}

		return sat;
	});

	return { satellites: updatedSatellites, failures };
}

/**
 * Calculate expected failures over mission duration
 */
export function calculateExpectedFailures(
	constellationSize: number,
	annualFailureRate: number,
	missionDuration: number
): number {
	// Expected failures using exponential distribution
	// P(survive n years) = (1 - rate)^n
	const survivalProb = Math.pow(1 - annualFailureRate, missionDuration);
	const expectedSurvivors = constellationSize * survivalProb;
	return constellationSize - expectedSurvivors;
}

/**
 * Calculate survival probability for given duration
 */
export function calculateSurvivalProbability(
	annualFailureRate: number,
	years: number
): number {
	return Math.pow(1 - annualFailureRate, years);
}

/**
 * Get number of operational satellites
 */
export function getOperationalCount(satellites: Satellite[]): number {
	return satellites.filter(s => s.status === 'operational').length;
}

/**
 * Simulate failures over entire mission
 */
export function simulateMissionFailures(
	initialCount: number,
	annualFailureRate: number,
	missionDuration: number,
	seed?: number
): FailureStats {
	// Seeded random number generator
	let state = seed ?? Date.now();
	const rng = () => {
		state = (state * 1664525 + 1013904223) % 4294967296;
		return state / 4294967296;
	};

	let surviving = initialCount;
	const failuresByYear: number[] = [];

	for (let year = 0; year < missionDuration; year++) {
		let yearlyFailures = 0;

		// Each surviving satellite has a chance to fail
		for (let i = 0; i < surviving; i++) {
			if (rng() < annualFailureRate) {
				yearlyFailures++;
			}
		}

		surviving -= yearlyFailures;
		failuresByYear.push(yearlyFailures);
	}

	const totalFailures = initialCount - surviving;

	return {
		totalFailures,
		failuresByYear,
		survivingCount: surviving,
		survivalRate: surviving / initialCount
	};
}

/**
 * Calculate Mean Time Between Failures (MTBF) in years
 */
export function calculateMTBF(annualFailureRate: number): number {
	if (annualFailureRate <= 0) return Infinity;
	return 1 / annualFailureRate;
}

/**
 * Calculate the constellation size needed to ensure minimum survivors
 * with given confidence level
 */
export function calculateRequiredConstellation(
	targetSurvivors: number,
	annualFailureRate: number,
	missionDuration: number,
	confidenceLevel: number = 0.95
): number {
	const survivalProb = calculateSurvivalProbability(annualFailureRate, missionDuration);

	// Using binomial distribution approximation
	// For high confidence, we need extra satellites to account for variance
	// n = targetSurvivors / survivalProb + z * sqrt(variance) / survivalProb
	// where variance = n * survivalProb * (1 - survivalProb)

	// Solve iteratively
	let n = Math.ceil(targetSurvivors / survivalProb);
	const z = 1.645; // 95% confidence (one-tailed)

	for (let i = 0; i < 10; i++) {
		const variance = n * survivalProb * (1 - survivalProb);
		const adjustment = z * Math.sqrt(variance);
		const newN = Math.ceil((targetSurvivors + adjustment) / survivalProb);
		if (newN === n) break;
		n = newN;
	}

	return n;
}

/**
 * Bathtub curve hazard rate model
 * Models infant mortality, useful life, and wear-out phases
 */
export function bathtubHazardRate(
	year: number,
	baseRate: number,
	infantMortalityRate: number = 0.05,
	wearOutStart: number = 8
): number {
	if (year === 0) {
		// First year: higher failure rate (infant mortality)
		return baseRate + infantMortalityRate;
	} else if (year >= wearOutStart) {
		// Wear-out phase: increasing failure rate
		const yearsInWearout = year - wearOutStart + 1;
		return baseRate * (1 + yearsInWearout * 0.2);
	}
	// Useful life: constant failure rate
	return baseRate;
}
