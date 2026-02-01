/**
 * BOM Specifications Service
 *
 * This file re-exports from the modular bom/ directory for backward compatibility.
 * New code should import directly from '$lib/services/bom' instead.
 *
 * @deprecated Import from '$lib/services/bom' instead
 */

// Re-export everything from the modular structure
export {
	// Data
	BOM_ITEM_SLUGS,
	SLUG_TO_BOM_ID,
	PHASE_0_BOM_ITEMS,
	LLM_MODELS,
	getBOMItemBySlug,
	getAllBOMItemsForPhase,
	type BOMItemMeta,

	// Paths
	getBOMSpecPath,
	getConsensusPath,

	// Parsers
	parseFrontmatter,

	// Fetchers
	fetchBOMSpec,
	fetchAllBOMSpecs,
	fetchConsensus
} from './bom';
