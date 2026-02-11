#!/usr/bin/env node

/**
 * Bootstrap Ontology Script
 *
 * Scans all content files, extracts every unique tag with frequency counts,
 * and reports coverage against the current taxonomy.yaml.
 *
 * Usage: node scripts/bootstrap-ontology.js
 *
 * Options:
 *   --report-only   Only report tag coverage, don't generate files
 *   --show-unmapped  Show all unmapped tags with their frequencies
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { load as yamlLoad } from 'js-yaml';

const ROOT = new URL('..', import.meta.url).pathname;
const CONTENT_DIR = join(ROOT, 'src/content');
const TAXONOMY_PATH = join(ROOT, 'src/content/ontology/taxonomy.yaml');

const args = process.argv.slice(2);
const reportOnly = args.includes('--report-only');
const showUnmapped = args.includes('--show-unmapped');

// ─── Scan all content files for tags ───

function walkDir(dir, files = []) {
	if (!existsSync(dir)) return files;
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		const stat = statSync(full);
		if (stat.isDirectory()) {
			walkDir(full, files);
		} else if (entry.endsWith('.md') || entry.endsWith('.yaml') || entry.endsWith('.yml')) {
			files.push(full);
		}
	}
	return files;
}

function extractTagsFromMarkdown(content) {
	const tags = [];
	const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
	if (!fmMatch) return tags;

	const fm = fmMatch[1];
	const lines = fm.split('\n');
	let inTags = false;

	for (const line of lines) {
		if (/^tags:\s*$/.test(line.trim()) || /^tags:$/.test(line.trim())) {
			inTags = true;
			continue;
		}
		if (inTags) {
			const match = line.match(/^\s+-\s+"?([^"]+)"?\s*$/);
			if (match) {
				tags.push(match[1].trim());
			} else if (!line.match(/^\s+-/)) {
				inTags = false;
			}
		}
	}
	return tags;
}

function extractTagsFromYaml(content) {
	const tags = [];
	try {
		const data = yamlLoad(content);
		function findTags(obj) {
			if (!obj || typeof obj !== 'object') return;
			if (Array.isArray(obj)) {
				obj.forEach(findTags);
				return;
			}
			if (obj.tags && Array.isArray(obj.tags)) {
				tags.push(...obj.tags);
			}
			for (const val of Object.values(obj)) {
				findTags(val);
			}
		}
		findTags(data);
	} catch {
		// skip malformed yaml
	}
	return tags;
}

// ─── Load taxonomy ───

function loadTaxonomy() {
	if (!existsSync(TAXONOMY_PATH)) {
		console.error('No taxonomy.yaml found at', TAXONOMY_PATH);
		process.exit(1);
	}
	const content = readFileSync(TAXONOMY_PATH, 'utf-8');
	return yamlLoad(content);
}

// ─── Main ───

console.log('Scanning content files for tags...\n');

const allFiles = walkDir(CONTENT_DIR);
const tagFrequency = new Map();
const tagSources = new Map();

for (const file of allFiles) {
	const content = readFileSync(file, 'utf-8');
	const relPath = relative(ROOT, file);

	let tags = [];
	if (file.endsWith('.md')) {
		tags = extractTagsFromMarkdown(content);
	} else {
		tags = extractTagsFromYaml(content);
	}

	for (const tag of tags) {
		tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1);
		if (!tagSources.has(tag)) tagSources.set(tag, []);
		tagSources.get(tag).push(relPath);
	}
}

// Sort by frequency
const sortedTags = [...tagFrequency.entries()].sort((a, b) => b[1] - a[1]);

console.log(`Found ${sortedTags.length} unique tags across ${allFiles.length} files\n`);

// Load taxonomy and build reverse index
const taxonomy = loadTaxonomy();
const tagToTopic = new Map();
let topicCount = 0;

for (const domain of taxonomy.domains || []) {
	for (const topic of domain.topics || []) {
		topicCount++;
		for (const lt of topic.legacyTags || []) {
			const key = lt.toLowerCase();
			if (!tagToTopic.has(key)) tagToTopic.set(key, []);
			tagToTopic.get(key).push(`${domain.id}/${topic.id}`);
		}
	}
}

console.log(`Taxonomy: ${(taxonomy.domains || []).length} domains, ${topicCount} topics\n`);

// Check coverage
let mapped = 0;
let unmapped = 0;
const unmappedTags = [];

for (const [tag, count] of sortedTags) {
	if (tagToTopic.has(tag.toLowerCase())) {
		mapped++;
	} else {
		unmapped++;
		unmappedTags.push({ tag, count });
	}
}

const coverage = sortedTags.length > 0 ? ((mapped / sortedTags.length) * 100).toFixed(1) : '0';

console.log('─── Coverage Report ───');
console.log(`Mapped tags:   ${mapped}/${sortedTags.length} (${coverage}%)`);
console.log(`Unmapped tags: ${unmapped}`);
console.log();

if (showUnmapped && unmappedTags.length > 0) {
	console.log('─── Unmapped Tags (by frequency) ───');
	for (const { tag, count } of unmappedTags) {
		const sources = tagSources.get(tag) || [];
		const sourceTypes = [...new Set(sources.map((s) => {
			if (s.includes('research-questions')) return 'RQ';
			if (s.includes('blog')) return 'Blog';
			if (s.includes('validations')) return 'Val';
			if (s.includes('validation-roadmap')) return 'Road';
			if (s.includes('organizations')) return 'Org';
			return 'Other';
		}))];
		console.log(`  ${tag} (${count}x) [${sourceTypes.join(', ')}]`);
	}
	console.log();
}

// Top 20 most common tags
console.log('─── Top 20 Tags ───');
for (const [tag, count] of sortedTags.slice(0, 20)) {
	const status = tagToTopic.has(tag.toLowerCase()) ? '  ' : '!!';
	const topics = tagToTopic.get(tag.toLowerCase()) || [];
	const topicStr = topics.length > 0 ? ` -> ${topics[0]}` : '';
	console.log(`${status} ${tag} (${count}x)${topicStr}`);
}

if (!reportOnly) {
	console.log('\nTaxonomy file exists at:', relative(ROOT, TAXONOMY_PATH));
	console.log('Edit taxonomy.yaml to add unmapped tags to appropriate topics.');
}
