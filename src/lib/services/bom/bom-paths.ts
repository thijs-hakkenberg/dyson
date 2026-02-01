/**
 * BOM Path Builders
 *
 * Provides path construction for BOM spec and consensus files.
 */

import { LLM_MODELS, type LLMModelId } from './bom-data';

/**
 * Build the content path for a BOM spec file
 * @param phaseId - The phase ID (e.g., 'phase-0')
 * @param itemSlug - The item slug (e.g., 'prospecting-satellites')
 * @param modelId - The model ID (e.g., 'claude-opus-4-5')
 */
export function getBOMSpecPath(phaseId: string, itemSlug: string, modelId: string): string {
	const model = LLM_MODELS[modelId as LLMModelId];
	if (!model) return '';
	return `/content/bom-specs/${phaseId}/${itemSlug}/${model.filename}`;
}

/**
 * Build the content path for a consensus file
 * @param phaseId - The phase ID
 * @param itemSlug - The item slug
 */
export function getConsensusPath(phaseId: string, itemSlug: string): string {
	return `/content/bom-specs/${phaseId}/${itemSlug}/consensus.md`;
}

/**
 * Build the base directory path for a BOM item's specs
 * @param phaseId - The phase ID
 * @param itemSlug - The item slug
 */
export function getBOMItemDir(phaseId: string, itemSlug: string): string {
	return `/content/bom-specs/${phaseId}/${itemSlug}`;
}

/**
 * Get all spec file paths for a BOM item
 * @param phaseId - The phase ID
 * @param itemSlug - The item slug
 */
export function getAllSpecPaths(phaseId: string, itemSlug: string): Record<string, string> {
	const paths: Record<string, string> = {};
	for (const [modelId, model] of Object.entries(LLM_MODELS)) {
		paths[modelId] = `/content/bom-specs/${phaseId}/${itemSlug}/${model.filename}`;
	}
	paths['consensus'] = getConsensusPath(phaseId, itemSlug);
	return paths;
}

/**
 * Build the content path for a divergent views YAML file
 * @param phaseId - The phase ID
 * @param itemSlug - The item slug
 */
export function getDivergentViewsPath(phaseId: string, itemSlug: string): string {
	return `/content/bom-specs/${phaseId}/${itemSlug}/divergent-views.yaml`;
}
