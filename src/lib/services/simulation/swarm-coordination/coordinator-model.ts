/**
 * Coordinator Model
 *
 * Models coordinator duty cycle, power consumption, and handoff procedures
 * for swarm coordination.
 */

import type { SwarmNode, Cluster, NodeStatus } from './types';
import { SeededRandom } from '$lib/services/simulation-core';
import { MESSAGE_SIZES } from './message-passing';

/**
 * Coordinator handoff state transfer parameters
 */
const HANDOFF_STATE_SIZE_BYTES = 8192; // Cluster ephemeris data
const HANDOFF_VERIFICATION_ROUNDS = 3;
const HANDOFF_TIMEOUT_SECONDS = 30;

/**
 * Create a new swarm node
 */
export function createNode(
	id: string,
	clusterId: string,
	isCoordinator: boolean = false
): SwarmNode {
	return {
		id,
		status: isCoordinator ? 'coordinator' : 'operational',
		clusterId,
		isCoordinator,
		coordinatorTimeSeconds: 0,
		powerConsumedWh: 0,
		messagesSent: 0,
		messagesReceived: 0,
		lastUpdateTime: 0
	};
}

/**
 * Create a cluster with nodes
 */
export function createCluster(
	clusterId: string,
	nodeCount: number,
	coordinatorNodeId: string
): { cluster: Cluster; nodes: SwarmNode[] } {
	const nodes: SwarmNode[] = [];

	for (let i = 0; i < nodeCount; i++) {
		const nodeId = `${clusterId}-node-${i}`;
		const isCoordinator = nodeId === coordinatorNodeId;
		nodes.push(createNode(nodeId, clusterId, isCoordinator));
	}

	// If no coordinator was found in the created nodes, make the first one coordinator
	if (!nodes.some((n) => n.isCoordinator)) {
		const firstNode = nodes[0];
		if (firstNode) {
			firstNode.isCoordinator = true;
			firstNode.status = 'coordinator';
		}
	}

	return {
		cluster: {
			id: clusterId,
			nodeIds: nodes.map((n) => n.id),
			coordinatorId: nodes.find((n) => n.isCoordinator)?.id ?? nodes[0]?.id ?? coordinatorNodeId,
			messagesProcessed: 0,
			lastHandoffTime: 0,
			failedHandoffs: 0
		},
		nodes
	};
}

/**
 * Calculate power consumption for a node over a time period
 */
export function calculatePowerConsumption(
	node: SwarmNode,
	durationSeconds: number,
	basePowerW: number,
	coordinatorPowerW: number
): number {
	const hours = durationSeconds / 3600;
	const power = node.isCoordinator ? coordinatorPowerW : basePowerW;
	return power * hours;
}

/**
 * Update node power consumption
 */
export function updateNodePower(
	node: SwarmNode,
	durationSeconds: number,
	basePowerW: number,
	coordinatorPowerW: number
): SwarmNode {
	const powerWh = calculatePowerConsumption(node, durationSeconds, basePowerW, coordinatorPowerW);

	return {
		...node,
		powerConsumedWh: node.powerConsumedWh + powerWh,
		coordinatorTimeSeconds: node.isCoordinator
			? node.coordinatorTimeSeconds + durationSeconds
			: node.coordinatorTimeSeconds
	};
}

/**
 * Calculate coordinator availability based on failure rate and handoff success
 */
export function calculateCoordinatorAvailability(
	cluster: Cluster,
	nodes: SwarmNode[],
	simulationDurationSeconds: number
): number {
	// Find all coordinator time spent
	const totalCoordinatorTime = nodes
		.filter((n) => n.clusterId === cluster.id)
		.reduce((sum, n) => sum + n.coordinatorTimeSeconds, 0);

	// Calculate expected coordinator time (should equal simulation duration)
	const expectedTime = simulationDurationSeconds;

	// Account for handoff gaps
	const handoffGapSeconds = cluster.failedHandoffs * HANDOFF_TIMEOUT_SECONDS;
	const effectiveCoordinatorTime = Math.min(totalCoordinatorTime - handoffGapSeconds, expectedTime);

	return (effectiveCoordinatorTime / expectedTime) * 100;
}

/**
 * Perform coordinator handoff
 * Returns success status and updated cluster/nodes
 */
