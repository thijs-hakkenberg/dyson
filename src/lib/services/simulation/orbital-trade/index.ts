/**
 * Orbital Location Trade Simulation
 *
 * Multi-objective analysis for optimal orbital depot location selection.
 * Addresses research questions:
 * - rq-1-19: Optimal orbital location for swarm construction
 * - rq-1-36: Depot orbit selection criteria
 *
 * This simulator evaluates candidate orbital locations across multiple
 * objectives including delta-V cost, thermal feasibility, communication
 * latency, and operational risk.
 */

// Types
export type {
	OrbitalLocation,
	OrbitalLocationData,
	FeedstockSource,
	OrbitalTradeConfig,
	LocationScore,
	LocationMetrics,
	DeltaVMatrixEntry,
	OrbitalTradeRunResult,
	LocationStats,
	OrbitalTradeSimulationOutput,
	OrbitalTradeProgress,
	ThermalCliffResult,
	ParetoAnalysis
} from './types';

// Delta-V calculations
export {
	ORBITAL_LOCATIONS,
	getAllLocations,
	getLocationData,
	calculateTransferDeltaV,
	calculateTransferTime,
	calculateLowThrustDeltaV,
	calculateDeltaVFromEarth,
	calculateDeltaVToFeedstock,
	generateDeltaVMatrix,
	calculateDepartureDeltaV,
	calculateArrivalDeltaV,
	calculateStationKeepingDeltaV
} from './delta-v-calculator';

// Thermal model
export {
	RADIATOR_PARAMS,
	THERMAL_PARAMS,
	calculateRadiatorArea,
	calculateMaxThermalLoad,
	calculateThermalCliffDistance,
	analyzeThermalFeasibility,
	calculateThermalFeasibilityScore,
	calculateSolarPowerScore,
	calculateEquilibriumTemperature,
	estimateRadiatorMass,
	calculateThermalMetrics
} from './thermal-model';

// Communication latency
export {
	COMM_PARAMS,
	calculateOneWayDelay,
	calculateRoundTripDelay,
	calculateRoundTripDelayMinutes,
	calculateCommLatencyScore,
	determineOperationalMode,
	calculateEffectiveCommandRate,
	calculateDownlinkEfficiency,
	calculateMinDistanceFromEarth,
	calculateMaxDistanceFromEarth,
	calculateDelayVariance,
	getCommMetrics
} from './comm-latency';

// Monte Carlo simulation
export {
	DEFAULT_ORBITAL_TRADE_CONFIG,
	runOrbitalTradeMonteCarlo,
	performParetoAnalysis,
	generateSensitivityConfigs
} from './monte-carlo';
