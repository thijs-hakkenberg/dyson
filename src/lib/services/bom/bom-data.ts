/**
 * BOM Data Constants
 *
 * Contains all static data for BOM items including slug mappings,
 * phase items, and LLM model information.
 */

/**
 * BOM Item metadata interface
 */
export interface BOMItemMeta {
	bomId: string;
	slug: string;
	name: string;
	quantity: string;
	cost: string;
	category: string;
}

/**
 * BOM Item slug mappings (ID -> slug)
 */
export const BOM_ITEM_SLUGS: Record<string, string> = {
	'bom-0-1': 'prospecting-satellites',
	'bom-0-2': 'mining-robots',
	'bom-0-3': 'material-processing-station',
	'bom-0-4': 'transport-vehicles',
	'bom-0-5': 'solar-power-arrays'
};

/**
 * Reverse mapping (slug -> ID)
 */
export const SLUG_TO_BOM_ID: Record<string, string> = Object.entries(BOM_ITEM_SLUGS).reduce(
	(acc, [bomId, slug]) => {
		acc[slug] = bomId;
		return acc;
	},
	{} as Record<string, string>
);

/**
 * Phase 0 BOM Items
 */
export const PHASE_0_BOM_ITEMS: BOMItemMeta[] = [
	{
		bomId: 'bom-0-1',
		slug: 'prospecting-satellites',
		name: 'Prospecting Satellites',
		quantity: '50 units',
		cost: '$250M',
		category: 'Spacecraft'
	},
	{
		bomId: 'bom-0-2',
		slug: 'mining-robots',
		name: 'Mining Robots',
		quantity: '20 units',
		cost: '$1B',
		category: 'Robotics'
	},
	{
		bomId: 'bom-0-3',
		slug: 'material-processing-station',
		name: 'Material Processing Station',
		quantity: '1 station',
		cost: '$10B',
		category: 'Infrastructure'
	},
	{
		bomId: 'bom-0-4',
		slug: 'transport-vehicles',
		name: 'Transport Vehicles',
		quantity: '10 units',
		cost: '$2B',
		category: 'Spacecraft'
	},
	{
		bomId: 'bom-0-5',
		slug: 'solar-power-arrays',
		name: 'Solar Power Arrays',
		quantity: '100 MW',
		cost: '$500M',
		category: 'Power Systems'
	}
];

/**
 * LLM Model information for display
 */
export const LLM_MODELS = {
	'gemini-3-pro': {
		id: 'gemini-3-pro',
		name: 'Gemini 3 Pro',
		filename: 'gemini-3-pro.md'
	},
	'gpt-5-2': {
		id: 'gpt-5-2',
		name: 'GPT-5.2',
		filename: 'gpt-5-2.md'
	},
	'claude-opus-4-5': {
		id: 'claude-opus-4-5',
		name: 'Claude Opus 4.5',
		filename: 'claude-opus-4-5.md'
	}
} as const;

export type LLMModelId = keyof typeof LLM_MODELS;

/**
 * Get BOM item by slug
 */
export function getBOMItemBySlug(slug: string): BOMItemMeta | undefined {
	return PHASE_0_BOM_ITEMS.find((item) => item.slug === slug);
}

/**
 * Get all BOM items for a phase
 */
export function getAllBOMItemsForPhase(phaseId: string): BOMItemMeta[] {
	if (phaseId === 'phase-0') {
		return PHASE_0_BOM_ITEMS;
	}
	return [];
}
