/**
 * Consensus Parsing Utilities
 *
 * Extracts and parses model positions from divergent view text.
 *
 * Handles multiple input formats:
 * - Format A: "Model verb position" (e.g., "Claude favors hexapod design")
 * - Format B: "position (Model)" (e.g., "Solar furnaces (Claude)")
 * - Format C: "Model1 and Model2 verb position" (e.g., "Claude and GPT recommend X")
 *
 * Display cases:
 * - Case 1: All 3 models disagree → 3 boxes, each with model's color
 * - Case 2: 2 models agree, 1 disagrees → 2 boxes (singular model color + shared consensus color)
 * - Case 3: All 3 agree → Should not be in divergent views (belongs in agreed specs)
 */

export const MODEL_NAMES = ['Claude', 'Gemini', 'GPT'] as const;
export type ModelName = (typeof MODEL_NAMES)[number];

/**
 * A single model's position on a topic
 */
export interface ModelPosition {
	model: ModelName;
	position: string;
}

/**
 * Parsed divergence with topic and individual model positions
 */
export interface ParsedDivergence {
	topic: string;
	positions: ModelPosition[];
}

/**
 * A grouped position - either a single model or multiple models sharing a view
 */
export interface GroupedPosition {
	models: ModelName[];
	position: string;
	isShared: boolean; // true if multiple models share this position
}

/**
 * Parse a divergent view string into structured format.
 *
 * Expected formats:
 * - "**Topic**: Claude recommends X; Gemini favors Y. GPT suggests Z."
 * - "**Topic**: Claude and Gemini recommend X, while GPT prefers Y."
 * - "**Topic**: Position A (Claude) vs. Position B (GPT) vs. Position C (Gemini)."
 */
export function parseDivergentView(view: string): ParsedDivergence {
	// Extract topic from bold text
	const topicMatch = view.match(/^\*\*([^*]+)\*\*:\s*/);
	const topic = topicMatch ? topicMatch[1] : 'General';
	const remainder = topicMatch ? view.slice(topicMatch[0].length) : view;

	// Try different parsing strategies based on content format
	let positions: ModelPosition[] = [];

	// Check if this is Format B: "position (Model) vs position (Model)"
	if (remainder.includes('(Claude)') || remainder.includes('(Gemini)') || remainder.includes('(GPT)')) {
		positions = parseParenthesesFormat(remainder);
	}

	// If Format B didn't find anything, try Format A/C: "Model verb position"
	if (positions.length === 0) {
		positions = parseStandardFormat(remainder);
	}

	// If still nothing, the format might not attribute to specific models
	// (e.g., "Estimates range from X to Y" - no model attribution)

	return { topic, positions };
}

/**
 * Parse Format B: "position (Model) vs position (Model)"
 * Example: "Solar concentrator furnaces (Claude) vs. electric arc furnaces (GPT) vs. hybrid approach (Gemini)."
 */
function parseParenthesesFormat(text: string): ModelPosition[] {
	const positions: ModelPosition[] = [];

	// Pattern: capture text before (Model), then the model name
	// Split by "vs." or "vs" first
	const segments = text.split(/\s+vs\.?\s+/i);

	for (const segment of segments) {
		// Match: "some position text (ModelName)"
		const match = segment.match(/^(.+?)\s*\((Claude|Gemini|GPT)\)/i);
		if (match) {
			const position = cleanPosition(match[1]);
			const model = normalizeModelName(match[2]);
			if (position && model) {
				positions.push({ model, position });
			}
		}
	}

	return positions;
}

/**
 * Parse Format A/C: "Model verb position" and "Model1 and Model2 verb position"
 */
function parseStandardFormat(text: string): ModelPosition[] {
	const positions: ModelPosition[] = [];
	const processedModels = new Set<ModelName>();

	// First, handle combined mentions: "Claude and GPT recommend X"
	// Capture until next model mention, semicolon, or period
	const combinedPattern = /(Claude|Gemini|GPT)\s+and\s+(Claude|Gemini|GPT)\s+(recommend|suggest|favor|prefer|include|emphasize|treat|consider|propose)s?\s+([^;.]*?)(?=\s*[;.]|\s*(?:Claude|Gemini|GPT)\s|$)/gi;

	let combinedMatch;
	while ((combinedMatch = combinedPattern.exec(text)) !== null) {
		const model1 = normalizeModelName(combinedMatch[1]);
		const model2 = normalizeModelName(combinedMatch[2]);
		const position = cleanPosition(combinedMatch[4]);

		if (position && model1 && !processedModels.has(model1)) {
			positions.push({ model: model1, position });
			processedModels.add(model1);
		}
		if (position && model2 && !processedModels.has(model2)) {
			positions.push({ model: model2, position });
			processedModels.add(model2);
		}
	}

	// Then handle individual mentions: "Claude favors X"
	// Split by semicolons, periods, AND commas (when followed by model name)
	// First normalize: replace ", Model" with "; Model" to create consistent delimiters
	const normalized = text.replace(/,\s*(Claude|Gemini|GPT)\s/gi, '; $1 ');
	const clauses = normalized.split(/[;.]\s*/);

	for (const clause of clauses) {
		// Pattern: Model + optional adverb + verb + position (capture until end or next model)
		const singlePattern = /^(Claude|Gemini|GPT)\s+(strongly\s+)?(recommends?|suggests?|favors?|prefers?|includes?|emphasizes?|treats?|considers?|proposes?|focuses?\s+on|questions?)\s+(.+)/i;
		const match = clause.match(singlePattern);

		if (match) {
			const model = normalizeModelName(match[1]);
			// Clean the position - stop at any other model mention
			let posText = match[4];
			// Remove any trailing model mentions that leaked through
			posText = posText.replace(/\s*(Claude|Gemini|GPT)\s+.*/i, '');
			const position = cleanPosition(posText);

			if (position && model && !processedModels.has(model)) {
				positions.push({ model, position });
				processedModels.add(model);
			}
		}
	}

	return positions;
}

