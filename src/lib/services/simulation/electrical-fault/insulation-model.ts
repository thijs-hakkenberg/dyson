/**
 * Insulation Model for Fault Analysis
 *
 * Models insulation breakdown, radiation degradation, and
 * fault propagation in high-voltage DC systems operating
 * in the near-Sun environment.
 */

import type { InsulationMaterial, SystemTopology } from './types';

/**
 * Insulation material properties
 */
export interface InsulationProperties {
	/** Dielectric strength in kV/mm */
	dielectricStrength: number;
	/** Thermal conductivity in W/(m*K) */
	thermalConductivity: number;
	/** Density in kg/m^3 */
	density: number;
	/** Maximum operating temperature in C */
	maxTemperature: number;
	/** Radiation resistance on 0-1 scale */
	radiationResistance: number;
	/** Cost per kg in $ */
	costPerKg: number;
}

/**
 * Insulation material property database
 *
 * Values based on manufacturer specifications and space-qualified materials.
 */
export const INSULATION_PROPERTIES: Record<InsulationMaterial, InsulationProperties> = {
	kapton: {
		dielectricStrength: 200, // kV/mm - DuPont Kapton HN
		thermalConductivity: 0.12, // W/(m*K)
		density: 1420, // kg/m^3
		maxTemperature: 400, // C
		radiationResistance: 0.8, // Good radiation tolerance
		costPerKg: 150 // $/kg
	},
	polyimide: {
		dielectricStrength: 220, // kV/mm - Generic polyimide
		thermalConductivity: 0.15, // W/(m*K)
		density: 1350, // kg/m^3
		maxTemperature: 350, // C
		radiationResistance: 0.75, // Good radiation tolerance
		costPerKg: 120 // $/kg
	},
	teflon: {
		dielectricStrength: 160, // kV/mm - PTFE
		thermalConductivity: 0.25, // W/(m*K)
		density: 2200, // kg/m^3
		maxTemperature: 260, // C (before significant degradation)
		radiationResistance: 0.6, // Moderate radiation tolerance
		costPerKg: 80 // $/kg
	},
	ceramic: {
		dielectricStrength: 300, // kV/mm - Alumina ceramic
		thermalConductivity: 25, // W/(m*K) - Much better thermal
		density: 3900, // kg/m^3
		maxTemperature: 1200, // C
		radiationResistance: 0.95, // Excellent radiation tolerance
		costPerKg: 500 // $/kg
	}
};

/**
 * Get insulation material properties
 *
 * @param material - Insulation material type
 * @returns Material properties
 */
export function getInsulationProperties(material: InsulationMaterial): InsulationProperties {
	return INSULATION_PROPERTIES[material];
}

/**
 * Calculate breakdown voltage for given insulation
 *
 * Accounts for radiation degradation over time and orbital distance.
 * Radiation dose scales as 1/r^2 from the Sun.
 *
 * @param material - Insulation material type
 * @param thickness - Insulation thickness in mm
 * @param ageYears - Years of operation (default 0)
 * @param orbitalDistance - Orbital distance in AU (default 1.0)
 * @returns Breakdown voltage in V
 */
export function calculateBreakdownVoltage(
	material: InsulationMaterial,
	thickness: number,
	ageYears: number = 0,
	orbitalDistance: number = 1.0
): number {
	const props = getInsulationProperties(material);

	// Base breakdown voltage in V (kV/mm * mm * 1000)
	const baseVoltage = props.dielectricStrength * thickness * 1000;

	// Radiation dose scaling (higher at closer orbits)
	const radiationFactor = 1 / (orbitalDistance * orbitalDistance);

	// Degradation rate per year
	// Higher radiation resistance = lower degradation
	// Base rate ~2% per year at 1 AU for materials with 0 resistance
	const degradationRate = 0.02 * radiationFactor * (1 - props.radiationResistance);

	// Exponential degradation model
	const degradation = Math.exp(-degradationRate * ageYears);

	return baseVoltage * degradation;
}

/**
 * Calculate expected insulation lifetime
 *
 * Based on voltage stress (inverse power law) and radiation environment.
 * Uses partial discharge inception voltage (PDIV) as the reference point
 * rather than full dielectric breakdown, since partial discharge causes
 * most real-world insulation degradation.
 *
 * PDIV is typically ~10-20% of dielectric breakdown for space applications.
 *
 * @param material - Insulation material type
 * @param thickness - Insulation thickness in mm
 * @param operatingVoltage - Operating voltage in V
 * @param orbitalDistance - Orbital distance in AU
 * @returns Expected lifetime in years
 */
