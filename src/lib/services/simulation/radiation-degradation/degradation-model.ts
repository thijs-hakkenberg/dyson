/**
 * PV Degradation Physics Model
 *
 * Models radiation damage, SPE events, thermal cycling, and shielding effects
 * for thin-film PV cells in the near-Sun environment (0.3-1.0 AU).
 *
 * Key physics:
 * - Solar proton flux scales as ~1/r^2.3 (more aggressive than pure inverse square)
 * - Shielding provides exponential attenuation with ~10 g/m^2 half-value thickness
 * - Different PV technologies have varying radiation tolerance and annealing behavior
 * - Thermal cycling at closer distances causes additional fatigue damage
 */

import { SeededRandom } from '$lib/services/simulation-core';
import type { PVTechnology, PowerCurvePoint, RadiationDegradationConfig } from './types';

/**
 * Technology-specific degradation coefficients
 *
 * Based on terrestrial and space testing data, extrapolated for near-Sun conditions.
 * References:
 * - Perovskite: Highly efficient but radiation-sensitive, self-annealing capability
 * - CdTe: Good radiation tolerance, moderate thermal sensitivity
 * - III-V: Most radiation resistant, highest cost and efficiency
 * - Silicon: Reference baseline, widely characterized
 * - Hybrid: Tandem cells combining technologies for balanced performance
 *
 * Note: Base rates are calibrated for ~0.5-1% annual degradation at 1 AU with
 * typical shielding. At 0.5 AU, expect ~2-4x higher degradation rates.
 */
export const TECHNOLOGY_COEFFICIENTS: Record<
	PVTechnology,
	{
		/** Base degradation rate at 1 AU (%/year) */
		baseRate: number;
		/** Multiplier for proton-induced damage (lower = more resistant) */
		radiationSensitivity: number;
		/** Multiplier for thermal cycling damage (lower = more resistant) */
		thermalSensitivity: number;
		/** Partial self-healing rate from annealing */
		annealingRate: number;
		/** Typical maximum efficiency (%) */
		maxEfficiency: number;
	}
> = {
	perovskite: {
		baseRate: 0.8,
		radiationSensitivity: 1.5,
		thermalSensitivity: 1.5,
		annealingRate: 0.15,
		maxEfficiency: 26
	},
	cdte: {
		baseRate: 0.3,
		radiationSensitivity: 0.8,
		thermalSensitivity: 0.6,
		annealingRate: 0.02,
		maxEfficiency: 22
	},
	'iii-v': {
		baseRate: 0.2,
		radiationSensitivity: 0.5,
		thermalSensitivity: 0.4,
		annealingRate: 0.01,
		maxEfficiency: 35
	},
	silicon: {
		baseRate: 0.4,
		radiationSensitivity: 1.0,
		thermalSensitivity: 0.8,
		annealingRate: 0.0,
		maxEfficiency: 26
	},
	hybrid: {
		baseRate: 0.4,
		radiationSensitivity: 0.7,
		thermalSensitivity: 0.6,
		annealingRate: 0.05,
		maxEfficiency: 30
	}
};

/**
 * Solar constant at 1 AU in W/m^2
 */
const SOLAR_CONSTANT = 1361;

/**
 * Half-value thickness for shielding in g/m^2
 * Based on typical spacecraft shielding effectiveness against solar protons
 */
const SHIELDING_HALF_VALUE_THICKNESS = 10;

/**
 * Radiation intensity power law exponent
 * Solar proton flux scales roughly as r^-2.3 due to acceleration in solar wind
 */
const RADIATION_POWER_LAW = 2.3;

/**
 * Calculate solar flux at a given orbital distance
 *
 * @param distanceAU - Distance from Sun in AU
 * @returns Solar flux in W/m^2
 */
export function solarFluxAtDistance(distanceAU: number): number {
	return SOLAR_CONSTANT / (distanceAU * distanceAU);
}

/**
 * Calculate radiation intensity factor relative to 1 AU
 *
 * Solar proton flux scales more aggressively than pure inverse square
 * due to acceleration and focusing effects in the solar wind.
 *
 * @param distanceAU - Distance from Sun in AU
 * @returns Radiation intensity factor (1.0 at 1 AU)
 */
export function radiationIntensityFactor(distanceAU: number): number {
	return 1 / Math.pow(distanceAU, RADIATION_POWER_LAW);
}

/**
 * Calculate shielding attenuation factor
 *
 * Models exponential attenuation of radiation through shielding material.
 * ~50% reduction per 10 g/m^2 of typical spacecraft shielding.
 *
 * @param shieldingMass - Shielding mass in g/m^2
 * @returns Attenuation factor (1.0 = no shielding, 0.5 at 10 g/m^2)
 */