/**
 * Normalize model name to canonical form
 */
function normalizeModelName(name: string): ModelName | null {
	const normalized = name.trim();
	for (const model of MODEL_NAMES) {
		if (normalized.toLowerCase() === model.toLowerCase()) {
			return model;
		}
	}
	return null;
}

/**
 * Clean up a position string
 */
function cleanPosition(text: string): string {
	let cleaned = text.trim();

	// Remove trailing punctuation
	cleaned = cleaned.replace(/[;.,]+$/, '');

	// Remove trailing conjunctions/connectors
	cleaned = cleaned.replace(/\s+(while|whereas|however|but|and)\s*$/i, '');

	// Remove model names that might have leaked in
	cleaned = cleaned.replace(/\b(Claude|Gemini|GPT)\b/gi, '').trim();

	// Remove orphaned parentheses
	cleaned = cleaned.replace(/\(\s*\)/g, '').trim();

	// Remove leading articles if they're orphaned
	cleaned = cleaned.replace(/^(a|an|the)\s+$/i, '');

	// Collapse multiple spaces
	cleaned = cleaned.replace(/\s+/g, ' ').trim();

	// Capitalize first letter
	if (cleaned.length > 0) {
		cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
	}

	// Filter out garbage (too short or mostly punctuation)
	if (cleaned.length < 3 || /^[\W\s]+$/.test(cleaned)) {
		return '';
	}

	return cleaned;
}

/**
 * Group positions by their content.
 * Models with identical or very similar positions are grouped together.
 *
 * Returns grouped positions with:
 * - isShared: true if multiple models share this position (use consensus color)
 * - isShared: false if single model (use model's color)
 */
export function groupByPosition(positions: ModelPosition[]): GroupedPosition[] {
	if (positions.length === 0) return [];

	const groups: GroupedPosition[] = [];
	const used = new Set<number>();

	for (let i = 0; i < positions.length; i++) {
		if (used.has(i)) continue;

		const current = positions[i];
		const matchingModels: ModelName[] = [current.model];
		used.add(i);

		// Find other positions with matching content
		for (let j = i + 1; j < positions.length; j++) {
			if (used.has(j)) continue;

			const other = positions[j];
			if (positionsMatch(current.position, other.position)) {
				matchingModels.push(other.model);
				used.add(j);
			}
		}

		groups.push({
			models: matchingModels,
			position: current.position,
			isShared: matchingModels.length > 1
		});
	}

	// Sort: shared positions first, then by number of models (descending)
	groups.sort((a, b) => {
		if (a.isShared !== b.isShared) return a.isShared ? -1 : 1;
		return b.models.length - a.models.length;
	});

	return groups;
}

/**
 * Check if two position strings are semantically equivalent
 */
function positionsMatch(pos1: string, pos2: string): boolean {
	// Normalize for comparison
	const normalize = (s: string) =>
		s.toLowerCase()
			.replace(/[^a-z0-9\s]/g, '')
			.replace(/\s+/g, ' ')
			.trim();

	const n1 = normalize(pos1);
	const n2 = normalize(pos2);

	// Exact match after normalization
	if (n1 === n2) return true;

	// Check if one contains the other (for cases where one is more verbose)
	if (n1.length > 10 && n2.length > 10) {
		if (n1.includes(n2) || n2.includes(n1)) return true;
	}

	// Similarity check for short strings
	if (n1.length < 50 && n2.length < 50) {
		const similarity = calculateSimilarity(n1, n2);
		return similarity > 0.85;
	}

	return false;
}

/**
 * Calculate string similarity (simple word overlap)
 */
function calculateSimilarity(s1: string, s2: string): number {
	const words1 = new Set(s1.split(' ').filter(w => w.length > 2));
	const words2 = new Set(s2.split(' ').filter(w => w.length > 2));

	if (words1.size === 0 || words2.size === 0) return 0;

	let overlap = 0;
	for (const word of words1) {
		if (words2.has(word)) overlap++;
	}

	return (2 * overlap) / (words1.size + words2.size);
}

/**
 * Parse all divergent views and filter out any where all models agree
 * (those should be in agreed specs, not divergent views)
 */
export function parseAllDivergences(views: string[]): ParsedDivergence[] {
	return views
		.map(parseDivergentView)
		.filter(d => {
			// Keep only if there's actual divergence
			const grouped = groupByPosition(d.positions);
			// If there's only one group with all models, there's no divergence
			return grouped.length > 1 || (grouped.length === 1 && grouped[0].models.length < 3);
		});
}

/**
 * Check if a divergence has any actual disagreement
 */
export function hasDivergence(divergence: ParsedDivergence): boolean {
	const grouped = groupByPosition(divergence.positions);
	return grouped.length > 1;
}
