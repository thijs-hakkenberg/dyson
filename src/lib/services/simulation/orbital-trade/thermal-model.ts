/**
 * Thermal Model for Orbital Locations
 *
 * Calculates thermal feasibility, radiator requirements, and thermal
 * cliff distances for different orbital locations.
 */

import { solarFluxAtDistance, CONSTANTS } from '$lib/services/simulation-core';
import type {
	OrbitalLocation,
	ThermalCliffResult,
	LocationMetrics
} from './types';
import { ORBITAL_LOCATIONS } from './delta-v-calculator';

/**
 * Stefan-Boltzmann constant (W/m^2/K^4)
 */
const STEFAN_BOLTZMANN = 5.67e-8;

/**
 * Typical radiator parameters
 */
export const RADIATOR_PARAMS = {
	/** Radiator emissivity (typical for space radiators) */
	emissivity: 0.85,
	/** Maximum operating temperature in Kelvin */
	maxOperatingTempK: 400,
	/** Minimum operating temperature in Kelvin */
	minOperatingTempK: 280,
	/** Nominal operating temperature in Kelvin */
	nominalTempK: 350,
	/** Area density of radiator panels in kg/m^2 */
	areaDensityKgM2: 3.5,
	/** Degradation factor over time */
	degradationFactor: 0.9
};

/**
 * Thermal environment parameters
 */
export const THERMAL_PARAMS = {
	/** Baseline thermal load at 1 AU in MW */
	baselineThermalLoadMW: 2.0,
	/** Electronics waste heat fraction */
	electronicsWasteHeat: 0.3,
	/** Solar absorptivity of radiator (front) */
	solarAbsorptivity: 0.15,
	/** View factor to deep space */
	viewFactorDeepSpace: 0.9
};

/**
 * Calculate required radiator area for a given thermal load and distance
 * @param thermalLoadMW Waste heat to dissipate in MW
 * @param distanceAU Distance from Sun in AU
 * @returns Required radiator area in m^2
 */
export function calculateRadiatorArea(
	thermalLoadMW: number,
	distanceAU: number
): number {
	const thermalLoadW = thermalLoadMW * 1e6;

	// Solar flux at this distance
	const solarFlux = solarFluxAtDistance(distanceAU);

	// Absorbed solar heat on radiator (unwanted)
	// Assume radiator oriented edge-on to minimize solar load
	const solarAbsorbed = solarFlux * THERMAL_PARAMS.solarAbsorptivity * 0.1; // Edge-on factor

	// Effective radiating temperature
	const T = RADIATOR_PARAMS.nominalTempK;

	// Radiative heat rejection per unit area (Stefan-Boltzmann)
	const qRadiative =
		STEFAN_BOLTZMANN *
		RADIATOR_PARAMS.emissivity *
		Math.pow(T, 4) *
		THERMAL_PARAMS.viewFactorDeepSpace;

	// Net heat rejection per unit area
	const qNet = qRadiative - solarAbsorbed;

	// Safety margin for degradation
	const qEffective = qNet * RADIATOR_PARAMS.degradationFactor;

	// Required area
	if (qEffective <= 0) {
		// Thermal runaway - cannot reject heat at this distance
		return Infinity;
	}

	return thermalLoadW / qEffective;
}

/**
 * Calculate maximum thermal load that can be dissipated at a distance
 * @param radiatorAreaM2 Available radiator area in m^2
 * @param distanceAU Distance from Sun in AU
 * @returns Maximum thermal load in MW
 */
export function calculateMaxThermalLoad(
	radiatorAreaM2: number,
	distanceAU: number
): number {
	const solarFlux = solarFluxAtDistance(distanceAU);
	const solarAbsorbed = solarFlux * THERMAL_PARAMS.solarAbsorptivity * 0.1;

	const T = RADIATOR_PARAMS.nominalTempK;
	const qRadiative =
		STEFAN_BOLTZMANN *
		RADIATOR_PARAMS.emissivity *
		Math.pow(T, 4) *
		THERMAL_PARAMS.viewFactorDeepSpace;

	const qNet = qRadiative - solarAbsorbed;
	const qEffective = qNet * RADIATOR_PARAMS.degradationFactor;

	if (qEffective <= 0) return 0;

	return (radiatorAreaM2 * qEffective) / 1e6; // Convert to MW
}

/**
 * Calculate the thermal cliff distance for a given thermal budget
 * The thermal cliff is where radiator requirements become impractical
 * @param thermalBudgetMW Thermal dissipation requirement in MW
 * @param maxRadiatorAreaM2 Maximum practical radiator area
 * @returns Distance in AU where thermal limits are reached
 */
