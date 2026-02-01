/**
 * BOM Services Module
 *
 * Re-exports all BOM-related functionality for convenient imports.
 */

// Data exports
export {
	BOM_ITEM_SLUGS,
	SLUG_TO_BOM_ID,
	PHASE_0_BOM_ITEMS,
	LLM_MODELS,
	getBOMItemBySlug,
	getAllBOMItemsForPhase,
	type BOMItemMeta,
	type LLMModelId
} from './bom-data';

// Path exports
export {
	getBOMSpecPath,
	getConsensusPath,
	getBOMItemDir,
	getAllSpecPaths
} from './bom-paths';

// Parser exports
export {
	parseFrontmatter,
	parseConsensusSections,
	extractListSection,
	extractTextSection,
	parseBOMSpec,
	type BOMSpecFrontmatter
} from './bom-parsers';

// Fetcher exports
export {
	fetchBOMSpec,
	fetchAllBOMSpecs,
	fetchConsensus,
	checkSpecsExist
} from './bom-fetchers';
