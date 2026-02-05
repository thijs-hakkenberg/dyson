import { describe, it, expect } from 'vitest';
import {
	runElectricalFaultMonteCarlo,
	runElectricalFaultComparison,
	generateVoltageComparisonConfigs,
	generateOrbitalComparisonConfigs,
	generateMaterialComparisonConfigs,
	DEFAULT_ELECTRICAL_FAULT_CONFIG
} from '../monte-carlo';
import type { ElectricalFaultConfig } from '../types';

describe('Electrical Fault Monte Carlo', () => {
	const testConfig: ElectricalFaultConfig = {
		...DEFAULT_ELECTRICAL_FAULT_CONFIG,
		iterations: 10,
		seed: 12345
	};

	describe('runElectricalFaultMonteCarlo', () => {
		it('should run specified number of iterations', async () => {
			const result = await runElectricalFaultMonteCarlo(testConfig, 10);
			expect(result.runs).toBe(10);
		});

		it('should calculate arc probability per year', async () => {
			const result = await runElectricalFaultMonteCarlo(testConfig, 20);
			expect(result.result.arcProbabilityPerYear).toBeGreaterThanOrEqual(0);
			expect(result.result.arcProbabilityPerYear).toBeLessThanOrEqual(1);
		});

		it('should calculate mean time between faults', async () => {
			const result = await runElectricalFaultMonteCarlo(testConfig, 20);
			expect(result.result.meanTimeBetweenFaults).toBeGreaterThan(0);
		});

		it('should provide fault propagation risk assessment', async () => {
			const result = await runElectricalFaultMonteCarlo(testConfig, 20);
			expect(['low', 'medium', 'high']).toContain(result.result.faultPropagationRisk);
		});

		it('should report progress', async () => {
			const progressCalls: number[] = [];
			await runElectricalFaultMonteCarlo(testConfig, 20, (progress) => {
				progressCalls.push(progress.percentComplete);
			});
			expect(progressCalls.length).toBeGreaterThan(0);
			expect(progressCalls[progressCalls.length - 1]).toBe(100);
		});

		it('should provide recommended voltage by orbit', async () => {
			const result = await runElectricalFaultMonteCarlo(testConfig, 20);
			expect(result.result.recommendedVoltageByOrbit.length).toBeGreaterThan(0);
			// Voltage should increase at farther orbits (less plasma)
			const sorted = [...result.result.recommendedVoltageByOrbit].sort((a, b) => a.au - b.au);
			for (let i = 1; i < sorted.length; i++) {
				expect(sorted[i].maxVoltage).toBeGreaterThanOrEqual(sorted[i - 1].maxVoltage);
			}
		});

		it('should provide insulation mass tradeoff data', async () => {
			const result = await runElectricalFaultMonteCarlo(testConfig, 20);
			expect(result.result.insulationMassTradeoff.length).toBe(4); // 4 materials
			for (const entry of result.result.insulationMassTradeoff) {
				expect(entry.massPerMW).toBeGreaterThan(0);
				expect(entry.reliability).toBeGreaterThanOrEqual(0);
				expect(entry.reliability).toBeLessThanOrEqual(1);
			}
		});

		it('should provide confidence intervals', async () => {
			const result = await runElectricalFaultMonteCarlo(testConfig, 50);
			expect(result.result.confidenceInterval95.arcProbLower).toBeLessThanOrEqual(
				result.result.arcProbabilityPerYear
			);
			expect(result.result.confidenceInterval95.arcProbUpper).toBeGreaterThanOrEqual(
				result.result.arcProbabilityPerYear
			);
		});

		it('should be reproducible with same seed', async () => {
			const seededConfig = { ...testConfig, seed: 42 };
			const result1 = await runElectricalFaultMonteCarlo(seededConfig, 10);
			const result2 = await runElectricalFaultMonteCarlo(seededConfig, 10);
			expect(result1.result.arcProbabilityPerYear).toBeCloseTo(
				result2.result.arcProbabilityPerYear,
				10
			);
		});

		it('should calculate standard deviations', async () => {
			const result = await runElectricalFaultMonteCarlo(testConfig, 30);
			expect(result.result.arcProbabilityStdDev).toBeGreaterThanOrEqual(0);
			expect(result.result.mtbfStdDev).toBeGreaterThanOrEqual(0);
		});

		it('should calculate required isolation time', async () => {
			const result = await runElectricalFaultMonteCarlo(testConfig, 20);
			expect(result.result.requiredIsolationTime).toBeGreaterThan(0);
		});

		it('should track execution time', async () => {
			const result = await runElectricalFaultMonteCarlo(testConfig, 10);
			expect(result.executionTimeMs).toBeGreaterThan(0);
		});
	});

	describe('electrical fault physics', () => {
		it('should have higher arc probability at closer orbits', async () => {
			const nearConfig = { ...testConfig, orbitalDistance: 0.3 };
			const farConfig = { ...testConfig, orbitalDistance: 1.0 };

			const nearResult = await runElectricalFaultMonteCarlo(nearConfig, 30);
			const farResult = await runElectricalFaultMonteCarlo(farConfig, 30);

			expect(nearResult.result.arcProbabilityPerYear).toBeGreaterThan(
				farResult.result.arcProbabilityPerYear
			);
		});

		it('should have higher arc probability at higher voltages', async () => {
			const lowVConfig = { ...testConfig, voltageLevel: 600 };
			const highVConfig = { ...testConfig, voltageLevel: 5000 };

			const lowResult = await runElectricalFaultMonteCarlo(lowVConfig, 30);
			const highResult = await runElectricalFaultMonteCarlo(highVConfig, 30);

			expect(highResult.result.arcProbabilityPerYear).toBeGreaterThan(
				lowResult.result.arcProbabilityPerYear
			);
		});

		it('should have lower arc probability with thicker insulation', async () => {
			const thinConfig = { ...testConfig, insulationThickness: 0.5 };
			const thickConfig = { ...testConfig, insulationThickness: 3.0 };

			const thinResult = await runElectricalFaultMonteCarlo(thinConfig, 30);
			const thickResult = await runElectricalFaultMonteCarlo(thickConfig, 30);

			expect(thickResult.result.arcProbabilityPerYear).toBeLessThan(
				thinResult.result.arcProbabilityPerYear
			);
		});

		it('should have better reliability with ceramic insulation', async () => {
			const kaptonConfig = { ...testConfig, insulationMaterial: 'kapton' as const };
			const ceramicConfig = { ...testConfig, insulationMaterial: 'ceramic' as const };

			const kaptonResult = await runElectricalFaultMonteCarlo(kaptonConfig, 30);
			const ceramicResult = await runElectricalFaultMonteCarlo(ceramicConfig, 30);

			// Ceramic should have lower arc probability (higher breakdown voltage)
			expect(ceramicResult.result.arcProbabilityPerYear).toBeLessThanOrEqual(
				kaptonResult.result.arcProbabilityPerYear
			);
		});
	});

	describe('runElectricalFaultComparison', () => {
		it('should compare multiple configurations', async () => {
			const configs = generateVoltageComparisonConfigs(testConfig);
			const result = await runElectricalFaultComparison(configs.slice(0, 3), 10);
			expect(result.configs.length).toBe(3);
			expect(result.results.length).toBe(3);
		});

		it('should find optimal configuration', async () => {
			const configs = generateVoltageComparisonConfigs(testConfig);
			const result = await runElectricalFaultComparison(configs.slice(0, 3), 10);
			expect(result.optimalConfigIndex).toBeGreaterThanOrEqual(0);
			expect(result.optimalConfigIndex).toBeLessThan(3);
		});

		it('should provide analysis', async () => {
			const configs = generateVoltageComparisonConfigs(testConfig);
			const result = await runElectricalFaultComparison(configs.slice(0, 2), 10);
			expect(result.analysis.bestMTBF).toBeGreaterThan(0);
			expect(result.analysis.lowestArcProb).toBeGreaterThanOrEqual(0);
			expect(result.analysis.recommendation.length).toBeGreaterThan(0);
		});

		it('should report progress with material info', async () => {
			const configs = generateMaterialComparisonConfigs(testConfig);
			const progressCalls: string[] = [];
			await runElectricalFaultComparison(configs.slice(0, 2), 5, (progress) => {
				if (progress.currentMaterial) {
					progressCalls.push(progress.currentMaterial);
				}
			});
			expect(progressCalls.length).toBeGreaterThan(0);
		});
	});

	describe('generateVoltageComparisonConfigs', () => {
		it('should generate configs across voltage range', () => {
			const configs = generateVoltageComparisonConfigs(testConfig);
			expect(configs.length).toBeGreaterThan(1);
			const voltages = configs.map((c) => c.voltageLevel);
			expect(Math.min(...voltages)).toBe(600);
			expect(Math.max(...voltages)).toBeLessThanOrEqual(10000);
		});

		it('should preserve other config parameters', () => {
			const customConfig = { ...testConfig, orbitalDistance: 0.4 };
			const configs = generateVoltageComparisonConfigs(customConfig);
			for (const config of configs) {
				expect(config.orbitalDistance).toBe(0.4);
			}
		});
	});

	describe('generateOrbitalComparisonConfigs', () => {
		it('should generate configs across orbital distance range', () => {
			const configs = generateOrbitalComparisonConfigs(testConfig);
			expect(configs.length).toBeGreaterThan(1);
			const distances = configs.map((c) => c.orbitalDistance);
			expect(Math.min(...distances)).toBeCloseTo(0.3, 1);
			expect(Math.max(...distances)).toBeCloseTo(1.0, 1);
		});

		it('should preserve other config parameters', () => {
			const customConfig = { ...testConfig, voltageLevel: 2000 };
			const configs = generateOrbitalComparisonConfigs(customConfig);
			for (const config of configs) {
				expect(config.voltageLevel).toBe(2000);
			}
		});
	});

	describe('generateMaterialComparisonConfigs', () => {
		it('should generate configs for all 4 materials', () => {
			const configs = generateMaterialComparisonConfigs(testConfig);
			expect(configs.length).toBe(4);
			const materials = configs.map((c) => c.insulationMaterial);
			expect(materials).toContain('kapton');
			expect(materials).toContain('polyimide');
			expect(materials).toContain('teflon');
			expect(materials).toContain('ceramic');
		});

		it('should preserve other config parameters', () => {
			const customConfig = { ...testConfig, voltageLevel: 3000 };
			const configs = generateMaterialComparisonConfigs(customConfig);
			for (const config of configs) {
				expect(config.voltageLevel).toBe(3000);
			}
		});
	});

	describe('DEFAULT_ELECTRICAL_FAULT_CONFIG', () => {
		it('should have sensible defaults', () => {
			expect(DEFAULT_ELECTRICAL_FAULT_CONFIG.voltageLevel).toBeGreaterThanOrEqual(600);
			expect(DEFAULT_ELECTRICAL_FAULT_CONFIG.voltageLevel).toBeLessThanOrEqual(10000);
			expect(DEFAULT_ELECTRICAL_FAULT_CONFIG.orbitalDistance).toBeGreaterThanOrEqual(0.3);
			expect(DEFAULT_ELECTRICAL_FAULT_CONFIG.orbitalDistance).toBeLessThanOrEqual(1.0);
			expect(DEFAULT_ELECTRICAL_FAULT_CONFIG.insulationThickness).toBeGreaterThan(0);
		});

		it('should have valid insulation material', () => {
			const validMaterials = ['kapton', 'polyimide', 'teflon', 'ceramic'];
			expect(validMaterials).toContain(DEFAULT_ELECTRICAL_FAULT_CONFIG.insulationMaterial);
		});

		it('should have valid topology', () => {
			const validTopologies = ['series', 'parallel', 'hybrid'];
			expect(validTopologies).toContain(DEFAULT_ELECTRICAL_FAULT_CONFIG.systemTopology);
		});

		it('should have reasonable response times', () => {
			expect(DEFAULT_ELECTRICAL_FAULT_CONFIG.detectionResponseTime).toBeGreaterThan(0);
			expect(DEFAULT_ELECTRICAL_FAULT_CONFIG.isolationResponseTime).toBeGreaterThan(0);
		});

		it('should have reasonable iteration count', () => {
			expect(DEFAULT_ELECTRICAL_FAULT_CONFIG.iterations).toBeGreaterThanOrEqual(10);
		});
	});
});
