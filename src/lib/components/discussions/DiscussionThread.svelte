<script lang="ts">
	import type { DiscussionThread as DiscussionThreadType, DiscussionModelId, TerminationReason } from '$lib/types/discussion';
	import { MODEL_DISPLAY_NAMES } from '$lib/types/discussion';
	import DiscussionRound from './DiscussionRound.svelte';
	import DiscussionConclusion from './DiscussionConclusion.svelte';

	interface Props {
		thread: DiscussionThreadType;
	}

	let { thread }: Props = $props();

	// Termination reason labels
	const terminationLabels: Record<TerminationReason, string> = {
		'unanimous-conclude': 'Unanimous Agreement',
		'consecutive-conclude': 'Majority Consensus',
		'max-rounds': 'Maximum Rounds Reached',
		'convergence': 'Clear Winner Emerged',
		'forced': 'Manually Concluded'
	};

	// Status colors
	const statusColors = {
		active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		concluded: 'bg-green-500/20 text-green-400 border-green-500/30'
	};

	// Get the model with most wins
	const leadingModel = $derived(() => {
		const winners = thread.stats?.roundWinners || {};
		let maxWins = 0;
		let leader: DiscussionModelId = 'claude-opus-4-6';

		for (const [modelId, wins] of Object.entries(winners)) {
			if (wins > maxWins) {
				maxWins = wins;
				leader = modelId as DiscussionModelId;
			}
		}

		return { modelId: leader, wins: maxWins };
	});
</script>

<div class="space-y-6">
	<!-- Thread Header -->
	<div class="card-glow p-6">
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-xl font-bold text-star-white flex items-center gap-3">
				<svg class="w-6 h-6 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
				</svg>
				Multi-Model Discussion
			</h2>
			<span class="px-3 py-1.5 rounded border {statusColors[thread.status]}">
				{thread.status === 'active' ? 'In Progress' : 'Concluded'}
			</span>
		</div>

		<!-- Thread Stats -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
			<div class="p-3 rounded-lg bg-space-700">
				<div class="text-xs text-star-faint uppercase tracking-wider mb-1">Rounds</div>
				<div class="text-lg font-semibold text-star-white">{thread.rounds?.length || 0}</div>
			</div>

			<div class="p-3 rounded-lg bg-space-700">
				<div class="text-xs text-star-faint uppercase tracking-wider mb-1">Leading Model</div>
				<div class="text-sm font-semibold text-cosmic-cyan">
					{MODEL_DISPLAY_NAMES[leadingModel().modelId]}
				</div>
				<div class="text-xs text-star-faint">{leadingModel().wins} wins</div>
			</div>

			<div class="p-3 rounded-lg bg-space-700">
				<div class="text-xs text-star-faint uppercase tracking-wider mb-1">Approval Rate</div>
				<div class="text-lg font-semibold text-star-white">
					{thread.stats?.approvalRate?.toFixed(0) || 0}%
				</div>
			</div>

			<div class="p-3 rounded-lg bg-space-700">
				<div class="text-xs text-star-faint uppercase tracking-wider mb-1">Avg Response</div>
				<div class="text-lg font-semibold text-star-white">
					{thread.stats?.averageResponseWords || 0}
				</div>
				<div class="text-xs text-star-faint">words</div>
			</div>
		</div>

		<!-- Termination Reason -->
		{#if thread.terminationReason}
			<div class="flex items-center gap-2 text-sm">
				<span class="text-star-faint">Termination:</span>
				<span class="px-2 py-1 rounded text-xs bg-space-600 text-star-dim">
					{terminationLabels[thread.terminationReason]}
				</span>
			</div>
		{/if}

		<!-- Model Win Distribution -->
		{#if thread.stats?.roundWinners}
			<div class="mt-4 pt-4 border-t border-space-500">
				<h4 class="text-xs text-star-faint uppercase tracking-wider mb-3">Round Winners</h4>
				<div class="flex gap-2">
					{#each Object.entries(thread.stats.roundWinners) as [modelId, wins]}
						{#if wins > 0}
							<div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-space-700">
								<div
									class="w-3 h-3 rounded-full {modelId === 'claude-opus-4-6'
										? 'bg-amber-400'
										: modelId === 'gemini-3-pro'
											? 'bg-blue-400'
											: 'bg-green-400'}"
								></div>
								<span class="text-sm text-star-dim">{MODEL_DISPLAY_NAMES[modelId as DiscussionModelId]}</span>
								<span class="text-sm font-semibold text-star-white">{wins}</span>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- Conclusion (if concluded) -->
	{#if thread.status === 'concluded' && thread.conclusion}
		<DiscussionConclusion conclusion={thread.conclusion} />
	{/if}

	<!-- Discussion Rounds -->
	<div class="space-y-4">
		<h3 class="text-lg font-semibold text-star-white">Discussion Rounds</h3>

		{#if thread.rounds && thread.rounds.length > 0}
			{#each thread.rounds.slice().reverse() as round, index}
				<DiscussionRound
					{round}
					isLatest={index === 0}
				/>
			{/each}
		{:else}
			<div class="p-8 text-center text-star-faint border border-space-500 rounded-lg">
				No discussion rounds yet. Run the discussion script to start.
			</div>
		{/if}
	</div>

	<!-- Thread Metadata -->
	<div class="card-glow p-4">
		<div class="grid grid-cols-2 gap-4 text-sm">
			<div>
				<span class="text-star-faint">Started:</span>
				<span class="text-star-dim ml-2">{new Date(thread.startedAt).toLocaleString()}</span>
			</div>
			{#if thread.concludedAt}
				<div>
					<span class="text-star-faint">Concluded:</span>
					<span class="text-star-dim ml-2">{new Date(thread.concludedAt).toLocaleString()}</span>
				</div>
			{/if}
		</div>
	</div>
</div>
