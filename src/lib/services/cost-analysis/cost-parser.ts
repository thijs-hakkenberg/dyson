/**
 * Cost Parser
 *
 * Provides functions for extracting and parsing cost information from LLM spec documents.
 */

import type { CostLineItem, ExtractedCosts } from '$lib/types/cost-analysis';

/**
 * Parse a cost string like "$1B", "$500M", "$1.5T", "100M$", etc. into a number (dollars)
 * @param str - The cost string to parse
 * @returns The cost value in dollars, or NaN if parsing fails
 */
export function parseCostString(str: string): number {
	if (!str || typeof str !== 'string') return NaN;

	// Clean the string
	const cleaned = str.trim().replace(/,/g, '');

	// Match patterns like "$1B", "$500M", "$1.5T", "1B$", "500 M$", etc.
	const patterns = [
		// $1.5B, $500M, $1T format
		/^\$\s*([\d.]+)\s*([KMBT])\$?$/i,
		// $1.5 B, $500 M format (with space)
		/^\$\s*([\d.]+)\s+([KMBT])\$?$/i,
		// 1.5B$, 500M$ format
		/^([\d.]+)\s*([KMBT])\s*\$$/i,
		// Plain number with unit: 1.5B, 500M
		/^([\d.]+)\s*([KMBT])$/i,
		// Plain dollar amount: $1500000000
		/^\$\s*([\d.]+)$/,
		// Cost in M$ format: 500 M$
		/^([\d.]+)\s*M\s*\$$/i,
		// Millions/Billions explicit: $500 million, $1.5 billion
		/^\$\s*([\d.]+)\s*(million|billion|trillion)/i,
	];

	for (const pattern of patterns) {
		const match = cleaned.match(pattern);
		if (match) {
			const value = parseFloat(match[1]);
			if (isNaN(value)) continue;

			const unit = match[2]?.toUpperCase();
			const multiplier = getMultiplier(unit);
			return value * multiplier;
		}
	}

	// Try plain number (assume already in dollars or millions)
	const plainNumber = parseFloat(cleaned.replace(/[$]/g, ''));
	if (!isNaN(plainNumber)) {
		// If it's a small number, likely in millions
		if (plainNumber < 10000) {
			return plainNumber * 1_000_000; // Assume millions
		}
		return plainNumber;
	}

	return NaN;
}

/**
 * Get multiplier for unit suffix
 */
function getMultiplier(unit: string | undefined): number {
	if (!unit) return 1;

	switch (unit.toUpperCase()) {
		case 'K':
			return 1_000;
		case 'M':
		case 'MILLION':
			return 1_000_000;
		case 'B':
		case 'BILLION':
			return 1_000_000_000;
		case 'T':
		case 'TRILLION':
			return 1_000_000_000_000;
		default:
			return 1;
	}
}

/**
 * Extract cost information from a BOM spec document content
 * @param specContent - The markdown content of a spec document
 * @returns Extracted cost items and total
 */
