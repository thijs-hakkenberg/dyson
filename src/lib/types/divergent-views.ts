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
 * A topic where models have divergent views
 */
export interface DivergentViewTopic {
	id: string;
	topic: string;
	positions: DivergentPosition[];
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
