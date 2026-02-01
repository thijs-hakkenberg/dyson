/**
 * Questions Parsers
 *
 * Provides parsing utilities for research question markdown files including
 * frontmatter extraction and content body parsing.
 */

import type {
	ResearchQuestion,
	ResearchQuestionId,
	PhaseId,
	BOMItemId,
	QuestionType,
	Priority,
	ResearchQuestionStatus
} from '$lib/types/entities';

/**
 * Frontmatter data from question markdown files
 */
export interface QuestionFrontmatter {
	questionId: string;
	slug: string;
	title: string;
	questionType: QuestionType;
	priority: Priority;
	status: ResearchQuestionStatus;
	sourcePhase: string;
	sourceBOMItemId: string;
	sourceBOMItemSlug: string;
	sourceBOMItemName: string;
	relatedBOMItems: string[];
	tags: string[];
	createdDate: string;
	answer?: string;
	references?: string[];
}

/**
 * Parse frontmatter from markdown content
 * Returns both the frontmatter object and the remaining body content
 */
export function parseQuestionFrontmatter(content: string): {
	frontmatter: Partial<QuestionFrontmatter>;
	body: string;
} {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		return { frontmatter: {}, body: content };
	}

	const frontmatterStr = match[1];
	const body = match[2].trim();

	const frontmatter: Partial<QuestionFrontmatter> = {};

	// Parse YAML-like frontmatter
	const lines = frontmatterStr.split('\n');
	let currentKey = '';
	let inArray = false;
	let arrayItems: string[] = [];

	for (const line of lines) {
		const trimmedLine = line.trim();

		// Handle array items
		if (inArray) {
			if (trimmedLine.startsWith('- ')) {
				const value = trimmedLine.slice(2).trim().replace(/^["']|["']$/g, '');
				arrayItems.push(value);
				continue;
			} else {
				// End of array
				(frontmatter as Record<string, unknown>)[currentKey] = arrayItems;
				inArray = false;
				arrayItems = [];
			}
		}

		// Handle key: value pairs
		const colonIndex = line.indexOf(':');
		if (colonIndex > 0) {
			const key = line.slice(0, colonIndex).trim();
			const rawValue = line.slice(colonIndex + 1).trim();

			// Check if this is the start of an array
			if (rawValue === '' || rawValue === '[]') {
				currentKey = key;
				inArray = rawValue !== '[]';
				arrayItems = [];
				if (rawValue === '[]') {
					(frontmatter as Record<string, unknown>)[key] = [];
				}
			} else {
				// Regular key-value pair
				const value = rawValue.replace(/^["']|["']$/g, '');
				(frontmatter as Record<string, unknown>)[key] = value;
			}
		}
	}

	// Handle trailing array
	if (inArray && arrayItems.length > 0) {
		(frontmatter as Record<string, unknown>)[currentKey] = arrayItems;
	}

	return { frontmatter, body };
}

/**
 * Parse array values from frontmatter that might be inline JSON or YAML list
 */
function parseArrayValue(value: string): string[] {
	if (!value || value === '[]') return [];

	// Try parsing as JSON array
	if (value.startsWith('[')) {
		try {
			const parsed = JSON.parse(value);
			if (Array.isArray(parsed)) {
				return parsed.map((item) => String(item).replace(/^["']|["']$/g, ''));
			}
		} catch {
			// Fall through to manual parsing
		}
	}

	// Manual parsing for inline arrays like [item1, item2]
	const inner = value.replace(/^\[|\]$/g, '');
	if (!inner.trim()) return [];

	return inner.split(',').map((item) => item.trim().replace(/^["']|["']$/g, ''));
}

/**
 * Convert parsed frontmatter to a ResearchQuestion object
 */
export function frontmatterToQuestion(
	frontmatter: Partial<QuestionFrontmatter>,
	body: string
): ResearchQuestion | null {
	// Validate required fields
	if (
		!frontmatter.questionId ||
		!frontmatter.slug ||
		!frontmatter.title ||
		!frontmatter.sourcePhase ||
		!frontmatter.sourceBOMItemId ||
		!frontmatter.sourceBOMItemSlug
	) {
		return null;
	}

	// Handle relatedBOMItems - could be string or array
	let relatedBOMItems: BOMItemId[] = [];
	const rawRelated = frontmatter.relatedBOMItems;
	if (typeof rawRelated === 'string') {
		relatedBOMItems = parseArrayValue(rawRelated) as BOMItemId[];
	} else if (Array.isArray(rawRelated)) {
		relatedBOMItems = rawRelated as BOMItemId[];
	}

	// Handle tags - could be string or array
	let tags: string[] = [];
	const rawTags = frontmatter.tags;
	if (typeof rawTags === 'string') {
		tags = parseArrayValue(rawTags);
	} else if (Array.isArray(rawTags)) {
		tags = rawTags;
	}

	// Handle references - could be string or array
	let references: string[] | undefined;
	const rawRefs = frontmatter.references;
	if (typeof rawRefs === 'string') {
		references = parseArrayValue(rawRefs);
		if (references.length === 0) references = undefined;
	} else if (Array.isArray(rawRefs) && rawRefs.length > 0) {
		references = rawRefs;
	}

	return {
		id: frontmatter.questionId as ResearchQuestionId,
		slug: frontmatter.slug,
		title: frontmatter.title,
		description: extractDescription(body) || frontmatter.title,
		context: body,
		sourceBOMItemName: frontmatter.sourceBOMItemName || frontmatter.sourceBOMItemSlug,
		questionType: (frontmatter.questionType as QuestionType) || 'engineering-decision',
		priority: (frontmatter.priority as Priority) || 'medium',
		status: (frontmatter.status as ResearchQuestionStatus) || 'open',
		sourcePhaseId: frontmatter.sourcePhase as PhaseId,
		sourceBOMItemId: frontmatter.sourceBOMItemId as BOMItemId,
		sourceBOMItemSlug: frontmatter.sourceBOMItemSlug,
		relatedBOMItems,
		relatedQuestionIds: [],
		createdDate: frontmatter.createdDate || new Date().toISOString().split('T')[0],
		tags,
		answer: frontmatter.answer,
		references
	};
}

/**
 * Extract the first paragraph or summary from the markdown body as a description
 */
function extractDescription(body: string): string {
	if (!body) return '';

	// Find the first non-heading paragraph
	const lines = body.split('\n');
	let description = '';
	let inParagraph = false;

	for (const line of lines) {
		const trimmed = line.trim();

		// Skip headings
		if (trimmed.startsWith('#')) {
			if (inParagraph) break;
			continue;
		}

		// Skip empty lines at the start
		if (!trimmed && !inParagraph) continue;

		// End paragraph on empty line
		if (!trimmed && inParagraph) break;

		// Accumulate paragraph text
		inParagraph = true;
		description += (description ? ' ' : '') + trimmed;
	}

	// Truncate if too long
	if (description.length > 300) {
		description = description.slice(0, 297) + '...';
	}

	return description;
}

/**
 * Parse a complete question markdown file
 */
export function parseQuestionFile(content: string): ResearchQuestion | null {
	const { frontmatter, body } = parseQuestionFrontmatter(content);
	return frontmatterToQuestion(frontmatter, body);
}

/**
 * Generate the expected filename for a question
 */
export function getQuestionFilename(questionId: string, slug: string): string {
	return `${questionId}-${slug}.md`;
}
