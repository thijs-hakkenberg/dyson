<script lang="ts">
	import type { ValidationStats } from '$lib/types/validation';
	import { validationStatusLabels, validationSourceLabels } from '$lib/types/validation';

	interface Props {
		stats: ValidationStats;
	}

	let { stats }: Props = $props();

	const statusColors: Record<string, string> = {
		unvalidated: 'text-star-dim',
		validated: 'text-green-400',
		'partially-validated': 'text-yellow-400',
		refuted: 'text-red-400',
		outdated: 'text-orange-400'
	};

	const sourceColors: Record<string, string> = {
		experiment: 'text-purple-400',
		simulation: 'text-cosmic-cyan',
		'expert-review': 'text-blue-400',
		literature: 'text-green-400',
		'mission-data': 'text-sun-gold'
	};

	function getConfidenceColor(confidence: number): string {
		if (confidence >= 80) return 'text-green-400';
		if (confidence >= 60) return 'text-yellow-400';
		if (confidence >= 40) return 'text-orange-400';
		return 'text-red-400';
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Validation Overview</h3>

	<!-- Total & Confidence -->
	<div class="grid grid-cols-2 gap-4 mb-6">
		<div class="text-center p-3 rounded bg-space-700">
			<div class="text-3xl font-bold text-gradient">{stats.total}</div>
			<div class="text-xs text-star-dim">Total Claims</div>
		</div>
		<div class="text-center p-3 rounded bg-space-700">
			<div class="text-3xl font-bold {getConfidenceColor(stats.averageConfidence)}">{stats.averageConfidence}%</div>
			<div class="text-xs text-star-dim">Avg Confidence</div>
		</div>
	</div>

	<!-- Recent Activity -->
	<div class="mb-6 p-3 rounded bg-space-700 text-center">
		<div class="text-2xl font-bold text-cosmic-cyan">{stats.recentValidations}</div>
		<div class="text-xs text-star-dim">Validations (Last 30 Days)</div>
	</div>

	<!-- By Status -->
	<div class="mb-4">
		<h4 class="text-xs font-semibold text-star-faint mb-2 uppercase tracking-wider">By Status</h4>
		<div class="space-y-1.5">
			{#each Object.entries(stats.byStatus) as [status, count]}
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-dim">{validationStatusLabels[status as keyof typeof validationStatusLabels]}</span>
					<div class="flex items-center gap-2">
						<div class="w-16 h-1.5 bg-space-600 rounded-full overflow-hidden">
							<div
								class="h-full rounded-full {statusColors[status].replace('text-', 'bg-')}"
								style="width: {stats.total > 0 ? (count / stats.total) * 100 : 0}%"
							></div>
						</div>
						<span class="{statusColors[status]} w-6 text-right">{count}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- By Source -->
	<div>
		<h4 class="text-xs font-semibold text-star-faint mb-2 uppercase tracking-wider">By Source</h4>
		<div class="space-y-1.5">
			{#each Object.entries(stats.bySource) as [source, count]}
				{#if count > 0}
					<div class="flex items-center justify-between text-sm">
						<span class="text-star-dim">{validationSourceLabels[source as keyof typeof validationSourceLabels]}</span>
						<span class="{sourceColors[source]}">{count}</span>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
