/**
 * Question Detail Page Load Function
 *
 * Fetches full question data with context and related questions for the detail view.
 */

import type { PageLoad, EntryGenerator } from './$types';
import { fetchQuestion, fetchQuestionsForBOMItemSlug } from '$lib/services/questions';
import { getValidationsForQuestion } from '$lib/services/validation';
import { fetchDiscussion } from '$lib/services/discussions';
import { error } from '@sveltejs/kit';
import type { ResearchQuestionId } from '$lib/types/entities';

// Load all question files at build time to extract slugs for prerendering
const questionFiles = import.meta.glob('/src/content/research-questions/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

/**
 * Check if a path is a question file (not a discussion file)
 */
function isQuestionFile(path: string): boolean {
	return /\/phase-\d+[a-z]?\/rq-\d+[a-z]?-\d+-[^/]+\.md$/.test(path);
}

// Extract slugs from frontmatter of all question files
function extractSlugsFromFiles(): string[] {
	const slugs: string[] = [];

	for (const [path, content] of Object.entries(questionFiles)) {
		// Skip non-question files
		if (!isQuestionFile(path)) continue;

		// Extract slug from frontmatter using regex
		const slugMatch = content.match(/^slug:\s*["']?([^"'\n]+)["']?/m);
		if (slugMatch) {
			slugs.push(slugMatch[1].trim());
		}
	}

	return slugs;
}

export const entries: EntryGenerator = () => {
	const slugs = extractSlugsFromFiles();
	return slugs.map((slug) => ({ slug }));
};

export const load: PageLoad = async ({ params }) => {
	const question = await fetchQuestion(params.slug);

	if (!question) {
		error(404, {
			message: 'Question not found'
		});
	}

	// Get related questions from the same BOM item
	const allRelated = await fetchQuestionsForBOMItemSlug(question.sourceBOMItemSlug);
	const relatedQuestions = allRelated
		.filter((q) => q.id !== question.id)
		.slice(0, 5);

	// Get validations related to this question
	const relatedValidations = await getValidationsForQuestion(question.id as ResearchQuestionId);

	// Load discussion thread if this is a discussion-type question
	let discussion = null;
	if (question.questionType === 'discussion') {
		discussion = await fetchDiscussion(question.slug);
	}

	return {
		question,
		relatedQuestions,
		relatedValidations,
		discussion
	};
};