export function calculateThermalCliffDistance(
	thermalBudgetMW: number,
	maxRadiatorAreaM2: number = 10000 // 10,000 m^2 practical limit
): number {
	// Binary search for thermal cliff distance
	let low = 0.3; // Minimum practical distance
	let high = 1.5; // Beyond 1 AU, thermal is not limiting

	while (high - low > 0.01) {
		const mid = (low + high) / 2;
		const requiredArea = calculateRadiatorArea(thermalBudgetMW, mid);

		if (requiredArea <= maxRadiatorAreaM2) {
			high = mid; // Can go closer
		} else {
			low = mid; // Need to stay further
		}
	}

	return low;
}

/**
 * Analyze thermal feasibility for a specific orbital location
 */
export function analyzeThermalFeasibility(
	location: OrbitalLocation,
	thermalBudgetMW: number
): ThermalCliffResult {
	const data = ORBITAL_LOCATIONS[location];
	const distanceAU = data.distanceAU;

	const requiredArea = calculateRadiatorArea(thermalBudgetMW, distanceAU);
	const maxPracticalArea = 10000; // m^2

	const withinLimits = requiredArea <= maxPracticalArea;
	const maxLoad = calculateMaxThermalLoad(maxPracticalArea, distanceAU);

	// Find the thermal cliff for this configuration
	const thermalCliff = calculateThermalCliffDistance(thermalBudgetMW, maxPracticalArea);

	return {
		location,
		thermalCliffDistanceAU: thermalCliff,
		withinLimits,
		requiredRadiatorAreaM2: withinLimits ? requiredArea : Infinity,
		maxThermalLoadMW: maxLoad
	};
}

/**
 * Calculate thermal feasibility score for a location
 * @param location Orbital location
 * @param thermalBudgetMW Required thermal dissipation
 * @returns Score from 0 (infeasible) to 1 (optimal)
 */
export function calculateThermalFeasibilityScore(
	location: OrbitalLocation,
	thermalBudgetMW: number
): number {
	const result = analyzeThermalFeasibility(location, thermalBudgetMW);

	if (!result.withinLimits) {
		return 0;
	}

	// Score based on radiator area requirements
	// Smaller area = better score
	const maxPracticalArea = 10000; // m^2
	const normalizedArea = result.requiredRadiatorAreaM2 / maxPracticalArea;

	// Inverse relationship: less area = higher score
	// Use exponential decay for smooth scoring
	return Math.exp(-2 * normalizedArea);
}

/**
 * Calculate solar power availability score
 * Higher flux = more power available = higher score
 * But also more thermal challenges
 * @param location Orbital location
 * @returns Score from 0 to 1
 */
export function calculateSolarPowerScore(location: OrbitalLocation): number {
	const data = ORBITAL_LOCATIONS[location];

	// Solar power scales with flux multiplier
	// But we want to balance high power with practical limits
	// Score peaks around 1.5x (0.8 AU) and decreases for extremes
	const flux = data.solarFluxMultiplier;

	if (flux < 1.0) {
		// Less power than 1 AU - linear decrease
		return flux;
	} else if (flux <= 2.5) {
		// Optimal range: 1.0 to 2.5x
		return 1.0;
	} else {
		// Too much flux - thermal challenges dominate
		// Exponential decrease
		return Math.exp(-(flux - 2.5) / 2);
	}
}

/**
 * Calculate equilibrium temperature at a distance
 * @param distanceAU Distance from Sun in AU
 * @param albedo Surface albedo (0-1)
 * @returns Equilibrium temperature in Kelvin
 */
export function calculateEquilibriumTemperature(
	distanceAU: number,
	albedo: number = 0.3
): number {
	const solarFlux = solarFluxAtDistance(distanceAU);
	const absorbedFlux = solarFlux * (1 - albedo);

	// Stefan-Boltzmann equilibrium: T^4 = absorbed / (sigma * epsilon)
	const T = Math.pow(
		absorbedFlux / (STEFAN_BOLTZMANN * RADIATOR_PARAMS.emissivity),
		0.25
	);

	return T;
}

/**
 * Get radiator mass estimate for a given thermal load
 * @param thermalLoadMW Thermal load in MW
 * @param distanceAU Distance from Sun in AU
 * @returns Estimated radiator mass in kg
 */
export function estimateRadiatorMass(
	thermalLoadMW: number,
	distanceAU: number
): number {
	const area = calculateRadiatorArea(thermalLoadMW, distanceAU);

	if (!isFinite(area)) {
		return Infinity;
	}

	return area * RADIATOR_PARAMS.areaDensityKgM2;
}

/**
 * Calculate thermal metrics for a location
 */
export function calculateThermalMetrics(
	location: OrbitalLocation,
	thermalBudgetMW: number
): Pick<LocationMetrics, 'radiatorAreaM2' | 'solarFluxWm2'> {
	const data = ORBITAL_LOCATIONS[location];
	const solarFlux = solarFluxAtDistance(data.distanceAU);
	const radiatorArea = calculateRadiatorArea(thermalBudgetMW, data.distanceAU);

	return {
		radiatorAreaM2: isFinite(radiatorArea) ? radiatorArea : Infinity,
		solarFluxWm2: solarFlux
	};
}
