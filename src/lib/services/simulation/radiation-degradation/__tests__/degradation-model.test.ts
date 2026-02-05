import { describe, it, expect } from 'vitest';
import {
	solarFluxAtDistance,
	radiationIntensityFactor,
	shieldingFactor,
	calculateAnnualDegradation,
	simulateDegradationCurve,
	findHalfLifeYear,
	TECHNOLOGY_COEFFICIENTS
} from '../degradation-model';
import { SeededRandom } from '$lib/services/simulation-core';
import type { RadiationDegradationConfig } from '../types';

describe('Degradation Model', () => {
	describe('solarFluxAtDistance', () => {
		it('should return 1361 W/m^2 at 1 AU', () => {
			expect(solarFluxAtDistance(1.0)).toBeCloseTo(1361, 0);
		});

		it('should increase with inverse square at closer distances', () => {
			const flux05 = solarFluxAtDistance(0.5);
			expect(flux05).toBeCloseTo(1361 * 4, 0); // 1/0.5^2 = 4
		});

		it('should decrease at farther distances', () => {
			const flux2 = solarFluxAtDistance(2.0);
			expect(flux2).toBeCloseTo(1361 / 4, 0); // 1/2^2 = 0.25
		});

		it('should be very high at Mercury orbit (0.39 AU)', () => {
			const flux = solarFluxAtDistance(0.39);
			expect(flux).toBeGreaterThan(8000); // ~9000 W/m^2
		});
	});

	describe('radiationIntensityFactor', () => {
		it('should be 1 at 1 AU', () => {
			expect(radiationIntensityFactor(1.0)).toBeCloseTo(1, 2);
		});

		it('should increase faster than inverse square at closer distances', () => {
			const factor = radiationIntensityFactor(0.5);
			expect(factor).toBeGreaterThan(4); // Should be ~4.9 for r^-2.3
		});

		it('should be very high at 0.3 AU', () => {
			const factor = radiationIntensityFactor(0.3);
			expect(factor).toBeGreaterThan(10); // Much higher than inverse square
		});

		it('should decrease at farther distances', () => {
			const factor = radiationIntensityFactor(1.5);
			expect(factor).toBeLessThan(1);
		});
	});

	describe('shieldingFactor', () => {
		it('should be 1 with no shielding', () => {
			expect(shieldingFactor(0)).toBeCloseTo(1, 2);
		});

		it('should reduce by ~50% per 10 g/m^2', () => {
			expect(shieldingFactor(10)).toBeCloseTo(0.5, 1);
			expect(shieldingFactor(20)).toBeCloseTo(0.25, 1);
		});

		it('should approach zero with heavy shielding', () => {
			expect(shieldingFactor(50)).toBeLessThan(0.1);
		});

		it('should be monotonically decreasing', () => {
			const f5 = shieldingFactor(5);
			const f10 = shieldingFactor(10);
			const f15 = shieldingFactor(15);
			expect(f5).toBeGreaterThan(f10);
			expect(f10).toBeGreaterThan(f15);
		});
	});

	describe('TECHNOLOGY_COEFFICIENTS', () => {
		it('should have all technologies defined', () => {
			expect(TECHNOLOGY_COEFFICIENTS).toHaveProperty('perovskite');
			expect(TECHNOLOGY_COEFFICIENTS).toHaveProperty('cdte');
			expect(TECHNOLOGY_COEFFICIENTS).toHaveProperty('iii-v');
			expect(TECHNOLOGY_COEFFICIENTS).toHaveProperty('silicon');
			expect(TECHNOLOGY_COEFFICIENTS).toHaveProperty('hybrid');
		});

		it('should have III-V as most radiation resistant', () => {
			expect(TECHNOLOGY_COEFFICIENTS['iii-v'].radiationSensitivity).toBeLessThan(
				TECHNOLOGY_COEFFICIENTS['silicon'].radiationSensitivity
			);
		});

		it('should have perovskite with highest annealing rate', () => {
			expect(TECHNOLOGY_COEFFICIENTS['perovskite'].annealingRate).toBeGreaterThan(
				TECHNOLOGY_COEFFICIENTS['silicon'].annealingRate
			);
		});

		it('should have positive base rates for all technologies', () => {
			for (const tech of Object.values(TECHNOLOGY_COEFFICIENTS)) {
				expect(tech.baseRate).toBeGreaterThan(0);
			}
		});

		it('should have III-V with highest max efficiency', () => {
			const maxEfficiencies = Object.values(TECHNOLOGY_COEFFICIENTS).map((t) => t.maxEfficiency);
			expect(TECHNOLOGY_COEFFICIENTS['iii-v'].maxEfficiency).toBe(Math.max(...maxEfficiencies));
		});
	});

	describe('calculateAnnualDegradation', () => {
		const baseConfig: RadiationDegradationConfig = {
			orbitalDistance: 0.5,
			pvTechnology: 'cdte',
			shieldingMass: 5,
			missionDuration: 15,
			initialEfficiency: 22,
			solarProtonEventRate: 10,
			temperatureCycling: true,
			iterations: 100
		};

		it('should return positive degradation', () => {
			const rng = new SeededRandom(12345);
			const degradation = calculateAnnualDegradation(baseConfig, 1, 22, rng);
			expect(degradation).toBeGreaterThan(0);
		});

		it('should increase degradation at closer distances', () => {
			const rng1 = new SeededRandom(12345);
			const rng2 = new SeededRandom(12345);

			const nearConfig = { ...baseConfig, orbitalDistance: 0.3 };
			const farConfig = { ...baseConfig, orbitalDistance: 1.0 };

			const nearDegradation = calculateAnnualDegradation(nearConfig, 1, 22, rng1);
			const farDegradation = calculateAnnualDegradation(farConfig, 1, 22, rng2);

			expect(nearDegradation).toBeGreaterThan(farDegradation);
		});

		it('should reduce degradation with more shielding', () => {
			const rng1 = new SeededRandom(12345);
			const rng2 = new SeededRandom(12345);

			const lowShield = { ...baseConfig, shieldingMass: 1 };
			const highShield = { ...baseConfig, shieldingMass: 20 };

			const lowDegradation = calculateAnnualDegradation(lowShield, 1, 22, rng1);
			const highDegradation = calculateAnnualDegradation(highShield, 1, 22, rng2);

			expect(lowDegradation).toBeGreaterThan(highDegradation);
		});
	});

	describe('simulateDegradationCurve', () => {
		const baseConfig: RadiationDegradationConfig = {
			orbitalDistance: 0.5,
			pvTechnology: 'cdte',
			shieldingMass: 5,
			missionDuration: 15,
			initialEfficiency: 22,
			solarProtonEventRate: 10,
			temperatureCycling: true,
			iterations: 100
		};

		it('should return curve with correct length', () => {
			const rng = new SeededRandom(12345);
			const curve = simulateDegradationCurve(baseConfig, rng);
			expect(curve.length).toBe(baseConfig.missionDuration + 1);
		});

		it('should start at initial efficiency', () => {
			const rng = new SeededRandom(12345);
			const curve = simulateDegradationCurve(baseConfig, rng);
			expect(curve[0].efficiency).toBe(baseConfig.initialEfficiency);
		});

		it('should have decreasing efficiency over time', () => {
			const rng = new SeededRandom(12345);
			const curve = simulateDegradationCurve(baseConfig, rng);
			for (let i = 1; i < curve.length; i++) {
				expect(curve[i].efficiency).toBeLessThanOrEqual(curve[i - 1].efficiency);
			}
		});

		it('should have years in sequence', () => {
			const rng = new SeededRandom(12345);
			const curve = simulateDegradationCurve(baseConfig, rng);
			for (let i = 0; i < curve.length; i++) {
				expect(curve[i].year).toBe(i);
			}
		});

		it('should calculate power correctly', () => {
			const rng = new SeededRandom(12345);
			const curve = simulateDegradationCurve(baseConfig, rng);
			// At 0.5 AU, flux is ~5444 W/m^2
			const expectedFlux = 1361 / (0.5 * 0.5);
			const expectedPower = expectedFlux * (22 / 100);
			expect(curve[0].power).toBeCloseTo(expectedPower, -1);
		});
	});

	describe('findHalfLifeYear', () => {
		it('should return 0 if already at half efficiency', () => {
			const curve = [
				{ year: 0, efficiency: 10, power: 100 },
				{ year: 1, efficiency: 5, power: 50 }
			];
			expect(findHalfLifeYear(curve, 20)).toBe(0);
		});

		it('should interpolate between years', () => {
			const curve = [
				{ year: 0, efficiency: 20, power: 200 },
				{ year: 1, efficiency: 15, power: 150 },
				{ year: 2, efficiency: 8, power: 80 }
			];
			const halfLife = findHalfLifeYear(curve, 20);
			expect(halfLife).toBeGreaterThan(1);
			expect(halfLife).toBeLessThan(2);
		});

		it('should return mission duration if never reaches half', () => {
			const curve = [
				{ year: 0, efficiency: 20, power: 200 },
				{ year: 1, efficiency: 19, power: 190 },
				{ year: 2, efficiency: 18, power: 180 }
			];
			const halfLife = findHalfLifeYear(curve, 20);
			expect(halfLife).toBe(2); // Last year
		});
	});
});
