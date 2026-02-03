/**
 * Network Topology Implementations
 *
 * Implements different coordination topologies for swarm management:
 * - Centralized: all nodes communicate with single coordinator
 * - Hierarchical: nodes -> cluster coordinators -> regional -> central
 * - Mesh: peer-to-peer with gossip protocol
 */

import type { CoordinationTopology, SwarmNode, Cluster, Message } from './types';
import { SeededRandom } from '$lib/services/simulation-core';
import {
	createMessage,
	calculatePropagationDelay,
	MESSAGE_SIZES
} from './message-passing';
import { createCluster, createNode } from './coordinator-model';

/**
 * Topology configuration
 */
export interface TopologyConfig {
	nodeCount: number;
	clusterSize: number;
	topology: CoordinationTopology;
}

/**
 * Network structure based on topology
 */
export interface NetworkStructure {
	nodes: SwarmNode[];
	clusters: Cluster[];
	centralCoordinatorId: string;
	/** Adjacency map for mesh topology */
	meshNeighbors?: Map<string, string[]>;
}

/**
 * Initialize network structure based on topology
 */
export function initializeNetwork(
	config: TopologyConfig,
	rng: SeededRandom
): NetworkStructure {
	switch (config.topology) {
		case 'centralized':
			return initializeCentralized(config);
		case 'hierarchical':
			return initializeHierarchical(config, rng);
		case 'mesh':
			return initializeMesh(config, rng);
	}
}

/**
 * Initialize centralized topology
 * All nodes communicate with a single central coordinator
 */
function initializeCentralized(config: TopologyConfig): NetworkStructure {
	const nodes: SwarmNode[] = [];
	const clusterId = 'central';

	// Create central coordinator
	const centralId = 'central-coordinator';
	nodes.push(createNode(centralId, clusterId, true));

	// Create worker nodes
	for (let i = 0; i < config.nodeCount - 1; i++) {
		nodes.push(createNode(`node-${i}`, clusterId, false));
	}

	// Single cluster containing all nodes
	const cluster: Cluster = {
		id: clusterId,
		nodeIds: nodes.map((n) => n.id),
		coordinatorId: centralId,
		messagesProcessed: 0,
		lastHandoffTime: 0,
		failedHandoffs: 0
	};

	return {
		nodes,
		clusters: [cluster],
		centralCoordinatorId: centralId
	};
}

/**
 * Initialize hierarchical topology
 * Nodes -> Cluster Coordinators -> Regional Coordinators -> Central
 */
function initializeHierarchical(
	config: TopologyConfig,
	rng: SeededRandom
): NetworkStructure {
	const nodes: SwarmNode[] = [];
	const clusters: Cluster[] = [];

	const numClusters = Math.ceil(config.nodeCount / config.clusterSize);
	const numRegions = Math.ceil(numClusters / 10);

	// Track regional coordinators
	const regionalCoordinators: string[] = [];

	let nodeIndex = 0;
	for (let c = 0; c < numClusters; c++) {
		const regionId = Math.floor(c / 10);
		const clusterId = `cluster-${c}`;
		const nodesInCluster = Math.min(config.clusterSize, config.nodeCount - nodeIndex);

		// First node of each cluster is cluster coordinator
		const coordinatorId = `${clusterId}-node-0`;

		const { cluster, nodes: clusterNodes } = createCluster(
			clusterId,
			nodesInCluster,
			coordinatorId
		);

		// First cluster in each region has the regional coordinator
		if (c % 10 === 0) {
			regionalCoordinators.push(coordinatorId);
			cluster.regionalCoordinatorId = coordinatorId;
		} else {
			cluster.regionalCoordinatorId = regionalCoordinators[regionId];
		}

		nodes.push(...clusterNodes);
		clusters.push(cluster);
		nodeIndex += nodesInCluster;
	}

	// Central coordinator is the first regional coordinator
	const centralCoordinatorId = regionalCoordinators[0] || nodes[0]?.id || 'central-0';

	return {
		nodes,
		clusters,
		centralCoordinatorId
	};
}

/**
 * Initialize mesh topology with gossip neighbors
 * Each node has k random neighbors for gossip protocol
 */
function initializeMesh(
	config: TopologyConfig,
	rng: SeededRandom
): NetworkStructure {
	const nodes: SwarmNode[] = [];
	const meshNeighbors = new Map<string, string[]>();

	// Create all nodes (no formal clusters in mesh)
	for (let i = 0; i < config.nodeCount; i++) {
		const nodeId = `mesh-node-${i}`;
		nodes.push(createNode(nodeId, 'mesh', false));
	}

	// Select gossip fanout based on network size
	const gossipFanout = Math.min(5, Math.ceil(Math.log2(config.nodeCount)));

	// Assign random neighbors to each node
	for (const node of nodes) {
		const neighbors: string[] = [];
		const candidates = nodes.filter((n) => n.id !== node.id);

		// Randomly select k neighbors
		for (let i = 0; i < gossipFanout && candidates.length > 0; i++) {
			const idx = rng.nextInt(0, candidates.length);
			neighbors.push(candidates[idx].id);
			candidates.splice(idx, 1);
		}

		meshNeighbors.set(node.id, neighbors);
	}

	// No formal coordinator in mesh, but track one for compatibility
	const centralCoordinatorId = nodes[0]?.id || 'mesh-node-0';

	// Create a virtual single cluster for compatibility
	const cluster: Cluster = {
		id: 'mesh',
		nodeIds: nodes.map((n) => n.id),
		coordinatorId: centralCoordinatorId,
		messagesProcessed: 0,
		lastHandoffTime: 0,
		failedHandoffs: 0
	};

	return {
		nodes,
		clusters: [cluster],
		centralCoordinatorId,
		meshNeighbors
	};
}

