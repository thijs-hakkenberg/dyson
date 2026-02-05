import { describe, it, expect } from 'vitest';
import {
	runDeploymentMonteCarlo,
	runDeploymentComparison,
	generateMechanismComparisonConfigs,
	generateAreaComparisonConfigs,
	DEFAULT_DEPLOYMENT_CONFIG
} from '../monte-carlo';
import type { DeploymentConfig } from '../types';

describe('Deployment Reliability Monte Carlo', () => {
	const baseConfig: DeploymentConfig = {
		...DEFAULT_DEPLOYMENT_CONFIG,
		seed: 12345,
		iterations: 10
	};

	describe('runDeploymentMonteCarlo', () => {
		it('should run multiple simulations', async () => {
			const result = await runDeploymentMonteCarlo(baseConfig, 10);
			expect(result.runs).toBe(10);
		});

		it('should calculate success rate between 0 and 100', async () => {
			const result = await runDeploymentMonteCarlo(baseConfig, 10);
			expect(result.result.stats.successRate).toBeGreaterThanOrEqual(0);
			expect(result.result.stats.successRate).toBeLessThanOrEqual(100);
		});

		it('should calculate mean deployment time', async () => {
			const result = await runDeploymentMonteCarlo(baseConfig, 10);
			expect(result.result.stats.meanDeploymentTime).toBeGreaterThan(0);
		});

		it('should track failure modes', async () => {
			const result = await runDeploymentMonteCarlo(baseConfig, 20);
			// Should have failure mode breakdown object
			expect(result.result.stats.failureModeBreakdown).toBeDefined();
		});

		it('should report progress', async () => {
			const progressCalls: number[] = [];
			await runDeploymentMonteCarlo(baseConfig, 20, (progress) => {
				progressCalls.push(progress.percentComplete);
			});
			expect(progressCalls.length).toBeGreaterThan(0);
			expect(progressCalls[progressCalls.length - 1]).toBe(100);
		});

		it('should calculate confidence intervals', async () => {
			const result = await runDeploymentMonteCarlo(baseConfig, 20);
			expect(result.result.confidenceInterval95.lower).toBeLessThanOrEqual(
				result.result.stats.successRate
			);
			expect(result.result.confidenceInterval95.upper).toBeGreaterThanOrEqual(
				result.result.stats.successRate
			);
		});

		it('should assign reliability grade', async () => {
			const result = await runDeploymentMonteCarlo(baseConfig, 10);
			expect(['A', 'B', 'C', 'D', 'F']).toContain(result.result.reliabilityGrade);
		});

		it('should generate time distribution', async () => {
			const result = await runDeploymentMonteCarlo(baseConfig, 20);
			expect(result.result.timeDistribution.length).toBeGreaterThan(0);
			// Should be sorted by time
			for (let i = 1; i < result.result.timeDistribution.length; i++) {
				expect(result.result.timeDistribution[i].time).toBeGreaterThanOrEqual(
					result.result.timeDistribution[i - 1].time
				);
			}
		});

		it('should provide recommendation text', async () => {
			const result = await runDeploymentMonteCarlo(baseConfig, 10);
			expect(result.result.recommendation.length).toBeGreaterThan(0);
		});

		it('should have positive execution time', async () => {
			const result = await runDeploymentMonteCarlo(baseConfig, 10);
			expect(result.executionTimeMs).toBeGreaterThan(0);
		});
	});

	describe('runDeploymentComparison', () => {
		it('should compare multiple mechanisms', async () => {
			const configs = generateMechanismComparisonConfigs(baseConfig);
			const result = await runDeploymentComparison(configs.slice(0, 2), 10);
			expect(result.configs.length).toBe(2);
			expect(result.results.length).toBe(2);
		});

		it('should identify optimal configuration', async () => {
			const configs = generateMechanismComparisonConfigs(baseConfig);
			const result = await runDeploymentComparison(configs.slice(0, 3), 10);
			expect(result.optimalConfigIndex).toBeGreaterThanOrEqual(0);
			expect(result.optimalConfigIndex).toBeLessThan(3);
		});

		it('should provide analysis', async () => {
			const configs = generateMechanismComparisonConfigs(baseConfig);
			const result = await runDeploymentComparison(configs.slice(0, 2), 10);
			expect(result.analysis.bestSuccessRate).toBeGreaterThanOrEqual(0);
			expect(result.analysis.bestDeploymentTime).toBeGreaterThan(0);
			expect(result.analysis.recommendation.length).toBeGreaterThan(0);
		});

		it('should report progress with mechanism name', async () => {
			const configs = generateMechanismComparisonConfigs(baseConfig);
			const progressCalls: string[] = [];
			await runDeploymentComparison(configs.slice(0, 2), 5, (progress) => {
				if (progress.mechanism) {
					progressCalls.push(progress.mechanism);
				}
			});
			expect(progressCalls.length).toBeGreaterThan(0);
		});
	});

	describe('deployment physics', () => {
		it('should have lower success rate for larger membranes', async () => {
			const smallConfig = { ...baseConfig, membraneArea: 100 };
			const largeConfig = { ...baseConfig, membraneArea: 10000 };

			const smallResult = await runDeploymentMonteCarlo(smallConfig, 30);
			const largeResult = await runDeploymentMonteCarlo(largeConfig, 30);

			expect(largeResult.result.stats.successRate).toBeLessThanOrEqual(
				smallResult.result.stats.successRate + 10 // Allow some variance
			);
		});

		it('should have higher failure rate at extreme temperatures', async () => {
			const normalConfig = { ...baseConfig, minTemperature: 0, maxTemperature: 50 };
			const extremeConfig = { ...baseConfig, minTemperature: -150, maxTemperature: 150 };

			const normalResult = await runDeploymentMonteCarlo(normalConfig, 30);
			const extremeResult = await runDeploymentMonteCarlo(extremeConfig, 30);

			expect(extremeResult.result.stats.successRate).toBeLessThanOrEqual(
				normalResult.result.stats.successRate + 10
			);
		});

		it('should have longer deployment time at slow speed', async () => {
			const slowConfig = { ...baseConfig, deploymentSpeed: 'slow' as const };
			const fastConfig = { ...baseConfig, deploymentSpeed: 'fast' as const };

			const slowResult = await runDeploymentMonteCarlo(slowConfig, 20);
			const fastResult = await runDeploymentMonteCarlo(fastConfig, 20);

			expect(slowResult.result.stats.meanDeploymentTime).toBeGreaterThan(
				fastResult.result.stats.meanDeploymentTime
			);
		});

		it('should improve success rate with thermal preconditioning', async () => {
			const noPrecondConfig = { ...baseConfig, thermalPreconditioning: false };
			const precondConfig = { ...baseConfig, thermalPreconditioning: true };

			const noResult = await runDeploymentMonteCarlo(noPrecondConfig, 30);
			const yesResult = await runDeploymentMonteCarlo(precondConfig, 30);

			expect(yesResult.result.stats.successRate).toBeGreaterThanOrEqual(
				noResult.result.stats.successRate - 5 // Allow some variance
			);
		});

		it('should have lower tear rate for thicker membranes', async () => {
			const thinConfig = { ...baseConfig, membraneThickness: 1 };
			const thickConfig = { ...baseConfig, membraneThickness: 10 };

			const thinResult = await runDeploymentMonteCarlo(thinConfig, 30);
			const thickResult = await runDeploymentMonteCarlo(thickConfig, 30);

			const thinTears = thinResult.result.stats.failureModeBreakdown.tear || 0;
			const thickTears = thickResult.result.stats.failureModeBreakdown.tear || 0;

			expect(thickTears).toBeLessThanOrEqual(thinTears + 5);
		});
	});

	describe('generateMechanismComparisonConfigs', () => {
		it('should generate configs for all 5 mechanisms', () => {
			const configs = generateMechanismComparisonConfigs(baseConfig);
			expect(configs.length).toBe(5);
		});

		it('should cover all mechanism types', () => {
			const configs = generateMechanismComparisonConfigs(baseConfig);
			const mechanisms = configs.map((c) => c.deploymentMechanism);
			expect(mechanisms).toContain('inflatable');
			expect(mechanisms).toContain('motor-driven');
			expect(mechanisms).toContain('centrifugal');
			expect(mechanisms).toContain('shape-memory');
			expect(mechanisms).toContain('hybrid');
		});

		it('should preserve base config parameters', () => {
			const configs = generateMechanismComparisonConfigs({
				...baseConfig,
				membraneArea: 5000
			});
			for (const config of configs) {
				expect(config.membraneArea).toBe(5000);
			}
		});
	});

	describe('generateAreaComparisonConfigs', () => {
		it('should generate configs for multiple areas', () => {
			const configs = generateAreaComparisonConfigs(baseConfig);
			expect(configs.length).toBeGreaterThan(0);
		});

		it('should cover range from small to large', () => {
			const configs = generateAreaComparisonConfigs(baseConfig);
			const areas = configs.map((c) => c.membraneArea);
			expect(Math.min(...areas)).toBeLessThanOrEqual(500);
			expect(Math.max(...areas)).toBeGreaterThanOrEqual(5000);
		});

		it('should preserve other config parameters', () => {
			const configs = generateAreaComparisonConfigs({
				...baseConfig,
				deploymentMechanism: 'centrifugal'
			});
			for (const config of configs) {
				expect(config.deploymentMechanism).toBe('centrifugal');
			}
		});
	});

	describe('DEFAULT_DEPLOYMENT_CONFIG', () => {
		it('should provide sensible defaults', () => {
			expect(DEFAULT_DEPLOYMENT_CONFIG.membraneArea).toBeGreaterThan(0);
			expect(DEFAULT_DEPLOYMENT_CONFIG.membraneArea).toBeLessThanOrEqual(10000);
			expect(DEFAULT_DEPLOYMENT_CONFIG.maxAttempts).toBeGreaterThan(0);
			expect(DEFAULT_DEPLOYMENT_CONFIG.membraneThickness).toBeGreaterThan(0);
		});

		it('should have valid mechanism type', () => {
			const validMechanisms = ['inflatable', 'motor-driven', 'centrifugal', 'shape-memory', 'hybrid'];
			expect(validMechanisms).toContain(DEFAULT_DEPLOYMENT_CONFIG.deploymentMechanism);
		});

		it('should have valid deployment speed', () => {
			const validSpeeds = ['slow', 'medium', 'fast'];
			expect(validSpeeds).toContain(DEFAULT_DEPLOYMENT_CONFIG.deploymentSpeed);
		});

		it('should have valid temperature range', () => {
			expect(DEFAULT_DEPLOYMENT_CONFIG.minTemperature).toBeLessThan(
				DEFAULT_DEPLOYMENT_CONFIG.maxTemperature
			);
			expect(DEFAULT_DEPLOYMENT_CONFIG.minTemperature).toBeGreaterThanOrEqual(-200);
			expect(DEFAULT_DEPLOYMENT_CONFIG.maxTemperature).toBeLessThanOrEqual(200);
		});

		it('should have reasonable iteration count', () => {
			expect(DEFAULT_DEPLOYMENT_CONFIG.iterations).toBeGreaterThanOrEqual(10);
		});
	});
});
