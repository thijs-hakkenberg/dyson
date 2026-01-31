<script lang="ts">
	import { getBlogPosts, getAllCategories } from '$lib/services/blog';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';

	const posts = getBlogPosts();
	const categories = getAllCategories();

	let selectedCategory = $state<string | null>(null);

	const filteredPosts = $derived(
		selectedCategory ? posts.filter((p) => p.category === selectedCategory) : posts
	);
</script>

<svelte:head>
	<title>Blog - Project Dyson</title>
	<meta name="description" content="Technical articles, research summaries, and project updates from the Project Dyson team." />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-4xl font-bold text-star-white mb-4">
			Blog
		</h1>
		<p class="text-lg text-star-dim max-w-3xl">
			Technical articles, research summaries, and project updates. Follow our progress as we work
			toward making a Dyson swarm a reality.
		</p>
	</div>

	<!-- Category Filter -->
	<div class="mb-8 flex flex-wrap gap-2">
		<button
			class="px-4 py-2 rounded-full text-sm transition-colors
				{selectedCategory === null
					? 'bg-cosmic-blue text-white'
					: 'bg-space-600 text-star-dim hover:bg-space-500 hover:text-star-white'}"
			onclick={() => selectedCategory = null}
		>
			All Posts
		</button>
		{#each categories as category}
			<button
				class="px-4 py-2 rounded-full text-sm transition-colors
					{selectedCategory === category
						? 'bg-cosmic-blue text-white'
						: 'bg-space-600 text-star-dim hover:bg-space-500 hover:text-star-white'}"
				onclick={() => selectedCategory = category}
			>
				{category}
			</button>
		{/each}
	</div>

	<!-- Posts Grid -->
	{#if filteredPosts.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredPosts as post}
				<BlogCard {post} />
			{/each}
		</div>
	{:else}
		<div class="card-glow p-12 text-center">
			<p class="text-star-dim">No posts found in this category.</p>
		</div>
	{/if}
</div>
