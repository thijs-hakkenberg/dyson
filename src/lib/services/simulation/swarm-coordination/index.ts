/**
 * Swarm Coordination Simulation Module
 *
 * Simulator for analyzing coordination patterns in large-scale Dyson swarms.
 *
 * Research questions addressed:
 * - rq-1-24: Architecture at scale
 * - rq-1-39: Coordinator duty cycle
 * - rq-2-17: Fleet coordination constraints
 *
 * Key features:
 * - Three coordination topologies: centralized, hierarchical, mesh
 * - Discrete event simulation for message passing
 * - Coordinator handoff modeling with power tracking
 * - Monte Carlo analysis for confidence intervals
 * - Scaling analysis up to 1M nodes
 */

// Types
export type {
	CoordinationTopology,
	SwarmCoordinationConfig,
	EventType,
	SimEvent,
	NodeStatus,
	SwarmNode,
	Cluster,
	Message,
	PropagationStats,
	SwarmCoordinationRunResult,
	SwarmCoordinationResult,
	SwarmCoordinationOutput,
	TopologyComparisonResult,
	SwarmCoordinationProgress
} from './types';

// Monte Carlo orchestration
export {
	DEFAULT_SWARM_COORDINATION_CONFIG,
	runSwarmCoordinationMonteCarlo,
	runSwarmCoordinationComparison,
	generateScalingConfigs,
	runScalingAnalysis,
	runQuickSwarmSimulation
} from './monte-carlo';

// Simulator class for direct use
export { SwarmCoordinationSimulator } from './discrete-event-sim';

// Topology utilities
export {
	initializeNetwork,
	getMessageRouting,
	getHopCount,
	estimateBottleneckThreshold,
	type TopologyConfig,
	type NetworkStructure
} from './topology';

// Message passing utilities
export {
	MESSAGE_SIZES,
	lightTimeDelay,
	calculateBandwidthRequirement,
	calculatePropagationDelay,
	calculateCommunicationOverhead,
	estimateMessageCount,
	createMessage,
	MessageQueue
} from './message-passing';

// Coordinator model utilities
export {
	createNode,
	createCluster,
	calculatePowerConsumption,
	updateNodePower,
	calculateCoordinatorAvailability,
	performHandoff,
	calculatePowerVariance,
	failNode,
	needsHandoff,
	getOperationalNodes,
	calculateHandoffTime,
	calculateTotalEnergy
} from './coordinator-model';
