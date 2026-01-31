import type { BOMItemSpec } from '$lib/types';

/**
 * BOM Item slug mappings
 */
export const BOM_ITEM_SLUGS: Record<string, string> = {
	'bom-0-1': 'prospecting-satellites',
	'bom-0-2': 'mining-robots',
	'bom-0-3': 'material-processing-station',
	'bom-0-4': 'transport-vehicles',
	'bom-0-5': 'solar-power-arrays'
};

export const SLUG_TO_BOM_ID: Record<string, string> = Object.entries(BOM_ITEM_SLUGS).reduce(
	(acc, [bomId, slug]) => {
		acc[slug] = bomId;
		return acc;
	},
	{} as Record<string, string>
);

/**
 * BOM Item metadata
 */
export interface BOMItemMeta {
	bomId: string;
	slug: string;
	name: string;
	quantity: string;
	cost: string;
	category: string;
}

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
 * Model information for display
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
};

/**
 * Get BOM item by slug
 */
export function getBOMItemBySlug(slug: string): BOMItemMeta | undefined {
	return PHASE_0_BOM_ITEMS.find((item) => item.slug === slug);
}

/**
 * Get BOM item by ID
 */
export function getBOMItemById(bomId: string): BOMItemMeta | undefined {
	return PHASE_0_BOM_ITEMS.find((item) => item.bomId === bomId);
}

/**
 * Get slug from BOM ID
 */
export function getSlugFromBOMId(bomId: string): string | undefined {
	return BOM_ITEM_SLUGS[bomId];
}

/**
 * Get BOM ID from slug
 */
export function getBOMIdFromSlug(slug: string): string | undefined {
	return SLUG_TO_BOM_ID[slug];
}

/**
 * Convert item name to slug format
 */
export function nameToSlug(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/**
 * Build the content path for a BOM spec file
 */
export function getBOMSpecPath(phaseId: string, itemSlug: string, modelId: string): string {
	const model = LLM_MODELS[modelId as keyof typeof LLM_MODELS];
	if (!model) return '';
	return `/content/bom-specs/${phaseId}/${itemSlug}/${model.filename}`;
}

/**
 * Build the content path for a consensus file
 */
export function getConsensusPath(phaseId: string, itemSlug: string): string {
	return `/content/bom-specs/${phaseId}/${itemSlug}/consensus.md`;
}

/**
 * Parse frontmatter from markdown content
 */
export function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		return { frontmatter: {}, body: content };
	}

	const frontmatterStr = match[1];
	const body = match[2];

	const frontmatter: Record<string, string> = {};
	frontmatterStr.split('\n').forEach((line) => {
		const colonIndex = line.indexOf(':');
		if (colonIndex > 0) {
			const key = line.slice(0, colonIndex).trim();
			const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
			frontmatter[key] = value;
		}
	});

	return { frontmatter, body };
}

/**
 * Fetch and parse a BOM spec file
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
		const { frontmatter, body } = parseFrontmatter(content);
		const model = LLM_MODELS[modelId as keyof typeof LLM_MODELS];

		return {
			modelId,
			modelName: model?.name || modelId,
			content: body,
			generatedDate: frontmatter.generated || frontmatter.date || 'Unknown'
		};
	} catch {
		return null;
	}
}

/**
 * Fetch all specs for a BOM item
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

	const [specs, consensus] = await Promise.all([
		Promise.all(specPromises),
		consensusPromise
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
		}
	};
}

/**
 * Fetch and parse consensus document
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

		// Parse sections from the consensus document
		const keySpecs = extractListSection(body, 'Key Specifications');
		const divergentViews = extractListSection(body, 'Divergent Views');
		const openQuestions = extractListSection(body, 'Open Questions');
		const recommendedApproach = extractTextSection(body, 'Recommended Approach');

		return {
			keySpecs,
			divergentViews,
			openQuestions,
			recommendedApproach
		};
	} catch {
		return null;
	}
}

/**
 * Extract a list section from markdown content
 */
function extractListSection(content: string, sectionName: string): string[] {
	const sectionRegex = new RegExp(
		`## ${sectionName}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`,
		'i'
	);
	const match = content.match(sectionRegex);

	if (!match) return [];

	const sectionContent = match[1];
	const items: string[] = [];

	// Match list items (- or * or numbered)
	const listItemRegex = /^[\s]*[-*\d.]+\s+(.+)$/gm;
	let listMatch;

	while ((listMatch = listItemRegex.exec(sectionContent)) !== null) {
		items.push(listMatch[1].trim());
	}

	return items;
}

/**
 * Extract a text section from markdown content
 */
function extractTextSection(content: string, sectionName: string): string {
	const sectionRegex = new RegExp(
		`## ${sectionName}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`,
		'i'
	);
	const match = content.match(sectionRegex);

	if (!match) return '';

	return match[1].trim();
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
