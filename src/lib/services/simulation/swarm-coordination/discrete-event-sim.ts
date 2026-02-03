/**
 * Discrete Event Simulator for Swarm Coordination
 *
 * Event queue priority implementation for simulating swarm coordination
 * at scale. Processes events by type and tracks simulation state.
 */

import { SeededRandom } from '$lib/services/simulation-core';
import type {
	SwarmCoordinationConfig,
	SwarmCoordinationRunResult,
	SimEvent,
	EventType,
	SwarmNode,
	Cluster,
	Message
} from './types';
import {
	initializeNetwork,
	getMessageRouting,
	estimateBottleneckThreshold,
	type NetworkStructure
} from './topology';
import {
	MessageQueue,
	createMessage,
	calculateBandwidthRequirement,
	calculatePropagationDelay,
	calculateCommunicationOverhead,
	estimateMessageCount
} from './message-passing';
import {
	updateNodePower,
	performHandoff,
	needsHandoff,
	failNode,
	calculatePowerVariance,
	calculateCoordinatorAvailability,
	calculateTotalEnergy,
	getOperationalNodes
} from './coordinator-model';

/**
 * Event queue using binary heap for priority ordering
 */
class EventQueue {
	private heap: SimEvent[] = [];

	push(event: SimEvent): void {
		this.heap.push(event);
		this.bubbleUp(this.heap.length - 1);
	}

	pop(): SimEvent | undefined {
		if (this.heap.length === 0) return undefined;
		if (this.heap.length === 1) return this.heap.pop();

		const min = this.heap[0];
		this.heap[0] = this.heap.pop()!;
		this.bubbleDown(0);
		return min;
	}

	peek(): SimEvent | undefined {
		return this.heap[0];
	}

	isEmpty(): boolean {
		return this.heap.length === 0;
	}

	size(): number {
		return this.heap.length;
	}

	private bubbleUp(index: number): void {
		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);
			if (this.heap[parentIndex].time <= this.heap[index].time) break;
			this.swap(parentIndex, index);
			index = parentIndex;
		}
	}

	private bubbleDown(index: number): void {
		const length = this.heap.length;
		while (true) {
			const leftChild = 2 * index + 1;
			const rightChild = 2 * index + 2;
			let smallest = index;

			if (leftChild < length && this.heap[leftChild].time < this.heap[smallest].time) {
				smallest = leftChild;
			}
			if (rightChild < length && this.heap[rightChild].time < this.heap[smallest].time) {
				smallest = rightChild;
			}

			if (smallest === index) break;
			this.swap(index, smallest);
			index = smallest;
		}
	}

	private swap(i: number, j: number): void {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}
}

/**
 * Simulation state
 */
interface SimulationState {
	currentTime: number;
	network: NetworkStructure;
	messageQueue: MessageQueue;
	totalMessagesSent: number;
	totalMessagesDelivered: number;
	propagationTimes: number[];
}

/**
 * Discrete Event Simulator for Swarm Coordination
 */
export class SwarmCoordinationSimulator {
	private config: SwarmCoordinationConfig;
	private rng: SeededRandom;
	private eventQueue: EventQueue;
	private state: SimulationState;
	private readonly secondsPerDay = 86400;
	private simulationDurationSeconds: number;
	private dutyCycleSeconds: number;

	constructor(config: SwarmCoordinationConfig) {
		this.config = config;
		this.rng = new SeededRandom(config.seed ?? Date.now());
		this.eventQueue = new EventQueue();
		this.simulationDurationSeconds = config.simulationDays * this.secondsPerDay;
		this.dutyCycleSeconds = config.coordinatorDutyCycleHours * 3600;

		// Initialize network structure based on topology
		const network = initializeNetwork(
			{
				nodeCount: config.nodeCount,
				clusterSize: config.clusterSize,
				topology: config.coordinationTopology
			},
			this.rng
		);

		this.state = {
			currentTime: 0,
			network,
			messageQueue: new MessageQueue(config.nodeCount * 10),
			totalMessagesSent: 0,
			totalMessagesDelivered: 0,
			propagationTimes: []
		};

		this.initializeSimulation();
	}

	/**
	 * Initialize simulation with starting events
	 */
	private initializeSimulation(): void {
		// Schedule initial state sync events
		this.scheduleStateSyncEvents(0);

		// Schedule coordinator handoff events for hierarchical topology
		if (this.config.coordinationTopology === 'hierarchical') {
			this.scheduleHandoffEvents(0);
		}

		// Schedule node failure events
		this.scheduleFailureEvents();

		// For mesh topology, schedule gossip rounds
		if (this.config.coordinationTopology === 'mesh') {
			this.scheduleGossipRounds(0);
		}
	}

