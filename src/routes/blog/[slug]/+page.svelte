<script lang="ts">
	import { page } from '$app/stores';
	import { getBlogPostBySlug } from '$lib/services/blog';
	import { marked } from 'marked';
	import { sanitizeMarkdownHTML } from '$lib/utils/sanitize';

	const slug = $derived($page.params.slug || '');
	const post = $derived(getBlogPostBySlug(slug));

	const formattedDate = $derived(
		post
			? new Intl.DateTimeFormat('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}).format(new Date(post.date))
			: ''
	);

	const htmlContent = $derived(post ? sanitizeMarkdownHTML(marked(post.content) as string) : '');
</script>

<svelte:head>
	<title>{post ? post.title : 'Post Not Found'} - Project Dyson Blog</title>
	{#if post}
		<meta name="description" content={post.description} />
	{/if}
</svelte:head>

{#if post}
	<article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<!-- Breadcrumb -->
		<nav class="mb-8">
			<ol class="flex items-center gap-2 text-sm">
				<li><a href="/blog" class="text-star-dim hover:text-cosmic-cyan">Blog</a></li>
				<li class="text-star-faint">/</li>
				<li class="text-star-white truncate">{post.title}</li>
			</ol>
		</nav>

		<!-- Header -->
		<header class="mb-12">
			<div class="flex items-center gap-3 mb-4">
				<span class="px-3 py-1 text-sm rounded bg-cosmic-blue/20 text-cosmic-cyan">
					{post.category}
				</span>
				<span class="text-sm text-star-faint">{formattedDate}</span>
			</div>

			<h1 class="text-4xl font-bold text-star-white mb-4">
				{post.title}
			</h1>

			<p class="text-xl text-star-dim mb-6">
				{post.description}
			</p>

			<div class="flex items-center gap-4 pb-6 border-b border-space-500">
				<div class="w-10 h-10 rounded-full bg-space-600 flex items-center justify-center">
					<span class="text-sm font-medium text-star-white">
						{post.author.split(' ').map(n => n[0]).join('')}
					</span>
				</div>
				<div>
					<p class="font-medium text-star-white">{post.author}</p>
					<p class="text-sm text-star-faint">Project Dyson</p>
				</div>
			</div>
		</header>

		<!-- Content -->
		<div class="prose-space">
			{@html htmlContent}
		</div>

		<!-- Tags -->
		<div class="mt-12 pt-8 border-t border-space-500">
			<p class="text-sm text-star-faint mb-3">Tags:</p>
			<div class="flex flex-wrap gap-2">
				{#each post.tags as tag}
					<span class="px-3 py-1 text-sm rounded bg-space-600 text-star-dim">
						{tag}
					</span>
				{/each}
			</div>
		</div>

		<!-- Related Actions -->
		<div class="mt-12 card-glow p-6">
			<h3 class="font-semibold text-star-white mb-4">Continue Exploring</h3>
			<div class="flex flex-wrap gap-4">
				<a href="/blog" class="btn-secondary">
					More Articles
				</a>
				<a href="/plan" class="btn-secondary">
					View Project Plan
				</a>
				<a href="/research" class="btn-primary">
					Research Hub
				</a>
			</div>
		</div>
	</article>
{:else}
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="card-glow p-12 text-center">
			<svg class="w-16 h-16 mx-auto mb-4 text-star-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<h1 class="text-2xl font-bold text-star-white mb-2">Post Not Found</h1>
			<p class="text-star-dim mb-6">The requested blog post doesn't exist.</p>
			<a href="/blog" class="btn-primary">View All Posts</a>
		</div>
	</div>
{/if}
