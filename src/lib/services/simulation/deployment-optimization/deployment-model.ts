/**
 * Deployment Optimization Model
 *
 * Implements deployment strategies for distributing collector units
 * from an assembly node to orbital slots around the Sun.
 * Uses NN-based trajectory estimation when available, Hohmann fallback otherwise.
 */

import { SeededRandom, hohmannTransferDeltaV, hohmannTransferTime, CONSTANTS } from '$lib/services/simulation-core';
import { estimateDeltaV } from './nn-inference';
import type {
	AssemblyNode,
	DeploymentOptConfig,
	DeploymentStep,
	DeploymentStrategy,
	NNWeights,
	SlotPosition,
	StrategyResult
} from './types';

/** Assembly node orbital parameters */
const ASSEMBLY_NODES: Record<AssemblyNode, { radiusAU: number; angleDeg: number }> = {
	L1: { radiusAU: 0.99, angleDeg: 0 },
	L4: { radiusAU: 1.0, angleDeg: 60 }
};

/** Target swarm orbital radius in AU */
const SWARM_ORBIT_AU = 1.0;

/** Tug dry mass in kg */
const TUG_DRY_MASS = 5000;
/** Collector unit mass in kg */
const UNIT_MASS = 2000;
/** Tug exhaust velocity in m/s (Ion propulsion, Isp ~3000s) */
const EXHAUST_VELOCITY = 29430;

/**
 * Generate evenly-spaced slot positions around the target orbit
 */
export function generateSlotPositions(unitCount: number, orbitalRadius: number = SWARM_ORBIT_AU): SlotPosition[] {
	const spacing = 360 / unitCount;
	const slots: SlotPosition[] = [];
	for (let i = 0; i < unitCount; i++) {
		slots.push({
			index: i,
			orbitalRadius,
			angle: i * spacing
		});
	}
	return slots;
}

/**
 * Calculate angular distance between assembly node and a slot
 */
function angularDistance(nodeAngle: number, slotAngle: number): number {
	let diff = Math.abs(slotAngle - nodeAngle);
	if (diff > 180) diff = 360 - diff;
	return diff;
}

/**
 * Estimate transfer cost between assembly node and a slot
 * Uses NN if available, otherwise Hohmann approximation with angular correction
 */
export function calculateTransferCost(
	fromNode: AssemblyNode,
	toSlot: SlotPosition,
	nnWeights: NNWeights | null
): { deltaV: number; travelDays: number } {
	const node = ASSEMBLY_NODES[fromNode];
	const angDist = angularDistance(node.angleDeg, toSlot.angle);

	// Base radial transfer
	const r1 = node.radiusAU;
	const r2 = toSlot.orbitalRadius;

	if (nnWeights) {
		// Use NN for radial component, add phase adjustment
		const baseTof = hohmannTransferTime(r1, r2);
		const tof = Math.max(baseTof, 30); // minimum 30 days
		const baseDeltaV = estimateDeltaV(r1, r2, tof, nnWeights);

		if (!isNaN(baseDeltaV) && baseDeltaV > 0) {
			// Add phasing burn proportional to angular distance
			const phasingDeltaV = (angDist / 180) * 500; // up to 500 m/s for 180 deg
			const totalDeltaV = baseDeltaV + phasingDeltaV;
			const phasingDays = (angDist / 360) * 365.25; // fraction of orbital period
			return {
				deltaV: totalDeltaV,
				travelDays: tof + phasingDays
			};
		}
	}

	// Hohmann fallback
	const hohmannDV = hohmannTransferDeltaV(r1, r2);
	const hohmannDays = hohmannTransferTime(r1, r2);

	// If same radius, only phasing is needed
	const radialDV = Math.abs(r1 - r2) < 0.001 ? 0 : hohmannDV;
	const phasingDeltaV = (angDist / 180) * 500;
	const phasingDays = (angDist / 360) * 365.25;

	return {
		deltaV: radialDV + phasingDeltaV,
		travelDays: (radialDV > 0 ? hohmannDays : 0) + phasingDays
	};
}

/**
 * Calculate propellant consumed using Tsiolkovsky rocket equation
 * @param deltaV - delta-V in m/s
 * @param payloadMass - payload mass in kg
 * @returns propellant mass in kg
 */
function propellantMass(deltaV: number, payloadMass: number): number {
	const massRatio = Math.exp(deltaV / EXHAUST_VELOCITY);
	return (TUG_DRY_MASS + payloadMass) * (massRatio - 1);
}

/**
 * Create a deployment step for a given tug delivering a unit to a slot
 */
