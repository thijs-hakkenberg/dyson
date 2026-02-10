/**
 * Solar Mass Extraction Rate Simulation Types
 *
 * Types for modeling solar mass extraction rate limits, stellar response,
 * and stability boundaries for Caplan engine operations.
 * Addresses research question rq-3b-2.
 */

/**
 * Solar activity level affecting chromospheric conditions
 */
export type SolarActivityLevel = 'minimum' | 'moderate' | 'maximum';

/**
 * Risk classification for extraction operations
 */
export type RiskLevel = 'safe' | 'caution' | 'danger' | 'critical';

/**
 * Configuration for solar mass extraction simulation
 */
export interface ExtractionConfig {
	/** Target extraction rate in kg/s (1e9 - 1e13) */
	extractionRate: number;
	/** Number of extraction stations (10 - 10000) */
	stationCount: number;
	/** Beam power per station in Watts (1e18 - 1e22) */
	beamPower: number;
	/** Lifting efficiency fraction (0.01 - 0.10) */
	liftingEfficiency: number;
	/** Solar activity level */
	solarActivity: SolarActivityLevel;
	/** Mission duration in years (100 - 10000) */
	missionDuration: number;
	/** Monte Carlo iterations */
	iterations: number;
	/** Random seed */
	seed?: number;
}

/**
 * A single extraction analysis point at one parameter set
 */
export interface ExtractionPoint {
	/** Extraction rate in kg/s */
	extractionRate: number;
	/** Achieved lifting efficiency */
	efficiency: number;
	/** Plume velocity in m/s */
	plumeVelocity: number;
	/** Stability margin (0-1, higher is safer) */
	stabilityMargin: number;
	/** Fractional luminosity perturbation */
	luminosityPerturbation: number;
	/** Total energy budget required in Watts */
	energyBudget: number;
	/** Number of stations required */
	stationsRequired: number;
	/** Whether this extraction rate is feasible */
	feasible: boolean;
}

/**
 * Result of a single extraction run (one Monte Carlo iteration)
 */
export interface ExtractionRunResult {
	/** Sweep points across extraction rates */
	sweepPoints: ExtractionPoint[];
	/** Optimal extraction rate (max feasible) */
	optimalRate: number;
	/** Maximum feasible extraction rate */
	maxFeasibleRate: number;
	/** Total mass extracted over mission duration in kg */
	totalMassExtracted: number;
}

/**
 * Aggregated Monte Carlo extraction result
 */
export interface ExtractionResult {
	/** Mean sweep points */
	meanSweepPoints: ExtractionPoint[];
	/** Optimal rate statistics */
	optimalRate: { mean: number; low: number; high: number };
	/** Max feasible rate statistics */
	maxFeasibleRate: { mean: number; low: number; high: number };
	/** Total mass extracted statistics */
	totalMassExtracted: { mean: number; low: number; high: number };
	/** Stability margin at configured rate */
	stabilityMargin: { mean: number; low: number; high: number };
	/** Luminosity perturbation at configured rate */
	luminosityPerturbation: { mean: number; low: number; high: number };
	/** Energy budget at configured rate */
	energyBudget: { mean: number; low: number; high: number };
	/** Risk classification at configured rate */
	riskLevel: RiskLevel;
	/** Whether pre-computed response surfaces were used */
	usedResponseSurfaces: boolean;
	/** Number of iterations completed */
	iterations: number;
	/** Configuration used */
	config: ExtractionConfig;
	/** Execution time in ms */
	executionTimeMs: number;
}

/**
 * Output wrapping result with optional comparison
 */
export interface ExtractionOutput {
	/** Primary result */
	result: ExtractionResult;
	/** Comparison results if in comparison mode */
	comparisons?: ExtractionResult[];
}

/**
 * Comparison of multiple extraction configurations
 */
export interface ExtractionComparisonResult {
	/** Configurations compared */
	configs: ExtractionConfig[];
	/** Results for each configuration */
	results: ExtractionResult[];
	/** Which config achieved highest feasible rate */
	bestFeasibleIndex: number;
	/** Which config achieved highest total mass */
	bestMassIndex: number;
}

/**
 * Progress callback for extraction simulation
 */
export interface ExtractionProgress {
	/** Current iteration */
	currentStep: number;
	/** Total iterations */
	totalSteps: number;
	/** Percent complete */
	percentComplete: number;
}

/**
 * Pre-computed response surface data from offline Python script
 */
export interface ResponseSurfaceData {
	grid: {
		extractionRates: number[];
		beamPowers: number[];
	};
	points: Array<{
		er: number;
		bp: number;
		efficiency: number;
		plumeVelocity: number;
		stabilityMargin: number;
		luminosityPerturbation: number;
		stationsRequired: number;
		feasible: boolean;
	}>;
}
