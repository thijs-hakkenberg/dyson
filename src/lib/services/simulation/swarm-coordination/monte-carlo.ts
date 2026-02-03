/**
 * Swarm Coordination Monte Carlo Simulation
 *
 * Orchestrates multiple simulation runs to determine swarm coordination
 * performance statistics with confidence intervals.
 * Uses AsyncRunner and SeededRandom from simulation-core.
 */

import {
	calculateStats,
	confidenceInterval,
	AsyncRunner,
	SeededRandom,
	type Stats
} from '$lib/services/simulation-core';
import { SwarmCoordinationSimulator } from './discrete-event-sim';
import type {
	SwarmCoordinationConfig,
	SwarmCoordinationResult,
	SwarmCoordinationOutput,
	SwarmCoordinationRunResult,
	SwarmCoordinationProgress,
	TopologyComparisonResult,
	CoordinationTopology
} from './types';

/**
 * Default swarm coordination configuration
 */
export const DEFAULT_SWARM_COORDINATION_CONFIG: SwarmCoordinationConfig = {
	nodeCount: 10000,
	coordinationTopology: 'hierarchical',
	clusterSize: 100,
	coordinatorDutyCycleHours: 24,
	bandwidthPerNodeKbps: 1,
	nodeFailureRatePerYear: 0.02,
	coordinatorPowerW: 18,
	basePowerW: 5,
	simulationDays: 90
};

/**
 * Run Monte Carlo simulation for swarm coordination
 */
export async function runSwarmCoordinationMonteCarlo(
	config: SwarmCoordinationConfig,
	runs: number = 100,
	onProgress?: (progress: SwarmCoordinationProgress) => void
): Promise<SwarmCoordinationOutput> {
	const startTime = Date.now();
	const runner = new AsyncRunner();
	const results: SwarmCoordinationRunResult[] = [];

	await runner.run(
		runs,
		async (i) => {
			const seed = (config.seed ?? Date.now()) + i;
			const sim = new SwarmCoordinationSimulator({ ...config, seed });
			const result = sim.run();
			result.runId = i;
			results.push(result);
			return result;
		},
		(progress) => {
			if (onProgress) {
				onProgress({
					currentRun: progress.currentIteration,
					totalRuns: runs,
					percentComplete: progress.percentComplete,
					currentTopology: config.coordinationTopology
				});
			}
		}
	);

	return {
		config,
		result: aggregateResults(results),
		runs,
		executionTimeMs: Date.now() - startTime
	};
}

/**
 * Aggregate results from multiple simulation runs
 */
function aggregateResults(results: SwarmCoordinationRunResult[]): SwarmCoordinationResult {
	const overheads = results.map((r) => r.communicationOverheadPercent);
	const bottlenecks = results.map((r) => r.bottleneckThresholdNodes);
	const availabilities = results.map((r) => r.coordinatorAvailabilityPercent);
	const powerVariances = results.map((r) => r.powerVariancePercent);
	const avgPropagations = results.map((r) => r.avgUpdatePropagationMs);
	const maxPropagations = results.map((r) => r.maxUpdatePropagationMs);
	const handoffs = results.map((r) => r.failedHandoffs);
	const dropRates = results.map((r) => r.messageDropRate);

	const overheadStats = calculateStats(overheads);
	const bottleneckStats = calculateStats(bottlenecks);
	const availabilityStats = calculateStats(availabilities);
	const powerStats = calculateStats(powerVariances);
	const handoffStats = calculateStats(handoffs);
	const dropRateStats = calculateStats(dropRates);

	const ci = confidenceInterval(overheads);

	return {
		communicationOverheadPercent: overheadStats.mean,
		communicationOverheadStdDev: overheadStats.stdDev,
		bottleneckThresholdNodes: bottleneckStats.mean,
		bottleneckThresholdStdDev: bottleneckStats.stdDev,
		coordinatorAvailabilityPercent: availabilityStats.mean,
		coordinatorAvailabilityStdDev: availabilityStats.stdDev,
		powerVariancePercent: powerStats.mean,
		powerVarianceStdDev: powerStats.stdDev,
		avgUpdatePropagationMs: avgPropagations.reduce((a, b) => a + b, 0) / avgPropagations.length,
		maxUpdatePropagationMs: Math.max(...maxPropagations),
		failedHandoffs: handoffStats.mean,
		failedHandoffsStdDev: handoffStats.stdDev,
		messageDropRate: dropRateStats.mean,
		messageDropRateStdDev: dropRateStats.stdDev,
		confidenceInterval95: {
			overheadLower: ci.lower,
			overheadUpper: ci.upper
		}
	};
}

