<script lang="ts">
	import type { Experiment } from '$lib/types/roadmap';
	import {
		experimentStatusLabels,
		experimentStatusColors,
		experimentStatusIcons
	} from '$lib/types/roadmap';

	interface Props {
		experiment: Experiment;
	}

	let { experiment }: Props = $props();

	function formatCost(cost: number): string {
		if (cost >= 1000000000) {
			return `$${(cost / 1000000000).toFixed(1)}B`;
		} else if (cost >= 1000000) {
			return `$${(cost / 1000000).toFixed(0)}M`;
		} else if (cost >= 1000) {
			return `$${(cost / 1000).toFixed(0)}K`;
		}
		return `$${cost}`;
	}

	function formatDate(dateStr: string): string {
		if (dateStr.length === 4) {
			return dateStr; // Just year
		}
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
	}
</script>

<article class="card-glow p-6 h-full flex flex-col hover:border-cosmic-cyan/50 transition-colors">
	<!-- Header -->
	<div class="flex items-start justify-between gap-3 mb-3">
		<div class="flex items-center gap-2">
			<svg class="w-5 h-5 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d={experimentStatusIcons[experiment.status]}
				/>
			</svg>
			<span class="text-sm text-star-dim">{formatDate(experiment.targetDate)}</span>
		</div>
		<span class="px-2 py-0.5 rounded text-xs {experimentStatusColors[experiment.status]}">
			{experimentStatusLabels[experiment.status]}
		</span>
	</div>

	<!-- Title -->
	<h3 class="text-lg font-semibold text-star-white mb-2 line-clamp-2">
		{experiment.name}
	</h3>

	<!-- Organization -->
	<p class="text-cosmic-cyan text-sm mb-2">{experiment.organization}</p>

	<!-- Description -->
	<p class="text-star-dim text-sm mb-4 flex-1 line-clamp-3">
		{experiment.description}
	</p>

	<!-- Tags -->
	<div class="flex flex-wrap gap-1.5 mb-4">
		{#each experiment.tags.slice(0, 4) as tag}
			<span class="px-1.5 py-0.5 text-xs rounded bg-space-600 text-star-faint">
				{tag}
			</span>
		{/each}
		{#if experiment.tags.length > 4}
			<span class="px-1.5 py-0.5 text-xs rounded bg-space-600 text-star-faint">
				+{experiment.tags.length - 4}
			</span>
		{/if}
	</div>

	<!-- Footer -->
	<div class="flex items-center justify-between pt-4 border-t border-space-500 mt-auto">
		<div class="text-sun-gold font-semibold">
			{formatCost(experiment.estimatedCost)}
		</div>
		<div class="flex items-center gap-3 text-xs text-star-faint">
			{#if experiment.relatedRQs.length > 0}
				<span class="flex items-center gap-1">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					{experiment.relatedRQs.length} RQ{experiment.relatedRQs.length > 1 ? 's' : ''}
				</span>
			{/if}
			{#if experiment.relatedBOMItems.length > 0}
				<span class="flex items-center gap-1">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						/>
					</svg>
					{experiment.relatedBOMItems.length} BOM
				</span>
			{/if}
		</div>
	</div>

	<!-- Reference URL -->
	{#if experiment.referenceUrl}
		<a
			href={experiment.referenceUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="mt-3 text-sm text-cosmic-cyan hover:underline inline-flex items-center gap-1"
		>
			Learn more
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
				/>
			</svg>
		</a>
	{/if}
</article>
