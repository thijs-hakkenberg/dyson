/**
 * Thermal Warping Simulation Types
 *
 * Types for modeling thermal warping effects on large thin-film membranes
 * in the solar environment. Addresses research question:
 * - RQ-2-4: Thermal warping effects on large membranes
 */

/**
 * Configuration for thermal warping simulation
 */
export interface WarpingConfig {
	/** Membrane area in m² (5,000 - 1,000,000) */
	membraneArea: number;
	/** Distance from Sun in AU (0.3-1.0) */
	orbitalDistance: number;
	/** Coefficient of thermal expansion in /K (15e-6 to 40e-6) */
	cte: number;
	/** Applied tension in N/m (0.1-10) */
	tension: number;
	/** Solar absorptivity (0.6-0.95) */
	absorptivity: number;
	/** Thermal emissivity (0.7-0.95) */
	emissivity: number;
	/** PV conversion efficiency (0.15-0.35) */
	pvEfficiency: number;
	/** Areal density in g/m² for thickness calculation */
	arealDensity: number;
	/** Number of Monte Carlo iterations */
	iterations: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Single area sweep data point with all computed values
 */
export interface WarpingSweepPoint {
	/** Membrane area in m² */
	area: number;
	/** Equilibrium temperature in K */
	equilibriumTemp: number;
	/** Front-to-back thermal gradient in K */
	thermalGradient: number;
	/** Thermoelastic curvature in 1/m */
	curvature: number;
	/** Maximum deflection without tension in m */
	maxDeflection: number;
	/** Effective deflection with tension in m */
	effectiveDeflection: number;
	/** Ratio of applied to critical tension */
	tensionRatio: number;
	/** Whether phased array tolerance (5 mm) is met */
	phasedArrayOK: boolean;
	/** Whether structural tolerance (10 cm) is met */
	structuralOK: boolean;
}

/**
 * Single Monte Carlo run result with stochastic material properties
 */
export interface WarpingRunResult {
	/** Run identifier */
	runId: number;
	/** Sweep points across areas for this run */
	sweepPoints: WarpingSweepPoint[];
}

/**
 * Aggregated Monte Carlo result for a single area
 */
export interface WarpingAreaStats {
	/** Membrane area in m² */
	area: number;
	/** Mean effective deflection in m */
	meanDeflection: number;
	/** Standard deviation of deflection in m */
	stdDevDeflection: number;
	/** 5th percentile deflection in m */
	p5Deflection: number;
	/** 95th percentile deflection in m */
	p95Deflection: number;
	/** Mean equilibrium temperature in K */
	meanTemp: number;
	/** Mean thermal gradient in K */
	meanGradient: number;
	/** Mean curvature in 1/m */
	meanCurvature: number;
	/** Mean tension ratio */
	meanTensionRatio: number;
	/** Fraction of runs passing phased array tolerance */
	phasedArrayPassRate: number;
	/** Fraction of runs passing structural tolerance */
	structuralPassRate: number;
}

/**
 * Aggregated Monte Carlo result across all areas
 */
export interface WarpingResult {
	/** Stats per area sweep point */
	areaStats: WarpingAreaStats[];
	/** Stats at the configured membrane area */
	configuredAreaStats: WarpingAreaStats;
}

/**
 * Monte Carlo simulation output wrapper
 */
export interface WarpingOutput {
	/** Configuration used */
	config: WarpingConfig;
	/** Aggregated results */
	result: WarpingResult;
	/** Number of Monte Carlo runs */
	runs: number;
	/** Execution time in milliseconds */
	executionTimeMs: number;
}

/**
 * Comparison result across multiple configurations
 */
export interface WarpingComparisonResult {
	/** Configurations compared */
	configs: WarpingConfig[];
	/** Results for each configuration */
	results: WarpingResult[];
	/** Labels for each configuration */
	labels: string[];
}

/**
 * Progress callback for Monte Carlo simulation
 */
export interface WarpingProgress {
	/** Current run number */
	currentRun: number;
	/** Total runs to complete */
	totalRuns: number;
	/** Percentage complete */
	percentComplete: number;
}