	/**
	 * Schedule periodic state synchronization events
	 */
	private scheduleStateSyncEvents(startTime: number): void {
		// Sync interval based on topology
		const syncIntervalSeconds =
			this.config.coordinationTopology === 'mesh'
				? 60 // Mesh gossip every minute
				: 10; // Centralized/hierarchical every 10 seconds

		let time = startTime;
		while (time < this.simulationDurationSeconds) {
			// Sample a subset of nodes to reduce event count for large swarms
			const sampleRate = Math.min(1, 1000 / this.config.nodeCount);
			const nodesToSync = this.state.network.nodes.filter(
				(n) => n.status !== 'failed' && this.rng.next() < sampleRate
			);

			for (const node of nodesToSync) {
				this.eventQueue.push({
					type: 'state_sync',
					time,
					nodeId: node.id,
					clusterId: node.clusterId
				});
			}

			time += syncIntervalSeconds;
		}
	}

	/**
	 * Schedule coordinator handoff events
	 */
	private scheduleHandoffEvents(startTime: number): void {
		let time = startTime + this.dutyCycleSeconds;

		while (time < this.simulationDurationSeconds) {
			for (const cluster of this.state.network.clusters) {
				this.eventQueue.push({
					type: 'coordinator_handoff',
					time,
					nodeId: cluster.coordinatorId,
					clusterId: cluster.id
				});
			}
			time += this.dutyCycleSeconds;
		}
	}

	/**
	 * Schedule gossip rounds for mesh topology
	 */
	private scheduleGossipRounds(startTime: number): void {
		const gossipIntervalSeconds = 60;
		let time = startTime;

		while (time < this.simulationDurationSeconds) {
			this.eventQueue.push({
				type: 'gossip_round',
				time,
				nodeId: 'mesh-coordinator',
				data: { round: Math.floor(time / gossipIntervalSeconds) }
			});
			time += gossipIntervalSeconds;
		}
	}

	/**
	 * Schedule node failure events based on failure rate
	 */
	private scheduleFailureEvents(): void {
		const annualRate = this.config.nodeFailureRatePerYear;
		const secondsPerYear = 365 * 24 * 3600;
		const ratePerSecond = annualRate / secondsPerYear;

		for (const node of this.state.network.nodes) {
			// Skip coordinator for now (they have backup)
			if (node.isCoordinator) continue;

			// Generate time to failure using exponential distribution
			const failureTime = this.rng.nextExponential(ratePerSecond);

			if (failureTime < this.simulationDurationSeconds) {
				this.eventQueue.push({
					type: 'node_failure',
					time: failureTime,
					nodeId: node.id,
					clusterId: node.clusterId
				});
			}
		}
	}

	/**
	 * Run the simulation
	 */
	run(): SwarmCoordinationRunResult {
		let eventsProcessed = 0;
		const maxEvents = this.config.nodeCount * this.config.simulationDays * 10; // Cap events

		while (!this.eventQueue.isEmpty() && eventsProcessed < maxEvents) {
			const event = this.eventQueue.pop()!;

			if (event.time > this.simulationDurationSeconds) break;

			// Update power consumption for elapsed time
			this.updatePowerConsumption(event.time - this.state.currentTime);
			this.state.currentTime = event.time;

			this.processEvent(event);
			eventsProcessed++;
		}

		// Final power update
		const remainingTime = this.simulationDurationSeconds - this.state.currentTime;
		if (remainingTime > 0) {
			this.updatePowerConsumption(remainingTime);
		}

		return this.generateResult();
	}

	/**
	 * Process a single event
	 */
	private processEvent(event: SimEvent): void {
		switch (event.type) {
			case 'state_sync':
				this.handleStateSync(event);
				break;

			case 'message_send':
				this.handleMessageSend(event);
				break;

			case 'message_receive':
				this.handleMessageReceive(event);
				break;

			case 'coordinator_handoff':
				this.handleCoordinatorHandoff(event);
				break;

			case 'node_failure':
				this.handleNodeFailure(event);
				break;

			case 'node_recovery':
				this.handleNodeRecovery(event);
				break;

			case 'gossip_round':
				this.handleGossipRound(event);
				break;

			case 'collision_warning':
				this.handleCollisionWarning(event);
				break;
		}
	}

