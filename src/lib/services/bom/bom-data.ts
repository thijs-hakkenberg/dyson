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
	// Phase 0
	'bom-0-1': 'prospecting-satellites',
	'bom-0-2': 'mining-robots',
	'bom-0-3': 'material-processing-station',
	'bom-0-4': 'transport-vehicles',
	'bom-0-5': 'solar-power-arrays',
	// Phase 1
	'bom-1-1': 'collector-units',
	'bom-1-2': 'pv-blanket-arrays',
	'bom-1-3': 'assembly-robots',
	'bom-1-4': 'assembly-node',
	'bom-1-5': 'mass-drivers',
	'bom-1-6': 'orbital-tugs',
	'bom-1-7': 'swarm-control-system'
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
		quantity: '32 units',
		cost: '$160M',
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
		quantity: '15 units',
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
 * Phase 1 BOM Items - Initial Swarm Deployment
 * Quantity and cost estimates derived from multi-model LLM consensus (2026-02-01)
 */
export const PHASE_1_BOM_ITEMS: BOMItemMeta[] = [
	{
		bomId: 'bom-1-1',
		slug: 'collector-units',
		name: 'Solar Collector Units',
		quantity: '1,000 units',
		cost: '$100B',
		category: 'Spacecraft'
	},
	{
		bomId: 'bom-1-2',
		slug: 'pv-blanket-arrays',
		name: 'PV Blanket Arrays',
		quantity: '5,000 units',
		cost: '$25B',
		category: 'Power Systems'
	},
	{
		bomId: 'bom-1-3',
		slug: 'assembly-robots',
		name: 'Assembly Robots',
		quantity: '50 units',
		cost: '$3B',
		category: 'Robotics'
	},
	{
		bomId: 'bom-1-4',
		slug: 'assembly-node',
		name: 'Assembly Node Hub',
		quantity: '1 hub',
		cost: '$15B',
		category: 'Infrastructure'
	},
	{
		bomId: 'bom-1-5',
		slug: 'mass-drivers',
		name: 'Mass Drivers',
		quantity: '2 systems',
		cost: '$8B',
		category: 'Infrastructure'
	},
	{
		bomId: 'bom-1-6',
		slug: 'orbital-tugs',
		name: 'Orbital Tugs',
		quantity: '20 units',
		cost: '$2B',
		category: 'Spacecraft'
	},
	{
		bomId: 'bom-1-7',
		slug: 'swarm-control-system',
		name: 'Swarm Control System',
		quantity: '1 system',
		cost: '$5B',
		category: 'Computing'
	}
];

/**
 * Phase 2 BOM Items - Swarm Expansion
 * Quantity and cost estimates to be derived from multi-model LLM consensus
 */
export const PHASE_2_BOM_ITEMS: BOMItemMeta[] = [
	{
		bomId: 'bom-2-1',
		slug: 'collector-satellites',
		name: 'Solar Collector Satellites',
		quantity: '100,000 units',
		cost: '$5T',
		category: 'Spacecraft'
	},
	{
		bomId: 'bom-2-2',
		slug: 'maintenance-drones',
		name: 'Maintenance Drones',
		quantity: '5,000 units',
		cost: '$50B',
		category: 'Robotics'
	},
	{
		bomId: 'bom-2-3',
		slug: 'manufacturing-expansion',
		name: 'Additional Manufacturing Capacity',
		quantity: '5 facilities',
		cost: '$75B',
		category: 'Infrastructure'
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
export function getBOMItemBySlug(slug: string, phaseId?: string): BOMItemMeta | undefined {
	if (phaseId) {
		const items = getAllBOMItemsForPhase(phaseId);
		return items.find((item) => item.slug === slug);
	}
	// Search all phases
	return (
		PHASE_0_BOM_ITEMS.find((item) => item.slug === slug) ||
		PHASE_1_BOM_ITEMS.find((item) => item.slug === slug) ||
		PHASE_2_BOM_ITEMS.find((item) => item.slug === slug)
	);
}

/**
 * Get all BOM items for a phase
 */
export function getAllBOMItemsForPhase(phaseId: string): BOMItemMeta[] {
	switch (phaseId) {
		case 'phase-0':
			return PHASE_0_BOM_ITEMS;
		case 'phase-1':
			return PHASE_1_BOM_ITEMS;
		case 'phase-2':
			return PHASE_2_BOM_ITEMS;
		default:
			return [];
	}
}
