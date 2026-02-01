/**
 * Question Detail Page Load Function
 *
 * Fetches full question data with context and related questions for the detail view.
 */

import type { PageLoad, EntryGenerator } from './$types';
import { fetchQuestion, fetchQuestionsForBOMItemSlug } from '$lib/services/questions';
import { error } from '@sveltejs/kit';

// Load all question files at build time to extract slugs for prerendering
const questionFiles = import.meta.glob('/static/content/research-questions/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

// Extract slugs from frontmatter of all question files
function extractSlugsFromFiles(): string[] {
	const slugs: string[] = [];

	for (const [, content] of Object.entries(questionFiles)) {
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

	return {
		question,
		relatedQuestions
	};
};
