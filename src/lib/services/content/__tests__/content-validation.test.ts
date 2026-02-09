/**
 * Content Validation Tests
 *
 * Validates that all markdown content files have required frontmatter fields
 * and that internal links point to valid destinations.
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PROJECT_ROOT = path.resolve(__dirname, '../../../../..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src/content');

/**
 * Recursively find all markdown files in a directory
 */
function findMarkdownFiles(dir: string): string[] {
	const files: string[] = [];

	if (!fs.existsSync(dir)) {
		return files;
	}

	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...findMarkdownFiles(fullPath));
		} else if (entry.name.endsWith('.md')) {
			files.push(fullPath);
		}
	}

	return files;
}

/**
 * Parse frontmatter from a markdown file
 */
function parseFrontmatter(filePath: string): { data: Record<string, unknown>; content: string } {
	const content = fs.readFileSync(filePath, 'utf-8');
	return matter(content);
}

/**
 * Check if a file is a research question (not a discussion/conclusion file)
 */
function isQuestionFile(filePath: string): boolean {
	const filename = path.basename(filePath);
	// Match rq-X-Y-slug.md pattern (supports phase-3a, phase-3b)
	return /^rq-\d+[a-z]?-\d+-[^/]+\.md$/.test(filename);
}

describe('Content Validation', () => {
	describe('Research Questions', () => {
		const questionsDir = path.join(CONTENT_DIR, 'research-questions');
		const allFiles = findMarkdownFiles(questionsDir);
		const questionFiles = allFiles.filter(isQuestionFile);

		it('should find research question files', () => {
			expect(questionFiles.length).toBeGreaterThan(0);
		});

		const requiredFields = [
			'questionId',
			'slug',
			'title',
			'sourcePhase',
			'sourceBOMItemId',
			'sourceBOMItemSlug'
		];

		for (const file of questionFiles) {
			const relativePath = path.relative(PROJECT_ROOT, file);

			describe(relativePath, () => {
				const { data: frontmatter } = parseFrontmatter(file);

				for (const field of requiredFields) {
					it(`should have required field: ${field}`, () => {
						expect(frontmatter[field], `Missing required field "${field}" in ${relativePath}`).toBeDefined();
						expect(frontmatter[field], `Empty field "${field}" in ${relativePath}`).not.toBe('');
					});
				}

				it('should have valid questionId format', () => {
					const questionId = frontmatter.questionId as string;
					expect(questionId).toMatch(/^rq-\d+[a-z]?-\d+$/);
				});

				it('should have valid sourcePhase format', () => {
					const sourcePhase = frontmatter.sourcePhase as string;
					expect(sourcePhase).toMatch(/^phase-\d+[a-z]?$/);
				});

				it('should have valid sourceBOMItemId format', () => {
					const bomId = frontmatter.sourceBOMItemId as string;
					expect(bomId).toMatch(/^bom-\d+[a-z]?-\d+$/);
				});
			});
		}
	});

	describe('Blog Posts', () => {
		const blogDir = path.join(CONTENT_DIR, 'blog');
		const blogFiles = findMarkdownFiles(blogDir);

		it('should find blog post files', () => {
			expect(blogFiles.length).toBeGreaterThan(0);
		});

		const requiredFields = ['slug', 'title', 'description', 'author', 'date', 'category'];

		for (const file of blogFiles) {
			const relativePath = path.relative(PROJECT_ROOT, file);

			describe(relativePath, () => {
				const { data: frontmatter } = parseFrontmatter(file);

				for (const field of requiredFields) {
					it(`should have required field: ${field}`, () => {
						expect(frontmatter[field], `Missing required field "${field}" in ${relativePath}`).toBeDefined();
						expect(frontmatter[field], `Empty field "${field}" in ${relativePath}`).not.toBe('');
					});
				}

				it('should have valid date format', () => {
					const date = frontmatter.date as string;
					expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
				});

				it('should have valid category', () => {
					const validCategories = ['Research Resolutions', 'Announcements', 'Research', 'Technical'];
					const category = frontmatter.category as string;
					expect(validCategories).toContain(category);
				});

				it('should have tags array', () => {
					expect(Array.isArray(frontmatter.tags)).toBe(true);
				});
			});
		}
	});

	describe('Internal Links', () => {
		const allContentFiles = findMarkdownFiles(CONTENT_DIR);

		// Collect all valid slugs for link checking
		const validQuestionSlugs = new Set<string>();
		const validBlogSlugs = new Set<string>();

		for (const file of allContentFiles) {
			const { data: frontmatter } = parseFrontmatter(file);
			if (frontmatter.slug) {
				if (file.includes('/research-questions/') && isQuestionFile(file)) {
					validQuestionSlugs.add(frontmatter.slug as string);
				} else if (file.includes('/blog/')) {
					validBlogSlugs.add(frontmatter.slug as string);
				}
			}
		}

		it('should have collected valid slugs', () => {
			expect(validQuestionSlugs.size).toBeGreaterThan(0);
			expect(validBlogSlugs.size).toBeGreaterThan(0);
		});

		// Check for broken internal links in all content
		for (const file of allContentFiles) {
			const relativePath = path.relative(PROJECT_ROOT, file);
			const { content } = parseFrontmatter(file);

			// Find all internal links to /questions/ or /blog/
			const questionLinks = content.match(/\[([^\]]+)\]\(\/questions\/([^)]+)\)/g) || [];
			const blogLinks = content.match(/\[([^\]]+)\]\(\/blog\/([^)]+)\)/g) || [];

			for (const link of questionLinks) {
				const slugMatch = link.match(/\/questions\/([^)/]+)/);
				if (slugMatch) {
					// Extract base slug (ignore subpaths like /simulator)
					const slug = slugMatch[1];
					it(`${relativePath}: link to /questions/${slug} should be valid`, () => {
						expect(
							validQuestionSlugs.has(slug),
							`Broken link to /questions/${slug} in ${relativePath}`
						).toBe(true);
					});
				}
			}

			for (const link of blogLinks) {
				const slugMatch = link.match(/\/blog\/([^)/]+)/);
				if (slugMatch) {
					const slug = slugMatch[1];
					it(`${relativePath}: link to /blog/${slug} should be valid`, () => {
						expect(
							validBlogSlugs.has(slug),
							`Broken link to /blog/${slug} in ${relativePath}`
						).toBe(true);
					});
				}
			}
		}
	});
});
