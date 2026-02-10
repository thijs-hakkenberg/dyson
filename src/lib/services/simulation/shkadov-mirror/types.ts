/**
 * Shkadov Mirror Standoff Distance Simulation Types
 *
 * Types for trade study analysis of Shkadov mirror standoff distance,
 * analyzing thrust, mass, temperature, and feasibility trade-offs.
 * Addresses research question rq-3b-1.
 */

/**
 * Configuration for Shkadov mirror trade study
 */
export interface ShkadovConfig {
	/** Mirror standoff distance from Sun in AU (0.1-2.0) */
	standoffDistance: number;
	/** Mirror areal density in kg/m² (0.5-10) */
	arealDensity: number;
	/** Mirror reflectivity (0.90-0.99) */
	reflectivity: number;
	/** Fraction of sky coverage (0.01-0.50) */
	coverageFraction: number;
	/** Target thrust in Newtons (for comparison mode) */
	targetThrust: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * A single trade point at a specific standoff distance
 */
export interface ShkadovTradePoint {
	/** Standoff distance in AU */
	distance: number;
	/** Thrust produced in Newtons */
	thrust: number;
	/** Total mirror mass in kg */
	mirrorMass: number;
	/** Equilibrium temperature in Kelvin */
	equilibriumTemp: number;
	/** Total mirror area in m² */
	mirrorArea: number;
	/** Whether the mirror is thermally feasible at this distance */
	isThermallyFeasible: boolean;
	/** Estimated cost in USD */
	costEstimate: number;
	/** Reduction in insolation at Earth (fraction) */
	insolationReduction: number;
}

/**
 * Result of a Shkadov mirror trade sweep
 */
export interface ShkadovResult {
	/** Trade points across the distance sweep */
	tradePoints: ShkadovTradePoint[];
	/** Optimal standoff distance in AU (max feasible thrust) */
	optimalDistance: number;
	/** Maximum thrust achievable within thermal limits (N) */
	maxFeasibleThrust: number;
	/** Analysis summary */
	analysis: {
		/** Critical areal density for statite balance in g/m² */
		criticalArealDensity: number;
		/** Whether current config is above statite limit */
		isAboveStatiteLimit: boolean;
		/** Material recommendation based on thermal constraints */
		materialRecommendation: string;
		/** Total mirror area at optimal distance in m² */
		optimalMirrorArea: number;
		/** Mirror mass at optimal distance in kg */
		optimalMirrorMass: number;
		/** Equilibrium temp at optimal distance in K */
		optimalTemp: number;
		/** Insolation reduction at optimal distance */
		optimalInsolationReduction: number;
	};
	/** Configuration used */
	config: ShkadovConfig;
	/** Execution time in milliseconds */
	executionTimeMs: number;
}

/**
 * Result of comparing multiple Shkadov configurations
 */
export interface ShkadovComparisonResult {
	/** Configurations compared */
	configs: ShkadovConfig[];
	/** Results for each configuration */
	results: ShkadovResult[];
	/** Comparison analysis */
	analysis: {
		/** Best config index for maximum thrust */
		bestThrustIndex: number;
		/** Best config index for minimum mass */
		bestMassIndex: number;
		/** Best config index for widest feasibility range */
		bestFeasibilityIndex: number;
	};
}

/**
 * Progress callback for Shkadov simulation
 */
export interface ShkadovProgress {
	/** Current step number */
	currentStep: number;
	/** Total steps */
	totalSteps: number;
	/** Percent complete */
	percentComplete: number;
}
