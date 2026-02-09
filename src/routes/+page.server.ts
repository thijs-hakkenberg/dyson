/**
 * Homepage Load Function
 *
 * Fetches recent blog posts for the homepage.
 */

import type { PageServerLoad } from './$types';
import { fetchAllBlogPosts } from '$lib/services/blog';

export const load: PageServerLoad = async () => {
	const posts = await fetchAllBlogPosts();
	const recentPosts = posts.slice(0, 3);

	return {
		recentPosts
	};
};
