/**
 * Swarm Dynamics Simulation Types
 *
 * Types for simulating Dyson swarm station-keeping, collision probability,
 * and propulsion authority. Addresses research questions rq-1-2 (station-keeping),
 * rq-1-6 (collision probability), and rq-1-37 (propulsion authority).
 */

/**
 * Propulsion system types for station-keeping
 */
export type PropulsionType = 'srp_only' | 'ion' | 'cold_gas' | 'hybrid';

/**
 * Configuration for swarm dynamics simulation
 */
export interface SwarmDynamicsConfig {
	/** Distance from Sun in AU (0.3 - 1.0) */
	orbitalDistanceAU: number;
	/** Collector surface area in m^2 (100 - 10,000) */
	collectorAreaM2: number;
	/** Collector mass in kg (50 - 2,000) */
	collectorMassKg: number;
	/** Number of units in swarm (100 - 10,000) */
	swarmSize: number;
	/** Average spacing between units in meters (100 - 10,000) */
	interUnitSpacingM: number;
	/** Type of propulsion system for station-keeping */
	propulsionType: PropulsionType;
	/** Simulation duration in years (1 - 10) */
	simulationYears: number;
	/** Surface reflectivity (0 = absorber, 1 = perfect mirror) */
	reflectivity: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Yearly statistics for swarm dynamics
 */
export interface YearlyStats {
	year: number;
	/** Operational units at end of year */
	operationalUnits: number;
	/** Cumulative collisions */
	cumulativeCollisions: number;
	/** Close approach events requiring avoidance maneuvers */
	closeApproachEvents: number;
	/** Delta-V consumed for station-keeping (m/s) */
	deltaVConsumedMs: number;
	/** Remaining propellant fraction (for non-SRP systems) */
	propellantRemainingFraction: number;
	/** Average position error from nominal (m) */
	avgPositionErrorM: number;
}

/**
 * Single simulation run result
 */
export interface SwarmDynamicsRunResult {
	runId: number;
	config: SwarmDynamicsConfig;
	/** Annual delta-V available from solar radiation pressure (m/s/year) */
	srpDeltaVPerYear: number;
	/** Annual delta-V required for station-keeping (m/s/year) */
	requiredDeltaVPerYear: number;
	/** Ratio of available SRP delta-V to required (>1 = sufficient) */
	srpControlAuthority: number;
	/** Collision probability per unit per year */
	collisionProbPerUnitYear: number;
	/** Minimum safe spacing for target collision probability (m) */
	safeSpacingM: number;
	/** Mission lifetime limited by propellant or collisions (years) */
	missionLifetimeYears: number;
	/** Velocity uncertainty from control limitations (m/s) */
	velocityUncertaintyMs: number;
	/** Total collisions over simulation period */
	totalCollisions: number;
	/** Total close approach events */
	totalCloseApproaches: number;
	/** Year-by-year statistics */
	yearlyStats: YearlyStats[];
}

/**
 * Aggregated results across Monte Carlo runs
 */
export interface SwarmDynamicsResult {
	/** Mean SRP delta-V per year (m/s/year) */
	srpDeltaVPerYear: number;
	/** Mean required delta-V per year (m/s/year) */
	requiredDeltaVPerYear: number;
	/** Mean SRP control authority ratio */
	srpControlAuthority: number;
	srpControlAuthorityStdDev: number;
	/** Mean collision probability per unit per year */
	collisionProbPerUnitYear: number;
	collisionProbStdDev: number;
	/** Mean safe spacing (m) */
	safeSpacingM: number;
	/** Mean mission lifetime (years) */
	missionLifetimeYears: number;
	missionLifetimeStdDev: number;
	/** Mean velocity uncertainty (m/s) */
	velocityUncertaintyMs: number;
	/** Percentage of runs with sufficient SRP authority */
	srpSufficientPct: number;
	/** Mean total collisions over simulation */
	totalCollisions: number;
	/** 95% confidence interval for collision probability */
	confidenceInterval95: {
		collisionProbLower: number;
		collisionProbUpper: number;
	};
}

/**
 * Monte Carlo simulation output
 */
export interface SwarmDynamicsSimulationOutput {
	config: SwarmDynamicsConfig;
	result: SwarmDynamicsResult;
	runs: number;
	executionTimeMs: number;
}

/**
 * Comparison between different configurations
 */
export interface SwarmDynamicsComparisonResult {
	configs: SwarmDynamicsConfig[];
	results: SwarmDynamicsResult[];
	optimalConfigIndex: number;
	analysis: {
		bestCollisionProb: number;
		bestControlAuthority: number;
		bestLifetime: number;
		recommendation: string;
	};
}

/**
 * Progress callback for Monte Carlo
 */
export interface SwarmDynamicsProgress {
	currentRun: number;
	totalRuns: number;
	percentComplete: number;
	propulsionType?: PropulsionType;
}
