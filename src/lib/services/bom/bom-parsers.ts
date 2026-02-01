/**
 * BOM Parsers
 *
 * Provides parsing utilities for BOM spec content including
 * frontmatter extraction and markdown section parsing.
 */

import yaml from 'js-yaml';
import type { DivergentViewsData } from '$lib/types/divergent-views';

/**
 * Frontmatter data from BOM spec files
 */
export interface BOMSpecFrontmatter {
	generated?: string;
	date?: string;
	model?: string;
	phase?: string;
	item?: string;
	[key: string]: string | undefined;
}

/**
 * Parse frontmatter from markdown content
 * @param content - Raw markdown content with frontmatter
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
 * Parse consensus document sections
 * @param body - Markdown body content (without frontmatter)
 */
export function parseConsensusSections(body: string): {
	keySpecs: string[];
	divergentViews: string[];
	openQuestions: string[];
	recommendedApproach: string;
} {
	return {
		keySpecs: extractListSection(body, 'Key Specifications'),
		divergentViews: extractListSection(body, 'Divergent Views'),
		openQuestions: extractListSection(body, 'Open Questions'),
		recommendedApproach: extractTextSection(body, 'Recommended Approach')
	};
}

/**
 * Extract a list section from markdown content
 * @param content - Markdown content
 * @param sectionName - Section heading name
 */
export function extractListSection(content: string, sectionName: string): string[] {
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
 * @param content - Markdown content
 * @param sectionName - Section heading name
 */
export function extractTextSection(content: string, sectionName: string): string {
	const sectionRegex = new RegExp(
		`## ${sectionName}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`,
		'i'
	);
	const match = content.match(sectionRegex);

	if (!match) return '';

	return match[1].trim();
}

/**
 * Parse a BOM spec markdown file
 * @param content - Raw markdown content
 * @param modelId - The model ID for this spec
 * @param modelName - The display name for this model
 */
export function parseBOMSpec(
	content: string,
	modelId: string,
	modelName: string
): {
	modelId: string;
	modelName: string;
	content: string;
	generatedDate: string;
} {
	const { frontmatter, body } = parseFrontmatter(content);

	return {
		modelId,
		modelName,
		content: body,
		generatedDate: frontmatter.generated || frontmatter.date || 'Unknown'
	};
}

/**
 * Parse divergent views YAML content
 * @param content - Raw YAML content
 */
export function parseDivergentViewsYAML(content: string): DivergentViewsData | null {
	try {
		return yaml.load(content) as DivergentViewsData;
	} catch {
		return null;
	}
}