function createStep(
	tugId: number,
	unitId: number,
	slot: SlotPosition,
	assemblyNode: AssemblyNode,
	nnWeights: NNWeights | null,
	rng: SeededRandom
): DeploymentStep {
	const transfer = calculateTransferCost(assemblyNode, slot, nnWeights);
	// Stochastic fuel efficiency: +/-5%
	const efficiencyFactor = 1 + rng.nextGaussian(0, 0.025);
	const adjustedDeltaV = transfer.deltaV * efficiencyFactor;
	const prop = propellantMass(adjustedDeltaV, UNIT_MASS);

	return {
		tugId,
		unitId,
		slotIndex: slot.index,
		deltaV: adjustedDeltaV,
		travelDays: transfer.travelDays * (0.95 + rng.next() * 0.1), // +/-5% travel time
		propellantUsed: prop
	};
}

/**
 * Build deployment timeline from steps
 */
function buildTimeline(
	steps: DeploymentStep[],
	tugCount: number
): { day: number; unitsDeployed: number }[] {
	// Track each tug's availability time
	const tugAvailable = new Array(tugCount).fill(0);
	const events: { day: number; unitId: number }[] = [];

	for (const step of steps) {
		const startDay = tugAvailable[step.tugId];
		const arriveDay = startDay + step.travelDays;
		// Return trip (empty, faster)
		const returnDay = arriveDay + step.travelDays * 0.6;
		tugAvailable[step.tugId] = returnDay;
		events.push({ day: arriveDay, unitId: step.unitId });
	}

	events.sort((a, b) => a.day - b.day);
	const timeline: { day: number; unitsDeployed: number }[] = [];
	for (let i = 0; i < events.length; i++) {
		timeline.push({ day: events[i].day, unitsDeployed: i + 1 });
	}
	return timeline;
}

/**
 * Sequential deployment: deploy units in slot order, round-robin across tugs
 */
export function simulateSequentialDeployment(
	config: DeploymentOptConfig,
	slots: SlotPosition[],
	rng: SeededRandom,
	nnWeights: NNWeights | null
): StrategyResult {
	const steps: DeploymentStep[] = [];
	let totalDeltaV = 0;
	let totalPropellant = 0;
	const propellantBudgetMs = config.propellantBudget * 1000; // km/s to m/s

	for (let i = 0; i < slots.length; i++) {
		const tugId = i % config.tugCount;
		const step = createStep(tugId, i, slots[i], config.assemblyNode, nnWeights, rng);

		totalDeltaV += step.deltaV;
		totalPropellant += step.propellantUsed;

		if (totalDeltaV > propellantBudgetMs) break;
		steps.push(step);
	}

	const timeline = buildTimeline(steps, config.tugCount);
	const totalDays = timeline.length > 0 ? timeline[timeline.length - 1].day : 0;

	return {
		strategy: 'sequential',
		steps,
		totalDeltaV,
		totalDays,
		propellantUsed: totalPropellant,
		completionRate: steps.length / slots.length,
		deploymentTimeline: timeline
	};
}

/**
 * Batch deployment: tugs carry multiple units, deploy in clusters
 */
export function simulateBatchDeployment(
	config: DeploymentOptConfig,
	slots: SlotPosition[],
	rng: SeededRandom,
	nnWeights: NNWeights | null
): StrategyResult {
	const steps: DeploymentStep[] = [];
	let totalDeltaV = 0;
	let totalPropellant = 0;
	const propellantBudgetMs = config.propellantBudget * 1000;

	// Each tug carries 3 units per batch trip
	const batchSize = 3;
	const sortedSlots = [...slots].sort((a, b) => a.angle - b.angle);

	// Group slots into batches of nearby slots
	const batches: SlotPosition[][] = [];
	for (let i = 0; i < sortedSlots.length; i += batchSize) {
		batches.push(sortedSlots.slice(i, i + batchSize));
	}

	let unitId = 0;
	for (let batchIdx = 0; batchIdx < batches.length; batchIdx++) {
		const tugId = batchIdx % config.tugCount;
		const batch = batches[batchIdx];

		for (let j = 0; j < batch.length; j++) {
			const step = createStep(tugId, unitId, batch[j], config.assemblyNode, nnWeights, rng);
			// Intra-batch transfers are cheaper (shorter hops)
			if (j > 0) {
				step.deltaV *= 0.3; // much shorter hop within cluster
				step.travelDays *= 0.2;
				step.propellantUsed *= 0.3;
			}

			totalDeltaV += step.deltaV;
			totalPropellant += step.propellantUsed;

			if (totalDeltaV > propellantBudgetMs) break;
			steps.push(step);
			unitId++;
		}
		if (totalDeltaV > propellantBudgetMs) break;
	}

	const timeline = buildTimeline(steps, config.tugCount);
	const totalDays = timeline.length > 0 ? timeline[timeline.length - 1].day : 0;

	return {
		strategy: 'batch',
		steps,
		totalDeltaV,
		totalDays,
		propellantUsed: totalPropellant,
		completionRate: steps.length / slots.length,
		deploymentTimeline: timeline
	};
}

