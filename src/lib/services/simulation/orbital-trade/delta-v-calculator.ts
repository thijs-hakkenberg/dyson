/**
 * Delta-V Calculator for Orbital Locations
 *
 * Calculates transfer costs between orbital locations using Hohmann transfers
 * and low-thrust spiral approximations.
 */

import {
	hohmannTransferDeltaV,
	hohmannTransferTime,
	CONSTANTS
} from '$lib/services/simulation-core';
import type {
	OrbitalLocation,
	OrbitalLocationData,
	DeltaVMatrixEntry,
	FeedstockSource
} from './types';

/**
 * Orbital location reference data
 * Values based on astrodynamics calculations and mission design heritage
 */
export const ORBITAL_LOCATIONS: Record<OrbitalLocation, OrbitalLocationData> = {
	nrho: {
		id: 'nrho',
		name: 'Near Rectilinear Halo Orbit',
		distanceAU: 1.0, // Effectively at Earth
		deltaVFromEarth: 3.5, // From LEO to NRHO
		solarFluxMultiplier: 1.0,
		commLatencyMinutes: 1.3, // ~400,000 km average
		thermalLoadFactor: 1.0,
		stabilityClass: 'quasi_stable'
	},
	sun_earth_l1: {
		id: 'sun_earth_l1',
		name: 'Sun-Earth L1',
		distanceAU: 0.99, // ~1.5 million km sunward of Earth
		deltaVFromEarth: 3.2, // From LEO to L1
		solarFluxMultiplier: 1.02, // Slightly closer to Sun
		commLatencyMinutes: 8.3, // ~1.5 million km
		thermalLoadFactor: 1.02,
		stabilityClass: 'unstable'
	},
	sun_earth_l4: {
		id: 'sun_earth_l4',
		name: 'Sun-Earth L4 (Leading)',
		distanceAU: 1.0, // Same as Earth orbit, 60 deg ahead
		deltaVFromEarth: 0.9, // Low delta-V from Earth-Moon system
		solarFluxMultiplier: 1.0,
		commLatencyMinutes: 8.3, // 60 deg = ~1.5 million km at 1 AU
		thermalLoadFactor: 1.0,
		stabilityClass: 'dynamically_stable'
	},
	sun_earth_l5: {
		id: 'sun_earth_l5',
		name: 'Sun-Earth L5 (Trailing)',
		distanceAU: 1.0, // Same as Earth orbit, 60 deg behind
		deltaVFromEarth: 0.9, // Low delta-V from Earth-Moon system
		solarFluxMultiplier: 1.0,
		commLatencyMinutes: 8.3, // 60 deg = ~1.5 million km at 1 AU
		thermalLoadFactor: 1.0,
		stabilityClass: 'dynamically_stable'
	},
	helio_1au: {
		id: 'helio_1au',
		name: 'Heliocentric 1 AU',
		distanceAU: 1.0,
		deltaVFromEarth: 3.0, // Earth escape velocity
		solarFluxMultiplier: 1.0,
		commLatencyMinutes: 0, // Variable, use average
		thermalLoadFactor: 1.0,
		stabilityClass: 'dynamically_stable'
	},
	helio_0p7au: {
		id: 'helio_0p7au',
		name: 'Heliocentric 0.7 AU',
		distanceAU: 0.7,
		deltaVFromEarth: 5.1, // Hohmann to 0.7 AU
		solarFluxMultiplier: 2.04, // 1/0.7^2
		commLatencyMinutes: 3.5, // Average at 0.3 AU distance
		thermalLoadFactor: 2.04,
		stabilityClass: 'dynamically_stable'
	},
	helio_0p5au: {
		id: 'helio_0p5au',
		name: 'Heliocentric 0.5 AU',
		distanceAU: 0.5,
		deltaVFromEarth: 8.7, // Hohmann to 0.5 AU
		solarFluxMultiplier: 4.0, // 1/0.5^2
		commLatencyMinutes: 4.2, // Average at 0.5 AU distance
		thermalLoadFactor: 4.0,
		stabilityClass: 'dynamically_stable'
	},
	sun_mercury_l1: {
		id: 'sun_mercury_l1',
		name: 'Sun-Mercury L1',
		distanceAU: 0.39, // Mercury's orbit
		deltaVFromEarth: 9.5, // Hohmann to Mercury + L1 insertion
		solarFluxMultiplier: 6.57, // 1/0.39^2
		commLatencyMinutes: 5.0, // ~0.6 AU average distance
		thermalLoadFactor: 6.57,
		stabilityClass: 'unstable'
	}
};

