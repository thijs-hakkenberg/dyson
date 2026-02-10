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

/** Kapton thermal conductivity in W/(m·K) */
export const KAPTON_K_THERMAL = 0.12;

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
 * Calculate effective thermal gradient for membrane warping
 *
 * Two mechanisms contribute to thermoelastic curvature in thin films:
 *
 * 1. Through-thickness gradient (Biot-corrected): For thin membranes (Bi << 1),
 *    the actual through-thickness dT from emissivity asymmetry is very small.
 *
 * 2. In-plane thermal stress / edge effects: Non-uniform temperature across
 *    the membrane surface (center-to-edge gradient from tension member shadows,
 *    view factor variations, and PV cell patchwork) creates in-plane stresses
 *    that can cause buckling/warping. This is modeled as an effective gradient
 *    proportional to the edge temperature difference scaled by a geometric
 *    coupling factor.
 *
 * The effective gradient combines both, with in-plane effects typically
 * dominating for thin space membranes.
 */
export function calculateThermalGradient(
	distanceAU: number,
	absorptivity: number,
	emissivity: number,
	pvEfficiency: number,
	arealDensityGsm: number = 25
): number {
	const flux = solarFluxAtDistance(distanceAU);
	const tEq = calculateEquilibriumTemp(distanceAU, absorptivity, emissivity, pvEfficiency);
	const thickness = calculateThickness(arealDensityGsm);

	// 1. Through-thickness gradient (conduction-limited, Biot correction)
	const deltaEmissivity = emissivity * 0.08;
	const qAsym = flux * absorptivity * (1 - pvEfficiency) * deltaEmissivity / (2 * emissivity);
	const dT_through = qAsym * thickness / KAPTON_K_THERMAL;

	// 2. In-plane thermal stress coupling
	// Edge-to-center temperature difference from view factor and structural shadows
	// Typically 1-5% of equilibrium temp for large membranes
	const dT_inplane_surface = tEq * 0.02;
	// Coupling factor: how much in-plane stress converts to out-of-plane curvature
	// For a thin plate under biaxial thermal stress: kappa_effective ~ alpha * dT_inplane
	// This acts like an equivalent through-thickness gradient:
	// dT_effective = dT_inplane * thickness (converts stress to curvature-equivalent gradient)
	const dT_inplane = dT_inplane_surface * 0.15; // geometric coupling (~15% for tensioned membranes)

	// Combined effective gradient
	return dT_through + dT_inplane;
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
		config.pvEfficiency,
		config.arealDensity
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
