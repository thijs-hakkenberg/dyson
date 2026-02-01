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