/**
 * Get message routing for a topology
 * Returns list of (sender, receiver) pairs for an update propagation
 */
export function getMessageRouting(
	topology: CoordinationTopology,
	network: NetworkStructure,
	sourceNodeId: string
): Array<{ senderId: string; receiverId: string }> {
	switch (topology) {
		case 'centralized':
			return getCentralizedRouting(network, sourceNodeId);
		case 'hierarchical':
			return getHierarchicalRouting(network, sourceNodeId);
		case 'mesh':
			return getMeshRouting(network, sourceNodeId);
	}
}

/**
 * Centralized routing: all messages go to central coordinator
 */
function getCentralizedRouting(
	network: NetworkStructure,
	sourceNodeId: string
): Array<{ senderId: string; receiverId: string }> {
	if (sourceNodeId === network.centralCoordinatorId) {
		// Coordinator broadcasts to all
		return network.nodes
			.filter((n) => n.id !== sourceNodeId && n.status !== 'failed')
			.map((n) => ({ senderId: sourceNodeId, receiverId: n.id }));
	}

	// Node sends to coordinator
	return [{ senderId: sourceNodeId, receiverId: network.centralCoordinatorId }];
}

/**
 * Hierarchical routing: node -> cluster -> regional -> central
 */
function getHierarchicalRouting(
	network: NetworkStructure,
	sourceNodeId: string
): Array<{ senderId: string; receiverId: string }> {
	const routes: Array<{ senderId: string; receiverId: string }> = [];

	// Find source node's cluster
	const sourceNode = network.nodes.find((n) => n.id === sourceNodeId);
	if (!sourceNode) return routes;

	const cluster = network.clusters.find((c) => c.nodeIds.includes(sourceNodeId));
	if (!cluster) return routes;

	// If source is cluster coordinator, send to regional
	if (sourceNodeId === cluster.coordinatorId) {
		if (cluster.regionalCoordinatorId && cluster.regionalCoordinatorId !== sourceNodeId) {
			routes.push({
				senderId: sourceNodeId,
				receiverId: cluster.regionalCoordinatorId
			});
		}
		// Also broadcast to cluster members
		cluster.nodeIds
			.filter((id) => id !== sourceNodeId)
			.forEach((id) => {
				const node = network.nodes.find((n) => n.id === id);
				if (node && node.status !== 'failed') {
					routes.push({ senderId: sourceNodeId, receiverId: id });
				}
			});
	} else {
		// Regular node sends to cluster coordinator
		routes.push({
			senderId: sourceNodeId,
			receiverId: cluster.coordinatorId
		});
	}

	return routes;
}

/**
 * Mesh routing: gossip to neighbors
 */
function getMeshRouting(
	network: NetworkStructure,
	sourceNodeId: string
): Array<{ senderId: string; receiverId: string }> {
	const neighbors = network.meshNeighbors?.get(sourceNodeId) || [];

	return neighbors
		.filter((neighborId) => {
			const neighbor = network.nodes.find((n) => n.id === neighborId);
			return neighbor && neighbor.status !== 'failed';
		})
		.map((neighborId) => ({
			senderId: sourceNodeId,
			receiverId: neighborId
		}));
}

/**
 * Calculate number of hops for message propagation
 */
export function getHopCount(
	topology: CoordinationTopology,
	nodeCount: number,
	clusterSize: number
): number {
	switch (topology) {
		case 'centralized':
			// Direct: 1 hop to coordinator, 1 hop back
			return 2;

		case 'hierarchical': {
			// Node -> cluster -> regional -> central (and back)
			const numClusters = Math.ceil(nodeCount / clusterSize);
			const levels = 1 + Math.ceil(Math.log10(Math.max(1, numClusters)));
			return levels * 2;
		}

		case 'mesh': {
			// Gossip rounds: O(log N)
			return Math.ceil(Math.log2(nodeCount));
		}
	}
}

/**
 * Estimate bottleneck threshold for a topology
 * Returns node count where latency would exceed 1 second
 */
export function estimateBottleneckThreshold(
	topology: CoordinationTopology,
	clusterSize: number,
	bandwidthPerNodeKbps: number
): number {
	const targetLatencyMs = 1000;
	const processingDelayMs = 1;

	switch (topology) {
		case 'centralized': {
			// Bottleneck at central coordinator
			// Latency = light time + processing queue
			// Queue grows with N, processing limited by bandwidth
			const messagesPerSecond = (bandwidthPerNodeKbps * 1000) / (MESSAGE_SIZES.ephemeris * 8);
			// When queue depth exceeds latency target
			return Math.floor(messagesPerSecond * (targetLatencyMs / 1000));
		}

		case 'hierarchical': {
			// Bottleneck at cluster coordinators
			// Each coordinator handles clusterSize nodes
			// Multiple levels reduce central bottleneck
			const messagesPerSecond = (bandwidthPerNodeKbps * 1000) / (MESSAGE_SIZES.ephemeris * 8);
			const coordinatorCapacity = messagesPerSecond * (targetLatencyMs / 1000);
			// Can scale to many clusters
			return coordinatorCapacity * clusterSize * 100; // Up to 100 regions
		}

		case 'mesh': {
			// Bottleneck is gossip convergence time
			// Convergence = O(log N) rounds
			// Each round ~= light time + processing
			const roundTimeMs = 10 + processingDelayMs; // 10ms inter-node delay
			const maxRounds = targetLatencyMs / roundTimeMs;
			// N where log2(N) = maxRounds
			return Math.pow(2, maxRounds);
		}
	}
}
