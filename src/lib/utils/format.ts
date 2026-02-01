/**
 * Formatting utilities for Project Dyson
 *
 * Consolidates currency formatting and other display utilities.
 */

/**
 * Format a number as currency with appropriate suffix (K, M, B, T)
 * @param amount - The amount to format
 * @param options - Formatting options
 */
export function formatCurrency(
	amount: number,
	options: {
		decimals?: number;
		showCents?: boolean;
	} = {}
): string {
	const { decimals, showCents = false } = options;

	if (amount >= 1e12) {
		const d = decimals ?? 2;
		return `$${(amount / 1e12).toFixed(d)}T`;
	} else if (amount >= 1e9) {
		const d = decimals ?? 2;
		return `$${(amount / 1e9).toFixed(d)}B`;
	} else if (amount >= 1e6) {
		const d = decimals ?? 2;
		return `$${(amount / 1e6).toFixed(d)}M`;
	} else if (amount >= 1e3) {
		const d = decimals ?? 2;
		return `$${(amount / 1e3).toFixed(d)}K`;
	}

	if (showCents) {
		return `$${amount.toFixed(2)}`;
	}

	return `$${amount.toLocaleString()}`;
}

/**
 * Format a cost estimate (simplified version for LLM content)
 * @param amount - The amount to format
 */
export function formatCostEstimate(amount: number): string {
	if (amount >= 1e12) {
		return `$${(amount / 1e12).toFixed(2)}T`;
	} else if (amount >= 1e9) {
		return `$${(amount / 1e9).toFixed(1)}B`;
	} else if (amount >= 1e6) {
		return `$${(amount / 1e6).toFixed(0)}M`;
	}
	return `$${amount.toLocaleString()}`;
}

/**
 * Format a number with locale-specific separators
 * @param num - The number to format
 */
export function formatNumber(num: number): string {
	return num.toLocaleString();
}

/**
 * Format a date for display
 * @param date - The date to format
 * @param style - The format style
 */
export function formatDate(
	date: Date | string,
	style: 'short' | 'medium' | 'long' = 'medium'
): string {
	const d = typeof date === 'string' ? new Date(date) : date;

	const optionsMap: Record<'short' | 'medium' | 'long', Intl.DateTimeFormatOptions> = {
		short: { year: 'numeric', month: 'numeric', day: 'numeric' },
		medium: { year: 'numeric', month: 'short', day: 'numeric' },
		long: { year: 'numeric', month: 'long', day: 'numeric' }
	};

	return new Intl.DateTimeFormat('en-US', optionsMap[style]).format(d);
}

/**
 * Format a duration in months to a human-readable string
 * @param months - Duration in months
 */
export function formatDuration(months: number): string {
	if (months < 12) {
		return `${months} month${months === 1 ? '' : 's'}`;
	}

	const years = Math.floor(months / 12);
	const remainingMonths = months % 12;

	if (remainingMonths === 0) {
		return `${years} year${years === 1 ? '' : 's'}`;
	}

	return `${years} year${years === 1 ? '' : 's'}, ${remainingMonths} month${remainingMonths === 1 ? '' : 's'}`;
}

/**
 * Format a percentage
 * @param value - The value (0-100 or 0-1)
 * @param isDecimal - Whether the value is a decimal (0-1) or percentage (0-100)
 */
export function formatPercentage(value: number, isDecimal = false): string {
	const percentage = isDecimal ? value * 100 : value;
	return `${percentage.toFixed(1)}%`;
}
