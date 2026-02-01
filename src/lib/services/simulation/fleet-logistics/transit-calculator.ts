/**
 * Transit Calculator
 *
 * Calculates transit times for space logistics based on payload mass,
 * delta-V requirements, and propulsion capabilities.
 */

/**
 * Transit parameters
 */
export interface TransitParams {
	/** Base transit time in hours for empty vehicle */
	baseTransitHours: number;
	/** Additional hours per 100,000 kg payload */
	hoursPerHundredTonnes: number;
	/** Return transit time (empty vehicle) */
	returnTransitHours: number;
	/** Loading rate in kg/hour */
	defaultLoadingRateKgPerHour: number;
	/** Unloading rate in kg/hour */
	defaultUnloadingRateKgPerHour: number;
}

/**
 * Default transit parameters for Earth-NEA logistics
 *
 * Based on typical delta-V requirements:
 * - Earth to NEA: 4-8 km/s depending on target
 * - Transit time depends on trajectory optimization
 * - Typical one-way transit: 6-12 months
 */
export const DEFAULT_TRANSIT_PARAMS: TransitParams = {
	// Base transit time: ~6 months for optimized trajectory
	baseTransitHours: 6 * 30 * 24, // 4,320 hours

	// Additional time per 100,000 kg: ~1 month
	// Heavier payloads require longer, less efficient trajectories
	hoursPerHundredTonnes: 30 * 24, // 720 hours

	// Return transit (empty): ~4 months
	// Faster because no payload
	returnTransitHours: 4 * 30 * 24, // 2,880 hours

	// Loading rate: autonomous mining and loading
	// ~100 tonnes per day = 4,166 kg/hour
	defaultLoadingRateKgPerHour: 1000,

	// Unloading rate: orbital processing facility
	// Typically faster than loading
	defaultUnloadingRateKgPerHour: 1500
};

/**
 * Calculate transit time from source to destination
 *
 * @param payloadKg - Payload mass in kg
 * @param params - Transit parameters
 * @returns Transit time in hours
 */
export function calculateTransitTime(
	payloadKg: number,
	params: TransitParams = DEFAULT_TRANSIT_PARAMS
): number {
	const { baseTransitHours, hoursPerHundredTonnes } = params;

	// Additional time scales with payload mass
	const massMultiplier = payloadKg / 100000;
	const additionalTime = massMultiplier * hoursPerHundredTonnes;

	return baseTransitHours + additionalTime;
}

/**
 * Calculate loading time at source
 *
 * @param payloadKg - Payload mass in kg
 * @param rateKgPerHour - Processing rate (default from params)
 * @returns Loading time in hours
 */
export function calculateLoadingTime(
	payloadKg: number,
	rateKgPerHour: number = DEFAULT_TRANSIT_PARAMS.defaultLoadingRateKgPerHour
): number {
	return payloadKg / rateKgPerHour;
}

/**
 * Calculate unloading time at destination
 *
 * @param payloadKg - Payload mass in kg
 * @param rateKgPerHour - Processing rate (default from params)
 * @returns Unloading time in hours
 */
export function calculateUnloadingTime(
	payloadKg: number,
	rateKgPerHour: number = DEFAULT_TRANSIT_PARAMS.defaultUnloadingRateKgPerHour
): number {
	return payloadKg / rateKgPerHour;
}

/**
 * Calculate return transit time (empty vehicle)
 *
 * @param params - Transit parameters
 * @returns Return time in hours
 */
export function calculateReturnTime(params: TransitParams = DEFAULT_TRANSIT_PARAMS): number {
	return params.returnTransitHours;
}

/**
 * Calculate complete round trip time
 *
 * @param payloadKg - Payload mass in kg
 * @param params - Transit parameters
 * @returns Total round trip time in hours
 */
export function calculateRoundTripTime(
	payloadKg: number,
	params: TransitParams = DEFAULT_TRANSIT_PARAMS
): number {
	return (
		calculateTransitTime(payloadKg, params) +
		calculateLoadingTime(payloadKg, params.defaultLoadingRateKgPerHour) +
		calculateUnloadingTime(payloadKg, params.defaultUnloadingRateKgPerHour) +
		calculateReturnTime(params)
	);
}

/**
 * Calculate trips per year
 *
 * @param payloadKg - Payload capacity in kg
 * @param params - Transit parameters
 * @returns Expected trips per year
 */
export function calculateTripsPerYear(
	payloadKg: number,
	params: TransitParams = DEFAULT_TRANSIT_PARAMS
): number {
	const hoursPerYear = 365 * 24;
	const roundTripHours = calculateRoundTripTime(payloadKg, params);
	return hoursPerYear / roundTripHours;
}
