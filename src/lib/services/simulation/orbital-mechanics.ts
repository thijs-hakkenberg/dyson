/**
 * Orbital Mechanics Calculations
 *
 * Simplified delta-V calculations for transfers between satellite
 * and NEA orbits. Uses Hohmann transfer approximations.
 */

import type { OrbitalElements, PropulsionType, Satellite } from './simulation-types';

// Gravitational parameter of the Sun (km^3/s^2)
const MU_SUN = 1.32712440018e11;

// Astronomical Unit in km
const AU_TO_KM = 1.496e8;

/**
 * Propulsion system characteristics
 */
const PROPULSION_SPECS: Record<PropulsionType, {
	deltaVCapacity: number;  // km/s total delta-V budget
	efficiency: number;      // Efficiency factor (0-1)
	surveysPerRefuel: number; // How many surveys before needing to return
}> = {
	electric: {
		deltaVCapacity: 15,    // Ion propulsion, high specific impulse
		efficiency: 0.9,
		surveysPerRefuel: 8
	},
	chemical: {
		deltaVCapacity: 8,     // Traditional rockets, lower Isp
		efficiency: 0.7,
		surveysPerRefuel: 4
	},
	hybrid: {
		deltaVCapacity: 12,    // Best of both worlds
		efficiency: 0.85,
		surveysPerRefuel: 6
	}
};

/**
 * Calculate vis-viva velocity at a given distance from the Sun
 * v = sqrt(mu * (2/r - 1/a))
 */
function visViva(r: number, a: number): number {
	// r and a in km
	return Math.sqrt(MU_SUN * (2 / r - 1 / a));
}

/**
 * Calculate orbital velocity at a point in an elliptical orbit
 */
function orbitalVelocity(r_au: number, a_au: number): number {
	const r = r_au * AU_TO_KM;
	const a = a_au * AU_TO_KM;
	return visViva(r, a);
}

/**
 * Simplified Hohmann transfer delta-V calculation
 *
 * This approximates the delta-V needed to transfer between two orbits.
 * For NEA missions, we use a simplified model based on the
 * characteristic delta-V approach.
 */
export function calculateHohmannDeltaV(
	fromOrbit: OrbitalElements,
	toOrbit: OrbitalElements
): number {
	// Convert semi-major axes to km
	const a1 = fromOrbit.a * AU_TO_KM;
	const a2 = toOrbit.a * AU_TO_KM;

	// For coplanar circular orbits, Hohmann transfer delta-V is:
	// dV = sqrt(mu/r1) * |sqrt(2*r2/(r1+r2)) - 1| + sqrt(mu/r2) * |1 - sqrt(2*r1/(r1+r2))|

	// Using circular approximation at semi-major axis
	const v1 = Math.sqrt(MU_SUN / a1);
	const v2 = Math.sqrt(MU_SUN / a2);

	// Transfer orbit semi-major axis
	const aTransfer = (a1 + a2) / 2;

	// Velocities at transfer points
	const vTransfer1 = visViva(a1, aTransfer);
	const vTransfer2 = visViva(a2, aTransfer);

	// Delta-V for departure and arrival
	const dV1 = Math.abs(vTransfer1 - v1);
	const dV2 = Math.abs(v2 - vTransfer2);

	// Add plane change cost (simplified)
	// Inclination change is expensive - roughly proportional to velocity * sin(di)
	const inclinationChange = Math.abs(toOrbit.i - fromOrbit.i) * (Math.PI / 180);
	const avgVelocity = (v1 + v2) / 2;
	const planeChangeCost = inclinationChange > 0.01
		? avgVelocity * Math.sin(inclinationChange) * 0.5
		: 0;

	// Convert to km/s
	return (dV1 + dV2 + planeChangeCost) / 1000;
}

/**
 * Calculate approximate delta-V using simplified characteristic velocity
 * Based on Shoemaker-Helin metric for NEA accessibility
 */