/**
 * Greedy deployment: at each step, pick the nearest undeployed slot
 */
export function simulateGreedyDeployment(
	config: DeploymentOptConfig,
	slots: SlotPosition[],
	rng: SeededRandom,
	nnWeights: NNWeights | null
): StrategyResult {
	const steps: DeploymentStep[] = [];
	let totalDeltaV = 0;
	let totalPropellant = 0;
	const propellantBudgetMs = config.propellantBudget * 1000;
	const node = ASSEMBLY_NODES[config.assemblyNode];

	const deployed = new Set<number>();
	let unitId = 0;

	// Sort by angular distance from assembly node first
	const slotsByDistance = [...slots].sort(
		(a, b) => angularDistance(node.angleDeg, a.angle) - angularDistance(node.angleDeg, b.angle)
	);

	for (const slot of slotsByDistance) {
		if (deployed.has(slot.index)) continue;

		const tugId = unitId % config.tugCount;
		const step = createStep(tugId, unitId, slot, config.assemblyNode, nnWeights, rng);

		totalDeltaV += step.deltaV;
		totalPropellant += step.propellantUsed;

		if (totalDeltaV > propellantBudgetMs) break;
		steps.push(step);
		deployed.add(slot.index);
		unitId++;
	}

	const timeline = buildTimeline(steps, config.tugCount);
	const totalDays = timeline.length > 0 ? timeline[timeline.length - 1].day : 0;

	return {
		strategy: 'greedy',
		steps,
		totalDeltaV,
		totalDays,
		propellantUsed: totalPropellant,
		completionRate: steps.length / slots.length,
		deploymentTimeline: timeline
	};
}

/**
 * NN-guided deployment: use NN delta-V estimates to find globally optimal sequence
 * At each step, evaluate all remaining slots and pick lowest cumulative cost
 */
export function simulateNNGuidedDeployment(
	config: DeploymentOptConfig,
	slots: SlotPosition[],
	rng: SeededRandom,
	nnWeights: NNWeights | null
): StrategyResult {
	const steps: DeploymentStep[] = [];
	let totalDeltaV = 0;
	let totalPropellant = 0;
	const propellantBudgetMs = config.propellantBudget * 1000;

	const deployed = new Set<number>();
	let unitId = 0;

	// Limit look-ahead for large counts to keep performance reasonable
	const maxCandidates = Math.min(slots.length, 50);

	while (deployed.size < slots.length) {
		// Find remaining slots
		const remaining = slots.filter((s) => !deployed.has(s.index));
		if (remaining.length === 0) break;

		// Evaluate candidates (limit for performance)
		const candidates = remaining.slice(0, maxCandidates);
		let bestSlot = candidates[0];
		let bestCost = Infinity;

		for (const slot of candidates) {
			const transfer = calculateTransferCost(config.assemblyNode, slot, nnWeights);
			if (transfer.deltaV < bestCost) {
				bestCost = transfer.deltaV;
				bestSlot = slot;
			}
		}

		const tugId = unitId % config.tugCount;
		const step = createStep(tugId, unitId, bestSlot, config.assemblyNode, nnWeights, rng);

		totalDeltaV += step.deltaV;
		totalPropellant += step.propellantUsed;

		if (totalDeltaV > propellantBudgetMs) break;
		steps.push(step);
		deployed.add(bestSlot.index);
		unitId++;
	}

	const timeline = buildTimeline(steps, config.tugCount);
	const totalDays = timeline.length > 0 ? timeline[timeline.length - 1].day : 0;

	return {
		strategy: 'nn-guided',
		steps,
		totalDeltaV,
		totalDays,
		propellantUsed: totalPropellant,
		completionRate: steps.length / slots.length,
		deploymentTimeline: timeline
	};
}

/**
 * Run all enabled strategies and return comparison
 */
export function runAllStrategies(
	config: DeploymentOptConfig,
	slots: SlotPosition[],
	rng: SeededRandom,
	nnWeights: NNWeights | null
): StrategyResult[] {
	const results: StrategyResult[] = [];
	const strategyFns: Record<DeploymentStrategy, typeof simulateSequentialDeployment> = {
		sequential: simulateSequentialDeployment,
		batch: simulateBatchDeployment,
		greedy: simulateGreedyDeployment,
		'nn-guided': simulateNNGuidedDeployment
	};

	for (const strategy of config.strategies) {
		const fn = strategyFns[strategy];
		results.push(fn(config, slots, rng, nnWeights));
	}

	return results;
}
