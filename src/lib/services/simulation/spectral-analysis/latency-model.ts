/**
 * Latency Model
 *
 * Models decision latency for on-board vs ground processing.
 * Key trade-off: on-board is fast but less capable; ground is slow but powerful.
 */

import type { ProcessingLocation } from './types';
import { calculateDownlinkTime } from './bandwidth-model';

/**
 * Latency parameters
 */
export interface LatencyParams {
	/** On-board processing time per GB of raw data (hours) */
	onboardProcessingHoursPerGb: number;
	/** Base on-board overhead (hours) - startup, calibration */
	onboardOverheadHours: number;
	/** Ground processing time once data arrives (hours) */
	groundProcessingHours: number;
	/** Ground analysis queue time (hours) */
	groundQueueHours: number;
	/** Command uplink time for decision (hours) */
	commandUplinkHours: number;
	/** Light speed for round-trip calculation */
	lightSpeedKmPerSecond: number;
	/** Typical distance for NEA operations (AU) */
	typicalDistanceAU: number;
}

/**
 * Default latency parameters
 */
export const LATENCY_PARAMS: LatencyParams = {
	// On-board edge computing: ~1 hour per GB for spectral unmixing
	onboardProcessingHoursPerGb: 1,
	// Startup, calibration overhead
	onboardOverheadHours: 0.25,
	// Ground processing with powerful servers: 2 hours
	groundProcessingHours: 2,
	// Queue time for analysis: 4 hours (shared resource)
	groundQueueHours: 4,
	// Command uplink preparation and execution: 1 hour
	commandUplinkHours: 1,
	// Light speed
	lightSpeedKmPerSecond: 299792,
	// Typical NEA distance: ~0.1 AU (close approach)
	typicalDistanceAU: 0.1
};

/**
 * Calculate one-way light time in hours
 *
 * @param distanceAU - Distance in AU
 * @param params - Latency parameters
 * @returns Light time in hours
 */
function calculateLightTime(
	distanceAU: number,
	params: LatencyParams = LATENCY_PARAMS
): number {
	const auInKm = 149597870.7;
	const distanceKm = distanceAU * auInKm;
	const timeSeconds = distanceKm / params.lightSpeedKmPerSecond;
	return timeSeconds / 3600;
}

/**
 * Calculate on-board processing latency
 *
 * Latency chain:
 * 1. Data capture (included in observation time)
 * 2. On-board spectral unmixing
 * 3. Decision by on-board autonomy
 *
 * @param dataSizeMb - Raw data size in MB
 * @param params - Latency parameters
 * @returns Total latency in hours
 */
export function calculateOnboardLatency(
	dataSizeMb: number,
	params: LatencyParams = LATENCY_PARAMS
): number {
	const dataSizeGb = dataSizeMb / 1024;

	const processingTime = dataSizeGb * params.onboardProcessingHoursPerGb;
	const overhead = params.onboardOverheadHours;

	return processingTime + overhead;
}

/**
 * Calculate ground processing latency
 *
 * Latency chain:
 * 1. Data downlink (transmission time)
 * 2. Ground queue time
 * 3. Ground processing
 * 4. Command uplink
 * 5. Light travel time (round trip for confirmation)
 *
 * @param dataSizeMb - Raw data size in MB
 * @param bandwidthMbps - Downlink bandwidth in Mbps
 * @param distanceAU - Distance in AU
 * @param params - Latency parameters
 * @returns Total latency in hours
 */
export function calculateGroundLatency(
	dataSizeMb: number,
	bandwidthMbps: number,
	distanceAU: number,
	params: LatencyParams = LATENCY_PARAMS
): number {
	// Downlink time
	const downlinkTime = calculateDownlinkTime(dataSizeMb, bandwidthMbps);

	// Light travel time (one-way down, one-way up for command)
	const lightTime = calculateLightTime(distanceAU, params) * 2;

	// Ground processing chain
	const groundTime = params.groundQueueHours + params.groundProcessingHours;

	// Command uplink
	const commandTime = params.commandUplinkHours;

	return downlinkTime + lightTime + groundTime + commandTime;
}

/**
 * Calculate total decision latency based on processing location
 *
 * @param location - Processing location
 * @param dataSizeMb - Raw data size in MB
 * @param bandwidthMbps - Downlink bandwidth in Mbps
 * @param distanceAU - Distance in AU (only used for ground)
 * @param params - Latency parameters
 * @returns Total latency in hours
 */
export function calculateTotalDecisionLatency(
	location: ProcessingLocation,
	dataSizeMb: number,
	bandwidthMbps: number,
	distanceAU: number,
	params: LatencyParams = LATENCY_PARAMS
): number {
	if (location === 'onboard') {
		return calculateOnboardLatency(dataSizeMb, params);
	} else {
		return calculateGroundLatency(dataSizeMb, bandwidthMbps, distanceAU, params);
	}
}

/**
 * Check if decision can be made within observation window
 *
 * @param location - Processing location
 * @param dataSizeMb - Raw data size in MB
 * @param bandwidthMbps - Downlink bandwidth in Mbps
 * @param windowHours - Observation window in hours
 * @param distanceAU - Distance in AU
 * @param params - Latency parameters
 * @returns True if decision is possible within window
 */
export function canDecideInWindow(
	location: ProcessingLocation,
	dataSizeMb: number,
	bandwidthMbps: number,
	windowHours: number,
	distanceAU: number,
	params: LatencyParams = LATENCY_PARAMS
): boolean {
	const latency = calculateTotalDecisionLatency(
		location,
		dataSizeMb,
		bandwidthMbps,
		distanceAU,
		params
	);
	return latency <= windowHours;
}
