/**
 * Monte Carlo Simulation Engine
 *
 * Core simulation loop that runs multiple iterations to determine
 * constellation coverage statistics with confidence intervals.
 */

import type {
	SimulationConfig,
	SimulationRun,
	YearlyStats,
	ConstellationResult,
	SimulationOutput,
	SimulationAnalysis,
	SimulationProgress,
	Satellite,
	NEA
} from './simulation-types';

import { generateNEAPopulation, sortByMiningValue } from './nea-population';
import { createSatellite, getPropulsionSpecs } from './orbital-mechanics';
import { calculateCoverage, calculateAvgDeltaVUsed, type CoverageResult } from './coverage-calculator';
import { applyAnnualFailures, getOperationalCount } from './reliability-model';

/**
 * Default simulation configuration
 */
export const DEFAULT_CONFIG: SimulationConfig = {
	constellationSize: 50,
	missionDuration: 7,
	annualFailureRate: 0.03,
	propulsionType: 'electric',
	monteCarloRuns: 500,
	neaPopulationSize: 2000
};

/**
 * Constellation sizes to simulate
 */
export const CONSTELLATION_SIZES = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

/**
 * Create initial constellation of satellites
 */
function createConstellation(size: number, config: SimulationConfig): Satellite[] {
	const satellites: Satellite[] = [];
	for (let i = 0; i < size; i++) {
		satellites.push(createSatellite(`SAT-${String(i + 1).padStart(3, '0')}`, config.propulsionType));
	}
	return satellites;
}

/**
 * Seeded random number generator for reproducibility
 */
function createRNG(seed: number) {
	let state = seed;
	return () => {
		state = (state * 1664525 + 1013904223) % 4294967296;
		return state / 4294967296;
	};
}

/**
 * Run a single simulation
 */
function runSimulation(
	constellationSize: number,
	config: SimulationConfig,
	runId: number,
	seed: number
): SimulationRun {
	const rng = createRNG(seed);

	// Generate NEA population for this run
	const neas = generateNEAPopulation(config.neaPopulationSize, seed);
	const highValueThreshold = 0.5;
	const totalHighValue = neas.filter(n => n.miningValue >= highValueThreshold).length;

	// Initialize constellation
	let satellites = createConstellation(constellationSize, config);

	// Track yearly stats
	const yearlyStats: YearlyStats[] = [];
	let totalSurveyed = 0;
	let surveyedHighValue = 0;
	const surveyedIds = new Set<string>();

	// Simulate each year
	for (let year = 1; year <= config.missionDuration; year++) {
		// Apply failures for this year
		const failureResult = applyAnnualFailures(satellites, config.annualFailureRate, rng);
		satellites = failureResult.satellites;

		// Get operational satellites
		const operational = satellites.filter(s => s.status === 'operational');

		// Calculate which NEAs haven't been surveyed yet
		const unsurveyed = neas.filter(n => !surveyedIds.has(n.id));

		// Calculate coverage for this year
		const coverage = calculateCoverage(
			unsurveyed,
			operational,
			config.propulsionType,
			highValueThreshold
		);

		// Track newly surveyed NEAs
		for (const nea of coverage.surveyedNEAs) {
			surveyedIds.add(nea.id);
		}

		const newSurveys = coverage.surveyedNEAs.length;
		totalSurveyed += newSurveys;
		surveyedHighValue += coverage.highValueSurveyed.length;

		yearlyStats.push({
			year,
			operationalSatellites: getOperationalCount(satellites),
			newSurveysThisYear: newSurveys,
			cumulativeSurveys: surveyedIds.size,
			failuresThisYear: failureResult.failures
		});
	}

	// Final coverage calculation
	const finalCoverage = (surveyedIds.size / neas.length) * 100;
	const finalHighValueCoverage = totalHighValue > 0
		? (surveyedHighValue / totalHighValue) * 100
		: 0;

	// Calculate average delta-V used
	const avgDeltaVUsed = satellites.reduce((sum, s) => sum + (s.maxDeltaV - s.deltaVBudget), 0) / satellites.length;

	return {
		runId,
		constellationSize,
		totalNEAs: neas.length,
		highValueNEAs: totalHighValue,
		surveyedNEAs: surveyedIds.size,
		surveyedHighValueNEAs: surveyedHighValue,
		coveragePercent: finalCoverage,
		highValueCoveragePercent: finalHighValueCoverage,
		satelliteFailures: satellites.filter(s => s.status === 'failed').length,
		avgDeltaVUsed,
		yearlyStats
	};
}

