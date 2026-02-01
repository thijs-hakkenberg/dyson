import { describe, it, expect } from 'vitest';
import {
	canDownlinkInWindow,
	calculateDownlinkTime,
	calculateBandwidthUtilization,
	BANDWIDTH_PARAMS
} from '../bandwidth-model';

describe('bandwidth-model', () => {
	describe('calculateDownlinkTime', () => {
		it('should return positive time', () => {
			const time = calculateDownlinkTime(100, 10);
			expect(time).toBeGreaterThan(0);
		});

		it('should scale with data size', () => {
			const small = calculateDownlinkTime(100, 10);
			const large = calculateDownlinkTime(1000, 10);

			expect(large).toBeGreaterThan(small);
		});

		it('should scale inversely with bandwidth', () => {
			const slowBw = calculateDownlinkTime(100, 5);
			const fastBw = calculateDownlinkTime(100, 10);

			expect(slowBw).toBeGreaterThan(fastBw);
		});

		it('should calculate correct time for known values', () => {
			// 8 MB at 8 Mbps with 1.2x overhead = 8 * 8 / (8/1.2) = 9.6 seconds
			const time = calculateDownlinkTime(8, 8);
			const expectedSeconds = (8 * 8) / (8 / 1.2);
			expect(time).toBeCloseTo(expectedSeconds / 3600, 5);
		});
	});

	describe('canDownlinkInWindow', () => {
		it('should return true for small data in large window', () => {
			const result = canDownlinkInWindow(10, 10, 24);
			expect(result).toBe(true);
		});

		it('should return false for large data in small window', () => {
			// 10 GB at 1 Mbps = ~22 hours, window is 1 hour
			const result = canDownlinkInWindow(10000, 1, 1);
			expect(result).toBe(false);
		});

		it('should respect window duration', () => {
			const dataSizeMb = 1000; // 1 GB
			const bandwidthMbps = 10;

			// 1 GB at 10 Mbps = ~13 minutes
			const shortWindow = canDownlinkInWindow(dataSizeMb, bandwidthMbps, 0.1);
			const longWindow = canDownlinkInWindow(dataSizeMb, bandwidthMbps, 1);

			expect(shortWindow).toBe(false);
			expect(longWindow).toBe(true);
		});
	});

	describe('calculateBandwidthUtilization', () => {
		it('should return value between 0 and 1', () => {
			const util = calculateBandwidthUtilization(100, 10, 1);

			expect(util).toBeGreaterThanOrEqual(0);
			expect(util).toBeLessThanOrEqual(1);
		});

		it('should be higher for more data', () => {
			const lowUtil = calculateBandwidthUtilization(10, 10, 1);
			const highUtil = calculateBandwidthUtilization(100, 10, 1);

			expect(highUtil).toBeGreaterThan(lowUtil);
		});

		it('should cap at 1 for oversubscribed bandwidth', () => {
			// Way more data than can fit
			const util = calculateBandwidthUtilization(100000, 1, 1);
			expect(util).toBe(1);
		});
	});

	describe('BANDWIDTH_PARAMS', () => {
		it('should have sensible defaults', () => {
			expect(BANDWIDTH_PARAMS.typicalBandwidthMbps).toBeGreaterThan(0);
			expect(BANDWIDTH_PARAMS.overheadFactor).toBeGreaterThan(1);
		});
	});
});
