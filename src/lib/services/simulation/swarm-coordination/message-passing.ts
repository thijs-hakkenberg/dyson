/**
 * Message Passing Model
 *
 * Models communication patterns and bandwidth requirements for swarm coordination.
 * Calculates message propagation delays and tracks queue depths.
 */

import type { CoordinationTopology, Message, PropagationStats, SwarmNode, Cluster, TDMAFeasibilityResult } from './types';

/**
 * Speed of light for communication delays (km/s)
 */
const SPEED_OF_LIGHT_KM_S = 299792;

/**
 * Typical inter-node distance in Dyson swarm (km)
 * Assuming 1 AU orbit with millions of elements
 */
const INTER_NODE_DISTANCE_KM = 1000;

/**
 * Regional coordinator distance (km)
 * For hierarchical topology
 */
const REGIONAL_DISTANCE_KM = 50000;

/**
 * Central coordinator distance (km)
 * Average distance to central coordinator
 */
const CENTRAL_DISTANCE_KM = 150000000; // ~1 AU average

/**
 * Message sizes in bytes
 */
export const MESSAGE_SIZES = {
	ephemeris: 256, // Position, velocity, acceleration
	heartbeat: 32, // Simple alive signal
	handoff: 8192, // Full cluster state transfer
	gossip: 128, // Gossip round update
	collision: 64 // Collision warning
};

/**
 * Calculate light-time delay between nodes
 */
export function lightTimeDelay(distanceKm: number): number {
	return (distanceKm / SPEED_OF_LIGHT_KM_S) * 1000; // milliseconds
}

/**
 * Calculate bandwidth requirements by topology
 * Returns bandwidth in kbps required for the given topology and node count
 */
export function calculateBandwidthRequirement(
	topology: CoordinationTopology,
	nodeCount: number,
	clusterSize: number,
	updateIntervalSeconds: number
): number {
	const ephemerisSize = MESSAGE_SIZES.ephemeris;
	const heartbeatSize = MESSAGE_SIZES.heartbeat;

	switch (topology) {
		case 'centralized': {
			// Each node sends ephemeris to central coordinator
			// O(N) messages per update interval
			const messagesPerSecond = nodeCount / updateIntervalSeconds;
			const bitsPerSecond = messagesPerSecond * ephemerisSize * 8;
			return bitsPerSecond / 1000; // kbps
		}

		case 'hierarchical': {
			// Nodes send to cluster coordinator, which aggregates and sends up
			// O(N/clusterSize) messages at regional level
			const numClusters = Math.ceil(nodeCount / clusterSize);
			const numRegions = Math.ceil(numClusters / 10); // 10 clusters per region

			// Intra-cluster messages
			const clusterMessages = nodeCount / updateIntervalSeconds;
			// Cluster to region messages (aggregated)
			const regionMessages = numClusters / updateIntervalSeconds;
			// Region to central messages
			const centralMessages = numRegions / updateIntervalSeconds;

			const totalMessages = clusterMessages + regionMessages + centralMessages;
			const bitsPerSecond = totalMessages * ephemerisSize * 8;
			return bitsPerSecond / 1000;
		}

		case 'mesh': {
			// Gossip protocol: each node contacts k neighbors per round
			// O(N) total bandwidth but distributed
			const gossipFanout = Math.min(5, Math.ceil(Math.log2(nodeCount)));
			const gossipRounds = Math.ceil(Math.log2(nodeCount)); // Rounds to propagate

			const messagesPerRound = nodeCount * gossipFanout;
			const roundsPerSecond = 1 / updateIntervalSeconds;
			const messagesPerSecond = messagesPerRound * roundsPerSecond / gossipRounds;

			const bitsPerSecond = messagesPerSecond * MESSAGE_SIZES.gossip * 8;
			return bitsPerSecond / 1000;
		}
	}
}

/**
 * Calculate message propagation delay for a topology
 * Returns expected delay in milliseconds
 */
export function calculatePropagationDelay(
	topology: CoordinationTopology,
	nodeCount: number,
	clusterSize: number,
	processingDelayMs: number = 1
): number {
	switch (topology) {
		case 'centralized': {
			// Direct to central coordinator + response
			// Light time dominates
			return lightTimeDelay(CENTRAL_DISTANCE_KM) * 2 + processingDelayMs;
		}

		case 'hierarchical': {
			// Node -> cluster coordinator -> regional -> central -> back
			const numClusters = Math.ceil(nodeCount / clusterSize);
			const hops = 1 + Math.ceil(Math.log10(numClusters)); // Number of hierarchy levels

			const localDelay = lightTimeDelay(INTER_NODE_DISTANCE_KM);
			const regionalDelay = lightTimeDelay(REGIONAL_DISTANCE_KM);
			const centralDelay = lightTimeDelay(CENTRAL_DISTANCE_KM);

			// Weighted by number of hops at each level
			return localDelay + regionalDelay * (hops - 1) + processingDelayMs * hops;
		}

		case 'mesh': {
			// Gossip propagation: O(log N) rounds
			const gossipRounds = Math.ceil(Math.log2(nodeCount));
			const roundDelay = lightTimeDelay(INTER_NODE_DISTANCE_KM) + processingDelayMs;

			return gossipRounds * roundDelay;
		}
	}
}

