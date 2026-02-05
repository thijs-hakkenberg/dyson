<script lang="ts">
	import { marked } from 'marked';

	let { data } = $props();

	const htmlContent = $derived(marked.parse(data.content));
</script>

<svelte:head>
	<title>Changelog - Project Dyson</title>
	<meta name="description" content="All notable changes to Project Dyson are documented here." />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-4xl font-bold text-star-white mb-4">
			Changelog
		</h1>
		<p class="text-lg text-star-dim">
			All notable changes to Project Dyson are documented here. This project follows semantic versioning principles.
		</p>
	</div>

	<!-- Changelog Content -->
	<div class="card-glow p-8">
		<div class="changelog-content prose prose-invert max-w-none">
			{@html htmlContent}
		</div>
	</div>
</div>

<style>
	.changelog-content :global(h1) {
		display: none;
	}

	.changelog-content :global(h2) {
		font-size: 1.5rem;
		font-weight: 700;
		color: rgb(var(--color-star-white));
		margin-top: 2rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid rgb(var(--color-space-600));
	}

	.changelog-content :global(h2:first-of-type) {
		margin-top: 0;
	}

	.changelog-content :global(h3) {
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(var(--color-cosmic-cyan));
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	.changelog-content :global(h4) {
		font-size: 1rem;
		font-weight: 500;
		color: rgb(var(--color-star-dim));
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	.changelog-content :global(ul) {
		list-style-type: disc;
		list-style-position: inside;
		color: rgb(var(--color-star-dim));
	}

	.changelog-content :global(li) {
		color: rgb(var(--color-star-dim));
		margin-bottom: 0.25rem;
	}

	.changelog-content :global(p) {
		color: rgb(var(--color-star-dim));
		margin-bottom: 1rem;
	}

	.changelog-content :global(hr) {
		border-color: rgb(var(--color-space-600));
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	.changelog-content :global(code) {
		background-color: rgb(var(--color-space-700));
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		color: rgb(var(--color-cosmic-blue));
		font-size: 0.875rem;
	}
</style>
