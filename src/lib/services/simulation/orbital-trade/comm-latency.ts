/**
 * Communication Latency Model
 *
 * Calculates communication delays and scores their operational impact
 * for different orbital locations.
 */

import { lightTimeDelay, CONSTANTS } from '$lib/services/simulation-core';
import type { OrbitalLocation } from './types';
import { ORBITAL_LOCATIONS } from './delta-v-calculator';

/**
 * Communication parameters
 */
export const COMM_PARAMS = {
	/** Minimum acceptable latency for real-time operations in minutes */
	realTimeThresholdMin: 2,
	/** Maximum tolerable latency for supervised autonomy in minutes */
	supervisedThresholdMin: 20,
	/** Protocol overhead in seconds (handshaking, etc.) */
	protocolOverheadSec: 5,
	/** Deep Space Network scheduling delay in minutes (average) */
	dsnSchedulingDelayMin: 15
};

/**
 * Calculate one-way light-time delay to a location
 * @param location Orbital location
 * @returns Delay in seconds
 */
export function calculateOneWayDelay(location: OrbitalLocation): number {
	const data = ORBITAL_LOCATIONS[location];

	// For locations defined by distance from Earth
	if (data.commLatencyMinutes > 0) {
		return data.commLatencyMinutes * 60;
	}

	// For heliocentric locations, calculate average distance from Earth
	// This is a simplification - actual delay varies with orbital geometry
	const earthDistance = 1.0; // AU
	const locationDistance = data.distanceAU;

	// Average distance (simplified - assumes random phase)
	// For inner orbits: ranges from (Earth - location) to (Earth + location)
	// For outer orbits: same principle
	const minDistance = Math.abs(earthDistance - locationDistance);
	const maxDistance = earthDistance + locationDistance;
	const avgDistance = (minDistance + maxDistance) / 2;

	return lightTimeDelay(avgDistance);
}

/**
 * Calculate round-trip communication delay
 * @param location Orbital location
 * @returns Round-trip delay in seconds
 */
export function calculateRoundTripDelay(location: OrbitalLocation): number {
	const oneWay = calculateOneWayDelay(location);
	return 2 * oneWay + COMM_PARAMS.protocolOverheadSec;
}

/**
 * Calculate round-trip delay in minutes
 */
export function calculateRoundTripDelayMinutes(location: OrbitalLocation): number {
	return calculateRoundTripDelay(location) / 60;
}

/**
 * Calculate communication latency score
 * Higher score = lower latency = better for operations
 * @param location Orbital location
 * @returns Score from 0 (worst) to 1 (best)
 */
export function calculateCommLatencyScore(location: OrbitalLocation): number {
	const roundTripMin = calculateRoundTripDelayMinutes(location);

	// Score based on operational thresholds
	if (roundTripMin <= COMM_PARAMS.realTimeThresholdMin) {
		// Near real-time: best score
		return 1.0;
	} else if (roundTripMin <= COMM_PARAMS.supervisedThresholdMin) {
		// Supervised autonomy range: linear decrease
		const range = COMM_PARAMS.supervisedThresholdMin - COMM_PARAMS.realTimeThresholdMin;
		const excess = roundTripMin - COMM_PARAMS.realTimeThresholdMin;
		return 1.0 - 0.5 * (excess / range);
	} else {
		// Full autonomy required: exponential decrease
		const excess = roundTripMin - COMM_PARAMS.supervisedThresholdMin;
		return 0.5 * Math.exp(-excess / 30);
	}
}

/**
 * Determine operational mode based on latency
 * @param location Orbital location
 * @returns Operational mode description
 */
export function determineOperationalMode(
	location: OrbitalLocation
): 'real_time' | 'supervised' | 'autonomous' {
	const roundTripMin = calculateRoundTripDelayMinutes(location);

	if (roundTripMin <= COMM_PARAMS.realTimeThresholdMin) {
		return 'real_time';
	} else if (roundTripMin <= COMM_PARAMS.supervisedThresholdMin) {
		return 'supervised';
	} else {
		return 'autonomous';
	}
}

