import { describe, it, expect } from 'vitest';
import {
	calculateOnboardLatency,
	calculateGroundLatency,
	calculateTotalDecisionLatency,
	LATENCY_PARAMS
} from '../latency-model';
import type { ProcessingLocation } from '../types';

describe('latency-model', () => {
	describe('calculateOnboardLatency', () => {
		it('should return positive latency', () => {
			const latency = calculateOnboardLatency(1000);
			expect(latency).toBeGreaterThan(0);
		});

		it('should scale with data size', () => {
			const small = calculateOnboardLatency(100);
			const large = calculateOnboardLatency(10000);

			expect(large).toBeGreaterThan(small);
		});

		it('should be relatively fast (minutes to hours)', () => {
			const latency = calculateOnboardLatency(1000);

			// On-board processing should be fast: minutes to a few hours
			expect(latency).toBeLessThan(24); // Less than 1 day
		});
	});

	describe('calculateGroundLatency', () => {
		it('should return positive latency', () => {
			const latency = calculateGroundLatency(1000, 10, 2);
			expect(latency).toBeGreaterThan(0);
		});

		it('should include transmission time', () => {
			// Large data, low bandwidth = long transmission
			const slowDownlink = calculateGroundLatency(10000, 1, 2);
			const fastDownlink = calculateGroundLatency(10000, 100, 2);

			expect(slowDownlink).toBeGreaterThan(fastDownlink);
		});

		it('should include light travel time', () => {
			// At 1 AU, one-way light time is ~8 minutes
			const latency = calculateGroundLatency(10, 100, 2);

			// Should include at least round-trip light time
			expect(latency).toBeGreaterThan(0.25); // > 15 minutes
		});

		it('should be significantly longer than on-board', () => {
			const onboard = calculateOnboardLatency(1000);
			const ground = calculateGroundLatency(1000, 10, 2);

			// Ground should be much longer due to transmission
			expect(ground).toBeGreaterThan(onboard);
		});
	});

	describe('calculateTotalDecisionLatency', () => {
		it('should dispatch to correct calculator', () => {
			const onboard = calculateTotalDecisionLatency('onboard', 1000, 10, 2);
			const ground = calculateTotalDecisionLatency('ground', 1000, 10, 2);

			expect(onboard).not.toBe(ground);
		});

		it('should match on-board for onboard location', () => {
			const total = calculateTotalDecisionLatency('onboard', 1000, 10, 2);
			const direct = calculateOnboardLatency(1000);

			expect(total).toBe(direct);
		});

		it('should match ground for ground location', () => {
			const total = calculateTotalDecisionLatency('ground', 1000, 10, 2);
			const direct = calculateGroundLatency(1000, 10, 2);

			expect(total).toBe(direct);
		});
	});

	describe('LATENCY_PARAMS', () => {
		it('should have sensible defaults', () => {
			expect(LATENCY_PARAMS.onboardProcessingHoursPerGb).toBeGreaterThan(0);
			expect(LATENCY_PARAMS.groundProcessingHours).toBeGreaterThan(0);
			expect(LATENCY_PARAMS.lightSpeedKmPerSecond).toBeCloseTo(299792, 0);
		});
	});

	describe('decision latency scenarios', () => {
		it('should model flyby decision scenario', () => {
			// Flyby: limited observation window, need fast decision
			const observationWindowHours = 8;
			const dataSizeMb = 1000; // 1 GB - smaller observation
			const bandwidthMbps = 10;
			const distanceAU = 0.1;

			const onboardLatency = calculateTotalDecisionLatency(
				'onboard',
				dataSizeMb,
				bandwidthMbps,
				distanceAU
			);
			const groundLatency = calculateTotalDecisionLatency(
				'ground',
				dataSizeMb,
				bandwidthMbps,
				distanceAU
			);

			// On-board should allow decision within window
			expect(onboardLatency).toBeLessThan(observationWindowHours);

			// Ground latency should be significantly longer
			expect(groundLatency).toBeGreaterThan(onboardLatency);
		});
	});
});