	/**
	 * Handle state synchronization event
	 */
	private handleStateSync(event: SimEvent): void {
		const node = this.state.network.nodes.find((n) => n.id === event.nodeId);
		if (!node || node.status === 'failed') return;

		// Get message routing for this topology
		const routes = getMessageRouting(
			this.config.coordinationTopology,
			this.state.network,
			event.nodeId
		);

		// Create and queue messages
		for (const route of routes) {
			const message = createMessage(
				route.senderId,
				route.receiverId,
				'ephemeris',
				this.state.currentTime
			);

			const enqueued = this.state.messageQueue.enqueue(message);
			if (enqueued) {
				this.state.totalMessagesSent++;

				// Update sender stats
				const sender = this.state.network.nodes.find((n) => n.id === route.senderId);
				if (sender) {
					sender.messagesSent++;
				}

				// Schedule receive event
				const delay = calculatePropagationDelay(
					this.config.coordinationTopology,
					this.config.nodeCount,
					this.config.clusterSize
				) / 1000; // Convert ms to seconds

				this.eventQueue.push({
					type: 'message_receive',
					time: this.state.currentTime + delay,
					nodeId: route.receiverId,
					data: { messageId: message.id }
				});
			}
		}

		// Update node's last update time
		node.lastUpdateTime = this.state.currentTime;
	}

	/**
	 * Handle message send event
	 */
	private handleMessageSend(event: SimEvent): void {
		// Message sending is handled in state_sync
		// This event type is for explicit sends
	}

	/**
	 * Handle message receive event
	 */
	private handleMessageReceive(event: SimEvent): void {
		const node = this.state.network.nodes.find((n) => n.id === event.nodeId);
		if (!node || node.status === 'failed') return;

		// Process messages from queue
		const bandwidthBps = this.config.bandwidthPerNodeKbps * 1000;
		const processed = this.state.messageQueue.processMessages(
			this.state.currentTime,
			bandwidthBps,
			0.1 // Process 100ms worth of messages
		);

		for (const msg of processed) {
			this.state.totalMessagesDelivered++;

			// Track propagation time
			if (msg.receiveTime !== undefined) {
				const propagationMs = (msg.receiveTime - msg.sendTime) * 1000;
				this.state.propagationTimes.push(propagationMs);
			}

			// Update receiver stats
			const receiver = this.state.network.nodes.find((n) => n.id === msg.receiverId);
			if (receiver) {
				receiver.messagesReceived++;
				receiver.lastUpdateTime = this.state.currentTime;
			}
		}
	}

	/**
	 * Handle coordinator handoff event
	 */
	private handleCoordinatorHandoff(event: SimEvent): void {
		const cluster = this.state.network.clusters.find((c) => c.id === event.clusterId);
		if (!cluster) return;

		// Check if handoff is actually needed
		if (!needsHandoff(cluster, this.state.currentTime, this.dutyCycleSeconds)) {
			return;
		}

		// Perform handoff
		const result = performHandoff(
			cluster,
			this.state.network.nodes,
			this.state.currentTime,
			this.rng
		);

		// Update cluster
		const clusterIndex = this.state.network.clusters.findIndex((c) => c.id === cluster.id);
		if (clusterIndex >= 0) {
			this.state.network.clusters[clusterIndex] = result.cluster;
		}

		// Update nodes
		this.state.network.nodes = result.nodes;
	}

	/**
	 * Handle node failure event
	 */
	private handleNodeFailure(event: SimEvent): void {
		const nodeIndex = this.state.network.nodes.findIndex((n) => n.id === event.nodeId);
		if (nodeIndex < 0) return;

		const node = this.state.network.nodes[nodeIndex];
		if (node.status === 'failed') return;

		// Fail the node
		this.state.network.nodes[nodeIndex] = failNode(node, this.state.currentTime);

		// If this was a coordinator, trigger emergency handoff
		if (node.isCoordinator) {
			const cluster = this.state.network.clusters.find((c) => c.coordinatorId === node.id);
			if (cluster) {
				this.eventQueue.push({
					type: 'coordinator_handoff',
					time: this.state.currentTime + 1, // Immediate handoff
					nodeId: node.id,
					clusterId: cluster.id
				});
			}
		}

		// Schedule recovery (MTTR = 1-7 days)
		const mttrSeconds = this.rng.nextRange(1, 7) * this.secondsPerDay;
		if (this.state.currentTime + mttrSeconds < this.simulationDurationSeconds) {
			this.eventQueue.push({
				type: 'node_recovery',
				time: this.state.currentTime + mttrSeconds,
				nodeId: event.nodeId,
				clusterId: event.clusterId
			});
		}
	}

	/**
	 * Handle node recovery event
	 */
	private handleNodeRecovery(event: SimEvent): void {
		const nodeIndex = this.state.network.nodes.findIndex((n) => n.id === event.nodeId);
		if (nodeIndex < 0) return;

		const node = this.state.network.nodes[nodeIndex];
		if (node.status !== 'failed') return;

		// Recover the node
		this.state.network.nodes[nodeIndex] = {
			...node,
			status: 'operational',
			failureTime: undefined
		};
	}