/**
 * Calculate effective command rate
 * How many commands can be sent per hour accounting for latency
 * @param location Orbital location
 * @returns Commands per hour
 */
export function calculateEffectiveCommandRate(location: OrbitalLocation): number {
	const roundTripSec = calculateRoundTripDelay(location);

	// Each command-response cycle takes round-trip time plus processing
	const cycleTimeSec = roundTripSec + 10; // 10 sec processing

	// Commands per hour
	return 3600 / cycleTimeSec;
}

/**
 * Calculate data downlink efficiency factor
 * Accounts for DSN scheduling and contact windows
 * @param location Orbital location
 * @returns Efficiency factor (0-1)
 */
export function calculateDownlinkEfficiency(location: OrbitalLocation): number {
	const data = ORBITAL_LOCATIONS[location];

	// Locations near Earth have more frequent contact opportunities
	// Deep space locations have limited DSN access

	if (data.distanceAU <= 0.01) {
		// NRHO/cis-lunar: nearly continuous contact
		return 0.95;
	} else if (data.distanceAU <= 1.1) {
		// 1 AU range: good contact via DSN
		return 0.8;
	} else {
		// Deep space: limited windows
		return 0.6;
	}
}

/**
 * Calculate minimum distance from Earth for a location
 * @param location Orbital location
 * @returns Minimum distance in AU
 */
export function calculateMinDistanceFromEarth(location: OrbitalLocation): number {
	const data = ORBITAL_LOCATIONS[location];

	// Handle special cases
	switch (location) {
		case 'nrho':
			return 0.003; // ~400,000 km
		case 'sun_earth_l1':
			return 0.01; // ~1.5 million km
		case 'sun_earth_l4':
		case 'sun_earth_l5':
			// L4/L5 are always ~1 AU from Earth (equilateral triangle)
			return 1.0;
		default:
			// Heliocentric orbits: minimum is at conjunction
			return Math.abs(1.0 - data.distanceAU);
	}
}

/**
 * Calculate maximum distance from Earth for a location
 * @param location Orbital location
 * @returns Maximum distance in AU
 */
export function calculateMaxDistanceFromEarth(location: OrbitalLocation): number {
	const data = ORBITAL_LOCATIONS[location];

	// Handle special cases
	switch (location) {
		case 'nrho':
			return 0.003; // ~400,000 km
		case 'sun_earth_l1':
			return 0.01; // Maintains position relative to Earth
		case 'sun_earth_l4':
		case 'sun_earth_l5':
			return 1.0; // Equilateral triangle maintained
		default:
			// Heliocentric orbits: maximum is at opposition
			return 1.0 + data.distanceAU;
	}
}

/**
 * Calculate variance in communication delay
 * Higher variance = more scheduling challenges
 * @param location Orbital location
 * @returns Delay variance in minutes^2
 */
export function calculateDelayVariance(location: OrbitalLocation): number {
	const minDist = calculateMinDistanceFromEarth(location);
	const maxDist = calculateMaxDistanceFromEarth(location);

	const minDelay = lightTimeDelay(minDist) / 60; // minutes
	const maxDelay = lightTimeDelay(maxDist) / 60;

	// Variance of uniform distribution over [min, max]
	const range = maxDelay - minDelay;
	return (range * range) / 12;
}

/**
 * Get communication metrics for a location
 */
export function getCommMetrics(location: OrbitalLocation): {
	oneWayDelayMin: number;
	roundTripDelayMin: number;
	operationalMode: 'real_time' | 'supervised' | 'autonomous';
	commandsPerHour: number;
	downlinkEfficiency: number;
	delayVarianceMin2: number;
} {
	return {
		oneWayDelayMin: calculateOneWayDelay(location) / 60,
		roundTripDelayMin: calculateRoundTripDelayMinutes(location),
		operationalMode: determineOperationalMode(location),
		commandsPerHour: calculateEffectiveCommandRate(location),
		downlinkEfficiency: calculateDownlinkEfficiency(location),
		delayVarianceMin2: calculateDelayVariance(location)
	};
}
