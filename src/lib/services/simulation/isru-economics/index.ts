/**
 * ISRU Economics Simulation
 *
 * Monte Carlo simulation for comparing in-space (ISRU) vs Earth-based
 * manufacturing economics for Project Dyson swarm deployment.
 *
 * Addresses research question rq-1-12: At what scale does in-space
 * manufacturing become more economical than Earth manufacturing + launch?
 */

export * from './types';

export {
	sampleParameters,
	calculateEarthTrajectoryWithUncertainty,
	calculateISRUTrajectoryWithUncertainty,
	findCrossoverPointDetailed,
	calculateBreakEvenMetrics,
	getMarginalCost,
	analyzeScaleEconomies
} from './cost-model';

export {
	runISRUEconomicsMonteCarlo,
	runISRUEconomicsComparison,
	runSensitivityAnalysis,
	generateStandardScenarios,
	DEFAULT_ISRU_ECONOMICS_CONFIG
} from './monte-carlo';