/**
 * Run comparison between different coordination topologies
 */
export async function runSwarmCoordinationComparison(
	baseConfig: Omit<SwarmCoordinationConfig, 'coordinationTopology'>,
	topologies: CoordinationTopology[] = ['centralized', 'hierarchical', 'mesh'],
	runsPerTopology: number = 50,
	onProgress?: (progress: SwarmCoordinationProgress) => void
): Promise<TopologyComparisonResult> {
	const configs: SwarmCoordinationConfig[] = topologies.map((topology) => ({
		...baseConfig,
		coordinationTopology: topology
	}));

	const results: SwarmCoordinationResult[] = [];
	const totalRuns = topologies.length * runsPerTopology;
	let completedRuns = 0;

	for (let i = 0; i < configs.length; i++) {
		const config = configs[i];
		const output = await runSwarmCoordinationMonteCarlo(config, runsPerTopology, (progress) => {
			if (onProgress) {
				const overallProgress =
					((completedRuns + progress.currentRun) / totalRuns) * 100;
				onProgress({
					currentRun: completedRuns + progress.currentRun,
					totalRuns,
					percentComplete: overallProgress,
					currentTopology: config.coordinationTopology
				});
			}
		});
		results.push(output.result);
		completedRuns += runsPerTopology;
	}

	return {
		configs,
		results,
		optimalConfigIndex: findOptimalConfig(results, topologies),
		analysis: analyzeComparison(topologies, results)
	};
}

/**
 * Find the optimal configuration index
 * Balances latency, bandwidth efficiency, and reliability
 */
function findOptimalConfig(results: SwarmCoordinationResult[], topologies: CoordinationTopology[]): number {
	let bestIndex = 0;
	let bestScore = -Infinity;

	for (let i = 0; i < results.length; i++) {
		const result = results[i];

		// Score components (normalize to similar scales)
		const latencyScore = 1000 / (result.avgUpdatePropagationMs + 1); // Lower is better
		const bandwidthScore = 100 / (result.communicationOverheadPercent + 1); // Lower is better
		const availabilityScore = result.coordinatorAvailabilityPercent / 100; // Higher is better
		const reliabilityScore = 1 - result.messageDropRate; // Lower drop rate is better

		// Weighted score
		const score =
			latencyScore * 0.3 +
			bandwidthScore * 0.25 +
			availabilityScore * 0.25 +
			reliabilityScore * 0.2;

		if (score > bestScore) {
			bestScore = score;
			bestIndex = i;
		}
	}

	return bestIndex;
}

/**
 * Analyze comparison results across topologies
 */
