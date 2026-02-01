import { describe, it, expect } from 'vitest';
import {
	calculateRawDataSize,
	calculateProcessedDataSize,
	getCompressionRatio,
	DATA_VOLUME_PARAMS
} from '../data-volume';

describe('data-volume', () => {
	describe('calculateRawDataSize', () => {
		it('should return positive data size', () => {
			const size = calculateRawDataSize(2);
			expect(size).toBeGreaterThan(0);
		});

		it('should scale with observation duration', () => {
			const short = calculateRawDataSize(1);
			const long = calculateRawDataSize(4);

			expect(long).toBeGreaterThan(short);
		});

		it('should return reasonable size for typical observation', () => {
			// Typical observation: 2 hours
			const sizeMb = calculateRawDataSize(2);

			// Hyperspectral data with realistic prospecting params
			// 256x256 × 128 bands × 1.5 bytes × 10 frames/hr × 2 hrs = ~250 MB
			expect(sizeMb).toBeGreaterThanOrEqual(100);
			expect(sizeMb).toBeLessThanOrEqual(1000);
		});

		it('should use spectral bands in calculation', () => {
			const defaultSize = calculateRawDataSize(2);
			const moreBands = calculateRawDataSize(2, { ...DATA_VOLUME_PARAMS, spectralBands: 500 });

			expect(moreBands).toBeGreaterThan(defaultSize);
		});
	});

	describe('calculateProcessedDataSize', () => {
		it('should be much smaller than raw data', () => {
			const raw = calculateRawDataSize(2);
			const processed = calculateProcessedDataSize(2);

			expect(processed).toBeLessThan(raw / 10);
		});

		it('should return positive size', () => {
			const size = calculateProcessedDataSize(2);
			expect(size).toBeGreaterThan(0);
		});

		it('should scale with observation duration', () => {
			const short = calculateProcessedDataSize(1);
			const long = calculateProcessedDataSize(4);

			expect(long).toBeGreaterThan(short);
		});

		it('should be reasonable for telemetry', () => {
			// Processed data: mineral maps, composition vectors
			const sizeMb = calculateProcessedDataSize(2);

			// Expect MB not GB
			expect(sizeMb).toBeGreaterThanOrEqual(1);
			expect(sizeMb).toBeLessThanOrEqual(100);
		});
	});

	describe('getCompressionRatio', () => {
		it('should return ratio greater than 1', () => {
			const ratio = getCompressionRatio(2);
			expect(ratio).toBeGreaterThan(1);
		});

		it('should show significant compression', () => {
			const ratio = getCompressionRatio(2);

			// On-board processing should compress by 10x or more
			expect(ratio).toBeGreaterThanOrEqual(10);
		});
	});

	describe('DATA_VOLUME_PARAMS', () => {
		it('should have sensible defaults', () => {
			expect(DATA_VOLUME_PARAMS.spectralBands).toBeGreaterThan(0);
			expect(DATA_VOLUME_PARAMS.spatialPixels).toBeGreaterThan(0);
			expect(DATA_VOLUME_PARAMS.bitsPerSample).toBeGreaterThan(0);
			expect(DATA_VOLUME_PARAMS.framesPerHour).toBeGreaterThan(0);
		});
	});
});