/**
 * Calculate communication overhead as percentage of total capacity
 */
export function calculateCommunicationOverhead(
	requiredBandwidthKbps: number,
	bandwidthPerNodeKbps: number,
	nodeCount: number
): number {
	const totalCapacityKbps = bandwidthPerNodeKbps * nodeCount;
	return (requiredBandwidthKbps / totalCapacityKbps) * 100;
}

/**
 * Message queue model for congestion simulation
 */
export class MessageQueue {
	private queue: Message[] = [];
	private totalProcessed: number = 0;
	private totalDropped: number = 0;
	private propagationTimes: number[] = [];
	private maxQueueSize: number;

	constructor(maxQueueSize: number = 10000) {
		this.maxQueueSize = maxQueueSize;
	}

	/**
	 * Enqueue a message
	 * Returns true if message was queued, false if dropped
	 */
	enqueue(message: Message): boolean {
		if (this.queue.length >= this.maxQueueSize) {
			this.totalDropped++;
			return false;
		}
		this.queue.push(message);
		return true;
	}

	/**
	 * Dequeue and process a message
	 */
	dequeue(currentTime: number): Message | undefined {
		if (this.queue.length === 0) return undefined;

		// Sort by send time (FIFO)
		this.queue.sort((a, b) => a.sendTime - b.sendTime);
		const message = this.queue.shift()!;

		message.receiveTime = currentTime;
		message.delivered = true;
		this.totalProcessed++;

		const propagationMs = (currentTime - message.sendTime) * 1000;
		this.propagationTimes.push(propagationMs);

		return message;
	}

	/**
	 * Process messages up to bandwidth limit
	 */
	processMessages(
		currentTime: number,
		bandwidthBps: number,
		durationSeconds: number
	): Message[] {
		const processed: Message[] = [];
		let bytesProcessed = 0;
		const maxBytes = (bandwidthBps * durationSeconds) / 8;

		while (this.queue.length > 0 && bytesProcessed < maxBytes) {
			const message = this.queue[0];
			if (bytesProcessed + message.sizeBytes > maxBytes) break;

			const dequeued = this.dequeue(currentTime);
			if (dequeued) {
				processed.push(dequeued);
				bytesProcessed += dequeued.sizeBytes;
			}
		}

		return processed;
	}

	/**
	 * Get current queue depth
	 */
	size(): number {
		return this.queue.length;
	}

	/**
	 * Get queue statistics
	 */
	getStats(): { processed: number; dropped: number; dropRate: number } {
		const total = this.totalProcessed + this.totalDropped;
		return {
			processed: this.totalProcessed,
			dropped: this.totalDropped,
			dropRate: total > 0 ? this.totalDropped / total : 0
		};
	}

	/**
	 * Get propagation time statistics
	 */
	getPropagationStats(): PropagationStats {
		if (this.propagationTimes.length === 0) {
			return {
				avgPropagationMs: 0,
				maxPropagationMs: 0,
				p95PropagationMs: 0,
				messageCount: 0
			};
		}

		const sorted = [...this.propagationTimes].sort((a, b) => a - b);
		const sum = sorted.reduce((a, b) => a + b, 0);
		const p95Index = Math.floor(sorted.length * 0.95);

		return {
			avgPropagationMs: sum / sorted.length,
			maxPropagationMs: sorted[sorted.length - 1],
			p95PropagationMs: sorted[p95Index],
			messageCount: sorted.length
		};
	}

	/**
	 * Clear the queue
	 */
	clear(): void {
		this.queue = [];
	}
}

/**
 * Create a message for transmission
 */
export function createMessage(
	senderId: string,
	receiverId: string,
	messageType: Message['messageType'],
	sendTime: number
): Message {
	return {
		id: `msg-${senderId}-${receiverId}-${sendTime.toFixed(3)}`,
		senderId,
		receiverId,
		sizeBytes: MESSAGE_SIZES[messageType] || MESSAGE_SIZES.ephemeris,
		sendTime,
		delivered: false,
		messageType
	};
}

/**
 * Calculate message count by topology for a given time period
 */
export function estimateMessageCount(
	topology: CoordinationTopology,
	nodeCount: number,
	clusterSize: number,
	durationSeconds: number,
	updateIntervalSeconds: number
): number {
	const updates = Math.ceil(durationSeconds / updateIntervalSeconds);

	switch (topology) {
		case 'centralized':
			// Every node sends to central each update
			return nodeCount * updates;

		case 'hierarchical': {
			// Nodes to cluster + cluster to region + region to central
			const numClusters = Math.ceil(nodeCount / clusterSize);
			const numRegions = Math.ceil(numClusters / 10);

			const nodeMessages = nodeCount * updates;
			const clusterMessages = numClusters * updates;
			const regionMessages = numRegions * updates;

			return nodeMessages + clusterMessages + regionMessages;
		}

		case 'mesh': {
			// Gossip: each node contacts k neighbors per round
			const gossipFanout = Math.min(5, Math.ceil(Math.log2(nodeCount)));
			const gossipRounds = Math.ceil(Math.log2(nodeCount));

			return nodeCount * gossipFanout * gossipRounds * updates;
		}
	}
}

