/**
 * Capture Monte Carlo Simulation Types
 *
 * Types for modeling payload capture system options for mass drivers
 * launching materials from asteroids/Moon. Addresses research questions:
 * - RQ-1-25: Payload capture mechanisms for mass driver projectiles
 * - RQ-1-29: Impact forces and structural requirements for capture systems
 */

/**
 * Capture mechanism types for incoming payloads
 */
export type CaptureMethod =
	| 'magnetic'      // Electromagnetic deceleration
	| 'mechanical'    // Mechanical arms/clamps
	| 'net'           // Deployment nets
	| 'foam'          // Impact-absorbing foam
	| 'tether';       // Rotating tether capture

/**
 * Failure mode types that can occur during capture
 */
export type CaptureFailureMode =
	| 'miss'              // Payload missed capture envelope
	| 'overspeed'         // Velocity too high for capture
	| 'structural'        // Structural damage from impact
	| 'timing'            // Timing/synchronization failure
	| 'mechanism'         // Capture mechanism malfunction
	| 'angle'             // Approach angle out of tolerance
	| 'overload';         // Energy absorption exceeded capacity

/**
 * Configuration for capture simulation
 */
export interface CaptureConfig {
	/** Payload mass in kg (10-1000) */
	payloadMassKg: number;
	/** Arrival velocity in m/s (10-500) */
	arrivalVelocityMs: number;
	/** Type of capture mechanism */
	captureMethod: CaptureMethod;
	/** Target position accuracy (position error in meters, 0.1-10) */
	targetAccuracyM: number;
	/** Approach angle variance in degrees (0-15) */
	approachAngleVarianceDeg: number;
	/** Timing accuracy in milliseconds (1-100) */
	timingAccuracyMs: number;
	/** Maximum structural stress capacity (1-5 scale, 1=fragile, 5=reinforced) */
	structuralRating: number;
	/** Operating temperature in Celsius (-100 to 200) */
	operatingTemperature: number;
	/** Whether redundant capture systems are available */
	redundantSystems: boolean;
	/** Number of Monte Carlo iterations */
	iterations: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Result of a single capture attempt
 */
export interface CaptureAttemptResult {
	/** Whether this capture attempt succeeded */
	success: boolean;
	/** Failure mode if unsuccessful */
	failureMode?: CaptureFailureMode;
	/** Actual position error at capture in meters */
	actualPositionErrorM: number;
	/** Actual approach angle deviation in degrees */
	actualAngleDeviationDeg: number;
	/** Energy absorbed during capture in Joules */
	energyAbsorbedJ: number;
	/** Peak structural stress experienced (relative to capacity) */
	peakStressFraction: number;
	/** Time to complete capture in seconds */
	captureTimeS: number;
	/** Whether backup system was used */
	usedBackupSystem: boolean;
}

/**
 * Detailed failure information
 */
export interface CaptureFailureInfo {
	/** Type of failure */
	mode: CaptureFailureMode;
	/** Probability of this failure mode */
	probability: number;
	/** Description of the failure */
	description: string;
	/** Mitigation strategies */
	mitigations: string[];
}

/**
 * Single simulation run result
 */
export interface CaptureRunResult {
	/** Run identifier */
	runId: number;
	/** Configuration used for this run */
	config: CaptureConfig;
	/** Whether capture ultimately succeeded */
	success: boolean;
	/** Detailed attempt result */
	attemptResult: CaptureAttemptResult;
	/** Kinetic energy of incoming payload in Joules */
	kineticEnergyJ: number;
	/** Required deceleration in g's */
	requiredDecelerationG: number;
	/** Capture window duration in seconds */
	captureWindowS: number;
}

/**
 * Aggregated statistics from Monte Carlo runs
 */
export interface CaptureStats {
	/** Mean success rate (0-100%) */
	successRate: number;
	/** Standard deviation of success rate */
	successRateStdDev: number;
	/** Mean energy absorbed in Joules */
	meanEnergyAbsorbedJ: number;
	/** Standard deviation of energy absorbed */
	energyAbsorbedStdDev: number;
	/** Mean peak stress fraction (0-1) */
	meanPeakStress: number;
	/** Maximum peak stress observed */
	maxPeakStress: number;
	/** Mean capture time in seconds */
	meanCaptureTimeS: number;
	/** 95th percentile capture time */
	captureTime95Percentile: number;
	/** Fraction of captures that used backup system */
	backupSystemUsageRate: number;
	/** Failure mode breakdown (mode -> count) */
	failureModeBreakdown: Record<CaptureFailureMode, number>;
	/** Total failures by category */
	failuresByCategory: {
		targeting: number;       // miss, angle
		velocity: number;        // overspeed, timing
		structural: number;      // structural, overload
		mechanical: number;      // mechanism
	};
}

/**
 * Aggregated Monte Carlo result
 */
export interface CaptureResult {
	/** Statistics from all runs */
	stats: CaptureStats;
	/** Success rate confidence interval (95%) */
	confidenceInterval95: {
		lower: number;
		upper: number;
	};
	/** Energy distribution data points for visualization */
	energyDistribution: {
		energy: number;
		cumulativeProbability: number;
	}[];
	/** Stress distribution data points */
	stressDistribution: {
		stress: number;
		frequency: number;
	}[];
	/** Failure mode probabilities */
	failureModeProbabilities: CaptureFailureInfo[];
	/** Reliability recommendation */
	reliabilityGrade: 'A' | 'B' | 'C' | 'D' | 'F';
	/** Recommendation text */
	recommendation: string;
}

/**
 * Monte Carlo simulation output wrapper
 */
export interface CaptureOutput {
	/** Configuration used */
	config: CaptureConfig;
	/** Aggregated results */
	result: CaptureResult;
	/** Number of Monte Carlo runs */
	runs: number;
	/** Execution time in milliseconds */
	executionTimeMs: number;
}

/**
 * Method comparison result
 */
export interface MethodComparisonResult {
	/** Methods compared */
	methods: CaptureMethod[];
	/** Configurations for each method */
	configs: CaptureConfig[];
	/** Results for each method */
	results: CaptureResult[];
	/** Index of optimal method */
	optimalMethodIndex: number;
	/** Analysis summary */
	analysis: {
		/** Best success rate achieved */
		bestSuccessRate: number;
		/** Most energy-efficient method */
		mostEnergyEfficient: CaptureMethod;
		/** Lowest structural stress method */
		lowestStressMethod: CaptureMethod;
		/** Recommendation text */
		recommendation: string;
	};
}

/**
 * Progress callback for Monte Carlo simulation
 */
export interface CaptureProgress {
	/** Current run number */
	currentRun: number;
	/** Total runs to complete */
	totalRuns: number;
	/** Percentage complete */
	percentComplete: number;
	/** Current capture method being simulated */
	method?: CaptureMethod;
}

/**
 * Method-specific characteristics
 */
export interface MethodCharacteristics {
	/** Base reliability factor (higher = more reliable) */
	baseReliability: number;
	/** Maximum velocity this method can handle (m/s) */
	maxVelocityMs: number;
	/** Energy absorption efficiency (0-1) */
	energyEfficiency: number;
	/** Structural stress multiplier (lower = gentler) */
	stressMultiplier: number;
	/** Timing sensitivity (lower = more forgiving) */
	timingSensitivity: number;
	/** Angle tolerance in degrees */
	angleToleranceDeg: number;
	/** Capture window duration in seconds */
	captureWindowS: number;
	/** Primary failure modes and their base probabilities */
	failureProbabilities: Partial<Record<CaptureFailureMode, number>>;
}

/**
 * Payload capture envelope parameters
 */
export interface CaptureEnvelope {
	/** Maximum position error tolerance in meters */
	maxPositionErrorM: number;
	/** Maximum angle deviation tolerance in degrees */
	maxAngleDeviationDeg: number;
	/** Minimum capture window duration in seconds */
	minCaptureWindowS: number;
	/** Maximum kinetic energy the system can absorb in Joules */
	maxKineticEnergyJ: number;
}
