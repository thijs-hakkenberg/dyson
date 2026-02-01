import { describe, it, expect } from 'vitest';
import {
	runSpectralMonteCarlo,
	runSpectralComparison,
	DEFAULT_SPECTRAL_CONFIG
} from '../monte-carlo';
import type { SpectralConfig } from '../types';

describe('Spectral Monte Carlo', () => {
	const baseConfig: SpectralConfig = {
		processingLocation: 'onboard',
		satelliteCount: 10,
		bandwidthMbps: 10,
		missionDurationYears: 5,
		encounterRatePerYear: 20,
		seed: 12345
	};

	describe('runSpectralMonteCarlo', () => {
		it('should run multiple simulations', async () => {
			const result = await runSpectralMonteCarlo(baseConfig, 10);

			expect(result.runs).toBe(10);
		});

		it('should calculate targets surveyed', async () => {
			const result = await runSpectralMonteCarlo(baseConfig, 10);

			expect(result.result.targetsSurveyed).toBeGreaterThan(0);
		});

		it('should track missed opportunities', async () => {
			const result = await runSpectralMonteCarlo(baseConfig, 10);

			expect(result.result.missedOpportunities).toBeGreaterThanOrEqual(0);
		});

		it('should calculate survey efficiency', async () => {
			const result = await runSpectralMonteCarlo(baseConfig, 10);

			expect(result.result.surveyEfficiency).toBeGreaterThan(0);
			expect(result.result.surveyEfficiency).toBeLessThanOrEqual(1);
		});

		it('should report progress', async () => {
			const progressCalls: number[] = [];

			await runSpectralMonteCarlo(baseConfig, 20, (progress) => {
				progressCalls.push(progress.percentComplete);
			});

			expect(progressCalls.length).toBeGreaterThan(0);
			expect(progressCalls[progressCalls.length - 1]).toBe(100);
		});

		it('should calculate decision latency', async () => {
			const result = await runSpectralMonteCarlo(baseConfig, 10);

			expect(result.result.avgDecisionLatencyHours).toBeGreaterThan(0);
		});
	});

	describe('runSpectralComparison', () => {
		it('should compare onboard vs ground processing', async () => {
			const comparison = await runSpectralComparison(baseConfig, 10);

			expect(comparison.onboardResult).toBeDefined();
			expect(comparison.groundResult).toBeDefined();
		});

		it('should show latency difference', async () => {
			const comparison = await runSpectralComparison(baseConfig, 10);

			// Ground should have higher latency
			expect(comparison.groundResult.avgDecisionLatencyHours).toBeGreaterThan(
				comparison.onboardResult.avgDecisionLatencyHours
			);
		});

		it('should calculate bandwidth savings', async () => {
			const comparison = await runSpectralComparison(baseConfig, 10);

			// On-board processing saves bandwidth
			expect(comparison.analysis.bandwidthSavingsPercent).toBeGreaterThan(0);
		});

		it('should provide recommendation', async () => {
			const comparison = await runSpectralComparison(baseConfig, 10);

			expect(comparison.analysis.recommendation.length).toBeGreaterThan(0);
		});
	});

	describe('processing location effects', () => {
		it('should show on-board has faster decisions', async () => {
			const onboardConfig: SpectralConfig = { ...baseConfig, processingLocation: 'onboard' };
			const groundConfig: SpectralConfig = { ...baseConfig, processingLocation: 'ground' };

			const onboardResult = await runSpectralMonteCarlo(onboardConfig, 10);
			const groundResult = await runSpectralMonteCarlo(groundConfig, 10);

			expect(onboardResult.result.avgDecisionLatencyHours).toBeLessThan(
				groundResult.result.avgDecisionLatencyHours
			);
		});

		it('should show on-board uses less bandwidth', async () => {
			const onboardConfig: SpectralConfig = { ...baseConfig, processingLocation: 'onboard' };
			const groundConfig: SpectralConfig = { ...baseConfig, processingLocation: 'ground' };

			const onboardResult = await runSpectralMonteCarlo(onboardConfig, 10);
			const groundResult = await runSpectralMonteCarlo(groundConfig, 10);

			expect(onboardResult.result.bandwidthUtilization).toBeLessThan(
				groundResult.result.bandwidthUtilization
			);
		});
	});

	describe('DEFAULT_SPECTRAL_CONFIG', () => {
		it('should provide sensible defaults', () => {
			expect(DEFAULT_SPECTRAL_CONFIG.satelliteCount).toBeGreaterThan(0);
			expect(DEFAULT_SPECTRAL_CONFIG.bandwidthMbps).toBeGreaterThan(0);
			expect(DEFAULT_SPECTRAL_CONFIG.missionDurationYears).toBeGreaterThan(0);
		});
	});
});
