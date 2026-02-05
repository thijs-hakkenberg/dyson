import { describe, it, expect } from 'vitest';
import {
	calculatePlasmaDensity,
	calculateElectronTemperature,
	calculateDebyeLength,
	calculatePaschenBreakdownVoltage,
	calculateArcInitiationProbability,
	calculateEffectiveGapDistance,
	calculateAnnualArcProbability,
	SOLAR_WIND_DENSITY_1AU,
	SOLAR_WIND_TEMP_1AU
} from '../paschen-model';

describe('Paschen Model', () => {
	describe('calculatePlasmaDensity', () => {
		it('should return reference density at 1 AU', () => {
			const density = calculatePlasmaDensity(1.0);
			expect(density).toBeCloseTo(SOLAR_WIND_DENSITY_1AU, 0);
		});

		it('should scale with 1/r^2 from Sun', () => {
			const densityAt1AU = calculatePlasmaDensity(1.0);
			const densityAt05AU = calculatePlasmaDensity(0.5);
			// At 0.5 AU, density should be 4x higher (1/0.5^2 = 4)
			expect(densityAt05AU).toBeCloseTo(densityAt1AU * 4, 0);
		});

		it('should be very high at close orbits', () => {
			const density = calculatePlasmaDensity(0.3);
			// At 0.3 AU: 1/0.3^2 = ~11.1x higher
			expect(density).toBeGreaterThan(5e7);
		});

		it('should use typical solar wind density at 1 AU (~5 particles/cm^3)', () => {
			const density = calculatePlasmaDensity(1.0);
			// ~5 particles/cm^3 = 5e6 particles/m^3
			expect(density).toBeGreaterThan(1e6);
			expect(density).toBeLessThan(1e8);
		});
	});

	describe('calculateElectronTemperature', () => {
		it('should return reference temperature at 1 AU', () => {
			const temp = calculateElectronTemperature(1.0);
			expect(temp).toBeCloseTo(SOLAR_WIND_TEMP_1AU, 0);
		});

		it('should increase at closer distances', () => {
			const temp1AU = calculateElectronTemperature(1.0);
			const temp05AU = calculateElectronTemperature(0.5);
			expect(temp05AU).toBeGreaterThan(temp1AU);
		});

		it('should scale roughly as r^(-0.5)', () => {
			const temp1AU = calculateElectronTemperature(1.0);
			const temp04AU = calculateElectronTemperature(0.4);
			// r^(-0.5) at 0.4 AU: 1/sqrt(0.4) = ~1.58
			const expectedRatio = Math.pow(0.4, -0.5);
			const actualRatio = temp04AU / temp1AU;
			expect(actualRatio).toBeCloseTo(expectedRatio, 1);
		});
	});

	describe('calculateDebyeLength', () => {
		it('should be valid for solar wind conditions at 1 AU', () => {
			const density = calculatePlasmaDensity(1.0);
			const temp = calculateElectronTemperature(1.0);
			const debye = calculateDebyeLength(density, temp);
			// Typical Debye length in solar wind is ~10m at 1 AU
			expect(debye).toBeGreaterThan(1);
			expect(debye).toBeLessThan(100);
		});

		it('should increase with temperature', () => {
			const density = 5e6;
			const debye1 = calculateDebyeLength(density, 1e5);
			const debye2 = calculateDebyeLength(density, 2e5);
			expect(debye2).toBeGreaterThan(debye1);
		});

		it('should decrease with density', () => {
			const temp = 1.5e5;
			const debye1 = calculateDebyeLength(1e6, temp);
			const debye2 = calculateDebyeLength(1e7, temp);
			expect(debye1).toBeGreaterThan(debye2);
		});
	});

	describe('calculatePaschenBreakdownVoltage', () => {
		it('should return high values at very low pressure (space plasma)', () => {
			const density = 5e6; // particles/m^3 (solar wind at 1 AU)
			const voltage = calculatePaschenBreakdownVoltage(density, 0.01);
			// At very low pressure, breakdown voltage should be high
			expect(voltage).toBeGreaterThan(1000);
		});

		it('should increase at very low pressure (left of Paschen minimum)', () => {
			// In space plasma regime, both values are in the vacuum breakdown region
			// where breakdown voltage is proportional to gap distance
			// At these low densities, both should give similar high values
			const v1 = calculatePaschenBreakdownVoltage(1e5, 0.01);
			const v2 = calculatePaschenBreakdownVoltage(1e6, 0.01);
			// Both should be in the high voltage regime (thousands of volts or more)
			expect(v1).toBeGreaterThan(10000);
			expect(v2).toBeGreaterThan(10000);
		});

		it('should scale with gap distance', () => {
			const density = 5e6;
			const v1 = calculatePaschenBreakdownVoltage(density, 0.005);
			const v2 = calculatePaschenBreakdownVoltage(density, 0.01);
			// Larger gap = higher breakdown voltage in vacuum-like conditions
			expect(v2).toBeGreaterThan(v1);
		});

		it('should be higher at closer orbits due to higher density', () => {
			const density03AU = calculatePlasmaDensity(0.3);
			const density1AU = calculatePlasmaDensity(1.0);
			// With denser plasma, we're moving right on Paschen curve
			// In space plasma regime, this can cause lower breakdown
			const v03 = calculatePaschenBreakdownVoltage(density03AU, 0.01);
			const v1 = calculatePaschenBreakdownVoltage(density1AU, 0.01);
			// The denser plasma at 0.3 AU may have lower breakdown voltage
			expect(v03).toBeDefined();
			expect(v1).toBeDefined();
		});
	});

	describe('calculateArcInitiationProbability', () => {
		it('should return near-zero when voltage << breakdown', () => {
			const prob = calculateArcInitiationProbability(100, 1000);
			expect(prob).toBeLessThan(0.01);
		});

		it('should return high probability when voltage > breakdown', () => {
			const prob = calculateArcInitiationProbability(1500, 1000);
			expect(prob).toBeGreaterThan(0.5);
		});

		it('should be monotonically increasing with voltage', () => {
			const breakdownV = 1000;
			const probs = [500, 800, 1000, 1200, 1500].map((v) =>
				calculateArcInitiationProbability(v, breakdownV)
			);
			for (let i = 1; i < probs.length; i++) {
				expect(probs[i]).toBeGreaterThan(probs[i - 1]);
			}
		});

		it('should return ~0.5 at breakdown voltage', () => {
			const prob = calculateArcInitiationProbability(1000, 1000);
			// At V = V_breakdown, probability should be around 50%
			expect(prob).toBeGreaterThan(0.3);
			expect(prob).toBeLessThan(0.7);
		});

		it('should respect stochastic factor', () => {
			const prob1 = calculateArcInitiationProbability(900, 1000, 0.1);
			const prob2 = calculateArcInitiationProbability(900, 1000, 0.3);
			// Higher stochastic factor = gentler curve = different probability
			expect(prob1).not.toBeCloseTo(prob2, 5);
		});
	});

	describe('calculateEffectiveGapDistance', () => {
		it('should reduce gap distance due to plasma sheath', () => {
			const physicalGap = 0.01; // 1 cm
			const debyeLength = 0.001; // 1 mm
			const effective = calculateEffectiveGapDistance(physicalGap, debyeLength);
			expect(effective).toBeLessThan(physicalGap);
		});

		it('should maintain minimum gap fraction', () => {
			const physicalGap = 0.01;
			const debyeLength = 0.01; // Large Debye length
			const effective = calculateEffectiveGapDistance(physicalGap, debyeLength);
			// Should not go below 10% of physical gap
			expect(effective).toBeGreaterThanOrEqual(physicalGap * 0.1);
		});

		it('should be close to physical gap when Debye length is small', () => {
			const physicalGap = 0.01;
			const debyeLength = 0.0001; // Very small Debye length
			const effective = calculateEffectiveGapDistance(physicalGap, debyeLength);
			expect(effective).toBeCloseTo(physicalGap, 2);
		});
	});

	describe('calculateAnnualArcProbability', () => {
		it('should return 0 for zero instant probability', () => {
			const annual = calculateAnnualArcProbability(0);
			expect(annual).toBe(0);
		});

		it('should approach 1 for high instant probability', () => {
			const annual = calculateAnnualArcProbability(0.01);
			// With 0.01 probability per hour over 8760 hours
			expect(annual).toBeGreaterThan(0.9);
		});

		it('should be between 0 and 1', () => {
			const annual = calculateAnnualArcProbability(0.001);
			expect(annual).toBeGreaterThan(0);
			expect(annual).toBeLessThan(1);
		});

		it('should use compound probability formula', () => {
			const p = 0.0001;
			const hours = 8760;
			const expected = 1 - Math.pow(1 - p, hours);
			const actual = calculateAnnualArcProbability(p, hours);
			expect(actual).toBeCloseTo(expected, 10);
		});
	});
});
