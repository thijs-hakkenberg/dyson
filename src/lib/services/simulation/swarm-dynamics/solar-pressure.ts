/**
 * Solar Radiation Pressure Calculations
 *
 * Calculates SRP force, acceleration, and delta-V available for station-keeping.
 * Uses utilities from simulation-core/orbital-mechanics.ts.
 */

import {
	CONSTANTS,
	solarRadiationPressure,
	srpForce,
	srpAcceleration,
	annualDeltaVFromAcceleration
} from '$lib/services/simulation-core';

/**
 * SRP calculation result for a collector unit
 */
export interface SRPResult {
	/** Solar radiation pressure at distance (N/m^2) */
	pressureNm2: number;
	/** Force on collector (N) */
	forceN: number;
	/** Acceleration (m/s^2) */
	accelerationMs2: number;
	/** Annual delta-V available (m/s/year) */
	deltaVPerYearMs: number;
	/** Maximum angular deflection rate (rad/s) at distance */
	maxDeflectionRateRadS: number;
}

/**
 * Calculate SRP parameters for a collector unit
 * @param areaM2 Collector surface area in m^2
 * @param massKg Collector mass in kg
 * @param distanceAU Distance from Sun in AU
 * @param reflectivity Surface reflectivity (0-1)
 * @returns SRP calculation results
 */
export function calculateSRP(
	areaM2: number,
	massKg: number,
	distanceAU: number,
	reflectivity: number
): SRPResult {
	const pressure = solarRadiationPressure(distanceAU, reflectivity);
	const force = srpForce(areaM2, distanceAU, reflectivity);
	const acceleration = srpAcceleration(areaM2, massKg, distanceAU, reflectivity);
	const deltaVPerYear = annualDeltaVFromAcceleration(acceleration);

	// Maximum deflection rate assumes we can point the sail perpendicular to Sun
	// Angular acceleration = torque / moment of inertia
	// For a flat plate, I ~ m * L^2 / 12, L = sqrt(area)
	const charLength = Math.sqrt(areaM2);
	const momentOfInertia = (massKg * charLength * charLength) / 12;
	// Torque from off-center SRP (maximum at 45 degrees, using half the surface)
	const maxTorque = (force * charLength) / 4;
	const maxDeflectionRateRadS = maxTorque / momentOfInertia;

	return {
		pressureNm2: pressure,
		forceN: force,
		accelerationMs2: acceleration,
		deltaVPerYearMs: deltaVPerYear,
		maxDeflectionRateRadS
	};
}

/**
 * Calculate available delta-V from SRP for station-keeping
 * Accounts for duty cycle and pointing constraints
 * @param areaM2 Collector surface area in m^2
 * @param massKg Collector mass in kg
 * @param distanceAU Distance from Sun in AU
 * @param reflectivity Surface reflectivity (0-1)
 * @param dutyCycle Fraction of time SRP can be used for control (0-1)
 * @param controlEfficiency Efficiency of SRP vectoring (0-1)
 * @returns Effective delta-V per year in m/s
 */
export function effectiveSRPDeltaV(
	areaM2: number,
	massKg: number,
	distanceAU: number,
	reflectivity: number,
	dutyCycle: number = 0.5,
	controlEfficiency: number = 0.7
): number {
	const srp = calculateSRP(areaM2, massKg, distanceAU, reflectivity);
	return srp.deltaVPerYearMs * dutyCycle * controlEfficiency;
}

/**
 * Calculate area-to-mass ratio required for given control authority
 * @param requiredDeltaVPerYear Required delta-V per year in m/s
 * @param distanceAU Distance from Sun in AU
 * @param reflectivity Surface reflectivity (0-1)
 * @param dutyCycle Fraction of time SRP can be used (0-1)
 * @param controlEfficiency Efficiency of SRP vectoring (0-1)
 * @returns Required area-to-mass ratio in m^2/kg
 */
export function requiredAreaToMassRatio(
	requiredDeltaVPerYear: number,
	distanceAU: number,
	reflectivity: number,
	dutyCycle: number = 0.5,
	controlEfficiency: number = 0.7
): number {
	const pressure = solarRadiationPressure(distanceAU, reflectivity);
	const effectivePressure = pressure * dutyCycle * controlEfficiency;
	const requiredAcceleration = requiredDeltaVPerYear / CONSTANTS.SECONDS_PER_YEAR;

	// a = P * A / m => A/m = a / P
	return requiredAcceleration / effectivePressure;
}

/**
 * SRP force components for attitude control simulation
 */
export interface SRPForceVector {
	/** Radial component (toward/away from Sun) */
	radialN: number;
	/** Tangential component (along orbit) */
	tangentialN: number;
	/** Normal component (out of orbital plane) */
	normalN: number;
}

/**
 * Calculate SRP force vector for a given sail orientation
 * @param areaM2 Collector surface area in m^2
 * @param distanceAU Distance from Sun in AU
 * @param reflectivity Surface reflectivity (0-1)
 * @param sunAngleRad Angle of sail normal from Sun direction (rad)
 * @param clockAngleRad Clock angle of sail rotation about Sun line (rad)
 * @returns Force vector components
 */
export function srpForceVector(
	areaM2: number,
	distanceAU: number,
	reflectivity: number,
	sunAngleRad: number,
	clockAngleRad: number
): SRPForceVector {
	const pressure = solarRadiationPressure(distanceAU, reflectivity);

	// Effective area is reduced by cos(sunAngle)
	const effectiveArea = areaM2 * Math.cos(sunAngleRad);
	const baseForceMagnitude = pressure * effectiveArea;

	// For a reflective surface, force is in the sail normal direction
	// For an absorptive surface, force is along Sun line
	// Mixed case depends on reflectivity

	// Absorbed component (along Sun line)
	const absorbedForce = baseForceMagnitude * (1 - reflectivity);

	// Reflected component (along sail normal, which is at sunAngle from Sun line)
	const reflectedForce = baseForceMagnitude * reflectivity * 2 * Math.cos(sunAngleRad);

	// Total radial force (along Sun line)
	const radialN = absorbedForce + reflectedForce * Math.cos(sunAngleRad);

	// Transverse force (perpendicular to Sun line)
	const transverseForce = reflectedForce * Math.sin(sunAngleRad);

	// Decompose transverse into tangential and normal using clock angle
	const tangentialN = transverseForce * Math.cos(clockAngleRad);
	const normalN = transverseForce * Math.sin(clockAngleRad);

	return {
		radialN,
		tangentialN,
		normalN
	};
}

/**
 * Calculate response time for SRP-based attitude adjustment
 * @param areaM2 Collector surface area in m^2
 * @param massKg Collector mass in kg
 * @param distanceAU Distance from Sun in AU
 * @param reflectivity Surface reflectivity (0-1)
 * @param angleChangeRad Desired angle change in radians
 * @returns Response time in seconds
 */
export function srpResponseTime(
	areaM2: number,
	massKg: number,
	distanceAU: number,
	reflectivity: number,
	angleChangeRad: number
): number {
	const srp = calculateSRP(areaM2, massKg, distanceAU, reflectivity);

	// Time for angular motion: theta = 0.5 * alpha * t^2
	// t = sqrt(2 * theta / alpha)
	// Multiply by 2 for acceleration + deceleration phases
	return 2 * Math.sqrt((2 * Math.abs(angleChangeRad)) / srp.maxDeflectionRateRadS);
}