export function performHandoff(
	cluster: Cluster,
	nodes: SwarmNode[],
	currentTime: number,
	rng: SeededRandom
): {
	success: boolean;
	cluster: Cluster;
	nodes: SwarmNode[];
	newCoordinatorId: string | null;
} {
	// Find current coordinator
	const currentCoordinator = nodes.find(
		(n) => n.id === cluster.coordinatorId && n.status !== 'failed'
	);

	// Find eligible candidates (operational nodes in cluster, not the current coordinator)
	const candidates = nodes.filter(
		(n) =>
			n.clusterId === cluster.id &&
			n.status === 'operational' &&
			n.id !== cluster.coordinatorId
	);

	if (candidates.length === 0) {
		// No candidates available - handoff fails
		return {
			success: false,
			cluster: {
				...cluster,
				failedHandoffs: cluster.failedHandoffs + 1,
				lastHandoffTime: currentTime
			},
			nodes,
			newCoordinatorId: null
		};
	}

	// Select new coordinator (prefer least used)
	candidates.sort((a, b) => a.coordinatorTimeSeconds - b.coordinatorTimeSeconds);
	const newCoordinator = candidates[0];

	// Simulate handoff verification (small failure probability)
	const handoffFailureProbability = 0.01; // 1% chance of handoff failure
	if (rng.next() < handoffFailureProbability) {
		return {
			success: false,
			cluster: {
				...cluster,
				failedHandoffs: cluster.failedHandoffs + 1,
				lastHandoffTime: currentTime
			},
			nodes,
			newCoordinatorId: null
		};
	}

	// Perform successful handoff
	const updatedNodes = nodes.map((n) => {
		if (n.id === cluster.coordinatorId) {
			// Demote old coordinator
			return {
				...n,
				isCoordinator: false,
				status: 'operational' as NodeStatus
			};
		} else if (n.id === newCoordinator.id) {
			// Promote new coordinator
			return {
				...n,
				isCoordinator: true,
				status: 'coordinator' as NodeStatus
			};
		}
		return n;
	});

	return {
		success: true,
		cluster: {
			...cluster,
			coordinatorId: newCoordinator.id,
			lastHandoffTime: currentTime
		},
		nodes: updatedNodes,
		newCoordinatorId: newCoordinator.id
	};
}

/**
 * Calculate power variance across nodes
 */
export function calculatePowerVariance(nodes: SwarmNode[]): number {
	if (nodes.length === 0) return 0;

	const powers = nodes.map((n) => n.powerConsumedWh);
	const mean = powers.reduce((a, b) => a + b, 0) / powers.length;

	if (mean === 0) return 0;

	const variance = powers.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / powers.length;
	const stdDev = Math.sqrt(variance);

	// Return coefficient of variation as percentage
	return (stdDev / mean) * 100;
}

/**
 * Handle node failure
 */
export function failNode(node: SwarmNode, failureTime: number): SwarmNode {
	return {
		...node,
		status: 'failed',
		isCoordinator: false,
		failureTime
	};
}

/**
 * Check if coordinator handoff is needed
 */
export function needsHandoff(
	cluster: Cluster,
	currentTime: number,
	dutyCycleSeconds: number
): boolean {
	return currentTime - cluster.lastHandoffTime >= dutyCycleSeconds;
}

/**
 * Get operational nodes in a cluster
 */
export function getOperationalNodes(nodes: SwarmNode[], clusterId: string): SwarmNode[] {
	return nodes.filter(
		(n) => n.clusterId === clusterId && (n.status === 'operational' || n.status === 'coordinator')
	);
}

/**
 * Calculate handoff state transfer time
 */
export function calculateHandoffTime(bandwidthKbps: number): number {
	// Time to transfer cluster state
	const transferTimeSeconds = (HANDOFF_STATE_SIZE_BYTES * 8) / (bandwidthKbps * 1000);
	// Add verification rounds
	const verificationTimeSeconds = HANDOFF_VERIFICATION_ROUNDS * 0.1; // 100ms per round

	return transferTimeSeconds + verificationTimeSeconds;
}

/**
 * Calculate total energy consumed by all nodes in kWh
 */
export function calculateTotalEnergy(nodes: SwarmNode[]): number {
	return nodes.reduce((sum, n) => sum + n.powerConsumedWh, 0) / 1000;
}