/**
 * Calculate statistics from simulation runs
 */
function calculateStats(values: number[]): {
	mean: number;
	stdDev: number;
	min: number;
	max: number;
	percentile5: number;
	percentile95: number;
} {
	if (values.length === 0) {
		return { mean: 0, stdDev: 0, min: 0, max: 0, percentile5: 0, percentile95: 0 };
	}

	const sorted = [...values].sort((a, b) => a - b);
	const n = sorted.length;

	const mean = values.reduce((sum, v) => sum + v, 0) / n;
	const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / n;
	const stdDev = Math.sqrt(variance);

	return {
		mean,
		stdDev,
		min: sorted[0],
		max: sorted[n - 1],
		percentile5: sorted[Math.floor(n * 0.05)],
		percentile95: sorted[Math.floor(n * 0.95)]
	};
}

/**
 * Aggregate results for a constellation size
 */
function aggregateResults(runs: SimulationRun[]): ConstellationResult {
	const coverages = runs.map(r => r.coveragePercent);
	const highValueCoverages = runs.map(r => r.highValueCoveragePercent);
	const failures = runs.map(r => r.satelliteFailures);
	const deltaVs = runs.map(r => r.avgDeltaVUsed);

	return {
		constellationSize: runs[0].constellationSize,
		runs: runs.length,
		coverage: calculateStats(coverages),
		highValueCoverage: calculateStats(highValueCoverages),
		avgFailures: failures.reduce((sum, f) => sum + f, 0) / failures.length,
		avgDeltaVUsed: deltaVs.reduce((sum, d) => sum + d, 0) / deltaVs.length
	};
}

/**
 * Find knee point using perpendicular distance method
 */
function findKneePoint(results: ConstellationResult[]): number {
	if (results.length < 3) return results[0]?.constellationSize ?? 50;

	const first = results[0];
	const last = results[results.length - 1];

	// Line from first to last point
	const x1 = first.constellationSize;
	const y1 = first.coverage.mean;
	const x2 = last.constellationSize;
	const y2 = last.coverage.mean;

	let maxDistance = 0;
	let kneePoint = first.constellationSize;

	// Find point with maximum perpendicular distance to line
	for (const result of results) {
		const x0 = result.constellationSize;
		const y0 = result.coverage.mean;

		// Perpendicular distance formula
		const distance = Math.abs(
			(y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1
		) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));

		if (distance > maxDistance) {
			maxDistance = distance;
			kneePoint = result.constellationSize;
		}
	}

	return kneePoint;
}

/**
 * Find minimum viable constellation size for target high-value coverage
 */
function findMinimumViableSize(results: ConstellationResult[], targetCoverage: number = 80): number {
	for (const result of results) {
		if (result.highValueCoverage.mean >= targetCoverage) {
			return result.constellationSize;
		}
	}
	return results[results.length - 1]?.constellationSize ?? 70;
}

/**
 * Find optimal constellation size (best coverage per satellite)
 */
function findOptimalSize(results: ConstellationResult[]): number {
	let bestEfficiency = 0;
	let optimalSize = 50;

	for (const result of results) {
		const efficiency = result.coverage.mean / result.constellationSize;
		if (efficiency > bestEfficiency) {
			bestEfficiency = efficiency;
			optimalSize = result.constellationSize;
		}
	}

	return optimalSize;
}

/**
 * Analyze simulation results
 */
function analyzeResults(results: ConstellationResult[]): SimulationAnalysis {
	const baseline = results.find(r => r.constellationSize === 50) ?? results[Math.floor(results.length / 2)];

	return {
		kneePoint: findKneePoint(results),
		minimumViableSize: findMinimumViableSize(results, 80),
		optimalSize: findOptimalSize(results),
		baselineComparison: {
			size: baseline.constellationSize,
			coverageMean: baseline.coverage.mean,
			coverageStdDev: baseline.coverage.stdDev
		}
	};
}

/**
 * Yield to the browser event loop
 */
