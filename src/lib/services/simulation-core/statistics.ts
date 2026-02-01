/**
 * Statistical Utilities
 *
 * Common statistical functions for Monte Carlo simulations.
 */

/**
 * Calculate mean (average) of values
 */
export function mean(values: number[]): number {
	if (values.length === 0) return 0;
	return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Calculate population variance
 */
export function variance(values: number[]): number {
	if (values.length === 0) return 0;
	const m = mean(values);
	return values.reduce((sum, v) => sum + Math.pow(v - m, 2), 0) / values.length;
}

/**
 * Calculate population standard deviation
 */
export function stdDev(values: number[]): number {
	return Math.sqrt(variance(values));
}

/**
 * Calculate percentile (0-100)
 */
export function percentile(values: number[], p: number): number {
	if (values.length === 0) return 0;
	const sorted = [...values].sort((a, b) => a - b);
	const index = Math.floor((p / 100) * (sorted.length - 1));
	return sorted[index];
}

/**
 * Find minimum value
 */
export function min(values: number[]): number {
	if (values.length === 0) return Infinity;
	return Math.min(...values);
}

/**
 * Find maximum value
 */
export function max(values: number[]): number {
	if (values.length === 0) return -Infinity;
	return Math.max(...values);
}

/**
 * Statistics summary type
 */
export interface Stats {
	mean: number;
	stdDev: number;
	min: number;
	max: number;
	percentile5: number;
	percentile95: number;
}

/**
 * Calculate all common statistics at once
 */
export function calculateStats(values: number[]): Stats {
	if (values.length === 0) {
		return {
			mean: 0,
			stdDev: 0,
			min: 0,
			max: 0,
			percentile5: 0,
			percentile95: 0
		};
	}

	const sorted = [...values].sort((a, b) => a - b);
	const n = sorted.length;
	const m = values.reduce((sum, v) => sum + v, 0) / n;
	const v = values.reduce((sum, val) => sum + Math.pow(val - m, 2), 0) / n;

	return {
		mean: m,
		stdDev: Math.sqrt(v),
		min: sorted[0],
		max: sorted[n - 1],
		percentile5: sorted[Math.floor(n * 0.05)],
		percentile95: sorted[Math.floor(n * 0.95)]
	};
}

/**
 * Confidence interval result
 */
export interface ConfidenceInterval {
	mean: number;
	lower: number;
	upper: number;
	confidenceLevel: number;
}

/**
 * Calculate confidence interval for the mean
 * Uses z-score approximation (valid for n > 30)
 */
export function confidenceInterval(
	values: number[],
	confidenceLevel: number = 0.95
): ConfidenceInterval {
	if (values.length === 0) {
		return { mean: 0, lower: 0, upper: 0, confidenceLevel };
	}

	const m = mean(values);
	const s = stdDev(values);
	const n = values.length;

	// Z-scores for common confidence levels
	const zScores: Record<number, number> = {
		0.9: 1.645,
		0.95: 1.96,
		0.99: 2.576
	};

	const z = zScores[confidenceLevel] ?? 1.96;
	const marginOfError = z * (s / Math.sqrt(n));

	return {
		mean: m,
		lower: m - marginOfError,
		upper: m + marginOfError,
		confidenceLevel
	};
}
