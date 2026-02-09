/**
 * Blog Parsers
 *
 * Provides parsing utilities for blog post markdown files including
 * frontmatter extraction and content body parsing.
 */

import type { BlogPost } from '$lib/types';
import { parseMarkdown } from '$lib/utils/markdown';

/**
 * Frontmatter data from blog post markdown files
 */
export interface BlogFrontmatter {
	slug: string;
	title: string;
	description: string;
	author: string;
	date: string;
	category: string;
	tags: string[];
	relatedPhases?: string[];
}

/**
 * Parse array values from frontmatter that might be inline JSON or YAML list
 */
function parseArrayValue(value: unknown): string[] {
	if (!value) return [];
	if (Array.isArray(value)) return value.map(String);
	if (typeof value === 'string') {
		if (value === '[]') return [];
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
	return [];
}

/**
 * Parse a blog post markdown file into a BlogPost object
 */
export function parseBlogFile(content: string): BlogPost | null {
	const { frontmatter, body } = parseMarkdown<Partial<BlogFrontmatter>>(content);

	// Validate required fields
	if (
		!frontmatter.slug ||
		!frontmatter.title ||
		!frontmatter.description ||
		!frontmatter.author ||
		!frontmatter.date ||
		!frontmatter.category
	) {
		console.warn('Blog post missing required frontmatter fields:', frontmatter.slug || 'unknown');
		return null;
	}

	// Parse tags and relatedPhases arrays
	const tags = parseArrayValue(frontmatter.tags);
	const relatedPhases = frontmatter.relatedPhases
		? parseArrayValue(frontmatter.relatedPhases)
		: undefined;

	// Strip leading H1 if it matches the title (avoids duplicate title display)
	let processedBody = body.trim();
	const h1Match = processedBody.match(/^#\s+(.+)\n+/);
	if (h1Match) {
		processedBody = processedBody.slice(h1Match[0].length);
	}

	return {
		slug: frontmatter.slug,
		title: frontmatter.title,
		description: frontmatter.description,
		author: frontmatter.author,
		date: new Date(frontmatter.date),
		category: frontmatter.category,
		tags,
		content: processedBody,
		relatedPhases
	};
}
