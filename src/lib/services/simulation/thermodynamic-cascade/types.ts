/**
 * Thermodynamic Cascade Efficiency Simulator Types
 *
 * Types for modeling energy flow through nested Matrioshka brain shells,
 * where each shell harvests waste heat from inner layers.
 *
 * Addresses research question:
 * - RQ-3a-1: Thermodynamic cascade efficiency limits
 */

/**
 * Configuration for cascade simulation
 */
export interface CascadeConfig {
	/** Number of nested shells (2-7) */
	shellCount: number;
	/** Innermost shell temperature in Kelvin (800-1500) */
	innerTemp: number;
	/** Outermost shell temperature in Kelvin (20-100) */
	outerTemp: number;
	/** TPV efficiency as fraction of Carnot limit (0.20-0.50) */
	tpvEfficiency: number;
	/** Spectral selectivity fraction (0.80-0.99) */
	spectralSelectivity: number;
	/** Solar input power in Watts (default: L_SUN = 3.828e26) */
	solarInputPower: number;
	/** Minimum useful power per shell in Watts (default: 1e18) */
	minUsefulPower: number;
	/** Number of Monte Carlo iterations */
	iterations: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Data for a single shell in the cascade
 */
export interface ShellData {
	/** Shell index (0 = innermost) */
	index: number;
	/** Hot-side temperature in K */
	tempHot: number;
	/** Cold-side temperature in K */
	tempCold: number;
	/** Carnot efficiency for this shell */
	carnotEfficiency: number;
	/** Actual efficiency after TPV and spectral losses */
	actualEfficiency: number;
	/** Power input to this shell in W */
	powerIn: number;
	/** Power extracted by this shell in W */
	powerExtracted: number;
	/** Waste heat passed to next shell in W */
	powerWaste: number;
	/** Radiator area required in m^2 */
	radiatorArea: number;
	/** Whether this shell extracts meaningful power */
	isViable: boolean;
}

/**
 * Result of a single cascade simulation run
 */
export interface CascadeRunResult {
	/** Per-shell breakdown */
	shells: ShellData[];
	/** Total power extracted across all shells in W */
	totalExtracted: number;
	/** Total system efficiency (totalExtracted / solarInput) */
	totalEfficiency: number;
	/** Number of shells that produce viable power */
	viableShellCount: number;
	/** Total radiator area across all shells in m^2 */
	totalRadiatorArea: number;
}

/**
 * Aggregated Monte Carlo result with statistics
 */
export interface CascadeResult {
	/** Mean total efficiency across runs */
	meanEfficiency: number;
	/** Std dev of total efficiency */
	efficiencyStdDev: number;
	/** 95% confidence interval for efficiency */
	efficiencyCI: { lower: number; upper: number };
	/** Mean total power extracted in W */
	meanTotalExtracted: number;
	/** Mean viable shell count */
	meanViableShellCount: number;
	/** Mean total radiator area in m^2 */
	meanTotalRadiatorArea: number;
	/** Shell-by-shell breakdown (mean values) */
	shellBreakdown: ShellData[];
	/** Per-shell efficiency stats */
	shellEfficiencyStats: {
		index: number;
		meanEfficiency: number;
		meanPowerExtracted: number;
		meanPowerWaste: number;
		meanRadiatorArea: number;
	}[];
}

/**
 * Full simulation output with config, results, and timing
 */
export interface CascadeOutput {
	/** Configuration used */
	config: CascadeConfig;
	/** Aggregated results */
	result: CascadeResult;
	/** Number of Monte Carlo runs */
	runs: number;
	/** Execution time in milliseconds */
	executionTimeMs: number;
}

/**
 * Comparison of multiple cascade configurations
 */
export interface CascadeComparisonResult {
	/** Configurations compared */
	configs: CascadeConfig[];
	/** Results for each configuration */
	results: CascadeResult[];
	/** Labels for each configuration */
	labels: string[];
	/** Index of best configuration by efficiency */
	bestEfficiencyIndex: number;
	/** Analysis summary */
	analysis: {
		bestEfficiency: number;
		bestShellCount: number;
		recommendation: string;
	};
}

/**
 * Progress callback data
 */
export interface CascadeProgress {
	/** Current run number */
	currentRun: number;
	/** Total runs to complete */
	totalRuns: number;
	/** Percentage complete */
	percentComplete: number;
}
