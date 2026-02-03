/**
 * Swarm Dynamics Simulation
 *
 * Monte Carlo simulation for Dyson swarm station-keeping, collision probability,
 * and propulsion authority analysis. Addresses research questions:
 * - rq-1-2: Station-keeping requirements
 * - rq-1-6: Collision probability
 * - rq-1-37: Propulsion authority
 */

// Types
export * from './types';

// Solar radiation pressure calculations
export {
	calculateSRP,
	effectiveSRPDeltaV,
	requiredAreaToMassRatio,
	srpForceVector,
	srpResponseTime,
	type SRPResult,
	type SRPForceVector
} from './solar-pressure';

// Orbital perturbations
export {
	calculateSwarmPerturbations,
	calculateRequiredDeltaV,
	getPropulsionCharacteristics,
	calculatePropellantLifetime,
	calculateVelocityUncertainty,
	calculatePlaneMaintenanceDeltaV,
	type SwarmPerturbationBudget,
	type PropulsionCharacteristics
} from './orbital-perturbations';

// Collision model
export {
	calculateCollisionStats,
	simulateCloseApproaches,
	effectiveCollisionProbability,
	estimateDebrisCascade,
	calculateCollisionLifetime,
	type CollisionStats,
	type CloseApproachEvent
} from './collision-model';

// Monte Carlo simulation
export {
	runSwarmDynamicsMonteCarlo,
	runSwarmDynamicsComparison,
	generateSpacingComparisonConfigs,
	generatePropulsionComparisonConfigs,
	generateOrbitalDistanceComparisonConfigs,
	DEFAULT_SWARM_DYNAMICS_CONFIG
} from './monte-carlo';
