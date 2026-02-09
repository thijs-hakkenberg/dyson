/**
 * Blog Service
 *
 * Provides synchronous helper functions for blog post operations.
 * These operate on already-loaded post data.
 */

import type { BlogPost } from '$lib/types';

/**
 * Get all unique categories from a list of posts
 */
export function getAllCategories(posts: BlogPost[]): string[] {
	const categories = new Set(posts.map((post) => post.category));
	return Array.from(categories).sort();
}

/**
 * Get all unique tags from a list of posts
 */
export function getAllTags(posts: BlogPost[]): string[] {
	const tags = new Set(posts.flatMap((post) => post.tags));
	return Array.from(tags).sort();
}

/**
 * Filter posts by category
 */
export function filterByCategory(posts: BlogPost[], category: string | null): BlogPost[] {
	if (!category) return posts;
	return posts.filter((p) => p.category === category);
}

/**
 * Filter posts by tag
 */
export function filterByTag(posts: BlogPost[], tag: string): BlogPost[] {
	return posts.filter((p) => p.tags.includes(tag));
}

/**
 * Get related posts (same category or shared tags)
 */
export function getRelatedPosts(
	posts: BlogPost[],
	currentPost: BlogPost,
	limit = 3
): BlogPost[] {
	const related = posts
		.filter((p) => p.slug !== currentPost.slug)
		.map((p) => {
			// Score based on shared attributes
			let score = 0;
			if (p.category === currentPost.category) score += 2;
			const sharedTags = p.tags.filter((t) => currentPost.tags.includes(t));
			score += sharedTags.length;
			if (p.relatedPhases && currentPost.relatedPhases) {
				const sharedPhases = p.relatedPhases.filter((ph) =>
					currentPost.relatedPhases?.includes(ph)
				);
				score += sharedPhases.length;
			}
			return { post: p, score };
		})
		.filter((r) => r.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map((r) => r.post);

	return related;
}

/**
 * Group posts by category
 */
export function groupByCategory(posts: BlogPost[]): Record<string, BlogPost[]> {
	const groups: Record<string, BlogPost[]> = {};
	for (const post of posts) {
		if (!groups[post.category]) {
			groups[post.category] = [];
		}
		groups[post.category].push(post);
	}
	return groups;
}

/**
 * Get post count by category
 */
export function getCategoryCounts(posts: BlogPost[]): Record<string, number> {
	const counts: Record<string, number> = {};
	for (const post of posts) {
		counts[post.category] = (counts[post.category] || 0) + 1;
	}
	return counts;
}
