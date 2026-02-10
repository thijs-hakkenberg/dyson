/**
 * Solar Mass Extraction Monte Carlo Simulation
 *
 * Sweeps extraction rate to find optimal operating point and runs
 * Monte Carlo iterations with stochastic efficiency and solar activity variation.
 * Addresses research question rq-3b-2.
 */

import { SeededRandom, AsyncRunner } from '$lib/services/simulation-core';
import type {
	ExtractionConfig,
	ExtractionPoint,
	ExtractionRunResult,
	ExtractionResult,
	ExtractionComparisonResult,
	ExtractionProgress,
	ResponseSurfaceData,
	SolarActivityLevel
} from './types';
import {
	analyzeExtractionPoint,
	classifyRisk,
	calculateLuminosityPerturbation,
	calculateStabilityMargin,
	calculateEnergyBudget,
	loadResponseSurfaces,
	L_SUN
} from './extraction-model';

/**
 * Default extraction configuration
 */
export const DEFAULT_EXTRACTION_CONFIG: ExtractionConfig = {
	extractionRate: 1e11,
	stationCount: 1000,
	beamPower: 1e20,
	liftingEfficiency: 0.05,
	solarActivity: 'moderate',
	missionDuration: 1000,
	iterations: 200
};

/** Sweep parameters */
const SWEEP_MIN_RATE = 1e9;
const SWEEP_MAX_RATE = 1e13;
const SWEEP_STEPS = 30;

/**
 * Generate log-spaced extraction rates for sweep
 */
function generateSweepRates(): number[] {
	const rates: number[] = [];
	const logMin = Math.log10(SWEEP_MIN_RATE);
	const logMax = Math.log10(SWEEP_MAX_RATE);
	for (let i = 0; i <= SWEEP_STEPS; i++) {
		const logVal = logMin + (logMax - logMin) * (i / SWEEP_STEPS);
		rates.push(Math.pow(10, logVal));
	}
	return rates;
}

/**
 * Run a single Monte Carlo extraction iteration.
 * Applies stochastic variation to efficiency and solar conditions.
 */
export function runSingleExtractionRun(
	config: ExtractionConfig,
	rng: SeededRandom,
	surfaces?: ResponseSurfaceData | null
): ExtractionRunResult {
	const sweepRates = generateSweepRates();
	const sweepPoints: ExtractionPoint[] = [];

	// Stochastic variation: efficiency varies +/-30%
	const efficiencyMultiplier = 1 + (rng.next() - 0.5) * 0.6;
	// Solar activity variation: density fluctuation
	const activityMultiplier = 1 + (rng.next() - 0.5) * 0.4;

	let maxFeasibleRate = 0;
	let optimalRate = 0;
	let bestStabilityAtFeasible = 0;

	for (const rate of sweepRates) {
		const iterConfig: ExtractionConfig = {
			...config,
			extractionRate: rate,
			liftingEfficiency: Math.max(
				0.005,
				Math.min(0.15, config.liftingEfficiency * efficiencyMultiplier)
			)
		};

		const point = analyzeExtractionPoint(iterConfig, surfaces);

		// Apply activity variation to stability margin
		// Use the energy budget (which scales with extraction rate) instead of fixed station power
		const adjustedPower = point.energyBudget * activityMultiplier;
		point.stabilityMargin = calculateStabilityMargin(adjustedPower);

		sweepPoints.push(point);

		if (point.feasible) {
			if (rate > maxFeasibleRate) {
				maxFeasibleRate = rate;
			}
			if (point.stabilityMargin > bestStabilityAtFeasible) {
				bestStabilityAtFeasible = point.stabilityMargin;
				optimalRate = rate;
			}
		}
	}

	// Total mass extracted at configured rate over mission duration
	const durationSeconds = config.missionDuration * 3.156e7;
	const totalMassExtracted = config.extractionRate * durationSeconds;

	return {
		sweepPoints,
		optimalRate,
		maxFeasibleRate,
		totalMassExtracted
	};
}

/**
 * Run full Monte Carlo extraction simulation.
 */
