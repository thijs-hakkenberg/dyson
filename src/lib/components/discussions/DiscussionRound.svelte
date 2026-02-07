<script lang="ts">
	import type { DiscussionRound as DiscussionRoundType, DiscussionModelId } from '$lib/types/discussion';
	import { MODEL_DISPLAY_NAMES } from '$lib/types/discussion';
	import DiscussionReply from './DiscussionReply.svelte';

	interface Props {
		round: DiscussionRoundType;
		isLatest?: boolean;
	}

	let { round, isLatest = false }: Props = $props();

	// Get vote results for a specific model
	function getVoteResults(modelId: DiscussionModelId) {
		return round.votes?.find((v) => v.targetId === modelId);
	}

	// Termination vote summary
	const concludeVotes = $derived(round.terminationVotes?.filter((v) => v.vote === 'CONCLUDE').length || 0);
	const continueVotes = $derived(round.terminationVotes?.filter((v) => v.vote === 'CONTINUE').length || 0);

	let isExpanded = $state(isLatest);
</script>

<div class="border border-space-500 rounded-lg overflow-hidden {isLatest ? 'ring-1 ring-cosmic-cyan/30' : ''}">
	<!-- Round Header -->
	<button
		class="w-full px-4 py-3 bg-space-700 hover:bg-space-600 transition-colors flex items-center justify-between"
		onclick={() => (isExpanded = !isExpanded)}
	>
		<div class="flex items-center gap-3">
			<span class="text-sm font-semibold text-star-white">Round {round.roundNumber}</span>

			{#if isLatest}
				<span class="px-2 py-0.5 rounded text-xs bg-cosmic-cyan/20 text-cosmic-cyan">
					Latest
				</span>
			{/if}

			{#if round.shouldTerminate}
				<span class="px-2 py-0.5 rounded text-xs bg-amber-500/20 text-amber-400">
					Final
				</span>
			{/if}
		</div>

		<div class="flex items-center gap-4">
			<!-- Winner indicator -->
			<div class="flex items-center gap-2 text-xs text-star-faint">
				<svg class="w-4 h-4 text-cosmic-cyan" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
				<span class="text-cosmic-cyan">{MODEL_DISPLAY_NAMES[round.winnerId]}</span>
				<span class="text-star-faint">({round.winnerScore.toFixed(1)})</span>
			</div>

			<!-- Expand icon -->
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

	<!-- Round Content -->
	{#if isExpanded}
		<div class="p-4 space-y-4 bg-space-800">
			<!-- Responses -->
			<div class="space-y-3">
				<h4 class="text-xs text-star-faint uppercase tracking-wider">Responses</h4>
				{#each round.responses as response}
					<DiscussionReply
						{response}
						voteResults={getVoteResults(response.modelId)}
						isWinner={response.modelId === round.winnerId}
						expanded={response.modelId === round.winnerId}
					/>
				{/each}
			</div>

			<!-- Termination Votes -->
			{#if round.terminationVotes && round.terminationVotes.length > 0}
				<div class="pt-4 border-t border-space-600">
					<h4 class="text-xs text-star-faint uppercase tracking-wider mb-3">Termination Votes</h4>
					<div class="flex items-center gap-6">
						<div class="flex items-center gap-2">
							<div class="w-3 h-3 rounded-full bg-green-500"></div>
							<span class="text-sm text-star-dim">
								{concludeVotes} Conclude
							</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="w-3 h-3 rounded-full bg-blue-500"></div>
							<span class="text-sm text-star-dim">
								{continueVotes} Continue
							</span>
						</div>
					</div>

					<!-- Individual votes -->
					<div class="mt-3 flex gap-2">
						{#each round.terminationVotes as termVote}
							<span
								class="px-2 py-1 rounded text-xs {termVote.vote === 'CONCLUDE'
									? 'bg-green-500/20 text-green-400'
									: 'bg-blue-500/20 text-blue-400'}"
							>
								{MODEL_DISPLAY_NAMES[termVote.modelId]}: {termVote.vote}
							</span>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Timestamp -->
			<div class="pt-2 text-xs text-star-faint">
				Completed: {new Date(round.completedAt).toLocaleString()}
			</div>
		</div>
	{/if}
</div>
