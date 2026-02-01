import { describe, it, expect } from 'vitest';
import {
	mean,
	stdDev,
	variance,
	percentile,
	min,
	max,
	calculateStats,
	confidenceInterval
} from '../statistics';

describe('statistics', () => {
	describe('mean', () => {
		it('should calculate mean of values', () => {
			expect(mean([1, 2, 3, 4, 5])).toBe(3);
		});

		it('should handle single value', () => {
			expect(mean([42])).toBe(42);
		});

		it('should return 0 for empty array', () => {
			expect(mean([])).toBe(0);
		});

		it('should handle negative values', () => {
			expect(mean([-5, 0, 5])).toBe(0);
		});

		it('should handle decimal values', () => {
			expect(mean([1.5, 2.5, 3.5])).toBeCloseTo(2.5);
		});
	});

	describe('variance', () => {
		it('should calculate population variance', () => {
			// Variance of [1,2,3,4,5] = 2
			expect(variance([1, 2, 3, 4, 5])).toBe(2);
		});

		it('should return 0 for single value', () => {
			expect(variance([5])).toBe(0);
		});

		it('should return 0 for empty array', () => {
			expect(variance([])).toBe(0);
		});

		it('should return 0 for identical values', () => {
			expect(variance([7, 7, 7, 7])).toBe(0);
		});
	});

	describe('stdDev', () => {
		it('should calculate standard deviation', () => {
			expect(stdDev([1, 2, 3, 4, 5])).toBeCloseTo(Math.sqrt(2));
		});

		it('should return 0 for single value', () => {
			expect(stdDev([5])).toBe(0);
		});

		it('should return 0 for empty array', () => {
			expect(stdDev([])).toBe(0);
		});
	});

	describe('percentile', () => {
		it('should calculate 50th percentile (median)', () => {
			expect(percentile([1, 2, 3, 4, 5], 50)).toBe(3);
		});

		it('should calculate 0th percentile (min)', () => {
			expect(percentile([1, 2, 3, 4, 5], 0)).toBe(1);
		});

		it('should calculate 100th percentile (max)', () => {
			expect(percentile([1, 2, 3, 4, 5], 100)).toBe(5);
		});

		it('should calculate 25th percentile', () => {
			expect(percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 25)).toBeCloseTo(3);
		});

		it('should calculate 75th percentile', () => {
			// With floor-based indexing: floor(0.75 * 9) = 6 -> value at index 6 is 7
			expect(percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 75)).toBe(7);
		});

		it('should handle unsorted input', () => {
			expect(percentile([5, 1, 4, 2, 3], 50)).toBe(3);
		});

		it('should return 0 for empty array', () => {
			expect(percentile([], 50)).toBe(0);
		});
	});

	describe('min', () => {
		it('should find minimum value', () => {
			expect(min([3, 1, 4, 1, 5])).toBe(1);
		});

		it('should handle negative values', () => {
			expect(min([-5, -1, 0, 5])).toBe(-5);
		});

		it('should return Infinity for empty array', () => {
			expect(min([])).toBe(Infinity);
		});
	});

	describe('max', () => {
		it('should find maximum value', () => {
			expect(max([3, 1, 4, 1, 5])).toBe(5);
		});

		it('should handle negative values', () => {
			expect(max([-5, -1, 0, 5])).toBe(5);
		});

		it('should return -Infinity for empty array', () => {
			expect(max([])).toBe(-Infinity);
		});
	});

	describe('calculateStats', () => {
		it('should calculate all statistics', () => {
			const values = [10, 20, 30, 40, 50];
			const stats = calculateStats(values);

			expect(stats.mean).toBe(30);
			expect(stats.min).toBe(10);
			expect(stats.max).toBe(50);
			expect(stats.stdDev).toBeCloseTo(Math.sqrt(200));
			expect(stats.percentile5).toBeDefined();
			expect(stats.percentile95).toBeDefined();
		});

		it('should handle empty array', () => {
			const stats = calculateStats([]);

			expect(stats.mean).toBe(0);
			expect(stats.stdDev).toBe(0);
			expect(stats.min).toBe(0);
			expect(stats.max).toBe(0);
		});

		it('should handle single value', () => {
			const stats = calculateStats([42]);

			expect(stats.mean).toBe(42);
			expect(stats.stdDev).toBe(0);
			expect(stats.min).toBe(42);
			expect(stats.max).toBe(42);
		});
	});

	describe('confidenceInterval', () => {
		it('should calculate 95% confidence interval', () => {
			const values = Array.from({ length: 100 }, (_, i) => i);
			const ci = confidenceInterval(values, 0.95);

			expect(ci.lower).toBeLessThan(ci.mean);
			expect(ci.upper).toBeGreaterThan(ci.mean);
		});

		it('should narrow with more samples', () => {
			const small = Array.from({ length: 10 }, () => 50 + Math.random() * 10);
			const large = Array.from({ length: 1000 }, () => 50 + Math.random() * 10);

			const ciSmall = confidenceInterval(small);
			const ciLarge = confidenceInterval(large);

			const widthSmall = ciSmall.upper - ciSmall.lower;
			const widthLarge = ciLarge.upper - ciLarge.lower;

			expect(widthLarge).toBeLessThan(widthSmall);
		});

		it('should return zeros for empty array', () => {
			const ci = confidenceInterval([]);

			expect(ci.mean).toBe(0);
			expect(ci.lower).toBe(0);
			expect(ci.upper).toBe(0);
		});
	});
});
