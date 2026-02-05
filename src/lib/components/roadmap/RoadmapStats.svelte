<script lang="ts">
	import type { RoadmapStats } from '$lib/types/roadmap';
	import { experimentStatusLabels } from '$lib/types/roadmap';

	interface Props {
		stats: RoadmapStats;
	}

	let { stats }: Props = $props();

	const statusColors: Record<string, string> = {
		proposed: 'text-star-dim',
		funded: 'text-cosmic-cyan',
		'in-progress': 'text-purple-400',
		completed: 'text-green-400',
		cancelled: 'text-red-400'
	};

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
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Roadmap Overview</h3>

	<!-- Total -->
	<div class="mb-6 text-center">
		<div class="text-4xl font-bold text-gradient">{stats.total}</div>
		<div class="text-sm text-star-dim">Total Experiments</div>
	</div>

	<!-- Key Metrics -->
	<div class="grid grid-cols-2 gap-4 mb-6">
		<div class="text-center p-3 bg-space-700 rounded-lg">
			<div class="text-2xl font-bold text-sun-gold">{formatCost(stats.totalEstimatedCost)}</div>
			<div class="text-xs text-star-dim">Total Est. Cost</div>
		</div>
		<div class="text-center p-3 bg-space-700 rounded-lg">
			<div class="text-2xl font-bold text-cosmic-cyan">{stats.questionsAddressed}</div>
			<div class="text-xs text-star-dim">RQs Addressed</div>
		</div>
	</div>

	<!-- Stats Grid -->
	<div class="space-y-4">
		<!-- By Status -->
		<div>
			<h4 class="text-xs font-semibold text-star-faint mb-2 uppercase tracking-wider">By Status</h4>
			<div class="space-y-1">
				{#each Object.entries(stats.byStatus) as [status, count]}
					{#if count > 0}
						<div class="flex justify-between text-sm">
							<span class="text-star-dim">{experimentStatusLabels[status as keyof typeof experimentStatusLabels]}</span>
							<span class={statusColors[status]}>{count}</span>
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<!-- By Year -->
		<div>
			<h4 class="text-xs font-semibold text-star-faint mb-2 uppercase tracking-wider">By Year</h4>
			<div class="space-y-1">
				{#each Object.entries(stats.byYear).sort((a, b) => a[0].localeCompare(b[0])) as [year, count]}
					<div class="flex justify-between text-sm">
						<span class="text-star-dim">{year}</span>
						<span class="text-cosmic-cyan">{count}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- BOM Items Validated -->
		<div class="pt-4 border-t border-space-500">
			<div class="flex justify-between text-sm">
				<span class="text-star-dim">BOM Items Validated</span>
				<span class="text-green-400">{stats.bomItemsValidated}</span>
			</div>
		</div>
	</div>
</div>
