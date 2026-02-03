/**
 * ISRU Economics Cost Model
 *
 * Extended cost modeling for ISRU vs Earth manufacturing comparison
 * with Monte Carlo uncertainty sampling.
 */

import {
	SeededRandom,
	learningCurveCost,
	launchCostToDeepSpace,
	type LaunchCostParams,
	type EarthManufacturingYear,
	type ISRUProductionYear
} from '$lib/services/simulation-core';

import type { ISRUEconomicsConfig, SampledParameters } from './types';

/**
 * Sample parameters with uncertainty for a Monte Carlo run
 *
 * @param config Configuration with parameter ranges
 * @param rng Seeded random number generator
 * @returns Sampled parameters
 */
export function sampleParameters(config: ISRUEconomicsConfig, rng: SeededRandom): SampledParameters {
	// Launch cost: uniform distribution between low and high
	const launchCostPerKg = rng.nextRange(config.launchCostPerKgLow, config.launchCostPerKgHigh);

	// ISRU capital cost: uniform distribution between low and high (convert B to $)
	const isruCapitalCostDollars =
		rng.nextRange(config.isruCapitalCostBLow, config.isruCapitalCostBHigh) * 1_000_000_000;

	// Learning rates: normal distribution with small variance
	// Mean is the config value, std dev is 2% of the mean
	const learningRateEarthMean = config.learningRateEarth;
	const learningRateEarthStdDev = 0.02;
	const learningRateEarth = clamp(
		rng.nextGaussian(learningRateEarthMean, learningRateEarthStdDev),
		0.75,
		0.98
	);

	const learningRateISRUMean = config.learningRateISRU;
	const learningRateISRUStdDev = 0.02;
	const learningRateISRU = clamp(
		rng.nextGaussian(learningRateISRUMean, learningRateISRUStdDev),
		0.75,
		0.98
	);

	return {
		launchCostPerKg,
		isruCapitalCostDollars,
		learningRateEarth,
		learningRateISRU
	};
}

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}

/**
 * Calculate Earth manufacturing trajectory with sampled parameters
 *
 * @param config Simulation configuration
 * @param params Sampled parameters
 * @returns Earth manufacturing trajectory
 */
export function calculateEarthTrajectoryWithUncertainty(
	config: ISRUEconomicsConfig,
	params: SampledParameters
): EarthManufacturingYear[] {
	const trajectory: EarthManufacturingYear[] = [];
	let cumulativeUnits = 0;
	let cumulativeCost = 0;
	let year = 0;

	// Create launch params from sampled cost
	const launchParams: LaunchCostParams = {
		costPerKgLEO: params.launchCostPerKg,
		deepSpaceMultiplier: 2.5, // Standard multiplier for deep space
		fixedCostPerLaunch: 10_000_000, // $10M fixed per launch
		maxPayloadKg: 100_000 // 100 tonnes max per launch
	};

	while (cumulativeUnits < config.targetDeploymentUnits) {
		year++;

		const productionRate = Math.min(
			config.earthProductionRatePerYear,
			config.targetDeploymentUnits - cumulativeUnits
		);

		// Manufacturing cost with learning curve
		let manufacturingCost = 0;
		for (let i = 0; i < productionRate; i++) {
			manufacturingCost += learningCurveCost(
				config.firstUnitManufacturingCost,
				cumulativeUnits + i + 1,
				params.learningRateEarth
			);
		}

		// Launch cost using sampled parameters
		const launchCost = launchCostToDeepSpace(productionRate * config.unitMassKg, launchParams);

		const totalCostThisYear = manufacturingCost + launchCost;
		cumulativeUnits += productionRate;
		cumulativeCost += totalCostThisYear;

		trajectory.push({
			year,
			productionRate,
			cumulativeUnits,
			manufacturingCost,
			launchCost,
			totalCostThisYear,
			cumulativeCost,
			avgCostPerUnit: cumulativeCost / cumulativeUnits
		});
	}

	return trajectory;
}

/**
 * Calculate ISRU production trajectory with sampled parameters
 *
 * @param config Simulation configuration
 * @param params Sampled parameters
 * @returns ISRU production trajectory
 */