export function extractCostFromSpec(specContent: string): ExtractedCosts {
	const items: CostLineItem[] = [];
	const warnings: string[] = [];
	let total: number | undefined;

	// Find cost breakdown sections
	const costSectionPatterns = [
		/##\s*(?:\d+\.?\d*\.?\s*)?Cost\s*(?:Breakdown|Analysis|Summary|Estimates?)?/gi,
		/##\s*(?:\d+\.?\d*\.?\s*)?Budget/gi,
		/###\s*(?:\d+\.?\d*\.?\s*)?(?:Development|Production|Operations|Total)\s*Costs?/gi,
	];

	// Extract costs from tables
	const tableRows = extractTableCosts(specContent);
	items.push(...tableRows);

	// Find total cost patterns
	const totalPatterns = [
		/\*\*(?:TOTAL|Total|Grand Total)\*\*[:\s]*\*\*\s*(\$[\d.,]+[KMBT]?|\$[\d.,]+\s*(?:million|billion)?)/gi,
		/Total\s*(?:Program\s*)?Cost[:\s]*\*?\*?(\$[\d.,]+[KMBT]?)/gi,
		/\|\s*\*\*Total\*\*\s*\|\s*\*\*(\$?[\d.,]+\s*[KMBT]?)\*\*/gi,
		/\|\s*Total\s*\|\s*(\$?[\d.,]+\s*[KMBT]?)/gi,
	];

	for (const pattern of totalPatterns) {
		const matches = specContent.matchAll(pattern);
		for (const match of matches) {
			const parsedTotal = parseCostString(match[1]);
			if (!isNaN(parsedTotal) && parsedTotal > 0) {
				// Take the largest total found (likely the program total)
				if (total === undefined || parsedTotal > total) {
					total = parsedTotal;
				}
			}
		}
	}

	// If we didn't find items but found a total, create a single item
	if (items.length === 0 && total) {
		items.push({
			item: 'Total Program Cost',
			cost: total,
			unit: 'total',
			source: 'Document total'
		});
	}

	// Calculate total from items if not found
	if (total === undefined && items.length > 0) {
		// Look for a "total" item
		const totalItem = items.find(
			(i) => i.item.toLowerCase().includes('total') && !i.item.toLowerCase().includes('subtotal')
		);
		if (totalItem) {
			total = totalItem.cost;
		}
	}

	return {
		items,
		total,
		success: items.length > 0 || total !== undefined,
		warnings: warnings.length > 0 ? warnings : undefined
	};
}

/**
 * Extract costs from markdown tables in the content
 */
function extractTableCosts(content: string): CostLineItem[] {
	const items: CostLineItem[] = [];

	// Match table rows with cost information
	// Format: | Category | Cost | or | Category | Cost (M$) | Percentage |
	const tableRowPattern = /\|\s*([^|]+)\s*\|\s*(\$?[\d.,]+\s*[KMBT]?%?|\*\*\$?[\d.,]+\s*[KMBT]?\*\*)\s*\|/g;

	let match;
	while ((match = tableRowPattern.exec(content)) !== null) {
		const itemName = match[1].replace(/\*\*/g, '').trim();
		let costStr = match[2].replace(/\*\*/g, '').trim();

		// Skip header rows and percentage-only values
		if (
			itemName.toLowerCase().includes('category') ||
			itemName.toLowerCase().includes('parameter') ||
			itemName === '---' ||
			costStr.endsWith('%') ||
			costStr === '---'
		) {
			continue;
		}

		// Skip non-cost values
		if (!costStr.includes('$') && !costStr.match(/[\d.,]+\s*[KMBT]/i)) {
			continue;
		}

		const cost = parseCostString(costStr);
		if (!isNaN(cost) && cost > 0) {
			items.push({
				item: itemName,
				cost,
				unit: inferUnit(itemName, costStr),
				source: 'Cost Table',
				originalString: costStr
			});
		}
	}

	return items;
}

/**
 * Infer the unit type from item name and cost string
 */
function inferUnit(itemName: string, costStr: string): string {
	const lowerName = itemName.toLowerCase();

	if (lowerName.includes('per unit') || lowerName.includes('/unit')) {
		return 'per unit';
	}
	if (lowerName.includes('annual') || lowerName.includes('/year')) {
		return 'per year';
	}
	if (lowerName.includes('subtotal')) {
		return 'subtotal';
	}
	if (lowerName.includes('total')) {
		return 'total';
	}

	// Check cost string format
	if (costStr.includes('M$') || costStr.includes('M)')) {
		return 'M$';
	}
	if (costStr.includes('B$') || costStr.includes('B)')) {
		return 'B$';
	}

	return 'dollars';
}

/**
 * Normalize costs to a common unit (dollars)
 * @param costs - Array of cost line items
 * @returns Normalized cost items (all in dollars)
 */
export function normalizeCosts(costs: CostLineItem[]): CostLineItem[] {
	return costs.map((item) => ({
		...item,
		cost: item.cost, // Already in dollars from parseCostString
		unit: 'dollars'
	}));
}

