/**
 * Solar Mass Extraction Rate Simulation
 *
 * Models solar mass extraction rate limits, stellar response, and stability
 * boundaries for Caplan engine operations.
 *
 * Addresses research question rq-3b-2: Solar mass extraction rate limits.
 */

// Types
export type {
	SolarActivityLevel,
	RiskLevel,
	ExtractionConfig,
	ExtractionPoint,
	ExtractionRunResult,
	ExtractionResult,
	ExtractionOutput,
	ExtractionComparisonResult,
	ExtractionProgress,
	ResponseSurfaceData
} from './types';

// Physics model
export {
	R_SUN,
	M_SUN,
	L_SUN,
	T_SURFACE,
	V_ESCAPE_SURFACE,
	SOLAR_WIND_RATE,
	T_KELVIN_HELMHOLTZ,
	calculatePlumeVelocity,
	calculateMassFlowPerStation,
	calculateLiftingEfficiency,
	calculateStabilityMargin,
	calculateLuminosityPerturbation,
	classifyRisk,
	calculateEnergyBudget,
	calculateStationsRequired,
	loadResponseSurfaces,
	interpolateResponseSurface,
	analyzeExtractionPoint
} from './extraction-model';

// Monte Carlo simulation
export {
	DEFAULT_EXTRACTION_CONFIG,
	runExtractionMonteCarlo,
	runExtractionComparison,
	generateActivityConfigs,
	generateEfficiencyConfigs
} from './monte-carlo';
