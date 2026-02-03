/**
 * Depot Logistics Simulation
 *
 * Discrete event simulation for Dyson swarm depot logistics and maintenance.
 * Addresses research question rq-2-7: optimal depot spacing and logistics architecture.
 */

// Types
export type {
	DepotLogisticsConfig,
	EventType,
	SimEvent,
	DroneStatus,
	DroneType,
	Drone,
	CollectorFailure,
	Depot,
	DepotStats,
	DepotLogisticsRunResult,
	DepotLogisticsResult,
	DepotLogisticsSimulationOutput,
	DepotLogisticsComparisonResult,
	DepotLogisticsProgress
} from './types';

// Failure generation
export {
	generateFailures,
	expectedFailuresPerDay,
	expectedTotalFailures,
	sortFailuresByPriority,
	DEFAULT_SWARM_PARAMS,
	type FailureGeneratorParams
} from './failure-generator';

// Service dispatch
export {
	findNearestDepot,
	findAvailableDrone,
	findDepotWithCapacity,
	calculateDistance,
	calculateDroneDeltaV,
	calculatePropellantRequired,
	calculateTransitTime,
	canCompleteMission,
	consumePropellant,
	refuelDrone,
	PROPULSION_CONSTANTS,
	type NearestDepotResult
} from './service-dispatch';

// Discrete event simulator
export { DepotLogisticsSimulator } from './discrete-event-sim';

// Monte Carlo orchestration
export {
	runDepotLogisticsMonteCarlo,
	runDepotLogisticsComparison,
	generateSpacingComparisonConfigs,
	generateFleetComparisonConfigs,
	runQuickDepotSimulation,
	DEFAULT_DEPOT_LOGISTICS_CONFIG
} from './monte-carlo';
