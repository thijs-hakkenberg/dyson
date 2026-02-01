import { describe, it, expect } from 'vitest';
import { runFleetMonteCarlo, runFleetComparison, DEFAULT_FLEET_CONFIG } from '../monte-carlo';
import type { FleetConfig } from '../types';

describe('Fleet Monte Carlo', () => {
	const baseConfig: FleetConfig = {
		vehicleCount: 5,
		payloadCapacityKg: 200000,
		missionDurationYears: 5,
		annualFailureRate: 0.03,
		budgetDollars: 2_000_000_000,
		seed: 12345
	};

	describe('runFleetMonteCarlo', () => {
		it('should run multiple simulations', async () => {
			const result = await runFleetMonteCarlo(baseConfig, 10);

			expect(result.runs).toBe(10);
		});

		it('should calculate mean throughput', async () => {
			const result = await runFleetMonteCarlo(baseConfig, 10);

			expect(result.result.throughputKgPerYear).toBeGreaterThan(0);
		});

		it('should calculate standard deviation', async () => {
			const config: FleetConfig = {
				...baseConfig,
				annualFailureRate: 0.1 // Higher variance
			};
			const result = await runFleetMonteCarlo(config, 20);

			expect(result.result.throughputStdDev).toBeGreaterThan(0);
		});

		it('should calculate confidence intervals', async () => {
			const result = await runFleetMonteCarlo(baseConfig, 20);

			expect(result.result.confidenceInterval95.throughputLower).toBeLessThan(
				result.result.throughputKgPerYear
			);
			expect(result.result.confidenceInterval95.throughputUpper).toBeGreaterThan(
				result.result.throughputKgPerYear
			);
		});

		it('should report progress', async () => {
			const progressCalls: number[] = [];

			await runFleetMonteCarlo(baseConfig, 20, (progress) => {
				progressCalls.push(progress.percentComplete);
			});

			expect(progressCalls.length).toBeGreaterThan(0);
			expect(progressCalls[progressCalls.length - 1]).toBe(100);
		});

		it('should calculate cost per kg', async () => {
			const result = await runFleetMonteCarlo(baseConfig, 10);

			expect(result.result.costPerKgDelivered).toBeGreaterThan(0);
			expect(result.result.costPerKgStdDev).toBeGreaterThanOrEqual(0);
		});

		it('should track fleet utilization', async () => {
			const result = await runFleetMonteCarlo(baseConfig, 10);

			expect(result.result.fleetUtilization).toBeGreaterThan(0);
			expect(result.result.fleetUtilization).toBeLessThanOrEqual(1);
		});
	});

	describe('runFleetComparison', () => {
		it('should compare multiple configurations', async () => {
			const configs: FleetConfig[] = [
				{ ...baseConfig, vehicleCount: 8, payloadCapacityKg: 250000 },
				{ ...baseConfig, vehicleCount: 20, payloadCapacityKg: 100000 }
			];

			const result = await runFleetComparison(configs, 10);

			expect(result.configs.length).toBe(2);
			expect(result.results.length).toBe(2);
		});

		it('should identify optimal configuration', async () => {
			const configs: FleetConfig[] = [
				{ ...baseConfig, vehicleCount: 5, payloadCapacityKg: 100000 },
				{ ...baseConfig, vehicleCount: 10, payloadCapacityKg: 200000 },
				{ ...baseConfig, vehicleCount: 3, payloadCapacityKg: 300000 }
			];

			const result = await runFleetComparison(configs, 10);

			expect(result.optimalConfigIndex).toBeGreaterThanOrEqual(0);
			expect(result.optimalConfigIndex).toBeLessThan(configs.length);
		});

		it('should provide analysis', async () => {
			const configs: FleetConfig[] = [
				{ ...baseConfig, vehicleCount: 8, payloadCapacityKg: 250000 },
				{ ...baseConfig, vehicleCount: 20, payloadCapacityKg: 100000 }
			];

			const result = await runFleetComparison(configs, 10);

			expect(result.analysis.bestThroughput).toBeGreaterThan(0);
			expect(result.analysis.bestCostEfficiency).toBeGreaterThan(0);
			expect(result.analysis.recommendation).toBeDefined();
		});

		it('should report combined progress', async () => {
			const progressCalls: number[] = [];
			const configs: FleetConfig[] = [
				{ ...baseConfig, vehicleCount: 8, payloadCapacityKg: 250000 },
				{ ...baseConfig, vehicleCount: 20, payloadCapacityKg: 100000 }
			];

			await runFleetComparison(configs, 10, (progress) => {
				progressCalls.push(progress.percentComplete);
			});

			expect(progressCalls.length).toBeGreaterThan(0);
		});
	});

	describe('DEFAULT_FLEET_CONFIG', () => {
		it('should provide sensible defaults', () => {
			expect(DEFAULT_FLEET_CONFIG.vehicleCount).toBeGreaterThan(0);
			expect(DEFAULT_FLEET_CONFIG.payloadCapacityKg).toBeGreaterThan(0);
			expect(DEFAULT_FLEET_CONFIG.missionDurationYears).toBeGreaterThan(0);
		});
	});

	describe('scenario: 8×250k vs 20×100k', () => {
		it('should simulate the core research question', async () => {
			const largeVehicles: FleetConfig = {
				vehicleCount: 8,
				payloadCapacityKg: 250000,
				missionDurationYears: 15,
				annualFailureRate: 0.03,
				budgetDollars: 2_000_000_000
			};

			const smallVehicles: FleetConfig = {
				vehicleCount: 20,
				payloadCapacityKg: 100000,
				missionDurationYears: 15,
				annualFailureRate: 0.03,
				budgetDollars: 2_000_000_000
			};

			const comparison = await runFleetComparison([largeVehicles, smallVehicles], 20);

			// Both should have meaningful results
			expect(comparison.results[0].throughputKgPerYear).toBeGreaterThan(0);
			expect(comparison.results[1].throughputKgPerYear).toBeGreaterThan(0);

			// Should identify which is better
			expect(comparison.analysis.recommendation.length).toBeGreaterThan(0);
		});
	});
});
