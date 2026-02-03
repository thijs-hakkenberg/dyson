/**
 * Orbital Location Trade Simulation Types
 *
 * Types for multi-objective analysis of orbital depot locations.
 * Addresses research questions rq-1-19 (optimal orbital location) and
 * rq-1-36 (depot orbit selection).
 */

/**
 * Candidate orbital locations for depot placement
 */
export type OrbitalLocation =
	| 'nrho'
	| 'sun_earth_l1'
	| 'sun_earth_l4'
	| 'sun_earth_l5'
	| 'helio_1au'
	| 'helio_0p7au'
	| 'helio_0p5au'
	| 'sun_mercury_l1';

/**
 * Physical and operational characteristics of an orbital location
 */
export interface OrbitalLocationData {
	/** Location identifier */
	id: OrbitalLocation;
	/** Human-readable name */
	name: string;
	/** Distance from Sun in AU */
	distanceAU: number;
	/** Delta-V cost from Earth LEO in km/s */
	deltaVFromEarth: number;
	/** Solar flux multiplier relative to 1 AU */
	solarFluxMultiplier: number;
	/** One-way communication latency to Earth in minutes */
	commLatencyMinutes: number;
	/** Thermal load factor (1.0 = 1 AU baseline) */
	thermalLoadFactor: number;
	/** Stability class (dynamically stable, quasi-stable, unstable) */
	stabilityClass: 'dynamically_stable' | 'quasi_stable' | 'unstable';
}

/**
 * Feedstock source options for depot operations
 */
export type FeedstockSource = 'earth' | 'nea' | 'mercury';

/**
 * Configuration for orbital trade simulation
 */
export interface OrbitalTradeConfig {
	/** Locations to evaluate */
	candidateLocations: OrbitalLocation[];
	/** Primary feedstock source */
	feedstockSource: FeedstockSource;
	/** Maximum thermal dissipation capacity in MW (1.5-5.0) */
	thermalBudgetMW: number;
	/** Maximum delta-V budget for operations in km/s (4-12) */
	deltaVBudgetKms: number;
	/** Number of transfer vehicles in fleet (10-100) */
	fleetSize: number;
	/** Objective weights for multi-objective optimization */
	objectiveWeights: {
		/** Weight for delta-V/cost minimization (0-1) */
		cost: number;
		/** Weight for risk minimization (0-1) */
		risk: number;
		/** Weight for capability maximization (0-1) */
		capability: number;
	};
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Score breakdown for a single orbital location
 */
export interface LocationScore {
	/** Location being scored */
	location: OrbitalLocation;
	/** Delta-V cost score (lower is better, 0-1 normalized) */
	deltaVCost: number;
	/** Thermal feasibility score (0 = infeasible, 1 = optimal) */
	thermalFeasibility: number;
	/** Communication latency score (0 = worst, 1 = best) */
	commLatencyScore: number;
	/** Solar power availability score (0-1) */
	solarPowerScore: number;
	/** Stability score based on station-keeping requirements (0-1) */
	stabilityScore: number;
	/** Feedstock accessibility score (0-1) */
	feedstockAccessScore: number;
	/** Combined weighted overall score (higher is better) */
	overallScore: number;
	/** Whether this location is on the Pareto frontier */
	isParetoOptimal: boolean;
	/** Detailed metrics */
	metrics: LocationMetrics;
}

/**
 * Detailed metrics for a location
 */
export interface LocationMetrics {
	/** Required radiator area in m^2 */
	radiatorAreaM2: number;
	/** Effective solar flux in W/m^2 */
	solarFluxWm2: number;
	/** Round-trip communication delay in minutes */
	roundTripLatencyMin: number;
	/** Delta-V to feedstock source in km/s */
	deltaVToFeedstock: number;
	/** Delta-V from feedstock source in km/s */
	deltaVFromFeedstock: number;
	/** Annual station-keeping delta-V in m/s/year */
	stationKeepingDeltaV: number;
	/** Transfer time from Earth in days */
	transferTimeFromEarthDays: number;
}

/**
 * Delta-V matrix entry for location-to-location transfers
 */
export interface DeltaVMatrixEntry {
	/** Origin location */
	from: OrbitalLocation;
	/** Destination location */
	to: OrbitalLocation;
	/** Hohmann transfer delta-V in km/s */
	deltaVKms: number;
	/** Transfer time in days */
	transferDays: number;
}

/**
 * Result of a single Monte Carlo run
 */
export interface OrbitalTradeRunResult {
	/** Run identifier */
	runId: number;
	/** Configuration used */
	config: OrbitalTradeConfig;
	/** Scores for all candidate locations */
	locationScores: LocationScore[];
	/** Locations on the Pareto frontier */
	paretoFrontier: OrbitalLocation[];
	/** Best location for cost optimization */
	optimalForCost: OrbitalLocation;
	/** Best location for capability optimization */
	optimalForCapability: OrbitalLocation;
	/** Best location for risk minimization */
	optimalForRisk: OrbitalLocation;
	/** Overall recommended location */
	recommendation: OrbitalLocation;
}

/**
 * Aggregated statistics for a location across runs
 */
export interface LocationStats {
	/** Location identifier */
	location: OrbitalLocation;
	/** Mean overall score */
	meanScore: number;
	/** Standard deviation of score */
	stdDevScore: number;
	/** Frequency of being on Pareto frontier (0-1) */
	paretoFrequency: number;
	/** Frequency of being recommended (0-1) */
	recommendationFrequency: number;
	/** 95% confidence interval for score */
	confidenceInterval95: {
		lower: number;
		upper: number;
	};
}

/**
 * Monte Carlo simulation output
 */
export interface OrbitalTradeSimulationOutput {
	/** Configuration used */
	config: OrbitalTradeConfig;
	/** Statistics per location */
	locationStats: LocationStats[];
	/** Most frequently recommended location */
	recommendation: OrbitalLocation;
	/** Robust Pareto frontier (locations appearing >50% of runs) */
	robustParetoFrontier: OrbitalLocation[];
	/** Full delta-V matrix between locations */
	deltaVMatrix: DeltaVMatrixEntry[];
	/** Number of Monte Carlo runs */
	runs: number;
	/** Execution time in milliseconds */
	executionTimeMs: number;
}

/**
 * Progress callback for Monte Carlo
 */
export interface OrbitalTradeProgress {
	/** Current run number */
	currentRun: number;
	/** Total runs */
	totalRuns: number;
	/** Percent complete */
	percentComplete: number;
}

/**
 * Thermal cliff analysis result
 */
export interface ThermalCliffResult {
	/** Location being analyzed */
	location: OrbitalLocation;
	/** Distance where thermal limits are exceeded in AU */
	thermalCliffDistanceAU: number;
	/** Whether this location is within thermal limits */
	withinLimits: boolean;
	/** Required radiator area at this distance in m^2 */
	requiredRadiatorAreaM2: number;
	/** Maximum feasible thermal load in MW */
	maxThermalLoadMW: number;
}

/**
 * Pareto analysis result
 */
export interface ParetoAnalysis {
	/** All Pareto-optimal solutions */
	paretoFrontier: LocationScore[];
	/** Dominated solutions */
	dominated: LocationScore[];
	/** Utopia point (best of each objective) */
	utopiaPoint: {
		cost: number;
		risk: number;
		capability: number;
	};
	/** Nadir point (worst of each objective) */
	nadirPoint: {
		cost: number;
		risk: number;
		capability: number;
	};
}