export async function runExtractionMonteCarlo(
	config: ExtractionConfig = DEFAULT_EXTRACTION_CONFIG,
	onProgress?: (progress: ExtractionProgress) => void
): Promise<ExtractionResult> {
	const startTime = Date.now();
	const runner = new AsyncRunner();

	// Attempt to load pre-computed response surfaces
	let surfaces: ResponseSurfaceData | null = null;
	try {
		surfaces = await loadResponseSurfaces();
	} catch {
		// Proceed without surfaces
	}

	const allRuns: ExtractionRunResult[] = [];
	const iterations = config.iterations;

	await runner.run(
		iterations,
		async (i) => {
			const rng = new SeededRandom((config.seed ?? 42) + i);
			const run = runSingleExtractionRun(config, rng, surfaces);
			allRuns.push(run);
			return run;
		},
		(progress) => {
			if (onProgress) {
				onProgress({
					currentStep: progress.currentIteration,
					totalSteps: iterations,
					percentComplete: progress.percentComplete
				});
			}
		}
	);

	// Aggregate results
	const optimalRates = allRuns.map((r) => r.optimalRate).filter((r) => r > 0);
	const maxFeasibleRates = allRuns.map((r) => r.maxFeasibleRate).filter((r) => r > 0);
	const totalMasses = allRuns.map((r) => r.totalMassExtracted);

	// Mean sweep points (average across runs)
	const sweepRates = generateSweepRates();
	const meanSweepPoints: ExtractionPoint[] = sweepRates.map((rate, idx) => {
		const pointsAtIdx = allRuns.map((r) => r.sweepPoints[idx]).filter(Boolean);
		if (pointsAtIdx.length === 0) {
			return {
				extractionRate: rate,
				efficiency: 0,
				plumeVelocity: 0,
				stabilityMargin: 1,
				luminosityPerturbation: 0,
				energyBudget: 0,
				stationsRequired: 0,
				feasible: false
			};
		}
		const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
		return {
			extractionRate: rate,
			efficiency: avg(pointsAtIdx.map((p) => p.efficiency)),
			plumeVelocity: avg(pointsAtIdx.map((p) => p.plumeVelocity)),
			stabilityMargin: avg(pointsAtIdx.map((p) => p.stabilityMargin)),
			luminosityPerturbation: avg(pointsAtIdx.map((p) => p.luminosityPerturbation)),
			energyBudget: avg(pointsAtIdx.map((p) => p.energyBudget)),
			stationsRequired: Math.ceil(avg(pointsAtIdx.map((p) => p.stationsRequired))),
			feasible: pointsAtIdx.filter((p) => p.feasible).length > pointsAtIdx.length / 2
		};
	});

	// Compute statistics at the configured extraction rate
	const configPoints = allRuns.map((r) => {
		// Find closest sweep point to configured rate
		let closest = r.sweepPoints[0];
		let minDist = Infinity;
		for (const p of r.sweepPoints) {
			const dist = Math.abs(Math.log10(p.extractionRate) - Math.log10(config.extractionRate));
			if (dist < minDist) {
				minDist = dist;
				closest = p;
			}
		}
		return closest;
	});

	const stabilityMargins = configPoints.map((p) => p.stabilityMargin);
	const lumPerturbations = configPoints.map((p) => p.luminosityPerturbation);
	const energyBudgets = configPoints.map((p) => p.energyBudget);

	const sortedAndCI = (values: number[]) => {
		if (values.length === 0) return { mean: 0, low: 0, high: 0 };
		const sorted = [...values].sort((a, b) => a - b);
		const mean = sorted.reduce((a, b) => a + b, 0) / sorted.length;
		const lowIdx = Math.floor(sorted.length * 0.05);
		const highIdx = Math.floor(sorted.length * 0.95);
		return { mean, low: sorted[lowIdx], high: sorted[highIdx] };
	};

	const meanStabilityMargin = sortedAndCI(stabilityMargins);
	const riskLevel = classifyRisk(meanStabilityMargin.mean);

	return {
		meanSweepPoints,
		optimalRate: sortedAndCI(optimalRates),
		maxFeasibleRate: sortedAndCI(maxFeasibleRates),
		totalMassExtracted: sortedAndCI(totalMasses),
		stabilityMargin: meanStabilityMargin,
		luminosityPerturbation: sortedAndCI(lumPerturbations),
		energyBudget: sortedAndCI(energyBudgets),
		riskLevel,
		usedResponseSurfaces: surfaces !== null,
		iterations,
		config,
		executionTimeMs: Date.now() - startTime
	};
}

/**
 * Run comparison of multiple extraction configurations
 */
export async function runExtractionComparison(
	configs: ExtractionConfig[],
	onProgress?: (progress: ExtractionProgress) => void
): Promise<ExtractionComparisonResult> {
	const results: ExtractionResult[] = [];

	for (let i = 0; i < configs.length; i++) {
		const result = await runExtractionMonteCarlo(configs[i], (p) => {
			if (onProgress) {
				const basePercent = (i / configs.length) * 100;
				const stepPercent = p.percentComplete / configs.length;
				onProgress({
					currentStep: i * configs[i].iterations + p.currentStep,
					totalSteps: configs.length * configs[i].iterations,
					percentComplete: basePercent + stepPercent
				});
			}
		});
		results.push(result);
	}

	// Find best configs
	let bestFeasibleIndex = 0;
	let bestMassIndex = 0;

	for (let i = 0; i < results.length; i++) {
		if (results[i].maxFeasibleRate.mean > results[bestFeasibleIndex].maxFeasibleRate.mean) {
			bestFeasibleIndex = i;
		}
		if (results[i].totalMassExtracted.mean > results[bestMassIndex].totalMassExtracted.mean) {
			bestMassIndex = i;
		}
	}

	return {
		configs,
		results,
		bestFeasibleIndex,
		bestMassIndex
	};
}

/**
 * Generate configs across solar activity levels
 */
export function generateActivityConfigs(base: ExtractionConfig): ExtractionConfig[] {
	const activities: SolarActivityLevel[] = ['minimum', 'moderate', 'maximum'];
	return activities.map((a) => ({ ...base, solarActivity: a }));
}

/**
 * Generate configs across lifting efficiencies
 */
export function generateEfficiencyConfigs(base: ExtractionConfig): ExtractionConfig[] {
	const efficiencies = [0.01, 0.03, 0.05, 0.08, 0.10];
	return efficiencies.map((e) => ({ ...base, liftingEfficiency: e }));
}