/**
 * Extract specific cost categories from content
 * @param content - Spec document content
 * @returns Object with development, production, and operations costs
 */
export function extractCostCategories(content: string): {
	development?: number;
	production?: number;
	operations?: number;
	perUnit?: number;
} {
	const result: {
		development?: number;
		production?: number;
		operations?: number;
		perUnit?: number;
	} = {};

	// Development costs
	const devPatterns = [
		/Development\s*(?:Subtotal|Total|Costs?)?[:\s]*\*?\*?(\$?[\d.,]+\s*[KMBT]?)/gi,
		/\*\*Development\s*Subtotal\*\*[:\s]*\*?\*?(\$?[\d.,]+\s*[KMBT]?)/gi,
	];
	for (const pattern of devPatterns) {
		const match = content.match(pattern);
		if (match) {
			const cost = parseCostString(match[1]);
			if (!isNaN(cost)) {
				result.development = cost;
				break;
			}
		}
	}

	// Production costs
	const prodPatterns = [
		/Production\s*(?:Subtotal|Total|Costs?)?[:\s]*\*?\*?(\$?[\d.,]+\s*[KMBT]?)/gi,
		/\*\*(?:Fleet\s*)?Production\s*(?:Total)?\*\*[:\s]*\*?\*?(\$?[\d.,]+\s*[KMBT]?)/gi,
		/Fleet\s*Total\s*\([^)]*\)[:\s]*\*?\*?(\$?[\d.,]+\s*[KMBT]?)/gi,
	];
	for (const pattern of prodPatterns) {
		const match = content.match(pattern);
		if (match) {
			const cost = parseCostString(match[1]);
			if (!isNaN(cost)) {
				result.production = cost;
				break;
			}
		}
	}

	// Operations costs
	const opsPatterns = [
		/Operations?\s*(?:Subtotal|Total|&\s*Support|Costs?)?[:\s]*\*?\*?(\$?[\d.,]+\s*[KMBT]?)/gi,
		/\*\*Operations\s*Subtotal\*\*[:\s]*\*?\*?(\$?[\d.,]+\s*[KMBT]?)/gi,
	];
	for (const pattern of opsPatterns) {
		const match = content.match(pattern);
		if (match) {
			const cost = parseCostString(match[1]);
			if (!isNaN(cost)) {
				result.operations = cost;
				break;
			}
		}
	}

	// Per-unit cost
	const unitPatterns = [
		/Per\s*Unit\s*(?:Total|Cost)?[:\s]*\*?\*?(\$?[\d.,]+\s*[KMBT]?)/gi,
		/\*\*Per\s*Unit\s*Total\*\*[:\s]*\*?\*?(\$?[\d.,]+\s*[KMBT]?)/gi,
		/Cost\/Unit[:\s]*\*?\*?(\$?[\d.,]+\s*[KMBT]?)/gi,
	];
	for (const pattern of unitPatterns) {
		const match = content.match(pattern);
		if (match) {
			const cost = parseCostString(match[1]);
			if (!isNaN(cost)) {
				result.perUnit = cost;
				break;
			}
		}
	}

	return result;
}

/**
 * Format a cost number as a human-readable string
 * @param cost - Cost in dollars
 * @returns Formatted string like "$1.5B" or "$500M"
 */
export function formatCostAmount(cost: number): string {
	if (cost >= 1_000_000_000_000) {
		return `$${(cost / 1_000_000_000_000).toFixed(1)}T`;
	}
	if (cost >= 1_000_000_000) {
		return `$${(cost / 1_000_000_000).toFixed(1)}B`;
	}
	if (cost >= 1_000_000) {
		return `$${(cost / 1_000_000).toFixed(0)}M`;
	}
	if (cost >= 1_000) {
		return `$${(cost / 1_000).toFixed(0)}K`;
	}
	return `$${cost.toFixed(0)}`;
}