/**
 * Get all orbital location data
 */
export function getAllLocations(): OrbitalLocationData[] {
	return Object.values(ORBITAL_LOCATIONS);
}

/**
 * Get location data by ID
 */
export function getLocationData(location: OrbitalLocation): OrbitalLocationData {
	return ORBITAL_LOCATIONS[location];
}

/**
 * Calculate Hohmann transfer delta-V between two heliocentric locations
 * Returns delta-V in km/s
 */
export function calculateTransferDeltaV(
	from: OrbitalLocation,
	to: OrbitalLocation
): number {
	const fromData = ORBITAL_LOCATIONS[from];
	const toData = ORBITAL_LOCATIONS[to];

	// Handle same location
	if (from === to) return 0;

	// For locations at same distance (like L4/L5), use phase change delta-V
	if (Math.abs(fromData.distanceAU - toData.distanceAU) < 0.01) {
		// Phase change requires low-thrust spiral or bi-elliptic
		// Approximate as 10% of circular velocity
		const v_circ = Math.sqrt(CONSTANTS.MU_SUN / (fromData.distanceAU * CONSTANTS.AU_METERS));
		return (v_circ * 0.1) / 1000; // Convert to km/s
	}

	// Use Hohmann transfer for radial transfers
	const deltaVMs = hohmannTransferDeltaV(fromData.distanceAU, toData.distanceAU);
	return deltaVMs / 1000; // Convert m/s to km/s
}

/**
 * Calculate transfer time between two heliocentric locations
 * Returns time in days
 */
export function calculateTransferTime(
	from: OrbitalLocation,
	to: OrbitalLocation
): number {
	const fromData = ORBITAL_LOCATIONS[from];
	const toData = ORBITAL_LOCATIONS[to];

	// Handle same location
	if (from === to) return 0;

	// For phase changes at same radius, use synodic-based estimate
	if (Math.abs(fromData.distanceAU - toData.distanceAU) < 0.01) {
		// Phase change takes about 1/6 of orbital period for 60 deg
		const T = 365.25 * Math.pow(fromData.distanceAU, 1.5); // days
		return T / 6;
	}

	return hohmannTransferTime(fromData.distanceAU, toData.distanceAU);
}

/**
 * Calculate low-thrust spiral transfer delta-V
 * More efficient than Hohmann for electric propulsion
 * Returns delta-V in km/s
 */
export function calculateLowThrustDeltaV(
	from: OrbitalLocation,
	to: OrbitalLocation
): number {
	const fromData = ORBITAL_LOCATIONS[from];
	const toData = ORBITAL_LOCATIONS[to];

	if (from === to) return 0;

	// Low-thrust spiral: delta-V equals the difference in circular velocities
	// This is more efficient than Hohmann but takes longer
	const r1 = fromData.distanceAU * CONSTANTS.AU_METERS;
	const r2 = toData.distanceAU * CONSTANTS.AU_METERS;

	const v1 = Math.sqrt(CONSTANTS.MU_SUN / r1);
	const v2 = Math.sqrt(CONSTANTS.MU_SUN / r2);

	return Math.abs(v2 - v1) / 1000; // km/s
}

/**
 * Calculate delta-V from Earth to a location
 * Includes Earth escape and transfer
 */
export function calculateDeltaVFromEarth(location: OrbitalLocation): number {
	const data = ORBITAL_LOCATIONS[location];
	return data.deltaVFromEarth;
}

/**
 * Calculate delta-V to feedstock source
 */
