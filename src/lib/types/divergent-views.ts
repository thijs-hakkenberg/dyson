/**
 * Divergent Views Types
 *
 * Structured data types for representing model disagreements
 * on BOM item specifications.
 */

export type ModelName = 'Claude' | 'Gemini' | 'GPT';

/**
 * A single position on a topic, with the models that hold this view
 */
export interface DivergentPosition {
	statement: string;
	models: ModelName[];
}

/**
 * Priority levels for divergent views
 * - critical: Blocks other decisions, affects safety, or changes cost by >50%
 * - high: Significant technical impact, affects multiple systems
 * - medium: Important design choice but alternatives are viable
 * - low: Aesthetic or minor optimization preference
 */
export type DivergentViewPriority = 'critical' | 'high' | 'medium' | 'low';

/**
 * A topic where models have divergent views
 */
export interface DivergentViewTopic {
	id: string;
	topic: string;
	positions: DivergentPosition[];
	/** Priority classification for this disagreement */
	priority?: DivergentViewPriority;
	/** Description of why this divergence matters */
	impact?: string;
	/** Suggested path to resolution */
	resolutionPath?: string;
}

/**
 * Complete divergent views data for a BOM item
 */
export interface DivergentViewsData {
	bomId: string;
	itemSlug: string;
	generated: string;
	topics: DivergentViewTopic[];
}