function analyzeComparison(
	topologies: CoordinationTopology[],
	results: SwarmCoordinationResult[]
): TopologyComparisonResult['analysis'] {
	// Find best for each criterion
	let bestLatencyIdx = 0;
	let bestBandwidthIdx = 0;
	let bestPowerIdx = 0;

	for (let i = 1; i < results.length; i++) {
		if (results[i].avgUpdatePropagationMs < results[bestLatencyIdx].avgUpdatePropagationMs) {
			bestLatencyIdx = i;
		}
		if (results[i].communicationOverheadPercent < results[bestBandwidthIdx].communicationOverheadPercent) {
			bestBandwidthIdx = i;
		}
		if (results[i].powerVariancePercent < results[bestPowerIdx].powerVariancePercent) {
			bestPowerIdx = i;
		}
	}

	const optimalIdx = findOptimalConfig(results, topologies);
	const optimalTopology = topologies[optimalIdx];

	// Generate recommendation
	let recommendation: string;

	if (optimalTopology === 'hierarchical') {
		recommendation =
			'Hierarchical topology recommended for large-scale swarms. ' +
			'Provides good balance of latency, bandwidth efficiency, and fault tolerance. ' +
			'Cluster-based coordination scales well with proper coordinator duty cycling.';
	} else if (optimalTopology === 'mesh') {
		recommendation =
			'Mesh topology recommended for this configuration. ' +
			'Gossip protocol provides robust propagation with no single point of failure. ' +
			'Higher latency but better fault tolerance for dynamic swarms.';
	} else {
		recommendation =
			'Centralized topology acceptable for smaller swarms. ' +
			'Simpler implementation but single point of failure risk. ' +
			'Consider hierarchical for swarms exceeding bottleneck threshold.';
	}

	return {
		bestLatency: topologies[bestLatencyIdx],
		bestBandwidth: topologies[bestBandwidthIdx],
		bestPower: topologies[bestPowerIdx],
		recommendation
	};
}

/**
 * Generate comparison configurations for scaling analysis
 */
export function generateScalingConfigs(
	baseConfig: Omit<SwarmCoordinationConfig, 'nodeCount'>,
	nodeCounts: number[] = [1000, 5000, 10000, 50000, 100000, 500000, 1000000]
): SwarmCoordinationConfig[] {
	return nodeCounts.map((nodeCount) => ({
		...baseConfig,
		nodeCount,
		// Scale cluster size with swarm size
		clusterSize: Math.min(200, Math.max(50, Math.floor(Math.sqrt(nodeCount))))
	}));
}

/**
 * Run scaling analysis to find optimal node count for given constraints
 */
export async function runScalingAnalysis(
	baseConfig: Omit<SwarmCoordinationConfig, 'nodeCount'>,
	targetLatencyMs: number = 1000,
	runsPerSize: number = 30,
	onProgress?: (progress: SwarmCoordinationProgress) => void
): Promise<{
	configs: SwarmCoordinationConfig[];
	results: SwarmCoordinationResult[];
	maxViableNodes: number;
	latencyAtMax: number;
}> {
	const nodeCounts = [1000, 5000, 10000, 50000, 100000, 500000, 1000000];
	const configs = generateScalingConfigs(baseConfig, nodeCounts);
	const results: SwarmCoordinationResult[] = [];

	let completedRuns = 0;
	const totalRuns = configs.length * runsPerSize;

	for (const config of configs) {
		const output = await runSwarmCoordinationMonteCarlo(config, runsPerSize, (progress) => {
			if (onProgress) {
				onProgress({
					currentRun: completedRuns + progress.currentRun,
					totalRuns,
					percentComplete: ((completedRuns + progress.currentRun) / totalRuns) * 100,
					currentTopology: config.coordinationTopology
				});
			}
		});
		results.push(output.result);
		completedRuns += runsPerSize;
	}

	// Find maximum viable node count (latency under target)
	let maxViableIdx = 0;
	for (let i = 0; i < results.length; i++) {
		if (results[i].avgUpdatePropagationMs <= targetLatencyMs) {
			maxViableIdx = i;
		}
	}

	return {
		configs,
		results,
		maxViableNodes: configs[maxViableIdx].nodeCount,
		latencyAtMax: results[maxViableIdx].avgUpdatePropagationMs
	};
}

/**
 * Quick simulation with reduced parameters for preview
 */
export async function runQuickSwarmSimulation(
	config: SwarmCoordinationConfig
): Promise<SwarmCoordinationOutput> {
	const quickConfig: SwarmCoordinationConfig = {
		...config,
		nodeCount: Math.min(1000, config.nodeCount),
		simulationDays: Math.min(30, config.simulationDays)
	};

	return runSwarmCoordinationMonteCarlo(quickConfig, 20);
}
