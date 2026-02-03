/**
 * Simulation Core Utilities
 *
 * Shared utilities for Monte Carlo simulations across different simulators.
 */

export { SeededRandom } from './seeded-random';
export {
	mean,
	stdDev,
	variance,
	percentile,
	min,
	max,
	calculateStats,
	confidenceInterval,
	type Stats,
	type ConfidenceInterval
} from './statistics';
export {
	AsyncRunner,
	yieldToUI,
	type ProgressInfo,
	type BatchedProgressInfo,
	type ProgressCallback,
	type BatchedProgressCallback
} from './async-runner';

// Orbital mechanics utilities
export {
	CONSTANTS,
	solarFluxAtDistance,
	solarRadiationPressure,
	srpForce,
	srpAcceleration,
	annualDeltaVFromAcceleration,
	hohmannTransferDeltaV,
	hohmannTransferTime,
	orbitalPeriod,
	circularOrbitalVelocity,
	escapeVelocity,
	lightTimeDelay,
	estimatePerturbations,
	calculateDeltaVBudget,
	type PerturbationBudget,
	type DeltaVBudget
} from './orbital-mechanics';

// Cost modeling utilities
export {
	learningCurveCost,
	cumulativeLearningCost,
	averageUnitCost,
	launchCostToDeepSpace,
	calculateISRUTrajectory,
	calculateEarthTrajectory,
	findCrossoverPoint,
	netPresentValue,
	internalRateOfReturn,
	DEFAULT_LAUNCH_COSTS,
	DEFAULT_ISRU_PARAMS,
	type LaunchCostParams,
	type ISRUCostParams,
	type ISRUProductionYear,
	type EarthManufacturingYear
} from './cost-model';

// Spatial indexing utilities
export {
	SpatialGrid,
	distance,
	distanceSquared,
	collisionProbabilityGasModel,
	annualCollisionProbability,
	minimumSafeSpacing,
	type Vector3,
	type SwarmElement,
	type CollisionPair
} from './spatial-index';
