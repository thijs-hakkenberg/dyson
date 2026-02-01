/**
 * Spectral Analysis Simulation
 *
 * Throughput and latency analysis for on-board vs ground spectral unmixing.
 */

export * from './types';
export {
	calculateRawDataSize,
	calculateProcessedDataSize,
	getCompressionRatio,
	calculateRequiredBandwidthRaw,
	calculateRequiredBandwidthProcessed,
	DATA_VOLUME_PARAMS,
	type DataVolumeParams
} from './data-volume';
export {
	canDownlinkInWindow,
	calculateDownlinkTime,
	calculateBandwidthUtilization,
	calculateMaxDownlinkData,
	BANDWIDTH_PARAMS,
	type BandwidthParams
} from './bandwidth-model';
export {
	calculateOnboardLatency,
	calculateGroundLatency,
	calculateTotalDecisionLatency,
	canDecideInWindow,
	LATENCY_PARAMS,
	type LatencyParams
} from './latency-model';
export {
	runSpectralMonteCarlo,
	runSpectralComparison,
	DEFAULT_SPECTRAL_CONFIG
} from './monte-carlo';
