/**
 * Blog Module
 *
 * Re-exports all blog-related functionality for convenient importing.
 */

// Fetchers (async, load data from markdown files)
export {
	fetchAllBlogPosts,
	fetchBlogPostBySlug,
	fetchBlogPostsByCategory,
	fetchBlogPostsByTag,
	fetchBlogPostsForPhase,
	clearBlogCache
} from './blog-fetchers';

// Service functions (sync, operate on already-loaded data)
export {
	getAllCategories,
	getAllTags,
	filterByCategory,
	filterByTag,
	getRelatedPosts,
	groupByCategory,
	getCategoryCounts
} from './blog-service';

// Parsers (for direct markdown parsing if needed)
export { parseBlogFile } from './blog-parsers';
export type { BlogFrontmatter } from './blog-parsers';
