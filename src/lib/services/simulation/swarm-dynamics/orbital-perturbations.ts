/**
 * Orbital Perturbations Model
 *
 * Calculates perturbation magnitudes and delta-V requirements for
 * station-keeping in a Dyson swarm environment.
 */

import {
	CONSTANTS,
	estimatePerturbations,
	calculateDeltaVBudget,
	circularOrbitalVelocity,
	type PerturbationBudget,
	type DeltaVBudget
} from '$lib/services/simulation-core';
import type { PropulsionType } from './types';

/**
 * Extended perturbation budget including swarm-specific effects
 */
export interface SwarmPerturbationBudget extends PerturbationBudget {
	/** Differential SRP (due to collector variability) in m/s^2 */
	differentialSRP: number;
	/** Yarkovsky-like thermal effect in m/s^2 */
	thermalEffect: number;
	/** Inter-unit gravitational interaction in m/s^2 */
	interUnitGravity: number;
}

/**
 * Calculate extended perturbation budget for swarm element
 * @param distanceAU Distance from Sun in AU
 * @param interUnitSpacingM Spacing between units in meters
 * @param collectorMassKg Mass of each collector in kg
 * @param srpAcceleration Base SRP acceleration in m/s^2
 * @param srpVariability Fractional variability in SRP (e.g., 0.01 = 1%)
 * @returns Extended perturbation budget
 */
export function calculateSwarmPerturbations(
	distanceAU: number,
	interUnitSpacingM: number,
	collectorMassKg: number,
	srpAcceleration: number,
	srpVariability: number = 0.01
): SwarmPerturbationBudget {
	// Get base perturbations
	const base = estimatePerturbations(distanceAU, interUnitSpacingM / 1000);

	// Differential SRP due to reflectivity variations, orientation errors, etc.
	const differentialSRP = srpAcceleration * srpVariability;

	// Yarkovsky-like effect from thermal re-radiation
	// Very small for actively pointed collectors
	const thermalEffect = srpAcceleration * 0.001; // ~0.1% of SRP

	// Inter-unit gravitational interaction
	// F = G * m1 * m2 / r^2, a = G * m / r^2
	const G = 6.674e-11;
	const interUnitGravity = (G * collectorMassKg) / (interUnitSpacingM * interUnitSpacingM);

	return {
		...base,
		differentialSRP,
		thermalEffect,
		interUnitGravity,
		total: base.total + differentialSRP + thermalEffect + interUnitGravity
	};
}

/**
 * Calculate total delta-V requirement per year for station-keeping
 * @param perturbations Perturbation budget
 * @param controlMargin Safety margin factor (e.g., 1.5 = 50% margin)
 * @returns Required delta-V in m/s/year
 */
export function calculateRequiredDeltaV(
	perturbations: SwarmPerturbationBudget,
	controlMargin: number = 1.5
): number {
	// Continuous perturbation requires continuous counteraction
	// But with finite control bandwidth, we accumulate error and correct periodically
	// Assume corrections every ~1 day with 10% duty cycle for active correction
	const dutyCycle = 0.1;
	const requiredAcceleration = perturbations.total * controlMargin;

	return requiredAcceleration * CONSTANTS.SECONDS_PER_YEAR * dutyCycle;
}

/**
 * Propulsion system characteristics
 */
export interface PropulsionCharacteristics {
	/** Specific impulse in seconds */
	isp: number;
	/** Thrust-to-weight ratio (dimensionless) */
	thrustToWeight: number;
	/** Propellant mass fraction for mission lifetime */
	propellantFraction: number;
	/** Effective exhaust velocity in m/s */
	exhaustVelocityMs: number;
	/** Whether system is propellant-limited */
	isPropellantLimited: boolean;
}

/**
 * Get propulsion characteristics for a given type
 * @param propType Propulsion system type
 * @param missionYears Mission duration for propellant budgeting
 * @returns Propulsion characteristics
 */
