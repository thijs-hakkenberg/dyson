/**
 * Bandwidth Model
 *
 * Models downlink constraints for space-to-ground communication.
 */

/**
 * Bandwidth parameters
 */
export interface BandwidthParams {
	/** Typical deep space downlink bandwidth (Mbps) */
	typicalBandwidthMbps: number;
	/** Overhead factor for protocol, retransmissions, etc. */
	overheadFactor: number;
}

/**
 * Default bandwidth parameters
 *
 * Based on deep space network capabilities:
 * - DSN 34m antenna: ~0.5-2 Mbps at Mars distances
 * - Near-Earth: up to 10-50 Mbps
 * - Commercial ground stations: varies widely
 */
export const BANDWIDTH_PARAMS: BandwidthParams = {
	// Assume near-Earth operations with commercial ground stations
	typicalBandwidthMbps: 10,
	// 20% overhead for protocol, error correction, retransmissions
	overheadFactor: 1.2
};

/**
 * Calculate time to downlink data
 *
 * @param dataSizeMb - Data size in MB
 * @param bandwidthMbps - Available bandwidth in Mbps
 * @param params - Bandwidth parameters
 * @returns Downlink time in hours
 */
export function calculateDownlinkTime(
	dataSizeMb: number,
	bandwidthMbps: number,
	params: BandwidthParams = BANDWIDTH_PARAMS
): number {
	// Convert MB to Mbits
	const dataSizeMbits = dataSizeMb * 8;

	// Apply overhead
	const effectiveBandwidth = bandwidthMbps / params.overheadFactor;

	// Time in seconds
	const timeSeconds = dataSizeMbits / effectiveBandwidth;

	// Return in hours
	return timeSeconds / 3600;
}

/**
 * Check if data can be downlinked within a time window
 *
 * @param dataSizeMb - Data size in MB
 * @param bandwidthMbps - Available bandwidth in Mbps
 * @param windowHours - Available time window in hours
 * @param params - Bandwidth parameters
 * @returns True if downlink is possible
 */
export function canDownlinkInWindow(
	dataSizeMb: number,
	bandwidthMbps: number,
	windowHours: number,
	params: BandwidthParams = BANDWIDTH_PARAMS
): boolean {
	const requiredTime = calculateDownlinkTime(dataSizeMb, bandwidthMbps, params);
	return requiredTime <= windowHours;
}

/**
 * Calculate bandwidth utilization
 *
 * @param dataSizeMb - Data size in MB
 * @param bandwidthMbps - Available bandwidth in Mbps
 * @param windowHours - Time window in hours
 * @param params - Bandwidth parameters
 * @returns Utilization factor (0-1)
 */
export function calculateBandwidthUtilization(
	dataSizeMb: number,
	bandwidthMbps: number,
	windowHours: number,
	params: BandwidthParams = BANDWIDTH_PARAMS
): number {
	const requiredTime = calculateDownlinkTime(dataSizeMb, bandwidthMbps, params);
	const utilization = requiredTime / windowHours;

	return Math.min(1, utilization);
}

/**
 * Calculate maximum data that can be downlinked in a window
 *
 * @param bandwidthMbps - Available bandwidth in Mbps
 * @param windowHours - Time window in hours
 * @param params - Bandwidth parameters
 * @returns Maximum data size in MB
 */
export function calculateMaxDownlinkData(
	bandwidthMbps: number,
	windowHours: number,
	params: BandwidthParams = BANDWIDTH_PARAMS
): number {
	const effectiveBandwidth = bandwidthMbps / params.overheadFactor;
	const windowSeconds = windowHours * 3600;

	// Mbits available
	const mbitsAvailable = effectiveBandwidth * windowSeconds;

	// Convert to MB
	return mbitsAvailable / 8;
}
