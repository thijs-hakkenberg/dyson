<script lang="ts">
	import { parseDivergentView, groupByPosition, type ParsedDivergence } from '$lib/utils/consensus-parser';
	import ModelCard from './ModelCard.svelte';

	interface Props {
		views: string[];
	}

	let { views }: Props = $props();

	// Parse and filter divergent views
	const parsedDivergences = $derived<ParsedDivergence[]>(
		views
			.map(parseDivergentView)
			.filter(d => {
				// Only show if there's actual divergence (more than one grouped position)
				const grouped = groupByPosition(d.positions);
				return grouped.length > 1;
			})
	);
</script>

{#if parsedDivergences.length > 0}
	<section>
		<div class="flex items-center gap-2 mb-4">
			<div class="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
				<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
			</div>
			<h3 class="text-lg font-bold text-star-white">Divergent Views</h3>
			<span class="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Models disagree</span>
		</div>

		<div class="space-y-4">
			{#each parsedDivergences as divergence}
				{@const groupedPositions = groupByPosition(divergence.positions)}
				<div class="rounded-lg border border-amber-500/20 bg-amber-500/5 overflow-hidden">
					<!-- Warning callout header -->
					<div class="px-4 py-3 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2">
						<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
						</svg>
						<span class="font-semibold text-amber-300">{divergence.topic}</span>
					</div>

					<!-- Model comparison cards - grouped by position -->
					<div class="p-4 flex flex-wrap gap-3">
						{#each groupedPositions as { models, position, isShared }}
							<ModelCard {models} {position} {isShared} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}
