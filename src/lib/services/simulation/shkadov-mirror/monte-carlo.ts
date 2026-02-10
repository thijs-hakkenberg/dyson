/**
 * Shkadov Mirror Trade Sweep Simulation
 *
 * Sweeps standoff distance to find optimal placement for a Shkadov mirror,
 * balancing thrust, thermal feasibility, and mass constraints.
 * Addresses research question rq-3b-1.
 */

import { AsyncRunner } from '$lib/services/simulation-core';
import type {
	ShkadovConfig,
	ShkadovResult,
	ShkadovComparisonResult,
	ShkadovProgress,
	ShkadovTradePoint
} from './types';
import {
	calculateTradePoint,
	calculateCriticalArealDensity,
	getMaterialRecommendation,
	SIGMA_CRIT
} from './shkadov-model';

/**
 * Default configuration for Shkadov mirror trade study
 */
export const DEFAULT_SHKADOV_CONFIG: ShkadovConfig = {
	standoffDistance: 1.0,
	arealDensity: 1.0,
	reflectivity: 0.95,
	coverageFraction: 0.1,
	targetThrust: 0
};

/** Distance sweep range */
const SWEEP_MIN_AU = 0.1;
const SWEEP_MAX_AU = 2.0;
const SWEEP_STEPS = 20;

/**
 * Run a trade sweep across standoff distances for a given configuration.
 * Evaluates thrust, temperature, mass, and feasibility at each distance.
 */
export async function runShkadovTradeSweep(
	config: ShkadovConfig = DEFAULT_SHKADOV_CONFIG,
	onProgress?: (progress: ShkadovProgress) => void
): Promise<ShkadovResult> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const tradePoints: ShkadovTradePoint[] = [];

	const distances: number[] = [];
	for (let i = 0; i <= SWEEP_STEPS; i++) {
		distances.push(SWEEP_MIN_AU + (SWEEP_MAX_AU - SWEEP_MIN_AU) * (i / SWEEP_STEPS));
	}

	await runner.run(
		distances.length,
		async (i) => {
			const point = calculateTradePoint(distances[i], config);
			tradePoints.push(point);
			return point;
		},
		(progress) => {
			if (onProgress) {
				onProgress({
					currentStep: progress.currentIteration,
					totalSteps: distances.length,
					percentComplete: progress.percentComplete
				});
			}
		}
	);

	// Sort by distance
	tradePoints.sort((a, b) => a.distance - b.distance);

	// Find optimal: maximum thrust among thermally feasible points
	const feasiblePoints = tradePoints.filter((p) => p.isThermallyFeasible);
	let optimalDistance = config.standoffDistance;
	let maxFeasibleThrust = 0;

	if (feasiblePoints.length > 0) {
		// Among points with equal thrust, prefer minimum mass (closest distance)
		const best = feasiblePoints.reduce((a, b) => {
			if (Math.abs(a.thrust - b.thrust) / Math.max(a.thrust, 1) < 1e-6) {
				// Equal thrust: prefer lower mass
				return a.mirrorMass < b.mirrorMass ? a : b;
			}
			return a.thrust > b.thrust ? a : b;
		});
		optimalDistance = best.distance;
		maxFeasibleThrust = best.thrust;
	} else {
		// No feasible points; pick the point with lowest temperature
		const coolest = tradePoints.reduce((a, b) =>
			a.equilibriumTemp < b.equilibriumTemp ? a : b
		);
		optimalDistance = coolest.distance;
		maxFeasibleThrust = coolest.thrust;
	}

	const optimalPoint = tradePoints.find((p) => p.distance === optimalDistance) ?? tradePoints[0];
	const criticalArealDensity = calculateCriticalArealDensity();
	const isAboveStatiteLimit = config.arealDensity > SIGMA_CRIT * 1000; // Convert to g/m² for comparison
	// Actually compare in same units: config is in kg/m², SIGMA_CRIT is in kg/m²
	const isAboveStatiteLimitKg = config.arealDensity > SIGMA_CRIT;

	return {
		tradePoints,
		optimalDistance,
		maxFeasibleThrust,
		analysis: {
			criticalArealDensity,
			isAboveStatiteLimit: isAboveStatiteLimitKg,
			materialRecommendation: getMaterialRecommendation(optimalPoint.equilibriumTemp),
			optimalMirrorArea: optimalPoint.mirrorArea,
			optimalMirrorMass: optimalPoint.mirrorMass,
			optimalTemp: optimalPoint.equilibriumTemp,
			optimalInsolationReduction: optimalPoint.insolationReduction
		},
		config,
		executionTimeMs: Date.now() - startTime
	};
}

/**
 * Run comparison of multiple Shkadov configurations
 */
export async function runShkadovComparison(
	configs: ShkadovConfig[],
	onProgress?: (progress: ShkadovProgress) => void
): Promise<ShkadovComparisonResult> {
	const results: ShkadovResult[] = [];

	for (let i = 0; i < configs.length; i++) {
		const result = await runShkadovTradeSweep(configs[i], (p) => {
			if (onProgress) {
				const basePercent = (i / configs.length) * 100;
				const stepPercent = p.percentComplete / configs.length;
				onProgress({
					currentStep: i * (SWEEP_STEPS + 1) + p.currentStep,
					totalSteps: configs.length * (SWEEP_STEPS + 1),
					percentComplete: basePercent + stepPercent
				});
			}
		});
		results.push(result);
	}

	// Find best by different criteria
	let bestThrustIndex = 0;
	let bestMassIndex = 0;
	let bestFeasibilityIndex = 0;

	for (let i = 0; i < results.length; i++) {
		if (results[i].maxFeasibleThrust > results[bestThrustIndex].maxFeasibleThrust) {
			bestThrustIndex = i;
		}
		const optimalMass = results[i].analysis.optimalMirrorMass;
		if (optimalMass < results[bestMassIndex].analysis.optimalMirrorMass) {
			bestMassIndex = i;
		}
		const feasibleCount = results[i].tradePoints.filter((p) => p.isThermallyFeasible).length;
		const bestFeasibleCount = results[bestFeasibilityIndex].tradePoints.filter(
			(p) => p.isThermallyFeasible
		).length;
		if (feasibleCount > bestFeasibleCount) {
			bestFeasibilityIndex = i;
		}
	}

	return {
		configs,
		results,
		analysis: {
			bestThrustIndex,
			bestMassIndex,
			bestFeasibilityIndex
		}
	};
}

/**
 * Generate configs at different areal densities for comparison
 */
export function generateArealDensityConfigs(base: ShkadovConfig): ShkadovConfig[] {
	const densities = [0.5, 1.0, 2.0, 5.0, 10.0];
	return densities.map((d) => ({ ...base, arealDensity: d }));
}

/**
 * Generate configs at different reflectivities for comparison
 */
export function generateReflectivityConfigs(base: ShkadovConfig): ShkadovConfig[] {
	const reflectivities = [0.90, 0.93, 0.95, 0.97, 0.99];
	return reflectivities.map((r) => ({ ...base, reflectivity: r }));
}
