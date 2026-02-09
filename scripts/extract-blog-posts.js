#!/usr/bin/env node

/**
 * Migration script to extract blog posts from blog.ts into individual markdown files.
 *
 * Usage: node scripts/extract-blog-posts.js
 *
 * This script:
 * 1. Parses the BLOG_POSTS array from src/lib/services/blog.ts
 * 2. Generates markdown files with frontmatter for each post
 * 3. Organizes files by category into subdirectories
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const BLOG_TS_PATH = path.join(PROJECT_ROOT, 'src/lib/services/blog.ts');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'src/content/blog');

// Map category names to directory slugs
const CATEGORY_TO_DIR = {
	'Research Resolutions': 'research-resolutions',
	Announcements: 'announcements',
	Research: 'research',
	Technical: 'technical'
};

/**
 * Parse a TypeScript string value (handles single quotes, double quotes, and multiline concatenation)
 */
function parseStringValue(str) {
	// Handle string concatenation with + operator
	// E.g., 'line1' +\n\t\t\t'line2'
	let result = '';

	// Split by the + concatenation pattern
	const parts = str.split(/['"][\s]*\+[\s\n\t]*['"]/);

	for (let part of parts) {
		// Remove leading/trailing quotes
		part = part.trim();
		if (part.startsWith("'") || part.startsWith('"')) {
			part = part.slice(1);
		}
		if (part.endsWith("'") || part.endsWith('"')) {
			part = part.slice(0, -1);
		}
		// Handle escape sequences
		part = part.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n');
		result += part;
	}

	return result;
}

/**
 * Extract blog posts by parsing the TypeScript file character by character
 */
function extractBlogPosts(content) {
	const posts = [];

	// Find the start of BLOG_POSTS array assignment (after the type annotation)
	const assignmentMatch = content.match(/export const BLOG_POSTS:\s*BlogPost\[\]\s*=\s*\[/);
	if (!assignmentMatch) {
		throw new Error('Could not find BLOG_POSTS array');
	}

	// Find the position right after the opening [
	let pos = content.indexOf(assignmentMatch[0]) + assignmentMatch[0].length;

	// Parse each post object
	while (pos < content.length) {
		// Skip whitespace and find next object start
		while (pos < content.length && /[\s,]/.test(content[pos])) pos++;

		if (content[pos] === ']') break; // End of array

		if (content[pos] !== '{') {
			pos++;
			continue;
		}

		// Parse the object
		const post = parsePostObject(content, pos);
		if (post.result) {
			posts.push(post.result);
		}
		pos = post.endPos;
	}

	return posts;
}

/**
 * Parse a single post object from the content starting at pos
 */
function parsePostObject(content, startPos) {
	const post = {
		slug: '',
		title: '',
		description: '',
		author: '',
		date: '',
		tags: [],
		category: '',
		content: '',
		relatedPhases: []
	};

	let pos = startPos + 1; // Skip opening {
	let depth = 1;

	while (pos < content.length && depth > 0) {
		// Skip whitespace
		while (pos < content.length && /\s/.test(content[pos])) pos++;

		if (content[pos] === '}') {
			depth--;
			pos++;
			continue;
		}

		if (content[pos] === '{') {
			depth++;
			pos++;
			continue;
		}

		// Parse field name
		const fieldMatch = content.slice(pos).match(/^(\w+)\s*:/);
		if (!fieldMatch) {
			pos++;
			continue;
		}

		const fieldName = fieldMatch[1];
		pos += fieldMatch[0].length;

		// Skip whitespace
		while (pos < content.length && /\s/.test(content[pos])) pos++;

		// Parse field value based on type
		if (fieldName === 'content') {
			// Template string
			if (content[pos] === '`') {
				pos++; // Skip opening backtick
				let templateContent = '';
				let templateDepth = 0;

				while (pos < content.length) {
					if (content[pos] === '\\') {
						templateContent += content[pos] + content[pos + 1];
						pos += 2;
						continue;
					}
					if (content[pos] === '$' && content[pos + 1] === '{') {
						templateDepth++;
						templateContent += content[pos];
						pos++;
						continue;
					}
					if (content[pos] === '}' && templateDepth > 0) {
						templateDepth--;
						templateContent += content[pos];
						pos++;
						continue;
					}
					if (content[pos] === '`' && templateDepth === 0) {
						pos++; // Skip closing backtick
						break;
					}
					templateContent += content[pos];
					pos++;
				}
				post.content = templateContent;
			}
		} else if (fieldName === 'date') {
			// new Date('...')
			const dateMatch = content.slice(pos).match(/^new Date\(['"]([^'"]+)['"]\)/);
			if (dateMatch) {
				post.date = dateMatch[1];
				pos += dateMatch[0].length;
			}
		} else if (fieldName === 'tags' || fieldName === 'relatedPhases') {
			// Array of strings
			if (content[pos] === '[') {
				pos++; // Skip [
				const items = [];
				while (pos < content.length && content[pos] !== ']') {
					// Skip whitespace and commas
					while (pos < content.length && /[\s,]/.test(content[pos])) pos++;
					if (content[pos] === ']') break;

					// Parse string item
					const quote = content[pos];
					if (quote === "'" || quote === '"') {
						pos++; // Skip opening quote
						let item = '';
						while (pos < content.length && content[pos] !== quote) {
							if (content[pos] === '\\') {
								pos++;
								if (pos < content.length) {
									item += content[pos];
									pos++;
								}
								continue;
							}
							item += content[pos];
							pos++;
						}
						pos++; // Skip closing quote
						items.push(item);
					} else {
						pos++;
					}
				}
				pos++; // Skip ]
				post[fieldName] = items;
			}
		} else if (
			fieldName === 'slug' ||
			fieldName === 'title' ||
			fieldName === 'description' ||
			fieldName === 'author' ||
			fieldName === 'category'
		) {
			// String value (might be multiline with +)
			let stringValue = '';
			const quote = content[pos];

			if (quote === "'" || quote === '"') {
				pos++; // Skip opening quote
				while (pos < content.length) {
					if (content[pos] === '\\') {
						pos++;
						if (pos < content.length) {
							if (content[pos] === 'n') {
								stringValue += '\n';
							} else {
								stringValue += content[pos];
							}
							pos++;
						}
						continue;
					}
					if (content[pos] === quote) {
						pos++; // Skip closing quote

						// Check for string concatenation
						let lookAhead = pos;
						while (
							lookAhead < content.length &&
							/\s/.test(content[lookAhead])
						)
							lookAhead++;
						if (content[lookAhead] === '+') {
							// Continue to next string
							lookAhead++;
							while (
								lookAhead < content.length &&
								/\s/.test(content[lookAhead])
							)
								lookAhead++;
							if (
								content[lookAhead] === "'" ||
								content[lookAhead] === '"'
							) {
								pos = lookAhead + 1; // Skip to content of next string
								continue;
							}
						}
						break;
					}
					stringValue += content[pos];
					pos++;
				}
				post[fieldName] = stringValue;
			}
		}

		// Skip to next field (find comma or closing brace)
		while (pos < content.length && content[pos] !== ',' && content[pos] !== '}') {
			pos++;
		}
		if (content[pos] === ',') pos++;
	}

	return { result: post.slug ? post : null, endPos: pos };
}

/**
 * Generate frontmatter YAML for a post
 */
function generateFrontmatter(post) {
	const lines = [
		'---',
		`slug: "${post.slug}"`,
		`title: "${escapeYamlString(post.title)}"`,
		`description: "${escapeYamlString(post.description)}"`,
		`author: "${post.author}"`,
		`date: "${post.date}"`,
		`category: "${post.category}"`
	];

	// Tags array
	if (post.tags && post.tags.length > 0) {
		lines.push('tags:');
		for (const tag of post.tags) {
			lines.push(`  - "${tag}"`);
		}
	} else {
		lines.push('tags: []');
	}

	// Related phases (optional)
	if (post.relatedPhases && post.relatedPhases.length > 0) {
		lines.push('relatedPhases:');
		for (const phase of post.relatedPhases) {
			lines.push(`  - "${phase}"`);
		}
	}

	lines.push('---');
	return lines.join('\n');
}

function escapeYamlString(str) {
	if (!str) return '';
	// For YAML double-quoted strings, escape backslashes and double quotes
	return str
		.replace(/\\/g, '\\\\')
		.replace(/"/g, '\\"')
		.replace(/\n/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * Write a blog post to a markdown file
 */
function writeBlogPost(post) {
	const categoryDir = CATEGORY_TO_DIR[post.category] || 'uncategorized';
	const outputDir = path.join(OUTPUT_DIR, categoryDir);

	// Ensure directory exists
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	const filename = `${post.slug}.md`;
	const filepath = path.join(outputDir, filename);

	const frontmatter = generateFrontmatter(post);
	const content = `${frontmatter}\n\n${post.content.trim()}\n`;

	fs.writeFileSync(filepath, content, 'utf-8');
	console.log(`  Written: ${categoryDir}/${filename}`);
}

/**
 * Main execution
 */
function main() {
	console.log('Extracting blog posts from blog.ts...\n');

	// Read blog.ts
	const blogTsContent = fs.readFileSync(BLOG_TS_PATH, 'utf-8');

	// Parse posts
	const posts = extractBlogPosts(blogTsContent);
	console.log(`Found ${posts.length} blog posts\n`);

	if (posts.length === 0) {
		console.error('No posts found! Check the parsing logic.');
		process.exit(1);
	}

	// Create output directories
	for (const dir of Object.values(CATEGORY_TO_DIR)) {
		const fullPath = path.join(OUTPUT_DIR, dir);
		if (!fs.existsSync(fullPath)) {
			fs.mkdirSync(fullPath, { recursive: true });
		}
	}

	// Write each post
	console.log('Writing markdown files:');
	const categoryCounts = {};
	for (const post of posts) {
		writeBlogPost(post);
		categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
	}

	// Summary
	console.log('\nSummary by category:');
	for (const [category, count] of Object.entries(categoryCounts)) {
		console.log(`  ${category}: ${count} posts`);
	}

	console.log(`\nTotal: ${posts.length} posts extracted to ${OUTPUT_DIR}`);
}

main();
