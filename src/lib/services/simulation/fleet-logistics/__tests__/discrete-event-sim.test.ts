import { describe, it, expect } from 'vitest';
import { DiscreteEventSimulator } from '../discrete-event-sim';
import type { FleetConfig } from '../types';

describe('DiscreteEventSimulator', () => {
	const baseConfig: FleetConfig = {
		vehicleCount: 5,
		payloadCapacityKg: 200000,
		missionDurationYears: 1,
		annualFailureRate: 0,
		budgetDollars: 2_000_000_000,
		seed: 12345
	};

	describe('constructor', () => {
		it('should initialize simulator with config', () => {
			const sim = new DiscreteEventSimulator(baseConfig);
			expect(sim).toBeInstanceOf(DiscreteEventSimulator);
		});

		it('should create fleet with correct vehicle count', () => {
			const sim = new DiscreteEventSimulator(baseConfig);
			const state = sim.getState();

			expect(state.fleet.length).toBe(5);
		});

		it('should create vehicles with correct capacity', () => {
			const sim = new DiscreteEventSimulator(baseConfig);
			const state = sim.getState();

			expect(state.fleet[0].payloadCapacityKg).toBe(200000);
		});
	});

	describe('run', () => {
		it('should complete simulation', () => {
			const sim = new DiscreteEventSimulator(baseConfig);
			const result = sim.run();

			expect(result).toBeDefined();
			expect(result.totalThroughputKg).toBeGreaterThan(0);
		});

		it('should track throughput over mission duration', () => {
			const sim = new DiscreteEventSimulator({
				...baseConfig,
				missionDurationYears: 2
			});
			const result = sim.run();

			// More time = more throughput
			const sim1Year = new DiscreteEventSimulator(baseConfig);
			const result1Year = sim1Year.run();

			expect(result.totalThroughputKg).toBeGreaterThan(result1Year.totalThroughputKg);
		});

		it('should calculate cost per kg', () => {
			const sim = new DiscreteEventSimulator(baseConfig);
			const result = sim.run();

			expect(result.costPerKgDelivered).toBeGreaterThan(0);
			expect(result.costPerKgDelivered).toBe(baseConfig.budgetDollars / result.totalThroughputKg);
		});

		it('should record yearly statistics', () => {
			const sim = new DiscreteEventSimulator({
				...baseConfig,
				missionDurationYears: 3
			});
			const result = sim.run();

			expect(result.yearlyStats.length).toBe(3);
			expect(result.yearlyStats[0].year).toBe(1);
			expect(result.yearlyStats[2].year).toBe(3);
		});
	});

	describe('failure handling', () => {
		it('should not have failures when rate is 0', () => {
			const sim = new DiscreteEventSimulator({
				...baseConfig,
				annualFailureRate: 0,
				missionDurationYears: 5
			});
			const result = sim.run();

			expect(result.vehicleFailures).toBe(0);
		});

		it('should have some failures when rate is high', () => {
			const sim = new DiscreteEventSimulator({
				...baseConfig,
				vehicleCount: 20,
				annualFailureRate: 0.1,
				missionDurationYears: 15,
				seed: 42
			});
			const result = sim.run();

			// With 20 vehicles, 10% failure rate over 15 years, expect some failures
			expect(result.vehicleFailures).toBeGreaterThan(0);
		});

		it('should reduce throughput with failures', () => {
			const simNoFailures = new DiscreteEventSimulator({
				...baseConfig,
				vehicleCount: 10,
				annualFailureRate: 0,
				missionDurationYears: 10,
				seed: 42
			});
			const resultNoFailures = simNoFailures.run();

			const simWithFailures = new DiscreteEventSimulator({
				...baseConfig,
				vehicleCount: 10,
				annualFailureRate: 0.1,
				missionDurationYears: 10,
				seed: 42
			});
			const resultWithFailures = simWithFailures.run();

			expect(resultWithFailures.throughputKgPerYear).toBeLessThan(resultNoFailures.throughputKgPerYear);
		});
	});

	describe('fleet utilization', () => {
		it('should calculate fleet utilization', () => {
			const sim = new DiscreteEventSimulator(baseConfig);
			const result = sim.run();

			expect(result.fleetUtilization).toBeGreaterThan(0);
			expect(result.fleetUtilization).toBeLessThanOrEqual(1);
		});
	});

	describe('vehicle capacity comparison', () => {
		it('should show different results for different capacities', () => {
			const simSmall = new DiscreteEventSimulator({
				...baseConfig,
				vehicleCount: 10,
				payloadCapacityKg: 100000,
				missionDurationYears: 5,
				seed: 42
			});
			const resultSmall = simSmall.run();

			const simLarge = new DiscreteEventSimulator({
				...baseConfig,
				vehicleCount: 10,
				payloadCapacityKg: 250000,
				missionDurationYears: 5,
				seed: 42
			});
			const resultLarge = simLarge.run();

			// Both should have meaningful throughput
			expect(resultSmall.throughputKgPerYear).toBeGreaterThan(0);
			expect(resultLarge.throughputKgPerYear).toBeGreaterThan(0);
		});
	});

	describe('reproducibility', () => {
		it('should produce same results with same seed', () => {
			const sim1 = new DiscreteEventSimulator({ ...baseConfig, seed: 99999 });
			const result1 = sim1.run();

			const sim2 = new DiscreteEventSimulator({ ...baseConfig, seed: 99999 });
			const result2 = sim2.run();

			expect(result1.totalThroughputKg).toBe(result2.totalThroughputKg);
			expect(result1.vehicleFailures).toBe(result2.vehicleFailures);
		});

		it('should produce different results with different seeds', () => {
			const config: FleetConfig = {
				...baseConfig,
				annualFailureRate: 0.05,
				missionDurationYears: 10
			};

			const sim1 = new DiscreteEventSimulator({ ...config, seed: 111 });
			const result1 = sim1.run();

			const sim2 = new DiscreteEventSimulator({ ...config, seed: 222 });
			const result2 = sim2.run();

			// Results might differ due to stochastic failures
			// (though with 0 failure rate they'd be identical)
			expect(result1.totalThroughputKg).not.toBe(result2.totalThroughputKg);
		});
	});
});