	/**
	 * Handle gossip round for mesh topology
	 */
	private handleGossipRound(event: SimEvent): void {
		if (this.config.coordinationTopology !== 'mesh') return;

		// Each operational node gossips to its neighbors
		const operationalNodes = this.state.network.nodes.filter((n) => n.status !== 'failed');

		// Sample nodes to reduce computational load
		const sampleRate = Math.min(1, 1000 / operationalNodes.length);
		const sampledNodes = operationalNodes.filter(() => this.rng.next() < sampleRate);

		for (const node of sampledNodes) {
			const neighbors = this.state.network.meshNeighbors?.get(node.id) || [];

			for (const neighborId of neighbors) {
				const neighbor = this.state.network.nodes.find((n) => n.id === neighborId);
				if (!neighbor || neighbor.status === 'failed') continue;

				const message = createMessage(
					node.id,
					neighborId,
					'gossip',
					this.state.currentTime
				);

				if (this.state.messageQueue.enqueue(message)) {
					this.state.totalMessagesSent++;
					node.messagesSent++;
				}
			}
		}
	}

	/**
	 * Handle collision warning event
	 */
	private handleCollisionWarning(event: SimEvent): void {
		// Collision warnings are high priority broadcasts
		// For now, just track them as messages
		this.state.totalMessagesSent++;
	}

	/**
	 * Update power consumption for all nodes
	 */
	private updatePowerConsumption(elapsedSeconds: number): void {
		if (elapsedSeconds <= 0) return;

		this.state.network.nodes = this.state.network.nodes.map((node) =>
			updateNodePower(
				node,
				elapsedSeconds,
				this.config.basePowerW,
				this.config.coordinatorPowerW
			)
		);
	}

	/**
	 * Generate final simulation result
	 */
	private generateResult(): SwarmCoordinationRunResult {
		const queueStats = this.state.messageQueue.getStats();
		const propagationStats = this.state.messageQueue.getPropagationStats();

		// Calculate bandwidth requirement and overhead
		const requiredBandwidthKbps = calculateBandwidthRequirement(
			this.config.coordinationTopology,
			this.config.nodeCount,
			this.config.clusterSize,
			10 // 10 second update interval
		);

		const communicationOverhead = calculateCommunicationOverhead(
			requiredBandwidthKbps,
			this.config.bandwidthPerNodeKbps,
			this.config.nodeCount
		);

		// Calculate bottleneck threshold
		const bottleneckThreshold = estimateBottleneckThreshold(
			this.config.coordinationTopology,
			this.config.clusterSize,
			this.config.bandwidthPerNodeKbps
		);

		// Calculate coordinator availability
		let coordinatorAvailability = 100;
		if (this.config.coordinationTopology === 'hierarchical') {
			const availabilities = this.state.network.clusters.map((cluster) =>
				calculateCoordinatorAvailability(
					cluster,
					this.state.network.nodes,
					this.simulationDurationSeconds
				)
			);
			coordinatorAvailability =
				availabilities.reduce((a, b) => a + b, 0) / availabilities.length;
		}

		// Calculate power variance
		const powerVariance = calculatePowerVariance(this.state.network.nodes);

		// Calculate failed handoffs
		const totalFailedHandoffs = this.state.network.clusters.reduce(
			(sum, c) => sum + c.failedHandoffs,
			0
		);

		// Calculate propagation times from stored data
		let avgPropagation = propagationStats.avgPropagationMs;
		let maxPropagation = propagationStats.maxPropagationMs;

		if (this.state.propagationTimes.length > 0) {
			avgPropagation =
				this.state.propagationTimes.reduce((a, b) => a + b, 0) /
				this.state.propagationTimes.length;
			maxPropagation = Math.max(...this.state.propagationTimes);
		}

		// If no propagation data, estimate based on topology
		if (avgPropagation === 0) {
			avgPropagation = calculatePropagationDelay(
				this.config.coordinationTopology,
				this.config.nodeCount,
				this.config.clusterSize
			);
			maxPropagation = avgPropagation * 2;
		}

		return {
			runId: 0,
			config: this.config,
			communicationOverheadPercent: communicationOverhead,
			bottleneckThresholdNodes: bottleneckThreshold,
			coordinatorAvailabilityPercent: coordinatorAvailability,
			powerVariancePercent: powerVariance,
			avgUpdatePropagationMs: avgPropagation,
			maxUpdatePropagationMs: maxPropagation,
			failedHandoffs: totalFailedHandoffs,
			messageDropRate: queueStats.dropRate,
			totalMessagesSent: this.state.totalMessagesSent,
			totalMessagesDelivered: this.state.totalMessagesDelivered,
			avgMessagesPerNodePerDay:
				this.state.totalMessagesSent /
				this.config.nodeCount /
				this.config.simulationDays,
			totalEnergyKwh: calculateTotalEnergy(this.state.network.nodes)
		};
	}
}