export function shieldingFactor(shieldingMass: number): number {
	return Math.exp((-0.693 * shieldingMass) / SHIELDING_HALF_VALUE_THICKNESS);
}

/**
 * Calculate annual degradation for a given configuration and current state
 *
 * Combines multiple degradation mechanisms:
 * 1. Base radiation damage scaled by distance and technology
 * 2. Solar proton event (SPE) damage with Poisson-distributed events
 * 3. Thermal cycling fatigue (if enabled)
 * 4. Annealing (partial recovery for some technologies)
 *
 * @param config - Simulation configuration
 * @param year - Current mission year
 * @param currentEfficiency - Current PV efficiency (%)
 * @param rng - Seeded random number generator
 * @returns Efficiency loss for this year (%)
 */
export function calculateAnnualDegradation(
	config: RadiationDegradationConfig,
	year: number,
	currentEfficiency: number,
	rng: SeededRandom
): number {
	const tech = TECHNOLOGY_COEFFICIENTS[config.pvTechnology];

	// Base degradation scaled by distance and shielding
	const radiationFactor = radiationIntensityFactor(config.orbitalDistance);
	const shielding = shieldingFactor(config.shieldingMass);
	const baseDegradation = tech.baseRate * radiationFactor * shielding * tech.radiationSensitivity;

	// SPE damage (Poisson-distributed events with random magnitude)
	// Each SPE causes ~0.05% efficiency loss before shielding (reduced from literature)
	const speVariation = rng.nextRange(0.5, 1.5);
	const expectedSPEs = config.solarProtonEventRate * speVariation;
	const speDamage = expectedSPEs * 0.05 * tech.radiationSensitivity * shielding;

	// Thermal cycling fatigue (if enabled)
	let thermalDamage = 0;
	if (config.temperatureCycling) {
		// Thermal cycling damage scales with orbital cycles
		// At 0.5 AU, orbital period ~0.35 years = ~2.8 orbits/year
		const orbitalPeriod = Math.sqrt(Math.pow(config.orbitalDistance, 3)); // years
		const cyclesPerYear = 1 / orbitalPeriod;
		// Small per-cycle damage that accumulates
		thermalDamage = cyclesPerYear * 0.02 * tech.thermalSensitivity;
	}

	// Annealing (partial recovery)
	// More effective when efficiency has dropped significantly
	const degradationFraction = 1 - currentEfficiency / config.initialEfficiency;
	const annealing = tech.annealingRate * degradationFraction * config.initialEfficiency * 0.1;

	// Add random variation (Gaussian with 20% coefficient of variation)
	const variation = Math.max(0.5, rng.nextGaussian(1.0, 0.2));

	// Total degradation (clamped to non-negative)
	const totalDegradation = (baseDegradation + speDamage + thermalDamage - annealing) * variation;

	return Math.max(0, totalDegradation);
}

/**
 * Simulate the complete degradation curve for a mission
 *
 * @param config - Simulation configuration
 * @param rng - Seeded random number generator
 * @returns Array of power curve points from year 0 to mission duration
 */
export function simulateDegradationCurve(
	config: RadiationDegradationConfig,
	rng: SeededRandom
): PowerCurvePoint[] {
	const solarFlux = solarFluxAtDistance(config.orbitalDistance);
	let efficiency = config.initialEfficiency;

	const curve: PowerCurvePoint[] = [
		{
			year: 0,
			efficiency,
			power: solarFlux * (efficiency / 100)
		}
	];

	for (let year = 1; year <= config.missionDuration; year++) {
		const degradation = calculateAnnualDegradation(config, year, efficiency, rng);
		efficiency = Math.max(0, efficiency - degradation);

		curve.push({
			year,
			efficiency,
			power: solarFlux * (efficiency / 100)
		});
	}

	return curve;
}

/**
 * Find the half-life year (when efficiency drops to 50% of initial)
 *
 * Uses linear interpolation between yearly points for sub-year precision.
 *
 * @param curve - Power curve from simulation
 * @param initialEfficiency - Initial efficiency to calculate half of
 * @returns Year when efficiency reaches half of initial (may exceed mission duration)
 */
export function findHalfLifeYear(curve: PowerCurvePoint[], initialEfficiency: number): number {
	const halfEfficiency = initialEfficiency / 2;

	for (let i = 0; i < curve.length; i++) {
		if (curve[i].efficiency <= halfEfficiency) {
			// Linear interpolation to find exact crossing point
			if (i === 0) return 0;

			const prev = curve[i - 1];
			const curr = curve[i];
			const efficiencyDrop = prev.efficiency - curr.efficiency;

			if (efficiencyDrop === 0) return prev.year;

			const t = (prev.efficiency - halfEfficiency) / efficiencyDrop;
			return prev.year + t * (curr.year - prev.year);
		}
	}

	// Half-life not reached during mission - return last year
	return curve[curve.length - 1].year;
}