export function calculateISRUTrajectoryWithUncertainty(
	config: ISRUEconomicsConfig,
	params: SampledParameters
): ISRUProductionYear[] {
	const trajectory: ISRUProductionYear[] = [];
	let cumulativeUnits = 0;
	let cumulativeCost = params.isruCapitalCostDollars; // Start with capital cost
	let year = 0;

	while (cumulativeUnits < config.targetDeploymentUnits) {
		year++;

		// Production rate ramps up over rampUpYears
		const rampFactor = Math.min(1, year / config.isruRampUpYears);
		const productionRate = Math.min(
			Math.floor(config.isruMaxProductionRate * rampFactor),
			config.targetDeploymentUnits - cumulativeUnits
		);

		// Skip year if no production (early ramp-up)
		if (productionRate === 0) {
			trajectory.push({
				year,
				productionRate: 0,
				cumulativeUnits,
				costThisYear: 0,
				cumulativeCost,
				avgCostPerUnit: cumulativeUnits > 0 ? cumulativeCost / cumulativeUnits : Infinity
			});
			continue;
		}

		// Calculate cost for this year's production with learning curve
		let yearCost = 0;
		for (let i = 0; i < productionRate; i++) {
			yearCost += learningCurveCost(
				config.isruOperationalCostPerUnit,
				cumulativeUnits + i + 1,
				params.learningRateISRU
			);
		}

		cumulativeUnits += productionRate;
		cumulativeCost += yearCost;

		trajectory.push({
			year,
			productionRate,
			cumulativeUnits,
			costThisYear: yearCost,
			cumulativeCost,
			avgCostPerUnit: cumulativeCost / cumulativeUnits
		});
	}

	return trajectory;
}

/**
 * Find crossover point between Earth and ISRU trajectories
 * Returns the unit count where ISRU cumulative cost becomes cheaper
 *
 * @param earthTrajectory Earth manufacturing trajectory
 * @param isruTrajectory ISRU production trajectory
 * @returns Crossover unit count and year, or null if ISRU never cheaper
 */
export function findCrossoverPointDetailed(
	earthTrajectory: EarthManufacturingYear[],
	isruTrajectory: ISRUProductionYear[]
): { unitCount: number; year: number } | null {
	// Build maps from cumulative units to cost for easier comparison
	const earthCostByUnits = new Map<number, { cost: number; year: number }>();
	const isruCostByUnits = new Map<number, { cost: number; year: number }>();

	for (const year of earthTrajectory) {
		earthCostByUnits.set(year.cumulativeUnits, {
			cost: year.cumulativeCost,
			year: year.year
		});
	}

	for (const year of isruTrajectory) {
		isruCostByUnits.set(year.cumulativeUnits, {
			cost: year.cumulativeCost,
			year: year.year
		});
	}

	// Find common unit counts and check for crossover
	const allUnitCounts = new Set([...earthCostByUnits.keys(), ...isruCostByUnits.keys()]);
	const sortedCounts = Array.from(allUnitCounts).sort((a, b) => a - b);

	for (const units of sortedCounts) {
		if (units === 0) continue;

		// Get costs at this unit count (interpolate if needed)
		const earthData = getClosestCost(earthTrajectory, units);
		const isruData = getClosestCost(isruTrajectory, units);

		if (earthData && isruData && isruData.cost < earthData.cost) {
			return {
				unitCount: units,
				year: Math.max(earthData.year, isruData.year)
			};
		}
	}

	return null;
}

/**
 * Get the cost at or closest to a given unit count
 */
function getClosestCost(
	trajectory: (EarthManufacturingYear | ISRUProductionYear)[],
	targetUnits: number
): { cost: number; year: number } | null {
	// Find the entry with cumulativeUnits >= targetUnits
	for (const entry of trajectory) {
		if (entry.cumulativeUnits >= targetUnits) {
			return {
				cost: entry.cumulativeCost,
				year: entry.year
			};
		}
	}

	// If target is beyond trajectory, use last entry
	if (trajectory.length > 0) {
		const last = trajectory[trajectory.length - 1];
		return {
			cost: last.cumulativeCost,
			year: last.year
		};
	}

	return null;
}

/**
 * Calculate break-even analysis metrics
 *
 * @param earthTrajectory Earth manufacturing trajectory
 * @param isruTrajectory ISRU production trajectory
 * @param discountRate Annual discount rate for NPV calculation
 * @returns Break-even analysis metrics
 */
