<script lang="ts">
	import type { ArxivPaper } from '$lib/types';
	import { formatPaperDate } from '$lib/services/arxiv';

	interface Props {
		paper: ArxivPaper;
	}

	let { paper }: Props = $props();

	let expanded = $state(false);
</script>

<article class="card-glow p-5">
	<div class="flex items-start justify-between gap-4 mb-3">
		<h3 class="text-lg font-semibold text-star-white leading-tight">
			<a href={paper.arxivUrl} target="_blank" rel="noopener noreferrer" class="hover:text-cosmic-cyan transition-colors">
				{paper.title}
			</a>
		</h3>
		<a
			href={paper.pdfUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="flex-shrink-0 px-3 py-1.5 text-sm rounded bg-sun-orange/20 text-sun-orange hover:bg-sun-orange/30 transition-colors"
		>
			PDF
		</a>
	</div>

	<div class="text-sm text-star-dim mb-3">
		{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ` +${paper.authors.length - 3} more` : ''}
	</div>

	<div class="flex flex-wrap gap-2 mb-4">
		{#each paper.categories.slice(0, 4) as category}
			<span class="px-2 py-0.5 text-xs rounded bg-space-600 text-star-faint">
				{category}
			</span>
		{/each}
	</div>

	<div class="text-sm text-star-dim leading-relaxed">
		{#if expanded}
			{paper.summary}
			<button
				class="text-cosmic-cyan hover:underline ml-2"
				onclick={() => expanded = false}
			>
				Show less
			</button>
		{:else}
			{paper.summary.slice(0, 250)}{paper.summary.length > 250 ? '...' : ''}
			{#if paper.summary.length > 250}
				<button
					class="text-cosmic-cyan hover:underline ml-2"
					onclick={() => expanded = true}
				>
					Read more
				</button>
			{/if}
		{/if}
	</div>

	<div class="mt-4 pt-4 border-t border-space-500 flex items-center justify-between text-xs text-star-faint">
		<span>Published: {formatPaperDate(paper.published)}</span>
		<span>Updated: {formatPaperDate(paper.updated)}</span>
	</div>
</article>
