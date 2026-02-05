/**
 * PV Radiation Degradation Simulation Types
 *
 * Types for modeling thin-film PV survival at 0.3-0.5 AU over 5-25 years.
 * Addresses research questions:
 * - RQ-1-1: PV technology selection for radiation environment
 * - RQ-0-25: Thin-film viability in Phase 0 demonstrator
 * - RQ-2-2: PV degradation in Phase 2 swarm expansion
 */

/**
 * PV technology types for Dyson swarm collectors
 */
export type PVTechnology = 'perovskite' | 'cdte' | 'iii-v' | 'silicon' | 'hybrid';

/**
 * Configuration for radiation degradation simulation
 */
export interface RadiationDegradationConfig {
	/** Distance from Sun in AU (0.3-1.0) */
	orbitalDistance: number;
	/** PV cell technology type */
	pvTechnology: PVTechnology;
	/** Shielding mass in g/m^2 */
	shieldingMass: number;
	/** Mission duration in years (5-25) */
	missionDuration: number;
	/** Initial cell efficiency as percentage (20-35) */
	initialEfficiency: number;
	/** Expected solar proton events per year (1-20) */
	solarProtonEventRate: number;
	/** Enable thermal cycling damage model */
	temperatureCycling: boolean;
	/** Number of Monte Carlo iterations */
	iterations: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Power curve data point
 */
export interface PowerCurvePoint {
	/** Year in mission */
	year: number;
	/** Efficiency percentage at this year */
	efficiency: number;
	/** Power output in W/m^2 at current efficiency */
	power: number;
}

/**
 * Replacement event record
 */
export interface ReplacementEvent {
	/** Year when replacement is needed */
	year: number;
	/** Reason for replacement */
	reason: string;
}

/**
 * Shielding trade-off analysis
 */
export interface ShieldingTradeoff {
	/** Percent increase in shielding mass */
	massPercentIncrease: number;
	/** Percent increase in lifetime from additional shielding */
	lifetimePercentIncrease: number;
}

/**
 * Single simulation run result
 */
export interface RadiationDegradationRunResult {
	/** Run identifier */
	runId: number;
	/** Configuration used for this run */
	config: RadiationDegradationConfig;
	/** Efficiency and power over time */
	powerCurve: PowerCurvePoint[];
	/** Final efficiency at end of mission */
	endOfLifeEfficiency: number;
	/** Year when efficiency reaches 50% of initial */
	halfLifeYear: number;
	/** Total efficiency loss from SPE events */
	totalSPEDamage: number;
	/** Thermal fatigue multiplier applied */
	thermalFatigueFactor: number;
	/** Average degradation rate per year */
	degradationRatePerYear: number;
}

/**
 * Aggregated Monte Carlo result
 */
export interface RadiationDegradationResult {
	/** Mean power curve across all runs */
	powerCurve: PowerCurvePoint[];
	/** Standard deviation at each year */
	powerCurveStdDev: number[];
	/** Mean end-of-life efficiency */
	endOfLifeEfficiency: number;
	/** Standard deviation of end-of-life efficiency */
	endOfLifeEfficiencyStdDev: number;
	/** Mean half-life year */
	halfLifeYear: number;
	/** Standard deviation of half-life */
	halfLifeYearStdDev: number;
	/** Recommended replacement schedule */
	replacementSchedule: ReplacementEvent[];
	/** Shielding mass vs lifetime trade-off */
	shieldingTradeoff: ShieldingTradeoff;
	/** 95% confidence interval for end-of-life efficiency */
	confidenceInterval95: {
		efficiencyLower: number;
		efficiencyUpper: number;
	};
	/** Percentage of runs surviving to end of mission above threshold */
	survivalProbability: number;
}

/**
 * Monte Carlo simulation output wrapper
 */
export interface RadiationDegradationOutput {
	/** Configuration used */
	config: RadiationDegradationConfig;
	/** Aggregated results */
	result: RadiationDegradationResult;
	/** Number of Monte Carlo runs */
	runs: number;
	/** Execution time in milliseconds */
	executionTimeMs: number;
}

/**
 * Comparison result across multiple technologies or configurations
 */
export interface RadiationDegradationComparisonResult {
	/** Configurations compared */
	configs: RadiationDegradationConfig[];
	/** Results for each configuration */
	results: RadiationDegradationResult[];
	/** Index of optimal technology/configuration */
	optimalTechnologyIndex: number;
	/** Analysis summary */
	analysis: {
		/** Best half-life achieved */
		bestLifetime: number;
		/** Best end-of-life efficiency achieved */
		bestEfficiency: number;
		/** Recommendation text */
		recommendation: string;
	};
}

/**
 * Progress callback for Monte Carlo simulation
 */
export interface RadiationDegradationProgress {
	/** Current run number */
	currentRun: number;
	/** Total runs to complete */
	totalRuns: number;
	/** Percentage complete */
	percentComplete: number;
	/** Current technology being simulated */
	pvTechnology?: PVTechnology;
}
