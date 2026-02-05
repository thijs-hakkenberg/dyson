/**
 * Deployment Reliability Simulation Types
 *
 * Types for modeling membrane/sail deployment success rates at scale
 * for the Dyson swarm. Addresses research questions:
 * - RQ-1-5: Deployment mechanisms for collector sails
 * - RQ-1-7: Thermal effects on deployment
 * - RQ-2-5: Scaling deployment to thousands of units
 */

/**
 * Deployment mechanism types for membrane/sail structures
 */
export type DeploymentMechanism = 'inflatable' | 'motor-driven' | 'centrifugal' | 'shape-memory' | 'hybrid';

/**
 * Deployment speed settings affecting success probability and time
 */
export type DeploymentSpeed = 'slow' | 'medium' | 'fast';

/**
 * Failure mode types that can occur during deployment
 */
export type FailureMode =
	| 'stuck'           // Mechanism failed to initiate
	| 'tear'            // Membrane tore during deployment
	| 'misalignment'    // Final position not within tolerance
	| 'thermal-warp'    // Thermal distortion during deployment
	| 'partial'         // Incomplete deployment (stuck partway)
	| 'oscillation';    // Unstable deployment causing damage

/**
 * Configuration for deployment reliability simulation
 */
export interface DeploymentConfig {
	/** Membrane/sail area in square meters (100-10,000) */
	membraneArea: number;
	/** Type of deployment mechanism */
	deploymentMechanism: DeploymentMechanism;
	/** Minimum temperature during deployment in Celsius (-150 to +150) */
	minTemperature: number;
	/** Maximum temperature during deployment in Celsius (-150 to +150) */
	maxTemperature: number;
	/** Deployment speed setting */
	deploymentSpeed: DeploymentSpeed;
	/** Number of deployment attempts allowed before declaring failure */
	maxAttempts: number;
	/** Membrane thickness in micrometers (affects tear probability) */
	membraneThickness: number;
	/** Distance from Sun in AU (affects thermal environment) */
	orbitalDistance: number;
	/** Whether thermal pre-conditioning is performed before deployment */
	thermalPreconditioning: boolean;
	/** Number of Monte Carlo iterations */
	iterations: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Result of a single deployment attempt
 */
export interface DeploymentAttemptResult {
	/** Whether this attempt succeeded */
	success: boolean;
	/** Failure mode if unsuccessful */
	failureMode?: FailureMode;
	/** Time taken for this attempt in minutes */
	attemptTimeMinutes: number;
	/** Final deployed area as fraction of target (0-1) */
	deployedAreaFraction: number;
	/** Temperature at time of failure/success in Celsius */
	actualTemperature: number;
}

/**
 * Detailed failure information
 */
export interface FailureModeInfo {
	/** Type of failure */
	mode: FailureMode;
	/** Probability of this failure mode */
	probability: number;
	/** Description of the failure */
	description: string;
	/** Factors that increase this failure probability */
	riskFactors: string[];
}

/**
 * Single simulation run result
 */
export interface DeploymentRunResult {
	/** Run identifier */
	runId: number;
	/** Configuration used for this run */
	config: DeploymentConfig;
	/** Whether deployment ultimately succeeded */
	success: boolean;
	/** Number of attempts needed (if successful) */
	attemptsNeeded: number;
	/** Results of each attempt */
	attemptResults: DeploymentAttemptResult[];
	/** Total time to complete deployment in minutes */
	totalTimeMinutes: number;
	/** Final deployed area fraction (0-1) */
	finalDeployedAreaFraction: number;
	/** Primary failure mode if unsuccessful */
	failureMode?: FailureMode;
}

/**
 * Aggregated statistics from Monte Carlo runs
 */
export interface DeploymentStats {
	/** Mean success rate (0-100%) */
	successRate: number;
	/** Standard deviation of success rate */
	successRateStdDev: number;
	/** Mean time to deploy in minutes */
	meanDeploymentTime: number;
	/** Standard deviation of deployment time */
	deploymentTimeStdDev: number;
	/** 95th percentile deployment time */
	deploymentTime95Percentile: number;
	/** Mean number of attempts needed for successful deployments */
	meanAttemptsNeeded: number;
	/** Mean final deployed area fraction */
	meanDeployedAreaFraction: number;
	/** Failure mode breakdown (mode -> count) */
	failureModeBreakdown: Record<FailureMode, number>;
	/** Total failures by category */
	failuresByCategory: {
		mechanical: number;
		thermal: number;
		structural: number;
	};
}

/**
 * Aggregated Monte Carlo result
 */
export interface DeploymentResult {
	/** Statistics from all runs */
	stats: DeploymentStats;
	/** Success rate confidence interval (95%) */
	confidenceInterval95: {
		lower: number;
		upper: number;
	};
	/** Time distribution data points for visualization */
	timeDistribution: {
		time: number;
		cumulativeProbability: number;
	}[];
	/** Failure mode probabilities */
	failureModeProbabilities: FailureModeInfo[];
	/** Reliability recommendation */
	reliabilityGrade: 'A' | 'B' | 'C' | 'D' | 'F';
	/** Recommendation text */
	recommendation: string;
}

/**
 * Monte Carlo simulation output wrapper
 */
export interface DeploymentOutput {
	/** Configuration used */
	config: DeploymentConfig;
	/** Aggregated results */
	result: DeploymentResult;
	/** Number of Monte Carlo runs */
	runs: number;
	/** Execution time in milliseconds */
	executionTimeMs: number;
}

/**
 * Comparison result across multiple configurations
 */
export interface DeploymentComparisonResult {
	/** Configurations compared */
	configs: DeploymentConfig[];
	/** Results for each configuration */
	results: DeploymentResult[];
	/** Index of optimal configuration */
	optimalConfigIndex: number;
	/** Analysis summary */
	analysis: {
		/** Best success rate achieved */
		bestSuccessRate: number;
		/** Best deployment time achieved */
		bestDeploymentTime: number;
		/** Recommendation text */
		recommendation: string;
	};
}

/**
 * Progress callback for Monte Carlo simulation
 */
export interface DeploymentProgress {
	/** Current run number */
	currentRun: number;
	/** Total runs to complete */
	totalRuns: number;
	/** Percentage complete */
	percentComplete: number;
	/** Current mechanism being simulated */
	mechanism?: DeploymentMechanism;
}
