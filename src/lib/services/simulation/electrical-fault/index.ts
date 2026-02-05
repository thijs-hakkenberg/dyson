/**
 * Electrical Fault Simulation
 *
 * Monte Carlo simulation for high-voltage electrical fault analysis
 * in the solar wind plasma environment. Addresses research questions:
 * - RQ-1-4: High-voltage system design in plasma environment
 * - RQ-1-8: Insulation and fault protection requirements
 * - RQ-2-1: Power distribution architecture at scale
 */

// Types
export * from './types';

// Paschen model for arc initiation
export {
	calculatePlasmaDensity,
	calculateElectronTemperature,
	calculateDebyeLength,
	calculatePaschenBreakdownVoltage,
	calculateArcInitiationProbability,
	calculateEffectiveGapDistance,
	calculateAnnualArcProbability,
	SOLAR_WIND_DENSITY_1AU,
	SOLAR_WIND_TEMP_1AU
} from './paschen-model';

// Insulation model for breakdown and fault propagation
export {
	getInsulationProperties,
	calculateBreakdownVoltage,
	calculateInsulationLifetime,
	calculateMassPerMW,
	calculateFaultPropagationProbability,
	calculateRequiredIsolationTime,
	calculateReliability,
	INSULATION_PROPERTIES,
	type InsulationProperties
} from './insulation-model';

// Monte Carlo simulation
export {
	runElectricalFaultMonteCarlo,
	runElectricalFaultComparison,
	generateVoltageComparisonConfigs,
	generateOrbitalComparisonConfigs,
	generateMaterialComparisonConfigs,
	DEFAULT_ELECTRICAL_FAULT_CONFIG
} from './monte-carlo';
