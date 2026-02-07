<script lang="ts">
	import type { DiscussionResponse, DiscussionModelId, ResponseVoteResults } from '$lib/types/discussion';
	import { MODEL_DISPLAY_NAMES } from '$lib/types/discussion';
	import { renderMarkdown } from '$lib/utils/markdown';

	interface Props {
		response: DiscussionResponse;
		voteResults?: ResponseVoteResults;
		isWinner?: boolean;
		expanded?: boolean;
	}

	let { response, voteResults, isWinner = false, expanded = false }: Props = $props();

	// Model colors for visual distinction
	const modelColors: Record<DiscussionModelId, { bg: string; border: string; text: string }> = {
		'claude-opus-4-6': {
			bg: 'bg-amber-500/10',
			border: 'border-amber-500/30',
			text: 'text-amber-400'
		},
		'gemini-3-pro': {
			bg: 'bg-blue-500/10',
			border: 'border-blue-500/30',
			text: 'text-blue-400'
		},
		'gpt-5-2': {
			bg: 'bg-green-500/10',
			border: 'border-green-500/30',
			text: 'text-green-400'
		}
	};

	const colors = $derived(modelColors[response.modelId]);
	const renderedContent = $derived(renderMarkdown(response.content));

	let isExpanded = $state(expanded);
</script>

<div class="rounded-lg border {colors.border} {colors.bg} overflow-hidden">
	<!-- Header -->
	<button
		class="w-full px-4 py-3 flex items-center justify-between hover:bg-space-700/50 transition-colors"
		onclick={() => (isExpanded = !isExpanded)}
	>
		<div class="flex items-center gap-3">
			<!-- Model indicator -->
			<span class="px-2 py-1 rounded text-xs font-medium {colors.text} {colors.bg} border {colors.border}">
				{MODEL_DISPLAY_NAMES[response.modelId]}
			</span>

			<!-- Winner badge -->
			{#if isWinner}
				<span class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30">
					<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
					Winner
				</span>
			{/if}

			<!-- Vote score if available -->
			{#if voteResults}
				<span class="text-xs text-star-faint">
					Score: {voteResults.weightedScore.toFixed(1)}
				</span>
			{/if}
		</div>

		<div class="flex items-center gap-3">
			<span class="text-xs text-star-faint">{response.wordCount} words</span>
			<svg
				class="w-4 h-4 text-star-faint transition-transform {isExpanded ? 'rotate-180' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	</button>

	<!-- Content -->
	{#if isExpanded}
		<div class="px-4 pb-4 border-t border-space-600">
			<div class="prose-spec mt-4">
				{@html renderedContent}
			</div>

			<!-- Vote breakdown -->
			{#if voteResults}
				<div class="mt-4 pt-4 border-t border-space-600">
					<h4 class="text-xs text-star-faint uppercase tracking-wider mb-2">Vote Breakdown</h4>
					<div class="flex gap-4">
						<span class="text-xs">
							<span class="text-green-400">{voteResults.approveCount}</span> Approve
						</span>
						<span class="text-xs">
							<span class="text-amber-400">{3 - voteResults.approveCount - voteResults.rejectCount}</span> Neutral
						</span>
						<span class="text-xs">
							<span class="text-red-400">{voteResults.rejectCount}</span> Reject
						</span>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