export function calculateBreakEvenMetrics(
	earthTrajectory: EarthManufacturingYear[],
	isruTrajectory: ISRUProductionYear[],
	discountRate: number = 0.05
): {
	npvEarth: number;
	npvISRU: number;
	paybackYear: number | null;
	roi: number;
} {
	// Calculate NPV for both trajectories
	const earthCashFlows = earthTrajectory.map((y) => -y.totalCostThisYear);
	const isruCashFlows = isruTrajectory.map((y) => -y.costThisYear);

	// Include capital cost in year 0 for ISRU
	if (isruTrajectory.length > 0) {
		const capitalCost = isruTrajectory[0].cumulativeCost - isruTrajectory[0].costThisYear;
		isruCashFlows.unshift(-capitalCost);
	}

	const npvEarth = calculateNPV(earthCashFlows, discountRate);
	const npvISRU = calculateNPV(isruCashFlows, discountRate);

	// Find payback year (when ISRU cumulative cost falls below Earth cumulative cost)
	let paybackYear: number | null = null;
	for (let i = 0; i < Math.min(earthTrajectory.length, isruTrajectory.length); i++) {
		if (isruTrajectory[i].cumulativeCost < earthTrajectory[i].cumulativeCost) {
			paybackYear = earthTrajectory[i].year;
			break;
		}
	}

	// ROI: savings relative to ISRU investment
	const totalEarthCost =
		earthTrajectory.length > 0 ? earthTrajectory[earthTrajectory.length - 1].cumulativeCost : 0;
	const totalISRUCost =
		isruTrajectory.length > 0 ? isruTrajectory[isruTrajectory.length - 1].cumulativeCost : 0;
	const capitalCost =
		isruTrajectory.length > 0
			? isruTrajectory[0].cumulativeCost - isruTrajectory[0].costThisYear
			: 0;

	const savings = totalEarthCost - totalISRUCost;
	const roi = capitalCost > 0 ? savings / capitalCost : 0;

	return {
		npvEarth,
		npvISRU,
		paybackYear,
		roi
	};
}

/**
 * Calculate Net Present Value
 */
function calculateNPV(cashFlows: number[], discountRate: number): number {
	return cashFlows.reduce((npv, cf, year) => {
		return npv + cf / Math.pow(1 + discountRate, year);
	}, 0);
}

/**
 * Calculate marginal cost at a given unit count
 *
 * @param trajectory Production trajectory
 * @param unitCount Unit number to calculate marginal cost for
 * @returns Marginal cost (cost of the nth unit)
 */
export function getMarginalCost(
	trajectory: (EarthManufacturingYear | ISRUProductionYear)[],
	unitCount: number
): number {
	// Find the year that includes this unit
	for (const entry of trajectory) {
		if (entry.cumulativeUnits >= unitCount) {
			return entry.avgCostPerUnit;
		}
	}

	return Infinity;
}

/**
 * Calculate scale economy metrics
 *
 * @param trajectory Production trajectory
 * @returns Scale economy analysis
 */
export function analyzeScaleEconomies(trajectory: (EarthManufacturingYear | ISRUProductionYear)[]): {
	costAt100Units: number;
	costAt1000Units: number;
	costAt10000Units: number;
	scaleFactorTo1000: number;
	scaleFactorTo10000: number;
} {
	const getCostAtUnits = (target: number): number => {
		for (const entry of trajectory) {
			if (entry.cumulativeUnits >= target) {
				return entry.avgCostPerUnit;
			}
		}
		return trajectory.length > 0 ? trajectory[trajectory.length - 1].avgCostPerUnit : Infinity;
	};

	const costAt100 = getCostAtUnits(100);
	const costAt1000 = getCostAtUnits(1000);
	const costAt10000 = getCostAtUnits(10000);

	return {
		costAt100Units: costAt100,
		costAt1000Units: costAt1000,
		costAt10000Units: costAt10000,
		scaleFactorTo1000: costAt100 > 0 ? costAt1000 / costAt100 : 1,
		scaleFactorTo10000: costAt100 > 0 ? costAt10000 / costAt100 : 1
	};
}