export function calculateDeltaVToFeedstock(
	location: OrbitalLocation,
	feedstockSource: FeedstockSource
): number {
	const locationData = ORBITAL_LOCATIONS[location];

	switch (feedstockSource) {
		case 'earth':
			return locationData.deltaVFromEarth;

		case 'nea': {
			// Average delta-V to reach NEAs from this location
			// NEAs typically have a = 1.0-1.5 AU, e = 0.1-0.4
			// Approximate average delta-V
			const avgNeaDistance = 1.2; // AU, weighted average
			const deltaVMs = hohmannTransferDeltaV(locationData.distanceAU, avgNeaDistance);
			return deltaVMs / 1000;
		}

		case 'mercury': {
			// Delta-V to Mercury vicinity
			const mercuryDistance = 0.39;
			const deltaVMs = hohmannTransferDeltaV(locationData.distanceAU, mercuryDistance);
			return deltaVMs / 1000;
		}

		default:
			return locationData.deltaVFromEarth;
	}
}

/**
 * Generate complete delta-V matrix between all candidate locations
 */
export function generateDeltaVMatrix(
	locations: OrbitalLocation[]
): DeltaVMatrixEntry[] {
	const matrix: DeltaVMatrixEntry[] = [];

	for (const from of locations) {
		for (const to of locations) {
			matrix.push({
				from,
				to,
				deltaVKms: calculateTransferDeltaV(from, to),
				transferDays: calculateTransferTime(from, to)
			});
		}
	}

	return matrix;
}

/**
 * Calculate departure delta-V from a location
 * (delta-V needed to leave the location for a transfer)
 */
export function calculateDepartureDeltaV(
	from: OrbitalLocation,
	to: OrbitalLocation
): number {
	const fromData = ORBITAL_LOCATIONS[from];
	const toData = ORBITAL_LOCATIONS[to];

	if (from === to) return 0;

	const r1 = fromData.distanceAU * CONSTANTS.AU_METERS;
	const r2 = toData.distanceAU * CONSTANTS.AU_METERS;

	// Transfer orbit parameters
	const a = (r1 + r2) / 2;

	// Velocity in circular orbit at r1
	const v_circ = Math.sqrt(CONSTANTS.MU_SUN / r1);

	// Velocity in transfer orbit at r1
	const v_transfer = Math.sqrt(CONSTANTS.MU_SUN * (2 / r1 - 1 / a));

	return Math.abs(v_transfer - v_circ) / 1000; // km/s
}

/**
 * Calculate arrival delta-V at a location
 * (delta-V needed to insert into the destination orbit)
 */
export function calculateArrivalDeltaV(
	from: OrbitalLocation,
	to: OrbitalLocation
): number {
	const fromData = ORBITAL_LOCATIONS[from];
	const toData = ORBITAL_LOCATIONS[to];

	if (from === to) return 0;

	const r1 = fromData.distanceAU * CONSTANTS.AU_METERS;
	const r2 = toData.distanceAU * CONSTANTS.AU_METERS;

	// Transfer orbit parameters
	const a = (r1 + r2) / 2;

	// Velocity in circular orbit at r2
	const v_circ = Math.sqrt(CONSTANTS.MU_SUN / r2);

	// Velocity in transfer orbit at r2
	const v_transfer = Math.sqrt(CONSTANTS.MU_SUN * (2 / r2 - 1 / a));

	return Math.abs(v_circ - v_transfer) / 1000; // km/s
}

/**
 * Calculate station-keeping delta-V for a location
 * Returns annual delta-V in m/s/year
 */
export function calculateStationKeepingDeltaV(location: OrbitalLocation): number {
	const data = ORBITAL_LOCATIONS[location];

	switch (data.stabilityClass) {
		case 'dynamically_stable':
			// L4/L5, heliocentric: minimal station-keeping
			return 5; // m/s/year

		case 'quasi_stable':
			// NRHO: moderate station-keeping
			return 15; // m/s/year

		case 'unstable':
			// L1/L2, Sun-Mercury L1: significant station-keeping
			return 50; // m/s/year

		default:
			return 10;
	}
}
