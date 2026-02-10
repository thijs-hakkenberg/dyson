/**
 * Membrane Deployment Dynamics Simulation Types
 *
 * Types for modeling structural stability and flutter boundaries
 * for large-scale thin-film membrane deployment.
 * Addresses research question:
 * - RQ-1-7: Large-scale membrane deployment dynamics
 */

/**
 * Stability classification for membrane configuration
 */
export type StabilityClass = 'stable' | 'marginal' | 'flutter';

/**
 * Configuration for membrane dynamics simulation
 */
export interface MembraneConfig {
	/** Membrane diameter in meters (100-1000) */
	diameter: number;
	/** Areal density in g/m^2 (35-50) */
	arealDensity: number;
	/** Applied tension in N/m (0.1-10) */
	tension: number;
	/** Spin rate in RPM (0-0.5) */
	spinRate: number;
	/** Boom stiffness in N/m (1e3-1e6) */
	boomStiffness: number;
	/** Structural damping ratio (0.01-0.10) */
	dampingRatio: number;
	/** Orbital distance from Sun in AU (0.3-1.0) */
	orbitalDistance: number;
	/** Number of Monte Carlo iterations */
	iterations: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Modal analysis result for a single parameter point
 */
export interface ModalResult {
	/** First 20 eigenvalues (rad/s)^2 */
	eigenvalues: number[];
	/** Natural frequencies in Hz */
	naturalFrequencies: number[];
	/** Flutter margin ratio (>2 stable, 1-2 marginal, <1 flutter) */
	flutterMargin: number;
	/** Stability classification */
	stability: StabilityClass;
	/** Effective tension including centrifugal contribution (N/m) */
	effectiveTension: number;
	/** Solar radiation pressure force per area (N/m^2) */
	srpForcePerArea: number;
}

/**
 * Sweep point for diameter sweep analysis
 */
export interface MembraneSweepPoint {
	/** Membrane diameter in meters */
	diameter: number;
	/** Stability classification */
	stability: StabilityClass;
	/** Flutter margin ratio */
	flutterMargin: number;
	/** Lowest natural frequency in Hz */
	lowestFrequency: number;
	/** Minimum tension for flutter-free operation (N/m) */
	flutterBoundaryTension: number;
}

/**
 * Single Monte Carlo run result with stochastic variation
 */
export interface MembraneRunResult {
	/** Run identifier */
	runId: number;
	/** Configuration used */
	config: MembraneConfig;
	/** Modal analysis result */
	modal: ModalResult;
	/** Perturbed tension (with manufacturing variation) */
	perturbedTension: number;
	/** Perturbed areal density (with manufacturing variation) */
	perturbedDensity: number;
}

/**
 * Aggregated Monte Carlo result
 */
export interface MembraneResult {
	/** Stability boundary sweep data */
	sweepPoints: MembraneSweepPoint[];
	/** Modal result for current config */
	modalResult: ModalResult;
	/** Fraction of runs classified as stable */
	stableFraction: number;
	/** Fraction of runs classified as marginal */
	marginalFraction: number;
	/** Fraction of runs classified as flutter */
	flutterFraction: number;
	/** Mean flutter margin across runs */
	meanFlutterMargin: number;
	/** Std dev of flutter margin */
	stdDevFlutterMargin: number;
	/** Mean lowest natural frequency (Hz) */
	meanLowestFrequency: number;
}

/**
 * Simulation output wrapper
 */
export interface MembraneOutput {
	/** Configuration used */
	config: MembraneConfig;
	/** Aggregated results */
	result: MembraneResult;
	/** Number of Monte Carlo runs */
	runs: number;
	/** Execution time in milliseconds */
	executionTimeMs: number;
	/** Whether pre-computed grid data was used */
	usedPrecomputed: boolean;
}

/**
 * Comparison result across configurations
 */
export interface MembraneComparisonResult {
	/** Configurations compared */
	configs: MembraneConfig[];
	/** Results for each configuration */
	results: MembraneResult[];
	/** Analysis summary */
	analysis: {
		bestFlutterMargin: number;
		bestDiameterForStability: number;
		recommendation: string;
	};
}

/**
 * Progress callback for Monte Carlo simulation
 */
export interface MembraneProgress {
	/** Current run number */
	currentRun: number;
	/** Total runs to complete */
	totalRuns: number;
	/** Percentage complete */
	percentComplete: number;
	/** Current phase description */
	phase?: string;
}

/**
 * Pre-computed modal grid data (loaded from JSON artifact)
 */
export interface ModalGridData {
	/** Grid axis values */
	grid: {
		diameters: number[];
		tensions: number[];
		spinRates: number[];
		arealDensities: number[];
	};
	/** Grid points indexed by [d][t][s][a] */
	points: ModalGridPoint[];
}

/**
 * Single point in the pre-computed grid
 */
export interface ModalGridPoint {
	/** Diameter index */
	d: number;
	/** Tension index */
	t: number;
	/** Spin rate index */
	s: number;
	/** Areal density index */
	a: number;
	/** First 20 eigenvalues */
	eigenvalues: number[];
	/** Flutter margin */
	flutterMargin: number;
	/** Stability classification */
	stability: StabilityClass;
}
