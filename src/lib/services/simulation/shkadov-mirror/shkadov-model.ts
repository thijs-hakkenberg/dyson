/**
 * Shkadov Mirror Physics Model
 *
 * Calculates thrust, equilibrium temperature, mass, and feasibility
 * for a Shkadov mirror (stellar engine) at various standoff distances.
 * Addresses research question rq-3b-1.
 */

import { CONSTANTS } from '$lib/services/simulation-core';
import type { ShkadovConfig, ShkadovTradePoint } from './types';

// Physical constants
export const L_SUN = 3.828e26; // Solar luminosity in Watts
export const M_SUN = 1.989e30; // Solar mass in kg
export const G = 6.674e-11; // Gravitational constant in m³/(kg·s²)
export const SIGMA_SB = 5.670374419e-8; // Stefan-Boltzmann constant in W/(m²·K⁴)
export const c = CONSTANTS.SPEED_OF_LIGHT; // Speed of light in m/s
export const AU = CONSTANTS.AU_METERS; // 1 AU in meters

/**
 * Critical areal density: maximum mass per area for a statite (radiation-pressure-supported mirror).
 * Independent of distance from the Sun.
 * sigma_crit = L_sun / (4 * pi * G * M_sun * c)
 */
export const SIGMA_CRIT = L_SUN / (4 * Math.PI * G * M_SUN * c); // ~1.53 g/m² = ~0.00153 kg/m²

/**
 * Material thermal limits (melting/decomposition temperatures in Kelvin)
 */
export const MATERIAL_LIMITS: Record<string, { name: string; maxTemp: number; typicalDensity: number }> = {
	aluminum: { name: 'Aluminum thin film', maxTemp: 933, typicalDensity: 2.7 },
	kapton: { name: 'Kapton polyimide', maxTemp: 673, typicalDensity: 1.42 },
	graphene: { name: 'Graphene composite', maxTemp: 3000, typicalDensity: 0.77 },
	beryllium: { name: 'Beryllium', maxTemp: 1560, typicalDensity: 1.85 },
	silicon_carbide: { name: 'Silicon carbide', maxTemp: 2730, typicalDensity: 3.21 }
};

/**
 * Calculate the critical areal density for statite equilibrium.
 * Returns value in g/m² for display purposes.
 */
export function calculateCriticalArealDensity(): number {
	return SIGMA_CRIT * 1000; // Convert kg/m² to g/m²
}

/**
 * Calculate total mirror area for a given coverage fraction and standoff distance.
 * Area = coverageFraction * 4 * pi * d²
 */
export function calculateMirrorArea(coverageFraction: number, distanceAU: number): number {
	const d = distanceAU * AU;
	return coverageFraction * 4 * Math.PI * d * d;
}

/**
 * Calculate the thrust produced by a Shkadov mirror.
 * F = 2 * solarFlux * mirrorArea * reflectivity / c
 * where solarFlux = L_sun / (4 * pi * d²)
 */
export function calculateThrust(distanceAU: number, mirrorArea: number, reflectivity: number): number {
	const d = distanceAU * AU;
	const solarFlux = L_SUN / (4 * Math.PI * d * d);
	return (2 * solarFlux * mirrorArea * reflectivity) / c;
}

/**
 * Calculate the equilibrium temperature of the mirror via Stefan-Boltzmann law.
 * The mirror absorbs (1 - reflectivity) fraction and radiates from both sides.
 * T_eq = (solarFlux * absorptivity / (2 * sigma_SB * emissivity))^(1/4)
 * Assuming emissivity ≈ absorptivity (Kirchhoff's law)
 */
export function calculateEquilibriumTemp(distanceAU: number, reflectivity: number): number {
	const d = distanceAU * AU;
	const solarFlux = L_SUN / (4 * Math.PI * d * d);
	const absorptivity = 1 - reflectivity;
	// emissivity = absorptivity by Kirchhoff's law for thermal equilibrium
	// Factor of 2 for radiation from both sides of the mirror
	return Math.pow((solarFlux * absorptivity) / (2 * SIGMA_SB * absorptivity), 0.25);
	// Note: absorptivity cancels, leaving T_eq = (solarFlux / (2 * sigma_SB))^0.25
	// This is the maximum possible temperature at this distance
}

