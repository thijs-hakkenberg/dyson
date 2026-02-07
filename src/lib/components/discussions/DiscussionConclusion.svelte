<script lang="ts">
	import type { DiscussionConclusion as DiscussionConclusionType } from '$lib/types/discussion';
	import { MODEL_DISPLAY_NAMES } from '$lib/types/discussion';
	import { renderMarkdown } from '$lib/utils/markdown';

	interface Props {
		conclusion: DiscussionConclusionType;
	}

	let { conclusion }: Props = $props();

	const renderedSummary = $derived(renderMarkdown(conclusion.summary));
</script>

<div class="card-glow p-6">
	<!-- Header -->
	<div class="flex items-center justify-between mb-4">
		<h3 class="text-lg font-bold text-star-white flex items-center gap-2">
			<svg class="w-5 h-5 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
			</svg>
			Discussion Conclusion
		</h3>
		<span class="text-xs text-star-faint">
			Synthesized by {MODEL_DISPLAY_NAMES[conclusion.generatedBy]}
		</span>
	</div>

	<!-- Summary -->
	<div class="prose-spec mb-6">
		{@html renderedSummary}
	</div>

	<!-- Key Points -->
	{#if conclusion.keyPoints && conclusion.keyPoints.length > 0}
		<div class="mb-6">
			<h4 class="text-sm font-semibold text-star-white mb-3 flex items-center gap-2">
				<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				Key Points of Agreement
			</h4>
			<ul class="space-y-2">
				{#each conclusion.keyPoints as point}
					<li class="flex items-start gap-2 text-sm text-star-dim">
						<svg class="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
						</svg>
						{point}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Unresolved Questions -->
	{#if conclusion.unresolvedQuestions && conclusion.unresolvedQuestions.length > 0}
		<div class="mb-6">
			<h4 class="text-sm font-semibold text-star-white mb-3 flex items-center gap-2">
				<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				Unresolved Questions
			</h4>
			<ul class="space-y-2">
				{#each conclusion.unresolvedQuestions as question}
					<li class="flex items-start gap-2 text-sm text-star-dim">
						<svg class="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
						{question}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Recommended Actions -->
	{#if conclusion.recommendedActions && conclusion.recommendedActions.length > 0}
		<div class="mb-4">
			<h4 class="text-sm font-semibold text-star-white mb-3 flex items-center gap-2">
				<svg class="w-4 h-4 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
				</svg>
				Recommended Actions
			</h4>
			<ol class="space-y-2 list-decimal list-inside">
				{#each conclusion.recommendedActions as action, i}
					<li class="text-sm text-star-dim">
						{action}
					</li>
				{/each}
			</ol>
		</div>
	{/if}

	<!-- Generated timestamp -->
	<div class="pt-4 border-t border-space-500 text-xs text-star-faint">
		Generated: {new Date(conclusion.generatedAt).toLocaleString()}
	</div>
</div>
