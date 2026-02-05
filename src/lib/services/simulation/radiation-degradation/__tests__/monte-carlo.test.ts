import { describe, it, expect } from 'vitest';
import {
	runRadiationDegradationMonteCarlo,
	runRadiationDegradationComparison,
	generateTechnologyComparisonConfigs,
	generateOrbitalDistanceComparisonConfigs,
	DEFAULT_RADIATION_CONFIG
} from '../monte-carlo';
import type { RadiationDegradationConfig } from '../types';

describe('Radiation Degradation Monte Carlo', () => {
	const baseConfig: RadiationDegradationConfig = {
		...DEFAULT_RADIATION_CONFIG,
		seed: 12345,
		iterations: 10
	};

	describe('runRadiationDegradationMonteCarlo', () => {
		it('should run multiple simulations', async () => {
			const result = await runRadiationDegradationMonteCarlo(baseConfig, 10);
			expect(result.runs).toBe(10);
		});

		it('should calculate end-of-life efficiency', async () => {
			const result = await runRadiationDegradationMonteCarlo(baseConfig, 10);
			expect(result.result.endOfLifeEfficiency).toBeGreaterThan(0);
			expect(result.result.endOfLifeEfficiency).toBeLessThan(baseConfig.initialEfficiency);
		});

		it('should calculate half-life year', async () => {
			const result = await runRadiationDegradationMonteCarlo(baseConfig, 10);
			expect(result.result.halfLifeYear).toBeGreaterThan(0);
		});

		it('should generate power curve', async () => {
			const result = await runRadiationDegradationMonteCarlo(baseConfig, 10);
			expect(result.result.powerCurve.length).toBe(baseConfig.missionDuration + 1);
			expect(result.result.powerCurve[0].efficiency).toBe(baseConfig.initialEfficiency);
		});

		it('should report progress', async () => {
			const progressCalls: number[] = [];
			await runRadiationDegradationMonteCarlo(baseConfig, 20, (progress) => {
				progressCalls.push(progress.percentComplete);
			});
			expect(progressCalls.length).toBeGreaterThan(0);
			expect(progressCalls[progressCalls.length - 1]).toBe(100);
		});

		it('should calculate confidence intervals', async () => {
			const result = await runRadiationDegradationMonteCarlo(baseConfig, 20);
			expect(result.result.confidenceInterval95.efficiencyLower).toBeLessThan(
				result.result.endOfLifeEfficiency
			);
			expect(result.result.confidenceInterval95.efficiencyUpper).toBeGreaterThan(
				result.result.endOfLifeEfficiency
			);
		});

		it('should calculate shielding tradeoff', async () => {
			const result = await runRadiationDegradationMonteCarlo(baseConfig, 10);
			expect(result.result.shieldingTradeoff.massPercentIncrease).toBe(100);
			expect(result.result.shieldingTradeoff.lifetimePercentIncrease).toBeGreaterThan(0);
		});

		it('should have decreasing power curve', async () => {
			const result = await runRadiationDegradationMonteCarlo(baseConfig, 10);
			const curve = result.result.powerCurve;
			for (let i = 1; i < curve.length; i++) {
				expect(curve[i].efficiency).toBeLessThanOrEqual(curve[i - 1].efficiency);
			}
		});

		it('should calculate survival probability', async () => {
			const result = await runRadiationDegradationMonteCarlo(baseConfig, 20);
			expect(result.result.survivalProbability).toBeGreaterThanOrEqual(0);
			expect(result.result.survivalProbability).toBeLessThanOrEqual(100);
		});

		it('should have standard deviations for power curve', async () => {
			const result = await runRadiationDegradationMonteCarlo(baseConfig, 20);
			expect(result.result.powerCurveStdDev.length).toBe(baseConfig.missionDuration + 1);
			// First point should have 0 std dev (all start at same efficiency)
			expect(result.result.powerCurveStdDev[0]).toBe(0);
		});
	});

	describe('runRadiationDegradationComparison', () => {
		it('should compare multiple technologies', async () => {
			const configs = generateTechnologyComparisonConfigs({
				...baseConfig
			});
			const result = await runRadiationDegradationComparison(configs.slice(0, 2), 10);
			expect(result.configs.length).toBe(2);
			expect(result.results.length).toBe(2);
		});

		it('should identify optimal technology', async () => {
			const configs = generateTechnologyComparisonConfigs(baseConfig);
			const result = await runRadiationDegradationComparison(configs.slice(0, 3), 10);
			expect(result.optimalTechnologyIndex).toBeGreaterThanOrEqual(0);
			expect(result.optimalTechnologyIndex).toBeLessThan(3);
		});

		it('should provide analysis', async () => {
			const configs = generateTechnologyComparisonConfigs(baseConfig);
			const result = await runRadiationDegradationComparison(configs.slice(0, 2), 10);
			expect(result.analysis.bestLifetime).toBeGreaterThan(0);
			expect(result.analysis.bestEfficiency).toBeGreaterThan(0);
			expect(result.analysis.recommendation.length).toBeGreaterThan(0);
		});

		it('should report progress with technology name', async () => {
			const configs = generateTechnologyComparisonConfigs(baseConfig);
			const progressCalls: string[] = [];
			await runRadiationDegradationComparison(configs.slice(0, 2), 5, (progress) => {
				if (progress.pvTechnology) {
					progressCalls.push(progress.pvTechnology);
				}
			});
			expect(progressCalls.length).toBeGreaterThan(0);
		});
	});

	describe('degradation physics', () => {
		it('should degrade faster at closer distances', async () => {
			const nearConfig = { ...baseConfig, orbitalDistance: 0.3 };
			const farConfig = { ...baseConfig, orbitalDistance: 1.0 };

			const nearResult = await runRadiationDegradationMonteCarlo(nearConfig, 20);
			const farResult = await runRadiationDegradationMonteCarlo(farConfig, 20);

			expect(nearResult.result.endOfLifeEfficiency).toBeLessThan(
				farResult.result.endOfLifeEfficiency
			);
		});

		it('should have longer life with more shielding', async () => {
			const lowShield = { ...baseConfig, shieldingMass: 1 };
			const highShield = { ...baseConfig, shieldingMass: 20 };

			const lowResult = await runRadiationDegradationMonteCarlo(lowShield, 20);
			const highResult = await runRadiationDegradationMonteCarlo(highShield, 20);

			expect(highResult.result.halfLifeYear).toBeGreaterThan(lowResult.result.halfLifeYear);
		});

		it('should show III-V as most resistant', async () => {
			const siliconConfig = { ...baseConfig, pvTechnology: 'silicon' as const };
			const iiiVConfig = { ...baseConfig, pvTechnology: 'iii-v' as const, initialEfficiency: 35 };

			const siliconResult = await runRadiationDegradationMonteCarlo(siliconConfig, 20);
			const iiiVResult = await runRadiationDegradationMonteCarlo(iiiVConfig, 20);

			// III-V should retain more of its initial efficiency percentage-wise
			const siliconRetention = siliconResult.result.endOfLifeEfficiency / siliconConfig.initialEfficiency;
			const iiiVRetention = iiiVResult.result.endOfLifeEfficiency / iiiVConfig.initialEfficiency;

			expect(iiiVRetention).toBeGreaterThan(siliconRetention);
		});

		it('should show more degradation with higher SPE rates', async () => {
			const lowSPE = { ...baseConfig, solarProtonEventRate: 2 };
			const highSPE = { ...baseConfig, solarProtonEventRate: 20 };

			const lowResult = await runRadiationDegradationMonteCarlo(lowSPE, 20);
			const highResult = await runRadiationDegradationMonteCarlo(highSPE, 20);

			expect(highResult.result.endOfLifeEfficiency).toBeLessThan(
				lowResult.result.endOfLifeEfficiency
			);
		});
	});

	describe('generateTechnologyComparisonConfigs', () => {
		it('should generate configs for all 5 technologies', () => {
			const configs = generateTechnologyComparisonConfigs(baseConfig);
			expect(configs.length).toBe(5);
		});

		it('should set appropriate initial efficiency for each tech', () => {
			const configs = generateTechnologyComparisonConfigs(baseConfig);
			const iiiVConfig = configs.find((c) => c.pvTechnology === 'iii-v');
			expect(iiiVConfig?.initialEfficiency).toBe(35); // Max efficiency for III-V
		});

		it('should preserve base config parameters', () => {
			const configs = generateTechnologyComparisonConfigs({
				...baseConfig,
				orbitalDistance: 0.4
			});
			for (const config of configs) {
				expect(config.orbitalDistance).toBe(0.4);
				expect(config.missionDuration).toBe(baseConfig.missionDuration);
			}
		});
	});

	describe('generateOrbitalDistanceComparisonConfigs', () => {
		it('should generate configs for 8 distances', () => {
			const configs = generateOrbitalDistanceComparisonConfigs(baseConfig);
			expect(configs.length).toBe(8);
		});

		it('should cover range from 0.3 to 1.0 AU', () => {
			const configs = generateOrbitalDistanceComparisonConfigs(baseConfig);
			const distances = configs.map((c) => c.orbitalDistance);
			expect(Math.min(...distances)).toBe(0.3);
			expect(Math.max(...distances)).toBe(1.0);
		});

		it('should preserve other config parameters', () => {
			const configs = generateOrbitalDistanceComparisonConfigs({
				...baseConfig,
				pvTechnology: 'iii-v'
			});
			for (const config of configs) {
				expect(config.pvTechnology).toBe('iii-v');
			}
		});
	});

	describe('DEFAULT_RADIATION_CONFIG', () => {
		it('should provide sensible defaults', () => {
			expect(DEFAULT_RADIATION_CONFIG.orbitalDistance).toBeGreaterThanOrEqual(0.3);
			expect(DEFAULT_RADIATION_CONFIG.orbitalDistance).toBeLessThanOrEqual(1.0);
			expect(DEFAULT_RADIATION_CONFIG.missionDuration).toBeGreaterThan(0);
			expect(DEFAULT_RADIATION_CONFIG.initialEfficiency).toBeGreaterThan(0);
		});

		it('should have valid PV technology', () => {
			const validTechs = ['perovskite', 'cdte', 'iii-v', 'silicon', 'hybrid'];
			expect(validTechs).toContain(DEFAULT_RADIATION_CONFIG.pvTechnology);
		});

		it('should have reasonable SPE rate', () => {
			expect(DEFAULT_RADIATION_CONFIG.solarProtonEventRate).toBeGreaterThan(0);
			expect(DEFAULT_RADIATION_CONFIG.solarProtonEventRate).toBeLessThan(50);
		});

		it('should have reasonable iteration count', () => {
			expect(DEFAULT_RADIATION_CONFIG.iterations).toBeGreaterThanOrEqual(10);
		});
	});
});