/**
 * Calculate mirror mass from area and areal density.
 */
export function calculateMirrorMass(mirrorArea: number, arealDensity: number): number {
	return mirrorArea * arealDensity;
}

/**
 * Calculate the reduction in solar insolation at Earth due to the mirror.
 * Approximate: the mirror intercepts coverageFraction of photons heading outward,
 * and reflects them (partially adding to inward flux). Net reduction depends on
 * geometry and reflectivity.
 */
export function calculateInsolationReduction(coverageFraction: number, reflectivity: number): number {
	// The mirror blocks coverageFraction of flux in its solid angle.
	// Reflected light goes back toward the Sun (not toward Earth), so
	// net flux reduction at Earth ≈ coverageFraction (1 + reflectivity) / 2
	// The factor of 2 accounts for the mirror only covering one hemisphere direction.
	return coverageFraction * (1 + reflectivity) / 2;
}

/**
 * Check whether the mirror is thermally feasible given its equilibrium temperature
 * and areal density. Returns true if a known material can survive.
 */
export function isThermallyFeasible(temp: number, arealDensity: number): boolean {
	// Check against known material limits
	for (const mat of Object.values(MATERIAL_LIMITS)) {
		if (temp < mat.maxTemp && arealDensity >= mat.typicalDensity * 0.001) {
			// Material can survive this temperature
			return true;
		}
	}
	// Graphene composites can handle very high temps
	if (temp < MATERIAL_LIMITS.graphene.maxTemp) {
		return true;
	}
	return false;
}

/**
 * Get a material recommendation based on the equilibrium temperature.
 */
export function getMaterialRecommendation(temp: number): string {
	if (temp < 500) return 'Kapton polyimide or aluminum thin film';
	if (temp < 673) return 'Kapton polyimide (near limit)';
	if (temp < 933) return 'Aluminum thin film';
	if (temp < 1560) return 'Beryllium or silicon carbide';
	if (temp < 2730) return 'Silicon carbide';
	if (temp < 3000) return 'Graphene composite (advanced)';
	return 'No known material (exceeds graphene limit)';
}

/**
 * Estimate cost based on mirror mass and thin-film manufacturing assumptions.
 * Uses rough $/kg scaling that decreases with scale.
 */
export function estimateCost(mirrorMass: number): number {
	// Base cost: ~$1000/kg for thin-film space structures at small scale
	// Learning curve reduces cost at larger scales
	// Very rough: cost = baseCost * mass^0.85 (sub-linear scaling)
	const baseCostPerKg = 1000;
	if (mirrorMass <= 0) return 0;
	// Sub-linear scaling: doubling mass doesn't double cost
	return baseCostPerKg * Math.pow(mirrorMass, 0.85);
}

/**
 * Calculate a complete trade point at a given standoff distance.
 */
export function calculateTradePoint(distanceAU: number, config: ShkadovConfig): ShkadovTradePoint {
	const mirrorArea = calculateMirrorArea(config.coverageFraction, distanceAU);
	const thrust = calculateThrust(distanceAU, mirrorArea, config.reflectivity);
	const equilibriumTemp = calculateEquilibriumTemp(distanceAU, config.reflectivity);
	const mirrorMass = calculateMirrorMass(mirrorArea, config.arealDensity);
	const thermallyFeasible = isThermallyFeasible(equilibriumTemp, config.arealDensity);
	const costEst = estimateCost(mirrorMass);
	const insolationReduction = calculateInsolationReduction(config.coverageFraction, config.reflectivity);

	return {
		distance: distanceAU,
		thrust,
		mirrorMass,
		equilibriumTemp,
		mirrorArea,
		isThermallyFeasible: thermallyFeasible,
		costEstimate: costEst,
		insolationReduction
	};
}
