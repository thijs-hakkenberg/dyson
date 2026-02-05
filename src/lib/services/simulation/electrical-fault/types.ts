/**
 * Electrical Fault Simulation Types
 *
 * Types for simulating high-voltage electrical fault analysis in the solar wind
 * plasma environment. Addresses research questions:
 * - RQ-1-4: High-voltage system design in plasma environment
 * - RQ-1-8: Insulation and fault protection requirements
 * - RQ-2-1: Power distribution architecture at scale
 */

/**
 * Insulation material types for HV systems
 */
export type InsulationMaterial = 'kapton' | 'polyimide' | 'teflon' | 'ceramic';

/**
 * Power distribution topology
 */
export type SystemTopology = 'series' | 'parallel' | 'hybrid';

/**
 * Fault propagation risk levels
 */
export type FaultPropagationRisk = 'low' | 'medium' | 'high';

/**
 * Configuration for electrical fault simulation
 */
export interface ElectricalFaultConfig {
	/** Operating voltage level in V (600-10000) */
	voltageLevel: number;
	/** Orbital distance from Sun in AU (0.3-1.0) */
	orbitalDistance: number;
	/** Insulation material type */
	insulationMaterial: InsulationMaterial;
	/** Insulation thickness in mm (0.1-5.0) */
	insulationThickness: number;
	/** Fault detection response time in ms */
	detectionResponseTime: number;
	/** Fault isolation response time in ms */
	isolationResponseTime: number;
	/** Power distribution topology */
	systemTopology: SystemTopology;
	/** Total power capacity in MW */
	totalPowerCapacity: number;
	/** Number of Monte Carlo iterations */
	iterations: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Yearly fault statistics
 */
export interface YearlyFaultStats {
	/** Year of mission */
	year: number;
	/** Number of arc discharge events */
	arcEvents: number;
	/** Number of faults successfully isolated */
	faultsIsolated: number;
	/** Number of cascade fault events */
	cascadeFaults: number;
	/** System availability fraction (0-1) */
	systemAvailability: number;
}

/**
 * Single simulation run result
 */
export interface ElectricalFaultRunResult {
	/** Run identifier */
	runId: number;
	/** Configuration used */
	config: ElectricalFaultConfig;
	/** Arc probability per year */
	arcProbabilityPerYear: number;
	/** Mean time between faults in hours */
	meanTimeBetweenFaults: number;
	/** Fault propagation risk level */
	faultPropagationRisk: FaultPropagationRisk;
	/** Insulation breakdown voltage in V */
	insulationBreakdownVoltage: number;
	/** Plasma density in particles/m^3 */
	plasmaDensity: number;
	/** Paschen breakdown voltage in V */
	paschenBreakdownVoltage: number;
	/** Total arc events over simulation */
	totalArcEvents: number;
	/** Total cascade faults */
	totalCascadeFaults: number;
	/** Year-by-year statistics */
	yearlyStats: YearlyFaultStats[];
}

/**
 * Aggregated result across Monte Carlo runs
 */
export interface ElectricalFaultResult {
	/** Mean arc probability per year */
	arcProbabilityPerYear: number;
	/** Standard deviation of arc probability */
	arcProbabilityStdDev: number;
	/** Mean time between faults in hours */
	meanTimeBetweenFaults: number;
	/** Standard deviation of MTBF */
	mtbfStdDev: number;
	/** Overall fault propagation risk */
	faultPropagationRisk: FaultPropagationRisk;
	/** Required isolation time for target risk level in ms */
	requiredIsolationTime: number;
	/** Recommended maximum voltage by orbital distance */
	recommendedVoltageByOrbit: Array<{ au: number; maxVoltage: number }>;
	/** Insulation material mass/reliability tradeoff */
	insulationMassTradeoff: Array<{
		material: string;
		massPerMW: number;
		reliability: number;
	}>;
	/** 95% confidence interval for arc probability */
	confidenceInterval95: {
		arcProbLower: number;
		arcProbUpper: number;
	};
}

/**
 * Monte Carlo simulation output
 */
export interface ElectricalFaultSimulationOutput {
	/** Configuration used */
	config: ElectricalFaultConfig;
	/** Aggregated results */
	result: ElectricalFaultResult;
	/** Number of runs completed */
	runs: number;
	/** Execution time in milliseconds */
	executionTimeMs: number;
}

/**
 * Comparison result for multiple configurations
 */
export interface ElectricalFaultComparisonResult {
	/** Configurations tested */
	configs: ElectricalFaultConfig[];
	/** Results for each configuration */
	results: ElectricalFaultResult[];
	/** Index of optimal configuration */
	optimalConfigIndex: number;
	/** Analysis summary */
	analysis: {
		bestMTBF: number;
		lowestArcProb: number;
		bestIsolationTime: number;
		recommendation: string;
	};
}

/**
 * Progress callback information
 */
export interface ElectricalFaultProgress {
	/** Current run number */
	currentRun: number;
	/** Total runs to complete */
	totalRuns: number;
	/** Completion percentage (0-100) */
	percentComplete: number;
	/** Current material being tested (for comparisons) */
	currentMaterial?: InsulationMaterial;
}
