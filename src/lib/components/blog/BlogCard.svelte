<script lang="ts">
	import type { BlogPost } from '$lib/types';

	interface Props {
		post: BlogPost;
	}

	let { post }: Props = $props();

	const formattedDate = $derived(
		new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(new Date(post.date))
	);
</script>

<article class="card-glow p-6 h-full flex flex-col">
	<!-- Category & Date -->
	<div class="flex items-center gap-3 mb-4">
		<span class="px-2 py-1 text-xs rounded bg-cosmic-blue/20 text-cosmic-cyan">
			{post.category}
		</span>
		<span class="text-xs text-star-faint">{formattedDate}</span>
	</div>

	<!-- Title -->
	<h3 class="text-xl font-semibold text-star-white mb-3">
		<a href="/blog/{post.slug}" class="hover:text-cosmic-cyan transition-colors">
			{post.title}
		</a>
	</h3>

	<!-- Description -->
	<p class="text-star-dim text-sm mb-4 flex-1">
		{post.description}
	</p>

	<!-- Tags -->
	<div class="flex flex-wrap gap-2 mb-4">
		{#each post.tags.slice(0, 3) as tag}
			<span class="px-2 py-0.5 text-xs rounded bg-space-600 text-star-faint">
				{tag}
			</span>
		{/each}
	</div>

	<!-- Footer -->
	<div class="flex items-center justify-between pt-4 border-t border-space-500 mt-auto">
		<span class="text-sm text-star-dim">By {post.author}</span>
		<a
			href="/blog/{post.slug}"
			class="text-sm text-cosmic-cyan hover:underline inline-flex items-center gap-1"
		>
			Read more
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	</div>
</article>
