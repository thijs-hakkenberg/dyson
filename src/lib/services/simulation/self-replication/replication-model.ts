/**
 * Self-Replication Physics Model
 *
 * Models exponential growth of self-replicating manufacturing foundries
 * with closure ratio degradation and vitamin supply constraints.
 *
 * Key physics:
 * - Foundries replicate each cycle, producing new_foundries = floor(count * closure)
 * - Non-self-producible "vitamin" components must be imported
 * - Effective closure degrades each generation from accumulated manufacturing errors
 * - Growth is capped by vitamin supply rate
 *
 * Addresses research question:
 * - RQ-3a-2: Self-replication closure threshold
 */

import type { ReplicationConfig, CycleData, ReplicationRunResult } from './types';

/** Maximum simulation time in months (500 years) */
const MAX_TIME_MONTHS = 500 * 12;

/** Minimum effective closure below which growth halts */
const MIN_EFFECTIVE_CLOSURE = 0.01;

/**
 * Calculate effective closure ratio after degradation
 *
 * Each generation, manufacturing errors accumulate, reducing the
 * fraction of a foundry that can be self-produced.
 *
 * effective_closure[gen] = closureRatio * (1 - degradationRate)^gen
 */
export function calculateEffectiveClosure(
	baseClosure: number,
	degradationRate: number,
	generation: number
): number {
	if (degradationRate <= 0) return baseClosure;
	return baseClosure * Math.pow(1 - degradationRate, generation);
}

/**
 * Calculate vitamin mass needed for new foundries
 *
 * Vitamins are the non-self-producible fraction of foundry mass.
 * vitaminMass = newFoundries * foundryMass * (1 - closureRatio)
 */
export function calculateVitaminNeeded(
	newFoundries: number,
	foundryMassKg: number,
	closureRatio: number
): number {
	return newFoundries * foundryMassKg * (1 - closureRatio);
}

/**
 * Simulate a single generation of replication
 *
 * Returns the number of new foundries actually produced and vitamin consumed,
 * accounting for vitamin supply constraints.
 */
export function simulateGeneration(
	currentCount: number,
	effectiveClosure: number,
	foundryMassKg: number,
	vitaminAvailable: number
): { newFoundries: number; vitaminConsumed: number } {
	// Theoretical new foundries from closure ratio
	const theoreticalNew = Math.floor(currentCount * effectiveClosure);

	if (theoreticalNew <= 0) {
		return { newFoundries: 0, vitaminConsumed: 0 };
	}

	// Vitamin needed per new foundry
	const vitaminPerFoundry = foundryMassKg * (1 - effectiveClosure);

	if (vitaminPerFoundry <= 0) {
		// Perfect closure - no vitamins needed
		return { newFoundries: theoreticalNew, vitaminConsumed: 0 };
	}

	// Cap by available vitamin supply
	const maxFromVitamin = Math.floor(vitaminAvailable / vitaminPerFoundry);
	const actualNew = Math.min(theoreticalNew, maxFromVitamin);
	const vitaminConsumed = actualNew * vitaminPerFoundry;

	return { newFoundries: actualNew, vitaminConsumed };
}

/**
 * Calculate theoretical doubling time
 *
 * For discrete replication: how many cycles until count doubles.
 * Uses iterative approach since growth is discrete.
 */
export function calculateDoublingTime(
	closureRatio: number,
	cycleTimeMonths: number
): number {
	if (closureRatio <= 0) return Infinity;

	// Simulate discrete doubling
	let count = 1;
	let cycles = 0;
	const target = 2;

	while (count < target && cycles < 1000) {
		const newFoundries = Math.floor(count * closureRatio);
		if (newFoundries <= 0) return Infinity;
		count += newFoundries;
		cycles++;
	}

	return cycles * cycleTimeMonths;
}

/**
 * Estimate total vitamin budget needed to reach target
 *
 * This is a lower bound assuming no degradation and unlimited supply rate.
 * Total vitamins = (targetFoundries - initialFoundries) * foundryMass * (1 - closureRatio)
 */
export function estimateVitaminBudget(
	targetFoundries: number,
	initialFoundries: number,
	foundryMassKg: number,
	closureRatio: number
): number {
	const netNewFoundries = Math.max(0, targetFoundries - initialFoundries);
	return netNewFoundries * foundryMassKg * (1 - closureRatio);
}

/**
 * Run a full replication simulation
 *
 * Simulates cycle-by-cycle growth until target is reached or max time exceeded.
 */
export function simulateReplication(config: ReplicationConfig): ReplicationRunResult {
	const cycles: CycleData[] = [];
	let currentCount = config.initialFoundries;
	let cumulativeVitamin = 0;
	let timeMonths = 0;
	let peakGrowthRate = 0;
	let timeToTarget: number | null = null;
	let generationAtPlateau: number | null = null;
	let generation = 0;

	// Record initial state
	cycles.push({
		generation: 0,
		timeMonths: 0,
		foundryCount: currentCount,
		newFoundries: 0,
		vitaminNeeded: 0,
		vitaminConsumed: 0,
		effectiveClosure: config.closureRatio,
		cumulativeVitaminMass: 0
	});

	while (timeMonths < MAX_TIME_MONTHS) {
		generation++;
		timeMonths += config.cycleTimeMonths;

		// Calculate effective closure with degradation
		const effectiveClosure = calculateEffectiveClosure(
			config.closureRatio,
			config.degradationRate,
			generation
		);

		// Check if closure has degraded below useful threshold
		if (effectiveClosure < MIN_EFFECTIVE_CLOSURE && generationAtPlateau === null) {
			generationAtPlateau = generation;
		}

		// Available vitamin supply for this cycle
		const vitaminAvailable = config.vitaminSupplyRate * config.cycleTimeMonths;

		// Simulate this generation
		const { newFoundries, vitaminConsumed } = simulateGeneration(
			currentCount,
			effectiveClosure,
			config.foundryMassKg,
			vitaminAvailable
		);

		// Calculate vitamin needed (theoretical, before supply cap)
		const theoreticalNew = Math.floor(currentCount * effectiveClosure);
		const vitaminNeeded = calculateVitaminNeeded(
			theoreticalNew,
			config.foundryMassKg,
			effectiveClosure
		);

		// Update state
		currentCount += newFoundries;
		cumulativeVitamin += vitaminConsumed;

		// Track peak growth rate
		if (newFoundries > peakGrowthRate) {
			peakGrowthRate = newFoundries;
		}

		// Detect plateau: no new foundries produced
		if (newFoundries === 0 && generationAtPlateau === null) {
			generationAtPlateau = generation;
		}

		cycles.push({
			generation,
			timeMonths,
			foundryCount: currentCount,
			newFoundries,
			vitaminNeeded,
			vitaminConsumed,
			effectiveClosure,
			cumulativeVitaminMass: cumulativeVitamin
		});

		// Check if target reached
		if (currentCount >= config.targetFoundries && timeToTarget === null) {
			timeToTarget = timeMonths;
			break;
		}

		// Stop if growth has completely halted
		if (newFoundries === 0 && effectiveClosure < MIN_EFFECTIVE_CLOSURE) {
			break;
		}

		// Stop if no growth for a long time and well past any reasonable timeline
		if (generation > 100 && newFoundries === 0) {
			break;
		}
	}

	return {
		cycles,
		finalFoundryCount: currentCount,
		totalVitaminMass: cumulativeVitamin,
		timeToTarget,
		peakGrowthRate,
		generationAtPlateau
	};
}
