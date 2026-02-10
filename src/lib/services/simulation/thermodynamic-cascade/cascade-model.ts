/**
 * Thermodynamic Cascade Physics Model
 *
 * Models energy flow through nested Matrioshka brain shells.
 * Each shell operates as a heat engine between its hot side (waste heat
 * from the inner shell) and its cold side (radiating to the next shell).
 *
 * Key physics:
 * - Shell temperatures are log-spaced between T_inner and T_outer
 * - Each shell extracts power via Carnot-limited TPV conversion
 * - Waste heat cascades outward, feeding the next shell
 * - Radiator area scales as P_waste / (sigma * T^4), growing enormously for cold shells
 *
 * Addresses research question:
 * - RQ-3a-1: Thermodynamic cascade efficiency limits
 */

import type { CascadeConfig, ShellData, CascadeRunResult } from './types';

/**
 * Stefan-Boltzmann constant (W m^-2 K^-4)
 */
export const SIGMA_SB = 5.670374419e-8;

/**
 * Solar luminosity (W)
 */
export const L_SUN = 3.828e26;

/**
 * Calculate log-spaced shell temperatures
 *
 * T[i] = T_inner * (T_outer/T_inner)^(i/(N-1))
 * This produces a geometric progression from T_inner down to T_outer.
 */
export function calculateShellTemperatures(
	shellCount: number,
	innerTemp: number,
	outerTemp: number
): number[] {
	if (shellCount < 2) return [innerTemp, outerTemp];

	const temps: number[] = [];
	const ratio = outerTemp / innerTemp;

	for (let i = 0; i < shellCount; i++) {
		temps.push(innerTemp * Math.pow(ratio, i / (shellCount - 1)));
	}

	return temps;
}

/**
 * Calculate Carnot efficiency between hot and cold reservoirs
 *
 * eta_carnot = 1 - T_cold / T_hot
 */
export function calculateCarnotEfficiency(tHot: number, tCold: number): number {
	if (tHot <= 0 || tCold <= 0 || tCold >= tHot) return 0;
	return 1 - tCold / tHot;
}

/**
 * Calculate actual power extracted by a shell
 *
 * P_extract = P_in * carnot_eff * tpv_eff * spectral_sel
 */
export function calculateShellExtraction(
	powerIn: number,
	carnotEfficiency: number,
	tpvEfficiency: number,
	spectralSelectivity: number
): number {
	const actualEfficiency = carnotEfficiency * tpvEfficiency * spectralSelectivity;
	return powerIn * actualEfficiency;
}

/**
 * Calculate radiator area needed to reject waste heat
 *
 * A = P_waste / (sigma * T_cold^4)
 *
 * Note: This grows enormously for cold shells due to T^4 dependence.
 */
export function calculateRadiatorArea(powerWaste: number, tCold: number): number {
	if (tCold <= 0 || powerWaste <= 0) return 0;
	return powerWaste / (SIGMA_SB * Math.pow(tCold, 4));
}

/**
 * Simulate a complete thermodynamic cascade through all shells
 *
 * Energy flows from the star through nested shells. Each shell:
 * 1. Receives power from the inner shell's waste heat
 * 2. Extracts useful work via Carnot-limited TPV conversion
 * 3. Passes remaining waste heat to the next shell
 */
export function simulateCascade(config: CascadeConfig): CascadeRunResult {
	const temperatures = calculateShellTemperatures(
		config.shellCount,
		config.innerTemp,
		config.outerTemp
	);

	const shells: ShellData[] = [];
	let currentPowerIn = config.solarInputPower;
	let totalExtracted = 0;
	let totalRadiatorArea = 0;
	let viableShellCount = 0;

	// Each shell operates between T[i] (hot) and T[i+1] (cold)
	// So we have shellCount-1 actual heat engine stages
	const stageCount = temperatures.length - 1;

	for (let i = 0; i < stageCount; i++) {
		const tHot = temperatures[i];
		const tCold = temperatures[i + 1];

		const carnotEff = calculateCarnotEfficiency(tHot, tCold);
		const actualEff = carnotEff * config.tpvEfficiency * config.spectralSelectivity;
		const powerExtracted = currentPowerIn * actualEff;
		const powerWaste = currentPowerIn - powerExtracted;
		const radiatorArea = calculateRadiatorArea(powerWaste, tCold);
		const isViable = powerExtracted >= config.minUsefulPower;

		if (isViable) {
			viableShellCount++;
		}

		shells.push({
			index: i,
			tempHot: tHot,
			tempCold: tCold,
			carnotEfficiency: carnotEff,
			actualEfficiency: actualEff,
			powerIn: currentPowerIn,
			powerExtracted,
			powerWaste,
			radiatorArea,
			isViable
		});

		totalExtracted += powerExtracted;
		totalRadiatorArea += radiatorArea;

		// Waste heat feeds the next shell
		currentPowerIn = powerWaste;
	}

	return {
		shells,
		totalExtracted,
		totalEfficiency: totalExtracted / config.solarInputPower,
		viableShellCount,
		totalRadiatorArea
	};
}
