/**
 * Markdown and Frontmatter Parsing Utilities
 *
 * Provides consistent markdown parsing using gray-matter and marked
 * throughout the application.
 */

import matter from 'gray-matter';
import { Marked } from 'marked';

// Singleton marked instance with consistent config
const markedInstance = new Marked({
	gfm: true,
	breaks: false
});

/**
 * Parse markdown content with frontmatter using gray-matter
 * @param content - Raw markdown content with optional frontmatter
 */
export function parseMarkdown<T extends Record<string, unknown> = Record<string, string>>(
	content: string
): { frontmatter: T; body: string } {
	const { data, content: body } = matter(content);
	return {
		frontmatter: data as T,
		body
	};
}

/**
 * Parse frontmatter from markdown content (manual parsing fallback)
 * Use this when gray-matter is not available or for simple cases
 * @param content - Raw markdown content
 */
export function parseFrontmatterManual(
	content: string
): { frontmatter: Record<string, string>; body: string } {
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
 * Render markdown to HTML
 * @param content - Markdown content
 */
export function renderMarkdown(content: string): string {
	return markedInstance.parse(content) as string;
}

/**
 * Get the configured marked instance for custom rendering
 */
export function getMarkedInstance(): Marked {
	return markedInstance;
}

/**
 * Extract a specific section from markdown content by heading name
 * @param content - Markdown content
 * @param sectionName - The heading text to find (without # prefix)
 * @param headingLevel - The heading level to search for (default: 2 for ##)
 */
export function extractSection(
	content: string,
	sectionName: string,
	headingLevel = 2
): string {
	const prefix = '#'.repeat(headingLevel);
	const sectionRegex = new RegExp(
		`${prefix}\\s*${escapeRegex(sectionName)}\\s*\\n([\\s\\S]*?)(?=\\n${prefix}\\s|$)`,
		'i'
	);
	const match = content.match(sectionRegex);
	return match ? match[1].trim() : '';
}

/**
 * Extract a list from a markdown section
 * @param content - Markdown content
 * @param sectionName - The heading text to find
 */
export function extractListFromSection(content: string, sectionName: string): string[] {
	const sectionContent = extractSection(content, sectionName);
	if (!sectionContent) return [];

	const items: string[] = [];
	const listItemRegex = /^[\s]*[-*\d.]+\s+(.+)$/gm;
	let match;

	while ((match = listItemRegex.exec(sectionContent)) !== null) {
		items.push(match[1].trim());
	}

	return items;
}

/**
 * Extract all headings from markdown content
 * @param content - Markdown content
 * @param level - Optional specific heading level to extract
 */
export function extractHeadings(
	content: string,
	level?: number
): Array<{ level: number; text: string }> {
	const headings: Array<{ level: number; text: string }> = [];
	const headingRegex = /^(#{1,6})\s+(.+)$/gm;
	let match;

	while ((match = headingRegex.exec(content)) !== null) {
		const headingLevel = match[1].length;
		if (level === undefined || level === headingLevel) {
			headings.push({
				level: headingLevel,
				text: match[2].trim()
			});
		}
	}

	return headings;
}

/**
 * Strip markdown formatting from text
 * @param text - Text with markdown formatting
 */
export function stripMarkdown(text: string): string {
	return text
		.replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
		.replace(/\*([^*]+)\*/g, '$1') // Italic
		.replace(/__([^_]+)__/g, '$1') // Bold underscore
		.replace(/_([^_]+)_/g, '$1') // Italic underscore
		.replace(/`([^`]+)`/g, '$1') // Inline code
		.replace(/~~([^~]+)~~/g, '$1') // Strikethrough
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
		.replace(/^#+\s+/gm, '') // Headings
		.replace(/^[-*+]\s+/gm, '') // List items
		.replace(/^\d+\.\s+/gm, '') // Numbered lists
		.replace(/^>\s+/gm, '') // Blockquotes
		.trim();
}

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
