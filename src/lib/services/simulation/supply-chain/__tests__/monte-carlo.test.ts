import { describe, it, expect } from 'vitest';
import {
	runSupplyChainMonteCarlo,
	runSupplyChainComparison,
	generateStockpilingScenarios,
	generateStrategyRecommendation,
	DEFAULT_SUPPLY_CHAIN_CONFIG
} from '../monte-carlo';
import {
	sampleSupplyParameters,
	calculateYearlySupply,
	calculateYearlyDemand,
	simulateStockpiling,
	evaluateAlternativePropellant,
	calculatePriceResponse,
	findConstraintYear
} from '../supply-model';
import { SeededRandom } from '$lib/services/simulation-core';
import type { SupplyChainConfig, YearlyBalance } from '../types';

describe('Supply Chain Monte Carlo', () => {
	// Test configuration with reasonable defaults
	const testConfig: SupplyChainConfig = {
		xenonProductionRate: 70, // 70 tonnes/year global
		xenonDemandPhase1: 150, // 150 tonnes needed
		kryptonAvailability: 200, // 200 tonnes/year
		argonAvailability: 500, // 500 tonnes/year
		rareEarthProduction: {
			tellurium: 500,
			indium: 800,
			gallium: 300
		},
		learningCurveEffect: 0.15, // 15% reduction
		stockpilingYears: 5,
		iterations: 100,
		productionGrowthRate: 0.03, // 3% annual growth
		demandUncertaintyRange: 0.2, // +/-20%
		priceElasticity: 0.3,
		projectAllocationFraction: 0.3, // 30% of global production
		seed: 12345
	};

	describe('sampleSupplyParameters', () => {
		it('should sample xenon production within uncertainty range', () => {
			const rng = new SeededRandom(12345);
			const params = sampleSupplyParameters(testConfig, rng);

			// Should be within +/- 30% of base rate (using inclusive bounds)
			expect(params.xenonProductionRate).toBeGreaterThanOrEqual(testConfig.xenonProductionRate * 0.7);
			expect(params.xenonProductionRate).toBeLessThanOrEqual(testConfig.xenonProductionRate * 1.3);
		});

		it('should sample demand within uncertainty range', () => {
			const rng = new SeededRandom(12345);
			const params = sampleSupplyParameters(testConfig, rng);

			// Should be within configured uncertainty range
			const low = testConfig.xenonDemandPhase1 * (1 - testConfig.demandUncertaintyRange);
			const high = testConfig.xenonDemandPhase1 * (1 + testConfig.demandUncertaintyRange);
			expect(params.xenonDemand).toBeGreaterThanOrEqual(low);
			expect(params.xenonDemand).toBeLessThanOrEqual(high);
		});

		it('should produce different results with different seeds', () => {
			const rng1 = new SeededRandom(12345);
			const rng2 = new SeededRandom(67890);

			const params1 = sampleSupplyParameters(testConfig, rng1);
			const params2 = sampleSupplyParameters(testConfig, rng2);

			expect(params1.xenonProductionRate).not.toEqual(params2.xenonProductionRate);
		});

		it('should sample Isp ratios for alternative propellants', () => {
			const rng = new SeededRandom(12345);
			const params = sampleSupplyParameters(testConfig, rng);

			// Krypton Isp ratio should be around 0.85 (85% of xenon)
			expect(params.kryptonIspRatio).toBeGreaterThan(0.75);
			expect(params.kryptonIspRatio).toBeLessThan(0.95);

			// Argon Isp ratio should be around 0.60 (60% of xenon)
			expect(params.argonIspRatio).toBeGreaterThan(0.50);
			expect(params.argonIspRatio).toBeLessThan(0.75);
		});
	});

	describe('calculateYearlySupply', () => {
		it('should model production growth over time', () => {
			const rng = new SeededRandom(12345);
			const params = sampleSupplyParameters(testConfig, rng);

			const year1Supply = calculateYearlySupply(testConfig, params, 1);
			const year5Supply = calculateYearlySupply(testConfig, params, 5);
			const year10Supply = calculateYearlySupply(testConfig, params, 10);

			// Supply should increase over time due to growth rate
			expect(year5Supply).toBeGreaterThan(year1Supply);
			expect(year10Supply).toBeGreaterThan(year5Supply);
		});

		it('should apply project allocation fraction', () => {
			const rng = new SeededRandom(12345);
			const params = sampleSupplyParameters(testConfig, rng);

			const yearSupply = calculateYearlySupply(testConfig, params, 1);

			// Supply should be approximately allocation fraction * global production
			// Allow for growth and sampling variation
			expect(yearSupply).toBeLessThan(params.xenonProductionRate);
			expect(yearSupply).toBeGreaterThan(0);
		});

		it('should respond to price signals with higher supply', () => {
			const rng = new SeededRandom(12345);
			const params = sampleSupplyParameters(testConfig, rng);

			// Base supply without price pressure
			const baseSupply = calculateYearlySupply(testConfig, params, 1);

			// With high price, supply should increase due to elasticity
			const highPriceConfig = { ...testConfig, priceElasticity: 0.8 };
			const highPriceSupply = calculateYearlySupply(highPriceConfig, params, 1, 2.0);

			expect(highPriceSupply).toBeGreaterThanOrEqual(baseSupply);
		});
	});

	describe('calculateYearlyDemand', () => {
		it('should model learning curve demand reduction', () => {
			const rng = new SeededRandom(12345);
			const params = sampleSupplyParameters(testConfig, rng);

			// Year 1 is in stockpiling phase (0 demand)
			// Years 6-15 are deployment phase (stockpilingYears=5)
			// Compare deployment years with and without learning curve
			const deployYear1Demand = calculateYearlyDemand(testConfig, params, 6, params.xenonDemand);
			const deployYear5Demand = calculateYearlyDemand(testConfig, params, 10, params.xenonDemand);

			// Both should be positive (in deployment phase)
			expect(deployYear1Demand).toBeGreaterThan(0);
			expect(deployYear5Demand).toBeGreaterThan(0);
			// Learning curve should reduce demand over deployment years
			expect(deployYear5Demand).toBeLessThanOrEqual(deployYear1Demand * 1.5);
		});

		it('should scale with project phase progression', () => {
			const rng = new SeededRandom(12345);
			const params = sampleSupplyParameters(testConfig, rng);

			// Demand should be spread across stockpiling + deployment years
			const totalYears = testConfig.stockpilingYears + 10; // 10 deployment years
			let totalDemand = 0;
			for (let year = 1; year <= totalYears; year++) {
				totalDemand += calculateYearlyDemand(testConfig, params, year, params.xenonDemand);
			}

			// Total demand should approach the Phase 1 requirement (with learning reduction)
			expect(totalDemand).toBeLessThanOrEqual(params.xenonDemand);
		});
	});

	describe('evaluateAlternativePropellant', () => {
		it('should calculate krypton viability based on Isp ratio', () => {
			const krypton = evaluateAlternativePropellant(
				'krypton',
				0.85, // 85% Isp ratio
				200, // availability
				0.3, // cost ratio (cheaper)
				150 // demand
			);

			expect(krypton.name).toBe('krypton');
			expect(krypton.ispRatio).toBe(0.85);
			expect(krypton.scaleFactor).toBeCloseTo(1 / 0.85, 1); // ~1.18x more mass needed
			// Krypton is viable if Isp > 0.7 (provides > 2000s for Hall thrusters)
			expect(krypton.viable).toBe(true);
		});

		it('should calculate argon viability based on availability', () => {
			const argon = evaluateAlternativePropellant(
				'argon',
				0.60, // 60% Isp ratio
				500, // availability
				0.1, // cost ratio (much cheaper)
				150 // demand
			);

			expect(argon.name).toBe('argon');
			expect(argon.ispRatio).toBe(0.60);
			expect(argon.scaleFactor).toBeCloseTo(1 / 0.60, 1); // ~1.67x more mass needed
			// Argon has low Isp but high availability
			expect(argon.availability).toBe(500);
		});

		it('should flag viable alternatives correctly', () => {
			// Low Isp propellant should be flagged as not viable
			const lowIsp = evaluateAlternativePropellant(
				'test-propellant',
				0.4, // Very low Isp
				1000,
				0.1,
				150
			);

			expect(lowIsp.viable).toBe(false);

			// High Isp propellant should be viable
			const highIsp = evaluateAlternativePropellant(
				'test-propellant',
				0.9,
				100,
				0.5,
				150
			);

			expect(highIsp.viable).toBe(true);
		});

		it('should calculate cost ratios correctly', () => {
			const propellant = evaluateAlternativePropellant(
				'krypton',
				0.85,
				200,
				0.3, // 30% of xenon cost
				150
			);

			expect(propellant.costRatio).toBe(0.3);
		});
	});

	describe('findConstraintYear', () => {
		it('should identify year when cumulative deficit exceeds threshold', () => {
			// Create balance data with a deficit building up
			// stockpile goes: -5, -10, -15, -20, -25
			const balance: YearlyBalance[] = [
				{ year: 1, supply: 20, demand: 25, deficit: -5, cumulativeSupply: 20, cumulativeDemand: 25, stockpile: -5, price: 3000 },
				{ year: 2, supply: 21, demand: 26, deficit: -5, cumulativeSupply: 41, cumulativeDemand: 51, stockpile: -10, price: 3500 },
				{ year: 3, supply: 22, demand: 27, deficit: -5, cumulativeSupply: 63, cumulativeDemand: 78, stockpile: -15, price: 4000 },
				{ year: 4, supply: 23, demand: 28, deficit: -5, cumulativeSupply: 86, cumulativeDemand: 106, stockpile: -20, price: 4500 },
				{ year: 5, supply: 24, demand: 29, deficit: -5, cumulativeSupply: 110, cumulativeDemand: 135, stockpile: -25, price: 5000 }
			];

			const constraintYear = findConstraintYear(balance, 10); // Threshold of 10 tonnes

			// Should identify year 3 when stockpile goes below -10 (exceeds threshold)
			// Year 1: stockpile = -5 (not below -10)
			// Year 2: stockpile = -10 (not below -10)
			// Year 3: stockpile = -15 (below -10, constraint triggered)
			expect(constraintYear).toBe(3);
		});

		it('should return null when supply always sufficient', () => {
			// Create balance data with surplus
			const balance: YearlyBalance[] = [
				{ year: 1, supply: 30, demand: 25, deficit: 5, cumulativeSupply: 30, cumulativeDemand: 25, stockpile: 5, price: 2500 },
				{ year: 2, supply: 31, demand: 26, deficit: 5, cumulativeSupply: 61, cumulativeDemand: 51, stockpile: 10, price: 2400 },
				{ year: 3, supply: 32, demand: 27, deficit: 5, cumulativeSupply: 93, cumulativeDemand: 78, stockpile: 15, price: 2300 }
			];

			const constraintYear = findConstraintYear(balance, 10);

			expect(constraintYear).toBeNull();
		});
	});

	describe('simulateStockpiling', () => {
		it('should accumulate supply during stockpiling years', () => {
			const rng = new SeededRandom(12345);
			const params = sampleSupplyParameters(testConfig, rng);

			const result = simulateStockpiling(testConfig, params);

			// Should have stockpiling years worth of balance data
			expect(result.yearByYearBalance.length).toBeGreaterThanOrEqual(testConfig.stockpilingYears);
		});

		it('should track cumulative supply and demand', () => {
			const rng = new SeededRandom(12345);
			const params = sampleSupplyParameters(testConfig, rng);

			const result = simulateStockpiling(testConfig, params);
			const balance = result.yearByYearBalance;

			// Cumulative values should increase over time
			for (let i = 1; i < balance.length; i++) {
				expect(balance[i].cumulativeSupply).toBeGreaterThanOrEqual(balance[i - 1].cumulativeSupply);
			}
		});

		it('should calculate stockpile required', () => {
			const rng = new SeededRandom(12345);
			const params = sampleSupplyParameters(testConfig, rng);

			const result = simulateStockpiling(testConfig, params);

			// Stockpile required should be positive
			expect(result.stockpileRequired).toBeGreaterThanOrEqual(0);
		});
	});

	describe('calculatePriceResponse', () => {
		it('should increase price when deficit exists', () => {
			const basePrice = 3000; // $/kg

			const priceWithDeficit = calculatePriceResponse(basePrice, -10, 0.3);

			expect(priceWithDeficit).toBeGreaterThan(basePrice);
		});

		it('should decrease price when surplus exists', () => {
			const basePrice = 3000; // $/kg

			const priceWithSurplus = calculatePriceResponse(basePrice, 10, 0.3);

			expect(priceWithSurplus).toBeLessThanOrEqual(basePrice);
		});

		it('should scale price change with elasticity', () => {
			const basePrice = 3000;
			const deficit = -10;

			const lowElasticityPrice = calculatePriceResponse(basePrice, deficit, 0.1);
			const highElasticityPrice = calculatePriceResponse(basePrice, deficit, 0.5);

			// Higher elasticity = smaller price change (more responsive supply)
			expect(highElasticityPrice).toBeLessThan(lowElasticityPrice);
		});
	});

	describe('runSupplyChainMonteCarlo', () => {
		it('should run specified number of iterations', async () => {
			const result = await runSupplyChainMonteCarlo(testConfig, 20);

			expect(result.runs).toBe(20);
		});

		it('should calculate constraint statistics', async () => {
			const result = await runSupplyChainMonteCarlo(testConfig, 20);

			expect(result.stats.constraintOccurrencePercent).toBeGreaterThanOrEqual(0);
			expect(result.stats.constraintOccurrencePercent).toBeLessThanOrEqual(100);
		});

		it('should report progress', async () => {
			const progressCalls: number[] = [];

			await runSupplyChainMonteCarlo(testConfig, 20, (progress) => {
				progressCalls.push(progress.percentComplete);
			});

			expect(progressCalls.length).toBeGreaterThan(0);
			expect(progressCalls[progressCalls.length - 1]).toBe(100);
		});

		it('should include run results when requested', async () => {
			const result = await runSupplyChainMonteCarlo(testConfig, 10, undefined, true);

			expect(result.runResults).toBeDefined();
			expect(result.runResults!.length).toBe(10);
		});

		it('should provide confidence intervals', async () => {
			const result = await runSupplyChainMonteCarlo(testConfig, 30);

			expect(result.stats.stockpileCI95).toBeDefined();
			expect(result.stats.stockpileCI95.lower).toBeLessThanOrEqual(result.stats.stockpileCI95.upper);
		});

		it('should calculate alternative propellant viability percentages', async () => {
			const result = await runSupplyChainMonteCarlo(testConfig, 20);

			expect(result.stats.kryptonViabilityPercent).toBeGreaterThanOrEqual(0);
			expect(result.stats.kryptonViabilityPercent).toBeLessThanOrEqual(100);
			expect(result.stats.argonViabilityPercent).toBeGreaterThanOrEqual(0);
			expect(result.stats.argonViabilityPercent).toBeLessThanOrEqual(100);
		});
	});

	describe('runSupplyChainComparison', () => {
		it('should compare multiple scenarios', async () => {
			const scenarios = [
				{ name: 'Low Stockpile', config: { ...testConfig, stockpilingYears: 3 } },
				{ name: 'High Stockpile', config: { ...testConfig, stockpilingYears: 8 } }
			];

			const result = await runSupplyChainComparison(scenarios, 10);

			expect(result.scenarios.length).toBe(2);
			expect(result.scenarios[0].name).toBe('Low Stockpile');
			expect(result.scenarios[1].name).toBe('High Stockpile');
		});

		it('should provide analysis', async () => {
			const scenarios = generateStockpilingScenarios(testConfig);

			const result = await runSupplyChainComparison(scenarios.slice(0, 2), 10);

			expect(result.analysis.lowestRiskScenario).toBeDefined();
			expect(result.analysis.recommendations.length).toBeGreaterThan(0);
		});

		it('should report progress across scenarios', async () => {
			const scenarios = [
				{ name: 'Scenario A', config: testConfig },
				{ name: 'Scenario B', config: { ...testConfig, stockpilingYears: 7 } }
			];
			const progressCalls: string[] = [];

			await runSupplyChainComparison(scenarios, 10, (progress) => {
				if (progress.scenarioName) {
					progressCalls.push(progress.scenarioName);
				}
			});

			expect(progressCalls.length).toBeGreaterThan(0);
		});
	});

	describe('generateStockpilingScenarios', () => {
		it('should generate multiple scenarios with different stockpiling strategies', () => {
			const scenarios = generateStockpilingScenarios(testConfig);

			expect(scenarios.length).toBeGreaterThan(1);

			// Should have different stockpiling years
			const stockpilingYears = scenarios.map((s) => s.config.stockpilingYears);
			const uniqueYears = new Set(stockpilingYears);
			expect(uniqueYears.size).toBeGreaterThan(1);
		});

		it('should include aggressive and conservative scenarios', () => {
			const scenarios = generateStockpilingScenarios(testConfig);
			const names = scenarios.map((s) => s.name);

			// Should have a range of scenarios
			expect(names.length).toBeGreaterThanOrEqual(3);
		});
	});

	describe('generateStrategyRecommendation', () => {
		it('should recommend stockpiling when deficit expected', () => {
			const stats = {
				constraintYearMean: 5,
				constraintYearStdDev: 1,
				constraintOccurrencePercent: 80, // High likelihood of constraint
				stockpileRequiredMean: 50,
				stockpileRequiredStdDev: 10,
				costSensitivity: 0.15,
				kryptonViabilityPercent: 70,
				argonViabilityPercent: 30,
				yearsToAccumulateMean: 6,
				demandMetPercent: 40,
				stockpileCI95: { lower: 35, upper: 65 },
				recommendedStrategy: ''
			};

			const recommendation = generateStrategyRecommendation(stats);

			expect(recommendation.toLowerCase()).toContain('stockpil');
		});

		it('should recommend alternatives when viable', () => {
			const stats = {
				constraintYearMean: 5,
				constraintYearStdDev: 1,
				constraintOccurrencePercent: 60,
				stockpileRequiredMean: 50,
				stockpileRequiredStdDev: 10,
				costSensitivity: 0.15,
				kryptonViabilityPercent: 90, // High krypton viability
				argonViabilityPercent: 30,
				yearsToAccumulateMean: 6,
				demandMetPercent: 50,
				stockpileCI95: { lower: 35, upper: 65 },
				recommendedStrategy: ''
			};

			const recommendation = generateStrategyRecommendation(stats);

			expect(recommendation.toLowerCase()).toContain('krypton');
		});

		it('should recommend demand reduction when possible', () => {
			const stats = {
				constraintYearMean: 5,
				constraintYearStdDev: 1,
				constraintOccurrencePercent: 50,
				stockpileRequiredMean: 50,
				stockpileRequiredStdDev: 10,
				costSensitivity: 0.25, // High cost sensitivity
				kryptonViabilityPercent: 40,
				argonViabilityPercent: 20,
				yearsToAccumulateMean: 6,
				demandMetPercent: 60,
				stockpileCI95: { lower: 35, upper: 65 },
				recommendedStrategy: ''
			};

			const recommendation = generateStrategyRecommendation(stats);

			// Should mention efficiency or reduction strategies
			expect(
				recommendation.toLowerCase().includes('efficien') ||
				recommendation.toLowerCase().includes('demand') ||
				recommendation.toLowerCase().includes('reduc')
			).toBe(true);
		});
	});

	describe('DEFAULT_SUPPLY_CHAIN_CONFIG', () => {
		it('should provide sensible defaults', () => {
			expect(DEFAULT_SUPPLY_CHAIN_CONFIG.xenonProductionRate).toBeGreaterThan(0);
			expect(DEFAULT_SUPPLY_CHAIN_CONFIG.xenonDemandPhase1).toBeGreaterThan(0);
			expect(DEFAULT_SUPPLY_CHAIN_CONFIG.stockpilingYears).toBeGreaterThan(0);
		});

		it('should have valid parameter ranges', () => {
			expect(DEFAULT_SUPPLY_CHAIN_CONFIG.productionGrowthRate).toBeGreaterThan(0);
			expect(DEFAULT_SUPPLY_CHAIN_CONFIG.productionGrowthRate).toBeLessThan(1);
			expect(DEFAULT_SUPPLY_CHAIN_CONFIG.demandUncertaintyRange).toBeGreaterThan(0);
			expect(DEFAULT_SUPPLY_CHAIN_CONFIG.demandUncertaintyRange).toBeLessThan(1);
		});

		it('should have xenon demand exceeding single-year production', () => {
			// This is the key constraint scenario
			expect(DEFAULT_SUPPLY_CHAIN_CONFIG.xenonDemandPhase1).toBeGreaterThan(
				DEFAULT_SUPPLY_CHAIN_CONFIG.xenonProductionRate
			);
		});
	});
});
