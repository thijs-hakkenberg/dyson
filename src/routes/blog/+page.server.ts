/**
 * Blog List Page Load Function
 *
 * Fetches all blog posts and categories for the blog index page.
 */

import type { PageServerLoad } from './$types';
import { fetchAllBlogPosts, getAllCategories } from '$lib/services/blog';

export const load: PageServerLoad = async () => {
	const posts = await fetchAllBlogPosts();
	const categories = getAllCategories(posts);

	return {
		posts,
		categories
	};
};