/**
 * TDMA slot efficiency parameters (CCSDS Proximity-1)
 */
const TDMA_DEFAULTS = {
	S_eph: 256, // Status report size in bytes
	S_cmd: 512, // Command size in bytes
	R_FEC: 7 / 8, // FEC code rate
	O_frame: 104, // Framing overhead bits (ASM 32 + addr 8 + ctrl 16 + CRC-32 32 + HDLC 16)
	T_guard_ms: 4.7, // Guard time ms
	T_acq_ms: 5.0, // Acquisition time ms
	C_node_kbps: 1.0 // Per-node bandwidth allocation
};

/**
 * Compute TDMA slot efficiency gamma at a given PHY rate.
 * Eq. 3 from Paper 02: gamma = T_payload / T_slot
 */
export function computeGamma(
	phyRateKbps: number,
	params: Partial<typeof TDMA_DEFAULTS> = {}
): number {
	const p = { ...TDMA_DEFAULTS, ...params };
	const R_PHY = phyRateKbps * 1000; // bps

	const T_payload = (p.S_eph * 8) / R_PHY;
	const T_FEC = ((p.S_eph * 8) * (1 / p.R_FEC - 1)) / R_PHY;
	const T_framing = p.O_frame / (p.R_FEC * R_PHY);
	const T_guard = p.T_guard_ms / 1000;
	const T_acq = p.T_acq_ms / 1000;

	const T_slot = T_payload + T_FEC + T_framing + T_guard + T_acq;
	return T_payload / T_slot;
}

/**
 * Compute two-test TDMA feasibility for given configuration.
 * Implements Paper 02 Algorithm 1.
 */
export function computeTDMAFeasibility(
	clusterSize: number,
	phyRateKbps: number,
	campaignDutyFactor: number,
	commandProbability: number,
	cyclePeriodS: number = 10
): TDMAFeasibilityResult {
	const p = TDMA_DEFAULTS;
	const k_c = clusterSize;
	const T_c = cyclePeriodS;
	const d = campaignDutyFactor;
	const p_cmd = commandProbability;

	// Gamma
	const gamma = computeGamma(phyRateKbps);

	// Test A: Byte budget
	const etaBaseline = 0.205; // 20.5%
	const etaArchitecture = 0.056; // 5.6% (heartbeats + summaries + elections)
	const etaCmd = (p_cmd * p.S_cmd * 8) / (p.C_node_kbps * 1000 * T_c);
	const etaCommand = d * etaCmd;
	const etaTotal = etaArchitecture + etaCommand + etaBaseline;
	const testAPasses = etaTotal <= 1.0;

	// Test B: TDMA schedulability
	const R_PHY = phyRateKbps * 1000;
	const T_slot_s =
		(p.S_eph * 8 + p.O_frame) / p.R_FEC / R_PHY + p.T_guard_ms / 1000 + p.T_acq_ms / 1000;
	const T_ing = (k_c - 1) * T_slot_s;

	// Egress: command + heartbeat + sync
	const T_cmd =
		(p.S_cmd * 8 + p.O_frame) / p.R_FEC / R_PHY + p.T_guard_ms / 1000 + p.T_acq_ms / 1000;
	const T_hb = 0.02; // ~20ms heartbeat
	const T_sync = 0.005; // ~5ms sync beacon
	const T_egr = T_cmd + T_hb + T_sync;

	// ARQ estimate (P95 failed members under GE channel)
	const pi_B = 0.091; // Steady-state bad probability
	const p_B = 0.9; // Per-packet loss in bad state
	const expectedFailed = (k_c - 1) * pi_B * p_B;
	const p95Failed = Math.ceil(
		expectedFailed + 2 * Math.sqrt(expectedFailed * (1 - pi_B * p_B))
	);
	const M_r = 2; // Max retransmissions
	const T_ARQ = p95Failed * M_r * T_slot_s;

	const totalTime = T_ing + T_ARQ + T_egr;
	const marginMs = (T_c - totalTime) * 1000;
	const testBPasses = totalTime <= T_c;

	// Derived quantities
	const coordInfoRateKbps = ((k_c - 1) * p.S_eph * 8) / (T_c * 1000);
	const alphaRX = T_ing / T_c;
	const minPhyRateKbps = coordInfoRateKbps / (gamma * Math.min(alphaRX, 0.95));

	return {
		gamma,
		etaTotal,
		etaArchitecture,
		etaCommand,
		etaBaseline,
		testAPasses,
		testBPasses,
		ingressTimeMs: T_ing * 1000,
		egressTimeMs: T_egr * 1000,
		arqTimeMs: T_ARQ * 1000,
		marginMs,
		coordInfoRateKbps,
		minPhyRateKbps,
		alphaRX,
		feasible: testAPasses && testBPasses
	};
}
