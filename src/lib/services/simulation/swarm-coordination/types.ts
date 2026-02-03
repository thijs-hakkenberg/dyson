/**
 * Swarm Coordination Simulation Types
 *
 * Types for simulating coordination of large-scale Dyson swarm elements.
 * Addresses research questions:
 * - rq-1-24: architecture at scale
 * - rq-1-39: coordinator duty cycle
 * - rq-2-17: fleet coordination constraints
 */

/**
 * Coordination topology options for swarm management
 * - centralized: all nodes communicate with single coordinator
 * - hierarchical: nodes -> cluster coordinators -> regional -> central
 * - mesh: peer-to-peer with gossip protocol
 */
export type CoordinationTopology = 'centralized' | 'hierarchical' | 'mesh';

/**
 * Configuration for swarm coordination simulation
 */
export interface SwarmCoordinationConfig {
	/** Number of nodes in the swarm (1,000 - 1,000,000) */
	nodeCount: number;
	/** Network topology for coordination */
	coordinationTopology: CoordinationTopology;
	/** Nodes per cluster for hierarchical topology (50-200) */
	clusterSize: number;
	/** Hours before coordinator handoff (1-168 hours) */
	coordinatorDutyCycleHours: number;
	/** Bandwidth per node in kbps (0.1-10) */
	bandwidthPerNodeKbps: number;
	/** Annual failure rate per node (0.01-0.05) */
	nodeFailureRatePerYear: number;
	/** Power consumption when acting as coordinator (15-20W) */
	coordinatorPowerW: number;
	/** Base power consumption for regular nodes (5W typical) */
	basePowerW: number;
	/** Simulation duration in days (30-365) */
	simulationDays: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Event types in discrete event simulation
 */
export type EventType =
	| 'message_send'
	| 'message_receive'
	| 'coordinator_handoff'
	| 'node_failure'
	| 'node_recovery'
	| 'collision_warning'
	| 'gossip_round'
	| 'state_sync';

/**
 * Simulation event
 */
export interface SimEvent {
	/** Event type */
	type: EventType;
	/** Time of event in seconds from simulation start */
	time: number;
	/** Node ID involved */
	nodeId: string;
	/** Cluster ID (for hierarchical topology) */
	clusterId?: string;
	/** Additional event data */
	data?: Record<string, unknown>;
}

/**
 * Node status in the swarm
 */
export type NodeStatus = 'operational' | 'coordinator' | 'failed' | 'recovering';

/**
 * Individual node state
 */
export interface SwarmNode {
	id: string;
	status: NodeStatus;
	clusterId: string;
	/** Whether this node is currently a coordinator */
	isCoordinator: boolean;
	/** Time spent as coordinator in seconds */
	coordinatorTimeSeconds: number;
	/** Total power consumed in Watt-hours */
	powerConsumedWh: number;
	/** Messages sent */
	messagesSent: number;
	/** Messages received */
	messagesReceived: number;
	/** Time of last state update */
	lastUpdateTime: number;
	/** Failure time if failed */
	failureTime?: number;
}

/**
 * Cluster state for hierarchical topology
 */
export interface Cluster {
	id: string;
	nodeIds: string[];
	coordinatorId: string;
	/** Regional coordinator ID (for multi-level hierarchy) */
	regionalCoordinatorId?: string;
	/** Messages processed this simulation */
	messagesProcessed: number;
	/** Last handoff time in seconds */
	lastHandoffTime: number;
	/** Number of failed handoffs */
	failedHandoffs: number;
}

/**
 * Message in the network
 */
export interface Message {
	id: string;
	senderId: string;
	receiverId: string;
	/** Message size in bytes */
	sizeBytes: number;
	/** Send time in seconds */
	sendTime: number;
	/** Receive time in seconds (undefined if in transit) */
	receiveTime?: number;
	/** Whether message was successfully delivered */
	delivered: boolean;
	/** Message type */
	messageType: 'ephemeris' | 'handoff' | 'gossip' | 'collision' | 'heartbeat';
}

/**
 * Propagation statistics for a time window
 */
export interface PropagationStats {
	/** Average propagation time in ms */
	avgPropagationMs: number;
	/** Maximum propagation time in ms */
	maxPropagationMs: number;
	/** 95th percentile propagation time in ms */
	p95PropagationMs: number;
	/** Number of messages tracked */
	messageCount: number;
}

/**
 * Single simulation run result
 */
export interface SwarmCoordinationRunResult {
	runId: number;
	config: SwarmCoordinationConfig;
	/** Communication overhead as percentage of total bandwidth capacity */
	communicationOverheadPercent: number;
	/** Node count at which latency exceeds 1 second */
	bottleneckThresholdNodes: number;
	/** Percentage of time coordinators were available */
	coordinatorAvailabilityPercent: number;
	/** Variance in power consumption across nodes (%) */
	powerVariancePercent: number;
	/** Average update propagation time in ms */
	avgUpdatePropagationMs: number;
	/** Maximum update propagation time in ms */
	maxUpdatePropagationMs: number;
	/** Number of failed coordinator handoffs */
	failedHandoffs: number;
	/** Rate of dropped messages (0-1) */
	messageDropRate: number;
	/** Total messages sent */
	totalMessagesSent: number;
	/** Total messages delivered */
	totalMessagesDelivered: number;
	/** Average messages per node per day */
	avgMessagesPerNodePerDay: number;
	/** Total energy consumed in kWh */
	totalEnergyKwh: number;
}

/**
 * Aggregated results across Monte Carlo runs
 */
export interface SwarmCoordinationResult {
	/** Mean communication overhead (%) */
	communicationOverheadPercent: number;
	communicationOverheadStdDev: number;
	/** Mean bottleneck threshold */
	bottleneckThresholdNodes: number;
	bottleneckThresholdStdDev: number;
	/** Mean coordinator availability (%) */
	coordinatorAvailabilityPercent: number;
	coordinatorAvailabilityStdDev: number;
	/** Mean power variance (%) */
	powerVariancePercent: number;
	powerVarianceStdDev: number;
	/** Update propagation time statistics */
	avgUpdatePropagationMs: number;
	maxUpdatePropagationMs: number;
	/** Mean failed handoffs */
	failedHandoffs: number;
	failedHandoffsStdDev: number;
	/** Mean message drop rate */
	messageDropRate: number;
	messageDropRateStdDev: number;
	/** 95% confidence interval for overhead */
	confidenceInterval95: {
		overheadLower: number;
		overheadUpper: number;
	};
}

/**
 * Monte Carlo simulation output
 */
export interface SwarmCoordinationOutput {
	config: SwarmCoordinationConfig;
	result: SwarmCoordinationResult;
	runs: number;
	executionTimeMs: number;
}

/**
 * Comparison result for different topologies
 */
export interface TopologyComparisonResult {
	configs: SwarmCoordinationConfig[];
	results: SwarmCoordinationResult[];
	/** Index of optimal configuration */
	optimalConfigIndex: number;
	analysis: {
		/** Best topology for low latency */
		bestLatency: CoordinationTopology;
		/** Best topology for bandwidth efficiency */
		bestBandwidth: CoordinationTopology;
		/** Best topology for power efficiency */
		bestPower: CoordinationTopology;
		/** Recommended topology with reasoning */
		recommendation: string;
	};
}

/**
 * Progress callback for Monte Carlo
 */
export interface SwarmCoordinationProgress {
	currentRun: number;
	totalRuns: number;
	percentComplete: number;
	currentTopology?: CoordinationTopology;
}