export function calculateInsulationLifetime(
	material: InsulationMaterial,
	thickness: number,
	operatingVoltage: number,
	orbitalDistance: number
): number {
	const props = getInsulationProperties(material);

	// Use partial discharge inception voltage (PDIV) rather than full breakdown
	// PDIV is typically 10-15% of dielectric strength for practical systems
	// Reference voltage: 2 kV/mm for partial discharge onset (conservative)
	const pdivPerMm = 2000; // V/mm - partial discharge inception voltage
	const referenceVoltage = pdivPerMm * thickness;

	// Voltage stress ratio (operating / PDIV reference)
	const stressRatio = operatingVoltage / referenceVoltage;

	// Base lifetime at 50% of PDIV stress with good radiation resistance
	// ~100 years at 1 AU with 50% stress and perfect radiation resistance
	const baseLifetime = 100 * props.radiationResistance;

	// Inverse power law: L = L0 * (V0/V)^n
	// n = 4 for space-qualified insulation systems (more conservative than lab)
	// Lower exponent gives more realistic sensitivity to voltage changes
	const n = 4;
	const voltageLifetime = baseLifetime * Math.pow(0.5 / Math.max(0.05, stressRatio), n);

	// Radiation environment penalty (closer = shorter life)
	// At 0.5 AU, radiation is 4x higher, lifetime is reduced
	const radiationPenalty = orbitalDistance * orbitalDistance;

	// Minimum lifetime of 1 year for numerical stability
	return Math.max(1, voltageLifetime * radiationPenalty);
}

/**
 * Calculate insulation mass per MW of power capacity
 *
 * Estimates mass requirements for insulating power distribution
 * infrastructure at given voltage levels.
 *
 * @param material - Insulation material type
 * @param thickness - Insulation thickness in mm
 * @param voltage - Operating voltage in V
 * @returns Mass per MW in kg/MW
 */
export function calculateMassPerMW(
	material: InsulationMaterial,
	thickness: number,
	voltage: number
): number {
	const props = getInsulationProperties(material);

	// Higher voltage = larger conductors = more insulation surface area
	// Approximate: surface area scales with sqrt(power) at fixed voltage,
	// and power scales with voltage for fixed current carrying capacity
	const surfaceAreaPerMW = 10 * Math.sqrt(voltage / 1000); // m^2/MW

	// Insulation volume per MW
	const volumePerMW = surfaceAreaPerMW * (thickness / 1000); // m^3

	// Mass
	return volumePerMW * props.density; // kg/MW
}

/**
 * Calculate fault propagation probability
 *
 * Based on system topology and protection response times.
 * Series systems have higher propagation risk as faults
 * affect the entire string.
 *
 * @param topology - System topology type
 * @param detectionTimeMs - Fault detection time in ms
 * @param isolationTimeMs - Fault isolation time in ms
 * @returns Propagation probability (0-1)
 */
export function calculateFaultPropagationProbability(
	topology: SystemTopology,
	detectionTimeMs: number,
	isolationTimeMs: number
): number {
	const totalResponseMs = detectionTimeMs + isolationTimeMs;

	// Topology factors based on fault isolation characteristics
	const topologyFactors: Record<SystemTopology, number> = {
		series: 1.0, // Fault affects entire string
		parallel: 0.1, // Fault isolated to single branch
		hybrid: 0.4 // Intermediate - affects subgroup
	};

	const topologyFactor = topologyFactors[topology];

	// Response time effect
	// Reference: 10ms total response = 10% base propagation chance
	// Faster response = lower propagation
	const responseFactor = totalResponseMs / 100;

	// Combine factors and cap at 0.99
	return Math.min(0.99, topologyFactor * responseFactor);
}

/**
 * Calculate required isolation time for target propagation risk
 *
 * Determines how fast fault isolation must be to achieve
 * desired risk level given topology and detection speed.
 *
 * @param topology - System topology type
 * @param targetRisk - Target risk level
 * @param detectionTimeMs - Fault detection time in ms
 * @returns Required isolation time in ms
 */
export function calculateRequiredIsolationTime(
	topology: SystemTopology,
	targetRisk: 'low' | 'medium' | 'high',
	detectionTimeMs: number
): number {
	// Target propagation probabilities for each risk level
	const riskTargets = { low: 0.05, medium: 0.15, high: 0.3 };
	const target = riskTargets[targetRisk];

	const topologyFactors: Record<SystemTopology, number> = {
		series: 1.0,
		parallel: 0.1,
		hybrid: 0.4
	};

	const topologyFactor = topologyFactors[topology];

	// Solve: target = topologyFactor * (detect + isolate) / 100
	// isolate = (target * 100 / topologyFactor) - detect
	const totalRequired = (target * 100) / topologyFactor;
	const isolationRequired = Math.max(1, totalRequired - detectionTimeMs);

	return isolationRequired;
}

/**
 * Calculate reliability score for material/configuration
 *
 * Uses Weibull reliability model based on expected lifetime
 * and mission duration.
 *
 * @param material - Insulation material type
 * @param thickness - Insulation thickness in mm
 * @param voltage - Operating voltage in V
 * @param orbitalDistance - Orbital distance in AU
 * @param missionYears - Mission duration in years
 * @returns Reliability score (0-1)
 */
export function calculateReliability(
	material: InsulationMaterial,
	thickness: number,
	voltage: number,
	orbitalDistance: number,
	missionYears: number
): number {
	const lifetime = calculateInsulationLifetime(material, thickness, voltage, orbitalDistance);

	// Weibull reliability model
	// R(t) = exp(-(t/eta)^beta)
	// beta = 2.5 for "wear-out" failure mode (typical for insulation)
	// eta = characteristic life (our calculated lifetime)
	const beta = 2.5;
	const reliability = Math.exp(-Math.pow(missionYears / lifetime, beta));

	return Math.max(0, Math.min(1, reliability));
}