export function calculateCharacteristicDeltaV(
	neaOrbit: OrbitalElements
): number {
	// Earth's orbital parameters (approximate)
	const earthA = 1.0;  // AU
	const earthE = 0.017;
	const earthI = 0;    // degrees

	// Perihelion and aphelion
	const q = neaOrbit.a * (1 - neaOrbit.e);  // Perihelion
	const Q = neaOrbit.a * (1 + neaOrbit.e);  // Aphelion

	// Simplified characteristic velocity formula
	// Based on delta-V needed from Earth escape to NEA rendezvous

	// Component from semi-major axis difference
	const dA = Math.abs(neaOrbit.a - earthA);
	const deltaVa = 7.7 * Math.sqrt(dA);  // km/s, empirical factor

	// Component from eccentricity
	const deltaVe = 3.5 * neaOrbit.e;  // km/s

	// Component from inclination
	const deltaVi = 0.4 * neaOrbit.i;  // km/s, inclination in degrees

	// Total characteristic delta-V
	// This is a simplified model; real calculations would use Lambert solvers
	const totalDeltaV = Math.sqrt(
		deltaVa * deltaVa +
		deltaVe * deltaVe +
		deltaVi * deltaVi * 0.5  // Inclination changes are often phased
	);

	return Math.max(0.5, Math.min(15, totalDeltaV));  // Clamp to realistic range
}

/**
 * Calculate delta-V for a satellite to reach and survey an NEA
 * Includes round-trip cost approximation
 */
export function calculateSurveyDeltaV(
	satelliteOrbit: OrbitalElements,
	neaOrbit: OrbitalElements,
	propulsionType: PropulsionType
): number {
	const efficiency = PROPULSION_SPECS[propulsionType].efficiency;

	// Outbound delta-V (Hohmann approximation)
	const outboundDV = calculateHohmannDeltaV(satelliteOrbit, neaOrbit);

	// Survey operation delta-V (station keeping, approach maneuvers)
	const surveyDV = 0.1 + Math.random() * 0.2;  // 0.1-0.3 km/s

	// Return trip would require waiting for synodic period
	// Approximate as partial return cost
	const returnFactor = 0.6;  // Can use gravity assists
	const returnDV = outboundDV * returnFactor;

	// Apply propulsion efficiency
	const totalDV = (outboundDV + surveyDV + returnDV) / efficiency;

	return totalDV;
}

/**
 * Get propulsion system specifications
 */
export function getPropulsionSpecs(propulsionType: PropulsionType) {
	return PROPULSION_SPECS[propulsionType];
}

/**
 * Create a new satellite with initial orbital parameters
 */
export function createSatellite(
	id: string,
	propulsionType: PropulsionType
): Satellite {
	const specs = PROPULSION_SPECS[propulsionType];
	return {
		id,
		deltaVBudget: specs.deltaVCapacity,
		maxDeltaV: specs.deltaVCapacity,
		surveysCompleted: 0,
		status: 'operational',
		assignedTargets: []
	};
}

/**
 * Get the default satellite orbit (Earth-like survey orbit)
 */
export function getDefaultSatelliteOrbit(): OrbitalElements {
	return {
		a: 1.0,      // Earth-like orbit
		e: 0.02,     // Slightly elliptical
		i: 0.5,      // Small inclination
		omega: 0,
		Omega: 0,
		M: 0
	};
}

/**
 * Check if a satellite can reach an NEA
 */
export function canReachNEA(
	satellite: Satellite,
	neaOrbit: OrbitalElements,
	propulsionType: PropulsionType
): boolean {
	if (satellite.status !== 'operational') return false;

	const requiredDV = calculateCharacteristicDeltaV(neaOrbit);
	const safetyMargin = 0.2;  // Keep 20% reserve

	return satellite.deltaVBudget >= requiredDV * (1 + safetyMargin);
}

/**
 * Calculate NEA accessibility score (lower = easier to reach)
 */
export function calculateAccessibility(neaOrbit: OrbitalElements): number {
	const dV = calculateCharacteristicDeltaV(neaOrbit);
	// Normalize to 0-1 range where 0 = most accessible
	return Math.min(1, dV / 10);
}

/**
 * Estimate time of flight for transfer (simplified)
 * Returns time in days
 */
export function estimateTransferTime(
	fromOrbit: OrbitalElements,
	toOrbit: OrbitalElements
): number {
	// Hohmann transfer time is half the period of the transfer ellipse
	const aTransfer = (fromOrbit.a + toOrbit.a) / 2;  // AU
	// Period in years: T = a^(3/2) for a in AU
	const periodYears = Math.pow(aTransfer, 1.5);
	const transferYears = periodYears / 2;
	return transferYears * 365.25;  // Convert to days
}
