/**
 * Supply Chain Monte Carlo Simulation Types
 *
 * Types for modeling xenon propellant supply chain constraints
 * for Project Dyson Phase 1 deployment.
 *
 * Addresses research questions:
 * - RQ-1-3: Critical material supply chains
 * - RQ-0-20: Xenon propellant sourcing at scale
 */

/**
 * Configuration for supply chain simulation
 */
export interface SupplyChainConfig {
	/** Xenon production rate (tonnes/year) - global baseline */
	xenonProductionRate: number;
	/** Xenon demand for Phase 1 (total tonnes needed) */
	xenonDemandPhase1: number;
	/** Krypton availability (tonnes/year) */
	kryptonAvailability: number;
	/** Argon availability (tonnes/year) */
	argonAvailability: number;
	/** Rare earth production rates (tonnes/year) */
	rareEarthProduction: {
		tellurium: number;
		indium: number;
		gallium: number;
	};
	/** Learning curve effect (0-1, demand reduction over time) */
	learningCurveEffect: number;
	/** Years to accumulate stockpile before Phase 1 */
	stockpilingYears: number;
	/** Number of Monte Carlo iterations */
	iterations: number;
	/** Annual production growth rate (0-1, e.g., 0.03 = 3%) */
	productionGrowthRate: number;
	/** Demand uncertainty range (0-1, e.g., 0.3 = +/-30%) */
	demandUncertaintyRange: number;
	/** Price elasticity of supply (0-1) */
	priceElasticity: number;
	/** Project allocation fraction of global xenon production (0-1) */
	projectAllocationFraction: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Sampled parameters for a single Monte Carlo run
 */
export interface SampledSupplyParams {
	/** Sampled xenon production rate (tonnes/year) */
	xenonProductionRate: number;
	/** Sampled Phase 1 demand (tonnes) */
	xenonDemand: number;
	/** Sampled production growth rate */
	productionGrowthRate: number;
	/** Sampled project allocation fraction */
	allocationFraction: number;
	/** Sampled krypton Isp ratio */
	kryptonIspRatio: number;
	/** Sampled argon Isp ratio */
	argonIspRatio: number;
}

/**
 * Year-by-year supply/demand balance data
 */
export interface YearlyBalance {
	/** Year number (1, 2, 3, ...) */
	year: number;
	/** Xenon supply available this year (tonnes) */
	supply: number;
	/** Xenon demand this year (tonnes) */
	demand: number;
	/** Deficit this year (supply - demand, negative = shortage) */
	deficit: number;
	/** Cumulative supply to date (tonnes) */
	cumulativeSupply: number;
	/** Cumulative demand to date (tonnes) */
	cumulativeDemand: number;
	/** Current stockpile (tonnes) */
	stockpile: number;
	/** Market price ($/kg) */
	price: number;
}

/**
 * Alternative propellant evaluation
 */
export interface AlternativePropellant {
	/** Propellant name */
	name: string;
	/** Specific impulse ratio relative to xenon (1.0 = same) */
	ispRatio: number;
	/** Annual availability (tonnes/year) */
	availability: number;
	/** Cost ratio relative to xenon (1.0 = same) */
	costRatio: number;
	/** Whether this propellant is viable for the mission */
	viable: boolean;
	/** Mass scale factor due to lower Isp (more propellant needed) */
	scaleFactor: number;
}

/**
 * Single simulation run result
 */
export interface SupplyChainRunResult {
	/** Run identifier */
	runId: number;
	/** Sampled parameters for this run */
	sampledParams: SampledSupplyParams;
	/** Year-by-year balance data */
	yearByYearBalance: YearlyBalance[];
	/** Year when supply becomes insufficient (null if never) */
	constraintYear: number | null;
	/** Alternative propellant viability */
	alternativePropellantViability: {
		krypton: AlternativePropellant;
		argon: AlternativePropellant;
	};
	/** Total cost impact from supply constraints ($) */
	totalCostImpact: number;
	/** Stockpile required for buffer (tonnes) */
	stockpileRequired: number;
	/** Years needed to accumulate stockpile */
	yearsToAccumulate: number;
	/** Whether Phase 1 demand can be met */
	demandMet: boolean;
}

/**
 * Aggregated statistics across Monte Carlo runs
 */
export interface SupplyChainStats {
	/** Mean year when constraints occur */
	constraintYearMean: number;
	/** Standard deviation of constraint year */
	constraintYearStdDev: number;
	/** Percentage of runs where constraints occurred */
	constraintOccurrencePercent: number;
	/** Mean stockpile required (tonnes) */
	stockpileRequiredMean: number;
	/** Standard deviation of stockpile required */
	stockpileRequiredStdDev: number;
	/** Cost sensitivity (% cost increase per supply constraint) */
	costSensitivity: number;
	/** Percentage of runs where krypton is viable */
	kryptonViabilityPercent: number;
	/** Percentage of runs where argon is viable */
	argonViabilityPercent: number;
	/** Mean years to accumulate stockpile */
	yearsToAccumulateMean: number;
	/** Percentage of runs where demand is met */
	demandMetPercent: number;
	/** 95% confidence interval for stockpile required */
	stockpileCI95: {
		lower: number;
		upper: number;
	};
	/** Recommended strategy based on analysis */
	recommendedStrategy: string;
}

/**
 * Final Monte Carlo simulation output
 */
export interface SupplyChainOutput {
	/** Configuration used */
	config: SupplyChainConfig;
	/** Number of Monte Carlo runs */
	runs: number;
	/** Aggregated statistics */
	stats: SupplyChainStats;
	/** Individual run results (optional, for detailed analysis) */
	runResults?: SupplyChainRunResult[];
	/** Execution time in milliseconds */
	executionTimeMs: number;
}

/**
 * Progress callback data
 */
export interface SupplyChainProgress {
	/** Current run number */
	currentRun: number;
	/** Total runs */
	totalRuns: number;
	/** Percent complete */
	percentComplete: number;
	/** Current scenario name (for comparison runs) */
	scenarioName?: string;
}

/**
 * Scenario for comparison simulations
 */
export interface SupplyChainScenario {
	/** Scenario name */
	name: string;
	/** Configuration for this scenario */
	config: SupplyChainConfig;
}

/**
 * Comparison result for a single scenario
 */
export interface SupplyChainScenarioResult {
	/** Scenario name */
	name: string;
	/** Configuration for this scenario */
	config: SupplyChainConfig;
	/** Simulation output */
	output: SupplyChainOutput;
}

/**
 * Result of comparing multiple scenarios
 */
export interface SupplyChainComparisonResult {
	/** All scenarios compared */
	scenarios: SupplyChainScenarioResult[];
	/** Analysis summary */
	analysis: {
		/** Scenario with lowest constraint risk */
		lowestRiskScenario: string;
		/** Scenario with fastest accumulation */
		fastestAccumulationScenario: string;
		/** Scenario with lowest cost impact */
		lowestCostScenario: string;
		/** Recommendations based on analysis */
		recommendations: string[];
	};
}
