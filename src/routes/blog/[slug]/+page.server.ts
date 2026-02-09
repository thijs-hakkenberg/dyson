/**
 * Blog Post Detail Page Load Function
 *
 * Fetches a single blog post by slug for the detail view.
 */

import type { PageServerLoad, EntryGenerator } from './$types';
import { fetchAllBlogPosts, fetchBlogPostBySlug } from '$lib/services/blog';
import { error } from '@sveltejs/kit';

// Load all blog files at build time to extract slugs for prerendering
// Uses regex to extract slugs without parsing (avoids gray-matter dependency)
const blogFiles = import.meta.glob('/src/content/blog/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

// Extract slugs from frontmatter of all blog files
function extractSlugsFromFiles(): string[] {
	const slugs: string[] = [];

	for (const [, content] of Object.entries(blogFiles)) {
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

export const load: PageServerLoad = async ({ params }) => {
	const post = await fetchBlogPostBySlug(params.slug);

	if (!post) {
		error(404, {
			message: 'Blog post not found'
		});
	}

	// Get all posts for related posts feature
	const allPosts = await fetchAllBlogPosts();

	return {
		post,
		allPosts
	};
};
