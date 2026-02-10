/**
 * Shkadov Mirror Standoff Distance Simulation
 *
 * Trade study analysis for Shkadov mirror standoff distance optimization.
 * Analyzes thrust, mass, temperature, and feasibility trade-offs at
 * various distances from the Sun.
 *
 * Addresses research question rq-3b-1: Shkadov mirror standoff distance optimization.
 */

// Types
export type {
	ShkadovConfig,
	ShkadovTradePoint,
	ShkadovResult,
	ShkadovComparisonResult,
	ShkadovProgress
} from './types';

// Physics model
export {
	L_SUN,
	M_SUN,
	G,
	SIGMA_SB,
	c,
	AU,
	SIGMA_CRIT,
	MATERIAL_LIMITS,
	calculateCriticalArealDensity,
	calculateMirrorArea,
	calculateThrust,
	calculateEquilibriumTemp,
	calculateMirrorMass,
	calculateInsolationReduction,
	isThermallyFeasible,
	getMaterialRecommendation,
	estimateCost,
	calculateTradePoint
} from './shkadov-model';

// Trade sweep simulation
export {
	DEFAULT_SHKADOV_CONFIG,
	runShkadovTradeSweep,
	runShkadovComparison,
	generateArealDensityConfigs,
	generateReflectivityConfigs
} from './monte-carlo';
