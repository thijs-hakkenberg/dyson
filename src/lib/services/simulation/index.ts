/**
 * Simulation Services
 *
 * NEA Constellation Coverage Monte Carlo Simulator
 */

// Types
export type {
	PropulsionType,
	NEAType,
	OrbitalElements,
	NEA,
	Satellite,
	SimulationConfig,
	SimulationRun,
	YearlyStats,
	ConstellationResult,
	SimulationOutput,
	SimulationAnalysis,
	WorkerMessage,
	SimulationProgress
} from './simulation-types';

// NEA Population
export {
	generateNEAPopulation,
	getHighValueNEAs,
	sortByMiningValue,
	getPopulationStats
} from './nea-population';

// Orbital Mechanics
export {
	calculateHohmannDeltaV,
	calculateCharacteristicDeltaV,
	calculateSurveyDeltaV,
	getPropulsionSpecs,
	createSatellite,
	getDefaultSatelliteOrbit,
	canReachNEA,
	calculateAccessibility,
	estimateTransferTime
} from './orbital-mechanics';

// Coverage Calculator
export {
	calculateCoverage,
	calculateYearlyCoverage,
	calculateAvgDeltaVUsed,
	getReachableNEAs,
	type CoverageResult,
	type SatelliteUtilization
} from './coverage-calculator';

// Reliability Model
export {
	applyAnnualFailures,
	calculateExpectedFailures,
	calculateSurvivalProbability,
	getOperationalCount,
	simulateMissionFailures,
	calculateMTBF,
	calculateRequiredConstellation,
	bathtubHazardRate,
	type FailureStats
} from './reliability-model';

// Monte Carlo Engine
export {
	runMonteCarloSimulation,
	runMonteCarloSimulationAsync,
	runSingleSizeSimulation,
	runQuickSimulation,
	DEFAULT_CONFIG,
	CONSTELLATION_SIZES
} from './monte-carlo-engine';

// Worker Interface
export {
	SimulationRunner,
	createSimulationRunner,
	runSimulation,
	runQuickPreview
} from './simulation-worker';

// Orbital Location Trade Analysis (Simulator 3)
export * from './orbital-trade';

// Depot Logistics (Simulator 5)
export * from './depot-logistics';

// Swarm Coordination (Simulator 4)
// Re-export with namespace to avoid naming conflicts
export {
	// Types
	type CoordinationTopology,
	type SwarmCoordinationConfig,
	type EventType as SwarmEventType,
	type SimEvent as SwarmSimEvent,
	type NodeStatus,
	type SwarmNode,
	type Cluster,
	type Message as SwarmMessage,
	type PropagationStats,
	type SwarmCoordinationRunResult,
	type SwarmCoordinationResult,
	type SwarmCoordinationOutput,
	type TopologyComparisonResult,
	type SwarmCoordinationProgress,
	type TopologyConfig,
	type NetworkStructure,
	// Monte Carlo
	DEFAULT_SWARM_COORDINATION_CONFIG,
	runSwarmCoordinationMonteCarlo,
	runSwarmCoordinationComparison,
	generateScalingConfigs,
	runScalingAnalysis,
	runQuickSwarmSimulation,
	// Simulator
	SwarmCoordinationSimulator,
	// Topology
	initializeNetwork,
	getMessageRouting,
	getHopCount,
	estimateBottleneckThreshold,
	// Message passing
	MESSAGE_SIZES,
	lightTimeDelay,
	calculateBandwidthRequirement,
	calculatePropagationDelay,
	calculateCommunicationOverhead,
	estimateMessageCount,
	createMessage,
	MessageQueue,
	// Coordinator model
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
} from './swarm-coordination';

// Radiation Degradation (PV survival Monte Carlo)
export * from './radiation-degradation';

// Electrical Fault Analysis (HV systems in plasma environment)
export * from './electrical-fault';

// Payload Capture Systems (mass driver projectile capture)
export * from './capture';

// Shkadov Mirror (standoff distance trade study)
// Import directly from '$lib/services/simulation/shkadov-mirror' to avoid name conflicts
export type { ShkadovConfig, ShkadovTradePoint, ShkadovResult, ShkadovComparisonResult, ShkadovProgress } from './shkadov-mirror';
export { DEFAULT_SHKADOV_CONFIG, runShkadovTradeSweep, runShkadovComparison } from './shkadov-mirror';

// Thermal Warping (membrane deflection analysis)
export type { WarpingConfig, WarpingSweepPoint, WarpingResult, WarpingOutput, WarpingComparisonResult, WarpingProgress } from './thermal-warping';
export { DEFAULT_WARPING_CONFIG, runWarpingMonteCarlo, runWarpingComparison } from './thermal-warping';

// Thermodynamic Cascade (Matrioshka brain shell efficiency)
export type { CascadeConfig, ShellData, CascadeRunResult, CascadeResult, CascadeOutput, CascadeComparisonResult, CascadeProgress } from './thermodynamic-cascade';
export { DEFAULT_CASCADE_CONFIG, runCascadeMonteCarlo, runCascadeComparison } from './thermodynamic-cascade';

// Self-Replication (closure threshold and growth dynamics)
export type { ReplicationConfig, CycleData, ReplicationRunResult, ReplicationResult, ReplicationOutput, ReplicationComparisonResult, ReplicationProgress } from './self-replication';
export { DEFAULT_REPLICATION_CONFIG, runReplicationMonteCarlo, runReplicationComparison } from './self-replication';

// Membrane Dynamics (deployment stability and flutter)
export type { MembraneConfig, ModalResult, MembraneSweepPoint, MembraneResult, MembraneOutput, MembraneComparisonResult, MembraneProgress } from './membrane-dynamics';
export { DEFAULT_MEMBRANE_CONFIG, runMembraneMonteCarlo, runMembraneComparison } from './membrane-dynamics';

// Deployment Optimization (ML trajectory strategies)
export type { DeploymentOptConfig, StrategyResult, DeploymentOptResult, DeploymentOptOutput, DeploymentOptProgress } from './deployment-optimization';
export { DEFAULT_DEPLOYMENT_OPT_CONFIG, runDeploymentOptMonteCarlo } from './deployment-optimization';

// Solar Mass Extraction (Caplan engine rate limits)
export type { ExtractionConfig, ExtractionPoint, ExtractionResult, ExtractionOutput, ExtractionComparisonResult, ExtractionProgress } from './solar-mass-extraction';
export { DEFAULT_EXTRACTION_CONFIG, runExtractionMonteCarlo, runExtractionComparison } from './solar-mass-extraction';