function yieldToUI(): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Run full Monte Carlo simulation across constellation sizes (async version)
 * Yields to the UI periodically to prevent "page not responding" warnings
 */
export async function runMonteCarloSimulationAsync(
	config: SimulationConfig,
	onProgress?: (progress: SimulationProgress) => void
): Promise<SimulationOutput> {
	const startTime = Date.now();
	const results: ConstellationResult[] = [];

	const sizes = CONSTELLATION_SIZES;
	const totalIterations = sizes.length * config.monteCarloRuns;
	let completedIterations = 0;
	let lastYield = Date.now();
	const yieldInterval = 16; // ~60fps, yield every 16ms

	for (let sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) {
		const size = sizes[sizeIndex];
		const runs: SimulationRun[] = [];

		for (let run = 0; run < config.monteCarloRuns; run++) {
			// Use combination of size and run for seed
			const seed = size * 10000 + run;
			const result = runSimulation(size, config, run, seed);
			runs.push(result);

			completedIterations++;

			// Yield to UI frequently to prevent blocking
			const now = Date.now();
			if (now - lastYield > yieldInterval) {
				await yieldToUI();
				lastYield = Date.now();
			}

			// Report progress every few iterations
			if (onProgress && completedIterations % 5 === 0) {
				onProgress({
					currentSize: size,
					totalSizes: sizes.length,
					currentRun: run + 1,
					totalRuns: config.monteCarloRuns,
					percentComplete: (completedIterations / totalIterations) * 100
				});
			}
		}

		results.push(aggregateResults(runs));

		// Always yield between constellation sizes
		await yieldToUI();
	}

	const executionTimeMs = Date.now() - startTime;

	return {
		config,
		results,
		analysis: analyzeResults(results),
		executionTimeMs
	};
}

/**
 * Run full Monte Carlo simulation (synchronous version for backwards compatibility)
 */
export function runMonteCarloSimulation(
	config: SimulationConfig,
	onProgress?: (progress: SimulationProgress) => void
): SimulationOutput {
	const startTime = Date.now();
	const results: ConstellationResult[] = [];

	const sizes = CONSTELLATION_SIZES;
	const totalIterations = sizes.length * config.monteCarloRuns;
	let completedIterations = 0;

	for (let sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) {
		const size = sizes[sizeIndex];
		const runs: SimulationRun[] = [];

		for (let run = 0; run < config.monteCarloRuns; run++) {
			// Use combination of size and run for seed
			const seed = size * 10000 + run;
			const result = runSimulation(size, config, run, seed);
			runs.push(result);

			completedIterations++;

			// Report progress
			if (onProgress && completedIterations % 10 === 0) {
				onProgress({
					currentSize: size,
					totalSizes: sizes.length,
					currentRun: run + 1,
					totalRuns: config.monteCarloRuns,
					percentComplete: (completedIterations / totalIterations) * 100
				});
			}
		}

		results.push(aggregateResults(runs));
	}

	const executionTimeMs = Date.now() - startTime;

	return {
		config,
		results,
		analysis: analyzeResults(results),
		executionTimeMs
	};
}

/**
 * Run simulation for a single constellation size
 */
export function runSingleSizeSimulation(
	size: number,
	config: SimulationConfig,
	onProgress?: (progress: SimulationProgress) => void
): ConstellationResult {
	const runs: SimulationRun[] = [];

	for (let run = 0; run < config.monteCarloRuns; run++) {
		const seed = size * 10000 + run;
		const result = runSimulation(size, config, run, seed);
		runs.push(result);

		if (onProgress && run % 10 === 0) {
			onProgress({
				currentSize: size,
				totalSizes: 1,
				currentRun: run + 1,
				totalRuns: config.monteCarloRuns,
				percentComplete: ((run + 1) / config.monteCarloRuns) * 100
			});
		}
	}

	return aggregateResults(runs);
}

/**
 * Quick simulation with fewer runs for preview
 */
export function runQuickSimulation(config: SimulationConfig): SimulationOutput {
	const quickConfig = {
		...config,
		monteCarloRuns: Math.min(100, config.monteCarloRuns),
		neaPopulationSize: Math.min(500, config.neaPopulationSize)
	};

	return runMonteCarloSimulation(quickConfig);
}
