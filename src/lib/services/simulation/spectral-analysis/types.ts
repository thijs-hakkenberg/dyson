/**
 * Spectral Analysis Simulation Types
 *
 * Types for comparing on-board vs ground-based spectral unmixing.
 */

/**
 * Processing location for spectral data
 */
export type ProcessingLocation = 'onboard' | 'ground';

/**
 * Configuration for spectral analysis simulation
 */
export interface SpectralConfig {
	/** Where spectral data is processed */
	processingLocation: ProcessingLocation;
	/** Number of satellites in constellation */
	satelliteCount: number;
	/** Downlink bandwidth in Mbps */
	bandwidthMbps: number;
	/** Mission duration in years */
	missionDurationYears: number;
	/** NEA encounter rate per satellite per year */
	encounterRatePerYear: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * NEA encounter event
 */
export interface Encounter {
	id: string;
	satelliteId: string;
	/** Time of encounter (hours from mission start) */
	time: number;
	/** Observation window duration (hours) */
	windowHours: number;
	/** Raw spectral data size (MB) */
	rawDataSizeMb: number;
	/** Processed data size (MB) - much smaller */
	processedDataSizeMb: number;
	/** Priority score (0-1) */
	priority: number;
	/** Was the target surveyed? */
	surveyed: boolean;
	/** Reason if not surveyed */
	missedReason?: 'bandwidth' | 'latency' | 'window_closed';
}

/**
 * Yearly statistics
 */
export interface SpectralYearlyStats {
	year: number;
	encounters: number;
	surveyed: number;
	missed: number;
	bandwidthUtilization: number;
	avgDecisionLatencyHours: number;
}

/**
 * Single simulation run result
 */
export interface SpectralRunResult {
	runId: number;
	config: SpectralConfig;
	totalEncounters: number;
	targetsSurveyed: number;
	missedOpportunities: number;
	missedByBandwidth: number;
	missedByLatency: number;
	missedByWindow: number;
	bandwidthUtilization: number;
	avgDecisionLatencyHours: number;
	dataDownlinkedMb: number;
	yearlyStats: SpectralYearlyStats[];
}

/**
 * Aggregated results across Monte Carlo runs
 */
export interface SpectralResult {
	targetsSurveyed: number;
	targetsSurveyedStdDev: number;
	missedOpportunities: number;
	missedByBandwidth: number;
	missedByLatency: number;
	missedByWindow: number;
	bandwidthUtilization: number;
	avgDecisionLatencyHours: number;
	avgDecisionLatencyStdDev: number;
	surveyEfficiency: number; // targets surveyed / total encounters
	confidenceInterval95: {
		surveyedLower: number;
		surveyedUpper: number;
	};
}

/**
 * Monte Carlo simulation output
 */
export interface SpectralSimulationOutput {
	config: SpectralConfig;
	result: SpectralResult;
	runs: number;
	executionTimeMs: number;
}

/**
 * Comparison between on-board and ground processing
 */
export interface SpectralComparisonResult {
	onboardResult: SpectralResult;
	groundResult: SpectralResult;
	onboardConfig: SpectralConfig;
	groundConfig: SpectralConfig;
	analysis: {
		surveyedDifference: number;
		surveyedDifferencePercent: number;
		latencyDifferenceHours: number;
		bandwidthSavingsPercent: number;
		recommendation: string;
	};
}

/**
 * Progress callback for Monte Carlo
 */
export interface SpectralProgress {
	currentRun: number;
	totalRuns: number;
	percentComplete: number;
	processingLocation?: ProcessingLocation;
}
