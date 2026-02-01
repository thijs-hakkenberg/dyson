/**
 * Domain types for the NEA Constellation Coverage Simulator
 */

// Propulsion system types
export type PropulsionType = 'electric' | 'chemical' | 'hybrid';

// NEA spectral types with mining value implications
export type NEAType = 'M' | 'C' | 'S' | 'X';

/**
 * Orbital elements for a Near-Earth Asteroid
 */
export interface OrbitalElements {
	a: number;        // Semi-major axis (AU)
	e: number;        // Eccentricity
	i: number;        // Inclination (degrees)
	omega: number;    // Argument of perihelion (degrees)
	Omega: number;    // Longitude of ascending node (degrees)
	M: number;        // Mean anomaly (degrees)
}

/**
 * Represents a Near-Earth Asteroid
 */
export interface NEA {
	id: string;
	name: string;
	type: NEAType;
	diameter: number;           // meters
	estimatedMass: number;      // kg
	miningValue: number;        // relative value 0-1
	orbital: OrbitalElements;
	perihelion: number;         // AU
	aphelion: number;           // AU
}

/**
 * Represents a survey satellite in the constellation
 */
export interface Satellite {
	id: string;
	deltaVBudget: number;       // km/s remaining
	maxDeltaV: number;          // km/s total capacity
	surveysCompleted: number;
	status: 'operational' | 'failed';
	assignedTargets: string[];  // NEA IDs
}

/**
 * Configuration for simulation parameters
 */
export interface SimulationConfig {
	constellationSize: number;     // 20-70 satellites
	missionDuration: number;       // years (5-10)
	annualFailureRate: number;     // 0-0.10 (0-10%)
	propulsionType: PropulsionType;
	monteCarloRuns: number;        // 100-1000
	neaPopulationSize: number;     // typically ~2000
}

/**
 * Results from a single simulation run
 */
export interface SimulationRun {
	runId: number;
	constellationSize: number;
	totalNEAs: number;
	highValueNEAs: number;
	surveyedNEAs: number;
	surveyedHighValueNEAs: number;
	coveragePercent: number;
	highValueCoveragePercent: number;
	satelliteFailures: number;
	avgDeltaVUsed: number;
	yearlyStats: YearlyStats[];
}

/**
 * Statistics for each year of the mission
 */
export interface YearlyStats {
	year: number;
	operationalSatellites: number;
	newSurveysThisYear: number;
	cumulativeSurveys: number;
	failuresThisYear: number;
}

/**
 * Aggregated results across all Monte Carlo runs for a constellation size
 */
export interface ConstellationResult {
	constellationSize: number;
	runs: number;
	coverage: {
		mean: number;
		stdDev: number;
		min: number;
		max: number;
		percentile5: number;
		percentile95: number;
	};
	highValueCoverage: {
		mean: number;
		stdDev: number;
		min: number;
		max: number;
		percentile5: number;
		percentile95: number;
	};
	avgFailures: number;
	avgDeltaVUsed: number;
}

/**
 * Complete simulation output with analysis
 */
export interface SimulationOutput {
	config: SimulationConfig;
	results: ConstellationResult[];
	analysis: SimulationAnalysis;
	executionTimeMs: number;
}

/**
 * Analysis of simulation results
 */
export interface SimulationAnalysis {
	kneePoint: number;               // Constellation size at diminishing returns
	minimumViableSize: number;       // Size for 80% high-value coverage
	optimalSize: number;             // Best cost/coverage ratio
	baselineComparison: {
		size: number;                  // 50 satellites baseline
		coverageMean: number;
		coverageStdDev: number;
	};
}

/**
 * Message types for Web Worker communication
 */
export interface WorkerMessage {
	type: 'start' | 'progress' | 'complete' | 'error';
	data?: SimulationConfig | SimulationProgress | SimulationOutput | string;
}

/**
 * Progress update during simulation
 */
export interface SimulationProgress {
	currentSize: number;
	totalSizes: number;
	currentRun: number;
	totalRuns: number;
	percentComplete: number;
}
