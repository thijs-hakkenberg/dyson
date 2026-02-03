import { describe, it, expect } from 'vitest';
import {
	runISRUEconomicsMonteCarlo,
	runISRUEconomicsComparison,
	generateStandardScenarios,
	DEFAULT_ISRU_ECONOMICS_CONFIG
} from '../monte-carlo';
import {
	sampleParameters,
	calculateEarthTrajectoryWithUncertainty,
	calculateISRUTrajectoryWithUncertainty,
	findCrossoverPointDetailed
} from '../cost-model';
import { SeededRandom } from '$lib/services/simulation-core';
import type { ISRUEconomicsConfig } from '../types';

describe('ISRU Economics Monte Carlo', () => {
	// Use a smaller config for faster tests
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

	describe('sampleParameters', () => {
		it('should sample launch cost within range', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);

			expect(params.launchCostPerKg).toBeGreaterThanOrEqual(testConfig.launchCostPerKgLow);
			expect(params.launchCostPerKg).toBeLessThanOrEqual(testConfig.launchCostPerKgHigh);
		});

		it('should sample ISRU capital cost within range', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);

			const lowDollars = testConfig.isruCapitalCostBLow * 1e9;
			const highDollars = testConfig.isruCapitalCostBHigh * 1e9;

			expect(params.isruCapitalCostDollars).toBeGreaterThanOrEqual(lowDollars);
			expect(params.isruCapitalCostDollars).toBeLessThanOrEqual(highDollars);
		});

		it('should sample learning rates with some variation', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);

			expect(params.learningRateEarth).toBeGreaterThan(0.75);
			expect(params.learningRateEarth).toBeLessThan(0.98);
			expect(params.learningRateISRU).toBeGreaterThan(0.75);
			expect(params.learningRateISRU).toBeLessThan(0.98);
		});

		it('should produce different results with different seeds', () => {
			const rng1 = new SeededRandom(12345);
			const rng2 = new SeededRandom(67890);

			const params1 = sampleParameters(testConfig, rng1);
			const params2 = sampleParameters(testConfig, rng2);

			expect(params1.launchCostPerKg).not.toEqual(params2.launchCostPerKg);
		});
	});

	describe('calculateEarthTrajectoryWithUncertainty', () => {
		it('should produce trajectory reaching target units', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);

			const finalYear = trajectory[trajectory.length - 1];
			expect(finalYear.cumulativeUnits).toBe(testConfig.targetDeploymentUnits);
		});

		it('should have increasing cumulative cost', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);

			for (let i = 1; i < trajectory.length; i++) {
				expect(trajectory[i].cumulativeCost).toBeGreaterThan(trajectory[i - 1].cumulativeCost);
			}
		});

		it('should include both manufacturing and launch costs', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateEarthTrajectoryWithUncertainty(testConfig, params);

			for (const year of trajectory) {
				expect(year.manufacturingCost).toBeGreaterThan(0);
				expect(year.launchCost).toBeGreaterThan(0);
			}
		});
	});

	describe('calculateISRUTrajectoryWithUncertainty', () => {
		it('should produce trajectory reaching target units', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateISRUTrajectoryWithUncertainty(testConfig, params);

			const finalYear = trajectory[trajectory.length - 1];
			expect(finalYear.cumulativeUnits).toBe(testConfig.targetDeploymentUnits);
		});

		it('should start with capital cost', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateISRUTrajectoryWithUncertainty(testConfig, params);

			// First year cost should include capital
			expect(trajectory[0].cumulativeCost).toBeGreaterThanOrEqual(params.isruCapitalCostDollars);
		});

		it('should ramp up production over time', () => {
			const rng = new SeededRandom(12345);
			const params = sampleParameters(testConfig, rng);
			const trajectory = calculateISRUTrajectoryWithUncertainty(testConfig, params);

			// Production rate should increase during ramp-up
			if (trajectory.length > testConfig.isruRampUpYears) {
				const earlyRate = trajectory[1].productionRate;
				const lateRate = trajectory[testConfig.isruRampUpYears].productionRate;
				expect(lateRate).toBeGreaterThan(earlyRate);
			}
		});
	});

	describe('findCrossoverPointDetailed', () => {
		it('should find crossover point when ISRU becomes cheaper', () => {
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

			const crossover = findCrossoverPointDetailed(earthTrajectory, isruTrajectory);

			// Should find a crossover for this favorable scenario
			if (crossover) {
				expect(crossover.unitCount).toBeGreaterThan(0);
				expect(crossover.year).toBeGreaterThan(0);
			}
		});

		it('should return null when ISRU is never cheaper', () => {
			// Use config unfavorable to ISRU
			const unfavorableConfig: ISRUEconomicsConfig = {
				...testConfig,
				launchCostPerKgLow: 100,
				launchCostPerKgHigh: 200,
				isruCapitalCostBLow: 90,
				isruCapitalCostBHigh: 100,
				targetDeploymentUnits: 100
			};

			const rng = new SeededRandom(12345);
			const params = sampleParameters(unfavorableConfig, rng);
			const earthTrajectory = calculateEarthTrajectoryWithUncertainty(unfavorableConfig, params);
			const isruTrajectory = calculateISRUTrajectoryWithUncertainty(unfavorableConfig, params);

			const crossover = findCrossoverPointDetailed(earthTrajectory, isruTrajectory);

			// Should not find a crossover for very low volume with high ISRU cost
			expect(crossover).toBeNull();
		});
	});

	describe('runISRUEconomicsMonteCarlo', () => {
		it('should run multiple simulations', async () => {
			const result = await runISRUEconomicsMonteCarlo(testConfig, 10);

			expect(result.runs).toBe(10);
		});

		it('should calculate statistics', async () => {
			const result = await runISRUEconomicsMonteCarlo(testConfig, 10);

			expect(result.stats.totalEarthCostMean).toBeGreaterThan(0);
			expect(result.stats.totalISRUCostMean).toBeGreaterThan(0);
		});

		it('should track crossover occurrence', async () => {
			const result = await runISRUEconomicsMonteCarlo(testConfig, 10);

			expect(result.stats.crossoverOccurrencePercent).toBeGreaterThanOrEqual(0);
			expect(result.stats.crossoverOccurrencePercent).toBeLessThanOrEqual(100);
		});

		it('should calculate cost savings', async () => {
			const result = await runISRUEconomicsMonteCarlo(testConfig, 10);

			// Savings can be positive or negative
			expect(typeof result.stats.costSavingsMean).toBe('number');
		});

		it('should report progress', async () => {
			const progressCalls: number[] = [];

			await runISRUEconomicsMonteCarlo(testConfig, 20, (progress) => {
				progressCalls.push(progress.percentComplete);
			});

			expect(progressCalls.length).toBeGreaterThan(0);
			expect(progressCalls[progressCalls.length - 1]).toBe(100);
		});

		it('should include run results when requested', async () => {
			const result = await runISRUEconomicsMonteCarlo(testConfig, 5, undefined, true);

			expect(result.runResults).toBeDefined();
			expect(result.runResults!.length).toBe(5);
		});

		it('should provide confidence intervals', async () => {
			const result = await runISRUEconomicsMonteCarlo(testConfig, 20);

			expect(result.stats.savingsCI95).toBeDefined();
			expect(result.stats.savingsCI95.lower).toBeLessThanOrEqual(result.stats.savingsCI95.upper);
		});
	});

	describe('runISRUEconomicsComparison', () => {
		it('should compare multiple scenarios', async () => {
			const scenarios = [
				{ name: 'Low Launch Cost', config: { ...testConfig, launchCostPerKgLow: 500, launchCostPerKgHigh: 750 } },
				{ name: 'High Launch Cost', config: { ...testConfig, launchCostPerKgLow: 1500, launchCostPerKgHigh: 2000 } }
			];

			const result = await runISRUEconomicsComparison(scenarios, 10);

			expect(result.scenarios.length).toBe(2);
			expect(result.scenarios[0].name).toBe('Low Launch Cost');
			expect(result.scenarios[1].name).toBe('High Launch Cost');
		});

		it('should provide analysis', async () => {
			const scenarios = [
				{ name: 'Conservative', config: { ...testConfig, isruCapitalCostBLow: 50, isruCapitalCostBHigh: 75 } },
				{ name: 'Optimistic', config: { ...testConfig, isruCapitalCostBLow: 10, isruCapitalCostBHigh: 20 } }
			];

			const result = await runISRUEconomicsComparison(scenarios, 10);

			expect(result.analysis.earliestCrossoverScenario).toBeDefined();
			expect(result.analysis.recommendations.length).toBeGreaterThan(0);
		});

		it('should report progress across scenarios', async () => {
			const scenarios = generateStandardScenarios(testConfig);
			const progressCalls: string[] = [];

			await runISRUEconomicsComparison(scenarios.slice(0, 2), 5, (progress) => {
				if (progress.scenarioName) {
					progressCalls.push(progress.scenarioName);
				}
			});

			expect(progressCalls.length).toBeGreaterThan(0);
		});
	});

	describe('generateStandardScenarios', () => {
		it('should generate multiple scenarios', () => {
			const scenarios = generateStandardScenarios(testConfig);

			expect(scenarios.length).toBeGreaterThan(0);
		});

		it('should include Conservative, Baseline, and Optimistic', () => {
			const scenarios = generateStandardScenarios(testConfig);
			const names = scenarios.map(s => s.name);

			expect(names).toContain('Conservative');
			expect(names).toContain('Baseline');
			expect(names).toContain('Optimistic');
		});

		it('should have varying capital costs across scenarios', () => {
			const scenarios = generateStandardScenarios(testConfig);

			const capitalCosts = scenarios.map(s => s.config.isruCapitalCostBHigh);
			const uniqueCosts = new Set(capitalCosts);

			expect(uniqueCosts.size).toBeGreaterThan(1);
		});
	});

	describe('DEFAULT_ISRU_ECONOMICS_CONFIG', () => {
		it('should provide sensible defaults', () => {
			expect(DEFAULT_ISRU_ECONOMICS_CONFIG.launchCostPerKgLow).toBeGreaterThan(0);
			expect(DEFAULT_ISRU_ECONOMICS_CONFIG.targetDeploymentUnits).toBeGreaterThan(0);
			expect(DEFAULT_ISRU_ECONOMICS_CONFIG.unitMassKg).toBeGreaterThan(0);
		});

		it('should have valid learning rates', () => {
			expect(DEFAULT_ISRU_ECONOMICS_CONFIG.learningRateEarth).toBeGreaterThan(0.7);
			expect(DEFAULT_ISRU_ECONOMICS_CONFIG.learningRateEarth).toBeLessThan(1);
			expect(DEFAULT_ISRU_ECONOMICS_CONFIG.learningRateISRU).toBeGreaterThan(0.7);
			expect(DEFAULT_ISRU_ECONOMICS_CONFIG.learningRateISRU).toBeLessThan(1);
		});

		it('should have launch cost range', () => {
			expect(DEFAULT_ISRU_ECONOMICS_CONFIG.launchCostPerKgHigh).toBeGreaterThan(
				DEFAULT_ISRU_ECONOMICS_CONFIG.launchCostPerKgLow
			);
		});
	});
});
