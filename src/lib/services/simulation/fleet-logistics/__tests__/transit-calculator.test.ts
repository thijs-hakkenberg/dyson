import { describe, it, expect } from 'vitest';
import {
	calculateTransitTime,
	calculateLoadingTime,
	calculateUnloadingTime,
	calculateReturnTime,
	DEFAULT_TRANSIT_PARAMS
} from '../transit-calculator';

describe('transit-calculator', () => {
	describe('calculateTransitTime', () => {
		it('should return positive transit time', () => {
			const time = calculateTransitTime(200000);
			expect(time).toBeGreaterThan(0);
		});

		it('should scale with payload mass', () => {
			const lightTime = calculateTransitTime(100000);
			const heavyTime = calculateTransitTime(300000);

			// Heavier payloads take longer (need more delta-V)
			expect(heavyTime).toBeGreaterThan(lightTime);
		});

		it('should return base time for zero payload', () => {
			const time = calculateTransitTime(0);
			expect(time).toBe(DEFAULT_TRANSIT_PARAMS.baseTransitHours);
		});

		it('should use custom parameters when provided', () => {
			const customParams = {
				...DEFAULT_TRANSIT_PARAMS,
				baseTransitHours: 100
			};
			const time = calculateTransitTime(200000, customParams);
			expect(time).toBeGreaterThanOrEqual(100);
		});

		it('should calculate realistic transit times for asteroid mining', () => {
			// Earth to NEA: typical 6-12 month transit
			const time = calculateTransitTime(250000);
			const months = time / (24 * 30);
			expect(months).toBeGreaterThanOrEqual(3);
			expect(months).toBeLessThanOrEqual(18);
		});
	});

	describe('calculateLoadingTime', () => {
		it('should return positive loading time', () => {
			const time = calculateLoadingTime(200000);
			expect(time).toBeGreaterThan(0);
		});

		it('should scale linearly with payload', () => {
			const time100k = calculateLoadingTime(100000);
			const time200k = calculateLoadingTime(200000);

			expect(time200k).toBeCloseTo(time100k * 2, 0);
		});

		it('should use processing rate', () => {
			const payload = 100000;
			const rate = 1000; // kg/hour
			const time = calculateLoadingTime(payload, rate);

			expect(time).toBe(payload / rate);
		});
	});

	describe('calculateUnloadingTime', () => {
		it('should return positive unloading time', () => {
			const time = calculateUnloadingTime(200000);
			expect(time).toBeGreaterThan(0);
		});

		it('should be faster than loading (typically)', () => {
			const loadTime = calculateLoadingTime(200000);
			const unloadTime = calculateUnloadingTime(200000, 2000); // Faster rate

			expect(unloadTime).toBeLessThan(loadTime);
		});
	});

	describe('calculateReturnTime', () => {
		it('should return positive return time', () => {
			const time = calculateReturnTime();
			expect(time).toBeGreaterThan(0);
		});

		it('should be faster than loaded transit', () => {
			const transitTime = calculateTransitTime(250000);
			const returnTime = calculateReturnTime();

			// Empty return should be faster
			expect(returnTime).toBeLessThan(transitTime);
		});

		it('should use custom parameters', () => {
			const customParams = {
				...DEFAULT_TRANSIT_PARAMS,
				returnTransitHours: 500
			};
			const time = calculateReturnTime(customParams);
			expect(time).toBe(500);
		});
	});

	describe('total trip time', () => {
		it('should calculate complete round trip', () => {
			const payload = 200000;
			const loadRate = 1000;
			const unloadRate = 1500;

			const transitOut = calculateTransitTime(payload);
			const loading = calculateLoadingTime(payload, loadRate);
			const unloading = calculateUnloadingTime(payload, unloadRate);
			const returnTrip = calculateReturnTime();

			const totalTrip = transitOut + loading + unloading + returnTrip;

			// Should be substantial time (months)
			const months = totalTrip / (24 * 30);
			expect(months).toBeGreaterThan(6);
		});
	});
});
