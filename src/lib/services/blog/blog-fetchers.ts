/**
 * Blog Fetchers
 *
 * Provides async functions for fetching blog posts from markdown files.
 * Uses Vite's import.meta.glob with eager loading for consistent SSR/client behavior.
 */

import type { BlogPost } from '$lib/types';
import { parseBlogFile } from './blog-parsers';

// Use import.meta.glob with eager: true to load all blog files at build time
// This ensures consistent behavior between SSR and client hydration
const blogFiles = import.meta.glob('/src/content/blog/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

/**
 * Cache for parsed posts (parsing is still somewhat expensive)
 */
let postsCache: BlogPost[] | null = null;

/**
 * Parse and cache all blog posts
 */
function getAllPosts(): BlogPost[] {
	if (postsCache) {
		return postsCache;
	}

	const posts: BlogPost[] = [];

	for (const [path, content] of Object.entries(blogFiles)) {
		try {
			const post = parseBlogFile(content);
			if (post) {
				posts.push(post);
			}
		} catch (err) {
			console.warn(`Failed to parse blog post from ${path}:`, err);
		}
	}

	// Sort by date descending (newest first)
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	postsCache = posts;
	return posts;
}

/**
 * Fetch all blog posts (async wrapper for compatibility)
 */
export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
	return getAllPosts();
}

/**
 * Fetch a single blog post by slug
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
	const posts = await fetchAllBlogPosts();
	return posts.find((p) => p.slug === slug) || null;
}

/**
 * Fetch blog posts filtered by category
 */
export async function fetchBlogPostsByCategory(category: string): Promise<BlogPost[]> {
	const posts = await fetchAllBlogPosts();
	return posts.filter((p) => p.category === category);
}

/**
 * Fetch blog posts filtered by tag
 */
export async function fetchBlogPostsByTag(tag: string): Promise<BlogPost[]> {
	const posts = await fetchAllBlogPosts();
	return posts.filter((p) => p.tags.includes(tag));
}

/**
 * Fetch blog posts related to a specific phase
 */
export async function fetchBlogPostsForPhase(phaseId: string): Promise<BlogPost[]> {
	const posts = await fetchAllBlogPosts();
	return posts.filter((p) => p.relatedPhases?.includes(phaseId));
}

/**
 * Clear the posts cache (useful for development/testing)
 */
export function clearBlogCache(): void {
	postsCache = null;
}
