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
	/* Hide the duplicate h1 from markdown */
	.changelog-content :global(h1) {
		display: none;
	}

	/* Remove top margin from first h2 */
	.changelog-content :global(h2:first-of-type) {
		margin-top: 0;
	}

	/* Cyan h3 for changelog sections (Added, Changed, etc.) */
	.changelog-content :global(h3) {
		color: var(--color-cosmic-cyan);
	}
</style>
