import { describe, it, expect } from 'vitest';
import { SeededRandom } from '../seeded-random';

describe('SeededRandom', () => {
	describe('constructor', () => {
		it('should create instance with provided seed', () => {
			const rng = new SeededRandom(12345);
			expect(rng).toBeInstanceOf(SeededRandom);
		});

		it('should create instance with default seed when none provided', () => {
			const rng = new SeededRandom();
			expect(rng).toBeInstanceOf(SeededRandom);
		});
	});

	describe('next', () => {
		it('should return values between 0 and 1', () => {
			const rng = new SeededRandom(42);
			for (let i = 0; i < 100; i++) {
				const value = rng.next();
				expect(value).toBeGreaterThanOrEqual(0);
				expect(value).toBeLessThan(1);
			}
		});

		it('should be reproducible with same seed', () => {
			const rng1 = new SeededRandom(12345);
			const rng2 = new SeededRandom(12345);

			for (let i = 0; i < 10; i++) {
				expect(rng1.next()).toBe(rng2.next());
			}
		});

		it('should produce different sequences with different seeds', () => {
			const rng1 = new SeededRandom(111);
			const rng2 = new SeededRandom(222);

			const seq1 = Array.from({ length: 5 }, () => rng1.next());
			const seq2 = Array.from({ length: 5 }, () => rng2.next());

			expect(seq1).not.toEqual(seq2);
		});
	});

	describe('nextGaussian', () => {
		it('should produce values centered around mean', () => {
			const rng = new SeededRandom(42);
			const mean = 100;
			const stdDev = 10;
			const samples = Array.from({ length: 1000 }, () => rng.nextGaussian(mean, stdDev));

			const sampleMean = samples.reduce((a, b) => a + b, 0) / samples.length;
			expect(sampleMean).toBeCloseTo(mean, 0);
		});

		it('should respect standard deviation', () => {
			const rng = new SeededRandom(42);
			const mean = 50;
			const stdDev = 5;
			const samples = Array.from({ length: 1000 }, () => rng.nextGaussian(mean, stdDev));

			const sampleMean = samples.reduce((a, b) => a + b, 0) / samples.length;
			const sampleVariance =
				samples.reduce((sum, v) => sum + Math.pow(v - sampleMean, 2), 0) / samples.length;
			const sampleStdDev = Math.sqrt(sampleVariance);

			expect(sampleStdDev).toBeCloseTo(stdDev, 0);
		});
	});

	describe('nextRange', () => {
		it('should return values within specified range', () => {
			const rng = new SeededRandom(42);
			const min = 10;
			const max = 20;

			for (let i = 0; i < 100; i++) {
				const value = rng.nextRange(min, max);
				expect(value).toBeGreaterThanOrEqual(min);
				expect(value).toBeLessThan(max);
			}
		});

		it('should handle negative ranges', () => {
			const rng = new SeededRandom(42);
			const min = -100;
			const max = -50;

			for (let i = 0; i < 100; i++) {
				const value = rng.nextRange(min, max);
				expect(value).toBeGreaterThanOrEqual(min);
				expect(value).toBeLessThan(max);
			}
		});
	});

	describe('nextInt', () => {
		it('should return integers within specified range', () => {
			const rng = new SeededRandom(42);
			const min = 1;
			const max = 10;

			for (let i = 0; i < 100; i++) {
				const value = rng.nextInt(min, max);
				expect(Number.isInteger(value)).toBe(true);
				expect(value).toBeGreaterThanOrEqual(min);
				expect(value).toBeLessThan(max);
			}
		});
	});

	describe('nextBoolean', () => {
		it('should return true with given probability', () => {
			const rng = new SeededRandom(42);
			const trueCount = Array.from({ length: 1000 }, () => rng.nextBoolean(0.7)).filter(
				Boolean
			).length;

			expect(trueCount / 1000).toBeCloseTo(0.7, 1);
		});

		it('should use 0.5 as default probability', () => {
			const rng = new SeededRandom(42);
			const trueCount = Array.from({ length: 1000 }, () => rng.nextBoolean()).filter(
				Boolean
			).length;

			expect(trueCount / 1000).toBeCloseTo(0.5, 1);
		});
	});

	describe('nextExponential', () => {
		it('should produce exponentially distributed values', () => {
			const rng = new SeededRandom(42);
			const rate = 2;
			const samples = Array.from({ length: 1000 }, () => rng.nextExponential(rate));

			// Exponential distribution mean = 1/rate
			const expectedMean = 1 / rate;
			const sampleMean = samples.reduce((a, b) => a + b, 0) / samples.length;

			expect(sampleMean).toBeCloseTo(expectedMean, 1);
		});

		it('should always return non-negative values', () => {
			const rng = new SeededRandom(42);
			for (let i = 0; i < 100; i++) {
				expect(rng.nextExponential(1)).toBeGreaterThanOrEqual(0);
			}
		});
	});

	describe('getSeed', () => {
		it('should return the initial seed', () => {
			const seed = 99999;
			const rng = new SeededRandom(seed);
			expect(rng.getSeed()).toBe(seed);
		});
	});
});