export function getPropulsionCharacteristics(
	propType: PropulsionType,
	missionYears: number
): PropulsionCharacteristics {
	const g0 = 9.81; // m/s^2

	switch (propType) {
		case 'srp_only':
			return {
				isp: Infinity, // No propellant consumed
				thrustToWeight: 0, // No active thrust
				propellantFraction: 0,
				exhaustVelocityMs: Infinity,
				isPropellantLimited: false
			};

		case 'ion':
			// Hall effect or gridded ion thruster
			return {
				isp: 3000,
				thrustToWeight: 1e-4, // Very low thrust
				propellantFraction: 0.1 * Math.min(missionYears / 10, 1), // 10% for 10 years
				exhaustVelocityMs: 3000 * g0,
				isPropellantLimited: true
			};

		case 'cold_gas':
			// Simple cold gas (N2 or Xe)
			return {
				isp: 70,
				thrustToWeight: 1e-3,
				propellantFraction: 0.2 * Math.min(missionYears / 5, 1), // 20% for 5 years
				exhaustVelocityMs: 70 * g0,
				isPropellantLimited: true
			};

		case 'hybrid':
			// SRP + small ion system
			return {
				isp: 2000, // Blended effective Isp
				thrustToWeight: 5e-5,
				propellantFraction: 0.05 * Math.min(missionYears / 10, 1), // 5% for 10 years
				exhaustVelocityMs: 2000 * g0,
				isPropellantLimited: true
			};
	}
}

/**
 * Calculate mission lifetime based on propellant constraints
 * @param propType Propulsion system type
 * @param dryMassKg Spacecraft dry mass in kg
 * @param requiredDeltaVPerYear Annual delta-V requirement in m/s
 * @param maxYears Maximum mission duration in years
 * @returns Mission lifetime in years
 */
export function calculatePropellantLifetime(
	propType: PropulsionType,
	dryMassKg: number,
	requiredDeltaVPerYear: number,
	maxYears: number
): number {
	if (propType === 'srp_only') {
		return maxYears; // Not propellant limited
	}

	const props = getPropulsionCharacteristics(propType, maxYears);

	// Tsiolkovsky rocket equation: dV = ve * ln(m0/mf)
	// Total propellant mass available
	const propellantMassKg = (dryMassKg * props.propellantFraction) / (1 - props.propellantFraction);
	const totalMassKg = dryMassKg + propellantMassKg;

	// Total delta-V available
	const totalDeltaV = props.exhaustVelocityMs * Math.log(totalMassKg / dryMassKg);

	// Years until propellant exhaustion
	const propellantLifetime = totalDeltaV / requiredDeltaVPerYear;

	return Math.min(propellantLifetime, maxYears);
}

/**
 * Calculate velocity uncertainty from control limitations
 * @param propType Propulsion system type
 * @param perturbations Perturbation budget
 * @param controlBandwidthHz Control system bandwidth in Hz
 * @returns RMS velocity uncertainty in m/s
 */
export function calculateVelocityUncertainty(
	propType: PropulsionType,
	perturbations: SwarmPerturbationBudget,
	controlBandwidthHz: number = 0.001 // ~17 minute control cycle
): number {
	// Velocity error accumulates between corrections
	// delta_v = a * t where t = 1 / bandwidth
	const controlPeriod = 1 / controlBandwidthHz;

	// RMS perturbation (assuming uncorrelated sources)
	const rmsAcceleration = Math.sqrt(
		perturbations.solarGradient ** 2 +
			perturbations.thirdBody ** 2 +
			perturbations.solarWind ** 2 +
			perturbations.differentialSRP ** 2 +
			perturbations.thermalEffect ** 2 +
			perturbations.interUnitGravity ** 2
	);

	// Base velocity uncertainty
	let velocityUncertainty = rmsAcceleration * controlPeriod;

	// Propulsion-specific factors
	switch (propType) {
		case 'srp_only':
			// Limited control authority increases uncertainty
			velocityUncertainty *= 2.0;
			break;
		case 'ion':
			// Good precision but slow response
			velocityUncertainty *= 1.2;
			break;
		case 'cold_gas':
			// Fast response but coarse control
			velocityUncertainty *= 1.5;
			break;
		case 'hybrid':
			// Best of both worlds
			velocityUncertainty *= 1.0;
			break;
	}

	return velocityUncertainty;
}

/**
 * Calculate orbital plane maintenance delta-V
 * Accounts for out-of-plane perturbations
 * @param distanceAU Distance from Sun in AU
 * @param inclinationVariationRad Maximum inclination variation in radians
 * @returns Annual delta-V for plane maintenance in m/s
 */
export function calculatePlaneMaintenanceDeltaV(
	distanceAU: number,
	inclinationVariationRad: number = 0.001 // ~0.06 degrees
): number {
	const orbitalVelocity = circularOrbitalVelocity(distanceAU);

	// Delta-V for plane change: dV = 2 * v * sin(di/2)
	// For small angles: dV ≈ v * di
	return orbitalVelocity * inclinationVariationRad * 2; // Factor of 2 for bidirectional correction
}
