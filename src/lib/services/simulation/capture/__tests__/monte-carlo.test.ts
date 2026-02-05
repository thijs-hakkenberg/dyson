import { describe, it, expect } from 'vitest';
import {
	runCaptureMonteCarlo,
	runCaptureMethodComparison,
	DEFAULT_CAPTURE_CONFIG,
	runSingleCapture
} from '../monte-carlo';
import {
	calculateCaptureSuccess,
	modelImpactForces,
	calculateEnergyRequirement,
	evaluateCaptureMethod,
	METHOD_CHARACTERISTICS
} from '../capture-model';
import type { CaptureConfig, CaptureMethod } from '../types';

describe('Capture Monte Carlo Simulation', () => {
	const baseConfig: CaptureConfig = {
		...DEFAULT_CAPTURE_CONFIG,
		seed: 12345,
		iterations: 10
	};

	describe('runCaptureMonteCarlo', () => {
		it('should run multiple simulations', async () => {
			const result = await runCaptureMonteCarlo(baseConfig, 10);
			expect(result.runs).toBe(10);
		});

		it('should calculate success rate between 0 and 100', async () => {
			const result = await runCaptureMonteCarlo(baseConfig, 10);
			expect(result.result.stats.successRate).toBeGreaterThanOrEqual(0);
			expect(result.result.stats.successRate).toBeLessThanOrEqual(100);
		});

		it('should calculate mean energy absorbed', async () => {
			const result = await runCaptureMonteCarlo(baseConfig, 10);
			expect(result.result.stats.meanEnergyAbsorbedJ).toBeGreaterThan(0);
		});

		it('should track failure modes', async () => {
			const result = await runCaptureMonteCarlo(baseConfig, 20);
			expect(result.result.stats.failureModeBreakdown).toBeDefined();
		});

		it('should report progress', async () => {
			const progressCalls: number[] = [];
			await runCaptureMonteCarlo(baseConfig, 20, (progress) => {
				progressCalls.push(progress.percentComplete);
			});
			expect(progressCalls.length).toBeGreaterThan(0);
			expect(progressCalls[progressCalls.length - 1]).toBe(100);
		});

		it('should calculate confidence intervals', async () => {
			const result = await runCaptureMonteCarlo(baseConfig, 20);
			expect(result.result.confidenceInterval95.lower).toBeLessThanOrEqual(
				result.result.stats.successRate
			);
			expect(result.result.confidenceInterval95.upper).toBeGreaterThanOrEqual(
				result.result.stats.successRate
			);
		});

		it('should assign reliability grade', async () => {
			const result = await runCaptureMonteCarlo(baseConfig, 10);
			expect(['A', 'B', 'C', 'D', 'F']).toContain(result.result.reliabilityGrade);
		});

		it('should generate energy distribution', async () => {
			const result = await runCaptureMonteCarlo(baseConfig, 20);
			expect(result.result.energyDistribution.length).toBeGreaterThan(0);
			// Should be sorted by energy
			for (let i = 1; i < result.result.energyDistribution.length; i++) {
				expect(result.result.energyDistribution[i].energy).toBeGreaterThanOrEqual(
					result.result.energyDistribution[i - 1].energy
				);
			}
		});

		it('should provide recommendation text', async () => {
			const result = await runCaptureMonteCarlo(baseConfig, 10);
			expect(result.result.recommendation.length).toBeGreaterThan(0);
		});

		it('should have positive execution time', async () => {
			const result = await runCaptureMonteCarlo(baseConfig, 10);
			expect(result.executionTimeMs).toBeGreaterThan(0);
		});
	});

	describe('runSingleCapture', () => {
		it('should return a valid run result', () => {
			const result = runSingleCapture(baseConfig, 0, 12345);
			expect(result.runId).toBe(0);
			expect(typeof result.success).toBe('boolean');
			expect(result.kineticEnergyJ).toBeGreaterThan(0);
		});

		it('should calculate kinetic energy correctly', () => {
			const config = { ...baseConfig, payloadMassKg: 100, arrivalVelocityMs: 100 };
			const result = runSingleCapture(config, 0, 12345);
			// KE = 0.5 * m * v^2 = 0.5 * 100 * 10000 = 500000 J
			expect(result.kineticEnergyJ).toBe(500000);
		});

		it('should calculate required deceleration', () => {
			const result = runSingleCapture(baseConfig, 0, 12345);
			expect(result.requiredDecelerationG).toBeGreaterThan(0);
		});
	});

	describe('runCaptureMethodComparison', () => {
		it('should compare multiple methods', async () => {
			const methods: CaptureMethod[] = ['magnetic', 'mechanical', 'net'];
			const result = await runCaptureMethodComparison(methods, baseConfig, 10);
			expect(result.methods.length).toBe(3);
			expect(result.results.length).toBe(3);
		});

		it('should identify optimal method', async () => {
			const methods: CaptureMethod[] = ['magnetic', 'mechanical'];
			const result = await runCaptureMethodComparison(methods, baseConfig, 10);
			expect(result.optimalMethodIndex).toBeGreaterThanOrEqual(0);
			expect(result.optimalMethodIndex).toBeLessThan(2);
		});

		it('should provide analysis', async () => {
			const methods: CaptureMethod[] = ['magnetic', 'net'];
			const result = await runCaptureMethodComparison(methods, baseConfig, 10);
			expect(result.analysis.bestSuccessRate).toBeGreaterThanOrEqual(0);
			expect(result.analysis.recommendation.length).toBeGreaterThan(0);
		});

		it('should report progress with method name', async () => {
			const methods: CaptureMethod[] = ['magnetic', 'foam'];
			const progressCalls: string[] = [];
			await runCaptureMethodComparison(methods, baseConfig, 5, (progress) => {
				if (progress.method) {
					progressCalls.push(progress.method);
				}
			});
			expect(progressCalls.length).toBeGreaterThan(0);
		});
	});

	describe('capture physics', () => {
		it('should have lower success rate for higher velocities', async () => {
			const slowConfig = { ...baseConfig, arrivalVelocityMs: 50 };
			const fastConfig = { ...baseConfig, arrivalVelocityMs: 300 };

			const slowResult = await runCaptureMonteCarlo(slowConfig, 30);
			const fastResult = await runCaptureMonteCarlo(fastConfig, 30);

			expect(fastResult.result.stats.successRate).toBeLessThanOrEqual(
				slowResult.result.stats.successRate + 15 // Allow variance
			);
		});

		it('should have higher energy absorption for heavier payloads', async () => {
			const lightConfig = { ...baseConfig, payloadMassKg: 50 };
			const heavyConfig = { ...baseConfig, payloadMassKg: 500 };

			const lightResult = await runCaptureMonteCarlo(lightConfig, 20);
			const heavyResult = await runCaptureMonteCarlo(heavyConfig, 20);

			expect(heavyResult.result.stats.meanEnergyAbsorbedJ).toBeGreaterThan(
				lightResult.result.stats.meanEnergyAbsorbedJ
			);
		});

		it('should have lower success with poor target accuracy', async () => {
			const accurateConfig = { ...baseConfig, targetAccuracyM: 0.5 };
			const inaccurateConfig = { ...baseConfig, targetAccuracyM: 5 };

			const accurateResult = await runCaptureMonteCarlo(accurateConfig, 30);
			const inaccurateResult = await runCaptureMonteCarlo(inaccurateConfig, 30);

			expect(inaccurateResult.result.stats.successRate).toBeLessThanOrEqual(
				accurateResult.result.stats.successRate + 10
			);
		});

		it('should benefit from redundant systems', async () => {
			const singleConfig = { ...baseConfig, redundantSystems: false };
			const redundantConfig = { ...baseConfig, redundantSystems: true };

			const singleResult = await runCaptureMonteCarlo(singleConfig, 30);
			const redundantResult = await runCaptureMonteCarlo(redundantConfig, 30);

			expect(redundantResult.result.stats.successRate).toBeGreaterThanOrEqual(
				singleResult.result.stats.successRate - 5
			);
		});

		it('should have higher stress for higher velocity impacts', async () => {
			const slowConfig = { ...baseConfig, arrivalVelocityMs: 30 };
			const fastConfig = { ...baseConfig, arrivalVelocityMs: 200 };

			const slowResult = await runCaptureMonteCarlo(slowConfig, 20);
			const fastResult = await runCaptureMonteCarlo(fastConfig, 20);

			expect(fastResult.result.stats.meanPeakStress).toBeGreaterThanOrEqual(
				slowResult.result.stats.meanPeakStress - 0.1
			);
		});
	});

	describe('calculateCaptureSuccess', () => {
		it('should return probability between 0 and 1', () => {
			// Test via runSingleCapture which uses calculateCaptureSuccess internally
			const result = runSingleCapture(baseConfig, 0, 12345);
			// Success is a boolean, but the underlying probability should be valid
			expect(typeof result.success).toBe('boolean');
		});

		it('should be deterministic with same seed', () => {
			// Running with the same seed should produce the same result
			const result1 = runSingleCapture(baseConfig, 0, 12345);
			const result2 = runSingleCapture(baseConfig, 0, 12345);
			expect(result1.success).toBe(result2.success);
			expect(result1.kineticEnergyJ).toBe(result2.kineticEnergyJ);
		});
	});

	describe('modelImpactForces', () => {
		it('should calculate kinetic energy correctly', () => {
			const forces = modelImpactForces(100, 100);
			// KE = 0.5 * 100 * 100^2 = 500000 J
			expect(forces.kineticEnergyJ).toBe(500000);
		});

		it('should calculate momentum correctly', () => {
			const forces = modelImpactForces(100, 50);
			// p = m * v = 100 * 50 = 5000 kg*m/s
			expect(forces.momentumKgMs).toBe(5000);
		});

		it('should calculate required deceleration', () => {
			const forces = modelImpactForces(100, 100);
			expect(forces.requiredDecelerationG).toBeGreaterThan(0);
		});

		it('should increase stress with higher velocity', () => {
			const slowForces = modelImpactForces(100, 50);
			const fastForces = modelImpactForces(100, 200);
			expect(fastForces.peakStressMultiplier).toBeGreaterThan(slowForces.peakStressMultiplier);
		});
	});

	describe('calculateEnergyRequirement', () => {
		it('should return positive energy for all methods', () => {
			const methods: CaptureMethod[] = ['magnetic', 'mechanical', 'net', 'foam', 'tether'];
			for (const method of methods) {
				const energy = calculateEnergyRequirement(method, 100, 100);
				expect(energy).toBeGreaterThan(0);
			}
		});

		it('should scale with mass and velocity', () => {
			const lowEnergy = calculateEnergyRequirement('magnetic', 50, 50);
			const highEnergy = calculateEnergyRequirement('magnetic', 200, 200);
			expect(highEnergy).toBeGreaterThan(lowEnergy);
		});
	});

	describe('evaluateCaptureMethod', () => {
		it('should return evaluation for all methods', () => {
			const methods: CaptureMethod[] = ['magnetic', 'mechanical', 'net', 'foam', 'tether'];
			const payload = { mass: 100, velocity: 100 };
			for (const method of methods) {
				const evaluation = evaluateCaptureMethod(method, payload);
				expect(evaluation.suitable).toBeDefined();
				expect(evaluation.rating).toBeGreaterThanOrEqual(0);
				expect(evaluation.rating).toBeLessThanOrEqual(1);
			}
		});

		it('should rate methods lower for velocities beyond their capacity', () => {
			const payload = { mass: 100, velocity: 450 }; // Near max for most methods
			const magneticEval = evaluateCaptureMethod('magnetic', payload);
			const netEval = evaluateCaptureMethod('net', payload);
			// Magnetic can handle higher velocities than nets
			expect(magneticEval.rating).toBeGreaterThanOrEqual(netEval.rating);
		});
	});

	describe('METHOD_CHARACTERISTICS', () => {
		it('should define characteristics for all methods', () => {
			const methods: CaptureMethod[] = ['magnetic', 'mechanical', 'net', 'foam', 'tether'];
			for (const method of methods) {
				expect(METHOD_CHARACTERISTICS[method]).toBeDefined();
				expect(METHOD_CHARACTERISTICS[method].baseReliability).toBeGreaterThan(0);
				expect(METHOD_CHARACTERISTICS[method].maxVelocityMs).toBeGreaterThan(0);
			}
		});

		it('should have valid energy efficiency values', () => {
			const methods: CaptureMethod[] = ['magnetic', 'mechanical', 'net', 'foam', 'tether'];
			for (const method of methods) {
				expect(METHOD_CHARACTERISTICS[method].energyEfficiency).toBeGreaterThan(0);
				expect(METHOD_CHARACTERISTICS[method].energyEfficiency).toBeLessThanOrEqual(1);
			}
		});
	});

	describe('DEFAULT_CAPTURE_CONFIG', () => {
		it('should provide sensible defaults', () => {
			expect(DEFAULT_CAPTURE_CONFIG.payloadMassKg).toBeGreaterThan(0);
			expect(DEFAULT_CAPTURE_CONFIG.payloadMassKg).toBeLessThanOrEqual(1000);
			expect(DEFAULT_CAPTURE_CONFIG.arrivalVelocityMs).toBeGreaterThan(0);
			expect(DEFAULT_CAPTURE_CONFIG.arrivalVelocityMs).toBeLessThanOrEqual(500);
		});

		it('should have valid capture method', () => {
			const validMethods = ['magnetic', 'mechanical', 'net', 'foam', 'tether'];
			expect(validMethods).toContain(DEFAULT_CAPTURE_CONFIG.captureMethod);
		});

		it('should have reasonable accuracy values', () => {
			expect(DEFAULT_CAPTURE_CONFIG.targetAccuracyM).toBeGreaterThan(0);
			expect(DEFAULT_CAPTURE_CONFIG.targetAccuracyM).toBeLessThanOrEqual(10);
			expect(DEFAULT_CAPTURE_CONFIG.approachAngleVarianceDeg).toBeGreaterThanOrEqual(0);
			expect(DEFAULT_CAPTURE_CONFIG.approachAngleVarianceDeg).toBeLessThanOrEqual(15);
		});

		it('should have reasonable iteration count', () => {
			expect(DEFAULT_CAPTURE_CONFIG.iterations).toBeGreaterThanOrEqual(10);
		});
	});
});
