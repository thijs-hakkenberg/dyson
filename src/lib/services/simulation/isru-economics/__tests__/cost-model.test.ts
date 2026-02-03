import { describe, it, expect } from 'vitest';
import {
	sampleParameters,
	calculateEarthTrajectoryWithUncertainty,
	calculateISRUTrajectoryWithUncertainty,
	findCrossoverPointDetailed,
	calculateBreakEvenMetrics,
	getMarginalCost,
	analyzeScaleEconomies
} from '../cost-model';
import { SeededRandom } from '$lib/services/simulation-core';
import type { ISRUEconomicsConfig } from '../types';

describe('ISRU Cost Model', () => {
	const testConfig: ISRUEconomicsConfig = {
		launchCostPerKgLow: 1000,
		launchCostPerKgHigh: 2000,
		isruCapitalCostBLow: 10,
		isruCapitalCostBHigh: 20,
		earthProductionRatePerYear: 100,
		isruRampUpYears: 3,
		isruMaxProductionRate: 200,
		unitMassKg: 5000,
		targetDeploymentUnits: 1000,
		learningRateEarth: 0.85,
		learningRateISRU: 0.90,
		firstUnitManufacturingCost: 10_000_000,
		isruOperationalCostPerUnit: 1_000_000,
		seed: 12345
	};

	describe('calculateBreakEvenMetrics', () => {
		it('should calculate NPV for both trajectories', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const earthTrajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);
			const isruTrajectory = calculateISRUTrajectoryWithUncertainty(testConfig, params);

			const metrics = calculateBreakEvenMetrics(earthTrajectory, isruTrajectory);

			expect(metrics.npvEarth).toBeLessThan(0); // Costs are negative
			expect(metrics.npvISRU).toBeLessThan(0);
		});

		it('should calculate ROI', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const earthTrajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);
			const isruTrajectory = calculateISRUTrajectoryWithUncertainty(testConfig, params);

			const metrics = calculateBreakEvenMetrics(earthTrajectory, isruTrajectory);

			expect(typeof metrics.roi).toBe('number');
		});

		it('should find payback year when ISRU is cheaper', () => {
			// Use config favorable to ISRU
			const favorableConfig: ISRUEconomicsConfig = {
				...testConfig,
				launchCostPerKgLow: 2000,
				launchCostPerKgHigh: 2500,
				isruCapitalCostBLow: 5,
				isruCapitalCostBHigh: 10,
				targetDeploymentUnits: 5000
			};

			const rng = new SeededRandom(12345);
			const params = sampleParameters(favorableConfig, rng);
			const earthTrajectory = calculateEarthTrajectoryWithUncertainty(favorableConfig, params);
			const isruTrajectory = calculateISRUTrajectoryWithUncertainty(favorableConfig, params);

			const metrics = calculateBreakEvenMetrics(earthTrajectory, isruTrajectory);

			// Payback year might be null or a positive number
			if (metrics.paybackYear !== null) {
				expect(metrics.paybackYear).toBeGreaterThan(0);
			}
		});
	});

	describe('getMarginalCost', () => {
		it('should return cost for specific unit count', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);

			const cost = getMarginalCost(trajectory, 100);

			expect(cost).toBeGreaterThan(0);
			expect(cost).toBeLessThan(Infinity);
		});

		it('should decrease with higher unit counts due to learning curve', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);

			const costAt100 = getMarginalCost(trajectory, 100);
			const costAt500 = getMarginalCost(trajectory, 500);

			expect(costAt500).toBeLessThan(costAt100);
		});
	});

	describe('analyzeScaleEconomies', () => {
		it('should calculate costs at different scales', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);

			const analysis = analyzeScaleEconomies(trajectory);

			expect(analysis.costAt100Units).toBeGreaterThan(0);
		});

		it('should show scale factors less than 1 (cost reduction)', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);

			const analysis = analyzeScaleEconomies(trajectory);

			expect(analysis.scaleFactorTo1000).toBeLessThan(1);
		});
	});

	describe('trajectory consistency', () => {
		it('should have monotonically increasing cumulative units', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const earthTrajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);

			for (let i = 1; i < earthTrajectory.length; i++) {
				expect(earthTrajectory[i].cumulativeUnits).toBeGreaterThan(
					earthTrajectory[i - 1].cumulativeUnits
				);
			}
		});

		it('should have monotonically increasing cumulative cost', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const isruTrajectory = calculateISRUTrajectoryWithUncertainty(testConfig, params);

			for (let i = 1; i < isruTrajectory.length; i++) {
				expect(isruTrajectory[i].cumulativeCost).toBeGreaterThanOrEqual(
					isruTrajectory[i - 1].cumulativeCost
				);
			}
		});

		it('should have decreasing average cost per unit over time', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);

			// Average cost should generally decrease (with possible small variations)
			const firstAvg = trajectory[0].avgCostPerUnit;
			const lastAvg = trajectory[trajectory.length - 1].avgCostPerUnit;

			expect(lastAvg).toBeLessThan(firstAvg);
		});
	});

	describe('learning curve effects', () => {
		it('should show Earth learning curve reducing costs', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);

			// Compare first and last year manufacturing cost per unit
			const firstYearPerUnit = trajectory[0].manufacturingCost / trajectory[0].productionRate;
			const lastYearPerUnit =
				trajectory[trajectory.length - 1].manufacturingCost /
				trajectory[trajectory.length - 1].productionRate;

			expect(lastYearPerUnit).toBeLessThan(firstYearPerUnit);
		});

		it('should show ISRU learning curve reducing costs', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateISRUTrajectoryWithUncertainty(testConfig, params);

			// Find first year with production and last year
			const productionYears = trajectory.filter((y) => y.productionRate > 0);
			if (productionYears.length >= 2) {
				const firstCostPerUnit =
					productionYears[0].costThisYear / productionYears[0].productionRate;
				const lastCostPerUnit =
					productionYears[productionYears.length - 1].costThisYear /
					productionYears[productionYears.length - 1].productionRate;

				expect(lastCostPerUnit).toBeLessThan(firstCostPerUnit);
			}
		});
	});

	describe('parameter sensitivity', () => {
		it('should produce higher Earth costs with higher launch costs', () => {
			const rng1 = new SeededRandom(12345);
			const rng2 = new SeededRandom(12345);

			const lowLaunchConfig = { ...testConfig, launchCostPerKgLow: 500, launchCostPerKgHigh: 500 };
			const highLaunchConfig = { ...testConfig, launchCostPerKgLow: 2000, launchCostPerKgHigh: 2000 };

			const paramsLow = sampleParameters(lowLaunchConfig, rng1);
			const paramsHigh = sampleParameters(highLaunchConfig, rng2);

			const trajectoryLow = calculateEarthTrajectoryWithUncertainty(lowLaunchConfig, paramsLow);
			const trajectoryHigh = calculateEarthTrajectoryWithUncertainty(highLaunchConfig, paramsHigh);

			const finalCostLow = trajectoryLow[trajectoryLow.length - 1].cumulativeCost;
			const finalCostHigh = trajectoryHigh[trajectoryHigh.length - 1].cumulativeCost;

			expect(finalCostHigh).toBeGreaterThan(finalCostLow);
		});

		it('should produce higher ISRU costs with higher capital costs', () => {
			const rng1 = new SeededRandom(12345);
			const rng2 = new SeededRandom(12345);

			const lowCapitalConfig = { ...testConfig, isruCapitalCostBLow: 5, isruCapitalCostBHigh: 5 };
			const highCapitalConfig = { ...testConfig, isruCapitalCostBLow: 50, isruCapitalCostBHigh: 50 };

			const paramsLow = sampleParameters(lowCapitalConfig, rng1);
			const paramsHigh = sampleParameters(highCapitalConfig, rng2);

			const trajectoryLow = calculateISRUTrajectoryWithUncertainty(lowCapitalConfig, paramsLow);
			const trajectoryHigh = calculateISRUTrajectoryWithUncertainty(highCapitalConfig, paramsHigh);

			const finalCostLow = trajectoryLow[trajectoryLow.length - 1].cumulativeCost;
			const finalCostHigh = trajectoryHigh[trajectoryHigh.length - 1].cumulativeCost;

			expect(finalCostHigh).toBeGreaterThan(finalCostLow);
		});
	});
});
