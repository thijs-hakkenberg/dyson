/**
 * Data Volume Calculator
 *
 * Calculates raw and processed data sizes for spectral observations.
 * Key trade-off: raw hyperspectral data is large, processed results are small.
 */

/**
 * Data volume parameters
 */
export interface DataVolumeParams {
	/** Number of spectral bands (typical: 200-400 for hyperspectral) */
	spectralBands: number;
	/** Spatial resolution (pixels per frame) */
	spatialPixels: number;
	/** Bits per sample (12-16 typical for hyperspectral) */
	bitsPerSample: number;
	/** Frames captured per hour */
	framesPerHour: number;
	/** Processed output size per observation (MB) base */
	processedBaseSizeMb: number;
	/** Processed output scaling per hour */
	processedScalingPerHour: number;
}

/**
 * Default parameters for hyperspectral imaging
 *
 * Based on typical asteroid observation missions:
 * - OSIRIS-REx OVIRS: 0.4-4.3 μm, ~500 channels
 * - Dawn VIR: 0.25-5.1 μm, 432 channels
 *
 * Using more realistic (lower resolution) parameters for prospecting.
 */
export const DATA_VOLUME_PARAMS: DataVolumeParams = {
	// 128 spectral bands (efficient for classification)
	spectralBands: 128,
	// 256x256 spatial resolution per frame (realistic for asteroid flyby)
	spatialPixels: 256 * 256,
	// 12-bit samples
	bitsPerSample: 12,
	// 10 frames per hour (one every 6 minutes during observation)
	framesPerHour: 10,
	// Base processed output: mineral maps, composition vectors
	processedBaseSizeMb: 5,
	// Additional MB per hour of observation
	processedScalingPerHour: 2
};

/**
 * Calculate raw spectral data size in MB
 *
 * @param observationHours - Duration of observation
 * @param params - Data volume parameters
 * @returns Raw data size in MB
 */
export function calculateRawDataSize(
	observationHours: number,
	params: DataVolumeParams = DATA_VOLUME_PARAMS
): number {
	const { spectralBands, spatialPixels, bitsPerSample, framesPerHour } = params;

	// Bytes per frame = pixels × bands × bytes_per_sample
	const bytesPerFrame = spatialPixels * spectralBands * (bitsPerSample / 8);

	// Total frames
	const totalFrames = framesPerHour * observationHours;

	// Total bytes
	const totalBytes = bytesPerFrame * totalFrames;

	// Convert to MB
	return totalBytes / (1024 * 1024);
}

/**
 * Calculate processed data size in MB
 *
 * Processed data includes:
 * - Mineral abundance maps
 * - Spectral endmember signatures
 * - Composition classification vectors
 * - Quality metrics and metadata
 *
 * @param observationHours - Duration of observation
 * @param params - Data volume parameters
 * @returns Processed data size in MB
 */
export function calculateProcessedDataSize(
	observationHours: number,
	params: DataVolumeParams = DATA_VOLUME_PARAMS
): number {
	const { processedBaseSizeMb, processedScalingPerHour } = params;

	return processedBaseSizeMb + processedScalingPerHour * observationHours;
}

/**
 * Get compression ratio (raw / processed)
 *
 * @param observationHours - Duration of observation
 * @param params - Data volume parameters
 * @returns Compression ratio
 */
export function getCompressionRatio(
	observationHours: number,
	params: DataVolumeParams = DATA_VOLUME_PARAMS
): number {
	const raw = calculateRawDataSize(observationHours, params);
	const processed = calculateProcessedDataSize(observationHours, params);

	return raw / processed;
}

/**
 * Calculate bandwidth required for real-time downlink (raw data)
 *
 * @param observationHours - Duration of observation
 * @param params - Data volume parameters
 * @returns Required bandwidth in Mbps
 */
export function calculateRequiredBandwidthRaw(
	observationHours: number,
	params: DataVolumeParams = DATA_VOLUME_PARAMS
): number {
	const dataSizeMb = calculateRawDataSize(observationHours, params);
	const dataSizeMbits = dataSizeMb * 8;
	const durationSeconds = observationHours * 3600;

	return dataSizeMbits / durationSeconds;
}

/**
 * Calculate bandwidth required for processed data downlink
 *
 * @param observationHours - Duration of observation
 * @param params - Data volume parameters
 * @returns Required bandwidth in Mbps
 */
export function calculateRequiredBandwidthProcessed(
	observationHours: number,
	params: DataVolumeParams = DATA_VOLUME_PARAMS
): number {
	const dataSizeMb = calculateProcessedDataSize(observationHours, params);
	const dataSizeMbits = dataSizeMb * 8;
	const durationSeconds = observationHours * 3600;

	return dataSizeMbits / durationSeconds;
}
