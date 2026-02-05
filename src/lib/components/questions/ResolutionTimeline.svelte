<script lang="ts">
	import type { ResolutionEvent } from '$lib/services/resolution';
	import ResolutionStatus from './ResolutionStatus.svelte';

	interface Props {
		events: ResolutionEvent[];
		maxItems?: number;
	}

	let { events, maxItems = 10 }: Props = $props();

	const displayedEvents = $derived(events.slice(0, maxItems));

	const phaseLabels: Record<string, string> = {
		'phase-0': 'Phase 0',
		'phase-1': 'Phase 1',
		'phase-2': 'Phase 2'
	};

	const sourceLabels: Record<string, string> = {
		paper: 'Paper',
		experiment: 'Experiment',
		expert: 'Expert',
		simulation: 'Simulation',
		'industry-data': 'Industry Data',
		consensus: 'Consensus'
	};

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Resolution Timeline</h3>

	{#if displayedEvents.length === 0}
		<div class="text-center py-8 text-star-dim">
			<svg
				class="w-12 h-12 mx-auto mb-3 text-star-faint"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<p>No resolution events yet</p>
		</div>
	{:else}
		<div class="relative">
			<!-- Timeline line -->
			<div class="absolute left-4 top-2 bottom-2 w-0.5 bg-space-500"></div>

			<!-- Events -->
			<div class="space-y-6">
				{#each displayedEvents as event, index}
					<div class="relative pl-10">
						<!-- Timeline dot -->
						<div
							class="absolute left-2 w-4 h-4 rounded-full border-2 {event.resolutionStatus ===
							'resolved'
								? 'bg-green-500 border-green-400'
								: event.resolutionStatus === 'partially-resolved'
									? 'bg-amber-500 border-amber-400'
									: 'bg-space-500 border-space-400'}"
						></div>

						<!-- Event content -->
						<div class="pb-1">
							<div class="flex items-center gap-2 mb-1">
								<span class="text-xs text-star-faint">{formatDate(event.resolutionDate)}</span>
								<span class="text-star-faint">-</span>
								<span class="text-xs px-1.5 py-0.5 rounded bg-space-600 text-star-dim">
									{phaseLabels[event.phaseId]}
								</span>
							</div>

							<a
								href="/questions/{event.questionSlug}"
								class="text-star-white font-medium hover:text-cosmic-cyan transition-colors block mb-2"
							>
								{event.questionTitle}
							</a>

							<div class="flex items-center gap-3 mb-2">
								<ResolutionStatus status={event.resolutionStatus} size="sm" showIcon={false} />
								<span class="text-xs text-star-faint">via {sourceLabels[event.resolutionSource]}</span>
							</div>

							{#if event.resolutionSummary}
								<p class="text-sm text-star-dim line-clamp-2">{event.resolutionSummary}</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		{#if events.length > maxItems}
			<div class="mt-6 pt-4 border-t border-space-500 text-center">
				<a href="/questions/resolved" class="text-sm text-cosmic-cyan hover:underline">
					View all {events.length} resolution events
				</a>
			</div>
		{/if}
	{/if}
</div>
