/**
 * Fleet Logistics Simulation
 *
 * Discrete event simulation for space transport fleet logistics.
 */

export * from './types';
export { EventQueue } from './event-queue';
export {
	calculateTransitTime,
	calculateLoadingTime,
	calculateUnloadingTime,
	calculateReturnTime,
	calculateRoundTripTime,
	calculateTripsPerYear,
	DEFAULT_TRANSIT_PARAMS,
	type TransitParams
} from './transit-calculator';
export {
	createVehicle,
	createFleet,
	startLoading,
	completeLoading,
	startTransit,
	completeTransit,
	startUnloading,
	completeUnloading,
	startReturn,
	completeReturn,
	failVehicle,
	isOperational,
	getIdleVehicle,
	getFleetStats,
	type FleetStats
} from './vehicle';
export { DiscreteEventSimulator } from './discrete-event-sim';
export {
	runFleetMonteCarlo,
	runFleetComparison,
	generateComparisonConfigs,
	DEFAULT_FLEET_CONFIG
} from './monte-carlo';
