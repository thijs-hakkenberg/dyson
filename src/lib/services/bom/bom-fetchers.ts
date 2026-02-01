/**
 * BOM Fetchers
 *
 * Provides async functions for fetching BOM specs and consensus documents.
 */

import type { BOMItemSpec } from '$lib/types';
import type { DivergentViewsData } from '$lib/types/divergent-views';
import { LLM_MODELS, getBOMItemBySlug, type LLMModelId } from './bom-data';
import { getBOMSpecPath, getConsensusPath, getDivergentViewsPath } from './bom-paths';
import { parseFrontmatter, parseConsensusSections, parseBOMSpec, parseDivergentViewsYAML } from './bom-parsers';

/**
 * Fetch and parse a single BOM spec file
 * @param phaseId - The phase ID
 * @param itemSlug - The item slug
 * @param modelId - The model ID
 */
export async function fetchBOMSpec(
	phaseId: string,
	itemSlug: string,
	modelId: string
): Promise<{ modelId: string; modelName: string; content: string; generatedDate: string } | null> {
	const path = getBOMSpecPath(phaseId, itemSlug, modelId);
	if (!path) return null;

	try {
		const response = await fetch(path);
		if (!response.ok) return null;

		const content = await response.text();
		const model = LLM_MODELS[modelId as LLMModelId];

		return parseBOMSpec(content, modelId, model?.name || modelId);
	} catch {
		return null;
	}
}

/**
 * Fetch all specs for a BOM item (all models + consensus + divergent views)
 * @param phaseId - The phase ID
 * @param itemSlug - The item slug
 */
export async function fetchAllBOMSpecs(
	phaseId: string,
	itemSlug: string
): Promise<BOMItemSpec | null> {
	const item = getBOMItemBySlug(itemSlug);
	if (!item) return null;

	const modelIds = Object.keys(LLM_MODELS);
	const specPromises = modelIds.map((modelId) => fetchBOMSpec(phaseId, itemSlug, modelId));
	const consensusPromise = fetchConsensus(phaseId, itemSlug);
	const divergentViewsPromise = fetchDivergentViews(phaseId, itemSlug);

	const [specs, consensus, divergentViewsData] = await Promise.all([
		Promise.all(specPromises),
		consensusPromise,
		divergentViewsPromise
	]);

	const validSpecs = specs.filter((s): s is NonNullable<typeof s> => s !== null);

	return {
		bomId: item.bomId,
		phaseId,
		itemSlug,
		itemName: item.name,
		specs: validSpecs,
		consensus: consensus || {
			keySpecs: [],
			divergentViews: [],
			openQuestions: [],
			recommendedApproach: ''
		},
		divergentViewsData
	};
}

/**
 * Fetch and parse a consensus document
 * @param phaseId - The phase ID
 * @param itemSlug - The item slug
 */
export async function fetchConsensus(
	phaseId: string,
	itemSlug: string
): Promise<BOMItemSpec['consensus'] | null> {
	const path = getConsensusPath(phaseId, itemSlug);

	try {
		const response = await fetch(path);
		if (!response.ok) return null;

		const content = await response.text();
		const { body } = parseFrontmatter(content);

		return parseConsensusSections(body);
	} catch {
		return null;
	}
}

/**
 * Fetch and parse structured divergent views YAML
 * @param phaseId - The phase ID
 * @param itemSlug - The item slug
 */
export async function fetchDivergentViews(
	phaseId: string,
	itemSlug: string
): Promise<DivergentViewsData | null> {
	const path = getDivergentViewsPath(phaseId, itemSlug);

	try {
		const response = await fetch(path);
		if (!response.ok) return null;

		const content = await response.text();
		return parseDivergentViewsYAML(content);
	} catch {
		return null;
	}
}

/**
 * Check if specs exist for a BOM item
 * @param phaseId - The phase ID
 * @param itemSlug - The item slug
 */
export async function checkSpecsExist(
	phaseId: string,
	itemSlug: string
): Promise<{
	hasConsensus: boolean;
	availableModels: string[];
}> {
	const modelIds = Object.keys(LLM_MODELS);

	const checks = await Promise.all([
		// Check consensus
		fetch(getConsensusPath(phaseId, itemSlug), { method: 'HEAD' })
			.then((r) => r.ok)
			.catch(() => false),
		// Check each model
		...modelIds.map((modelId) =>
			fetch(getBOMSpecPath(phaseId, itemSlug, modelId), { method: 'HEAD' })
				.then((r) => (r.ok ? modelId : null))
				.catch(() => null)
		)
	]);

	const [hasConsensus, ...modelResults] = checks;

	return {
		hasConsensus: hasConsensus as boolean,
		availableModels: modelResults.filter((m): m is string => m !== null)
	};
}
