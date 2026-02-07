/**
 * Questions Fetchers
 *
 * Provides async functions for fetching research questions from markdown files.
 * Uses Vite's import.meta.glob for build-time loading to support prerendering.
 */

import type { ResearchQuestion, PhaseId } from '$lib/types/entities';
import { parseQuestionFile } from './questions-parsers';

// Use import.meta.glob to load all question markdown files at build time
// This enables prerendering by making files available during the build process
const questionFiles = import.meta.glob('/src/content/research-questions/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: false
}) as Record<string, () => Promise<string>>;

/**
 * Filter to only include question files (rq-*.md directly in phase directories)
 * Excludes discussion files like conclusion.md and round response files
 */
function isQuestionFile(path: string): boolean {
	// Must match pattern: /phase-X/rq-X-Y-slug.md (not in subdirectories)
	return /\/phase-\d+\/rq-\d+-\d+-[^/]+\.md$/.test(path);
}

/**
 * Cache for loaded questions to avoid redundant fetches
 */
let questionsCache: ResearchQuestion[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60000; // 1 minute cache

/**
 * Fetch a single question by slug
 */
export async function fetchQuestion(slug: string): Promise<ResearchQuestion | null> {
	// First try to find in cache
	const cached = await fetchAllQuestions();
	const question = cached.find((q) => q.slug === slug);
	return question || null;
}

/**
 * Fetch a single question by ID
 */
export async function fetchQuestionById(id: string): Promise<ResearchQuestion | null> {
	const cached = await fetchAllQuestions();
	const question = cached.find((q) => q.id === id);
	return question || null;
}

/**
 * Fetch all questions for a specific phase
 */
export async function fetchQuestionsForPhase(phaseId: PhaseId): Promise<ResearchQuestion[]> {
	const allQuestions = await fetchAllQuestions();
	return allQuestions.filter((q) => q.sourcePhaseId === phaseId);
}

/**
 * Fetch questions for a specific BOM item by ID
 */
export async function fetchQuestionsForBOMItem(bomItemId: string): Promise<ResearchQuestion[]> {
	const allQuestions = await fetchAllQuestions();
	return allQuestions.filter(
		(q) => q.sourceBOMItemId === bomItemId || q.relatedBOMItems.includes(bomItemId as never)
	);
}

/**
 * Fetch questions for a specific BOM item by slug
 */
export async function fetchQuestionsForBOMItemSlug(slug: string): Promise<ResearchQuestion[]> {
	const allQuestions = await fetchAllQuestions();
	return allQuestions.filter((q) => q.sourceBOMItemSlug === slug);
}

/**
 * Fetch all questions with caching
 */
export async function fetchAllQuestions(): Promise<ResearchQuestion[]> {
	const now = Date.now();

	// Return cached data if still valid
	if (questionsCache && now - cacheTimestamp < CACHE_TTL_MS) {
		return questionsCache;
	}

	const questions: ResearchQuestion[] = [];

	// Load all question files using import.meta.glob
	const loadPromises = Object.entries(questionFiles).map(async ([path, loader]) => {
		// Skip non-question files (index.json, discussion files, etc.)
		if (!isQuestionFile(path)) return null;

		try {
			const content = await loader();
			return parseQuestionFile(content);
		} catch {
			return null;
		}
	});

	const results = await Promise.all(loadPromises);
	for (const question of results) {
		if (question) {
			questions.push(question);
		}
	}

	// Sort by ID for consistent ordering
	questions.sort((a, b) => {
		const [, aPhase, aNum] = a.id.match(/rq-(\d+)-(\d+)/) || [];
		const [, bPhase, bNum] = b.id.match(/rq-(\d+)-(\d+)/) || [];
		if (aPhase !== bPhase) return parseInt(aPhase) - parseInt(bPhase);
		return parseInt(aNum) - parseInt(bNum);
	});

	// Update cache
	questionsCache = questions;
	cacheTimestamp = now;

	return questions;
}

/**
 * Fetch the question index (metadata only, no context) for list views
 * This is more efficient than fetching full question content
 */
export async function fetchQuestionIndex(): Promise<
	Array<{
		id: string;
		slug: string;
		title: string;
		questionType: string;
		priority: string;
		status: string;
		sourcePhaseId: string;
		sourceBOMItemSlug: string;
		tags: string[];
	}>
> {
	const allQuestions = await fetchAllQuestions();
	return allQuestions.map((q) => ({
		id: q.id,
		slug: q.slug,
		title: q.title,
		questionType: q.questionType,
		priority: q.priority,
		status: q.status,
		sourcePhaseId: q.sourcePhaseId,
		sourceBOMItemSlug: q.sourceBOMItemSlug,
		tags: q.tags
	}));
}

/**
 * Clear the questions cache (useful for development/testing)
 */
export function clearQuestionsCache(): void {
	questionsCache = null;
	cacheTimestamp = 0;
}
