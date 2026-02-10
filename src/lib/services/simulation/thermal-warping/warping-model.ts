/**
 * Thermal Warping Physics Model
 *
 * Models thermoelastic deformation of large thin-film membranes under
 * solar illumination. Calculates equilibrium temperatures, thermal gradients,
 * curvature, and deflection with tension counteraction.
 *
 * Key physics:
 * - Equilibrium temperature from radiative balance
 * - Front-to-back thermal gradient from emissivity asymmetry
 * - Thermoelastic curvature: kappa = alpha * dT / thickness
 * - Flat membrane deflection: w = kappa * L² / 8
 * - Tension restoring force reduces effective deflection
 */

import { solarFluxAtDistance } from '$lib/services/simulation-core';
import type { WarpingConfig, WarpingSweepPoint } from './types';

/** Stefan-Boltzmann constant in W/(m² K⁴) */
export const SIGMA_SB = 5.670374419e-8;

/** Kapton polyimide density in kg/m³ */
export const KAPTON_DENSITY = 1420;

/** Young's modulus for Kapton in Pa (~2.5 GPa) */
export const KAPTON_E = 2.5e9;

/** Poisson's ratio for Kapton */
export const KAPTON_NU = 0.34;

/** Phased array flatness tolerance in meters (5 mm) */
export const PHASED_ARRAY_TOLERANCE = 0.005;

/** Structural flatness tolerance in meters (10 cm) */
export const STRUCTURAL_TOLERANCE = 0.10;

/**
 * Calculate equilibrium temperature of a PV membrane
 *
 * Energy balance: absorbed solar flux (minus PV conversion) = radiated thermal emission
 * T_eq = ((flux * absorptivity * (1 - pvEfficiency)) / (sigma * (emissivity_front + emissivity_back)))^(1/4)
 *
 * We assume front and back emissivity are similar (slight asymmetry modeled in gradient).
 */
export function calculateEquilibriumTemp(
	distanceAU: number,
	absorptivity: number,
	emissivity: number,
	pvEfficiency: number
): number {
	const flux = solarFluxAtDistance(distanceAU);
	const absorbedPower = flux * absorptivity * (1 - pvEfficiency);
	// Front and back both radiate; use 2 * emissivity for total emission
	const totalEmissivity = 2 * emissivity;
	return Math.pow(absorbedPower / (SIGMA_SB * totalEmissivity), 0.25);
}

/**
 * Calculate front-to-back thermal gradient
 *
 * The key gradient driving warping is front-to-back temperature difference
 * caused by emissivity asymmetry and direct solar illumination geometry.
 * dT ≈ flux * absorptivity / (4 * sigma * T_eq³) * delta_emissivity
 *
 * For a PV membrane, we model a ~5-10% emissivity difference front-to-back.
 */
export function calculateThermalGradient(
	distanceAU: number,
	absorptivity: number,
	emissivity: number,
	pvEfficiency: number
): number {
	const flux = solarFluxAtDistance(distanceAU);
	const tEq = calculateEquilibriumTemp(distanceAU, absorptivity, emissivity, pvEfficiency);
	// Assume front-back emissivity difference of ~8% of emissivity
	const deltaEmissivity = emissivity * 0.08;
	return (flux * absorptivity) / (4 * SIGMA_SB * Math.pow(tEq, 3)) * deltaEmissivity;
}

/**
 * Calculate membrane thickness from areal density
 *
 * thickness = arealDensity(g/m²) / (1000 * density(kg/m³))
 * Converts g/m² to kg/m² then divides by volumetric density.
 */
export function calculateThickness(arealDensityGsm: number): number {
	return arealDensityGsm / (1000 * KAPTON_DENSITY);
}

/**
 * Calculate thermoelastic curvature
 *
 * kappa = CTE * dT / thickness
 */
export function calculateCurvature(cte: number, dT: number, thickness: number): number {
	if (thickness <= 0) return 0;
	return cte * dT / thickness;
}

/**
 * Calculate maximum deflection for a flat membrane
 *
 * w_max = kappa * L² / 8
 * where L = sqrt(area) is the characteristic dimension.
 */
export function calculateMaxDeflection(curvature: number, area: number): number {
	const L = Math.sqrt(area);
	return Math.abs(curvature) * L * L / 8;
}

/**
 * Calculate critical tension to flatten the membrane
 *
 * T_critical = kappa * E * thickness² / (12 * (1 - nu²))
 * This is the tension per unit width required to counteract thermal curvature.
 */
export function calculateCriticalTension(
	curvature: number,
	E: number,
	thickness: number,
	nu: number
): number {
	return Math.abs(curvature) * E * thickness * thickness / (12 * (1 - nu * nu));
}

/**
 * Calculate effective deflection with tension counteraction
 *
 * w_effective = w_max * max(0, 1 - T_applied / T_critical)
 */
export function calculateEffectiveDeflection(
	maxDeflection: number,
	tensionApplied: number,
	tensionCritical: number
): number {
	if (tensionCritical <= 0) return maxDeflection;
	const ratio = tensionApplied / tensionCritical;
	return maxDeflection * Math.max(0, 1 - ratio);
}

/**
 * Check deflection against tolerance thresholds
 */
export function checkTolerances(deflection: number): {
	phasedArrayOK: boolean;
	structuralOK: boolean;
} {
	return {
		phasedArrayOK: deflection <= PHASED_ARRAY_TOLERANCE,
		structuralOK: deflection <= STRUCTURAL_TOLERANCE
	};
}

/**
 * Calculate all warping quantities for a single area value
 */
export function calculateSweepPoint(area: number, config: WarpingConfig): WarpingSweepPoint {
	const tEq = calculateEquilibriumTemp(
		config.orbitalDistance,
		config.absorptivity,
		config.emissivity,
		config.pvEfficiency
	);

	const dT = calculateThermalGradient(
		config.orbitalDistance,
		config.absorptivity,
		config.emissivity,
		config.pvEfficiency
	);

	const thickness = calculateThickness(config.arealDensity);
	const kappa = calculateCurvature(config.cte, dT, thickness);
	const wMax = calculateMaxDeflection(kappa, area);
	const tCritical = calculateCriticalTension(kappa, KAPTON_E, thickness, KAPTON_NU);
	const wEffective = calculateEffectiveDeflection(wMax, config.tension, tCritical);
	const tolerances = checkTolerances(wEffective);

	return {
		area,
		equilibriumTemp: tEq,
		thermalGradient: dT,
		curvature: kappa,
		maxDeflection: wMax,
		effectiveDeflection: wEffective,
		tensionRatio: tCritical > 0 ? config.tension / tCritical : Infinity,
		phasedArrayOK: tolerances.phasedArrayOK,
		structuralOK: tolerances.structuralOK
	};
}
