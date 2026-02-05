/**
 * Supply Chain Monte Carlo Simulation
 *
 * Monte Carlo simulation for analyzing xenon propellant supply chain
 * constraints for Project Dyson Phase 1 deployment.
 *
 * Addresses research questions:
 * - RQ-1-3: Critical material supply chains
 * - RQ-0-20: Xenon propellant sourcing at scale
 */

export * from './types';

export {
	sampleSupplyParameters,
	calculateYearlySupply,
	calculateYearlyDemand,
	simulateStockpiling,
	evaluateAlternativePropellant,
	calculatePriceResponse,
	findConstraintYear,
	runSingleSimulation
} from './supply-model';

export {
	runSupplyChainMonteCarlo,
	runSupplyChainComparison,
	generateStockpilingScenarios,
	generateStrategyRecommendation,
	formatNumber,
	formatCurrency,
	DEFAULT_SUPPLY_CHAIN_CONFIG
} from './monte-carlo';
